'use client'

export default function Dashboard() {
  return (
    <div style={{background:'#0A0A0A', minHeight:'100vh', color:'white', fontFamily:'Inter, system-ui', paddingBottom:'80px'}}>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px'}}>
        <div style={{width:'24px', height:'24px', background:'#FF2E7E', borderRadius:'50%'}}></div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <div style={{background:'#FF2E7E', padding:'6px 12px', borderRadius:'999px', fontSize:'12px'}}>✦ Rg</div>
          <div style={{width:'28px', height:'28px', background:'#222', borderRadius:'50%'}}></div>
          <div style={{width:'28px', height:'28px', background:'#222', borderRadius:'50%'}}></div>
        </div>
      </div>

      <div style={{textAlign:'center', marginTop:'10px'}}>
        <p style={{fontSize:'12px', fontWeight:600}}>Let's get started, public</p>
        <div style={{display:'flex', justifyContent:'center', gap:'8px', marginTop:'10px'}}>
          <span style={{background:'#FF2E7E', padding:'4px 12px', borderRadius:'999px', fontSize:'11px'}}>◉ Video</span>
          <span style={{background:'#222', padding:'4px 12px', borderRadius:'999px', fontSize:'11px', color:'#888'}}>Voiceover</span>
          <span style={{background:'#222', padding:'4px 12px', borderRadius:'999px', fontSize:'11px', color:'#888'}}>Design</span>
        </div>
      </div>

      <div style={{background:'#1A1A1A', borderRadius:'16px', margin:'18px 14px', padding:'12px', border:'1px solid #222'}}>
        <textarea placeholder="Enter your video idea, script, or blog link..." style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'13px', minHeight:'50px', resize:'none'}}></textarea>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'10px'}}>
          <span style={{color:'#666', fontSize:'14px'}}>👤 ✦</span>
          <button style={{background:'#FF2E7E', color:'white', border:'none', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600}}>✦ Create →</button>
        </div>
      </div>

      <p style={{fontSize:'11px', color:'#888', padding:'0 14px', marginBottom:'10px'}}>Video workflows</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', padding:'0 12px'}}>
        <div style={{background:'linear-gradient(135deg,#C53030,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Script to video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#4FD1C5,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Avatar video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#276749,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>PPT to video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#DD6B20,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Explainer video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#3182CE,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Motion graphics explainer</p><p style={{fontSize:'10px', marginTop:'40px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#D69E2E,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Music video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#234E52,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Podcast video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#44337A,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Product video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#83A51B,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Blog to video</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
        <div style={{background:'linear-gradient(135deg,#805AD5,#111)', borderRadius:'14px', padding:'12px', height:'130px', border:'1px solid #222'}}><p style={{fontSize:'12px', fontWeight:700}}>Swap Studio</p><p style={{fontSize:'10px', marginTop:'60px', opacity:0.7}}>Try it now →</p></div>
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#111', borderTop:'1px solid #222', display:'flex', justifyContent:'space-around', padding:'8px 0'}}>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#FF2E7E'}}>🏠</div><div style={{fontSize:'9px', color:'white'}}>Home</div></div>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#666'}}>📁</div><div style={{fontSize:'9px', color:'#666'}}>Files</div></div>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#666'}}>👤</div><div style={{fontSize:'9px', color:'#666'}}>Characters</div></div>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#666'}}>☰</div><div style={{fontSize:'9px', color:'#666'}}>Series</div></div>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#666'}}>✦</div><div style={{fontSize:'9px', color:'#666'}}>Playground</div></div>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#666'}}>📄</div><div style={{fontSize:'9px', color:'#666'}}>Templates</div></div>
        <div style={{textAlign:'center'}}><div style={{fontSize:'14px', color:'#666'}}>⊞</div><div style={{fontSize:'9px', color:'#666'}}>Resources</div></div>
      </div>

    </div>
  )
}
