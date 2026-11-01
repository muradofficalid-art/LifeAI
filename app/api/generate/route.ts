// app/api/generate/route.ts - REAL SDXL ENGINE
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const res = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: `${prompt}, cinematic 8K, ultra realistic, Lahore, Netflix documentary` }),
    }
  );
  const blob = await res.arrayBuffer();
  const base64 = Buffer.from(blob).toString("base64");
  return new Response(JSON.stringify({ image: `data:image/png;base64,${base64}` }), {
    headers: { "Content-Type": "application/json" },
  });
}
