'use client'
import { useState } from 'react'

export default function VoiceSelector({ text }: { text: string }) {
  const [mode, setMode] = useState('deep')

  const play = () => {
    if (!text) return alert('Pehle story likho jan!')
    window.speechSynthesis.cancel()
    
    const u = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const best = voices.find(v => v.lang === 'ur-PK') || voices.find(v => v.lang === 'hi-IN') || voices[0]
    if (best) u.voice = best
    
    u.rate = mode === 'deep' ? 0.7 : 0.85
    u.pitch = mode === 'deep' ? 0.8 : 1
    u.volume = 1
    
    window.speechSynthesis.speak(u)
  }

  const stop = () => window.speechSynthesis.cancel()

  return (
    <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'16px', padding:'16px', marginTop:'16px'}}>
      <p style={{fontSize:'12px', fontWeight:800}}>HUMAN VOICE V5 - ERROR FREE</p>
      <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
        <button onClick={() => setMode('deep')} style={{flex:1, padding:'10px', borderRadius:'10px', border: mode==='deep'?'2px solid #FF2E7E':'1px solid #ddd'}}>Deep Human</button>
        <button onClick={() => setMode('fast')} style={{flex:1, padding:'10px', borderRadius:'10px', border: mode==='fast'?'2px solid #FF2E7E':'1px solid #ddd'}}>Normal</button>
      </div>
      <button onClick={play} style={{marginTop:'12px', width:'100%', background:'#FF2E7E', color:'#fff', padding:'14px', borderRadius:'999px', border:'none', fontWeight:800}}>▶️ Play Voice</button>
      <button onClick={stop} style={{marginTop:'8px', width:'100%', background:'#111', color:'#fff', padding:'10px', borderRadius:'999px', border:'none'}}>⏹️ Stop</button>
    </div>
  )
}
