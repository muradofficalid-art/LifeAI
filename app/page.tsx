'use client'

export default function Home() {
  return (
    <div style={{background:'#FFF5F8', minHeight:'100vh', fontFamily:'Inter, system-ui, sans-serif', color:'#111'}}>
      
      {/* NAVBAR - Fliki Same */}
      <nav style={{background:'white', height:'56px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, zIndex:50}}>
        <div style={{display:'flex', alignItems:'center', gap:'28px'}}>
          <div style={{fontWeight:900, fontSize:'18px', display:'flex', alignItems:'center', gap:'6px'}}>
            <span style={{background:'#FF2E7E', width:'20px', height:'20px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'12px'}}>•</span> Life-AI
          </div>
          <div style={{display:'flex', gap:'18px', fontSize:'13px', color:'#333'}}>
            <span>Features ▾</span><span>Use cases ▾</span><span>Explore ▾</span><span>Pricing <span style={{background:'#FFE3EC', color:'#FF2E7E', fontSize:'10px', padding:'2px 6px', borderRadius:'999px', marginLeft:'4px'}}>40% off</span></span>
          </div>
        </div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          <span style={{fontSize:'13px'}}>Login</span>
          <span style={{background:'#FF2E7E', color:'white', padding:'6px 14px', borderRadius:'999px', fontSize:'13px', fontWeight:600}}>Sign Up</span>
        </div>
      </nav>

      {/* HERO - Real jaisa */}
      <div style={{textAlign:'center', padding:'36px 16px 20px', maxWidth:'800px', margin:'0 auto'}}>
        <h1 style={{fontSize:'42px', fontWeight:900, lineHeight:'1.05', letterSpacing:'-1px'}}>Turn idea into videos<br/>with AI voices</h1>
        <p style={{fontSize:'13px', color:'#666', maxWidth:'540px', margin:'14px auto', lineHeight:'1.5'}}>Transform your ideas into stunning videos with our AI video generator. Easy to use Text to Video editor featuring lifelike voiceovers, dynamic AI video clips, and a wide range of AI-powered features.</p>
        
        {/* Input Box like Fliki */}
        <div style={{background:'white', borderRadius:'16px', padding:'14px', boxShadow:'0 8px 30px rgba(0,0,0,0.06)', border:'1px solid #f0f0f0', marginTop:'24px', textAlign:'left'}}>
          <input placeholder='Create a faceless TikTok video about "5 money habits that changed my life."' style={{width:'100%', border:'none', outline:'none', fontSize:'13px', color:'#333'}} defaultValue='Create a faceless TikTok video about "5 money habits that changed my life."' />
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px'}}>
            <div style={{display:'flex', gap:'12px', fontSize:'12px', color:'#666'}}>
              <span style={{display:'flex', alignItems:'center', gap:'4px'}}>👤 Character ▾</span>
              <span style={{display:'flex', alignItems:'center', gap:'4px'}}>🔊 Voice ▾</span>
            </div>
            <button style={{background:'#FF2E7E', color:'white', border:'none', padding:'8px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600}}>Generate video →</button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{display:'flex', gap:'6px', justifyContent:'center', flexWrap:'wrap', marginTop:'20px'}}>
          {['All','Avatars','Explainers','Training and L&D','TikToks & Shorts','Marketing'].map((t,i)=>
            <span key={t} style={{background:i===0?'black':'white', color:i===0?'white':'#333', border:'1px solid #eee', padding:'6px 12px', borderRadius:'999px', fontSize:'11px'}}>{t}</span>
          )}
        </div>
      </div>

      {/* VIDEO GRID - Real Images */}
      <div style={{maxWidth:'900px', margin:'16px auto', padding:'0 16px', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'10px'}}>
        {/* Row 1 */}
        <div style={{gridRow:'span 2', borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400)', backgroundSize:'cover', backgroundPosition:'center', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Avatar</span></div>
        <div style={{borderRadius:'14px', background:'#FFF6D6', padding:'10px', display:'flex', flexDirection:'column', justifyContent:'center'}}><p style={{fontSize:'14px', fontWeight:800, color:'#B48A00', lineHeight:'1.1'}}>Spotting<br/>Card Fraud</p><p style={{fontSize:'8px', marginTop:'8px', background:'black', color:'white', padding:'2px 6px', borderRadius:'999px', width:'fit-content'}}>Training</p></div>
        <div style={{borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400)', backgroundSize:'cover', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Avatar</span></div>
        <div style={{borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400)', backgroundSize:'cover', position:'relative'}}><span style={{position:'absolute', bottom:'8px', right:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>UGC.ai</span></div>
        
        {/* Row 2 */}
        <div style={{gridRow:'span 2', borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400)', backgroundSize:'cover', backgroundPosition:'center', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Avatar</span></div>
        <div style={{borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400)', backgroundSize:'cover', position:'relative', backgroundPosition:'top'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Music video</span></div>
        <div style={{gridRow:'span 2', borderRadius:'14px', background:'#0A1A3A', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'14px', border:'1px solid #1a2a5a'}}><span style={{border:'1px solid rgba(255,255,255,0.3)', padding:'6px 10px', borderRadius:'8px'}}>Plan my day</span></div>
        <div style={{gridRow:'span 2', borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400)', backgroundSize:'cover', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Drama</span></div>

        {/* Row 3 */}
        <div style={{borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1590650046871-92d84d3d00b8?w=400)', backgroundSize:'cover', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Podcast</span></div>
        <div style={{borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400)', backgroundSize:'cover', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Explainer</span><span style={{position:'absolute', bottom:'22px', left:'50%', transform:'translateX(-50%)', color:'white', fontSize:'10px', fontWeight:700}}>occupied</span></div>
        <div style={{borderRadius:'14px', backgroundImage:'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400)', backgroundSize:'cover', position:'relative'}}><span style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'9px', padding:'2px 6px', borderRadius:'999px'}}>Motion graphics</span></div>
      </div>

      <div style={{textAlign:'center', margin:'22px 0'}}>
        <a href="/dashboard" style={{background:'#FF2E7E', color:'white', padding:'8px 18px', borderRadius:'999px', fontSize:'12px', textDecoration:'none', fontWeight:600}}>Create your video</a>
      </div>

      {/* STATS */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', maxWidth:'900px', margin:'0 auto', padding:'0 16px'}}>
        <div style={{background:'#0F172A', color:'white', borderRadius:'12px', padding:'14px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:800}}>100M+</div><div style={{fontSize:'8px', letterSpacing:'1px', color:'#94A3B8', marginTop:'2px'}}>VIDEOS CREATED</div></div>
        <div style={{background:'#0F172A', color:'white', borderRadius:'12px', padding:'14px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:800}}>14M+</div><div style={{fontSize:'8px', letterSpacing:'1px', color:'#94A3B8', marginTop:'2px'}}>USERS WORLDWIDE</div></div>
        <div style={{background:'#0F172A', color:'white', borderRadius:'12px', padding:'14px', textAlign:'center'}}><div style={{fontSize:'18px', fontWeight:800}}>80+</div><div style={{fontSize:'8px', letterSpacing:'1px', color:'#94A3B8', marginTop:'2px'}}>LANGUAGES SUPPORTED</div></div>
      </div>

      {/* TRUSTED */}
      <div style={{textAlign:'center', padding:'20px 0 10px'}}>
        <p style={{fontSize:'8px', letterSpacing:'2px', color:'#999'}}>TRUSTED BY 50,000+ COMPANIES WORLDWIDE</p>
        <div style={{display:'flex', justifyContent:'center', gap:'18px', marginTop:'10px', opacity:0.45, fontWeight:800, fontSize:'11px', flexWrap:'wrap'}}>
          <span>SIEMENS</span><span style={{color:'#003087'}}>PayPal</span><span style={{color:'#0088D4'}}>SAP</span><span>COMCAST</span><span style={{color:'#EB0A1E'}}>TOYOTA</span><span>TATA</span><span>pwc</span>
        </div>
      </div>

      {/* BOTTOM DARK SECTION */}
      <div style={{background:'#0F0F0F', marginTop:'24px', padding:'24px 16px', borderRadius:'24px 24px 0 0'}}>
        <h2 style={{color:'white', textAlign:'center', fontSize:'20px', fontWeight:800, lineHeight:'1.2'}}>Everything you need to turn text into stunning<br/>videos</h2>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', maxWidth:'900px', margin:'20px auto 0'}}>
          <div style={{background:'#1A1A1A', borderRadius:'12px', padding:'16px'}}><span style={{background:'#333', color:'#aaa', fontSize:'9px', padding:'3px 8px', borderRadius:'999px'}}>Text to Video</span><p style={{color:'white', fontSize:'13px', fontWeight:700, marginTop:'10px'}}>Your content,</p></div>
          <div style={{background:'#1A1A1A', borderRadius:'12px', padding:'16px'}}><span style={{background:'#333', color:'#aaa', fontSize:'9px', padding:'3px 8px', borderRadius:'999px'}}>Text to Speech</span><p style={{color:'white', fontSize:'13px', fontWeight:700, marginTop:'10px'}}>Human-quality<br/>voice, at scale</p></div>
        </div>
      </div>

    </div>
  )
}
