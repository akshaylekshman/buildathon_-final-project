import { NextResponse } from "next/server";
import { callGeminiChat } from "@/lib/gemini";
import { callOllamaChat } from "@/lib/ollama";

const SYSTEM_INSTRUCTION = `You are Gemma, an AI healthcare assistant inside a health app called MediBridge.
You help users understand their symptoms, medications, and medical reports in a friendly, clear, and non-alarmist way.
Always recommend consulting a real doctor for serious or urgent conditions.
Keep responses concise and patient-friendly.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const useLocalAI = process.env.USE_LOCAL_AI === "true";
    let text = "";

    if (useLocalAI) {
      console.log("Using local Ollama AI for chat");
      text = await callOllamaChat(messages, SYSTEM_INSTRUCTION);
    } else {
      console.log("Using cloud Gemini AI for chat");
      text = await callGeminiChat(messages, SYSTEM_INSTRUCTION);
    }

    return NextResponse.json({
      message: { role: "assistant", content: text },
    });
  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to communicate with AI model" },
      { status: 500 }
    );
  }
}
