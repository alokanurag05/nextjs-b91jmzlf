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
        model: "gpt-3.5-turbo", // 👈 safer model for now
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      insight:
        data?.choices?.[0]?.message?.content ||
        JSON.stringify(data),
    });

  } catch (error) {
    return NextResponse.json({
      insight: "Error generating insight",
    });
  }
}