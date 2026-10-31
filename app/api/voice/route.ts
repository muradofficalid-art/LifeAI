export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();
    
    if (!text) return new Response("No text", { status: 400 });

    // Map our 3 locked voices to Google language
    let lang = "ur";
    if (voice?.includes("hi-IN")) lang = "hi";
    if (voice?.includes("en-US")) lang = "en";

    // Google FREE TTS - Unlimited - Works on Vercel
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&q=${encodeURIComponent(text)}&client=tw-ob&ttsspeed=1`;

    const audioRes = await fetch(googleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://translate.google.com/",
      },
    });

    if (!audioRes.ok || !audioRes.body) {
      return new Response(JSON.stringify({ error: "Google TTS failed" }), { status: 500 });
    }

    return new Response(audioRes.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      },
    });

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
