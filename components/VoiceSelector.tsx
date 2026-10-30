'use client'
import { useState } from 'react'

export default function VoiceSelector({ text }: { text: string }) {
  const [mode, setMode] = useState('deep-story')
  const [playing, setPlaying] = useState(false)

  const playHuman = () => {
    if (!text) return alert('Pehle story likho jan!')
    
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    
    // BEST Urdu/Hindi Human Voice select karo
    const voices = window.speechSynthesis.getVoices()
    const urduVoice = voices.find(v => v.name.includes('Urdu') || v.lang === 'ur-PK') 
                   || voices.find(v => v.lang === 'hi-IN')
                   || voices.find(v => v.name.includes('Google') && v.lang.includes('en'))
                   || voices[0]
    
    if (urduVoice) utterance.voice = urduVoice
    
    // HUMAN Jaisa Deep Slow - Robot Khatam
    if (mode === 'deep-story') {
      utterance.rate = 0.75
      utterance.pitch = 0.8
    } else if (mode === 'vip-hollywood') {
      utterance.rate = 0.65
      utterance.pitch = 0.7
    } else {
      utterance.rate = 0.8
      utterance.pitch = 0.9
    }
    
    utterance.volume = 1
    utterance.onstart = () => setPlaying(true)
    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)
    
    window.speechSynthesis.speak(utterance)
  }

  const stopVoice = () => {
    window.speechSynthesis.cancel()
    setPlaying(false)
  }

  return (
    <div style={{background:'white', border:'1px solid #eee', borderRadius:'16px', padding:'16px', marginTop:'16px'}}>
      <p style={{fontSize:'11px', fontWeight:800, color:'#111'}}>HUMAN VOICE V3 - NO ERROR - 100% FREE</p>
      
      <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
        <button onClick={() => setMode('deep-story')} style={{flex:1, padding:'10px', borderRadius:'12px', border: mode==='deep-story'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='deep-story'?'#FFF0F5':'white', fontSize:'12px', fontWeight:600}}>Deep Story</button>
        <button onClick={() => setMode('vip-hollywood')} style={{flex:1, padding:'10px', borderRadius:'12px', border: mode==='vip-hollywood'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='vip-hollywood'?'#FFF0F5':'white', fontSize:'12px', fontWeight:600}}>VIP Deep</button>
      </div>

      <button onClick={playing ? stopVoice : playHuman} style={{marginTop:'12px', width:'100%', background: playing?'#111':'#FF2E7E', color:'white', padding:'14px', borderRadius:'999px', fontWeight:800, border:'none'}}>
        {playing ? '⏹️ Stop' : '▶️ Play HUMAN Voice'}
      </button>
      <p style={{fontSize:'10px', color:'#888', marginTop:'8px', textAlign:'center'}}>Google Urdu + Deep Slow = Human jaisi. Robot nahi.</p>
    </div>
  )
}
