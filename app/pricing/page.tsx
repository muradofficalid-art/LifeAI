'use client'
import Link from 'next/link'

const THEME = {
  bg: '#0E0A1F',
  card: '#1A1630',
  cardBorder: '#2A2347',
  primary: '#FF1E5E',
  accent: '#C9B8FF',
  muted: '#8B86A0',
}

export default function Pricing(){
  const plans = [
    {
      name: 'Free',
      price: 'Rs 0',
      sub: 'Start & explore',
      features: ['3 videos / month only', 'With watermark', '720p export', 'Standard voices', 'Max 1 min duration'],
      btn: 'Start for free',
      highlight: false
    },
    {
      name: 'Standard',
      price: 'Rs 8,000',
      priceNote: '/ month',
      sub: 'Most popular for creators',
      features: ['60 Long videos / month', '60 Shorts / month', 'Long = max 8 min', 'No watermark', '1080p & 4K export', '200+ premium AI voices', 'Commercial rights included', 'YouTube licensed music'],
      btn: 'Get Standard →',
      highlight: true,
      tag: 'BEST VALUE'
    },
    {
      name: 'Premium',
      price: 'Rs 15,000',
      priceNote: '/ month',
      sub: 'For pros & agencies',
      features: ['120 Long videos / month', '120 Shorts / month', 'Long = max 8 min', 'No watermark', '8K Cinematic export', 'Clone your own voice', 'Team access + API', 'Priority support 24/7', 'Commercial rights'],
      btn: 'Go Premium',
      highlight: false
    },
  ]

  return(
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap'); *{font-family:'Inter',sans-serif; box-sizing:border-box}`}</style>
    <div style={{background:THEME.bg, minHeight:'100vh', color:'white', padding:'0 12px 40px'}}>

      <div style={{position:'sticky', top:'12px', zIndex:50, padding:'12px 0'}}>
        <nav style={{background:'rgba(26,22,48,0.85)', backdropFilter:'blur(12px)', height:'56px', borderRadius:'999px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 14px 0 16px', border:`1px solid ${THEME.cardBorder}`, maxWidth:'1120px', margin:'0 auto'}}>
          <Link href="/" style={{fontWeight:900, fontSize:'20px', color:'white', textDecoration:'none', display:'flex', alignItems:'center', gap:'8px'}}>
            <span style={{background:THEME.primary, width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>•</span> Life-AI
          </Link>
          <Link href="/signup" style={{background:THEME.primary, color:'white', padding:'8px 16px', borderRadius:'999px', fontSize:'13px', fontWeight:700, textDecoration:'none'}}>Get started →</Link>
        </nav>
      </div>

      <div style={{textAlign:'center', padding:'36px 16px 10px', maxWidth:'720px', margin:'0 auto'}}>
        <span style={{background:THEME.card, color:THEME.accent, fontSize:'11px', padding:'6px 14px', borderRadius:'999px', border:`1px solid ${THEME.cardBorder}`}}>• Pricing in PKR •</span>
        <h1 style={{fontSize:'36px', fontWeight:900, marginTop:'16px', lineHeight:'1.1'}}>Simple pricing for <span style={{color:THEME.accent}}>Pakistani creators</span></h1>
        <p style={{color:THEME.muted, fontSize:'13px', marginTop:'10px'}}>Free me 3 videos watermark ke sath. Paid plans me no watermark, full commercial rights.</p>
      </div>

      <div style={{maxWidth:'1120px', margin:'28px auto 0', display:'grid', gap:'14px', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'}}>
        {plans.map((p)=>(
          <div key={p.name} style={{
            background: p.highlight ? `radial-gradient(500px at 50% -20%, ${THEME.primary}25, transparent), ${THEME.card}` : THEME.card,
            border:`1px solid ${p.highlight ? THEME.primary+'70' : THEME.cardBorder}`,
            borderRadius:'24px', padding:'22px', position:'relative',
            boxShadow: p.highlight ? `0 0 50px ${THEME.primary}25` : 'none'
          }}>
            {p.tag && <span style={{position:'absolute', top:'-10px', left:'50%', transform:'translateX(-50%)', background:THEME.primary, color:'white', fontSize:'10px', padding:'5px 12px', borderRadius:'999px', fontWeight:800, letterSpacing:'0.5px'}}>{p.tag}</span>}
            <h3 style={{fontSize:'18px', fontWeight:700, marginTop: p.tag ? '6px' : '0'}}>{p.name}</h3>
            <p style={{fontSize:'12px', color:THEME.muted, marginTop:'4px'}}>{p.sub}</p>
            <div style={{marginTop:'16px', display:'flex', alignItems:'baseline', gap:'4px'}}>
              <span style={{fontSize:'30px', fontWeight:900}}>{p.price}</span><span style={{color:THEME.muted, fontSize:'12px'}}>{p.priceNote || ''}</span>
            </div>
            <div style={{marginTop:'18px', display:'grid', gap:'10px'}}>
              {p.features.map(f=>(
                <div key={f} style={{fontSize:'13px', color: f.includes('watermark') && f.includes('With') ? '#FF8DB0' : '#D1CFE0', display:'flex', gap:'8px', lineHeight:'1.3'}}>
                  <span style={{color: f.includes('With watermark') ? '#FF8DB0' : THEME.primary, fontWeight:700}}>{f.includes('With watermark') ? '✕' : '✓'}</span> {f}
                </div>
              ))}
            </div>
            <Link href="/signup" style={{background: p.highlight ? THEME.primary : 'transparent', color:'white', border:`1px solid ${p.highlight ? THEME.primary : THEME.cardBorder}`, padding:'13px', borderRadius:'999px', fontSize:'14px', fontWeight:700, textDecoration:'none', display:'block', textAlign:'center', marginTop:'22px', boxShadow: p.highlight ? `0 0 24px ${THEME.primary}50` : 'none'}}>{p.btn}</Link>
          </div>
        ))}
      </div>

      <div style={{maxWidth:'720px', margin:'28px auto 0', background:THEME.card, border:`1px solid ${THEME.cardBorder}`, borderRadius:'16px', padding:'14px', textAlign:'center'}}>
        <p style={{fontSize:'12px', color:THEME.muted}}>💡 Long video = max 8 minutes • Short = under 60 seconds • All paid plans = No watermark + Commercial use</p>
      </div>

      <p style={{textAlign:'center', color:THEME.muted, fontSize:'11px', marginTop:'24px'}}>© 2026 Life-AI • Made for Pakistan • Cancel anytime</p>
    </div>
    </>
  )
}
