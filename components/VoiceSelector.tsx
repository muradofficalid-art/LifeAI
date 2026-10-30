'use client'
import { useState, useRef } from 'react'

const MY_VOICES = [
  { id: 'voice1', name: 'Murad - Deep', file: '/voice1.mp3', emoji: '🎙️' },
  { id: 'voice2', name: 'Soft Female', file: '/voice2.mp3', emoji: '💖' },
  { id: 'voice3', name: 'Urdu Viral', file: '/voice3.mp3', emoji: '🔥' },
  { id: 'voice4', name: 'Energetic', file: '/voice4.mp3', emoji: '⚡' },
  { id: 'voice5', name: 'Calm Story', file: '/voice5.mp3', emoji: '🌙' },
]

export default function VoiceSelector({ text }: { text: string }) {
  const [selected, setSelected] = useState(MY_VOICES[0])
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playVoice = (voice: typeof MY_VOICES[0]) => {
    setSelected(voice)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const audio = new Audio(voice.file)
    audioRef.current = audio
    setPlaying(voice.id)
    audio.play()
    audio.onended = () => setPlaying(null)
  }

  return (
    <div style={{background:'#fff', border:'1px solid #FF2E7E20', borderRadius:'20px', padding:'18px', marginTop:'16px', boxShadow:'0 4px 20px rgba(255,46,126,0.08)'}}>
      <p style={{fontSize:'11px', fontWeight:900, letterSpacing:'1px'}}>🔥 TUMHARI 5 VIRAL VOICES</p>
      <p style={{fontSize:'10px', color:'#888', marginTop:'4px'}}>Script: {text ? text.slice(0,40)+'...' : 'Koi script nahi'}</p>
      
      <div style={{display:'grid', gap:'8px', marginTop:'14px'}}>
        {MY_VOICES.map(v => (
          <div key={v.id} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'12px 14px', borderRadius:'12px',
            border: selected.id===v.id ? '2px solid #FF2E7E' : '1px solid #eee',
            background: selected.id===v.id ? '#FFF0F5' : 'white'
          }}>
            <span style={{fontWeight:700, fontSize:'13px'}}>{v.emoji} {v.name}</span>
            <button 
              onClick={()=> playVoice(v)}
              style={{
                background: playing===v.id ? '#000' : 'linear-gradient(135deg,#FF2E7E,#FF8A00)',
                color:'#fff', padding:'6px 14px', borderRadius:'999px', border:'none',
                fontWeight:800, fontSize:'12px'
              }}
            >
              {playing===v.id ? '⏸️ Playing' : '▶️ Play'}
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={()=> selected && playVoice(selected)}
        style={{marginTop:'14px', width:'100%', background:'linear-gradient(135deg,#FF2E7E,#FF8A00)', color:'#fff', padding:'16px', borderRadius:'999px', border:'none', fontWeight:900, fontSize:'15px'}}
      >
        ▶️ Play Selected - {selected.name}
      </button>
      
      <audio ref={audioRef} controls style={{width:'100%', marginTop:'12px', borderRadius:'12px', display:'none'}} />
      <p style={{fontSize:'10px', color:'#888', textAlign:'center', marginTop:'8px'}}>Tumhari 5 ElevenLabs voices - ab LifeAI me live!</p>
    </div>
  )
}
