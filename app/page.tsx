'use client'

export default function Home() {
  return (
    <div style={{background:'#FFF7F9', minHeight:'100vh', fontFamily:'system-ui'}}>
      
      <nav style={{background:'white', borderBottom:'1px solid #eee', padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:900, fontSize:'20px'}}>lifeAI</div>
        <div style={{display:'flex', gap:'12px'}}>
          <a href="/dashboard" style={{padding:'8px 16px', textDecoration:'none', color:'black', fontSize:'14px'}}>Login</a>
          <a href="/dashboard" style={{background:'#FF2E7E', color:'white', padding:'8px 18px', borderRadius:'999px', fontSize:'14px', textDecoration:'none'}}>Sign Up</a>
        </div>
      </nav>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'50px 24px'}}>
        <h1 style={{fontSize:'56px', fontWeight:900, lineHeight:'0.9'}}>AI video<br/>for every<br/><span style={{color:'#FF2E7E'}}>workspace</span> needs</h1>
        <p style={{maxWidth:'420px', marginTop:'18px', fontSize:'14px', color:'#666'}}>Marketing, training, internal comms, slide decks into publish-ready videos.</p>
        <a href="/dashboard" style={{display:'inline-block', marginTop:'20px', background:'#FF2E7E', color:'white', padding:'12px 22px', borderRadius:'999px', textDecoration:'none', fontSize:'14px', fontWeight:600}}>Start creating free</a>

        <p style={{textAlign:'center', fontSize:'10px', letterSpacing:'3px', color:'#aaa', fontWeight:700, marginTop:'60px'}}>TRUSTED BY 50,000+ COMPANIES</p>
        <div style={{display:'flex', justifyContent:'center', gap:'24px', marginTop:'12px', fontWeight:800, opacity:0.5, fontSize:'13px'}}>
          <span>SIEMENS</span><span>PayPal</span><span>TOYOTA</span><span>TATA</span><span>SAP</span>
        </div>

        <div style={{display:'flex', justifyContent:'center', gap:'8px', marginTop:'30px', flexWrap:'wrap'}}>
          <span style={{background:'white', border:'1px solid #eee', padding:'7px 14px', borderRadius:'999px', fontSize:'12px'}}>All</span>
          <span style={{background:'#fff', border:'1px solid #eee', padding:'7px 14px', borderRadius:'999px', fontSize:'12px'}}>Avatars</span>
          <span style={{background:'#fff', border:'1px solid #eee', padding:'7px 14px', borderRadius:'999px', fontSize:'12px'}}>Explainers</span>
          <span style={{background:'#fff', border:'1px solid #eee', padding:'7px 14px', borderRadius:'999px', fontSize:'12px'}}>Training</span>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'14px', marginTop:'24px'}}>
          <div style={{height:'160px', background:'#FFE4EC', borderRadius:'16px'}}></div>
          <div style={{height:'160px', background:'#FFF3CD', borderRadius:'16px'}}></div>
          <div style={{height:'160px', background:'#E0F2FF', borderRadius:'16px'}}></div>
          <div style={{height:'160px', background:'#E8FFE8', borderRadius:'16px'}}></div>
          <div style={{height:'160px', background:'#000', borderRadius:'16px'}}></div>
          <div style={{height:'260px', background:'#111', borderRadius:'16px'}}></div>
          <div style={{height:'260px', background:'#0A1A3A', borderRadius:'16px'}}></div>
          <div style={{height:'260px', background:'#222', borderRadius:'16px'}}></div>
        </div>

        <div style={{textAlign:'center', marginTop:'30px'}}>
          <a href="/dashboard" style={{background:'#FF2E7E', color:'white', padding:'10px 20px', borderRadius:'999px', textDecoration:'none', fontSize:'13px'}}>Create your video</a>
        </div>
      </div>

      <div style={{background:'white', padding:'50px 24px', textAlign:'center'}}>
        <p style={{fontSize:'10px', letterSpacing:'3px', color:'#FF2E7E', fontWeight:700}}>AI VIDEO USE CASES BY TEAM</p>
        <h2 style={{fontSize:'32px', fontWeight:800, marginTop:'8px'}}>Built for every team that ships video.</h2>
        <p style={{fontSize:'13px', color:'#666', maxWidth:'700px', margin:'10px auto'}}>Pick the team that ships your video.</p>
      </div>

      <div style={{background:'white', padding:'40px 80px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px'}}>
        <div style={{border:'1px solid #e5e5e5', borderRadius:'20px', padding:'28px'}}>
          <h3>Basic</h3>
          <p style={{fontSize:'13px', color:'#666'}}>For beginners</p>
          <p style={{fontWeight:800, marginTop:'20px'}}>Rs 2,299 / per month</p>
          <a href="/dashboard" style={{display:'block', textAlign:'center', marginTop:'16px', border:'1px solid #ddd', borderRadius:'999px', padding:'10px', textDecoration:'none', color:'black', fontSize:'13px'}}>Start for free</a>
        </div>
        <div style={{border:'2px solid #FF2E7E', borderRadius:'20px', padding:'28px', position:'relative'}}>
          <span style={{position:'absolute', top:'-10px', right:'20px', background:'#FF2E7E', color:'white', fontSize:'10px', padding:'4px 10px', borderRadius:'999px'}}>MOST POPULAR</span>
          <h3>Standard</h3>
          <p style={{fontSize:'13px', color:'#666'}}>For creators</p>
          <p style={{fontWeight:800, marginTop:'20px'}}>Rs 7,799 / per month</p>
          <a href="/dashboard" style={{display:'block', textAlign:'center', marginTop:'16px', background:'#FF2E7E', color:'white', borderRadius:'999px', padding:'12px', textDecoration:'none', fontSize:'13px'}}>Start for free</a>
        </div>
        <div style={{border:'1px solid #e5e5e5', borderRadius:'20px', padding:'28px'}}>
          <h3>Premium</h3>
          <p style={{fontSize:'13px', color:'#666'}}>For teams</p>
          <p style={{fontWeight:800, marginTop:'20px'}}>Rs 23,999 / per month</p>
          <a href="/dashboard" style={{display:'block', textAlign:'center', marginTop:'16px', border:'1px solid #ddd', borderRadius:'999px', padding:'10px', textDecoration:'none', color:'black', fontSize:'13px'}}>Start for free</a>
        </div>
      </div>

    </div>
  )
}
