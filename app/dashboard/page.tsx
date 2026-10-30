'use client'
import { useState } from 'react'
import VoiceSelector from '@/components/VoiceSelector'

// OFFICIAL LIFE-AI THEME 2 - Deep Purple + Hot Pink
const THEME = {
  bg: '#0E0A1F',
  card: '#1A1630',
  cardBorder: '#2A2347',
  primary: '#FF1E5E',
  accent: '#C9B8FF',
  muted: '#8B86A0',
  pillInactive: '#1E1A32'
}

export default function Dashboard(){
  const [storyText, setStoryText] = useState('')

  const items=[
    {t:'Script to video', i:'/workflows/1.jpg'},
    {t:'Avatar video', i:'/workflows/2.jpg'},
    {t:'PPT to video', i:'/workflows/3.jpg'},
    {t:'Explainer video', i:'/workflows/4.jpg'},
    {t:'Motion graphics explainer', i:'/workflows/5.jpg'},
    {t:'Music video', i:'/workflows/6.jpg'},
    {t:'Podcast video', i:'/workflows/7.jpg'},
    {t:'Product video', i:'/workflows/8.jpg'},
    {t:'Blog to video', i:'/workflows/9.jpg'},
    {t:'Swap Studio', i:'/workflows/10.jpg'},
  ]
  return(
    <div style={{background:THEME.bg, minHeight:'100vh', color:'white', fontFamily:'system-ui', paddingBottom:'80px'}}>
      
      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px', alignItems:'center'}}>
        <div style={{width:'20px', height:'20px', background:THEME.primary, borderRadius:'50%'}}></div>
        <div style={{background:THEME.primary, padding:'4px 10px', borderRadius:'999px', fontSize:'11px'}}>✦ Rg</div>
      </div>

      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'11px', fontWeight:600, color:THEME.accent}}>Let's get started, public</p>
        <div style={{display:'flex', justifyContent:'center', gap:'6px', marginTop:'8px'}}>
          <span style={{background:THEME.primary, padding:'3px 10px', borderRadius:'999px', fontSize:'10px'}}>◉ Video</span>
          <span style={{background:THEME.pillInactive, padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:THEME.muted, border:`1px solid ${THEME.cardBorder}`}}>Voiceover</span>
          <span style={{background:THEME.pillInactive, padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:THEME.muted, border:`1px solid ${THEME.cardBorder}`}}>Design</span>
        </div>
      </div>

      <div style={{background:THEME.card, borderRadius:'14px', margin:'14px', padding:'10px', border:`1px solid ${THEME.cardBorder}`}}>
        <textarea 
          placeholder="Enter your video idea, script, or blog link..." 
          value={storyText}
          onChange={(e)=>setStoryText(e.target.value)}
          style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'12px', minHeight:'44px', resize:'none'}}
        ></textarea>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px', alignItems:'center'}}>
          <span style={{fontSize:'12px', color:THEME.muted}}>👤 ✦</span>
          <button style={{background:THEME.primary, color:'white', border:'none', padding:'6px 12px', borderRadius:'999px', fontSize:'11px', fontWeight:700}}>✦ Create →</button>
        </div>
      </div>

      {/* VOICE SELECTOR - ADDED HERE - Design Safe */}
      <div style={{margin:'0 14px'}}>
        <VoiceSelector text={storyText} />
      </div>

      <p style={{fontSize:'10px', color:THEME.muted, padding:'0 14px', marginBottom:'8px', marginTop:'16px', letterSpacing:'1px'}}>VIDEO WORKFLOWS</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 10px'}}>
        {items.map((x,j)=>(
          <div key={j} style={{borderRadius:'12px', height:'140px', position:'relative', overflow:'hidden', background:THEME.card, border:`1px solid ${THEME.cardBorder}`}}>
            <img src={x.i} alt={x.t} style={{position:'absolute', right:0, top:0, width:'62%', height:'100%', objectFit:'cover', opacity:0.9}}/>
            <div style={{position:'absolute', inset:0, background:`linear-gradient(to right, ${THEME.bg} 0%, ${THEME.card} 45%, transparent 80%)`}}></div>
            <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'78px', lineHeight:'1.2'}}>{x.t}</p>
            <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:THEME.accent}}>Try it now →</p>
          </div>
        ))}
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:THEME.card, borderTop:`1px solid ${THEME.cardBorder}`, display:'flex', justifyContent:'space-around', padding:'7px 0'}}>
        {['Home','Files','Characters','Series','Playground','Templates','Resources'].map((l,i)=>(
          <div key={l} style={{textAlign:'center'}}><div style={{fontSize:'13px', color: i===0? THEME.primary : THEME.muted}}>{i===0?'🏠':'📁'}</div><div style={{fontSize:'7px', color: i===0?'white': THEME.muted}}>{l}</div></div>
        ))}
      </div>

    </div>
  )
}
