"use client";
import { useState } from "react";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se explain video - Business ke liye", color: "#ff006e" },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals - Auto sync FREE", color: "#8338ec" },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - Script to Video - Phase 2 Target", color: "#00ff88" },
  { id: "voice", icon: "🎙️", title: "AI Voiceover", desc: "SIDE PE - Edge TTS FREE - Filhal Band", color: "#ffbe0b", side: true },
  { id: "avatar", icon: "🧑‍🎤", title: "AI Avatar", desc: "Avatar se video - Canvas FREE", color: "#3a86ff" },
  { id: "translator", icon: "🌐", title: "Translator", desc: "Urdu/Hindi/English FREE translate", color: "#fb5607" },
];

export default function LandingPage() {
  const [activePage, setActivePage] = useState<string | null>(null);

  // REAL PAGE RENDER
  if (activePage) {
    const feature = FEATURES.find(f => f.id === activePage);
    return <FeaturePage feature={feature} onBack={() => setActivePage(null)} />;
  }

  // LANDING PAGE
  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      {/* Header */}
      <header style={{padding:"16px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e"}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%"}}></div><b>Life-AI</b></div>
        <div style={{display:"flex", gap:10}}>
          <button style={{background:"none", color:"#888", border:"none"}}>Pricing</button>
          <button onClick={()=>setActivePage('video')} style={{background:"#ff006e", color:"#fff", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer"}}>Get started →</button>
        </div>
      </header>

      {/* Hero */}
      <div style={{textAlign:"center", padding:"60px 20px 20px"}}>
        <div style={{fontSize:12, color:"#888", background:"#1a1a2e", display:"inline-block", padding:"4px 12px", borderRadius:20}}>• AI Video Generator • Cinematic 8K</div>
        <h1 style={{fontSize:36, margin:"20px 0", lineHeight:1.2}}>Turn idea into videos<br/><span style={{color:"#a78bfa"}}>with AI voices</span></h1>
        <p style={{color:"#888", fontSize:14}}>Transform your ideas into stunning videos with AI video generator.</p>
        
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:12, maxWidth:600, margin:"20px auto", display:"flex", gap:8}}>
          <input placeholder="Create a faceless TikTok video about 5 money habits..." style={{flex:1, background:"transparent", border:"none", color:"#fff", outline:"none"}}/>
          <button onClick={()=>setActivePage('video')} style={{background:"#ff006e", color:"#fff", border:"none", padding:"10px 18px", borderRadius:12, cursor:"pointer"}}>Generate video →</button>
        </div>
        
        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:16}}>
          <button onClick={()=>setActivePage('video')} style={{background:"#ff006e", color:"#fff", border:"none", padding:"12px 22px", borderRadius:24, cursor:"pointer"}}>Get started for free →</button>
          <button onClick={()=>setActivePage('pricing')} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"12px 22px", borderRadius:24}}>View pricing • Rs 8k</button>
        </div>
      </div>

      {/* REAL CLICK FEATURES GRID - Yahi main kaam hai jan! */}
      <div style={{padding:20, maxWidth:1000, margin:"40px auto 0"}}>
        <h3 style={{fontSize:14, letterSpacing:2, color:"#888"}}>FEATURES - REAL CLICK</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12, marginTop:16}}>
          {FEATURES.map(f=>(
            <div key={f.id} onClick={()=>!f.side && setActivePage(f.id)} 
              style={{
                background:f.side ? "#0a0a0a" : "#111122", 
                border:`1px solid ${f.side ? "#222" : f.color}33`, 
                borderRadius:16, padding:18, cursor: f.side ? "not-allowed" : "pointer",
                opacity: f.side ? 0.5 : 1,
                transition:"0.2s"
              }}
              onMouseEnter={(e)=>{ if(!f.side) (e.currentTarget as any).style.borderColor = f.color; }}
              onMouseLeave={(e)=>{ if(!f.side) (e.currentTarget as any).style.borderColor = f.color+"33"; }}
            >
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"start"}}>
                <div style={{fontSize:28}}>{f.icon}</div>
                <span style={{fontSize:10, background:f.side?"#222":f.color+"22", color: f.side?"#888":f.color, padding:"3px 8px", borderRadius:20, border:`1px solid ${f.color}`}}>{f.side ? "SIDE PE" : "REAL CLICK →"}</span>
              </div>
              <h4 style={{margin:"10px 0 4px", fontSize:15}}>{f.title}</h4>
              <p style={{margin:0, fontSize:12, color:"#888"}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Pricing - REAL CLICK */}
      <div style={{padding:20, maxWidth:1000, margin:"20px auto"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, fontSize:12, color:"#888", borderTop:"1px solid #1a1a2e", paddingTop:20}}>
          <div>
            <b style={{color:"#fff", fontSize:11, letterSpacing:1}}>FEATURES</b><br/><br/>
            {FEATURES.map(f=> <div key={f.id} onClick={()=>setActivePage(f.id)} style={{cursor:"pointer", marginBottom:6, textDecoration: f.side ? "line-through" : "none"}}>{f.title} {f.side && "(Side Pe)"} →</div>)}
          </div>
          <div>
            <b style={{color:"#fff", fontSize:11, letterSpacing:1}}>PRICING</b><br/><br/>
            <div style={{cursor:"pointer"}} onClick={()=>setActivePage('pricing')}>Pricing - Rs 0 - Rs 15k →<br/>Free - 3 videos / month<br/>Standard - Rs 8,000<br/>Premium - Rs 15,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// REAL FEATURE PAGE - Har click pe ye khulega
function FeaturePage({feature, onBack}:any){
  if(!feature && onBack){
    // Pricing page
    return (
      <div style={{background:"#050510", color:"#fff", minHeight:"100vh", padding:20}}>
        <button onClick={onBack} style={{background:"#222", color:"#fff", border:"none", padding:"10px 16px", borderRadius:8, cursor:"pointer"}}>← Back to Landing</button>
        <h1 style={{marginTop:20}}>💰 Pricing - Real Page</h1>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, marginTop:20}}>
          <div style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:20}}><h3>Free</h3><p>3 videos / month</p><p style={{fontSize:24, color:"#00ff88"}}>Rs 0</p></div>
          <div style={{background:"#111122", border:"1px solid #ff006e", borderRadius:16, padding:20}}><h3>Standard</h3><p>100 videos</p><p style={{fontSize:24, color:"#ff006e"}}>Rs 8,000</p></div>
          <div style={{background:"#111122", border:"1px solid #8338ec", borderRadius:16, padding:20}}><h3>Premium</h3><p>Unlimited</p><p style={{fontSize:24, color:"#8338ec"}}>Rs 15,000</p></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", padding:20, fontFamily:"system-ui"}}>
      <button onClick={onBack} style={{background:"#222", color:"#fff", border:"none", padding:"10px 16px", borderRadius:8, cursor:"pointer"}}>← Back to Landing</button>
      
      <div style={{maxWidth:800, margin:"30px auto 0"}}>
        <div style={{fontSize:48}}>{feature.icon}</div>
        <h1 style={{fontSize:28, margin:"10px 0"}}>{feature.title}</h1>
        <p style={{color:"#888"}}>{feature.desc}</p>
        <span style={{background:"#00ff8833", color:"#00ff88", border:"1px solid #00ff88", padding:"4px 10px", borderRadius:20, fontSize:11}}>✅ REAL CLICK WORKING - {feature.id.toUpperCase()} PAGE ACTIVE</span>

        <div style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:20, marginTop:20}}>
          {feature.id === "video" && (
            <>
              <h3>🎥 MAIN FEATURE - Script to Video</h3>
              <textarea placeholder="Yahan kahani likho jan..." style={{width:"100%", height:100, background:"#050510", border:"1px solid #333", color:"#fff", borderRadius:10, padding:10, marginTop:10}}></textarea>
              <button style={{width:"100%", background:"#00ff88", color:"#000", border:"none", padding:14, borderRadius:10, fontWeight:"bold", marginTop:10, cursor:"pointer"}}>🚀 Generate Video - Phase 2 Me Full (Canvas FREE)</button>
              <p style={{fontSize:12, color:"#0f0", marginTop:10}}>Pattern: Script → Photo (Canvas No Watermark) → Clips (5 Raaz) → Final Video</p>
            </>
          )}
          {feature.id !== "video" && (
            <>
              <p>Ye {feature.title} ka REAL PAGE hai jan!</p>
              <p style={{color:"#888", fontSize:13}}>Abhi Phase 1 me ACTIVE skeleton hai. Phase 2 me isko full functional banayenge same pattern se: Pehle iska core function → Test → Next.</p>
              <button style={{width:"100%", background:feature.color, color:"#fff", border:"none", padding:14, borderRadius:10, fontWeight:"bold", marginTop:10, cursor:"pointer"}}>Test {feature.title} Function</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
