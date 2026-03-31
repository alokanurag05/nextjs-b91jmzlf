import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { trend } = await req.json();

  const prompt = `Explain this trend: ${trend}. Give short business insight for India.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    insight: data.choices?.[0]?.message?.content || "No insight",
  });
}