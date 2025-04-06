import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

export async function POST() {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: "Hi, generate a random activity for me to do right now, because I'm so bored" }
      ]
    });

    const activity = response.choices?.[0]?.message?.content || "No activity generated";

    return NextResponse.json({ activity });
  } catch (error: unknown) {
    return "There's an unknown error";
  }
}
