import { ALLOWED_VOICES } from "@/lib/audio";

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();
    
    const allowed = ["ur-PK-AsadNeural", "hi-IN-SwaraNeural", "en-US-GuyNeural"];
    const finalVoice = allowed.includes(voice) ? voice : "ur-PK-AsadNeural";

    // Dynamic import - Vercel pe error nahi dega
    const EdgeTTSModule: any = await import("edge-tts");
    const EdgeTTS = EdgeTTSModule.EdgeTTS || EdgeTTSModule.default;
    
    const tts = new EdgeTTS(finalVoice);
    const audio = await tts.synthesize(text);

    return new Response(audio, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: "TTS failed" }), { status: 500 });
  }
}
