"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se explain video - Business ke liye", color: "#ff006e", side: false },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals - Auto sync FREE", color: "#8338ec", side: false },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - Script to Video - 5 FREE", color: "#00ff88", side: false },
  { id: "voice", icon: "🎙️", title: "AI Voiceover", desc: "SIDE PE - Filhal Band", color: "#ffbe0b", side: true },
  { id: "avatar", icon: "🧑‍🎤", title: "AI Avatar", desc: "Avatar se video - Canvas FREE", color: "#3a86ff", side: true },
  { id: "translator", icon: "🌐", title: "Translator", desc: "Urdu/Hindi/English FREE", color: "#fb5607", side: true },
];

export default function LandingPage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [freeUsed, setFreeUsed] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login"|"signup">("signup");
  const [ratio, setRatio] = useState<"16:9"|"9:16">("16:9");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [detail, setDetail] = useState<{open:boolean, title:string, desc:string, icon:string, points:string[]}|null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{ setFreeUsed(parseInt(localStorage.getItem("lifeai_free_used") || "0")); },[]);

  // FINAL PRO - COPYRIGHT SAFE + USER SATISFY
  const generateOnLanding = async () => {
    if(!idea.trim()){ alert("Jan pehle idea likho! Eg: 5 money habits"); return; }
    if(freeUsed >= 5){ alert("5 FREE khatam jan! Pricing - Rs 8,000 me 60 videos!"); router.push('/pricing'); return; }
    setGenerating(true); setProgress(5); setVideoUrl(null);
    try {
      const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
      if(ratio === "16:9"){ canvas.width = 1280; canvas.height = 720; } else { canvas.width = 720; canvas.height = 1280; }
      
      setProgress(15);
      const res = await fetch('/api/auto-brain', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ input: idea })
      });
      const data = await res.json();
      if(!data.success) throw new Error(data.error);
      
      const loadedVids: HTMLVideoElement[] = [];
      for(let i=0; i<data.clips.length; i++){
        setProgress(20 + i*12);
        const v = document.createElement('video');
        v.crossOrigin="anonymous"; v.muted=true; v.playsInline=true;
        v.src = data.clips[i].videoUrl;
        await new Promise<void>((resolve)=>{
          v.onloadeddata=()=>resolve();
          v.onerror=()=>resolve();
          setTimeout(()=>resolve(),2500);
        });
        loadedVids.push(v);
      }
      
      setProgress(85);
      const stream = canvas.captureStream(30); 
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' }); 
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      const recPromise = new Promise<string>((resolve)=>{
        recorder.onstop = ()=>{ resolve(URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }))); }; 
      });
      recorder.start(); 
      let frame = 0; const totalFrames = 20*30;
      
      const draw = () => {
        if(frame >= totalFrames){ recorder.stop(); return; }
        const idx = Math.min(Math.floor(frame / (4*30)), loadedVids.length-1);
        const clip = data.clips[idx];
        try{ 
          const v = loadedVids[idx];
          if(v.paused) v.play().catch(()=>{});
          
          // === COPYRIGHT SAFE EDITING - YOUTUBE ORIGINAL ===
          const progressInScene = (frame % (4*30)) / (4*30);
          let scale = 1, x=0, y=0;
          if(clip.effect==="zoomIn") scale = 1 + progressInScene*0.25;
          if(clip.effect==="zoomOut") scale = 1.25 - progressInScene*0.25;
          if(clip.effect==="panLeft") x = -progressInScene*100;
          if(clip.effect==="panRight") x = progressInScene*100;

          ctx.save();
          ctx.translate(canvas.width/2 + x, canvas.height/2 + y);
          ctx.scale(scale, scale);
          ctx.translate(-canvas.width/2, -canvas.height/2);
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          // Cinematic dark overlay - original grading
          ctx.fillStyle = "rgba(5,5,16,0.35)";
          ctx.fillRect(0,0,canvas.width,canvas.height);

          // Vignette corners - Pro look
          const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height*0.3, canvas.width/2, canvas.height/2, canvas.width);
          grad.addColorStop(0, "rgba(0,0,0,0)");
          grad.addColorStop(1, "rgba(0,0,0,0.5)");
          ctx.fillStyle = grad;
          ctx.fillRect(0,0,canvas.width,canvas.height);

          // TikTok Style Text Box - USER SATISFY
          const txt = clip.text;
          ctx.fillStyle = "rgba(0,0,0,0.75)";
          ctx.fillRect(20, canvas.height-150, canvas.width-40, 85);
          ctx.fillStyle = "#fff";
          ctx.font = `bold ${ratio==="16:9" ? 20 : 16}px system-ui`;
          ctx.textAlign = "center";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 3;
          // Wrap 2 lines
          const line1 = txt.slice(0,45);
          const line2 = txt.slice(45,90);
          ctx.strokeText(line1, canvas.width/2, canvas.height-115);
          ctx.fillText(line1, canvas.width/2, canvas.height-115);
          if(line2){ ctx.strokeText(line2, canvas.width/2, canvas.height-90); ctx.fillText(line2, canvas.width/2, canvas.height-90); }

          // Watermark - Original content proof
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.font = "bold 11px system-ui";
          ctx.textAlign = "left";
          ctx.fillText("Life-AI • Original Edit", 28, 28);
          ctx.textAlign = "right";
          ctx.fillStyle = "#00ff88";
          ctx.fillText(`Scene ${idx+1}/5 • ${clip.effect}`, canvas.width-28, 28);

        }catch{}
        frame++; requestAnimationFrame(draw);
      }; draw();
      
      const url = await recPromise; 
      setProgress(100); 
      setVideoUrl(url);
      const newUsed = freeUsed+1; 
      setFreeUsed(newUsed); 
      localStorage.setItem("lifeai_free_used", newUsed.toString());
    } catch(e:any){ alert("Pixabay busy jan: "+e.message); }
    setGenerating(false);
  };

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      <canvas ref={canvasRef} style={{display:"none"}}></canvas>
      <header style={{padding:"14px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e", position:"sticky", top:0, background:"rgba(5,5,16,0.95)", backdropFilter:"blur(10px)", zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:8, cursor:"pointer"}} onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%", boxShadow:"0 0 10px #ff006e"}}></div><b>Life-AI</b><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"2px 8px", borderRadius:10, marginLeft:6, border:"1px solid #00ff8844"}}>{freeUsed}/5 FREE</span></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={()=>router.push('/pricing')} style={{background:"transparent", color:"#aaa", border:"none", padding:"6px 10px", borderRadius:20, cursor:"pointer", fontSize:13}}>Pricing</button>
          <button onClick={()=>{setAuthMode("login"); setShowAuth(true)}} style={{background:"transparent", color:"#fff", border:"1px solid #333", padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:13}}>Login</button>
          <button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{background:"#ff006e", color:"#fff", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer", fontWeight:600, fontSize:13}}>Get started →</button>
        </div>
      </header>
      <div style={{textAlign:"center", padding:"60px 20px 30px"}}>
        <div style={{fontSize:12, color:"#00ff88", background:"#00ff8822", border:"1px solid #00ff8844", display:"inline-block", padding:"5px 14px", borderRadius:20}}>• Fliki Pro • 5 Scenes • Copyright Safe • HD</div>
        <h1 style={{fontSize:42, margin:"20px 0", lineHeight:1.1, fontWeight:900}}>Turn idea into videos<br/><span style={{background:"linear-gradient(90deg,#ff006e,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>with AI voices</span></h1>
        <p style={{color:"#888", fontSize:14}}>5 Unique Scenes • Zoom Effects • Original Edit • No Reused Content</p>
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:14, maxWidth:680, margin:"24px auto"}}>
          <div style={{display:"flex", gap:8}}><input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Create a faceless TikTok video about 5 money habits..." style={{flex:1, background:"#0a0a18", border:"1px solid #222", color:"#fff", outline:"none", fontSize:14, padding:"12px 14px", borderRadius:12}}/><button onClick={generateOnLanding} disabled={generating} style={{background: generating ? "#555" : "#ff006e", color:"#fff", border:"none", padding:"12px 20px", borderRadius:12, cursor:"pointer", fontWeight:700}}>{generating ? `${progress}%` : "Generate →"}</button></div>
          <div style={{display:"flex", gap:8, marginTop:12, justifyContent:"center", flexWrap:"wrap"}}><button onClick={()=>setRatio("16:9")} style={{background: ratio==="16:9" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="16:9" ? "#ff006e" : "#333"}`, padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📺 16:9</button><button onClick={()=>setRatio("9:16")} style={{background: ratio==="9:16" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="9:16" ? "#ff006e" : "#333"}`, padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📱 9:16</button></div>
        </div>
        {(generating || videoUrl) && (<div style={{maxWidth:700, margin:"20px auto", background:"#111122", border:"1px solid #2a2a4e", borderRadius:20, padding:16}}>{generating && <div><div style={{width:"100%", height:8, background:"#1a1a2e", borderRadius:10, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#ff006e,#a78bfa)", transition:"width 0.5s"}}></div></div><p style={{textAlign:"center", fontSize:11, color:"#888", marginTop:8}}>🎬 Fliki Pro - 5 Unique Scenes + Zoom Effects {progress}%</p></div>}{videoUrl && (<><video src={videoUrl} controls autoPlay style={{width:"100%", maxHeight: ratio==="9:16" ? 500 : 400, borderRadius:12, background:"#000"}}></video><div style={{display:"flex", gap:10, marginTop:12}}><a href={videoUrl} download={`life-ai-${Date.now()}.webm`} style={{flex:1, background:"#00ff88", color:"#000", padding:"12px", borderRadius:12, textAlign:"center", fontWeight:800, textDecoration:"none", fontSize:13}}>⬇️ Download FREE</a><button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{flex:1, background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:13}}>Get 60 Videos - Rs 8k →</button></div></>)}</div>)}
      </div>
      <div style={{ padding: "50px 20px", background: "#080810", borderTop: "1px solid #1a1a2e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}><h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>All AI Tools in One Platform</h2><p style={{ color: "#888", fontSize: 13, marginTop: 8 }}>Click any FREE card to generate • {freeUsed}/5 FREE</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
            {FEATURES.map(f=>(<div key={f.id} onClick={()=> f.side ? alert("🎙️ "+f.title+" SIDE PE hai jan - Phase 2 me ayega!") : generateOnLanding()} style={{background:f.side ? "#0e0e14" : "#111122", border:`1px solid ${f.side ? "#222" : f.color}44`, borderRadius:18, padding:18, cursor:"pointer", opacity: f.side ? 0.7 : 1}}><div style={{display:"flex", justifyContent:"space-between"}}><div style={{fontSize:28}}>{f.icon}</div><span style={{fontSize:10, background:f.side?"#222":f.color+"22", color: f.side?"#888":f.color, padding:"4px 10px", borderRadius:20, border:`1px solid ${f.color}66`, fontWeight:700}}>{f.side ? "SIDE PE" : "FREE →"}</span></div><h4 style={{margin:"12px 0 4px", fontSize:15}}>{f.title}</h4><p style={{margin:0, fontSize:12, color:"#888"}}>{f.desc} • {ratio} • 1 Min</p></div>))}
          </div>
        </div>
      </div>
      <footer style={{padding:"30px 20px", borderTop:"1px solid #1a1a2e", background:"#050510", textAlign:"center", fontSize:12, color:"#666"}}>Life-AI • Fliki Pro • Copyright Safe Original Edit • {freeUsed}/5 FREE</footer>
    </div>
  );
}
