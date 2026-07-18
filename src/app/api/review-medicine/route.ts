import { NextResponse } from "next/server";
import { callGemini, parseGeminiJSON } from "@/lib/gemini";
import { callOllama, parseOllamaJSON } from "@/lib/ollama";

// ─────────────────────────────────────────────
// RAG Helper: Fetch medicine data from OpenFDA
// ─────────────────────────────────────────────
async function fetchOpenFDAData(medicineName: string): Promise<string> {
  try {
    const encodedName = encodeURIComponent(medicineName);
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodedName}"+openfda.generic_name:"${encodedName}"&limit=1`;

    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("OpenFDA not available");

    const data = await res.json();
    const result = data.results?.[0];
    if (!result) throw new Error("No OpenFDA results");

    const sections: string[] = [];

    const extract = (field: any) =>
      Array.isArray(field) ? field[0]?.slice(0, 600) : "";

    if (result.openfda?.brand_name)
      sections.push(`Brand Name: ${result.openfda.brand_name.join(", ")}`);
    if (result.openfda?.generic_name)
      sections.push(`Generic Name: ${result.openfda.generic_name.join(", ")}`);
    if (result.openfda?.pharm_class_epc)
      sections.push(`Drug Class: ${result.openfda.pharm_class_epc.join(", ")}`);
    if (result.indications_and_usage)
      sections.push(`Indications & Usage: ${extract(result.indications_and_usage)}`);
    if (result.dosage_and_administration)
      sections.push(`Dosage: ${extract(result.dosage_and_administration)}`);
    if (result.warnings)
      sections.push(`Warnings: ${extract(result.warnings)}`);
    if (result.adverse_reactions)
      sections.push(`Adverse Reactions: ${extract(result.adverse_reactions)}`);
    if (result.contraindications)
      sections.push(`Contraindications: ${extract(result.contraindications)}`);

    return sections.length > 0
      ? `[FDA Official Data]\n${sections.join("\n\n")}`
      : "";
  } catch {
    return ""; // Silently fail — Gemma will rely on its own training
  }
}

// ─────────────────────────────────────────────
// RAG Helper: Fetch medicine data from Wikipedia
// ─────────────────────────────────────────────
async function fetchWikipediaData(medicineName: string): Promise<string> {
  try {
    const encodedName = encodeURIComponent(medicineName);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedName}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error("Wikipedia not available");

    const data = await res.json();
    if (data.type === "disambiguation" || !data.extract) throw new Error("No clear article");

    const extract = data.extract?.slice(0, 800) ?? "";
    return extract ? `[Wikipedia Summary]\n${extract}` : "";
  } catch {
    return ""; // Silently fail
  }
}

// ─────────────────────────────────────────────
// Main API Route
// ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { medicineName, sickness } = await request.json();

    if (!medicineName || medicineName.trim() === "") {
      return NextResponse.json({ error: "Medicine name is required" }, { status: 400 });
    }

    // Fetch real-world data in parallel (RAG)
    const [fdaData, wikiData] = await Promise.all([
      fetchOpenFDAData(medicineName),
      fetchWikipediaData(medicineName),
    ]);

    // Build the RAG context block
    const ragContext =
      [fdaData, wikiData].filter(Boolean).join("\n\n") ||
      "No external data was available. Use your own medical knowledge.";

    const sicknessClause =
      sickness && sickness.trim() !== ""
        ? `The patient reports the following sickness or symptom: "${sickness}". Evaluate whether this medicine is appropriate for this condition.`
        : `No sickness was specified. Leave "isAppropriate" as null and "appropriatenessReason" as "No condition specified by user." Provide empty "alternatives" array.`;

    const systemPrompt = `You are a world-class pharmacologist and medical assistant AI.
A user has provided a medicine name. Your job is to give a detailed, accurate, and patient-friendly review of the medicine.

You have been provided with real-world reference data below. Use it to give the most accurate and up-to-date answer possible. 
If the reference data contradicts your training, prefer the reference data.

=== REFERENCE DATA (RAG) ===
${ragContext}
=== END REFERENCE DATA ===

${sicknessClause}

Provide a JSON response with these exact fields:

{
  "name": "The standardized full medicine name with any common brand names in parentheses",
  "drugClass": "Pharmacological class (e.g. NSAID, Beta-blocker, Antibiotic)",
  "uses": ["Primary use 1", "Primary use 2", "..."],
  "sideEffects": {
    "common": ["Side effect 1", "Side effect 2"],
    "severe": ["Severe side effect 1", "..."]
  },
  "dosageNotes": "Brief general dosage guidance (e.g., 'Usually taken once daily after food, as directed by a physician.')",
  "warnings": ["Important warning 1", "Important warning 2"],
  "isAppropriate": true or false or null,
  "appropriatenessReason": "A brief, clear explanation of why this medicine is or is not indicated for the patient's sickness. If no sickness was specified, write 'No condition specified by user.'",
  "alternatives": ["Alternative medicine 1 for the condition", "Alternative medicine 2"],
  "dataSource": "FDA + Wikipedia" or "AI Knowledge" depending on whether reference data was used
}

IMPORTANT: Return ONLY the valid JSON object. No markdown. No explanation outside the JSON.`;

    const useLocalAI = process.env.USE_LOCAL_AI === "true";
    let rawText = "";
    let parsedResult;

    if (useLocalAI) {
      console.log("Using local Ollama AI for medicine review");
      rawText = await callOllama(
        `Medicine to review: "${medicineName}"`,
        systemPrompt
      );
      try {
        parsedResult = parseOllamaJSON(rawText);
      } catch {
        return NextResponse.json(
          { error: "Local AI model returned invalid JSON. Please try again.", raw: rawText },
          { status: 500 }
        );
      }
    } else {
      console.log("Using cloud Gemini AI for medicine review");
      rawText = await callGemini(
        `Medicine to review: "${medicineName}"`,
        systemPrompt
      );
      try {
        parsedResult = parseGeminiJSON(rawText);
      } catch {
        return NextResponse.json(
          { error: "AI model returned invalid JSON. Please try again.", raw: rawText },
          { status: 500 }
        );
      }
    }

    const ragUsed = !!(fdaData || wikiData);
    return NextResponse.json({ success: true, ragEnhanced: ragUsed, ...parsedResult });
  } catch (error: any) {
    console.error("Medicine Reviewer API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to review medicine" },
      { status: 500 }
    );
  }
}
