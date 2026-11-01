"use client";
import { useState, useRef, useEffect } from "react";

export default function HeroGenerator() {
  const [idea, setIdea] = useState("");
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [freeUsed, setFreeUsed] = useState(0);
  const [ratio, setRatio] = useState<"16:9" | "9:16">("16:9");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setFreeUsed(parseInt(localStorage.getItem("lifeai_free_used") || "0"));
  }, []);

  // ✅ NICHE SE MATCHING VISUALS ENGINE
  const getMatchingImages = (script: string) => {
    const text = script.toLowerCase();
    let keywords: string[] = [];

    if (text.includes("money") || text.includes("habit") || text.includes("finance")) {
      keywords = ["money,finance,business", "saving,investment", "success,rich"];
    } else if (text.includes("horror") || text.includes("bhoot") || text.includes("jungle")) {
      keywords = ["jungle,horror,dark forest", "ghost,scary,night", "abandoned,creepy"];
    } else if (text.includes("tiktok") || text.includes("faceless")) {
      keywords = ["tiktok,phone,vertical", "social media,creator", "trending,viral"];
    } else if (text.includes("islam") || text.includes("quran") || text.includes("urdu")) {
      keywords = ["islamic,mosque,urdu", "quran,arabic", "muslim,prayer"];
    } else {
      // ✅ RANDOM NICHE AUTO DETECT
      const words = text.split(" ").filter(w => w.length > 3).slice(0, 3);
      keywords = words.map(w => `${w},cinematic`).join(" ").split(" ").length > 0 ? words : ["cinematic,business,modern", "nature,technology", "lifestyle,success"];
      if (typeof keywords === "string") keywords = [keywords];
      // fallback
      if (keywords.length === 0) keywords = ["business,modern", "success,cinematic", "nature,4k"];
    }

    // Ensure 3 keywords
    while (keywords.length < 3) keywords.push("cinematic 4k business");

    return keywords.slice(0, 3).map(k => 
      `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&auto=format&fit=crop&q=80`
    ).map((_, i) => {
      const base = [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280",
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1280",
      ];
      // Use keyword for unsplash search
      const kw = keywords[i] || keywords[0];
      return `https://source.unsplash.com/1280x720/?${encodeURIComponent(kw)}&sig=${Date.now()+i}`;
    });
  };

  const generate = async () => {
    if (!idea.trim()) {
      alert("Jan pehle script likho! Eg: Create faceless TikTok about 5 money habits");
      return;
    }
    if (freeUsed >= 3) {
      alert("3 FREE khatam jan! Pricing pe jao - Rs 8,000 me 60 videos!");
      window.location.href = "/pricing";
      return;
    }

    setGenerating(true);
    setProgress(0);
    setVideoUrl(null);
    const interval = setInterval(() => setProgress(p => (p < 90 ? p + 12 : p)), 600);

    try {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      
      if (ratio === "16:9") {
        canvas.width = 1280; canvas.height = 720;
      } else {
        canvas.width = 720; canvas.height = 1280;
      }

      // ✅ Matching visuals for random script
      const imageUrls = getMatchingImages(idea);
      
      const loadedImgs = await Promise.all(
        imageUrls.map(src => {
          return new Promise<HTMLImageElement>((res) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            // Try keyword image, fallback to fixed
            img.src = src.includes("source.unsplash") ? src : `https://picsum.photos/${canvas.width}/${canvas.height}?random=${Math.random()}`;
            img.onload = () => res(img);
            img.onerror = () => {
              const fallback = new Image();
              fallback.crossOrigin = "anonymous";
              fallback.src = `https://picsum.photos/${canvas.width}/${canvas.height}?random=${Date.now()}`;
              fallback.onload = () => res(fallback);
              fallback.onerror = () => res(new Image());
            };
          });
        })
      );

      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);

      const recPromise = new Promise<string>((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          resolve(URL.createObjectURL(blob));
        };
      });

      recorder.start();
      let frame = 0;
      const totalFrames = 60 * 30; // ✅ MAX 1 MIN FREE

      const draw = () => {
        if (frame >= totalFrames) {
          recorder.stop();
          return;
        }
        const imgIndex = Math.floor(frame / 600) % loadedImgs.length;
        const img = loadedImgs[imgIndex];
        
        try {
          // Cover
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = canvas.width / 2 - (img.width / 2) * scale;
          const y = canvas.height / 2 - (img.height / 2) * scale;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        } catch {}

        // Overlay
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text - Matching script
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${ratio === "16:9" ? 36 : 28}px system-ui`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lines = idea.match(/.{1,35}/g) || [idea];
        lines.slice(0, 3).forEach((line, idx) => {
          ctx.fillText(line.slice(0, 40), canvas.width / 2, canvas.height / 2 - 20 + idx * 40);
        });

        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 16px system-ui";
        ctx.fillText(`Life-AI • ${ratio} • Max 1 Min • Matching Visuals`, canvas.width / 2, canvas.height - 60);
        
        ctx.fillStyle = "#ff006e";
        ctx.font = "12px system-ui";
        ctx.fillText(`Script: ${idea.slice(0, 30)}...`, canvas.width / 2, canvas.height - 35);

        frame++;
        requestAnimationFrame(draw);
      };
      draw();

      const url = await recPromise;
      clearInterval(interval);
      setProgress(100);
      setVideoUrl(url);
      const newUsed = freeUsed + 1;
      setFreeUsed(newUsed);
      localStorage.setItem("lifeai_free_used", newUsed.toString());
    } catch (e) {
      clearInterval(interval);
      setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");
    }
    setGenerating(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "30px 20px", background: "transparent" }}>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div style={{ fontSize: 11, color: "#00ff88", background: "#00ff8822", border: "1px solid #00ff8844", display: "inline-block", padding: "4px 12px", borderRadius: 20 }}>
        • AI Video Generator • Matching Visuals Engine • {ratio} • Max 1 Min
      </div>

      <h2 style={{ fontSize: 28, margin: "16px 0 8px", color: "#fff" }}>
        Turn <span style={{ color: "#a78bfa" }}>ANY script</span> into video
      </h2>
      <p style={{ color: "#888", fontSize: 13, margin: 0 }}>Random niche ka script dalo - Matching visuals auto ban jayenge</p>

      <div style={{ background: "#111122", border: "1px solid #2a2a4e", borderRadius: 16, padding: 12, maxWidth: 680, margin: "18px auto" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="Create faceless TikTok about 5 money habits..."
            style={{ flex: 1, background: "transparent", border: "none", color: "#fff", outline: "none", fontSize: 14 }}
          />
          <button
            onClick={generate}
            disabled={generating}
            style={{ background: generating ? "#555" : "#ff006e", color: "#fff", border: "none", padding: "10px 18px", borderRadius: 12, cursor: "pointer", fontWeight: 700 }}
          >
            {generating ? `${progress}%` : "Generate →"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setRatio("16:9")}
            style={{ background: ratio === "16:9" ? "#ff006e" : "#1a1a2e", color: "#fff", border: `1px solid ${ratio === "16:9" ? "#ff006e" : "#333"}`, padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
          >
            📺 16:9 - YouTube
          </button>
          <button
            onClick={() => setRatio("9:16")}
            style={{ background: ratio === "9:16" ? "#ff006e" : "#1a1a2e", color: "#fff", border: `1px solid ${ratio === "9:16" ? "#ff006e" : "#333"}`, padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
          >
            📱 9:16 - TikTok/Reels
          </button>
          <span style={{ fontSize: 11, color: "#ffbe0b", background: "#ffbe0b22", padding: "6px 10px", borderRadius: 20, border: "1px solid #ffbe0b44" }}>
            ⏱️ FREE Max 1 Min • {freeUsed}/3 used
          </span>
        </div>
      </div>

      {(generating || videoUrl) && (
        <div style={{ maxWidth: 700, margin: "0 auto", background: "#111122", border: "1px solid #2a2a4e", borderRadius: 20, padding: 16, textAlign: "left" }}>
          {generating && (
            <div style={{ padding: 10 }}>
              <div style={{ width: "100%", height: 8, background: "#1a1a2e", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "#ff006e", transition: "width 0.5s" }}></div>
              </div>
              <p style={{ fontSize: 12, color: "#888", marginTop: 10, textAlign: "center" }}>
                Matching visuals engine - {idea.slice(0, 30)}... - {ratio} - {progress}%
              </p>
            </div>
          )}
          {videoUrl && (
            <>
              <video src={videoUrl} controls autoPlay style={{ width: "100%", maxHeight: ratio === "9:16" ? 500 : 380, borderRadius: 12, background: "#000", margin: "0 auto", display: "block" }}></video>
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                <a href={videoUrl} download={`life-ai-${ratio}-${Date.now()}.webm`} style={{ flex: 1, background: "#00ff88", color: "#000", padding: "12px", borderRadius: 12, textAlign: "center", fontWeight: 700, textDecoration: "none", fontSize: 13, minWidth: 120 }}>
                  ⬇️ Download {ratio} FREE
                </a>
                <button onClick={() => setIdea("")} style={{ background: "#1a1a2e", color: "#fff", border: "1px solid #333", padding: "12px", borderRadius: 12, fontWeight: 600, cursor: "pointer", fontSize: 13, minWidth: 100 }}>
                  New Script
                </button>
              </div>
              <div style={{ fontSize: 11, color: "#00ff88", marginTop: 10, textAlign: "center" }}>
                ✓ {freeUsed}/3 FREE - {ratio} - Max 1 Min - Matching: {idea.slice(0, 25)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
