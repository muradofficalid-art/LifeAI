'use client'
import { useState, useRef } from 'react'

export default function VoiceSelector({ text }: { text: string }) {
  const [mode, setMode] = useState('deep-story')
  const [loading, setLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playHuman = async () => {
    if (!text) return alert('Pehle story likho jan!')
    setLoading(true)
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode })
      })
      if (!res.ok) throw new Error('Voice failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      if (audioRef.current) {
        audioRef.current.src = url
        await audioRef.current.play()
      }
    } catch (err) {
      alert('Human voice error - Vercel deploy hone do 2 min')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div style={{background:'white', border:'1px solid #eee', borderRadius:'16px', padding:'16px', marginTop:'16px', color:'#111'}}>
      <p style={{fontSize:'11px', fontWeight:800, letterSpacing:'1px'}}>HUMAN VOICE V2 • 100% FREE • HUMAN</p>
      
      <div style={{display:'grid', gap:'8px', marginTop:'12px'}}>
        <button onClick={() => setMode('deep-story')} style={{textAlign:'left', padding:'12px', borderRadius:'12px', border: mode==='deep-story'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='deep-story'?'#FFF0F5':'white'}}>
          <b style={{fontSize:'13px'}}>🔥 Deep Story -25%</b><br/><span style={{fontSize:'11px', color:'#666'}}>Viral TikTok - Goosebumps</span>
        </button>
        <button onClick={() => setMode('vip-hollywood')} style={{textAlign:'left', padding:'12px', borderRadius:'12px', border: mode==='vip-hollywood'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='vip-hollywood'?'#FFF0F5':'white'}}>
          <b style={{fontSize:'13px'}}>🎬 VIP Hollywood -35%</b><br/><span style={{fontSize:'11px', color:'#666'}}>Deepest Human - ElevenLabs jaisa</span>
        </button>
      </div>

      <button onClick={playHuman} disabled={loading} style={{marginTop:'12px', width:'100%', background: loading?'#999':'#FF2E7E', color:'white', padding:'14px', borderRadius:'999px', fontWeight:800, border:'none'}}>
        {loading ? '⏳ Human Voice Bana Raha Hun...' : '▶️ Play HUMAN Voice - Asad'}
      </button>
      <audio ref={audioRef} controls style={{width:'100%', marginTop:'10px', display: loading ? 'none' : 'block'}} />
      <p style={{fontSize:'10px', color:'#888', marginTop:'6px'}}>Note: Ye Microsoft ki asli human voice hai, robot nahi.</p>
    </div>
  )
}
