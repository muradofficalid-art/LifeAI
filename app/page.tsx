"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se explain video - Business ke liye", color: "#ff006e" },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals - Auto sync FREE", color: "#8338ec" },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - Script to Video - Phase 2 Target", color: "#00ff88" },
  { id: "voice", icon: "🎙️", title: "AI Voiceover", desc: "SIDE PE - Edge TTS FREE - Filhal Band", color: "#ffbe0b", side: true },
  { id: "avatar", icon: "🧑‍🎤", title: "AI Avatar", desc: "Avatar se video - Canvas FREE", color: "#3a86ff" },
  { id: "translator", icon: "🌐", title: "Translator", desc: "Urdu/Hindi/English FREE translate", color: "#fb5607" },
];

export default function LandingPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login"|"signup">("signup");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle Generate Click - Purana Dashboard pe jayega
  const handleGenerateClick = () => {
    if(!isLoggedIn){
      setAuthMode("signup");
      setShowAuth(true);
    } else {
      router.push('/dashboard');
    }
  };

  const handleFeatureClick = (f:any) => {
    if(f.side) return;
    if(f.id === 'video'){
      handleGenerateClick();
      return;
    }
    if(!isLoggedIn){
      setAuthMode("signup");
      setShowAuth(true);
    } else {
      setActivePage(f.id);
    }
  };

  if (activePage) {
    const feature = FEATURES.find(f => f.id === activePage);
    return <FeaturePage feature={feature} activeId={activePage} onBack={() => setActivePage(null)} />;
  }

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      <header style={{padding:"14px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e", position:"sticky", top:0, background:"rgba(5,5,16,0.9)", backdropFilter:"blur(10px)", zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%"}}></div><b>Life-AI</b></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={()=>setActivePage('pricing')} style={{background:"transparent", color:"#aaa", border:"none", padding:"6px 10px", borderRadius:20, cursor:"pointer", fontSize:13}}>Pricing</button>
          {!isLoggedIn ? (
            <>
              <button onClick={()=>{setAuthMode("login"); setShowAuth(true)}} style={{background:"transparent", color:"#fff", border:"1px solid #333", padding:"7px 14px", borderRadius:20, cursor:"pointer", fontSize:13}}>Login</button>
              <button onClick={()=>{setAuthMode("signup"); setShowAuth(true)}} style={{background:"#ff006e", color:"#fff", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer", fontWeight:600, fontSize:13}}>Get started →</button>
            </>
          ) : (
            <button onClick={()=>router.push('/dashboard')} style={{background:"#00ff88", color:"#000", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer", fontWeight:700, fontSize:13}}>Dashboard →</button>
          )}
        </div>
      </header>

      <div style={{textAlign:"center", padding:"60px 20px 20px"}}>
        <div style={{fontSize:12, color:"#888", background:"#1a1a2e", display:"inline-block", padding:"4px 12px", borderRadius:20}}>• AI Video Generator • Cinematic 8K</div>
        <h1 style={{fontSize:36, margin:"20px 0", lineHeight:1.2}}>Turn idea into videos<br/><span style={{color:"#a78bfa"}}>with AI voices</span></h1>
        <p style={{color:"#888", fontSize:14}}>Transform your ideas into stunning videos with AI video generator.</p>
        
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:12, maxWidth:600, margin:"20px auto", display:"flex", gap:8}}>
          <input placeholder="Create a faceless TikTok video about 5 money habits..." style={{flex:1, background:"transparent", border:"none", color:"#fff", outline:"none"}}/>
          <button onClick={handleGenerateClick} style={{background:"#ff006e", color:"#fff", border:"none", padding:"10px 18px", borderRadius:12, cursor:"pointer", fontWeight:600}}>Generate video →</button>
        </div>
        
        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:16}}>
          <button onClick={handleGenerateClick} style={{background:"#ff006e", color:"#fff", border:"none", padding:"12px 22px", borderRadius:24, cursor:"pointer", fontWeight:700}}>Get started for free →</button>
          <button onClick={()=>setActivePage('pricing')} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"12px 22px", borderRadius:24, cursor:"pointer"}}>View pricing • Rs 8k</button>
        </div>
      </div>

      <div style={{padding:20, maxWidth:1000, margin:"40px auto 0"}}>
        <h3 style={{fontSize:12, letterSpacing:2, color:"#888"}}>FEATURES - REAL CLICK</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12, marginTop:16}}>
          {FEATURES.map(f=>(
            <div key={f.id} onClick={()=>handleFeatureClick(f)} 
              style={{background:f.side ? "#0a0a0a" : "#111122", border:`1px solid ${f.side ? "#222" : f.color}33`, borderRadius:16, padding:18, cursor: f.side ? "not-allowed" : "pointer", opacity: f.side ? 0.5 : 1}}>
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

      <div style={{padding:20, maxWidth:1000, margin:"20px auto"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, fontSize:12, color:"#888", borderTop:"1px solid #1a1a2e", paddingTop:20}}>
          <div><b style={{color:"#fff", fontSize:11}}>FEATURES</b><br/><br/>{FEATURES.map(f=> <div key={f.id} onClick={()=>handleFeatureClick(f)} style={{marginBottom:6, cursor:"pointer"}}>{f.title} →</div>)}</div>
          <div><b style={{color:"#fff", fontSize:11}}>PRICING</b><br/><br/><div style={{cursor:"pointer"}} onClick={()=>setActivePage('pricing')}>Pricing - Rs 0 - Rs 15k →<br/>Free - 3 videos / month<br/>Standard - Rs 8,000<br/>Premium - Rs 15,000</div></div>
        </div>
      </div>

      {showAuth && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20}}>
          <div style={{background:"linear-gradient(180deg, #151528, #0a0a18)", border:"1px solid #2a2a4e", borderRadius:20, padding:24, width:"100%", maxWidth:380, boxShadow:"0 20px 80px rgba(0,0,0,0.8)"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20}}>
              <h2 style={{margin:0, fontSize:20}}>{authMode==="login" ? "Welcome Back! 👋" : "Create Account 🚀"}</h2>
              <button onClick={()=>setShowAuth(false)} style={{background:"#1a1a2e", border:"none", color:"#888", width:30, height:30, borderRadius:"50%", cursor:"pointer"}}>✕</button>
            </div>
            
            <div style={{display:"flex", gap:8, marginBottom:20, background:"#050510", borderRadius:10, padding:4}}>
              <button onClick={()=>setAuthMode("signup")} style={{flex:1, background: authMode==="signup" ? "#ff006e" : "transparent", color:"#fff", border:"none", padding:"8px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600}}>Sign Up</button>
              <button onClick={()=>setAuthMode("login")} style={{flex:1, background: authMode==="login" ? "#222" : "transparent", color:"#fff", border:"none", padding:"8px", borderRadius:8, cursor:"pointer", fontSize:13}}>Login</button>
            </div>

            <input placeholder="Email - test@life-ai.pk" style={{width:"100%", background:"#050510", border:"1px solid #2a2a4e", color:"#fff", padding:"12px", borderRadius:10, marginBottom:10, outline:"none", boxSizing:"border-box"}}/>
            <input placeholder="Password" type="password" style={{width:"100%", background:"#050510", border:"1px solid #2a2a4e", color:"#fff", padding:"12px", borderRadius:10, marginBottom:14, outline:"none", boxSizing:"border-box"}}/>
            
            <button onClick={()=>{
              setIsLoggedIn(true);
              setShowAuth(false);
              router.push('/dashboard');
            }} style={{width:"100%", background:"#ff006e", color:"#fff", border:"none", padding:"14px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:14}}>
              {authMode==="login" ? "Login →" : "Create Free Account →"}
            </button>
            
            <p style={{fontSize:11, color:"#666", textAlign:"center", marginTop:12}}>FREE - 3 videos / month • No credit card • Canvas FREE Engine</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturePage({feature, activeId, onBack}:any){
  const isPricing = activeId === 'pricing' || !feature;
  if(isPricing){
    return (
      <div style={{background:"#050510", color:"#fff", minHeight:"100vh"}}>
        <header style={{padding:"14px 20px", borderBottom:"1px solid #1a1a2e", display:"flex", justifyContent:"space-between", alignItems:"center"}}><button onClick={onBack} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #2a2a4e", padding:"8px 14px", borderRadius:10, cursor:"pointer"}}>← Back</button><span style={{fontSize:12, color:"#00ff88"}}>● LIVE</span></header>
        <div style={{maxWidth:900, margin:"0 auto", padding:"30px 20px"}}><h1>💰 Pricing</h1><div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14, marginTop:20}}><div style={{background:"#111122", border:"1px solid #222", borderRadius:16, padding:20}}>Free - Rs 0 - 3 videos</div><div style={{background:"#111122", border:"1px solid #ff006e", borderRadius:16, padding:20}}>Standard - Rs 8,000 - 100 videos</div><div style={{background:"#111122", border:"1px solid #8338ec44", borderRadius:16, padding:20}}>Premium - Rs 15,000 - Unlimited</div></div></div>
      </div>
    );
  }
  return (
    <div style={{background:"radial-gradient(1000px at 30% -10%, #1a0b2e 0%, #050510 55%)", color:"#fff", minHeight:"100vh"}}>
      <header style={{padding:"14px 20px", borderBottom:"1px solid #1a1a2e", display:"flex", justifyContent:"space-between", alignItems:"center"}}><button onClick={onBack} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #2a2a4e", padding:"8px 14px", borderRadius:10, cursor:"pointer"}}>← Back</button><span style={{fontSize:11, color:"#00ff88"}}>● FREE ENGINE</span></header>
      <div style={{maxWidth:900, margin:"0 auto", padding:"28px 20px"}}>
        <div style={{display:"flex", gap:16, alignItems:"start"}}><div style={{width:58, height:58, background:`${feature.color}25`, border:`1px solid ${feature.color}40`, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28}}>{feature.icon}</div><div><h1 style={{margin:0, fontSize:24}}>{feature.title}</h1><p style={{color:"#888", fontSize:14}}>{feature.desc}</p></div></div>
        <div style={{background:"#111122", border:"1px solid #1e1e3a", borderRadius:20, padding:22, marginTop:22}}>
          <p>PRO Workspace - {feature.title}</p>
          <button style={{width:"100%", background:feature.color, color:"#fff", border:"none", padding:"14px", borderRadius:12, cursor:"pointer", fontWeight:700}}>Start {feature.title} →</button>
        </div>
      </div>
    </div>
  );
}
