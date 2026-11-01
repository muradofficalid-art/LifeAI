"use client";
import { useState, useRef } from "react";

export default function MusicVideoGenerator() {
  const [idea, setIdea] = useState("Lo-fi beat with Urdu lyrics about success");
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    setGenerating(true);
    try {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = 1280; canvas.height = 720;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `https://picsum.photos/1280/720?random=${Date.now()}`;
      await new Promise(r => { img.onload = r; img.onerror = r; });
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      const promise = new Promise<string>(res => {
        recorder.onstop = () => res(URL.createObjectURL(new Blob(chunks, { type: "video/webm" })));
      });
      recorder.start();
      let f = 0;
      const draw = () => {
        if (f >= 900) { recorder.stop(); return; }
        ctx.drawImage(img, 0, 0, 1280, 720);
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0,0,1280,720);
        ctx.fillStyle = "#fff"; ctx.font = "bold 36px system-ui";
        ctx.fillText("🎵 " + idea.slice(0,40), 80, 360);
        ctx.font = "18px system-ui";
        ctx.fillText("AI Music Video Generator • 16:9 • Max 1 Min", 80, 400);
        f++; requestAnimationFrame(draw);
      }; draw();
      setVideoUrl(await promise);
    } catch {}
    setGenerating(false);
  };

  return (
    <div style={{ background: "#111122", border: "1px solid #2a2a4e", borderRadius: 20, padding: 16, color: "#fff" }}>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div style={{ fontSize: 22 }}>🎵</div>
      <h3 style={{ margin: "8px 0", fontSize: 16 }}>AI Music Video Generator</h3>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>Create music videos with lyrics</p>
      <input value={idea} onChange={e => setIdea(e.target.value)} style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: 10, color: "#fff", fontSize: 12, marginBottom: 10 }} />
      <button onClick={generate} disabled={generating} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
        {generating ? "Generating..." : "Generate Music Video"}
      </button>
      {videoUrl && <video src={videoUrl} controls style={{ width: "100%", marginTop: 12, borderRadius: 12 }}></video>}
      {videoUrl && <a href={videoUrl} download="music.webm" style={{ display: "block", textAlign: "center", background: "#00ff88", color: "#000", padding: 8, borderRadius: 10, marginTop: 8, textDecoration: "none", fontWeight: 700, fontSize: 12 }}>⬇️ Download</a>}
    </div>
  );
}
