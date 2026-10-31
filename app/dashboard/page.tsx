"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const VOICES = [
  "Urdu - Asad - Documentary / Islami / Vlog",
  "Hindi - Priya - Explainer / Business",
  "English - Adam - Cinematic",
  "Urdu - Ayesha - Emotional Story",
];

const WORKFLOWS = [
  { id: "script", title: "Script to video", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400", desc: "MAIN - Canvas FREE" },
  { id: "avatar", title: "Avatar video", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", desc: "Avatar + Voice" },
  { id: "ppt", title: "PPT to video", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400", desc: "PPT → Video" },
  { id: "explainer", title: "Explainer video", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400", desc: "Business Explain" },
  { id: "motion", title: "Motion graphics explainer", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400", desc: "Animation" },
  { id: "music", title: "Music video", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", desc: "Music + Visuals" },
  { id: "podcast", title: "Podcast video", img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400", desc: "Podcast → Video" },
  { id: "product", title: "Product video", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", desc: "Product Showcase" },
  { id: "blog", title: "Blog to video", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400", desc: "Blog Link → Video" },
  { id: "swap", title: "Swap Studio", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", desc: "Face Swap FREE" },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Video");
  const [voice, setVoice] = useState(VOICES[0]);
  const [idea, setIdea] = useState("");
  const [showVoice, setShowVoice] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    if(!idea.trim()){ alert("Jan pehle idea likho! Example: 5 money habits"); return; }
    setCreating(true);
    setTimeout(()=>{
      setCreating(false);
      alert(`✅ LIVE! Video Creating:\n\nIdea: ${idea}\nVoice: ${voice}\nEngine: Canvas FREE - No Watermark\n\nPattern: Script → Photo → Clips (5 Raaz) → Final Video`);
    }, 800);
  };

  const handleWorkflow = (w:any) => {
    // Har workflow LIVE
    if(w.id === 'script'){
      document.getElementById('idea-input')?.focus();
      window.scrollTo({top:0, behavior:'smooth'});
      alert(`🎬 ${w.title} ACTIVE - Uper idea box me script likho jan!`);
    } else {
      alert(`🚀 ${w.title} - LIVE!\n\nEngine: Canvas FREE\nVoice: ${voice}\n\nAbhi Phase 1 me skeleton active hai. Phase 2 me full functional: ${w.title} → ${w.desc}`);
      // Future: router.push(`/dashboard/${w.id}`)
    }
  };

  return (
    <div style={{background:"#0f0a1f", color:"#fff", minHeight:"100vh", fontFamily:"system-ui", paddingBottom:80}}>
      {/* Top Bar */}
      <div style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{width:32, height:32, background:"#ff006e", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}} onClick={()=>router.push('/')}>●</div>
        <div style={{background:"#ff006e", color:"#fff", padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer"}}>◆ Rg</div>
      </div>

      <div style={{textAlign:"center", padding:"10px 20px 0"}}>
        <h2 style={{margin:0, fontSize:16, fontWeight:600}}>Let's get started, public</h2>
        <div style={{display:"flex", gap:8, justifyContent:"center", marginTop:12}}>
          {["Video","Voiceover","Design"].map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} style={{background: activeTab===t ? "#ff006e" : "#1e1438", color:"#fff", border:"none", padding:"6px 14px", borderRadius:20, fontSize:12, cursor:"pointer", fontWeight: activeTab===t ? 700 : 400}}>{activeTab===t && "● "}{t}</button>
          ))}
        </div>
      </div>

      {/* Input Box - LIVE */}
      <div style={{margin:"16px", background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:16, padding:14}}>
        <textarea id="idea-input" value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Enter your video idea, script, or blog link..." style={{width:"100%", height:70, background:"transparent", border:"none", color:"#fff", outline:"none", resize:"none", fontSize:14}}></textarea>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
          <div style={{display:"flex", gap:6}}>
            <button style={{background:"#1e1438", border:"none", color:"#888", width:28, height:28, borderRadius:"50%", cursor:"pointer"}}>👤✦</button>
          </div>
          <button onClick={handleCreate} disabled={creating} style={{background:"#ff2e7e", color:"#fff", border:"none", padding:"10px 18px", borderRadius:24, fontWeight:700, fontSize:13, cursor:"pointer", opacity: creating ? 0.6 : 1}}>{creating ? "⏳ Creating..." : "◆ Create →"}</button>
        </div>
      </div>

      {/* Voice Selector - LIVE */}
      <div style={{margin:"0 16px"}}>
        <div style={{fontSize:11, color:"#888", letterSpacing:1, marginBottom:8}}>SELECT VOICE (3 LOCKED)</div>
        <div style={{position:"relative"}}>
          <div onClick={()=>setShowVoice(!showVoice)} style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:12, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontSize:13}}>
            <span>{voice}</span><span style={{transform: showVoice ? "rotate(180deg)" : "rotate(0deg)"}}>⌄</span>
          </div>
          {showVoice && (
            <div style={{position:"absolute", top:"100%", left:0, right:0, background:"#1e1438", border:"1px solid #3a2e6e", borderRadius:12, marginTop:6, zIndex:10, overflow:"hidden"}}>
              {VOICES.map(v=>(
                <div key={v} onClick={()=>{setVoice(v); setShowVoice(false)}} style={{padding:"12px 14px", fontSize:12, cursor:"pointer", background: voice===v ? "#ff006e22" : "transparent", borderBottom:"1px solid #2a1e4e"}}>{v} {voice===v && "✓"}</div>
              ))}
              <div style={{padding:"10px 14px", fontSize:11, color:"#888"}}>🔒 3 voices locked - Upgrade to unlock</div>
            </div>
          )}
        </div>
      </div>

      {/* Workflows Grid - SAB LIVE */}
      <div style={{margin:"20px 16px 0"}}>
        <div style={{fontSize:11, color:"#888", letterSpacing:1, marginBottom:12}}>VIDEO WORKFLOWS</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          {WORKFLOWS.map(w=>(
            <div key={w.id} onClick={()=>handleWorkflow(w)} style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:16, overflow:"hidden", cursor:"pointer", position:"relative", transition:"0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#ff006e55"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a1e4e"}}>
              <div style={{height:140, background:`url(${w.img}) center/cover`, opacity:0.6}}></div>
              <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 30%, #1a1232 90%)"}}></div>
              <div style={{position:"absolute", bottom:0, left:0, right:0, padding:12}}>
                <div style={{fontSize:13, fontWeight:700, lineHeight:1.2}}>{w.title}</div>
                <div style={{fontSize:11, color:"#aaa", marginTop:6, display:"flex", justifyContent:"space-between"}}><span>Try it now →</span><span style={{fontSize:10, background:"#00ff8815", color:"#00ff88", padding:"2px 6px", borderRadius:10}}>LIVE</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav - LIVE */}
      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0f0a1f", borderTop:"1px solid #1a1a2e", display:"flex", justifyContent:"space-around", padding:"8px 0", zIndex:20}}>
        {[
          {icon:"🏠", label:"Home", active:true},
          {icon:"📁", label:"Files", active:false},
          {icon:"👤", label:"Characters", active:false},
          {icon:"🎬", label:"Series", active:false},
          {icon:"🎮", label:"Playground", active:false},
          {icon:"📄", label:"Templates", active:false},
          {icon:"📦", label:"Resources", active:false},
        ].map(n=>(
          <div key={n.label} onClick={()=> n.label==="Home" ? router.push('/') : alert(`${n.label} - Coming Soon! Phase 2 me LIVE hoga jan!`)} style={{textAlign:"center", cursor:"pointer", opacity: n.active ? 1 : 0.5}}>
            <div style={{fontSize:18}}>{n.icon}</div><div style={{fontSize:9, marginTop:2}}>{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
