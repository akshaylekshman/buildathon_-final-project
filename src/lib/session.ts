import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET_KEY = process.env.SESSION_SECRET || "nexcare-ai-super-secret-key-32bytes-long!";
const ALGORITHM = "aes-256-cbc";
const KEY = crypto.scryptSync(SECRET_KEY, "session-salt", 32);

export interface SessionPayload {
  userId: string;
  expiresAt: string;
}

export function encrypt(payload: SessionPayload): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(token: string): SessionPayload | null {
  try {
    const [ivHex, encryptedHex] = token.split(":");
    if (!ivHex || !encryptedHex) return null;
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted) as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = encrypt({ userId, expiresAt: expiresAt.toISOString() });
  
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
  
  const payload = decrypt(sessionCookie);
  if (!payload) return null;
  
  // Check if session has expired
  if (new Date(payload.expiresAt) < new Date()) {
    await deleteSession();
    return null;
  }
  
  return payload;
}
