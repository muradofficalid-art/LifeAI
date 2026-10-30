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
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      if (audioRef.current) {
        audioRef.current.src = url
        await audioRef.current.play()
      }
    } catch (err: any) {
      alert('Error: ' + err.message + ' - 2 min wait, Vercel deploy ho raha')
    }
    setLoading(false)
  }

  return (
    <div style={{background:'white', border:'1px solid #eee', borderRadius:'16px', padding:'16px', marginTop:'16px', color:'#111'}}>
      <p style={{fontSize:'11px', fontWeight:800}}>FINAL HUMAN VOICE V4 - ASAD - NO ROBOT</p>
      <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
        <button onClick={() => setMode('deep-story')} style={{flex:1, padding:'10px', borderRadius:'12px', border: mode==='deep-story'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='deep-story'?'#FFF0F5':'white'}}>Deep Story</button>
        <button onClick={() => setMode('vip-hollywood')} style={{flex:1, padding:'10px', borderRadius:'12px', border: mode==='vip-hollywood'?'2px solid #FF2E7E':'1px solid #eee', background: mode==='vip-hollywood'?'#FFF0F5':'white'}}>VIP Hollywood</button>
      </div>
      <button onClick={playHuman} disabled={loading} style={{marginTop:'12px', width:'100%', background: loading?'#999':'#FF2E7E', color:'white', padding:'14px', borderRadius:'999px', fontWeight:800, border:'none'}}>
        {loading ? '⏳ Human Asad Bana Raha Hun...' : '▶️ Play HUMAN Urdu Voice'}
      </button>
      <audio ref={audioRef} controls style={{width:'100%', marginTop:'10px'}} />
    </div>
  )
}
