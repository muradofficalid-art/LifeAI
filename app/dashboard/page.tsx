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
  const [openMenu, setOpenMenu] = useState<null | 'upgrade' | 'auto' | 'help' | 'notif' | 'profile'>(null);

  const handleCreate = () => {
    if(!idea.trim()){ alert("Jan pehle idea likho!"); return; }
    setCreating(true);
    setTimeout(()=>{
      setCreating(false);
      router.push(`/dashboard/script-to-video?idea=${encodeURIComponent(idea)}&voice=${encodeURIComponent(voice)}`);
    }, 500);
  };

  const handleWorkflow = (w:any) => {
    if(w.id === 'script'){ router.push('/dashboard/script-to-video'); return; }
    else { alert(`🚀 ${w.title} - LIVE!`); }
  };

  const closeAll = () => setOpenMenu(null);

  return (
    <div style={{background:"#0f0a1f", color:"#fff", minHeight:"100vh", fontFamily:"system-ui", paddingBottom:80, position:"relative"}}>
      {/* TOP HEADER WITH 5 BUTTONS */}
      <div style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:50, background:"#0f0a1f"}}>
        <div style={{width:32, height:32, background:"#ff006e", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}} onClick={()=>router.push('/')}>●</div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <button onClick={()=> setOpenMenu(openMenu==='upgrade'?null:'upgrade')} style={{width:36, height:36, background: openMenu==='upgrade'?"#ff006e":"#1e1438", border:"1px solid #2a1e4e", borderRadius:10, cursor:"pointer", fontSize:14}}>💎</button>
          <button onClick={()=> setOpenMenu(openMenu==='auto'?null:'auto')} style={{background: openMenu==='auto'?"#ff006e":"#1e1438", border:"1px solid #2a1e4e", color:"#fff", padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer"}}>◆ Rg</button>
          <button onClick={()=> setOpenMenu(openMenu==='help'?null:'help')} style={{width:36, height:36, background: openMenu==='help'?"#ff006e":"#1e1438", border:"1px solid #2a1e4e", borderRadius:10, cursor:"pointer", fontSize:14, color:"#fff"}}>❓</button>
          <button onClick={()=> setOpenMenu(openMenu==='notif'?null:'notif')} style={{width:36, height:36, background: openMenu==='notif'?"#ff006e":"#1e1438", border:"1px solid #2a1e4e", borderRadius:10, cursor:"pointer", fontSize:14, color:"#fff", position:"relative"}}>🔔</button>
          <button onClick={()=> setOpenMenu(openMenu==='profile'?null:'profile')} style={{width:36, height:36, background:"#ff006e", border:"1px solid #ff006e", borderRadius:"50%", cursor:"pointer", fontSize:12, fontWeight:700}}>👤</button>
        </div>
      </div>

      {openMenu && <div onClick={closeAll} style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:60}}></div>}

      {/* 1 - UPGRADE = LIFE-AI PRICING */}
      {openMenu==='upgrade' && (
        <div style={{position:"fixed", top:60, right:10, left:10, maxWidth:700, margin:"0 auto", background:"#1a1232", border:"1px solid #3a2e6e", borderRadius:20, zIndex:70, padding:16, maxHeight:"85vh", overflowY:"auto"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><h3 style={{margin:0}}>💎 Upgrade Plan</h3><button onClick={closeAll} style={{background:"#1e1438", border:"none", color:"#fff", width:28, height:28, borderRadius:"50%", cursor:"pointer"}}>✕</button></div>
          <div style={{background:"#ff006e22", color:"#ff88b0", padding:"8px 12px", borderRadius:10, fontSize:12, marginTop:12, textAlign:"center"}}>Simple pricing for Pakistani creators</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:14}}>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:14, padding:12}}>
              <div style={{fontWeight:700, fontSize:13}}>Free</div><div style={{fontSize:10, color:"#888"}}>Start & explore</div><div style={{fontSize:18, fontWeight:800, marginTop:6}}>Rs 0</div><div style={{fontSize:9, color:"#888"}}>3 videos / month only</div>
              <div style={{marginTop:8, fontSize:9, color:"#bbb", display:"grid", gap:3}}><span>• With watermark</span><span>• 720p export</span><span>• Standard voices</span><span>• Max 1 min duration</span></div>
              <div style={{marginTop:10, background:"#1e1438", padding:"6px", borderRadius:10, textAlign:"center", fontSize:10}}>Start for free</div>
            </div>
            <div style={{background:"#ff006e15", border:"2px solid #ff006e", borderRadius:14, padding:12}}>
              <div style={{fontSize:9, background:"#ff006e", padding:"2px 8px", borderRadius:10, textAlign:"center", marginBottom:6}}>Most popular</div>
              <div style={{fontWeight:700, fontSize:13}}>Standard</div><div style={{fontSize:18, fontWeight:800, marginTop:4}}>Rs 8,000</div><div style={{fontSize:9, color:"#888"}}>/month</div>
              <div style={{marginTop:8, fontSize:9, display:"grid", gap:3}}><span style={{color:"#00ff88"}}>✓ 60 Long videos / month</span><span style={{color:"#00ff88"}}>✓ 60 Shorts / month</span><span style={{color:"#bbb"}}>• Long - max 8 min</span><span style={{color:"#bbb"}}>• No watermark</span><span style={{color:"#bbb"}}>• 1080p & 4K export</span><span style={{color:"#bbb"}}>• 20+ premium AI voices</span><span style={{color:"#bbb"}}>• Commercial rights included</span><span style={{color:"#bbb"}}>• YouTube licensed music</span></div>
              <div style={{marginTop:10, background:"#ff006e", padding:"6px", borderRadius:10, textAlign:"center", fontSize:10, fontWeight:700}}>Get Standard →</div>
            </div>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:14, padding:12}}>
              <div style={{fontWeight:700, fontSize:13}}>Premium</div><div style={{fontSize:10, color:"#888"}}>For pros & agencies</div><div style={{fontSize:18, fontWeight:800, marginTop:6}}>Rs 15,000</div><div style={{fontSize:9, color:"#888"}}>/month</div>
              <div style={{marginTop:8, fontSize:9, display:"grid", gap:3}}><span style={{color:"#00ff88"}}>✓ 120 Long videos / month</span><span style={{color:"#00ff88"}}>✓ 120 Shorts / month</span><span style={{color:"#bbb"}}>• Long - max 8 min</span><span style={{color:"#bbb"}}>• No watermark</span><span style={{color:"#bbb"}}>• 4K Cinematic export</span><span style={{color:"#bbb"}}>• Clone your own voice</span><span style={{color:"#bbb"}}>• Team access + API</span><span style={{color:"#bbb"}}>• Priority support 24/7</span><span style={{color:"#bbb"}}>• Commercial rights</span></div>
              <div style={{marginTop:10, background:"#1e1438", border:"1px solid #2a1e4e", padding:"6px", borderRadius:10, textAlign:"center", fontSize:10}}>Go Premium</div>
            </div>
          </div>
        </div>
      )}

      {/* 2 - Automation */}
      {openMenu==='auto' && (
        <div style={{position:"fixed", top:60, right:10, left:10, maxWidth:600, margin:"0 auto", background:"#1a1232", border:"1px solid #3a2e6e", borderRadius:20, zIndex:70, padding:16, maxHeight:"85vh", overflowY:"auto"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}><h3 style={{margin:0}}>◆ Rg Automation</h3><button onClick={closeAll} style={{background:"#1e1438", border:"none", color:"#fff", width:28, height:28, borderRadius:"50%", cursor:"pointer"}}>✕</button></div>
          <div style={{marginTop:12, color:"#bbb", fontSize:12}}>Connect Zapier, Make, n8n, or REST API to trigger video creation automatically...</div>
          <div style={{display:"flex", gap:8, marginTop:12, flexWrap:"wrap"}}>
            <div style={{background:"#ff006e", padding:"6px 12px", borderRadius:10, fontSize:11}}> + Create key</div>
            <div style={{background:"#1e1438", border:"1px solid #2a1e4e", padding:"6px 12px", borderRadius:10, fontSize:11}}>Zapier guide</div>
            <div style={{background:"#1e1438", border:"1px solid #2a1e4e", padding:"6px 12px", borderRadius:10, fontSize:11}}>Make guide</div>
            <div style={{background:"#1e1438", border:"1px solid #2a1e4e", padding:"6px 12px", borderRadius:10, fontSize:11}}>API doc</div>
          </div>
          <div style={{marginTop:14, display:"grid", gap:10}}>
            {[
              {t:"Zapier Integration", d:"Turn Google Sheets rows into videos and auto-publish to YouTube"},
              {t:"Make Integration", d:"Convert blog posts into videos and auto-upload to any platform"},
              {t:"REST TTS API (Enterprise-only)", d:"Full programmatic control, generate audio content from any codebase"},
              {t:"No-Code Workflows", d:"No developers needed, Visual builders handle entire flow"},
            ].map(i=>(
              <div key={i.t} style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:12, padding:12}}>
                <div style={{fontWeight:700, fontSize:12}}>{i.t}</div><div style={{fontSize:11, color:"#888", marginTop:4}}>{i.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 - Help */}
      {openMenu==='help' && (
        <div style={{position:"fixed", top:60, right:16, width:220, background:"#1a1232", border:"1px solid #3a2e6e", borderRadius:16, zIndex:70, overflow:"hidden"}}>
          {["▶️ Watch tutorial video","✨ What's new","📚 Resources and guide","👥 Community","📧 Send us an email","💬 Chat"].map(item=>(
            <div key={item} onClick={()=>{alert(item); closeAll();}} style={{padding:"12px 14px", fontSize:12, cursor:"pointer", borderBottom:"1px solid #2a1e4e"}}>{item}</div>
          ))}
        </div>
      )}

      {/* 4 - Notification */}
      {openMenu==='notif' && (
        <div style={{position:"fixed", top:60, right:16, width:320, background:"#1a1232", border:"1px solid #3a2e6e", borderRadius:16, zIndex:70, padding:12, maxHeight:"70vh", overflowY:"auto"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}><h4 style={{margin:0, fontSize:13}}>Notifications</h4><span onClick={()=>alert("Marked all as read")} style={{fontSize:10, color:"#ff006e", cursor:"pointer"}}>Mark all as read</span></div>
          <div style={{marginTop:10, display:"grid", gap:8}}>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:10, padding:10}}><div style={{fontSize:11}}>File ready to download.</div><div style={{fontSize:9, color:"#666"}}>25 days ago</div></div>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:10, padding:10}}><div style={{fontSize:11}}>Export failed - try again</div><div style={{fontSize:9, color:"#666"}}>6 months ago</div></div>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:10, padding:10}}><div style={{fontSize:11}}>Welcome to Life-AI!</div><div style={{fontSize:9, color:"#666"}}>6 months ago</div></div>
          </div>
        </div>
      )}

      {/* 5 - PROFILE = LIFE-AI PRICING SAME */}
      {openMenu==='profile' && (
        <div style={{position:"fixed", top:60, right:10, left:10, maxWidth:700, margin:"0 auto", background:"#1a1232", border:"1px solid #3a2e6e", borderRadius:20, zIndex:70, padding:16, maxHeight:"85vh", overflowY:"auto"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}><h3 style={{margin:0}}>👤 Profile</h3><button onClick={closeAll} style={{background:"#1e1438", border:"none", color:"#fff", width:28, height:28, borderRadius:"50%", cursor:"pointer"}}>✕</button></div>
          <div style={{display:"flex", gap:6, marginTop:12, flexWrap:"wrap"}}>
            {["Usage","Profile","Platforms","Rewards","Referrals","Affiliate","Logout"].map(t=>(
              <div key={t} style={{background: t==="Usage"?"#ff006e":"#1e1438", border:"1px solid #2a1e4e", padding:"5px 10px", borderRadius:20, fontSize:11}}>{t}</div>
            ))}
          </div>
          <div style={{marginTop:12, background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:12, padding:12}}>
            <div style={{fontSize:11, color:"#888"}}>Plan: Free monthly (credits reset on Dec 1, 2026)</div>
            <div style={{marginTop:8, height:6, background:"#1e1438", borderRadius:10}}><div style={{width:"30%", height:"100%", background:"#ff006e", borderRadius:10}}></div></div>
          </div>
          <div style={{fontWeight:700, marginTop:12, fontSize:13}}>Subscribe to Life-AI:</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:10}}>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:14, padding:10}}>
              <div style={{fontWeight:700, fontSize:12}}>Free</div><div style={{fontSize:14, fontWeight:800, marginTop:2}}>Rs 0</div><div style={{fontSize:8, color:"#bbb", marginTop:4}}>3 videos/month - 720p - With watermark - Max 1 min</div>
            </div>
            <div style={{background:"#ff006e15", border:"2px solid #ff006e", borderRadius:14, padding:10}}>
              <div style={{fontSize:9, background:"#ff006e", padding:"2px 6px", borderRadius:10, textAlign:"center", marginBottom:5}}>Most popular</div>
              <div style={{fontWeight:700, fontSize:12}}>Standard</div><div style={{fontSize:14, fontWeight:800, marginTop:2}}>Rs 8,000</div><div style={{fontSize:8, color:"#bbb", marginTop:4}}>60 Long + 60 Shorts - 8 min - No watermark - 1080p & 4K - 20+ premium voices - Commercial + YouTube music</div>
            </div>
            <div style={{background:"#0f0a1f", border:"1px solid #2a1e4e", borderRadius:14, padding:10}}>
              <div style={{fontWeight:700, fontSize:12}}>Premium</div><div style={{fontSize:14, fontWeight:800, marginTop:2}}>Rs 15,000</div><div style={{fontSize:8, color:"#bbb", marginTop:4}}>120 Long + 120 Shorts - 8 min - 4K Cinematic - Clone voice - Team + API - Priority 24/7</div>
            </div>
          </div>
        </div>
      )}

      <div style={{textAlign:"center", padding:"10px 20px 0"}}>
        <h2 style={{margin:0, fontSize:16, fontWeight:600}}>Let's get started, public</h2>
        <div style={{display:"flex", gap:8, justifyContent:"center", marginTop:12}}>
          {["Video","Voiceover","Design"].map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} style={{background: activeTab===t ? "#ff006e" : "#1e1438", color:"#fff", border:"none", padding:"6px 14px", borderRadius:20, fontSize:12, cursor:"pointer", fontWeight: activeTab===t ? 700 : 400}}>{activeTab===t && "● "}{t}</button>
          ))}
        </div>
      </div>

      <div style={{margin:"16px", background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:16, padding:14}}>
        <textarea value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Enter your video idea, script, or blog link..." style={{width:"100%", height:70, background:"transparent", border:"none", color:"#fff", outline:"none", resize:"none", fontSize:14}}></textarea>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
          <button style={{background:"#1e1438", border:"none", color:"#888", width:28, height:28, borderRadius:"50%"}}>👤✦</button>
          <button onClick={handleCreate} disabled={creating} style={{background:"#ff2e7e", color:"#fff", border:"none", padding:"10px 18px", borderRadius:24, fontWeight:700, fontSize:13, cursor:"pointer", opacity: creating ? 0.6 : 1}}>{creating ? "⏳ Creating..." : "◆ Create →"}</button>
        </div>
      </div>

      <div style={{margin:"0 16px"}}>
        <div style={{fontSize:11, color:"#888", letterSpacing:1, marginBottom:8}}>SELECT VOICE (3 LOCKED)</div>
        <div style={{position:"relative"}}>
          <div onClick={()=>setShowVoice(!showVoice)} style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:12, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontSize:13}}>
            <span>{voice}</span><span>⌄</span>
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

      <div style={{margin:"20px 16px 0"}}>
        <div style={{fontSize:11, color:"#888", letterSpacing:1, marginBottom:12}}>VIDEO WORKFLOWS</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          {WORKFLOWS.map(w=>(
            <div key={w.id} onClick={()=>handleWorkflow(w)} style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:16, overflow:"hidden", cursor:"pointer", position:"relative"}}>
              <div style={{height:140, background:`url(${w.img}) center/cover`, opacity:0.6}}></div>
              <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 30%, #1a1232 90%)"}}></div>
              <div style={{position:"absolute", bottom:0, left:0, right:0, padding:12}}>
                <div style={{fontSize:13, fontWeight:700}}>{w.title}</div>
                <div style={{fontSize:11, color:"#aaa", marginTop:6, display:"flex", justifyContent:"space-between"}}><span>Try it now →</span><span style={{fontSize:10, background:"#00ff8815", color:"#00ff88", padding:"2px 6px", borderRadius:10}}>LIVE</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          <div key={n.label} onClick={()=> n.label==="Home" ? router.push('/') : alert(`${n.label} - Coming Soon!`)} style={{textAlign:"center", cursor:"pointer", opacity: n.active ? 1 : 0.5}}>
            <div style={{fontSize:18}}>{n.icon}</div><div style={{fontSize:9, marginTop:2}}>{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
