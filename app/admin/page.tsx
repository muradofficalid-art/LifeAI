'use client'
import { useState, useEffect } from 'react'

const THEME = { bg:'#0E0A1F', card:'#1A1630', border:'#2A2347', primary:'#FF1E5E', accent:'#C9B8FF', muted:'#8B86A0' }

const GOD_EMAIL = "murad@lifeai.com"

export default function AdminPanel(){
  const [auth, setAuth] = useState(false)
  const [email, setEmail] = useState("")
  const [godInput, setGodInput] = useState("")
  
  const [pricing, setPricing] = useState({
    free: { limit: 5, label: "Free (5/day)" },
    standard: { price: 8000, long: 60, short: 60, label: "Standard" },
    premium: { price: 15000, long: 120, short: 120, label: "Premium" }
  })
  const [isUnlimited, setIsUnlimited] = useState(true)

  useEffect(()=>{
    const savedEmail = localStorage.getItem('lifeai_user_email') || ""
    setEmail(savedEmail)
    if(savedEmail === GOD_EMAIL || savedEmail === "murad@gmail.com" || savedEmail.toLowerCase().includes("murad")) {
      setAuth(true)
    }
  },[])

  const checkGodKey = () => {
    if(godInput === "LifeAI@Murad786"){
      setAuth(true)
      localStorage.setItem('lifeai_user_email', 'murad@lifeai.com')
    } else {
      alert('Galat KEY jan! Sahi hai: LifeAI@Murad786')
    }
  }

  const savePricing = async () => {
    localStorage.setItem('lifeai_pricing', JSON.stringify(pricing))
    localStorage.setItem('lifeai_unlimited', String(isUnlimited))
    await fetch('/api/admin/pricing', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ pricing, unlimited: isUnlimited })
    })
    alert('✅ Pricing Updated! 1 Click me ho gaya jan!')
  }

  if(!auth){
    return (
      <div style={{background:THEME.bg, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'white', padding:'20px'}}>
        <div style={{textAlign:'center', width:'100%', maxWidth:'320px'}}>
          <h1 style={{fontSize:'24px', fontWeight:800}}>404</h1>
          <p style={{color:THEME.muted, fontSize:'12px', marginTop:'8px'}}>Page Not Found</p>
          <div style={{marginTop:'24px', background:THEME.card, border:`1px solid ${THEME.border}`, padding:'16px', borderRadius:'14px'}}>
            <p style={{fontSize:'11px', color:THEME.accent, marginBottom:'8px'}}>🔱 GOD MODE LOGIN</p>
            <input type="password" placeholder="GOD KEY = LifeAI@Murad786" value={godInput} onChange={e=>setGodInput(e.target.value)} style={{width:'100%', background:THEME.bg, border:`1px solid ${THEME.border}`, padding:'10px', borderRadius:'8px', color:'white', fontSize:'12px'}}/>
            <button onClick={checkGodKey} style={{marginTop:'10px', width:'100%', background:THEME.primary, border:'none', padding:'10px', borderRadius:'999px', color:'white', fontWeight:700, fontSize:'12px'}}>Unlock GOD MODE</button>
            <p style={{fontSize:'9px', color:THEME.muted, marginTop:'8px'}}>Key: LifeAI@Murad786</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{background:THEME.bg, minHeight:'100vh', color:'white', padding:'20px', fontFamily:'system-ui'}}>
      <h1 style={{fontSize:'22px', fontWeight:800}}>🔱 GOD MODE - Admin Panel</h1>
      <p style={{fontSize:'11px', color:THEME.accent, marginTop:'4px'}}>Logged as: {email} - lifeai.com/admin</p>

      <div style={{marginTop:'20px', display:'grid', gap:'16px'}}>

        <div style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'16px'}}>
          <h3 style={{fontSize:'14px', fontWeight:700}}>♾️ Unlimited Mode</h3>
          <div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'10px'}}>
            <button onClick={()=>setIsUnlimited(!isUnlimited)} style={{background: isUnlimited ? THEME.primary : THEME.border, padding:'6px 14px', borderRadius:'999px', fontSize:'12px', border:'none', color:'white'}}>
              {isUnlimited ? 'ON - All Free, Unlimited' : 'OFF - Limits Active'}
            </button>
            <span style={{fontSize:'11px', color:THEME.muted}}>{isUnlimited ? 'Tumhare liye sab free hai jan' : 'Users ke liye limits'}</span>
          </div>
        </div>

        <div style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'16px'}}>
          <h3 style={{fontSize:'14px', fontWeight:700}}>💰 Pricing Control - 1 Click Change</h3>
          <div style={{marginTop:'14px', display:'grid', gap:'12px'}}>
            <div style={{background:THEME.bg, padding:'12px', borderRadius:'10px', border:`1px solid ${THEME.border}`}}>
              <p style={{fontSize:'12px', fontWeight:600}}>Free Plan</p>
              <div style={{display:'flex', gap:'8px', marginTop:'8px', alignItems:'center'}}>
                <span style={{fontSize:'11px', color:THEME.muted}}>Videos/Day:</span>
                <input type="number" value={pricing.free.limit} onChange={e=>setPricing({...pricing, free:{...pricing.free, limit: parseInt(e.target.value) || 0}})} style={{width:'60px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white'}}/>
              </div>
            </div>
            <div style={{background:THEME.bg, padding:'12px', borderRadius:'10px', border:`1px solid ${THEME.border}`}}>
              <p style={{fontSize:'12px', fontWeight:600}}>Standard - {pricing.standard.price} PKR</p>
              <div style={{display:'flex', gap:'8px', marginTop:'8px', flexWrap:'wrap'}}>
                <div><span style={{fontSize:'10px', color:THEME.muted}}>Price:</span><input type="number" value={pricing.standard.price} onChange={e=>setPricing({...pricing, standard:{...pricing.standard, price: parseInt(e.target.value) || 0}})} style={{width:'70px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white', marginLeft:'4px'}}/></div>
                <div><span style={{fontSize:'10px', color:THEME.muted}}>Long:</span><input type="number" value={pricing.standard.long} onChange={e=>setPricing({...pricing, standard:{...pricing.standard, long: parseInt(e.target.value) || 0}})} style={{width:'50px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white', marginLeft:'4px'}}/></div>
                <div><span style={{fontSize:'10px', color:THEME.muted}}>Short:</span><input type="number" value={pricing.standard.short} onChange={e=>setPricing({...pricing, standard:{...pricing.standard, short: parseInt(e.target.value) || 0}})} style={{width:'50px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white', marginLeft:'4px'}}/></div>
              </div>
            </div>
            <div style={{background:THEME.bg, padding:'12px', borderRadius:'10px', border:`1px solid ${THEME.border}`}}>
              <p style={{fontSize:'12px', fontWeight:600}}>Premium - {pricing.premium.price} PKR</p>
              <div style={{display:'flex', gap:'8px', marginTop:'8px', flexWrap:'wrap'}}>
                <div><span style={{fontSize:'10px', color:THEME.muted}}>Price:</span><input type="number" value={pricing.premium.price} onChange={e=>setPricing({...pricing, premium:{...pricing.premium, price: parseInt(e.target.value) || 0}})} style={{width:'70px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white', marginLeft:'4px'}}/></div>
                <div><span style={{fontSize:'10px', color:THEME.muted}}>Long:</span><input type="number" value={pricing.premium.long} onChange={e=>setPricing({...pricing, premium:{...pricing.premium, long: parseInt(e.target.value) || 0}})} style={{width:'50px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white', marginLeft:'4px'}}/></div>
                <div><span style={{fontSize:'10px', color:THEME.muted}}>Short:</span><input type="number" value={pricing.premium.short} onChange={e=>setPricing({...pricing, premium:{...pricing.premium, short: parseInt(e.target.value) || 0}})} style={{width:'50px', background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'6px', padding:'4px', color:'white', marginLeft:'4px'}}/></div>
              </div>
            </div>
          </div>
          <button onClick={savePricing} style={{marginTop:'16px', background:THEME.primary, color:'white', border:'none', padding:'10px 20px', borderRadius:'999px', fontWeight:700, fontSize:'13px', width:'100%'}}>
            💾 1 Click Save - Update All Users
          </button>
        </div>

        <div style={{background:THEME.card, border:`1px solid ${THEME.border}`, borderRadius:'14px', padding:'16px'}}>
          <h3 style={{fontSize:'14px', fontWeight:700}}>📊 Live Stats</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'10px'}}>
            <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px', textAlign:'center'}}><p style={{fontSize:'18px', fontWeight:800}}>--</p><p style={{fontSize:'10px', color:THEME.muted}}>Total Users</p></div>
            <div style={{background:THEME.bg, padding:'10px', borderRadius:'8px', textAlign:'center'}}><p style={{fontSize:'18px', fontWeight:800}}>--</p><p style={{fontSize:'10px', color:THEME.muted}}>Videos Today</p></div>
          </div>
        </div>

      </div>
    </div>
  )
}
