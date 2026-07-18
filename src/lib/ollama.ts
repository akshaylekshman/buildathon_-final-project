// ─────────────────────────────────────────────────────────────────────────────
// Ollama API Helper
// Uses local Ollama instance running gemma model
// ─────────────────────────────────────────────────────────────────────────────

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma4:e2b";

/**
 * Call Ollama with a simple text prompt.
 * Returns the response text (raw string).
 */
export async function callOllama(prompt: string, systemInstruction?: string): Promise<string> {
  let fullPrompt = prompt;
  if (systemInstruction) {
    fullPrompt = `${systemInstruction}\n\n${prompt}`;
  }

  const res = await fetch(`${OLLAMA_API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: fullPrompt,
      stream: false,
      options: {
        temperature: 0.2,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Ollama API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.response ?? "";
}

/**
 * Call Ollama with a multi-turn conversation (chat messages).
 * messages should follow { role: "user"|"assistant", content: string } shape.
 */
export async function callOllamaChat(
  messages: { role: string; content: string }[],
  systemInstruction?: string
): Promise<string> {
  
  // Format messages for Ollama API
  const formattedMessages = messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  if (systemInstruction) {
    // Add system instruction as the first message
    formattedMessages.unshift({
      role: "system",
      content: systemInstruction
    });
  }

  const res = await fetch(`${OLLAMA_API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: formattedMessages,
      stream: false,
      options: {
        temperature: 0.4,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Ollama API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.message?.content ?? "";
}

/**
 * Strip markdown code fences (```json ... ```) from AI responses
 * and parse as JSON.
 */
export function parseOllamaJSON(raw: string): any {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  
  // Sometimes local models output extra text before or after the JSON block.
  // We can try to extract just the first JSON object or array.
  const jsonMatch = cleaned.match(/(\{|\[)[\s\S]*(\}|\])/);
  
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      // Fallback to original
    }
  }
  
  return JSON.parse(cleaned);
}
