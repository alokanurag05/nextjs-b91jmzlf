import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // ✅ FIXED MODEL
        messages: [
          {
            role: "user",
            content: `Give a sharp business insight in 1 line:\n${prompt}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2)); // 👈 DEBUG

    return NextResponse.json({
      insight:
        data?.choices?.[0]?.message?.content ||
        "⚠️ Insight generation failed",
    });
  } catch (error) {
    console.error("ERROR:", error);

    return NextResponse.json({
      insight: "❌ API error",
    });
  }
}