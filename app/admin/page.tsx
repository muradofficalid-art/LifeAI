'use client'
import { useState, useEffect } from 'react'
import VoiceSelector from '@/components/VoiceSelector'

const THEME = { bg:'#0E0A1F', card:'#1A1630', border:'#2A2347', primary:'#FF1E5E', accent:'#C9B8FF', muted:'#8B86A0', pill:'#1E1A32' }

export default function AdminGodPanel(){
  const [auth, setAuth] = useState(false)
  const [godInput, setGodInput] = useState("")
  const [tab, setTab] = useState('create')
  const [storyText, setStoryText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('ur-PK-AsadNeural')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [myFiles, setMyFiles] = useState<any[]>([])
  const [pricing, setPricing] = useState({ free:{limit:2}, standard:{price:8000}, premium:{price:15000} })
  const [isUnlimited, setIsUnlimited] = useState(true)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState('20')
  const [users] = useState([
    {id:1, email:'ali@gmail.com', plan:'free', videosToday:2, totalVideos:15, status:'active', join:'2025-10-29', extraMins:0},
    {id:2, email:'sana@yahoo.com', plan:'standard', videosToday:8, totalVideos:120, status:'active', join:'2025-10-28', extraMins:30},
  ])
  const [complaints, setComplaints] = useState([
    {id:1, user:'ali@gmail.com', msg:'Voice slow hai jan', date:'Today', status:'pending'},
  ])
  const [dailyVideos] = useState({today:47, yesterday:32, total:1240})
  const [payments] = useState({today:16000, month:245000, total:1250000, subs: {free: 342, standard: 89, premium: 34}})
  const [userActivity, setUserActivity] = useState<any[]>([
    {time:'12:41 PM', user:'ali@gmail.com', action:'Generated Video'},
  ])

  useEffect(()=>{
    const email = localStorage.getItem('lifeai_user_email') || ""
    if(email.includes('murad')) setAuth(true)
    const saved = localStorage.getItem('lifeai_pricing')
    if(saved) try{ setPricing(JSON.parse(saved)) }catch{}
    const files = localStorage.getItem('lifeai_my_files')
    if(files) try{ setMyFiles(JSON.parse(files)) }catch{}
  },[])

  const checkGod = () => { if(godInput==="LifeAI@Murad786"){ setAuth(true); localStorage.setItem('lifeai_user_email','murad@lifeai.com') } else alert('Galat KEY jan!') }

  const handleCreate = async () => {
    if(!storyText.trim()){ alert('Text likho jan!'); return; }
    setLoading(true)
    try{
      const res = await fetch('/api/voice', { method:'POST', headers:{'Content-Type':'application/json','x-user-email':'murad@lifeai.com'}, body: JSON.stringify({ text: storyText, voice: selectedVoice, noWatermark:true }) })
      const blob = await res.blob().catch(()=>null)
      let url = blob ? URL.createObjectURL(blob) : ''
      setAudioUrl(url)
      const newFile = { id: Date.now(), text: storyText.slice(0,40), voice: selectedVoice, url, date: new Date().toLocaleString() }
      const updated = [newFile, ...myFiles]
      setMyFiles(updated)
      localStorage.setItem('lifeai_my_files', JSON.stringify(updated))
    }catch{}
    setLoading(false)
  }

  const savePricing = async () => {
    localStorage.setItem('lifeai_pricing', JSON.stringify(pricing))
    await fetch('/api/admin/pricing', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ pricing, unlimited: isUnlimited }) })
    alert('✅ Saved jan!')
  }

  if(!auth){
    return <div style={{background:THEME.bg, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}><div style={{width:'320px', background:THEME.card, padding:'20px', borderRadius:'14px', border:`1px solid ${THEME.border}`, textAlign:'center'}}><h2>🔱 GOD LOGIN</h2><input type="password" value={godInput} onChange={e=>setGodInput(e.target.value)} placeholder="GOD KEY" style={{width:'100%', marginTop:'12px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'10px', borderRadius:'8px', color:'white'}}/><button onClick={checkGod} style={{marginTop:'10px', width:'100%', background:THEME.primary, padding:'10px', borderRadius:'999px', border:'none', color:'white', fontWeight:700}}>Unlock</button></div></div>
  }

  return(
    <div style={{background:THEME.bg, minHeight:'100vh', color:'white', fontFamily:'system-ui', paddingBottom:'20px'}}>
      <div style={{display:'flex', gap:'6px', padding:'12px', overflowX:'auto', borderBottom:`1px solid ${THEME.border}`, position:'sticky', top:0, background:THEME.bg, zIndex:10}}>
        {[{id:'create', l:'🎬 Studio'},{id:'control', l:'⚙️ Control'},{id:'analytics', l:'📊 Analytics'},{id:'users', l:'👥 Users'},{id:'payments', l:'💳 Payments'},{id:'complaints', l:'🚨 Complaints'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background: tab===t.id?THEME.primary:THEME.pill, padding:'6px 14px', borderRadius:'999px', fontSize:'11px', border:'none', color:'white', whiteSpace:'nowrap'}}>{t.l}</button>
        ))}
      </div>

      {tab==='create' && (
        <div style={{paddingBottom:'80px'}}>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px', alignItems:'center'}}>
            <div style={{width:'20px', height:'20px', background:THEME.primary, borderRadius:'50%'}}></div>
            <div style={{background:THEME.primary, padding:'4px 10px', borderRadius:'999px', fontSize:'11px'}}>✦ Rg - GOD</div>
          </div>
          <div style={{textAlign:'center'}}>
            <p style={{fontSize:'11px', fontWeight:600, color:THEME.accent}}>Let's get started, GOD</p>
            <div style={{display:'flex', justifyContent:'center', gap:'6px', marginTop:'8px'}}>
              <span style={{background:THEME.primary, padding:'3px 10px', borderRadius:'999px', fontSize:'10px'}}>◉ Video</span>
              <span style={{background:THEME.pill, padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:THEME.muted, border:`1px solid ${THEME.border}`}}>Voiceover</span>
              <span style={{background:THEME.pill, padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:THEME.muted, border:`1px solid ${THEME.border}`}}>Design</span>
            </div>
          </div>
          <div style={{background:THEME.card, borderRadius:'14px', margin:'14px', padding:'10px', border:`1px solid ${THEME.border}`}}>
            <textarea placeholder="Enter your video idea, script, or blog link... (GOD - No Watermark)" value={storyText} onChange={e=>setStoryText(e.target.value)} style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'12px', minHeight:'44px', resize:'none'}}></textarea>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px', alignItems:'center'}}>
              <span style={{fontSize:'12px', color:THEME.muted}}>♾️ GOD FILES: {myFiles.length}</span>
              <button onClick={handleCreate} disabled={loading} style={{background:THEME.primary, color:'white', border:'none', padding:'6px 12px', borderRadius:'999px', fontSize:'11px', fontWeight:700}}>{loading ? '...Generating' : '✦ Generate GOD →'}</button>
            </div>
            {audioUrl && <audio controls src={audioUrl} style={{width:'100%', height:'36px', marginTop:'10px'}}></audio>}
          </div>
          <div style={{margin:'0 14px'}}><VoiceSelector text={storyText} selectedVoice={selectedVoice} onVoiceChange={setSelectedVoice} /></div>
          <p style={{fontSize:'10px', color:THEME.muted, padding:'0 14px', marginBottom:'8px', marginTop:'16px', letterSpacing:'1px'}}>VIDEO WORKFLOWS - GOD MODE</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 10px'}}>
            {[{t:'Script to video', i:'/workflows/1.jpg'},{t:'Avatar video', i:'/workflows/2.jpg'},{t:'PPT to video', i:'/workflows/3.jpg'},{t:'Explainer video', i:'/workflows/4.jpg'},{t:'Motion graphics explainer', i:'/workflows/5.jpg'},{t:'Music video', i:'/workflows/6.jpg'},{t:'Podcast video', i:'/workflows/7.jpg'},{t:'Product video', i:'/workflows/8.jpg'},{t:'Blog to video', i:'/workflows/9.jpg'},{t:'Swap Studio', i:'/workflows/10.jpg'}].map((x,j)=>(
              <div key={j} style={{borderRadius:'12px', height:'140px', position:'relative', overflow:'hidden', background:THEME.card, border:`1px solid ${THEME.border}`}}>
                <img src={x.i} alt={x.t} style={{position:'absolute', right:0, top:0, width:'62%', height:'100%', objectFit:'cover', opacity:0.9}}/>
                <div style={{position:'absolute', inset:0, background:`linear-gradient(to right, ${THEME.bg} 0%, ${THEME.card} 45%, transparent 80%)`}}></div>
                <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'78px', lineHeight:'1.2'}}>{x.t}</p>
                <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:THEME.accent}}>GOD Try now →</p>
              </div>
            ))}
          </div>
          <div style={{margin:'20px 14px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'14px'}}>
            <h3 style={{fontSize:'13px', fontWeight:700}}>📁 My GOD Files ({myFiles.length})</h3>
            {myFiles.map(f=><div key={f.id} style={{background:THEME.bg, padding:'8px', borderRadius:'8px', marginTop:'8px', fontSize:'11px'}}>{f.text}... - {f.date}</div>)}
          </div>
        </div>
      )}

      {tab==='control' && (
        <div style={{padding:'14px', display:'grid', gap:'14px'}}>
          <div style={{background:THEME.card, borderRadius:'12px', padding:'14px', border:`1px solid ${THEME.border}`}}>
            <h3>♾️ Unlimited Mode</h3><button onClick={()=>setIsUnlimited(!isUnlimited)} style={{marginTop:'10px', background: isUnlimited?THEME.primary:THEME.border, padding:'6px 14px', borderRadius:'999px', fontSize:'12px', border:'none', color:'white'}}>{isUnlimited?'ON - All Free':'OFF'}</button>
          </div>
          <div style={{background:THEME.card, borderRadius:'12px', padding:'14px', border:`1px solid ${THEME.border}`}}>
            <h3>💰 Pricing</h3>
            <div style={{display:'grid', gap:'8px', marginTop:'10px'}}>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px', fontSize:'12px'}}>Free: <input type="number" value={pricing.free.limit} onChange={e=>setPricing({...pricing, free:{limit:parseInt(e.target.value)}})} style={{width:'60px', background:THEME.card, border:`1px solid ${THEME.border}`, color:'white', borderRadius:'6px', padding:'4px', marginLeft:'8px'}}/> /day</div>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px', fontSize:'12px'}}>Standard: <input type="number" value={pricing.standard.price} onChange={e=>setPricing({...pricing, standard:{price:parseInt(e.target.value)}})} style={{width:'80px', background:THEME.card, border:`1px solid ${THEME.border}`, color:'white', borderRadius:'6px', padding:'4px', marginLeft:'8px'}}/> PKR</div>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px', fontSize:'12px'}}>Premium: <input type="number" value={pricing.premium.price} onChange={e=>setPricing({...pricing, premium:{price:parseInt(e.target.value)}})} style={{width:'80px', background:THEME.card, border:`1px solid ${THEME.border}`, color:'white', borderRadius:'6px', padding:'4px', marginLeft:'8px'}}/> PKR</div>
            </div>
            <button onClick={savePricing} style={{marginTop:'12px', width:'100%', background:THEME.primary, padding:'10px', borderRadius:'999px', border:'none', color:'white', fontWeight:700}}>💾 1 Click Save</button>
          </div>
        </div>
      )}

      {tab==='analytics' && (
        <div style={{padding:'14px', display:'grid', gap:'12px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><p style={{fontSize:'10px', color:THEME.muted}}>TOTAL USERS</p><p style={{fontSize:'22px', fontWeight:800}}>465</p></div>
            <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><p style={{fontSize:'10px', color:THEME.muted}}>VIDEOS TODAY</p><p style={{fontSize:'22px', fontWeight:800}}>{dailyVideos.today}</p></div>
          </div>
        </div>
      )}

      {tab==='users' && (
        <div style={{padding:'14px'}}>
          {users.map(u=><div key={u.id} style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'12px', padding:'12px', marginBottom:'10px'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:'12px', fontWeight:700}}>{u.email}</span><span style={{fontSize:'9px', background: u.status==='active'?'#00FF8820':'#FF1E5E20', padding:'3px 8px', borderRadius:'999px'}}>{u.status}</span></div><p style={{fontSize:'10px', color:THEME.muted, marginTop:'4px'}}>{u.plan} | Today: {u.videosToday} | Extra: {u.extraMins}m</p></div>)}
        </div>
      )}

      {tab==='payments' && <div style={{padding:'14px'}}><div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><h3>💳 Total: {payments.total} PKR</h3></div></div>}
      {tab==='complaints' && <div style={{padding:'14px'}}>{complaints.map(c=><div key={c.id} style={{background:THEME.card, padding:'12px', borderRadius:'12px', marginBottom:'10px', border:`1px solid ${THEME.border}`}}><span style={{fontSize:'12px'}}>{c.user}</span><p style={{fontSize:'11px', marginTop:'6px'}}>{c.msg}</p></div>)}</div>}
    </div>
  )
}
