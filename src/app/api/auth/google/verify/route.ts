import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/db";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { error: "Credential token is required" },
        { status: 400 }
      );
    }

    // Decode the Google ID Token JWT (payload is the second segment)
    const parts = credential.split(".");
    if (parts.length !== 3) {
      return NextResponse.json(
        { error: "Invalid credential format" },
        { status: 400 }
      );
    }

    let payload: any;
    try {
      const payloadJson = Buffer.from(parts[1], "base64").toString("utf-8");
      payload = JSON.parse(payloadJson);
    } catch (e) {
      return NextResponse.json(
        { error: "Failed to parse credential token" },
        { status: 400 }
      );
    }

    const { email, name, sub } = payload;
    if (!email) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = findUserByEmail(email);
    if (!user) {
      user = createUser(
        name || email.split("@")[0],
        email,
        `google-oauth:${sub || Math.random().toString(36).substring(2)}`
      );
    }

    // Create session cookie
    await createSession(user.id);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google authentication error:", error);
    return NextResponse.json(
      { error: "Google authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
