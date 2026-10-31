export const runtime = "nodejs";
export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();
    if (!text) return new Response("No text", { status: 400 });
    let lang = "ur"; if (voice?.includes("hi-IN")) lang = "hi"; if (voice?.includes("en-US")) lang = "en";
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&q=${encodeURIComponent(text)}&client=tw-ob`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://translate.google.com/" } });
    if (!r.body) throw new Error("TTS fail");
    return new Response(r.body, { headers: { "Content-Type": "audio/mpeg" } });
  } catch (e:any) { return new Response(e.message, { status: 500 }); }
}
