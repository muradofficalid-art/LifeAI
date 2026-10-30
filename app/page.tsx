'use client'
import Link from 'next/link'

const THEME = {
  bg: '#0E0A1F',
  bg2: '#130E28',
  card: '#1A1630',
  cardBorder: '#2A2347',
  primary: '#FF1E5E',
  accent: '#C9B8FF',
  muted: '#8B86A0',
  white: '#FFFFFF'
}

export default function Home(){
  return(
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
      *{font-family:'Inter',sans-serif; box-sizing:border-box}
    `}</style>
    <div style={{background:THEME.bg, minHeight:'100vh', overflowX:'hidden'}}>

      {/* NAV - Dark Glass Pill */}
      <div style={{position:'sticky', top:'12px', zIndex:50, padding:'0 12px'}}>
        <nav style={{background:'rgba(26,22,48,0.85)', backdropFilter:'blur(12px)', height:'56px', borderRadius:'999px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px 0 16px', boxShadow:'0 8px 32px rgba(0,0,0,0.4)', border:`1px solid ${THEME.cardBorder}`, maxWidth:'1120px', margin:'0 auto'}}>
          <div style={{fontWeight:900, fontSize:'20px', color:'white', display:'flex', alignItems:'center', gap:'8px'}}>
            <span style={{background:THEME.primary, width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>•</span>
            Life-AI
          </div>
          <Link href="/signup" style={{background:THEME.primary, color:'white', padding:'8px 16px', borderRadius:'999px', fontSize:'13px', fontWeight:700, textDecoration:'none', boxShadow:`0 0 20px ${THEME.primary}40`}}>Get started →</Link>
        </nav>
      </div>

      {/* HERO - Cinematic */}
      <div style={{textAlign:'center', padding:'48px 16px 20px', maxWidth:'720px', margin:'0 auto'}}>
        <span style={{background:THEME.card, color:THEME.accent, fontSize:'11px', padding:'6px 14px', borderRadius:'999px', border:`1px solid ${THEME.cardBorder}`}}>• AI Video Generator • Cinematic 8K</span>
        <h1 style={{fontSize:'38px', fontWeight:900, lineHeight:'1.05', letterSpacing:'-1.5px', color:'white', marginTop:'18px'}}>Turn idea into videos<br/><span style={{color:THEME.accent}}>with AI voices</span></h1>
        <p style={{fontSize:'14px', color:THEME.muted, marginTop:'14px'}}>Transform your ideas into stunning videos with AI video generator.</p>
        
        <div style={{background:THEME.card, borderRadius:'20px', padding:'14px', marginTop:'28px', boxShadow:`0 10px 40px rgba(0,0,0,0.5)`, border:`1px solid ${THEME.cardBorder}`, textAlign:'left'}}>
          <div style={{fontSize:'13px', color:THEME.muted}}>Create a faceless TikTok video about "5 money habits..."</div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'16px', alignItems:'center'}}>
            <span style={{fontSize:'12px', fontWeight:600, color:THEME.accent}}>🔊 Voice ▾</span>
            <Link href="/signup" style={{background:THEME.primary, color:'white', padding:'9px 16px', borderRadius:'999px', fontSize:'12px', fontWeight:700, textDecoration:'none', boxShadow:`0 0 20px ${THEME.primary}50`}}>Generate video →</Link>
          </div>
        </div>
      </div>

      {/* FAQ - Dark Cards */}
      <div style={{maxWidth:'720px', margin:'28px auto', padding:'0 12px', display:'grid', gap:'12px'}}>
        <div style={{background:THEME.card, border:`1px solid ${THEME.cardBorder}`, borderRadius:'16px', padding:'16px'}}>
          <h3 style={{fontSize:'16px', fontWeight:700, color:'white'}}>Can AI-generated videos be used commercially?</h3>
          <p style={{fontSize:'13px', color:THEME.muted, marginTop:'8px', lineHeight:'1.6'}}>Yes - as long as your tool's paid plan grants commercial rights and the music and stock media are properly licensed. Life-AI's paid plans include full commercial rights and YouTube-licensed music, so you can publish to monetized channels, run ads, and do client work without copyright risk.</p>
        </div>
        <div style={{background:THEME.card, border:`1px solid ${THEME.cardBorder}`, borderRadius:'16px', padding:'16px'}}>
          <h3 style={{fontSize:'16px', fontWeight:700, color:'white'}}>How long does it take to make an AI video?</h3>
          <p style={{fontSize:'13px', color:THEME.muted, marginTop:'8px', lineHeight:'1.6'}}>Most AI video generators can produce a 30-60 seconds short video in under two minutes. Longer videos with multiple scenes usually render in five to ten minutes. With Life-AI, the average short-form video is ready in about two minutes from the moment you hit generate.</p>
        </div>
      </div>

      {/* DARK CTA - Glowing */}
      <div style={{maxWidth:'720px', margin:'28px auto', padding:'0 12px'}}>
        <div style={{background:`radial-gradient(600px at 50% -20%, ${THEME.primary}15, transparent), ${THEME.card}`, borderRadius:'28px', padding:'32px 20px', textAlign:'center', border:`1px solid ${THEME.cardBorder}`, boxShadow:'0 20px 60px rgba(0,0,0,0.5)'}}>
          <span style={{background:THEME.bg, color:THEME.accent, fontSize:'11px', padding:'6px 14px', borderRadius:'999px', border:`1px solid ${THEME.cardBorder}`}}>• Trusted by 14M+ creators worldwide</span>
          <h2 style={{color:'white', fontSize:'28px', fontWeight:900, lineHeight:'1.2', marginTop:'18px'}}>Start creating videos<br/>with AI today</h2>
          <Link href="/signup" style={{background:THEME.primary, color:'white', padding:'14px 28px', borderRadius:'999px', fontSize:'15px', fontWeight:700, textDecoration:'none', display:'inline-block', marginTop:'20px', boxShadow:`0 0 30px ${THEME.primary}60`}}>Get started for free →</Link>
          <p style={{color:THEME.muted, fontSize:'12px', marginTop:'16px', lineHeight:'1.5'}}>Join 14M+ creators using Life-AI's AI video generator. Free plan - no credit card required.</p>
        </div>
      </div>

      {/* FOOTER - Same as Dashboard */}
      <div style={{background:'#090612', color:'white', padding:'32px 16px 20px', borderTop:`1px solid ${THEME.cardBorder}`, marginTop:'32px'}}>
        <div style={{fontSize:'28px', fontWeight:900, display:'flex', alignItems:'center', gap:'8px'}}>
          <span style={{background:THEME.primary, width:'32px', height:'32px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'16px'}}>•</span> 
          Life-AI
        </div>
        <p style={{color:THEME.muted, fontSize:'14px', marginTop:'12px', lineHeight:'1.6'}}>Create studio-quality videos from scripts, ideas, and long-form content in minutes with lifelike voices.</p>
        <p style={{color:THEME.accent, fontSize:'13px', marginTop:'12px'}}>4.8/5 on G2 and Capterra</p>
        
        <div style={{display:'flex', gap:'12px', marginTop:'16px'}}>
          {['📷','in','X','▶️','f','✉️'].map((s,i)=><span key={i} style={{background:THEME.card, width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', border:`1px solid ${THEME.cardBorder}`}}>{s}</span>)}
        </div>

        <div style={{marginTop:'32px', display:'grid', gap:'28px'}}>
          <div>
            <p style={{color:THEME.muted, fontSize:'12px', letterSpacing:'2px'}}>FEATURES</p>
            <div style={{marginTop:'12px', display:'grid', gap:'10px', fontSize:'14px', color:'#D1CFE0'}}>
              <span>AI explainer video maker</span><span>AI music video generator</span><span>AI video generator</span><span>AI voiceover</span><span>AI avatar</span><span>Translator</span>
            </div>
          </div>
        </div>

        <div style={{borderTop:`1px solid ${THEME.cardBorder}`, marginTop:'32px', paddingTop:'16px', textAlign:'center'}}>
          <p style={{color:THEME.muted, fontSize:'11px'}}>© 2026 Life-AI. All rights reserved.</p>
        </div>

        <div style={{background:THEME.card, borderRadius:'16px', padding:'20px', marginTop:'24px', border:`1px solid ${THEME.cardBorder}`}}>
          <p style={{fontSize:'16px', fontWeight:700, color:'white'}}>Earn recurring commissions with the Life-AI affiliate program.</p>
          <Link href="/signup" style={{background:THEME.primary, color:'white', padding:'10px 18px', borderRadius:'999px', fontSize:'13px', fontWeight:700, textDecoration:'none', display:'inline-block', marginTop:'16px'}}>Become an Affiliate</Link>
        </div>
      </div>
    </div>
    </>
  )
}
