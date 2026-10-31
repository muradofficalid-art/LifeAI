'use client'
import { useState, useEffect } from 'react'
import VoiceSelector from '@/components/VoiceSelector'

const THEME = { bg:'#0E0A1F', card:'#1A1630', border:'#2A2347', primary:'#FF1E5E', accent:'#C9B8FF', muted:'#8B86A0', pillInactive:'#1E1A32' }
const GOD_EMAIL = "murad@lifeai.com"

export default function AdminPanel(){
  const [auth, setAuth] = useState(false)
  const [godInput, setGodInput] = useState("")
  const [tab, setTab] = useState('create') // create | control

  // CREATE - Same as Dashboard
  const [storyText, setStoryText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('ur-PK-AsadNeural')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [myFiles, setMyFiles] = useState<any[]>([])

  // CONTROL - Pricing
  const [pricing, setPricing] = useState({
    free: { limit: 5, label: "Free (5/day)" },
    standard: { price: 8000, long: 60, short: 60, label: "Standard" },
    premium: { price: 15000, long: 120, short: 120, label: "Premium" }
  })
  const [isUnlimited, setIsUnlimited] = useState(true)

  useEffect(()=>{
    const email = localStorage.getItem('lifeai_user_email') || ""
    if(email.toLowerCase().includes('murad') || email === GOD_EMAIL) setAuth(true)
    const saved = localStorage.getItem('lifeai_pricing')
    if(saved) try{ setPricing(JSON.parse(saved)) }catch{}
    const files = localStorage.getItem('lifeai_my_files')
    if(files) try{ setMyFiles(JSON.parse(files)) }catch{}
  },[])

  const checkGod = () => {
    if(godInput === "LifeAI@Murad786"){
      setAuth(true)
      localStorage.setItem('lifeai_user_email','murad@lifeai.com')
    } else alert('Galat KEY jan!')
  }

  const handleCreate = async () => {
    if(!storyText.trim()){ alert('Pehle text likho jan!'); return; }
    setLoading(true)
    try{
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'x-user-email':'murad@lifeai.com', 'x-is-god':'true'},
        body: JSON.stringify({ text: storyText, voice: selectedVoice, noWatermark: true, isUnlimited: true })
      })
      const blob = await res.blob().catch(()=>null)
      let url = ''
      if(blob) url = URL.createObjectURL(blob)
      else url = 'GOD-MODE-AUDIO'

      setAudioUrl(url)
      // SAVE TO FILES - Admin ki files me
      const newFile = { id: Date.now(), text: storyText.slice(0,40), voice: selectedVoice, url, date: new Date().toLocaleString() }
      const updated = [newFile, ...myFiles]
      setMyFiles(updated)
      localStorage.setItem('lifeai_my_files', JSON.stringify(updated))
      
      if(blob){ const a = new Audio(url); a.play() }
      alert('✅ GOD MODE Video Ready jan! Files me save ho gaya!')
    } catch(e){ alert('Error jan') }
    setLoading(false)
  }

  const savePricing = async () => {
    localStorage.setItem('lifeai_pricing', JSON.stringify(pricing))
    localStorage.setItem('lifeai_unlimited', String(isUnlimited))
    await fetch('/api/admin/pricing', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ pricing, unlimited: isUnlimited }) })
    alert('✅ Pricing Updated jan!')
  }

  if(!auth){
    return (
      <div style={{background:THEME.bg, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>
        <div style={{textAlign:'center', width:'320px', background:THEME.card, padding:'20px', borderRadius:'14px', border:`1px solid ${THEME.border}`}}>
          <h2 style={{fontSize:'16px', fontWeight:800}}>🔱 GOD MODE LOGIN</h2>
          <input type="password" value={godInput} onChange={e=>setGodInput(e.target.value)} placeholder="GOD KEY" style={{width:'100%', marginTop:'12px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'10px', borderRadius:'8px', color:'white'}}/>
          <button onClick={checkGod} style={{marginTop:'10px', width:'100%', background:THEME.primary, padding:'10px', borderRadius:'999px', border:'none', color:'white', fontWeight:700}}>Unlock</button>
        </div>
      </div>
    )
  }

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
    <div style={{background:THEME.bg, minHeight:'100vh', color:'white', fontFamily:'system-ui', paddingBottom:'20px'}}>
      {/* HEADER TABS */}
      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px', alignItems:'center', borderBottom:`1px solid ${THEME.border}`}}>
        <h1 style={{fontSize:'14px', fontWeight:800}}>🔱 GOD - {tab === 'create' ? 'My Studio' : 'Control Panel'}</h1>
        <div style={{display:'flex', gap:'6px'}}>
          <button onClick={()=>setTab('create')} style={{background: tab==='create'?THEME.primary:THEME.pillInactive, padding:'5px 12px', borderRadius:'999px', fontSize:'11px', border:'none', color:'white'}}>🎬 Create</button>
          <button onClick={()=>setTab('control')} style={{background: tab==='control'?THEME.primary:THEME.pillInactive, padding:'5px 12px', borderRadius:'999px', fontSize:'11px', border:'none', color:'white'}}>⚙️ Control</button>
        </div>
      </div>

      {tab === 'create' ? (
        <>
          {/* SAME AS DASHBOARD - BUT GOD MODE */}
          <div style={{textAlign:'center', marginTop:'12px'}}>
            <p style={{fontSize:'11px', color:THEME.accent}}>GOD MODE - Unlimited, No Watermark</p>
          </div>

          <div style={{background:THEME.card, borderRadius:'14px', margin:'14px', padding:'10px', border:`1px solid ${THEME.border}`}}>
            <textarea placeholder="Enter your video idea, script, or blog link... (GOD MODE)" value={storyText} onChange={e=>setStoryText(e.target.value)} style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'12px', minHeight:'70px', resize:'none'}}></textarea>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px', alignItems:'center'}}>
              <span style={{fontSize:'11px', color:THEME.muted}}>♾️ GOD - No Limits</span>
              <button onClick={handleCreate} disabled={loading} style={{background:THEME.primary, color:'white', border:'none', padding:'7px 14px', borderRadius:'999px', fontSize:'11px', fontWeight:700}}>{loading?'...Generating':'✦ Generate GOD →'}</button>
            </div>
            {audioUrl && <audio controls src={audioUrl} style={{width:'100%', height:'36px', marginTop:'10px'}}></audio>}
          </div>

          <div style={{margin:'0 14px'}}><VoiceSelector text={storyText} selectedVoice={selectedVoice} onVoiceChange={setSelectedVoice} /></div>

          <p style={{fontSize:'10px', color:THEME.muted, padding:'0 14px', margin:'16px 0 8px', letterSpacing:'1px'}}>VIDEO WORKFLOWS - GOD MODE ACTIVE</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 10px'}}>
            {items.map((x,j)=>(
              <div key={j} style={{borderRadius:'12px', height:'140px', position:'relative', overflow:'hidden', background:THEME.card, border:`1px solid ${THEME.border}`}}>
                <img src={x.i} alt={x.t} style={{position:'absolute', right:0, top:0, width:'62%', height:'100%', objectFit:'cover', opacity:0.9}}/>
                <div style={{position:'absolute', inset:0, background:`linear-gradient(to right, ${THEME.bg} 0%, ${THEME.card} 45%, transparent 80%)`}}></div>
                <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'78px', lineHeight:'1.2'}}>{x.t}</p>
                <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:THEME.accent}}>GOD Try →</p>
              </div>
            ))}
          </div>

          {/* MY FILES - Admin ke files */}
          <div style={{margin:'20px 14px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'14px'}}>
            <h3 style={{fontSize:'13px', fontWeight:700}}>📁 My GOD Files ({myFiles.length})</h3>
            {myFiles.length===0 ? <p style={{fontSize:'11px', color:THEME.muted, marginTop:'8px'}}>Abhi koi file nahi jan, generate karo</p> : myFiles.map(f=>(
              <div key={f.id} style={{background:THEME.bg, padding:'8px', borderRadius:'8px', marginTop:'8px', display:'flex', justifyContent:'space-between'}}>
                <span style={{fontSize:'11px'}}>{f.text}...</span><span style={{fontSize:'9px', color:THEME.muted}}>{f.date}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* CONTROL PANEL TAB */
        <div style={{padding:'14px', display:'grid', gap:'16px'}}>
          <div style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'16px'}}>
            <h3 style={{fontSize:'14px', fontWeight:700}}>♾️ Unlimited Mode</h3>
            <button onClick={()=>setIsUnlimited(!isUnlimited)} style={{marginTop:'10px', background: isUnlimited ? THEME.primary : THEME.border, padding:'6px 14px', borderRadius:'999px', fontSize:'12px', border:'none', color:'white'}}>
              {isUnlimited ? 'ON - All Free, Unlimited' : 'OFF - Limits Active'}
            </button>
          </div>
          <div style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'16px'}}>
            <h3 style={{fontSize:'14px', fontWeight:700}}>💰 Pricing Control</h3>
            <div style={{marginTop:'12px', display:'grid', gap:'10px'}}>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px'}}><p style={{fontSize:'12px'}}>Free: <input type="number" value={pricing.free.limit} onChange={e=>setPricing({...pricing, free:{...pricing.free, limit: parseInt(e.target.value)}})} style={{width:'50px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'3px', color:'white', marginLeft:'6px'}}/> /day</p></div>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px'}}><p style={{fontSize:'12px'}}>Standard: <input type="number" value={pricing.standard.price} onChange={e=>setPricing({...pricing, standard:{...pricing.standard, price: parseInt(e.target.value)}})} style={{width:'70px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'3px', color:'white', marginLeft:'6px'}}/> PKR</p></div>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px'}}><p style={{fontSize:'12px'}}>Premium: <input type="number" value={pricing.premium.price} onChange={e=>setPricing({...pricing, premium:{...pricing.premium, price: parseInt(e.target.value)}})} style={{width:'70px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'3px', color:'white', marginLeft:'6px'}}/> PKR</p></div>
            </div>
            <button onClick={savePricing} style={{marginTop:'14px', background:THEME.primary, color:'white', border:'none', padding:'10px 20px', borderRadius:'999px', fontWeight:700, fontSize:'13px', width:'100%'}}>💾 1 Click Save</button>
          </div>
        </div>
      )}
    </div>
  )
}
