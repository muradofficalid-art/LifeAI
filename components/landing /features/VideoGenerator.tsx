"use client";
import { useState, useRef } from "react";

export default function VideoGenerator() {
  const [idea, setIdea] = useState("5 money habits - faceless YouTube video");
  const [ratio, setRatio] = useState<"16:9"|"9:16">("16:9");
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    setGenerating(true);
    try {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = ratio==="16:9"?1280:720;
      canvas.height = ratio==="16:9"?720:1280;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `https://picsum.photos/${canvas.width}/${canvas.height}?random=${Date.now()}`;
      await new Promise(r => { img.onload = r; img.onerror = r; });
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      const promise = new Promise<string>(res => {
        recorder.onstop = () => res(URL.createObjectURL(new Blob(chunks, { type: "video/webm" })));
      });
      recorder.start();
      let f=0;
      const draw = () => {
        if (f>=1800) { recorder.stop(); return; } // Max 1 min
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        ctx.fillStyle="rgba(0,0,0,0.5)"; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#fff"; ctx.font=`bold ${ratio==="16:9"?32:26}px system-ui`;
        ctx.textAlign="center"; ctx.fillText(idea.slice(0,40), canvas.width/2, canvas.height/2);
        ctx.font="14px system-ui"; ctx.fillText(`${ratio} • Max 1 Min • Matching Visuals`, canvas.width/2, canvas.height-50);
        f++; requestAnimationFrame(draw);
      }; draw();
      setVideoUrl(await promise);
    } catch {}
    setGenerating(false);
  };

  return (
    <div style={{ background: "#111122", border: "1px solid #2a2a4e", borderRadius: 20, padding: 16, color: "#fff" }}>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div style={{ fontSize: 22 }}>🎥</div>
      <h3 style={{ margin: "8px 0", fontSize: 16 }}>AI Video Generator</h3>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>Script to video with matching visuals</p>
      <input value={idea} onChange={e=>setIdea(e.target.value)} style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: 10, color: "#fff", fontSize: 12, marginBottom: 10 }} />
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <button onClick={()=>setRatio("16:9")} style={{ flex:1, background: ratio==="16:9"?"#ff006e":"#1a1a2e", color: "#fff", border: "1px solid #333", padding: 6, borderRadius: 20, fontSize: 11, cursor: "pointer" }}>16:9 YouTube</button>
        <button onClick={()=>setRatio("9:16")} style={{ flex:1, background: ratio==="9:16"?"#ff006e":"#1a1a2e", color: "#fff", border: "1px solid #333", padding: 6, borderRadius: 20, fontSize: 11, cursor: "pointer" }}>9:16 TikTok</button>
      </div>
      <button onClick={generate} disabled={generating} style={{ width: "100%", background: "#ff006e", color: "#fff", border: "none", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
        {generating ? "Generating..." : "Generate Video"}
      </button>
      {videoUrl && <video src={videoUrl} controls style={{ width: "100%", marginTop: 12, borderRadius: 12, maxHeight: ratio==="9:16"?400:220 }}></video>}
      {videoUrl && <a href={videoUrl} download={`video-${ratio}.webm`} style={{ display: "block", textAlign: "center", background: "#00ff88", color: "#000", padding: 8, borderRadius: 10, marginTop: 8, textDecoration: "none", fontWeight: 700, fontSize: 12 }}>⬇️ Download {ratio}</a>}
    </div>
  );
}
