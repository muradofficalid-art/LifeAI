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

  if (activePage) {
    const feature = FEATURES.find(f => f.id === activePage);
    return <FeaturePage feature={feature} activeId={activePage} onBack={() => setActivePage(null)} />;
  }

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      {/* Header - FIXED Pricing Click */}
      <header style={{padding:"16px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e"}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%"}}></div><b>Life-AI</b></div>
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <button onClick={()=>setActivePage('pricing')} style={{background:"transparent", color:"#aaa", border:"1px solid #222", padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:13}}>Pricing</button>
          <button onClick={()=>setActivePage('video')} style={{background:"#ff006e", color:"#fff", border:"none", padding:"8px 16px", borderRadius:20, cursor:"pointer", fontWeight:600}}>Get started →</button>
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
          <button onClick={()=>setActivePage('pricing')} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"12px 22px", borderRadius:24, cursor:"pointer"}}>View pricing • Rs 8k</button>
        </div>
      </div>

      {/* REAL CLICK FEATURES GRID */}
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

      <div style={{padding:20, maxWidth:1000, margin:"20px auto"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, fontSize:12, color:"#888", borderTop:"1px solid #1a1a2e", paddingTop:20}}>
          <div>
            <b style={{color:"#fff", fontSize:11, letterSpacing:1}}>FEATURES</b><br/><br/>
            {FEATURES.map(f=> <div key={f.id} onClick={()=>!f.side && setActivePage(f.id)} style={{cursor: f.side ? "not-allowed" : "pointer", marginBottom:6, opacity: f.side?0.5:1}}>{f.title} {f.side ? "(Side Pe)" : "→"}</div>)}
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

