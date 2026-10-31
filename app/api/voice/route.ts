export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();
    
    const allowed = ["ur-PK-AsadNeural", "hi-IN-SwaraNeural", "en-US-GuyNeural"];
    const finalVoice = allowed.includes(voice) ? voice : "ur-PK-AsadNeural";
    
    if (!text) {
      return new Response(JSON.stringify({ error: "Text empty" }), { status: 400 });
    }

    const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${finalVoice}'>${text}</voice></speak>`;

    // Edge TTS WebSocket - FREE UNLIMITED - No Key
    const audioBuffer = await new Promise<Buffer>((resolve, reject) => {
      const WebSocket = global.WebSocket;
      const ws = new WebSocket("wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4");
      
      let buffers: Buffer[] = [];
      
      ws.onopen = () => {
        const config = `X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
        ws.send(config);
        
        const ssmlMsg = `X-RequestId:${Date.now().toString(16)}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${new Date().toISOString()}\r\nPath:ssml\r\n\r\n${ssml}`;
        ws.send(ssmlMsg);
      };
      
      ws.onmessage = async (event: any) => {
        const data = event.data;
        if (typeof data === "string") {
          if (data.includes("Path:turn.end")) {
            ws.close();
            resolve(Buffer.concat(buffers));
          }
        } else {
          // Binary audio
          const buffer = Buffer.from(await (data as Blob).arrayBuffer());
          // Find audio data after header
          const headerIndex = buffer.toString().indexOf("Path:audio");
          if (headerIndex !== -1) {
            const audioStart = buffer.indexOf("\r\n\r\n", headerIndex) + 4;
            buffers.push(buffer.subarray(audioStart));
          }
        }
      };
      
      ws.onerror = (e) => reject(e);
      
      // Timeout 15 sec
      setTimeout(() => {
        ws.close();
        if (buffers.length > 0) resolve(Buffer.concat(buffers));
        else reject(new Error("TTS Timeout"));
      }, 15000);
    });

    return new Response(audioBuffer, {
      headers: { 
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString()
      },
    });

  } catch (err: any) {
    console.error("TTS Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
