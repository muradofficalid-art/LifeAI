import { ALLOWED_VOICES } from "@/lib/audio";

export async function POST(req: Request) {
  const { text, voice } = await req.json();
  
  // Lock to 3 voices only
  const finalVoice = ALLOWED_VOICES.includes(voice) ? voice : "ur-PK-AsadNeural";

  // Edge TTS Call - FREE UNLIMITED
  // npm i edge-tts
  const { EdgeTTS } = require("edge-tts");
  const tts = new EdgeTTS(finalVoice);
  const audio = await tts.synthesize(text);

  return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } });
}
