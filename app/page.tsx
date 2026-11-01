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

  // FINAL FLIKI BRAIN - PIXABAY ONLY - NO IMAGE - DIRECT STOCK VIDEO
  const generateOnLanding = async () => {
    if(!idea.trim()){ alert("Jan pehle idea likho! Eg: 5 money habits"); return; }
    if(freeUsed >= 5){ alert("5 FREE khatam jan! Pricing - Rs 8,000 me 60 videos!"); router.push('/pricing'); return; }
    setGenerating(true); setProgress(5); setVideoUrl(null);
    try {
      const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
      if(ratio === "16:9"){ canvas.width = 1280; canvas.height = 720; } else { canvas.width = 720; canvas.height = 1280; }
      
      // 1 CALL = 5 CLIPS - FLIKI STYLE - NO 5 TIMES FETCH
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
        try{ 
          const v = loadedVids[idx];
          if(v.paused) v.play().catch(()=>{});
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height); 
        }catch{}
        ctx.fillStyle = "rgba(0,0,0,0.45)"; 
        ctx.fillRect(0, canvas.height-120, canvas.width, 120);
        ctx.fillStyle = "#fff"; 
        ctx.font = `bold ${ratio==="16:9" ? 26 : 20}px system-ui`; 
        ctx.textAlign = "center";
        // Wrap text
        const txt = data.clips[idx].text;
        ctx.fillText(txt.slice(0,80), canvas.width/2, canvas.height-60);
        ctx.fillStyle = "#00ff88"; 
        ctx.font = "14px system-ui"; 
        ctx.fillText(`Life-AI Fliki Mode • ${ratio} • Scene ${idx+1}/5`, canvas.width/2, canvas.height - 20);
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
        <div style={{fontSize:12, color:"#00ff88", background:"#00ff8822", border:"1px solid #00ff8844", display:"inline-block", padding:"5px 14px", borderRadius:20}}>• Fliki Mode • Pixabay Stock • HD</div>
        <h1 style={{fontSize:42, margin:"20px 0", lineHeight:1.1, fontWeight:900}}>Turn idea into videos<br/><span style={{background:"linear-gradient(90deg,#ff006e,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>with AI voices</span></h1>
        <p style={{color:"#888", fontSize:14}}>Generate & Download FREE - 5 Videos / Month - Max 1 Min - No Watermark</p>
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:14, maxWidth:680, margin:"24px auto"}}>
          <div style={{display:"flex", gap:8}}><input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Create a faceless TikTok video about 5 money habits..." style={{flex:1, background:"#0a0a18", border:"1px solid #222", color:"#fff", outline:"none", fontSize:14, padding:"12px 14px", borderRadius:12}}/><button onClick={generateOnLanding} disabled={generating} style={{background: generating ? "#555" : "#ff006e", color:"#fff", border:"none", padding:"12px 20px", borderRadius:12, cursor:"pointer", fontWeight:700}}>{generating ? `${progress}%` : "Generate →"}</button></div>
          <div style={{display:"flex", gap:8, marginTop:12, justifyContent:"center", flexWrap:"wrap"}}><button onClick={()=>setRatio("16:9")} style={{background: ratio==="16:9" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="16:9" ? "#ff006e" : "#333"}`, padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📺 16:9</button><button onClick={()=>setRatio("9:16")} style={{background: ratio==="9:16" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="9:16" ? "#ff006e" : "#333"}`, padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📱 9:16</button></div>
        </div>
        {(generating || videoUrl) && (<div style={{maxWidth:700, margin:"20px auto", background:"#111122", border:"1px solid #2a2a4e", borderRadius:20, padding:16}}>{generating && <div><div style={{width:"100%", height:8, background:"#1a1a2e", borderRadius:10, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#ff006e,#a78bfa)", transition:"width 0.5s"}}></div></div><p style={{textAlign:"center", fontSize:11, color:"#888", marginTop:8}}>🎬 Fliki Mode - Pixabay Stock {progress}%</p></div>}{videoUrl && (<><video src={videoUrl} controls autoPlay style={{width:"100%", maxHeight: ratio==="9:16" ? 500 : 400, borderRadius:12, background:"#000"}}></video><div style={{display:"flex", gap:10, marginTop:12}}><a href={videoUrl} download={`life-ai-${Date.now()}.webm`} style={{flex:1, background:"#00ff88", color:"#000", padding:"12px", borderRadius:12, textAlign:"center", fontWeight:800, textDecoration:"none", fontSize:13}}>⬇️ Download FREE</a><button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{flex:1, background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:13}}>Get 60 Videos - Rs 8k →</button></div></>)}</div>)}
      </div>
      <div style={{ padding: "50px 20px", background: "#080810", borderTop: "1px solid #1a1a2e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}><h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>All AI Tools in One Platform</h2><p style={{ color: "#888", fontSize: 13, marginTop: 8 }}>Click any FREE card to generate • {freeUsed}/5 FREE</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
            {FEATURES.map(f=>(<div key={f.id} onClick={()=> f.side ? alert("🎙️ "+f.title+" SIDE PE hai jan - Phase 2 me ayega!") : generateOnLanding()} style={{background:f.side ? "#0e0e14" : "#111122", border:`1px solid ${f.side ? "#222" : f.color}44`, borderRadius:18, padding:18, cursor:"pointer", opacity: f.side ? 0.7 : 1}}><div style={{display:"flex", justifyContent:"space-between"}}><div style={{fontSize:28}}>{f.icon}</div><span style={{fontSize:10, background:f.side?"#222":f.color+"22", color: f.side?"#888":f.color, padding:"4px 10px", borderRadius:20, border:`1px solid ${f.color}66`, fontWeight:700}}>{f.side ? "SIDE PE" : "FREE →"}</span></div><h4 style={{margin:"12px 0 4px", fontSize:15}}>{f.title}</h4><p style={{margin:0, fontSize:12, color:"#888"}}>{f.desc} • {ratio} • 1 Min</p></div>))}
          </div>
        </div>
      </div>
      <div style={{padding:"60px 20px", maxWidth:1100, margin:"0 auto"}}>
        <h2 style={{textAlign:"center", fontSize:24, fontWeight:800, marginBottom:30}}>How It Works - 3 Steps</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16}}>
          <div onClick={()=>setDetail({open:true, icon:"✍️", title:"1. Write Idea - Full Detail", desc:"Yahan se shuru hota hai jan! Tumhe bas apna idea likhna hai, AI khud samajh jayega.", points:["Eg: 5 money habits for students in Pakistan","Eg: How to make chai - funny TikTok","AI 10 sec me script banayega","Urdu / English / Hindi sab supported","FREE me idea se video - no limit on ideas"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:20, textAlign:"center", cursor:"pointer"}}><div style={{fontSize:32}}>✍️</div><h4>1. Write Idea</h4><p style={{fontSize:13, color:"#888"}}>Eg: 5 money habits for students</p><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"3px 8px", borderRadius:10, border:"1px solid #00ff8844"}}>Click for Detail →</span></div>
          <div onClick={()=>setDetail({open:true, icon:"⚡", title:"2. Generate FREE - Full Detail", desc:"Generate button dabao aur AI 30 sec me video bana dega jan! Canvas engine FREE hai.", points:["16:9 = YouTube ke liye best","9:16 = TikTok/Reels ke liye vertical","Canvas engine - no API cost","Max 1 Min - FREE me","Progress bar ke saath live"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:20, textAlign:"center", cursor:"pointer"}}><div style={{fontSize:32}}>⚡</div><h4>2. Generate FREE</h4><p style={{fontSize:13, color:"#888"}}>16:9 YouTube or 9:16 TikTok - 30 sec</p><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"3px 8px", borderRadius:10, border:"1px solid #00ff8844"}}>Click for Detail →</span></div>
          <div onClick={()=>setDetail({open:true, icon:"⬇️", title:"3. Download HD - Full Detail", desc:"Video tayar! Ab download karo HD me, no watermark jan! Direct browser se.", points:["No watermark FREE me bhi","HD quality - 1280x720 or 720x1280","WebM format - sab devices pe chalega","Direct download - no signup needed","5 FREE / month - local storage se track"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:20, textAlign:"center", cursor:"pointer"}}><div style={{fontSize:32}}>⬇️</div><h4>3. Download HD</h4><p style={{fontSize:13, color:"#888"}}>No watermark - FREE - Direct download</p><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"3px 8px", borderRadius:10, border:"1px solid #00ff8844"}}>Click for Detail →</span></div>
        </div>
      </div>
      <footer style={{padding:"30px 20px", borderTop:"1px solid #1a1a2e", background:"#050510"}}>
        <div style={{maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:20, fontSize:12, color:"#888"}}>
          <div><div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:8,height:8,background:"#ff006e",borderRadius:"50%"}}></div><b style={{color:"#fff"}}>Life-AI</b></div><p style={{marginTop:10, lineHeight:1.6}}>Pakistan's #1 AI Video Generator. Turn ideas into TikTok, Reels, YouTube videos FREE. 5 FREE/month, Max 1 Min, No Watermark.</p></div>
          <div><b style={{color:"#fff", fontSize:11}}>TOOLS</b><br/><br/>{FEATURES.map(f=> <div key={f.id} style={{marginBottom:6}}>{f.icon} {f.title}</div>)}</div>
          <div><b style={{color:"#fff", fontSize:11}}>LINKS</b><br/><br/><div onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} style={{cursor:"pointer", marginBottom:6}}>↑ Back to Top</div><div onClick={()=>router.push('/pricing')} style={{cursor:"pointer", marginBottom:6}}>Pricing - Rs 8,000</div><div>Contact: lifeai.pk@gmail.com</div></div>
        </div>
      </footer>
    </div>
  );
}
