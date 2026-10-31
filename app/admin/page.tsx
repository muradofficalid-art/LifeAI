'use client'
import { useState, useEffect } from 'react'
import VoiceSelector from '@/components/VoiceSelector'

const THEME = { bg:'#0E0A1F', card:'#1A1630', border:'#2A2347', primary:'#FF1E5E', accent:'#C9B8FF', muted:'#8B86A0', pill:'#1E1A32' }

export default function AdminGodPanel(){
  const [auth, setAuth] = useState(false)
  const [godInput, setGodInput] = useState("")
  const [tab, setTab] = useState('create') // create | control | users | analytics | complaints | payments

  // CREATE STUDIO - Same as Dashboard
  const [storyText, setStoryText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('ur-PK-AsadNeural')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [myFiles, setMyFiles] = useState<any[]>([])

  // CONTROL
  const [pricing, setPricing] = useState({ free:{limit:2}, standard:{price:8000}, premium:{price:15000} })
  const [isUnlimited, setIsUnlimited] = useState(true)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState('20')

  // FAKE DATA - Live ban jayega baad me jan
  const [users] = useState([
    {id:1, email:'ali@gmail.com', plan:'free', videosToday:2, totalVideos:15, status:'active', join:'2025-10-29', extraMins:0},
    {id:2, email:'sana@yahoo.com', plan:'standard', videosToday:8, totalVideos:120, status:'active', join:'2025-10-28', extraMins:30},
    {id:3, email:'user123@gmail.com', plan:'free', videosToday:0, totalVideos:1, status:'blocked', join:'2025-10-30', extraMins:0},
  ])
  const [complaints, setComplaints] = useState([
    {id:1, user:'ali@gmail.com', msg:'Voice slow hai jan', date:'Today', status:'pending'},
    {id:2, user:'sana@yahoo.com', msg:'Video download nahi ho rahi', date:'Yesterday', status:'resolved'},
  ])
  const [dailyVideos] = useState({today:47, yesterday:32, total:1240})
  const [payments] = useState({today:16000, month:245000, total:1250000, subs: {free: 342, standard: 89, premium: 34}})
  const [userActivity, setUserActivity] = useState<any[]>([
    {time:'12:41 PM', user:'ali@gmail.com', action:'Generated Video - Script to Video'},
    {time:'12:38 PM', user:'sana@yahoo.com', action:'Voiceover - 2 min'},
    {time:'12:30 PM', user:'newuser@gmail.com', action:'Signed Up - Free Plan'},
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
      setUserActivity([{time:new Date().toLocaleTimeString(), user:'GOD (You)', action:`Generated - ${storyText.slice(0,20)}`}, ...userActivity])
    }catch{}
    setLoading(false)
  }

  const savePricing = async () => {
    localStorage.setItem('lifeai_pricing', JSON.stringify(pricing))
    localStorage.setItem('lifeai_unlimited', String(isUnlimited))
    await fetch('/api/admin/pricing', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ pricing, unlimited: isUnlimited }) })
    alert('✅ Saved jan!')
  }

  const generateCoupon = () => {
    const code = 'LIFEAI' + Math.random().toString(36).substring(2,7).toUpperCase() + discount
    setCoupon(code)
    alert(`Coupon Generated jan: ${code} - ${discount}% OFF`)
  }

  if(!auth){
    return <div style={{background:THEME.bg, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}><div style={{width:'320px', background:THEME.card, padding:'20px', borderRadius:'14px', border:`1px solid ${THEME.border}`, textAlign:'center'}}><h2>🔱 GOD LOGIN</h2><input type="password" value={godInput} onChange={e=>setGodInput(e.target.value)} placeholder="GOD KEY" style={{width:'100%', marginTop:'12px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'10px', borderRadius:'8px', color:'white'}}/><button onClick={checkGod} style={{marginTop:'10px', width:'100%', background:THEME.primary, padding:'10px', borderRadius:'999px', border:'none', color:'white', fontWeight:700}}>Unlock</button></div></div>
  }

  return(
    <div style={{background:THEME.bg, minHeight:'100vh', color:'white', fontFamily:'system-ui', paddingBottom:'20px'}}>
      <div style={{display:'flex', gap:'6px', padding:'12px', overflowX:'auto', borderBottom:`1px solid ${THEME.border}`, position:'sticky', top:0, background:THEME.bg, zIndex:10}}>
        {[
          {id:'create', l:'🎬 Studio'},
          {id:'control', l:'⚙️ Control'},
          {id:'analytics', l:'📊 Analytics'},
          {id:'users', l:'👥 Users'},
          {id:'payments', l:'💳 Payments'},
          {id:'complaints', l:'🚨 Complaints'},
          {id:'activity', l:'🔍 Live Activity'},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background: tab===t.id?THEME.primary:THEME.pill, padding:'6px 14px', borderRadius:'999px', fontSize:'11px', border:'none', color:'white', whiteSpace:'nowrap', fontWeight: tab===t.id?700:400}}>{t.l}</button>
        ))}
      </div>

      {tab==='create' && (
        <div>
          <div style={{background:THEME.card, borderRadius:'14px', margin:'14px', padding:'10px', border:`1px solid ${THEME.border}`}}>
            <textarea placeholder="Enter script... (GOD - No watermark, Unlimited)" value={storyText} onChange={e=>setStoryText(e.target.value)} style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'12px', minHeight:'70px', resize:'none'}}></textarea>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px', alignItems:'center'}}>
              <span style={{fontSize:'10px', color:THEME.muted}}>♾️ GOD FILES: {myFiles.length}</span>
              <button onClick={handleCreate} disabled={loading} style={{background:THEME.primary, color:'white', border:'none', padding:'7px 14px', borderRadius:'999px', fontSize:'11px', fontWeight:700}}>{loading?'...':'✦ Generate GOD →'}</button>
            </div>
            {audioUrl && <audio controls src={audioUrl} style={{width:'100%', height:'36px', marginTop:'10px'}}></audio>}
          </div>
          <div style={{margin:'0 14px'}}><VoiceSelector text={storyText} selectedVoice={selectedVoice} onVoiceChange={setSelectedVoice} /></div>
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
          <div style={{background:THEME.card, borderRadius:'12px', padding:'14px', border:`1px solid ${THEME.border}`}}>
            <h3>🎟️ Discount Coupon</h3>
            <div style={{display:'flex', gap:'8px', marginTop:'10px'}}>
              <input value={discount} onChange={e=>setDiscount(e.target.value)} placeholder="20" style={{width:'60px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'8px', borderRadius:'8px', color:'white'}}/>
              <span style={{alignSelf:'center', fontSize:'12px'}}>% OFF</span>
              <button onClick={generateCoupon} style={{background:THEME.primary, padding:'8px 14px', borderRadius:'8px', border:'none', color:'white', fontSize:'12px'}}>Generate</button>
            </div>
            {coupon && <div style={{marginTop:'10px', background:THEME.bg, padding:'10px', borderRadius:'8px', fontSize:'13px', fontWeight:700, color:THEME.accent}}>🎉 {coupon}</div>}
            <input placeholder="Kis user ko dena hai? email likho" style={{marginTop:'10px', width:'100%', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'10px', borderRadius:'8px', color:'white', fontSize:'12px'}}/>
            <button style={{marginTop:'8px', width:'100%', background:THEME.pill, padding:'8px', borderRadius:'8px', border:`1px solid ${THEME.border}`, color:'white', fontSize:'12px'}}>📧 Send Discount</button>
          </div>
          <div style={{background:THEME.card, borderRadius:'12px', padding:'14px', border:`1px solid ${THEME.border}`}}>
            <h3>⏱️ Extra Minutes Control</h3>
            <div style={{display:'flex', gap:'8px', marginTop:'10px'}}>
              <input placeholder="User email" style={{flex:1, background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'8px', borderRadius:'8px', color:'white', fontSize:'12px'}}/>
              <input placeholder="30" style={{width:'50px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'8px', borderRadius:'8px', color:'white', fontSize:'12px'}}/>
              <button style={{background:THEME.primary, padding:'8px 12px', borderRadius:'8px', border:'none', color:'white', fontSize:'11px'}}>Add</button>
            </div>
          </div>
        </div>
      )}

      {tab==='analytics' && (
        <div style={{padding:'14px', display:'grid', gap:'12px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><p style={{fontSize:'10px', color:THEME.muted}}>TOTAL USERS</p><p style={{fontSize:'22px', fontWeight:800, marginTop:'4px'}}>{payments.subs.free + payments.subs.standard + payments.subs.premium}</p><p style={{fontSize:'10px', color:'#00FF88'}}>Active: 187</p></div>
            <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><p style={{fontSize:'10px', color:THEME.muted}}>VIDEOS TODAY</p><p style={{fontSize:'22px', fontWeight:800, marginTop:'4px'}}>{dailyVideos.today}</p><p style={{fontSize:'10px', color:THEME.accent}}>Yesterday: {dailyVideos.yesterday}</p></div>
            <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><p style={{fontSize:'10px', color:THEME.muted}}>TOTAL VIDEOS</p><p style={{fontSize:'22px', fontWeight:800, marginTop:'4px'}}>{dailyVideos.total}</p></div>
            <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}><p style={{fontSize:'10px', color:THEME.muted}}>TODAY EARNING</p><p style={{fontSize:'22px', fontWeight:800, marginTop:'4px', color:'#00FF88'}}>{payments.today} PKR</p></div>
          </div>
          <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}>
            <h3 style={{fontSize:'13px'}}>📈 Subscription Breakdown</h3>
            <div style={{marginTop:'10px', display:'grid', gap:'6px', fontSize:'12px'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span>Free: {payments.subs.free}</span><span style={{color:THEME.muted}}>73%</span></div>
              <div style={{display:'flex', justifyContent:'space-between'}}><span>Standard: {payments.subs.standard}</span><span style={{color:THEME.muted}}>19%</span></div>
              <div style={{display:'flex', justifyContent:'space-between'}}><span>Premium: {payments.subs.premium}</span><span style={{color:THEME.accent}}>7%</span></div>
            </div>
          </div>
        </div>
      )}

      {tab==='users' && (
        <div style={{padding:'14px'}}>
          <input placeholder="🔍 Search user email..." style={{width:'100%', background:THEME.card, border:`1px solid ${THEME.border}`, padding:'10px', borderRadius:'10px', color:'white', fontSize:'12px', marginBottom:'12px'}}/>
          {users.map(u=>(
            <div key={u.id} style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'12px', padding:'12px', marginBottom:'10px'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:'12px', fontWeight:700}}>{u.email}</span><span style={{fontSize:'9px', background: u.status==='active'?'#00FF8820':'#FF1E5E20', color: u.status==='active'?'#00FF88':THEME.primary, padding:'3px 8px', borderRadius:'999px'}}>{u.status}</span></div>
              <p style={{fontSize:'10px', color:THEME.muted, marginTop:'4px'}}>{u.plan} | Today: {u.videosToday} | Total: {u.totalVideos} | Extra: {u.extraMins}m | Joined: {u.join}</p>
              <div style={{display:'flex', gap:'6px', marginTop:'8px'}}>
                <button style={{fontSize:'10px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'5px 10px', borderRadius:'999px', color:'white'}}>🎁 Discount</button>
                <button style={{fontSize:'10px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'5px 10px', borderRadius:'999px', color:'white'}}>+30 Mins</button>
                <button style={{fontSize:'10px', background: u.status==='active'?THEME.primary:'#00FF88', border:'none', padding:'5px 10px', borderRadius:'999px', color:'white'}}>{u.status==='active'?'Block':'Unblock'}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='payments' && (
        <div style={{padding:'14px', display:'grid', gap:'12px'}}>
          <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}>
            <h3>💳 Payments Overview</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'12px'}}>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px'}}><p style={{fontSize:'10px', color:THEME.muted}}>TODAY</p><p style={{fontSize:'16px', fontWeight:700}}>{payments.today} PKR</p></div>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px'}}><p style={{fontSize:'10px', color:THEME.muted}}>THIS MONTH</p><p style={{fontSize:'16px', fontWeight:700}}>{payments.month} PKR</p></div>
              <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px', gridColumn:'span 2'}}><p style={{fontSize:'10px', color:THEME.muted}}>TOTAL LIFETIME</p><p style={{fontSize:'18px', fontWeight:800, color:'#00FF88'}}>{payments.total} PKR</p></div>
            </div>
          </div>
          <div style={{background:THEME.card, padding:'14px', borderRadius:'12px', border:`1px solid ${THEME.border}`}}>
            <h3 style={{fontSize:'13px'}}>Recent Transactions</h3>
            {[
              {email:'sana@yahoo.com', plan:'Premium', amt:'15000', date:'Today 12:30 PM'},
              {email:'ali@gmail.com', plan:'Standard', amt:'8000', date:'Today 11:20 AM'},
              {email:'user99@gmail.com', plan:'Standard', amt:'8000', date:'Yesterday'},
            ].map((p,i)=><div key={i} style={{display:'flex', justifyContent:'space-between', background:THEME.bg, padding:'10px', borderRadius:'8px', marginTop:'8px', fontSize:'11px'}}><span>{p.email} - {p.plan}</span><span style={{color:'#00FF88', fontWeight:700}}>{p.amt} PKR</span></div>)}
          </div>
        </div>
      )}

      {tab==='complaints' && (
        <div style={{padding:'14px'}}>
          {complaints.map(c=>(
            <div key={c.id} style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'12px', padding:'12px', marginBottom:'10px'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:'12px', fontWeight:600}}>{c.user}</span><span style={{fontSize:'9px', background: c.status==='pending'?'#FFC80020':'#00FF8820', color: c.status==='pending'?'#FFC800':'#00FF88', padding:'3px 8px', borderRadius:'999px'}}>{c.status}</span></div>
              <p style={{fontSize:'11px', marginTop:'6px'}}>{c.msg}</p>
              <p style={{fontSize:'9px', color:THEME.muted, marginTop:'4px'}}>{c.date}</p>
              <div style={{display:'flex', gap:'6px', marginTop:'8px'}}>
                <button onClick={()=>setComplaints(complaints.map(x=> x.id===c.id ? {...x, status:'resolved'}:x))} style={{fontSize:'10px', background:THEME.primary, border:'none', padding:'5px 12px', borderRadius:'999px', color:'white'}}>Resolve</button>
                <button style={{fontSize:'10px', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'5px 12px', borderRadius:'999px', color:'white'}}>Reply</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='activity' && (
        <div style={{padding:'14px'}}>
          <div style={{background:THEME.card, borderRadius:'12px', padding:'14px', border:`1px solid ${THEME.border}`}}>
            <h3 style={{fontSize:'13px'}}>🔴 Live User Activity</h3>
            {userActivity.map((a,i)=><div key={i} style={{display:'flex', gap:'10px', marginTop:'10px', fontSize:'11px', background:THEME.bg, padding:'8px', borderRadius:'8px'}}><span style={{color:THEME.muted, fontSize:'10px'}}>{a.time}</span><span style={{color:THEME.accent}}>{a.user}</span><span>{a.action}</span></div>)}
          </div>
        </div>
      )}
    </div>
  )
}
