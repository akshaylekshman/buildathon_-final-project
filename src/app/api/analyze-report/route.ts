import { NextResponse } from "next/server";

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

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma4:e2b",
        prompt: `${systemPrompt}\n\nReport Text to analyze:\n${text}`,
        format: "json",
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Ollama error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(data.response);
    } catch (parseError) {
      console.error("Failed to parse JSON response from Ollama:", data.response);
      return NextResponse.json({
        success: false,
        error: "Invalid JSON returned by AI model",
        raw: data.response
      }, { status: 500 });
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
