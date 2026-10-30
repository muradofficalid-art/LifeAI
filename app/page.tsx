'use client'
import { useState } from 'react'

export default function Home() {
  const [duration, setDuration] = useState(5)
  const credits = (duration * 0.5).toFixed(1)

  return (
    <div style={{background:'#FFF7F9', color:'#0a0a0a', minHeight:'100vh', fontFamily:'Inter, system-ui'}}>
      
      {/* NAVBAR */}
      <nav style={{background:'white', borderBottom:'1px solid #eee', padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:50}}>
        <div style={{display:'flex', gap:'32px', alignItems:'center'}}>
          <div style={{fontWeight:900, fontSize:'20px', display:'flex', alignItems:'center', gap:'8px'}}><span style={{width:'8px', height:'8px', background:'#FF2E7E', borderRadius:'50%', display:'inline-block'}}></span>Fliki <span style={{fontWeight:400, opacity:0.6, fontSize:'14px'}}>lifeAI</span></div>
          <div style={{display:'flex', gap:'20px', fontSize:'14px', color:'#333'}}><span>Features ▼</span><span style={{fontWeight:700}}>Use cases ▼</span><span>Explore ▼</span><span>Pricing</span><span style={{background:'#FFE4EC', color:'#FF2E7E', padding:'2px 8px', borderRadius:'999px', fontSize:'10px'}}>40% off</span></div>
        </div>
        <div style={{display:'flex', gap:'12px'}}><button style={{padding:'8px 16px', fontSize:'14px'}}>Login</button><button style={{background:'#FF2E7E', color:'white', padding:'8px 18px', borderRadius:'999px', fontSize:'14px', fontWeight:600}}>Sign Up</button></div>
      </nav>

      {/* DROPDOWN - ICONS LIST */}
      <div style={{background:'white', maxWidth:'720px', margin:'12px auto', borderRadius:'16px', boxShadow:'0 10px 40px rgba(0,0,0,0.08)', padding:'16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px'}}>
        {[
          ['🎨','Content Creation'],['💼','Business and Corporate'],
          ['🎓','Training Videos'],['🏢','Internal Communication'],
          ['📣','Marketing and Social Media'],['📚','Education and E-Learning'],
          ['🛒','eCommerce'],['🌐','Localization and Translation']
        ].map(([icon, text])=>(
          <div key={text} style={{display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'10px'}}><span style={{width:'28px', height:'28px', background:'#FFF0F5', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>{icon}</span><span style={{fontSize:'13px', fontWeight:500}}>{text}</span></div>
        ))}
      </div>

      {/* HERO */}
      <div style={{textAlign:'left', maxWidth:'1200px', margin:'0 auto', padding:'40px 24px 20px'}}>
        <h1 style={{fontSize:'54px', fontWeight:900, lineHeight:'0.95', letterSpacing:'-2px'}}>AI video<br/>for every<br/><span style={{color:'#FF2E7E'}}>workspace</span> needs</h1>
        <p style={{maxWidth:'420px', marginTop:'18px', fontSize:'14px', color:'#666', lineHeight:'1.6'}}>Marketing campaigns, product explainers, onboarding videos, training, internal comms, slide decks into publish-ready videos and audio for every team across the business.</p>
        <a href="/dashboard" style={{display:'inline-block', marginTop:'22px', background:'#FF2E7E', color:'white', padding:'12px 22px', borderRadius:'999px', fontSize:'14px', fontWeight:600, textDecoration:'none'}}>Start creating free →</a>
        <p style={{fontSize:'11px', color:'#999', marginTop:'12px'}}>Free forever plan. No sign up to try. 80+ languages</p>
      </div>

      {/* TRUSTED */}
      <div style={{textAlign:'center', padding:'30px 0'}}>
        <p style={{fontSize:'10px', letterSpacing:'3px', color:'#aaa', fontWeight:700}}>TRUSTED BY 50,000+ COMPANIES WORLDWIDE</p>
        <div style={{display:'flex', justifyContent:'center', gap:'28px', marginTop:'14px', opacity:0.5, fontWeight:800, fontSize:'14px', flexWrap:'wrap'}}><span>SIEMENS</span><span style={{color:'#003087'}}>PayPal</span><span>SAP</span><span>COMCAST</span><span style={{color:'red'}}>TOYOTA</span><span>TATA</span><span>pwc</span><span>Capgemini</span></div>
      </div>

      {/* FILTER PILLS */}
      <div style={{display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', padding:'10px'}}>
        {['All','Avatars','Explainers','Training and L&D','TikToks & Shorts','Marketing'].map((f,i)=><span key={f} style={{background: i===0 ? 'white' : '#fff', border:'1px solid #eee', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight: i===0 ? 700 : 400, boxShadow: i===0 ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'}}>{f}</span>)}
      </div>

      {/* VIDEO GRID */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'14px', maxWidth:'1100px', margin:'22px auto', padding:'0 16px'}}>
        {[
          {tag:'Avatar', bg:'#FFE4EC'}, {tag:'Training', bg:'#FFF3CD'}, {tag:'Avatar', bg:'#E0F2FF'}, {tag:'UGC AI', bg:'#E8FFE8'},
          {tag:'Avatar', bg:'#000'}, {tag:'Music video', bg:'#111'}, {tag:'Motion graphics', bg:'#0A1A3A'}, {tag:'Drama', bg:'#1a1a1a'},
          {tag:'Podcast', bg:'#2a1a1a'}, {tag:'Explainer', bg:'#f0f0f0'}, 
        ].map((v,i)=>(
          <div key={i} style={{height: i===5 || i===6 || i===7 ? '260px' : '160px', background:v.bg, borderRadius:'16px', position:'relative', overflow:'hidden', gridRow: i===5 ? 'span 2' : undefined}}>
            <div style={{position:'absolute', bottom:'8px', left:'8px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'10px', padding:'3px 8px', borderRadius:'999px'}}>{v.tag}</div>
            {i===1 && <div style={{position:'absolute', top:'20px', left:'12px', background:'white', padding:'8px', borderRadius:'8px', fontSize:'12px', fontWeight:700}}>Spotting<br/>Card Fraud</div>}
            {i===6 && <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'rgba(0,0,0,0.7)', color:'white', padding:'6px 12px', borderRadius:'8px', fontSize:'14px'}}>Plan my day</div>}
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', padding:'10px 0 40px'}}><a href="/dashboard" style={{background:'#FF2E7E', color:'white', padding:'10px 20px', borderRadius:'999px', fontSize:'13px', textDecoration:'none', fontWeight:600}}>Create your video</a></div>

      {/* BUILT FOR EVERY TEAM */}
      <div style={{background:'white', padding:'40px 24px', textAlign:'center'}}>
        <p style={{fontSize:'10px', letterSpacing:'2px', color:'#FF2E7E', fontWeight:700}}>AI VIDEO USE CASES BY TEAM</p>
        <h2 style={{fontSize:'32px', fontWeight:800, marginTop:'8px'}}>Built for every team that ships video.</h2>
        <p style={{fontSize:'13px', color:'#666', maxWidth:'700px', margin:'10px auto'}}>Pick the team that ships your video. Fliki has a dedicated workflow for content creators, marketers, sales, L&D, internal comms, education, ecommerce, and localization teams.</p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', maxWidth:'1100px', margin:'30px auto'}}>
          <div style={{background:'#E6F0FF', borderRadius:'16px', height:'220px', display:'flex', alignItems:'center', justifyContent:'center'}}>📱 Mockup 1</div>
          <div style={{background:'#FFF5E6', borderRadius:'16px', height:'220px', display:'flex', alignItems:'center', justifyContent:'center'}}>🖼️ Mockup 2</div>
        </div>
      </div>

      {/* PRICING */}
      <div style={{background:'white', padding:'40px 16px'}}>
        <p style={{textAlign:'center', fontSize:'10px', letterSpacing:'3px', color:'#888'}}>SIMPLE, TRANSPARENT PRICING</p>
        <h2 style={{textAlign:'center', fontSize:'36px', fontWeight:800, marginTop:'8px'}}>Your AI partner for <span style={{color:'#FF2E7E'}}>video creation</span></h2>
        <div style={{display:'flex', justifyContent:'center', marginTop:'18px'}}><div style={{background:'#f1f1f1', borderRadius:'999px', padding:'4px', display:'flex'}}><button style={{background:'black', color:'white', padding:'8px 18px', borderRadius:'999px', fontSize:'13px'}}>Monthly</button><button style={{padding:'8px 18px', fontSize:'13px', color:'#666'}}>Yearly ⚡ 40% off</button></div></div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px', maxWidth:'1200px', margin:'36px auto'}}>
          <div style={{border:'1px solid #e5e5e5', borderRadius:'20px', padding:'28px'}}><h3 style={{fontWeight:700}}>Basic</h3><p style={{fontSize:'13px', color:'#666'}}>For beginners</p><ul style={{marginTop:'20px', fontSize:'13px', lineHeight:'26px', listStyle:'none', padding:0}}><li>✓ 60 credits per month</li><li>✓ 1000 voices</li><li>✓ Full HD 1080p</li><li>✓ Premium stock</li><li>✓ 5 min</li></ul><p style={{fontWeight:800, marginTop:'24px'}}>Rs 2,299 / per month</p><a href="/dashboard" style={{display:'block', textAlign:'center', marginTop:'18px', border:'1px solid #ddd', borderRadius:'999px', padding:'10px', fontSize:'13px', textDecoration:'none', color:'black'}}>Start for free →</a></div>
          
          <div style={{border:'2px solid #FF2E7E', borderRadius:'20px', padding:'28px', position:'relative'}}><span style={{position:'absolute', top:'-10px', right:'20px', background:'#FF2E7E', color:'white', fontSize:'10px', padding:'4px 10px', borderRadius:'999px'}}>⭐ MOST POPULAR</span><h3 style={{fontWeight:700}}>Standard</h3><p style={{fontSize:'13px', color:'#666'}}>For creators</p><ul style={{marginTop:'20px', fontSize:'13px', lineHeight:'26px', listStyle:'none', padding:0}}><li>✓ 180 credits</li><li>✓ 1000 voices 500 ultra</li><li>✓ 15 min, 60+ languages</li><li>✓ Voice cloning</li></ul><p style={{fontWeight:800, marginTop:'24px'}}>Rs 7,799 / per month</p><a href="/dashboard" style={{display:'block', textAlign:'center', marginTop:'18px', background:'#FF2E7E', color:'white', borderRadius:'999px', padding:'12px', fontSize:'13px', textDecoration:'none'}}>Start for free →</a></div>
          
          <div style={{border:'1px solid #e5e5e5', borderRadius:'20px', padding:'28px'}}><h3 style={{fontWeight:700}}>Premium</h3><p style={{fontSize:'13px', color:'#666'}}>For professional teams</p><ul style={{marginTop:'20px', fontSize:'13px', lineHeight:'26px', listStyle:'none', padding:0}}><li>✓ 600 credits</li><li>✓ 2300+ voices</li><li>✓ 40 min</li><li>✓ AI video clips</li></ul><p style={{fontWeight:800, marginTop:'24px'}}>Rs 23,999 / per month</p><a href="/dashboard" style={{display:'block', textAlign:'center', marginTop:'18px', border:'1px solid #ddd', borderRadius:'999px', padding:'10px', fontSize:'13px', textDecoration:'none', color:'black'}}>Start for free →</a></div>
        </div>
      </div>

      {/* CALCULATOR */}
      <div style={{background:'#FAFAFA', borderTop:'1px solid #eee', borderBottom:'1px solid #eee', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{padding:'32px'}}>
          <p style={{fontSize:'10px', letterSpacing:'2px', fontWeight:700, color:'#888'}}>PRICING CALCULATOR</p>
          <h3 style={{fontSize:'24px', fontWeight:800, marginTop:'6px'}}>Estimate your credits</h3>
          <div style={{marginTop:'24px'}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', fontWeight:700}}><span>VIDEO DURATION</span><span>{duration} mins</span></div>
            <input type="range" min={1} max={30} value={duration} onChange={e=>setDuration(Number(e.target.value))} style={{width:'100%', marginTop:'12px'}}/>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'10px', color:'#aaa', marginTop:'4px'}}><span>1 MIN</span><span>30 MIN</span></div>
          </div>
        </div>
        <div style={{background:'#0F172A', borderRadius:'0 0 0 0', margin:'16px', borderRadius:'24px', padding:'32px', textAlign:'center', color:'white', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <p style={{fontSize:'10px', letterSpacing:'3px', color:'#FF2E7E', fontWeight:700}}>ESTIMATED CREDITS</p>
          <h1 style={{fontSize:'48px', fontWeight:900, marginTop:'12px'}}>{credits} Credits</h1>
          <p style={{fontSize:'12px', color:'#aaa', marginTop:'4px'}}>0.5 credits / min</p>
        </div>
      </div>

      <div style={{position:'fixed', bottom:'20px', right:'20px', width:'56px', height:'56px', background:'#FF2E7E', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'22px'}}>💬</div>
    </div>
  )
}
