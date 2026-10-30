'use client'
import { useState } from 'react'

export default function VoiceSelector({ text }: { text: string }) {
  const [mode, setMode] = useState('deep-story')
  const [playing, setPlaying] = useState(false)

  const play = () => {
    if (!text) return alert('Pehle story likho jan!')
    
    speechSynthesis.cancel()
    const ut = new SpeechSynthesisUtterance(text)
    
    // Deep Slow Settings
    if (mode === 'deep-story') { ut.rate = 0.75; ut.pitch = 0.7 }
    if (mode === 'smooth-radio') { ut.rate = 0.8; ut.pitch = 0.9 }
    if (mode === 'vip-hollywood') { ut.rate = 0.7; ut.pitch = 0.6 }
    
    // Urdu / Hindi auto voice
    const voices = speechSynthesis.getVoices()
    const urVoice = voices.find(v => v.lang.includes('ur') || v.name.includes('Asad') || v.name.includes('Google हिन्दी'))
    if (urVoice) ut.voice = urVoice
    
    ut.onstart = () => setPlaying(true)
    ut.onend = () => setPlaying(false)
    speechSynthesis.speak(ut)
  }

  return (
    <div style={{background:'white', border:'1px solid #eee', borderRadius:'16px', padding:'16px', marginTop:'16px'}}>
      <p style={{fontSize:'12px', fontWeight:800}}>VOICE MODE - 100% FREE • Rs 0</p>
      
      <div style={{display:'grid', gap:'8px', marginTop:'12px'}}>
        <button onClick={() => setMode('deep-story')} style={{textAlign:'left', padding:'12px', borderRadius:'12px', border: mode==='deep-story'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='deep-story'?'#FFF0F5':'white'}}>
          <b style={{fontSize:'13px'}}>🔥 Deep Story 0.75x</b><br/><span style={{fontSize:'11px', color:'#666'}}>Viral - Goosebumps Slow</span>
        </button>
        <button onClick={() => setMode('smooth-radio')} style={{textAlign:'left', padding:'12px', borderRadius:'12px', border: mode==='smooth-radio'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='smooth-radio'?'#FFF0F5':'white'}}>
          <b style={{fontSize:'13px'}}>📻 Smooth Radio 0.80x</b><br/><span style={{fontSize:'11px', color:'#666'}}>Calm & Clear</span>
        </button>
        <button onClick={() => setMode('vip-hollywood')} style={{textAlign:'left', padding:'12px', borderRadius:'12px', border: mode==='vip-hollywood'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='vip-hollywood'?'#FFF0F5':'white'}}>
          <b style={{fontSize:'13px'}}>🎬 VIP Hollywood 0.70x</b><br/><span style={{fontSize:'11px', color:'#666'}}>Deepest - ElevenLabs jaisa</span>
        </button>
      </div>

      <button onClick={play} style={{marginTop:'12px', width:'100%', background: playing?'#111':'#FF2E7E', color:'white', padding:'14px', borderRadius:'999px', fontWeight:800, border:'none'}}>
        {playing ? '⏸️ Playing... (Deep Slow)' : '▶️ Generate & Play Voice - FREE'}
      </button>
    </div>
  )
}
