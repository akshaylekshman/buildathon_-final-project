import { NextResponse } from "next/server";
import { callGemini, parseGeminiJSON } from "@/lib/gemini";
import { callOllama, parseOllamaJSON } from "@/lib/ollama";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const systemPrompt = `You are an expert AI medical assistant specialized in reading laboratory and medical reports.
Analyze the provided report text and extract key health metrics, summarizing the findings in plain, patient-friendly English.

Identify:
1. "summary": A patient-friendly summary (2-3 sentences) explaining the key findings and what they mean in simple terms.
2. "riskIndicators": Array of objects for values outside normal ranges or requiring attention. Each object contains:
   - "name": Parameter name (e.g. "Hemoglobin", "Cholesterol").
   - "value": The value and units from the report (e.g. "11.2 g/dL").
   - "status": Must be "low" or "high" or "normal".
3. "normalValues": Array of strings of parameter names that are normal (e.g. ["WBC Count", "Platelets"]).
4. "recommendations": Array of practical health or dietary tips based on the results (e.g. "Eat more iron-rich foods like spinach", "Consult a physician").
5. "questionsToAsk": Array of 2-3 specific questions the patient should ask their doctor at their next visit.

Your response must be a single, valid JSON object matching this schema:

{
  "success": true,
  "summary": "string",
  "riskIndicators": [
    {
      "name": "string",
      "value": "string",
      "status": "low"
    }
  ],
  "normalValues": ["string"],
  "recommendations": ["string"],
  "questionsToAsk": ["string"]
}
`;

    const useLocalAI = process.env.USE_LOCAL_AI === "true";
    let rawText = "";
    let parsedResult;

    if (useLocalAI) {
      console.log("Using local Ollama AI for report analysis");
      rawText = await callOllama(
        `Report Text to analyze:\n${text}`,
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
      console.log("Using cloud Gemini AI for report analysis");
      rawText = await callGemini(
        `Report Text to analyze:\n${text}`,
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

    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error("Medical Report API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze medical report" },
      { status: 500 }
    );
  }
}
