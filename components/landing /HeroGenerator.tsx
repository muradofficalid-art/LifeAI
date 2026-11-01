"use client";
import { useState } from "react";

export default function HeroGenerator() {
  const [status, setStatus] = useState("Ready");
  
  const generateFinalVideo = async () => {
    const scriptText = `Subah 5 baje Lahore ki street, chai ka khokha, halki dhuund.
Ek Pakistani larka 22 saal ka laptop khol raha hai chai ke sath, aankhon me junoon.
Duniya ke log office ja rahe hain bheed me, wo akela apne sapne pe kaam kar raha hai.
Raat ke 2 baje laptop screen ki roshni, thakan ke bawajood muskurahat.
Subah phir se, wahi larka ab apni shop ke bahar khara hai, kamyabi.`;

    const scenes = scriptText.split("\n").filter(s=>s.trim()!="");
    setStatus(`0/${scenes.length} scenes generating...`);

    const canvas = document.createElement("canvas");
    canvas.width = 1280; canvas.height = 720;
    const ctx = canvas.getContext("2d")!;
    
    const images: HTMLImageElement[] = [];
    // STEP 1: Generate 5 REAL images one by one
    for (let i=0; i<scenes.length; i++) {
      setStatus(`${i+1}/${scenes.length} image ban rahi hai...`);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ prompt: scenes[i] }),
      });
      const { image } = await res.json();
      const img = new Image();
      img.src = image;
      await new Promise(r => img.onload = r as any);
      images.push(img);
    }

    // STEP 2: Render 4 sec per image = 20 sec demo (1 min ke liye 12 sec kar dena)
    setStatus("Video bana raha hun...");
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.start();

    for (let idx=0; idx<images.length; idx++) {
      const img = images[idx];
      const text = scenes[idx];
      for (let frame=0; frame<120; frame++) { // 120 frames = 4 sec
        const zoom = 1 + frame*0.002;
        const w = canvas.width * zoom;
        const h = canvas.height * zoom;
        ctx.drawImage(img, (canvas.width - w)/2, (canvas.height - h)/2, w, h);
        // Subtitle
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 620, canvas.width, 100);
        ctx.fillStyle = "white";
        ctx.font = "bold 28px sans-serif";
        ctx.fillText(text.slice(0, 70), 30, 670);
        await new Promise(r => setTimeout(r, 33));
      }
    }
    
    recorder.stop();
    await new Promise(r => recorder.onstop = r);
    setStatus("Ready - Video Ban Gaya!");
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "lifeai-video.webm"; a.click();
  };

  return (
    <div>
      <button onClick={generateFinalVideo} className="bg-black text-white p-4 rounded">
        {status}
      </button>
    </div>
  );
}
