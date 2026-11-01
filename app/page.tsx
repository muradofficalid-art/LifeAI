"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se explain video", color: "#ff006e", side: false },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals", color: "#8338ec", side: false },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - 100 TEST", color: "#00ff88", side: false },
  { id: "voice", icon: "🎙️", title: "AI Voiceover", desc: "SIDE PE", color: "#ffbe0b", side: true },
  { id: "avatar", icon: "🧑‍🎤", title: "AI Avatar", desc: "Avatar se video", color: "#3a86ff", side: true },
  { id: "translator", icon: "🌐", title: "Translator", desc: "Urdu/Hindi/English", color: "#fb5607", side: true },
];

export default function LandingPage() {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [freeUsed, setFreeUsed] = useState(0);
  const [ratio, setRatio] = useState<"16:9"|"9:16">("16:9");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{ setFreeUsed(parseInt(localStorage.getItem("lifeai_free_used") || "0")); },[]);

  const generateOnLanding = async () => {
    if(!idea.trim()){ alert("Idea likho jan!"); return; }
    if(freeUsed >= 100){ alert("100 TEST khatam!"); return; }
    setGenerating(true); setProgress(5); setVideoUrl(null);
    try {
      const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
      canvas.width = ratio==="16:9"?1280:720; canvas.height = ratio==="16:9"?720:1280;

      // --- NEW: Cloudflare FLUX API CALL ---
      setProgress(10);
      const res = await fetch('/api/generate', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ script: idea }) 
      });
      const data = await res.json(); 
      if(!data.success) throw new Error(data.error || "Image generation fail");
      if(!data.images || data.images.length===0) throw new Error("No images returned");

      setProgress(40);
      // Load base64 images
      const loadedImgs: HTMLImageElement[] = [];
      for(let base64 of data.images){
        const img = new Image();
        img.src = base64;
        await new Promise<void>(r=>{ img.onload=()=>r(); img.onerror=()=>r(); });
        loadedImgs.push(img);
      }

      setProgress(60);
      // --- Image -> Video with Zoom Effect ---
      const stream = canvas.captureStream(30); 
      const recorder = new MediaRecorder(stream,{mimeType:'video/webm'}); 
      const chunks:Blob[]=[];
      recorder.ondataavailable=e=>chunks.push(e.data);
      const recPromise = new Promise<string>(res=>{ 
        recorder.onstop=()=>res(URL.createObjectURL(new Blob(chunks,{type:'video/webm'}))); 
      });
      recorder.start(); 
      let frame=0; 
      const secsPerImg = 4; // 4 sec per image
      const total = loadedImgs.length * secsPerImg * 30;

      const draw=()=>{
        if(frame>=total){ recorder.stop(); return; }
        const idx = Math.min(Math.floor(frame/(secsPerImg*30)), loadedImgs.length-1);
        const pIn = (frame%(secsPerImg*30))/(secsPerImg*30);
        
        try{
          const img = loadedImgs[idx];
          // ZoomIn effect 1.0 -> 1.2
          const scale = 1 + pIn * 0.25;
          ctx.save(); 
          ctx.translate(canvas.width/2,canvas.height/2); 
          ctx.scale(scale,scale); 
          ctx.translate(-canvas.width/2,-canvas.height/2);
          // Cover fit
          const imgRatio = img.width/img.height;
          const canvasRatio = canvas.width/canvas.height;
          let dw, dh, dx, dy;
          if(imgRatio > canvasRatio){ dh=canvas.height; dw=dh*imgRatio; dx=(canvas.width-dw)/2; dy=0; }
          else { dw=canvas.width; dh=dw/imgRatio; dx=0; dy=(canvas.height-dh)/2; }
          ctx.drawImage(img,dx,dy,dw,dh); 
          ctx.restore();

          ctx.fillStyle="rgba(0,0,0,0.35)"; ctx.fillRect(0,0,canvas.width,canvas.height);
          ctx.fillStyle="rgba(0,0,0,0.7)"; ctx.fillRect(20,canvas.height-130,canvas.width-40,80);
          ctx.fillStyle="#fff"; ctx.font=`bold ${ratio==="16:9"?18:15}px system-ui`; ctx.textAlign="center";
          ctx.fillText(idea.slice(0,55),canvas.width/2,canvas.height-85);
          ctx.fillStyle="#00ff88"; ctx.font="10px system-ui"; ctx.fillText(`AI Generated • Scene ${idx+1}/${loadedImgs.length} • ${freeUsed+1}/100`,canvas.width/2,canvas.height-60);
        }catch{}
        frame++; 
        if(frame%30===0) setProgress(60 + Math.floor((frame/total)*35));
        requestAnimationFrame(draw);
      }; draw();
      const url=await recPromise; 
      setProgress(100); setVideoUrl(url);
      const n=freeUsed+1; setFreeUsed(n); localStorage.setItem("lifeai_free_used",n.toString());
    }catch(e:any){ alert(e.message); console.error(e); } 
    setGenerating(false);
  };

  return (
    <div style={{background:"#050510", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      <canvas ref={canvasRef} style={{display:"none"}}></canvas>
      <header style={{padding:"14px 20px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1a1a2e", position:"sticky", top:0, background:"rgba(5,5,16,0.95)", zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}><div style={{width:10,height:10,background:"#ff006e",borderRadius:"50%"}}></div><b>Life-AI</b><span onClick={()=>{localStorage.removeItem("lifeai_free_used"); setFreeUsed(0);}} style={{fontSize:10, color:"#00ff88", background:"#00ff8822", padding:"2px 8px", borderRadius:10, marginLeft:6, cursor:"pointer"}}>{freeUsed}/100 TEST - Reset</span></div>
        <div style={{display:"flex", gap:8}}><button onClick={()=>router.push('/pricing')} style={{background:"transparent", color:"#aaa", border:"none", fontSize:13}}>Pricing</button><button style={{background:"#ff006e", color:"#fff", border:"none", padding:"7px 12px", borderRadius:20, fontSize:12}}>Get started →</button></div>
      </header>

      <div style={{textAlign:"center", padding:"50px 20px 20px"}}>
        <div style={{fontSize:11, color:"#00ff88", background:"#00ff8822", border:"1px solid #00ff8844", display:"inline-block", padding:"5px 12px", borderRadius:20}}>• Fliki Pro • FLUX AI • Copyright Safe</div>
        <h1 style={{fontSize:38, fontWeight:900, margin:"16px 0"}}>Turn idea into videos<br/><span style={{background:"linear-gradient(90deg,#ff006e,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>with AI images</span></h1>
        <div style={{background:"#111122", border:"1px solid #222", borderRadius:18, padding:14, maxWidth:680, margin:"20px auto"}}>
          <div style={{display:"flex", gap:8}}><input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Lahore Railway Station per aik admi betha chai pee raha tha..." style={{flex:1, background:"#0a0a18", border:"1px solid #222", color:"#fff", padding:"12px", borderRadius:12}}/><button onClick={generateOnLanding} disabled={generating} style={{background: generating?"#555":"#ff006e", color:"#fff", border:"none", padding:"12px 18px", borderRadius:12, fontWeight:700}}>{generating?`${progress}%`:"Generate →"}</button></div>
          <div style={{display:"flex", gap:8, justifyContent:"center", marginTop:10}}><button onClick={()=>setRatio("16:9")} style={{background:ratio==="16:9"?"#ff006e":"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"6px 12px", borderRadius:20, fontSize:12}}>📺 16:9</button><button onClick={()=>setRatio("9:16")} style={{background:ratio==="9:16"?"#ff006e":"#1a1a2e", color:"#fff", border:"1px solid #333", padding:"6px 12px", borderRadius:20, fontSize:12}}>📱 9:16</button></div>
        </div>
        {(generating||videoUrl) && <div style={{maxWidth:700, margin:"20px auto", background:"#111122", border:"1px solid #2a2a4e", borderRadius:16, padding:14}}>{generating && <div style={{height:6, background:"#1a1a2e", borderRadius:10}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#ff006e,#a78bfa)"}}></div></div>}{videoUrl && <><video src={videoUrl} controls autoPlay style={{width:"100%", borderRadius:12}}></video><div style={{display:"flex", gap:10, marginTop:10}}><a href={videoUrl} download={`life-ai.webm`} style={{flex:1, background:"#00ff88", color:"#000", padding:"10px", borderRadius:10, textAlign:"center", fontWeight:800, textDecoration:"none", fontSize:13}}>⬇️ Download</a></div></>}</div>}
      </div>

      <div style={{padding:"40px 20px", background:"#080810", borderTop:"1px solid #1a1a2e"}}>
        <div style={{maxWidth:1100, margin:"0 auto"}}>
          <h2 style={{textAlign:"center", fontSize:24, fontWeight:800}}>All AI Tools in One Platform</h2>
          <p style={{textAlign:"center", color:"#888", fontSize:13}}>{freeUsed}/100 TEST - Click card to generate</p>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginTop:20}}>
            {FEATURES.map(f=><div key={f.id} onClick={generateOnLanding} style={{background:"#111122", border:`1px solid ${f.color}44`, borderRadius:16, padding:16, cursor:"pointer"}}><div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontSize:24}}>{f.icon}</span><span style={{fontSize:10, background:`${f.color}22`, color:f.color, padding:"3px 8px", borderRadius:20}}>{f.side?"SIDE PE":"FREE →"}</span></div><h4 style={{margin:"10px 0 4px", fontSize:14}}>{f.title}</h4><p style={{margin:0, fontSize:11, color:"#888"}}>{f.desc} • {ratio}</p></div>)}
          </div>
        </div>
      </div>

      <footer style={{padding:"20px", textAlign:"center", fontSize:11, color:"#666", borderTop:"1px solid #1a1a2e"}}>Life-AI • 100 TEST • FLUX AI Live • {freeUsed}/100</footer>
    </div>
  );
}
