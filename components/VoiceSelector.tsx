'use client'
export default function VoiceSelector({ text, selectedVoice, onVoiceChange }: any) {
  const voices = [
    { id: 'ur-PK-AsadNeural', label: 'Urdu - Asad - Documentary / Islami / Vlog' },
    { id: 'hi-IN-SwaraNeural', label: 'Hindi - Swara - Drama / Story' },
    { id: 'en-US-GuyNeural', label: 'English - Guy - All Niches' },
  ]
  return (
    <div style={{background:'#1A1630', border:'1px solid #2A2347', borderRadius:'12px', padding:'10px'}}>
      <p style={{fontSize:'10px', color:'#8B86A0', marginBottom:'6px'}}>SELECT VOICE (3 LOCKED)</p>
      <select value={selectedVoice} onChange={e=>onVoiceChange(e.target.value)} style={{width:'100%', background:'#0E0A1F', color:'white', border:'1px solid #2A2347', borderRadius:'8px', padding:'8px', fontSize:'12px'}}>
        {voices.map(v=> <option key={v.id} value={v.id}>{v.label}</option>)}
      </select>
    </div>
  )
}
