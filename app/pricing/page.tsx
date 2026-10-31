"use client";
import { useRouter } from "next/navigation";

export default function PricingPage(){
  const router = useRouter();
  return (
    <div style={{background:"#0f0a1f", color:"#fff", minHeight:"100vh", fontFamily:"system-ui"}}>
      {/* Header */}
      <header style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #1a1a2e"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, cursor:"pointer"}} onClick={()=>router.push('/')}>
          <div style={{width:10, height:10, background:"#ff006e", borderRadius:"50%"}}></div>
          <b style={{fontSize:14}}>Life-AI</b>
        </div>
        <button onClick={()=>router.push('/dashboard')} style={{background:"#ff006e", color:"#fff", border:"none", padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer"}}>Get started →</button>
      </header>

      <div style={{maxWidth:1000, margin:"0 auto", padding:"20px 16px 80px", textAlign:"center"}}>
        <div style={{fontSize:10, color:"#888", background:"#1a1a2e", display:"inline-block", padding:"4px 10px", borderRadius:20, marginBottom:12}}>• Pricing in PKR •</div>
        <h1 style={{margin:"0 0 8px", fontSize:22, fontWeight:800}}>Simple pricing for Pakistani creators</h1>
        <p style={{margin:"0 0 24px", fontSize:11, color:"#888"}}>Free me 3 videos watermark ke sath. Paid plans me no watermark, full commercial rights.</p>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, textAlign:"left"}}>
          
          {/* Free */}
          <div style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:16, padding:18}}>
            <div style={{fontSize:11, fontWeight:700}}>Free</div>
            <div style={{fontSize:10, color:"#666", marginTop:2}}>Start & explore</div>
            <div style={{fontSize:20, fontWeight:800, marginTop:12}}>Rs 0</div>
            <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:8, fontSize:11, color:"#aaa"}}>
              <div>✓ 3 videos / month only</div>
              <div>✕ With watermark</div>
              <div>✓ 720p export</div>
              <div>✓ Standard voices</div>
              <div>✓ Max 1 min duration</div>
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{width:"100%", background:"#1e1438", color:"#fff", border:"1px solid #2a1e4e", padding:"12px", borderRadius:12, marginTop:20, fontSize:12, fontWeight:600, cursor:"pointer"}}>Start for free</button>
          </div>

          {/* Standard - BEST VALUE */}
          <div style={{background:"linear-gradient(180deg, #2a1448, #1a1232)", border:"1px solid #ff006e", borderRadius:16, padding:18, position:"relative"}}>
            <div style={{position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"#ff006e", color:"#fff", fontSize:8, fontWeight:800, padding:"3px 10px", borderRadius:20, letterSpacing:1}}>BEST VALUE</div>
            <div style={{fontSize:11, fontWeight:700}}>Standard</div>
            <div style={{fontSize:10, color:"#aaa", marginTop:2}}>Most popular for creators</div>
            <div style={{fontSize:20, fontWeight:800, marginTop:12}}>Rs 8,000 <span style={{fontSize:10, fontWeight:400, color:"#888"}}>/ month</span></div>
            <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:7, fontSize:11, color:"#ddd"}}>
              <div>✓ 60 Long videos / month</div>
              <div>✓ 60 Shorts / month</div>
              <div>✓ Long - max 8 min</div>
              <div>✓ No watermark</div>
              <div>✓ 1080p & 4K export</div>
              <div>✓ 200+ premium AI voices</div>
              <div>✓ Commercial rights included</div>
              <div>✓ YouTube licensed music</div>
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{width:"100%", background:"#ff006e", color:"#fff", border:"none", padding:"12px", borderRadius:20, marginTop:20, fontSize:12, fontWeight:700, cursor:"pointer"}}>Get Standard →</button>
          </div>

          {/* Premium */}
          <div style={{background:"#1a1232", border:"1px solid #2a1e4e", borderRadius:16, padding:18}}>
            <div style={{fontSize:11, fontWeight:700}}>Premium</div>
            <div style={{fontSize:10, color:"#666", marginTop:2}}>For pros & agencies</div>
            <div style={{fontSize:20, fontWeight:800, marginTop:12}}>Rs 15,000 <span style={{fontSize:10, fontWeight:400, color:"#888"}}>/ month</span></div>
            <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:7, fontSize:11, color:"#aaa"}}>
              <div>✓ 120 Long videos / month</div>
              <div>✓ 120 Shorts / month</div>
              <div>✓ Long - max 8 min</div>
              <div>✓ No watermark</div>
              <div>✓ 8K Cinematic export</div>
              <div>✓ Clone your own voice</div>
              <div>✓ Team access + API</div>
              <div>✓ Priority support 24/7</div>
              <div>✓ Commercial rights</div>
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{width:"100%", background:"#1e1438", color:"#fff", border:"1px solid #2a1e4e", padding:"12px", borderRadius:12, marginTop:20, fontSize:12, fontWeight:600, cursor:"pointer"}}>Go Premium</button>
          </div>
        </div>

        <div style={{marginTop:20, background:"#1a1232", border:"1px solid #1a1a2e", borderRadius:20, padding:"10px 14px", fontSize:10, color:"#666", display:"inline-block"}}>
          💡 Long video = max 8 minutes • Short = under 60 seconds • All paid plans - No watermark • Commercial use
        </div>

        <div style={{marginTop:16, fontSize:10, color:"#555"}}>© 2026 Life-AI • Made for Pakistan • Cancel anytime</div>
      </div>
    </div>
  );
}
