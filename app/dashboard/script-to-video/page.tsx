"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScriptToVideo(){
  const router = useRouter();
  const [mode, setMode] = useState("Simple");
  const [script, setScript] = useState(`[Scene 1]\n[Visual: A young Latina woman smiling while typing on a laptop in a bright coffee shop]\nStarting a business can feel completely overwhelming.`);
  const [open, setOpen] = useState<string | null>("format");
  const [generating, setGenerating] = useState(false);
  
  // ✅ NEW - Ratio + Auto Long to Short
  const [ratio, setRatio] = useState("16:9");
  const [autoShort, setAutoShort] = useState(true);
  const [shortCount, setShortCount] = useState(3);
  const [shortMode, setShortMode] = useState("Auto");
  const [selectedScenes, setSelectedScenes] = useState<number[]>([0,2,5]);

  const SCENES = [
    {id:0, time:"0:00-1:00", text:"Starting a business can feel overwhelming...", score:95},
    {id:1, time:"1:00-2:10", text:"First money habit - Pay yourself first", score:88},
    {id:2, time:"2:10-3:20", text:"Second habit - Track every rupee", score:92},
    {id:3, time:"3:20-4:30", text:"Third habit - Emergency fund 6 months", score:75},
    {id:4, time:"4:30-5:40", text:"Fourth habit - Invest 20% income", score:90},
    {id:5, time:"5:40-6:50", text:"Fifth habit - Avoid lifestyle inflation", score:96},
    {id:6, time:"6:50-7:30", text:"Recap - 5 habits summary", score:70},
    {id:7, time:"7:30-8:00", text:"CTA - Subscribe for more", score:85},
  ];

  const handleGenerate = () => {
    if(!script.trim()){ alert("Jan script likho pehle!"); return; }
    setGenerating(true);
    setTimeout(()=>{
      setGenerating(false);
      if(autoShort){
        const parts = shortMode==="Auto" ? `Top ${shortCount} viral (Score 95+)` : selectedScenes.map(id=>SCENES[id].time).join(', ');
        alert(`🎬 GENERATING - Canvas FREE!\n\nLong: 8 min - Ratio: ${ratio}\nScript: ${script.slice(0,60)}...\n\n✂️ Auto Shorts: ${shortMode} - ${parts}\nFormat: Long ${ratio} + Shorts 9:16\nVoice: Urdu - Asad\n\nPattern: Script → Photo → Clips → Long + Shorts\nNo Watermark!`);
      } else {
        alert(`🎬 VIDEO GENERATING - Canvas FREE!\n\nScript: ${script.slice(0,60)}...\nFormat: ${ratio} Auto Template\nNo Shorts\nNo Watermark!`);
      }
    },800);
  };

  return (
    <div style={{background:"#0f0a1f", color:"#fff", minHeight:"100vh", fontFamily:"system-ui", paddingBottom:90}}>
      <header style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #1a1a2e"}}>
        <button onClick={()=>router.push('/dashboard')} style={{background:"#1a1a2e", color:"#fff", border:"none", padding:"6px 12px", borderRadius:20, cursor:"pointer", fontSize:12}}>← Back</button>
        <div style={{textAlign:"center"}}><div style={{fontSize:13, fontWeight:700}}>📄 Script to video</div><div style={{display:"flex", gap:6, justifyContent:"center", marginTop:6}}>{["Simple","Detailed"].map(m=><button key={m} onClick={()=>setMode(m)} style={{background: mode===m ? "#fff" : "#1a1a2e", color: mode===m ? "#000" : "#888", border:"none", padding:"3px 10px", borderRadius:20, fontSize:10, cursor:"pointer", fontWeight:600}}>{m}</button>)}</div></div>
        <button onClick={()=>router.push('/dashboard')} style={{background:"transparent", color:"#888", border:"none", fontSize:16, cursor:"pointer"}}>✕</button>
      </header>

      <div style={{maxWidth:700, margin:"0 auto", padding:"14px"}}>
        {/* Ratio Selector - 16:9 + 9:16 */}
        <div style={{display:"flex", gap:8, marginBottom:12, justifyContent:"center"}}>
          {[
            {id:"16:9", label:"16:9 Landscape", desc:"YouTube"},
            {id:"9:16", label:"9:16 Portrait", desc:"Shorts/Reels"},
            {id:"1:1", label:"1:1 Square", desc:"Instagram"},
          ].map(r=>(
            <button key={r.id} onClick={()=>setRatio(r.id)} style={{flex:1, background: ratio===r.id ? "#ff006e" : "#1a1232", color:"#fff", border:`1px solid ${ratio===r.id ? "#ff006e" : "#2a1e4e"}`, borderRadius:12, padding:"8px 6px", cursor:"pointer"}}>
              <div style={{fontSize:11, fontWeight:700}}>{r.label}</div><div style={{fontSize:8, color: ratio===r.id ? "#fff" : "#888"}}>{r.desc}</div>
            </button>
          ))}
        </div>

        <div style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:14, padding:12}}>
          <div style={{fontSize:11, fontWeight:700, marginBottom:8}}>Script - {ratio}</div>
          <textarea value={script} onChange={e=>setScript(e.target.value)} placeholder="Write or paste your script here, or use tags to guide the AI..." style={{width:"100%", height: mode==="Simple" ? 120 : 160, background:"#0f0a1f", border:"1px solid #2a1e4e", color:"#fff", borderRadius:10, padding:10, fontSize:11, outline:"none", resize:"none"}}></textarea>
          
          {mode==="Simple" && (
            <div style={{display:"flex", flexWrap:"wrap", gap:6, marginTop:10, fontSize:10, color:"#888"}}>
              <span style={{background: ratio==="16:9" ? "#ff006e22" : "#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>📺 {ratio}</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>▭ Auto template</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>🖼 Auto visuals</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>🎬 Cinematic</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>💬 Auto subtitles</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>✂️ Auto Shorts</span>
            </div>
          )}

          {mode==="Simple" && (
            <div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10, color:"#666"}}>
              <div style={{display:"flex", gap:8}}><span>🎙 Voice: English UK</span><span>🧑 Add avatar</span></div>
              <button style={{background:"#ff006e", color:"#fff", border:"none", width:22, height:22, borderRadius:"50%", cursor:"pointer", fontSize:12}} onClick={handleGenerate}>↑</button>
            </div>
          )}
        </div>

        {mode==="Detailed" && (
          <>
            <div style={{marginTop:10, background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:12, padding:10, display:"flex", justifyContent:"space-between"}}>
              <span style={{fontSize:11}}>✏️ Edit with AI</span>
              <div style={{fontSize:10, color:"#888"}}>Ratio: {ratio} - Sentences ▼</div>
            </div>

            {[
              {id:"format", title:"Format & template", sub:`${ratio} - Auto template`},
              {id:"media", title:"Scene media", sub:"Auto visuals - Pexels FREE"},
              {id:"narrator", title:"Narrator & subtitles", sub:"Auto voice - Urdu Asad"},
              {id:"characters", title:"Characters", sub:"None yet"},
              {id:"extras", title:"Extras & advanced", sub:"3 of 5 enabled"},
            ].map(s=>(
              <div key={s.id} onClick={()=>setOpen(open===s.id ? null : s.id)} style={{marginTop:8, background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:12, padding:12, cursor:"pointer"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div><div style={{fontSize:11, fontWeight:700}}>{s.title}</div><div style={{fontSize:9, color:"#666", marginTop:2}}>{s.sub}</div></div>
                  <div style={{fontSize:12}}>{open===s.id ? "∧" : "∨"}</div>
                </div>
                {open===s.id && (
                  <div style={{marginTop:10, fontSize:10, color:"#888", background:"#0f0a1f", padding:10, borderRadius:8, whiteSpace:"pre-line"}}>
                    {s.id==="format" && `✅ Current: ${ratio}\n✅ 16:9 = YouTube Long\n✅ 9:16 = TikTok/Reels Short\n✅ 1:1 = Instagram\n✅ Auto template - Canvas FREE\n✅ No watermark`}
                    {s.id==="media" && "✅ Auto visuals - Pexels FREE\n✅ My media upload\n✅ 5 Raaz pattern"}
                    {s.id==="narrator" && "✅ Urdu - Asad\n✅ Auto subtitles"}
                    {s.id==="characters" && "Avatar: Coming soon"}
                    {s.id==="extras" && "✅ Background music\n✅ Brand kit off"}
                  </div>
                )}
              </div>
            ))}

            {/* ✅ Auto Long to Short - 1 Click + Custom */}
            <div style={{marginTop:12, background:"linear-gradient(135deg, #1a1232, #2a1448)", border:"1px solid #ff006e55", borderRadius:14, padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12, fontWeight:800}}>✂️ Auto Long → Short (1 Click)</div>
                  <div style={{fontSize:9, color:"#aaa", marginTop:2}}>8 min Long ({ratio}) se 3-5 Viral Shorts (9:16) auto</div>
                </div>
                <label style={{position:"relative", display:"inline-block", width:36, height:20}}>
                  <input type="checkbox" checked={autoShort} onChange={e=>setAutoShort(e.target.checked)} style={{opacity:0, width:0, height:0}}/>
                  <span style={{position:"absolute", cursor:"pointer", top:0, left:0, right:0, bottom:0, background: autoShort ? "#ff006e" : "#333", borderRadius:20, transition:"0.3s"}}></span>
                </label>
              </div>

              {autoShort && (
                <div style={{marginTop:12}}>
                  <div style={{display:"flex", gap:8, marginBottom:12}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10, color:"#888", marginBottom:4}}>Shorts Count</div>
                      <select value={shortCount} onChange={e=>setShortCount(Number(e.target.value))} style={{width:"100%", background:"#0f0a1f", color:"#fff", border:"1px solid #2a1e4e", borderRadius:8, padding:"6px", fontSize:11}}>
                        <option value={1}>1 Short</option><option value={3}>3 Shorts</option><option value={5}>5 Shorts</option>
                      </select>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10, color:"#888", marginBottom:4}}>Duration</div>
                      <select style={{width:"100%", background:"#0f0a1f", color:"#fff", border:"1px solid #2a1e4e", borderRadius:8, padding:"6px", fontSize:11}}>
                        <option>30 sec</option><option>45 sec</option><option>60 sec</option>
                      </select>
                    </div>
                  </div>

                  <div style={{display:"flex", gap:6, marginBottom:10, background:"#0f0a1f", borderRadius:10, padding:4}}>
                    {["Auto","Custom"].map(m=>(
                      <button key={m} onClick={()=>setShortMode(m)} style={{flex:1, background: shortMode===m ? "#ff006e" : "transparent", color:"#fff", border:"none", padding:"6px", borderRadius:8, fontSize:11, fontWeight:600, cursor:"pointer"}}>
                        {m==="Auto" ? "🤖 AI Auto Pick" : "✋ Custom Select"}
                      </button>
                    ))}
                  </div>

                  {shortMode==="Auto" ? (
                    <div style={{fontSize:10, color:"#aaa", background:"#0f0a1f", padding:10, borderRadius:10}}>
                      ✅ AI sab se viral parts auto detect karega<br/>
                      - Hook Score 90+ wale scenes<br/>
                      - Top {shortCount} moments → 9:16 Shorts<br/>
                      - Example: Scene 0, 2, 5 (Score 95,92,96)
                    </div>
                  ) : (
                    <div style={{maxHeight:160, overflowY:"auto"}}>
                      <div style={{fontSize:10, color:"#888", marginBottom:6}}>👉 Tick karo konse parts se Short banana hai:</div>
                      {SCENES.map(s=>(
                        <div key={s.id} onClick={()=> setSelectedScenes(prev=> prev.includes(s.id) ? prev.filter(id=>id!==s.id) : [...prev,s.id])} style={{display:"flex", gap:8, alignItems:"center", background: selectedScenes.includes(s.id) ? "#ff006e22" : "#0f0a1f", border:`1px solid ${selectedScenes.includes(s.id) ? "#ff006e" : "#2a1e4e"}`, borderRadius:8, padding:"8px 10px", marginBottom:6, cursor:"pointer"}}>
                          <input type="checkbox" checked={selectedScenes.includes(s.id)} readOnly style={{accentColor:"#ff006e"}}/>
                          <div style={{flex:1}}>
                            <div style={{fontSize:10, fontWeight:700}}>{s.time} - Score {s.score} {s.score>90 && "🔥"}</div>
                            <div style={{fontSize:9, color:"#888", marginTop:2}}>{s.text.slice(0,45)}...</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{marginTop:10, fontSize:9, color:"#00ff88", background:"#00ff8810", border:"1px solid #00ff8830", padding:"6px 10px", borderRadius:20, textAlign:"center"}}>
                    Canvas FREE: {shortMode==="Auto" ? `${shortCount} Shorts Auto (9:16)` : `${selectedScenes.length} Custom Shorts`} • No Watermark
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleGenerate} disabled={generating} style={{width:"100%", background:"#ff2e7e", color:"#fff", border:"none", padding:"14px", borderRadius:24, marginTop:14, fontWeight:800, fontSize:13, cursor:"pointer"}}>
              {generating ? "⏳ Generating with Canvas FREE..." : `Generate ${ratio} + ${autoShort ? `${shortMode==="Auto" ? shortCount : selectedScenes.length} Shorts` : ""}`}
            </button>
            <div style={{textAlign:"center", fontSize:9, color:"#666", marginTop:8}}>
              <span style={{textDecoration:"underline", cursor:"pointer"}}>Review visual script</span><br/>Long {ratio} + Shorts 9:16 - You can edit every scene afterwards
            </div>
          </>
        )}
      </div>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0f0a1f", borderTop:"1px solid #1a1a2e", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
        {["Home","Files","Characters","Series","Playground","Templates","Resources"].map(l=>(
          <div key={l} onClick={()=>router.push('/dashboard')} style={{textAlign:"center", cursor:"pointer", opacity: l==="Home" ? 1 : 0.4, fontSize:9}}><div>●</div>{l}</div>
        ))}
      </div>
    </div>
  );
}
