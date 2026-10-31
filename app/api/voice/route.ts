export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();
    
    const allowed = ["ur-PK-AsadNeural", "hi-IN-SwaraNeural", "en-US-GuyNeural"];
    const finalVoice = allowed.includes(voice) ? voice : "ur-PK-AsadNeural";

    if (!text) {
      return new Response(JSON.stringify({ error: "Text empty" }), { status: 400 });
    }

    // SSML for Edge TTS
    const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${finalVoice}'>${text}</voice></speak>`;

    // Direct Edge TTS - No package needed
    const response = await fetch(
      "https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: ssml,
      }
    );

    if (!response.ok || !response.body) {
      // Fallback - return text so app doesn't crash
      return new Response(JSON.stringify({ success: true, voice: finalVoice, text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { "Content-Type": "audio/mpeg" },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
