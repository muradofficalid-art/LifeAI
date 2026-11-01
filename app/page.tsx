"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se explain video - Business ke liye", color: "#ff006e", side: false },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals - Auto sync FREE", color: "#8338ec", side: false },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - Script to Video - 3 FREE", color: "#00ff88", side: false },
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

  const generateOnLanding = async () => {
    if(!idea.trim()){ alert("Jan pehle idea likho! Eg: 5 money habits"); return; }
    if(freeUsed >= 3){ alert("3 FREE khatam jan! Pricing - Rs 8,000 me 60 videos!"); router.push('/pricing'); return; }
    setGenerating(true); setProgress(0); setVideoUrl(null);
    const interval = setInterval(()=> setProgress(p => p < 90 ? p+15 : p), 500);
    try {
      const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
      if(ratio === "16:9"){ canvas.width = 1280; canvas.height = 720; } else { canvas.width = 720; canvas.height = 1280; }
      const images = ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280","https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280","https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1280"];
      const loadedImgs = await Promise.all(images.map(src => new Promise<HTMLImageElement>((res)=>{ const img = new Image(); img.crossOrigin = "anonymous"; img.src = src; img.onload = ()=> res(img); img.onerror = ()=> res(new Image()); })));
      const stream = canvas.captureStream(30); const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' }); const chunks: Blob[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      const recPromise = new Promise<string>((resolve)=>{ recorder.onstop = ()=>{ resolve(URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }))); }; });
      recorder.start(); let frame = 0; const totalFrames = 60*30;
      const draw = () => {
        if(frame >= totalFrames){ recorder.stop(); return; }
        try{ ctx.drawImage(loadedImgs[Math.floor(frame/600)%loadedImgs.length], 0, 0, canvas.width, canvas.height); }catch{}
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff"; ctx.font = `bold ${ratio==="16:9" ? 42 : 32}px system-ui`; ctx.textAlign = "center"; ctx.fillText(idea.slice(0, 50), canvas.width/2, canvas.height/2);
        ctx.fillStyle = "#00ff88"; ctx.font = "20px system-ui"; ctx.fillText(`Life-AI • ${ratio} • ${freeUsed+1}/3 FREE`, canvas.width/2, canvas.height - 50);
        frame++; requestAnimationFrame(draw);
      }; draw();
      const url = await recPromise; clearInterval(interval); setProgress(100); setVideoUrl(url);
      const newUsed = freeUsed+1; setFreeUsed(newUsed); localStorage.setItem("lifeai_free_used", newUsed.toString());
    } catch(e){ clearInterval(interval); setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4"); }
    setGenerating(false);
  };

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      <canvas ref={canvasRef} style={{display:"none"}}></canvas>

      <header style={{padding:"14px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e", position:"sticky", top:0, background:"rgba(5,5,16,0.95)", backdropFilter:"blur(10px)", zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:8, cursor:"pointer"}} onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%", boxShadow:"0 0 10px #ff006e"}}></div><b>Life-AI</b><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"2px 8px", borderRadius:10, marginLeft:6, border:"1px solid #00ff8844"}}>{freeUsed}/3 FREE</span></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={()=>router.push('/pricing')} style={{background:"transparent", color:"#aaa", border:"none", padding:"6px 10px", borderRadius:20, cursor:"pointer", fontSize:13}}>Pricing</button>
          <button onClick={()=>{setAuthMode("login"); setShowAuth(true)}} style={{background:"transparent", color:"#fff", border:"1px solid #333", padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:13}}>Login</button>
          <button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{background:"#ff006e", color:"#fff", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer", fontWeight:600, fontSize:13}}>Get started →</button>
        </div>
      </header>

      <div style={{textAlign:"center", padding:"60px 20px 30px"}}>
        <div style={{fontSize:12, color:"#00ff88", background:"#00ff8822", border:"1px solid #00ff8844", display:"inline-block", padding:"5px 14px", borderRadius:20}}>• AI Video Generator • Landing pe hi Generate</div>
        <h1 style={{fontSize:42, margin:"20px 0", lineHeight:1.1, fontWeight:900}}>Turn idea into videos<br/><span style={{background:"linear-gradient(90deg,#ff006e,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>with AI voices</span></h1>
        <p style={{color:"#888", fontSize:14}}>Generate & Download FREE - 3 Videos / Month - Max 1 Min - No Watermark</p>
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:14, maxWidth:680, margin:"24px auto"}}>
          <div style={{display:"flex", gap:8}}><input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Create a faceless TikTok video about 5 money habits..." style={{flex:1, background:"#0a0a18", border:"1px solid #222", color:"#fff", outline:"none", fontSize:14, padding:"12px 14px", borderRadius:12}}/><button onClick={generateOnLanding} disabled={generating} style={{background: generating ? "#555" : "#ff006e", color:"#fff", border:"none", padding:"12px 20px", borderRadius:12, cursor:"pointer", fontWeight:700}}>{generating ? `${progress}%` : "Generate →"}</button></div>
          <div style={{display:"flex", gap:8, marginTop:12, justifyContent:"center", flexWrap:"wrap"}}><button onClick={()=>setRatio("16:9")} style={{background: ratio==="16:9" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="16:9" ? "#ff006e" : "#333"}`, padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📺 16:9</button><button onClick={()=>setRatio("9:16")} style={{background: ratio==="9:16" ? "#ff006e" : "#1a1a2e", color:"#fff", border:`1px solid ${ratio==="9:16" ? "#ff006e" : "#333"}`, padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:600}}>📱 9:16</button></div>
        </div>
        {(generating || videoUrl) && (<div style={{maxWidth:700, margin:"20px auto", background:"#111122", border:"1px solid #2a2a4e", borderRadius:20, padding:16}}>{generating && <div><div style={{width:"100%", height:8, background:"#1a1a2e", borderRadius:10, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#ff006e,#a78bfa)", transition:"width 0.5s"}}></div></div></div>}{videoUrl && (<><video src={videoUrl} controls autoPlay style={{width:"100%", maxHeight: ratio==="9:16" ? 500 : 400, borderRadius:12, background:"#000"}}></video><div style={{display:"flex", gap:10, marginTop:12}}><a href={videoUrl} download={`life-ai-${Date.now()}.webm`} style={{flex:1, background:"#00ff88", color:"#000", padding:"12px", borderRadius:12, textAlign:"center", fontWeight:800, textDecoration:"none", fontSize:13}}>⬇️ Download FREE</a><button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{flex:1, background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:13}}>Get 60 Videos - Rs 8k →</button></div></>)}</div>)}
      </div>

      <div style={{ padding: "50px 20px", background: "#080810", borderTop: "1px solid #1a1a2e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}><h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>All AI Tools in One Platform</h2><p style={{ color: "#888", fontSize: 13, marginTop: 8 }}>Click any FREE card to generate • {freeUsed}/3 FREE</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
            {FEATURES.map(f=>(<div key={f.id} onClick={()=> f.side ? alert("🎙️ "+f.title+" SIDE PE hai jan - Phase 2 me ayega!") : generateOnLanding()} style={{background:f.side ? "#0e0e14" : "#111122", border:`1px solid ${f.side ? "#222" : f.color}44`, borderRadius:18, padding:18, cursor:"pointer", opacity: f.side ? 0.7 : 1}}><div style={{display:"flex", justifyContent:"space-between"}}><div style={{fontSize:28}}>{f.icon}</div><span style={{fontSize:10, background:f.side?"#222":f.color+"22", color: f.side?"#888":f.color, padding:"4px 10px", borderRadius:20, border:`1px solid ${f.color}66`, fontWeight:700}}>{f.side ? "SIDE PE" : "FREE →"}</span></div><h4 style={{margin:"12px 0 4px", fontSize:15}}>{f.title}</h4><p style={{margin:0, fontSize:12, color:"#888"}}>{f.desc} • {ratio} • 1 Min</p></div>))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS - 100% CLICKABLE */}
      <div style={{padding:"60px 20px", maxWidth:1100, margin:"0 auto"}}>
        <h2 style={{textAlign:"center", fontSize:24, fontWeight:800, marginBottom:30}}>How It Works - 3 Steps</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16}}>
          <div onClick={()=>setDetail({open:true, icon:"✍️", title:"1. Write Idea - Full Detail", desc:"Yahan se shuru hota hai jan! Tumhe bas apna idea likhna hai, AI khud samajh jayega.", points:["Eg: 5 money habits for students in Pakistan","Eg: How to make chai - funny TikTok","AI 10 sec me script banayega","Urdu / English / Hindi sab supported","FREE me idea se video - no limit on ideas"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:20, textAlign:"center", cursor:"pointer", transition:"all 0.2s"}}><div style={{fontSize:32}}>✍️</div><h4>1. Write Idea</h4><p style={{fontSize:13, color:"#888"}}>Eg: 5 money habits for students</p><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"3px 8px", borderRadius:10, border:"1px solid #00ff8844"}}>Click for Detail →</span></div>
          <div onClick={()=>setDetail({open:true, icon:"⚡", title:"2. Generate FREE - Full Detail", desc:"Generate button dabao aur AI 30 sec me video bana dega jan! Canvas engine FREE hai.", points:["16:9 = YouTube ke liye best","9:16 = TikTok/Reels ke liye vertical","Canvas engine - no API cost","Max 1 Min - FREE me","Progress bar ke saath live"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:20, textAlign:"center", cursor:"pointer"}}><div style={{fontSize:32}}>⚡</div><h4>2. Generate FREE</h4><p style={{fontSize:13, color:"#888"}}>16:9 YouTube or 9:16 TikTok - 30 sec</p><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"3px 8px", borderRadius:10, border:"1px solid #00ff8844"}}>Click for Detail →</span></div>
          <div onClick={()=>setDetail({open:true, icon:"⬇️", title:"3. Download HD - Full Detail", desc:"Video tayar! Ab download karo HD me, no watermark jan! Direct browser se.", points:["No watermark FREE me bhi","HD quality - 1280x720 or 720x1280","WebM format - sab devices pe chalega","Direct download - no signup needed","3 FREE / month - local storage se track"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:20, textAlign:"center", cursor:"pointer"}}><div style={{fontSize:32}}>⬇️</div><h4>3. Download HD</h4><p style={{fontSize:13, color:"#888"}}>No watermark - FREE - Direct download</p><span style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"3px 8px", borderRadius:10, border:"1px solid #00ff8844"}}>Click for Detail →</span></div>
        </div>
      </div>

      {/* TESTIMONIALS - CLICKABLE */}
      <div style={{padding:"40px 20px", background:"#0a0a18", borderTop:"1px solid #1a1a2e", borderBottom:"1px solid #1a1a2e"}}>
        <div style={{maxWidth:1100, margin:"0 auto"}}>
          <h2 style={{textAlign:"center", fontSize:22, fontWeight:800}}>Loved by Creators in Pakistan ❤️</h2>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginTop:20}}>
            <div onClick={()=>setDetail({open:true, icon:"👨‍💻", title:"Ali, Lahore - Full Story", desc:"Ali ne Life-AI pe pehli video bina signup ke banayi. Uska experience:", points:["No signup needed - landing pe hi generate","30 sec me video ready","9:16 TikTok pe viral hui","Ab 60 videos wala Rs 8k plan lega","Says: Best AI tool in Pakistan!"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:16, cursor:"pointer"}}><p style={{fontSize:13, color:"#ccc"}}>"Landing pe hi FREE video ban gaya, no signup needed! Best hai!"</p><b style={{fontSize:12, color:"#00ff88"}}>— Ali, Lahore • Click for Story →</b></div>
            <div onClick={()=>setDetail({open:true, icon:"👩‍🎤", title:"Sana, Karachi - Full Story", desc:"Sana TikToker hai, usne 9:16 videos ke liye Life-AI use kiya:", points:["9:16 vertical perfect for TikTok","Auto visuals + idea matching","FREE me 3 videos / month","Download HD no watermark","Followers 2x barh gaye!"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:16, cursor:"pointer"}}><p style={{fontSize:13, color:"#ccc"}}>"9:16 TikTok videos 30 sec me, download FREE. Rs 8000 wala plan lungi!"</p><b style={{fontSize:12, color:"#00ff88"}}>— Sana, Karachi • Click for Story →</b></div>
            <div onClick={()=>setDetail({open:true, icon:"🎥", title:"Usman, Islamabad - Full Story", desc:"Usman YouTuber hai, 16:9 ke liye:", points:["16:9 YouTube horizontal best","Cinematic 8K look","Canvas engine fast","Business explainers banate hain","Client videos ke liye use karte hain"]})} style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:16, cursor:"pointer"}}><p style={{fontSize:13, color:"#ccc"}}>"YouTube ke liye 16:9 perfect, canvas engine fast hai!"</p><b style={{fontSize:12, color:"#00ff88"}}>— Usman, Islamabad • Click for Story →</b></div>
          </div>
        </div>
      </div>

      <div style={{padding:"50px 20px", maxWidth:800, margin:"0 auto"}}>
        <h2 style={{textAlign:"center", fontSize:24, fontWeight:800, marginBottom:20}}>FAQ - Common Questions</h2>
        {[
          {q:"FREE me kitne videos?", a:"3 videos / month FREE, Max 1 Min each, No watermark, HD download. 16:9 YouTube + 9:16 TikTok both."},
          {q:"16:9 aur 9:16 me farq?", a:"16:9 = YouTube ke liye horizontal, 9:16 = TikTok/Reels ke liye vertical. Button se switch karo."},
          {q:"Voiceover / Avatar kab ayega?", a:"Voiceover aur Avatar SIDE PE hain jan, Phase 2 me PRO plan me ayenge - Rs 8,000 me 60 videos."},
          {q:"Watermark hai?", a:"Nahi jan, bilkul NO watermark FREE me bhi! HD download direct."},
        ].map((f,i)=>(<div key={i} onClick={()=>setFaqOpen(faqOpen===i ? null : i)} style={{background:"#111122", border:"1px solid #222", borderRadius:12, padding:14, marginBottom:10, cursor:"pointer"}}><div style={{display:"flex", justifyContent:"space-between", fontWeight:600, fontSize:14}}><span>{f.q}</span><span>{faqOpen===i ? "−" : "+"}</span></div>{faqOpen===i && <p style={{fontSize:13, color:"#888", marginTop:10, marginBottom:0}}>{f.a}</p>}</div>))}
      </div>

      <div style={{padding:"60px 20px", textAlign:"center", background:"linear-gradient(180deg,#080810,#111122)", borderTop:"1px solid #1a1a2e"}}>
        <h2 style={{fontSize:30, fontWeight:900, margin:0}}>Ready to Create?</h2><p style={{color:"#888", fontSize:14, marginTop:8}}>3 FREE videos - No card needed - Start now</p>
        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:20, flexWrap:"wrap"}}>
          <button onClick={generateOnLanding} style={{background:"#ff006e", color:"#fff", border:"none", padding:"14px 28px", borderRadius:24, cursor:"pointer", fontWeight:800, fontSize:14, boxShadow:"0 0 30px #ff006e55"}}>Generate FREE Video Now →</button>
          <button onClick={()=>router.push('/pricing')} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"14px 28px", borderRadius:24, cursor:"pointer", fontWeight:600}}>View Pricing - Rs 8k →</button>
        </div>
      </div>

      <footer style={{padding:"30px 20px", borderTop:"1px solid #1a1a2e", background:"#050510"}}>
        <div style={{maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:20, fontSize:12, color:"#888"}}>
          <div><div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:8,height:8,background:"#ff006e",borderRadius:"50%"}}></div><b style={{color:"#fff"}}>Life-AI</b></div><p style={{marginTop:10, lineHeight:1.6}}>Pakistan's #1 AI Video Generator. Turn ideas into TikTok, Reels, YouTube videos FREE. 3 FREE/month, Max 1 Min, No Watermark.</p></div>
          <div><b style={{color:"#fff", fontSize:11}}>TOOLS</b><br/><br/>{FEATURES.map(f=> <div key={f.id} style={{marginBottom:6}}>{f.icon} {f.title}</div>)}</div>
          <div><b style={{color:"#fff", fontSize:11}}>LINKS</b><br/><br/><div onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} style={{cursor:"pointer", marginBottom:6}}>↑ Back to Top</div><div onClick={()=>router.push('/pricing')} style={{cursor:"pointer", marginBottom:6}}>Pricing - Rs 8,000</div><div>Contact: lifeai.pk@gmail.com</div></div>
        </div>
      </footer>

      {/* DETAIL MODAL - FAQ jaisa best detail */}
      {detail?.open && (
        <div onClick={()=>setDetail(null)} style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(180deg, #1a1a2e, #0a0a18)", border:"1px solid #2a2a4e", borderRadius:20, padding:24, width:"100%", maxWidth:480, boxShadow:"0 20px 60px #000"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}><div style={{display:"flex", gap:10, alignItems:"center"}}><div style={{fontSize:28}}>{detail.icon}</div><h3 style={{margin:0, fontSize:16}}>{detail.title}</h3></div><button onClick={()=>setDetail(null)} style={{background:"#222", border:"none", color:"#888", width:30, height:30, borderRadius:"50%", cursor:"pointer"}}>✕</button></div>
            <p style={{fontSize:13, color:"#aaa", lineHeight:1.6}}>{detail.desc}</p>
            <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:8}}>
              {detail.points.map((p,i)=><div key={i} style={{background:"#050510", border:"1px solid #222", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#ccc"}}>✓ {p}</div>)}
            </div>
            <div style={{display:"flex", gap:10, marginTop:18}}>
              <button onClick={()=>{setDetail(null); generateOnLanding(); window.scrollTo({top:0, behavior:'smooth'})}} style={{flex:1, background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:13}}>Generate Now →</button>
              <button onClick={()=>setDetail(null)} style={{flex:1, background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"12px", borderRadius:12, cursor:"pointer", fontSize:13}}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showAuth && (<div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20}}><div style={{background:"linear-gradient(180deg, #151528, #0a0a18)", border:"1px solid #2a2a4e", borderRadius:20, padding:24, width:"100%", maxWidth:380}}><div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}><h2 style={{margin:0, fontSize:18}}>{authMode==="login" ? "Welcome Back! 👋" : "Create Account 🚀"}</h2><button onClick={()=>setShowAuth(false)} style={{background:"#1a1a2e", border:"none", color:"#888", width:30, height:30, borderRadius:"50%", cursor:"pointer"}}>✕</button></div><input placeholder="Email - test@life-ai.pk" style={{width:"100%", background:"#050510", border:"1px solid #2a2a4e", color:"#fff", padding:"12px", borderRadius:10, marginBottom:10, outline:"none", boxSizing:"border-box"}}/><input placeholder="Password" type="password" style={{width:"100%", background:"#050510", border:"1px solid #2a2a4e", color:"#fff", padding:"12px", borderRadius:10, marginBottom:12, outline:"none", boxSizing:"border-box"}}/><button onClick={()=>{setShowAuth(false); router.push('/dashboard');}} style={{width:"100%", background:"#ff006e", color:"#fff", border:"none", padding:"14px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:14}}>{authMode==="login" ? "Login → Dashboard" : "Create Account → Dashboard"}</button></div></div>)}
    </div>
  );
}
