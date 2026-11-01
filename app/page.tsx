"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import FeaturesSection from "../components/landing/FeaturesSection";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se explain video - Business ke liye", color: "#ff006e" },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals - Auto sync FREE", color: "#8338ec" },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - Script to Video - 3 FREE", color: "#00ff88" },
  { id: "voice", icon: "🎙️", title: "AI Voiceover", desc: "SIDE PE - Filhal Band", color: "#ffbe0b", side: true },
  { id: "avatar", icon: "🧑‍🎤", title: "AI Avatar", desc: "Avatar se video - Canvas FREE", color: "#3a86ff" },
  { id: "translator", icon: "🌐", title: "Translator", desc: "Urdu/Hindi/English FREE", color: "#fb5607" },
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const used = parseInt(localStorage.getItem("lifeai_free_used") || "0");
    setFreeUsed(used);
  },[]);

  const generateOnLanding = async () => {
    if(!idea.trim()){ alert("Jan pehle idea likho! Eg: 5 money habits"); return; }
    if(freeUsed >= 3){
      alert("3 FREE videos khatam jan! Pricing pe jao - Rs 8,000 me 60 videos!");
      router.push('/pricing');
      return;
    }

    setGenerating(true);
    setProgress(0);
    setVideoUrl(null);
    const interval = setInterval(()=> setProgress(p => p < 90 ? p+15 : p), 500);

    try {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      if(ratio === "16:9"){
        canvas.width = 1280; canvas.height = 720;
      } else {
        canvas.width = 720; canvas.height = 1280;
      }
      
      const images = [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280",
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1280",
      ];

      const loadedImgs = await Promise.all(images.map(src => {
        return new Promise<HTMLImageElement>((res)=>{
          const img = new Image(); img.crossOrigin = "anonymous"; img.src = src;
          img.onload = ()=> res(img); img.onerror = ()=> res(new Image());
        });
      }));

      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      
      const recPromise = new Promise<string>((resolve)=>{
        recorder.onstop = ()=>{
          const blob = new Blob(chunks, { type: 'video/webm' });
          resolve(URL.createObjectURL(blob));
        };
      });

      recorder.start();
      let frame = 0;
      const totalFrames = 60 * 30;

      const draw = () => {
        if(frame >= totalFrames){ recorder.stop(); return; }
        const imgIndex = Math.floor(frame / 600) % loadedImgs.length;
        const img = loadedImgs[imgIndex];
        try{ ctx.drawImage(img, 0, 0, canvas.width, canvas.height); }catch{}
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff"; ctx.font = `bold ${ratio==="16:9" ? 42 : 32}px system-ui`; ctx.textAlign = "center";
        ctx.fillText(idea.slice(0, 50), canvas.width/2, canvas.height/2);
        ctx.fillStyle = "#00ff88"; ctx.font = "20px system-ui";
        ctx.fillText(`Life-AI • ${ratio} • ${freeUsed+1}/3 FREE • Max 1 min`, canvas.width/2, canvas.height - 50);
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
      
    } catch(e){
      clearInterval(interval);
      setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4");
    }
    setGenerating(false);
  };

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      <canvas ref={canvasRef} style={{display:"none"}}></canvas>

      <header style={{padding:"14px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e", position:"sticky", top:0, background:"rgba(5,5,16,0.95)", backdropFilter:"blur(10px)", zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:8, cursor:"pointer"}} onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%"}}></div><b>Life-AI</b><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"2px 6px", borderRadius:10, marginLeft:6, border:"1px solid #00ff8844"}}>{freeUsed}/3 FREE</span></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={()=>router.push('/pricing')} style={{background:"transparent", color:"#aaa", border:"none", padding:"6px 10px", borderRadius:20, cursor:"pointer", fontSize:13}}>Pricing</button>
          <button onClick={()=>{setAuthMode("login"); setShowAuth(true)}} style={{background:"transparent", color:"#fff", border:"1px solid #333", padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:13}}>Login</button>
          <button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{background:"#ff006e", color:"#fff", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer", fontWeight:600, fontSize:13}}>Get started →</button>
        </div>
      </header>

      <div style={{textAlign:"center", padding:"50px 20px 20px"}}>
        <div style={{fontSize:12, color:"#00ff88", background:"#00ff8822", border:"1px solid #00ff8844", display:"inline-block", padding:"4px 12px", borderRadius:20}}>• AI Video Generator • Cinematic 8K • Landing pe hi Generate</div>
        <h1 style={{fontSize:34, margin:"18px 0", lineHeight:1.2}}>Turn idea into videos<br/><span style={{color:"#a78bfa"}}>with AI voices</span></h1>
        <p style={{color:"#888", fontSize:14}}>Generate & Download FREE on this page - 3 Videos / Month - Max 1 Min</p>
        
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:12, maxWidth:650, margin:"20px auto"}}>
          <div style={{display:"flex", gap:8}}>
            <input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Create a faceless TikTok video about 5 money habits..." style={{flex:1, background:"transparent", border:"none", color:"#fff", outline:"none", fontSize:14}}/>
            <button onClick={generateOnLanding} disabled={generating} style={{background: generating ? "#555" : "#ff006e", color:"#fff", border:"none", padding:"10px 18px", borderRadius:12, cursor:"pointer", fontWeight:600}}>{generating ? `${progress}%` : "Generate video →"}</button>
          </div>
          <div style={{display:"flex", gap:8, marginTop:10, justifyContent:"center"}}>
            <button onClick={()=>setRatio("16:9")} style={{background: ratio==="16:9" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="16:9" ? "#ff006e" : "#333"}`, padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📺 16:9 - YouTube</button>
            <button onClick={()=>setRatio("9:16")} style={{background: ratio==="9:16" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="9:16" ? "#ff006e" : "#333"}`, padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📱 9:16 - TikTok/Reels</button>
            <span style={{fontSize:11, color:"#888", background:"#0a0a0a", padding:"6px 10px", borderRadius:20, border:"1px solid #222"}}>⏱️ FREE Max 1 Min</span>
          </div>
        </div>

        {(generating || videoUrl) && (
          <div style={{maxWidth:700, margin:"20px auto", background:"#111122", border:"1px solid #2a2a4e", borderRadius:20, padding:16, textAlign:"left"}}>
            {generating && <div style={{padding:10}}><div style={{width:"100%", height:8, background:"#1a1a2e", borderRadius:10, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"#ff006e", transition:"width 0.5s"}}></div></div><p style={{fontSize:12, color:"#888", marginTop:10, textAlign:"center"}}>Canvas FREE Engine - {ratio} - Max 1 Min - {progress}%</p></div>}
            {videoUrl && (
              <>
                <video src={videoUrl} controls autoPlay style={{width:"100%", maxHeight: ratio==="9:16" ? 500 : 400, borderRadius:12, background:"#000", margin:"0 auto", display:"block"}}></video>
                <div style={{display:"flex", gap:10, marginTop:12, flexWrap:"wrap"}}>
                  <a href={videoUrl} download={`life-ai-${ratio}-${Date.now()}.webm`} style={{flex:1, background:"#00ff88", color:"#000", padding:"12px", borderRadius:12, textAlign:"center", fontWeight:700, textDecoration:"none", fontSize:13, minWidth:120}}>⬇️ Download FREE {ratio}</a>
                  <button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{flex:1, background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:13, minWidth:180}}>😍 Love it? Signup - Rs 8k →</button>
                </div>
                <div style={{fontSize:11, color:"#00ff88", marginTop:10, textAlign:"center"}}>✓ {freeUsed}/3 FREE used - {ratio} - Max 1 Min - {3-freeUsed} left!</div>
              </>
            )}
          </div>
        )}

        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:16, flexWrap:"wrap"}}>
          <button onClick={generateOnLanding} style={{background:"#ff006e", color:"#fff", border:"none", padding:"12px 22px", borderRadius:24, cursor:"pointer", fontWeight:700}}>Get started for free →</button>
          <button onClick={()=>router.push('/pricing')} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"12px 22px", borderRadius:24, cursor:"pointer"}}>View pricing • Rs 8k</button>
        </div>
      </div>

      <div style={{padding:20, maxWidth:1000, margin:"20px auto 0"}}>
        <h3 style={{fontSize:12, letterSpacing:2, color:"#00ff88"}}>FEATURES - ALL GENERATE ON LANDING - {freeUsed}/3 FREE</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12, marginTop:16}}>
          {FEATURES.map(f=>(
            <div key={f.id} onClick={()=> f.side ? alert("🎙️ Voiceover SIDE PE hai jan - Phase 2 me ayega!") : generateOnLanding()} style={{background:f.side ? "#0a0a0a" : "#111122", border:`1px solid ${f.side ? "#222" : f.color}55`, borderRadius:16, padding:18, cursor: f.side ? "not-allowed" : "pointer", opacity: f.side ? 0.6 : 1}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><div style={{fontSize:28}}>{f.icon}</div><span style={{fontSize:10, background:f.side?"#222":f.color+"22", color: f.side?"#888":f.color, padding:"3px 8px", borderRadius:20, border:`1px solid ${f.color}88`}}>{f.side ? "SIDE PE" : "FREE GENERATE →"}</span></div>
              <h4 style={{margin:"10px 0 4px", fontSize:15}}>{f.title}</h4><p style={{margin:0, fontSize:12, color:"#888"}}>{f.desc} • Max 1 Min • {ratio}</p>
            </div>
          ))}
        </div>
      </div>

      <FeaturesSection />

      <div style={{padding:20, maxWidth:1000, margin:"20px auto"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, fontSize:12, color:"#888", borderTop:"1px solid #1a1a2e", paddingTop:20}}>
          <div><b style={{color:"#fff", fontSize:11}}>FEATURES - FREE</b><br/><br/>{FEATURES.map(f=> <div key={f.id} onClick={()=> f.side ? null : generateOnLanding()} style={{marginBottom:6, cursor:"pointer", color: f.side ? "#555" : "#00ff88"}}>{f.title} → FREE • {ratio} • 1 Min</div>)}</div>
          <div><b style={{color:"#fff", fontSize:11}}>PRICING</b><br/><br/><div style={{cursor:"pointer"}} onClick={()=>router.push('/pricing')}>Pricing - Rs 0 - Rs 15k →<br/>Free - 3 videos / month - Max 1 Min - {ratio}<br/>Standard - Rs 8,000 - 60 videos<br/>Premium - Rs 15,000</div></div>
        </div>
      </div>

      {showAuth && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20}}>
          <div style={{background:"linear-gradient(180deg, #151528, #0a0a18)", border:"1px solid #2a2a4e", borderRadius:20, padding:24, width:"100%", maxWidth:380}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
              <h2 style={{margin:0, fontSize:18}}>{authMode==="login" ? "Welcome Back! 👋" : "Create Account 🚀"}</h2>
              <button onClick={()=>setShowAuth(false)} style={{background:"#1a1a2e", border:"none", color:"#888", width:30, height:30, borderRadius:"50%", cursor:"pointer"}}>✕</button>
            </div>
            <div style={{display:"flex", gap:8, marginBottom:16, background:"#050510", borderRadius:10, padding:4}}>
              <button onClick={()=>setAuthMode("signup")} style={{flex:1, background: authMode==="signup" ? "#ff006e" : "transparent", color:"#fff", border:"none", padding:"8px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600}}>Sign Up</button>
              <button onClick={()=>setAuthMode("login")} style={{flex:1, background: authMode==="login" ? "#222" : "transparent", color:"#fff", border:"none", padding:"8px", borderRadius:8, cursor:"pointer", fontSize:13}}>Login</button>
            </div>
            <input placeholder="Email - test@life-ai.pk" style={{width:"100%", background:"#050510", border:"1px solid #2a2a4e", color:"#fff", padding:"12px", borderRadius:10, marginBottom:10, outline:"none", boxSizing:"border-box"}}/>
            <input placeholder="Password" type="password" style={{width:"100%", background:"#050510", border:"1px solid #2a2a4e", color:"#fff", padding:"12px", borderRadius:10, marginBottom:12, outline:"none", boxSizing:"border-box"}}/>
            <button onClick={()=>{setShowAuth(false); router.push('/dashboard');}} style={{width:"100%", background:"#ff006e", color:"#fff", border:"none", padding:"14px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:14}}>{authMode==="login" ? "Login → Dashboard" : "Create Account → Dashboard"}</button>
            <button onClick={()=>setShowAuth(false)} style={{width:"100%", background:"transparent", color:"#888", border:"1px solid #2a2a4e", padding:"12px", borderRadius:12, cursor:"pointer", fontSize:12, marginTop:8}}>Skip - Continue FREE on Landing</button>
          </div>
        </div>
      )}
    </div>
  );
}
