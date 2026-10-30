'use client'
import Link from 'next/link'

export default function Home(){
  return(
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
      *{font-family:'Inter',sans-serif; box-sizing:border-box}
      .scroll-hide::-webkit-scrollbar{display:none}
    `}</style>
    <div style={{background:'#FFF5F7', minHeight:'100vh', overflowX:'hidden'}}>

      {/* NAV - Floating pill */}
      <div style={{position:'sticky', top:'12px', zIndex:50, padding:'0 12px'}}>
        <nav style={{background:'white', height:'56px', borderRadius:'999px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px 0 16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', border:'1px solid #f2f2f2', maxWidth:'1120px', margin:'0 auto'}}>
          <div style={{fontWeight:900, fontSize:'20px', color:'#FF1E5E'}}>Life-AI</div>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <Link href="/signup" style={{background:'#FF1E5E', color:'white', padding:'8px 16px', borderRadius:'999px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Get started →</Link>
            <span style={{fontSize:'22px'}}>☰</span>
          </div>
        </nav>
      </div>

      {/* HERO - tumhara purana wala same rakha */}
      <div style={{textAlign:'center', padding:'28px 16px 12px', maxWidth:'720px', margin:'0 auto'}}>
        <h1 style={{fontSize:'36px', fontWeight:900, lineHeight:'1.05', letterSpacing:'-1.2px'}}>Turn idea into videos<br/>with AI voices</h1>
        <p style={{fontSize:'13px', color:'#64748B', marginTop:'12px'}}>Transform your ideas into stunning videos with AI video generator.</p>
        <div style={{background:'white', borderRadius:'20px', padding:'14px', marginTop:'20px', boxShadow:'0 10px 40px rgba(0,0,0,0.07)', border:'1px solid #FFE3EC', textAlign:'left'}}>
          <div style={{fontSize:'13px', color:'#94A3B8'}}>Create a faceless TikTok video about "5 money habits..."</div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'16px'}}>
            <span style={{fontSize:'12px', fontWeight:600}}>🔊 Voice ▾</span>
            <Link href="/signup" style={{background:'#FF1E5E', color:'white', padding:'8px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:700, textDecoration:'none'}}>Generate video →</Link>
          </div>
        </div>
      </div>

      {/* FAQ SECTION - Fliki exact */}
      <div style={{maxWidth:'720px', margin:'20px auto', padding:'0 12px', display:'grid', gap:'12px'}}>
        <div style={{background:'white', border:'1px solid #FFE3EC', borderRadius:'16px', padding:'16px'}}>
          <h3 style={{fontSize:'16px', fontWeight:700}}>Can AI-generated videos be used commercially?</h3>
          <p style={{fontSize:'13px', color:'#64748B', marginTop:'8px', lineHeight:'1.6'}}>Yes - as long as your tool's paid plan grants commercial rights and the music and stock media are properly licensed. Life-AI's paid plans include full commercial rights and YouTube-licensed music, so you can publish to monetized channels, run ads, and do client work without copyright risk.</p>
        </div>
        <div style={{background:'white', border:'1px solid #FFE3EC', borderRadius:'16px', padding:'16px'}}>
          <h3 style={{fontSize:'16px', fontWeight:700}}>How long does it take to make an AI video?</h3>
          <p style={{fontSize:'13px', color:'#64748B', marginTop:'8px', lineHeight:'1.6'}}>Most AI video generators can produce a 30-60 seconds short video in under two minutes. Longer videos with multiple scenes usually render in five to ten minutes. With Life-AI, the average short-form video is ready in about two minutes from the moment you hit generate.</p>
        </div>
      </div>

      {/* DARK CTA CARD - Exact Fliki */}
      <div style={{maxWidth:'720px', margin:'28px auto', padding:'0 12px'}}>
        <div style={{background:'#1A102E', borderRadius:'28px', padding:'28px 20px', textAlign:'center'}}>
          <span style={{background:'#2A1F45', color:'#C9B8FF', fontSize:'11px', padding:'6px 14px', borderRadius:'999px', border:'1px solid #3A2F55'}}>• Trusted by 14M+ creators worldwide</span>
          <h2 style={{color:'white', fontSize:'28px', fontWeight:900, lineHeight:'1.2', marginTop:'18px'}}>Start creating videos<br/>with AI today</h2>
          <Link href="/signup" style={{background:'#FF1E5E', color:'white', padding:'14px 28px', borderRadius:'999px', fontSize:'15px', fontWeight:700, textDecoration:'none', display:'inline-block', marginTop:'20px'}}>Get started for free →</Link>
          <p style={{color:'#6B6580', fontSize:'12px', marginTop:'16px', lineHeight:'1.5'}}>Join 14M+ creators, professionals, and teams using Life-AI's AI video generator. Free plan - no credit card required.</p>
        </div>
      </div>

      {/* FOOTER - Exact Fliki footer */}
      <div style={{background:'#0E0A1F', color:'white', padding:'32px 16px 20px', borderRadius:'0'}}>
        <div style={{fontSize:'32px', fontWeight:900}}>⚙ Fliki</div>
        <p style={{color:'#8B869E', fontSize:'14px', marginTop:'12px', lineHeight:'1.6'}}>Create studio-quality videos from scripts, ideas, and long-form content in minutes with lifelike voices.</p>
        <p style={{color:'#FF8DB0', fontSize:'13px', marginTop:'12px'}}>4.8/5 on G2 and Capterra</p>
        
        <div style={{display:'flex', gap:'12px', marginTop:'16px'}}>
          {['📷','in','X','▶️','f','✉️'].map((s,i)=><span key={i} style={{background:'#1A1630', width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>{s}</span>)}
        </div>

        <div style={{marginTop:'32px', display:'grid', gap:'28px'}}>
          <div>
            <p style={{color:'#6B6780', fontSize:'12px', letterSpacing:'2px'}}>FEATURES</p>
            <div style={{marginTop:'12px', display:'grid', gap:'10px', fontSize:'14px', color:'#D1CFE0'}}>
              <span>AI explainer video maker</span><span>AI music video generator</span><span>AI music generator</span><span>AI video generator</span><span>AI animation generator</span><span>AI voiceover</span><span>AI avatar</span><span>Translator</span><span>AI Reel maker</span><span>AI video ad generator</span><span>AI Presentation Maker</span><span>Video editor</span><span>Text to video</span><span>Idea to video</span><span>View all features →</span>
            </div>
          </div>
          <div>
            <p style={{color:'#6B6780', fontSize:'12px', letterSpacing:'2px'}}>USE CASES</p>
            <div style={{marginTop:'12px', display:'grid', gap:'10px', fontSize:'14px', color:'#D1CFE0'}}>
              <span>Content Creation</span><span>Business and Corporate</span><span>Training Videos</span><span>Internal Communication</span><span>Marketing and Social Media</span><span>Education and E-Learning</span><span>eCommerce</span><span>Localization and Translation</span>
            </div>
          </div>
          <div>
            <p style={{color:'#6B6780', fontSize:'12px', letterSpacing:'2px'}}>AI MODELS</p>
            <div style={{marginTop:'12px', display:'grid', gap:'10px', fontSize:'14px', color:'#D1CFE0'}}>
              <span>Seedance 2.5</span><span>Gemini Omni Flash 1.1</span><span>MiniMax H3 Max</span><span>FLUX 3 Video</span><span>Veo 3.1</span><span>Kling 3 Pro</span><span>GPT Image 2.5</span><span>Nano Banana 2</span><span>Qwen Image 3</span><span>Meta Muse</span><span>AI video models</span><span>AI image models</span><span>Browse all models →</span>
            </div>
          </div>
          <div>
            <p style={{color:'#6B6780', fontSize:'12px', letterSpacing:'2px'}}>RESOURCES</p>
            <div style={{marginTop:'12px', display:'grid', gap:'10px', fontSize:'14px', color:'#D1CFE0'}}>
              <span>Guide</span><span>Pricing</span><span>Blog</span><span>Tutorials</span><span>Webinars</span><span>FAQs</span><span>What's new</span><span>Voice samples</span><span>Languages & dialects</span><span>Alternatives</span><span>Tools</span><span>Developer API</span><span>Affiliate program</span>
            </div>
          </div>
        </div>

        <div style={{borderTop:'1px solid #1E1A32', marginTop:'32px', paddingTop:'16px', textAlign:'center'}}>
          <p style={{color:'#6B6780', fontSize:'11px'}}>© 2026 Nine Thirty Five. All rights reserved.</p>
          <p style={{color:'#8B869E', fontSize:'12px', marginTop:'8px'}}>Privacy · Terms · Cookies</p>
        </div>

        <div style={{background:'#1A1630', borderRadius:'16px', padding:'20px', marginTop:'24px'}}>
          <p style={{fontSize:'16px', fontWeight:700}}>Earn recurring commissions with the Fliki affiliate program.</p>
          <Link href="/signup" style={{background:'#FF1E5E', color:'white', padding:'10px 18px', borderRadius:'999px', fontSize:'13px', fontWeight:700, textDecoration:'none', display:'inline-block', marginTop:'16px'}}>Become an Affiliate</Link>
        </div>
      </div>
    </div>
    </>
  )
}