// ===== PRO FEATURE PAGE - Bilkul Cinematic SaaS Look =====
function FeaturePage({feature, activeId, onBack}:any){
  const isPricing = activeId === 'pricing' || !feature;
  const isMain = feature?.id === 'video';

  if(isPricing){
    return (
      <div style={{background:"radial-gradient(1200px at 20% -10%, #1a0b2e 0%, #050510 60%)", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
        <header style={{padding:"14px 20px", borderBottom:"1px solid #1a1a2e", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"rgba(5,5,16,0.85)", backdropFilter:"blur(10px)"}}>
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <button onClick={onBack} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #2a2a4e", padding:"8px 14px", borderRadius:10, cursor:"pointer"}}>← Back to Landing</button>
            <span style={{color:"#666"}}>|</span><span style={{fontSize:13, color:"#888"}}>Life-AI / <b style={{color:"#fff"}}>Pricing</b></span>
          </div>
          <span style={{fontSize:11, background:"#00ff8815", color:"#00ff88", border:"1px solid #00ff8833", padding:"4px 10px", borderRadius:20}}>● LIVE</span>
        </header>
        <div style={{maxWidth:900, margin:"0 auto", padding:"30px 20px"}}>
          <h1 style={{fontSize:32, fontWeight:800}}>💰 Pricing - Choose Your Plan</h1>
          <p style={{color:"#888"}}>Start FREE, upgrade jab chahye. 100% FREE engine, no watermark.</p>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14, marginTop:24}}>
            <div style={{background:"linear-gradient(180deg, #111122, #0a0a18)", border:"1px solid #222", borderRadius:20, padding:22}}><div style={{fontSize:11, color:"#888", letterSpacing:1}}>FREE</div><div style={{fontSize:28, fontWeight:800, margin:"8px 0"}}>Rs 0 <span style={{fontSize:13, color:"#888", fontWeight:400}}>/mo</span></div><div style={{color:"#888", fontSize:13}}>3 videos / month<br/>✓ Canvas FREE<br/>✓ No Watermark</div><button onClick={onBack} style={{width:"100%", marginTop:16, background:"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"12px", borderRadius:10, cursor:"pointer"}}>Start Free →</button></div>
            <div style={{background:"linear-gradient(180deg, #1a122e, #0f0a18)", border:"1px solid #ff006e", borderRadius:20, padding:22, boxShadow:"0 0 40px #ff006e22"}}><div style={{fontSize:11, color:"#ff006e", letterSpacing:1}}>POPULAR • STANDARD</div><div style={{fontSize:28, fontWeight:800, margin:"8px 0"}}>Rs 8,000 <span style={{fontSize:13, color:"#888", fontWeight:400}}>/mo</span></div><div style={{color:"#aaa", fontSize:13}}>100 videos<br/>✓ All Features<br/>✓ Priority Support</div><button style={{width:"100%", marginTop:16, background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:10, cursor:"pointer", fontWeight:700}}>Get Standard →</button></div>
            <div style={{background:"linear-gradient(180deg, #111122, #0a0a18)", border:"1px solid #8338ec44", borderRadius:20, padding:22}}><div style={{fontSize:11, color:"#8338ec", letterSpacing:1}}>PREMIUM</div><div style={{fontSize:28, fontWeight:800, margin:"8px 0"}}>Rs 15,000 <span style={{fontSize:13, color:"#888", fontWeight:400}}>/mo</span></div><div style={{color:"#888", fontSize:13}}>Unlimited<br/>✓ Everything<br/>✓ API Access</div><button style={{width:"100%", marginTop:16, background:"#222", color:"#fff", border:"1px solid #333", padding:"12px", borderRadius:10, cursor:"pointer"}}>Go Premium →</button></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:"radial-gradient(1000px at 30% -10%, #1a0b2e 0%, #050510 55%)", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      <header style={{padding:"14px 20px", borderBottom:"1px solid #1a1a2e", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"rgba(5,5,16,0.85)", backdropFilter:"blur(12px)", zIndex:10}}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <button onClick={onBack} style={{background:"#1a1a2e", color:"#fff", border:"1px solid #2a2a4e", padding:"8px 14px", borderRadius:10, cursor:"pointer", fontSize:13}}>← Back</button>
          <div style={{width:1, height:18, background:"#222"}}></div>
          <div style={{fontSize:13, color:"#888"}}>Life-AI / <span style={{color:"#fff"}}>{feature.title}</span></div>
        </div>
        <div style={{fontSize:11, background:"#00ff8815", color:"#00ff88", border:"1px solid #00ff8833", padding:"4px 10px", borderRadius:20}}>● 100% FREE ENGINE</div>
      </header>

      <div style={{maxWidth:900, margin:"0 auto", padding:"28px 20px"}}>
        <div style={{display:"flex", gap:16, alignItems:"start"}}>
          <div style={{width:58, height:58, background:`linear-gradient(135deg, ${feature.color}25, transparent)`, border:`1px solid ${feature.color}40`, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28}}>{feature.icon}</div>
          <div style={{flex:1}}>
            <h1 style={{fontSize:26, margin:0, fontWeight:800, letterSpacing:-0.5}}>{feature.title}</h1>
            <p style={{color:"#888", margin:"6px 0 0", fontSize:14}}>{feature.desc}</p>
            <div style={{display:"flex", gap:8, marginTop:12, flexWrap:"wrap"}}>
              <span style={{fontSize:11, background:"#1a1a2e", border:"1px solid #2a2a4e", padding:"4px 10px", borderRadius:20, color:"#aaa"}}>✓ No Watermark</span>
              <span style={{fontSize:11, background:"#1a1a2e", border:"1px solid #2a2a4e", padding:"4px 10px", borderRadius:20, color:"#aaa"}}>✓ 1080x1920</span>
              <span style={{fontSize:11, background:"#00ff8815", border:"1px solid #00ff8833", padding:"4px 10px", borderRadius:20, color:"#00ff88"}}>● REAL CLICK ACTIVE</span>
            </div>
          </div>
        </div>

        <div style={{background:"linear-gradient(180deg, #111122 0%, #0a0a18 100%)", border:"1px solid #1e1e3a", borderRadius:20, padding:22, marginTop:22, boxShadow:"0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"}}>
          {isMain ? (
            <>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
                <h3 style={{margin:0, fontSize:14, display:"flex", alignItems:"center", gap:8}}><span style={{width:6, height:6, background:"#00ff88", borderRadius:"50%"}}></span> MAIN PIPELINE - Script to Video</h3>
                <span style={{fontSize:11, color:"#666"}}>Phase 2 Target</span>
              </div>
              <div style={{display:"flex", gap:6, marginBottom:16}}>{["Script","Photo","Clips","Final"].map((s,i)=><div key={s} style={{flex:1, height:4, background:i===0?"#00ff88":"#1a1a2e", borderRadius:4}}></div>)}</div>
              <textarea placeholder="Yahan kahani likho jan... Example: Ek purani haveli thi jahan..." style={{width:"100%", height:125, background:"#050510", border:"1px solid #2a2a4e", color:"#fff", borderRadius:12, padding:14, fontSize:14, outline:"none", resize:"none"}}></textarea>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12}}>
                <div style={{background:"#050510", border:"1px solid #1a1a2e", borderRadius:10, padding:10, fontSize:11, color:"#666"}}><b style={{color:"#888"}}>Output:</b> 9:16 • 1080x1920</div>
                <div style={{background:"#050510", border:"1px solid #1a1a2e", borderRadius:10, padding:10, fontSize:11, color:"#666"}}><b style={{color:"#888"}}>Engine:</b> Canvas FREE - No API</div>
              </div>
              <button style={{width:"100%", background:"linear-gradient(90deg, #00ff88, #00cc6a)", color:"#000", border:"none", padding:"16px", borderRadius:12, fontWeight:800, marginTop:14, cursor:"pointer", fontSize:14}}>🚀 Generate Video - Canvas FREE Engine →</button>
              <p style={{fontSize:11, color:"#00ff88", marginTop:10, textAlign:"center", opacity:0.7}}>Pattern: Script → Photo (No Watermark) → Clips (Zoom/Shake/Parallax/Spin/Glow) → Final Video</p>
            </>
          ) : (
            <>
              <div style={{background:"#050510", border:"1px dashed #2a2a4e", borderRadius:12, padding:26, textAlign:"center"}}>
                <div style={{fontSize:34, marginBottom:8}}>{feature.icon}</div>
                <h3 style={{margin:"0"}}>{feature.title} Workspace</h3>
                <p style={{color:"#666", fontSize:13, margin:"8px 0 14px"}}>Canvas FREE engine - 100% FREE, no watermark, no limit. Phase 1 ACTIVE.</p>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
                  <div style={{background:"#111122", borderRadius:8, padding:10, fontSize:11}}><div style={{color:"#666"}}>Input</div><div style={{color:"#fff", fontWeight:700, marginTop:4}}>Ready</div></div>
                  <div style={{background:"#111122", borderRadius:8, padding:10, fontSize:11}}><div style={{color:"#666"}}>Engine</div><div style={{color:"#00ff88", fontWeight:700, marginTop:4}}>● Active</div></div>
                  <div style={{background:"#111122", borderRadius:8, padding:10, fontSize:11}}><div style={{color:"#666"}}>Output</div><div style={{color:"#fff", fontWeight:700, marginTop:4}}>9:16</div></div>
                </div>
              </div>
              <button style={{width:"100%", background:feature.color, color:"#fff", border:"none", padding:"14px", borderRadius:12, fontWeight:700, marginTop:14, cursor:"pointer"}}>Start {feature.title} →</button>
            </>
          )}
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:14}}>
          <div style={{background:"rgba(17,17,34,0.6)", border:"1px solid #1a1a2e", borderRadius:12, padding:12, fontSize:12}}><div style={{color:"#666"}}>Videos</div><div style={{fontSize:18, fontWeight:700, marginTop:2}}>1,247</div><div style={{color:"#00ff88", fontSize:11}}>▲ 12% today</div></div>
          <div style={{background:"rgba(17,17,34,0.6)", border:"1px solid #1a1a2e", borderRadius:12, padding:12, fontSize:12}}><div style={{color:"#666"}}>Avg. Time</div><div style={{fontSize:18, fontWeight:700, marginTop:2}}>~8 sec</div><div style={{color:"#888", fontSize:11}}>Canvas Engine</div></div>
          <div style={{background:"rgba(17,17,34,0.6)", border:"1px solid #1a1a2e", borderRadius:12, padding:12, fontSize:12}}><div style={{color:"#666"}}>Success</div><div style={{fontSize:18, fontWeight:700, marginTop:2}}>100%</div><div style={{color:"#00ff88", fontSize:11}}>No Watermark</div></div>
        </div>
      </div>
    </div>
  );
}
