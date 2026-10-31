"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScriptToVideo(){
  const router = useRouter();
  const [mode, setMode] = useState("Simple");
  const [script, setScript] = useState(`[Scene 1]\n[Visual: A young Latina woman smiling while typing on a laptop in a bright coffee shop]\nStarting a business can feel completely overwhelming.`);
  const [open, setOpen] = useState<string | null>("format");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if(!script.trim()){ alert("Jan script likho pehle!"); return; }
    setGenerating(true);
    setTimeout(()=>{
      setGenerating(false);
      alert(`🎬 VIDEO GENERATING - Canvas FREE Engine!\n\nScript: ${script.slice(0,80)}...\nFormat: 16:9 Auto Template\nVoice: Urdu - Asad\n\nPattern: Script → Photo → Clips (5 Raaz) → Final Video\nNo Watermark!`);
    },1000);
  };

  return (
    <div style={{background:"#0f0a1f", color:"#fff", minHeight:"100vh", fontFamily:"system-ui", paddingBottom:20}}>
      <header style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #1a1a2e"}}>
        <button onClick={()=>router.push('/dashboard')} style={{background:"#1a1a2e", color:"#fff", border:"none", padding:"6px 12px", borderRadius:20, cursor:"pointer", fontSize:12}}>← Back</button>
        <div style={{textAlign:"center"}}><div style={{fontSize:13, fontWeight:700}}>📄 Script to video</div><div style={{display:"flex", gap:6, justifyContent:"center", marginTop:6}}>{["Simple","Detailed"].map(m=><button key={m} onClick={()=>setMode(m)} style={{background: mode===m ? "#fff" : "#1a1a2e", color: mode===m ? "#000" : "#888", border:"none", padding:"3px 10px", borderRadius:20, fontSize:10, cursor:"pointer", fontWeight:600}}>{m}</button>)}</div></div>
        <button onClick={()=>router.push('/dashboard')} style={{background:"transparent", color:"#888", border:"none", fontSize:16, cursor:"pointer"}}>✕</button>
      </header>

      <div style={{maxWidth:700, margin:"0 auto", padding:"14px"}}>
        {/* Script Box */}
        <div style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:14, padding:12}}>
          <div style={{fontSize:11, fontWeight:700, marginBottom:8}}>Script</div>
          <textarea value={script} onChange={e=>setScript(e.target.value)} placeholder="Write or paste your script here, or use tags to guide the AI..." style={{width:"100%", height: mode==="Simple" ? 120 : 180, background:"#0f0a1f", border:"1px solid #2a1e4e", color:"#fff", borderRadius:10, padding:10, fontSize:11, outline:"none", resize:"none"}}></textarea>
          
          {mode==="Simple" && (
            <div style={{display:"flex", flexWrap:"wrap", gap:6, marginTop:10, fontSize:10, color:"#888"}}>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>16:9</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>▭ Auto template</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>🖼 Auto visuals</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>🎬 Cinematic</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>💬 Auto subtitles</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>▭ Scene per sentence</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>📁 My media</span>
              <span style={{background:"#0f0a1f", border:"1px solid #2a1e4e", padding:"4px 8px", borderRadius:20}}>⚙ Advanced</span>
            </div>
          )}

          {mode==="Simple" && (
            <div style={{display:"flex", justifyContent:"space-between", marginTop:10, fontSize:10, color:"#666"}}>
              <div style={{display:"flex", gap:8}}><span>🎙 Voice: English UK</span><span>🧑 Add avatar</span><span>🎨 Brand kit</span></div>
              <button style={{background:"#ff006e", color:"#fff", border:"none", width:22, height:22, borderRadius:"50%", cursor:"pointer", fontSize:12}} onClick={handleGenerate}>↑</button>
            </div>
          )}
        </div>

        {/* Detailed Mode Sections - Fliki jaisa */}
        {mode==="Detailed" && (
          <>
            <div style={{marginTop:10, background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:12, padding:10, display:"flex", justifyContent:"space-between"}}>
              <span style={{fontSize:11}}>✏️ Edit with AI</span>
              <div style={{fontSize:10, color:"#888"}}>Create scenes: Sentences ▼</div>
            </div>

            {[
              {id:"format", title:"Format & template", sub:"Landscape 16:9 - Auto template"},
              {id:"media", title:"Scene media", sub:"Auto visuals"},
              {id:"narrator", title:"Narrator & subtitles", sub:"Auto voice - English UK - Auto style subtitles"},
              {id:"characters", title:"Characters", sub:"None yet"},
              {id:"extras", title:"Extras & advanced", sub:"3 of 5 enabled"},
            ].map(s=>(
              <div key={s.id} onClick={()=>setOpen(open===s.id ? null : s.id)} style={{marginTop:8, background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:12, padding:12, cursor:"pointer"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div><div style={{fontSize:11, fontWeight:700}}>{s.title}</div><div style={{fontSize:9, color:"#666", marginTop:2}}>{s.sub}</div></div>
                  <div style={{fontSize:12}}>{open===s.id ? "∧" : "∨"}</div>
                </div>
                {open===s.id && (
                  <div style={{marginTop:10, fontSize:10, color:"#888", background:"#0f0a1f", padding:10, borderRadius:8}}>
                    {s.id==="format" && "✅ 16:9 Landscape\n✅ Auto template - Canvas FREE\n✅ Cinematic 8K\n✅ No watermark"}
                    {s.id==="media" && "✅ Auto visuals - Pexels FREE\n✅ My media upload\n✅ 5 Raaz pattern - Script → Photo → Clips"}
                    {s.id==="narrator" && "✅ Urdu - Asad (Documentary/Islami/Vlog)\n✅ Auto subtitles - Urdu/Hindi/English\n✅ Edge TTS FREE"}
                    {s.id==="characters" && "Avatar: Coming soon - Canvas FREE\nCharacters: Add your own"}
                    {s.id==="extras" && "✅ Background music - YouTube licensed\n✅ Brand kit - Logo watermark off\n✅ Commercial rights"}
                  </div>
                )}
              </div>
            ))}

            <button onClick={handleGenerate} disabled={generating} style={{width:"100%", background:"#ff2e7e", color:"#fff", border:"none", padding:"14px", borderRadius:24, marginTop:14, fontWeight:800, fontSize:13, cursor:"pointer"}}>
              {generating ? "⏳ Generating with Canvas FREE..." : "Generate video"}
            </button>
            <div style={{textAlign:"center", fontSize:9, color:"#666", marginTop:8}}>
              <span style={{textDecoration:"underline", cursor:"pointer"}}>Review visual script</span><br/>Under 5 minutes - You can edit every scene afterwards
            </div>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0f0a1f", borderTop:"1px solid #1a1a2e", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
        {["Home","Files","Characters","Series","Playground","Templates","Resources"].map(l=>(
          <div key={l} onClick={()=>router.push('/dashboard')} style={{textAlign:"center", cursor:"pointer", opacity: l==="Home" ? 1 : 0.4, fontSize:9}}><div>●</div>{l}</div>
        ))}
      </div>
    </div>
  );
}
