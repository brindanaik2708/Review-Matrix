import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "AI sharpening is unavailable: OPENAI_API_KEY is not configured." }, { status: 400 });
  const { reason, category } = await request.json() as { reason: string; category: string };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini", temperature: 0.2, messages: [{ role: "system", content: "Rewrite pull-request risk reasons in one concise, factual sentence. Do not assign or imply a different score." }, { role: "user", content: `Category: ${category}\nReason: ${reason}` }] })
  });
  if (!response.ok) return NextResponse.json({ error: "AI sharpening failed. Check the server-side API configuration." }, { status: 502 });
  const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const sharpened = payload.choices?.[0]?.message?.content?.trim();
  if (!sharpened) return NextResponse.json({ error: "AI sharpening returned no explanation." }, { status: 502 });
  return NextResponse.json({ reason: sharpened });
}
