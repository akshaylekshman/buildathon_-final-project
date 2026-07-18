import { NextResponse } from "next/server";
import { callGemini, parseGeminiJSON } from "@/lib/gemini";
import { callOllama, parseOllamaJSON } from "@/lib/ollama";

// ─────────────────────────────────────────────
// RAG Helper: Fetch medicine data from OpenFDA for a single drug name
// ─────────────────────────────────────────────
async function fetchOpenFDAData(medicineName: string): Promise<string> {
  try {
    // Strip dosage info (e.g. "Amoxicillin 500mg" → "Amoxicillin")
    const cleanName = medicineName.replace(/\s*\d+\s*(mg|ml|mcg|g|iu|%)/gi, "").trim();
    const encodedName = encodeURIComponent(cleanName);
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodedName}"+openfda.generic_name:"${encodedName}"&limit=1`;

    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error("OpenFDA unavailable");

    const data = await res.json();
    const result = data.results?.[0];
    if (!result) throw new Error("No results");

    const extract = (field: any) =>
      Array.isArray(field) ? field[0]?.slice(0, 400) : "";

    const parts: string[] = [`[FDA Data for ${cleanName}]`];
    if (result.openfda?.pharm_class_epc)
      parts.push(`Class: ${result.openfda.pharm_class_epc.join(", ")}`);
    if (result.indications_and_usage)
      parts.push(`Uses: ${extract(result.indications_and_usage)}`);
    if (result.warnings)
      parts.push(`Warnings: ${extract(result.warnings)}`);
    if (result.adverse_reactions)
      parts.push(`Side Effects: ${extract(result.adverse_reactions)}`);

    return parts.join("\n");
  } catch {
    return "";
  }
}

// ─────────────────────────────────────────────
// Main API Route
// ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Extract medicine names from the prescription text using a basic heuristic
    // (words that look like drug names — capitalized, more than 4 chars)
    const wordMatches = text.match(/\b[A-Z][a-zA-Z]{3,}\b/g) ?? [];
    const uniqueWords = [...new Set<string>(wordMatches)].slice(0, 6); // limit to 6 names

    // Fetch FDA data for each detected medicine in parallel
    const fdaResults = await Promise.all(
      uniqueWords.map((name: string) => fetchOpenFDAData(name))
    );
    const ragContext = fdaResults.filter(Boolean).join("\n\n");

    const ragSection = ragContext
      ? `\n\n=== REAL-WORLD DRUG REFERENCE DATA (FDA) ===\n${ragContext}\n=== END REFERENCE DATA ===\n\nUse the above data to fill in accurate side effects, warnings, and purposes for the medicines found.`
      : "";

    const systemPrompt = `You are an expert AI medical assistant specialized in reading prescriptions.
Analyze the provided prescription text and extract the medicines.${ragSection}

For each medicine, extract:
1. "name": The exact name of the medicine (e.g. "Amoxicillin 500mg" or "Paracetamol 650mg").
2. "purpose": Why it is prescribed (e.g. "Bacterial infection", "Pain relief").
3. "timing": When to take it. Return an object with boolean flags: "morning", "afternoon", "night". (e.g. if taken twice a day morning/night, morning and night are true, afternoon is false).
4. "food": Food instruction (e.g., "After Food" or "Before Food" or "With Food").
5. "sideEffects": List common side effects as an array of strings (e.g. ["Nausea", "Drowsiness"]).
6. "warnings": Critical warnings (e.g., "Finish the complete course", "Do not consume alcohol").

Your response must be a single, valid JSON object containing a "medicines" array and a "warnings" summary string.
Output ONLY the raw JSON matching this schema:

{
  "success": true,
  "medicines": [
    {
      "name": "string",
      "purpose": "string",
      "timing": {
        "morning": boolean,
        "afternoon": boolean,
        "night": boolean
      },
      "food": "string",
      "sideEffects": ["string"],
      "warnings": "string"
    }
  ],
  "warnings": "string"
}
`;

    const useLocalAI = process.env.USE_LOCAL_AI === "true";
    let rawText = "";
    let parsedResult;

    if (useLocalAI) {
      console.log("Using local Ollama AI for prescription analysis");
      rawText = await callOllama(
        `Prescription Text to analyze:\n${text}`,
        systemPrompt
      );
      try {
        parsedResult = parseOllamaJSON(rawText);
      } catch (parseError) {
        console.error("Failed to parse JSON response from Ollama:", rawText);
        return NextResponse.json({
          success: false,
          error: "Invalid JSON returned by local AI model",
          raw: rawText,
        }, { status: 500 });
      }
    } else {
      console.log("Using cloud Gemini AI for prescription analysis");
      rawText = await callGemini(
        `Prescription Text to analyze:\n${text}`,
        systemPrompt
      );
      try {
        parsedResult = parseGeminiJSON(rawText);
      } catch (parseError) {
        console.error("Failed to parse JSON response from Gemini:", rawText);
        return NextResponse.json({
          success: false,
          error: "Invalid JSON returned by AI model",
          raw: rawText,
        }, { status: 500 });
      }
    }

    return NextResponse.json({ ...parsedResult, ragEnhanced: !!ragContext });
  } catch (error: any) {
    console.error("Prescription API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze prescription" },
      { status: 500 }
    );
  }
}
