'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState('');
  const router = useRouter()
  const handle = (e:any)=>{
    e.preventDefault();
    const saved = localStorage.getItem('lifeai_user');
    if(saved){ localStorage.setItem('lifeai_auth','true'); router.push('/dashboard') }
    else { alert('Pehle Signup karo jan!'); router.push('/signup') }
  }
  return (
    <div style={{minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>
      <form onSubmit={handle} style={{background:'#1A1A1A', padding:'32px', borderRadius:'16px', width:'360px', border:'1px solid #222'}}>
        <h2 style={{fontSize:'22px', fontWeight:800, textAlign:'center'}}>Welcome back - <span style={{color:'#FF2E7E'}}>Life-AI</span></h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" required style={{width:'100%', marginTop:'20px', padding:'12px', borderRadius:'8px', background:'#222', border:'1px solid #333', color:'white'}}/>
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" required style={{width:'100%', marginTop:'12px', padding:'12px', borderRadius:'8px', background:'#222', border:'1px solid #333', color:'white'}}/>
        <button type="submit" style={{width:'100%', marginTop:'20px', background:'#FF2E7E', color:'white', padding:'12px', borderRadius:'999px', border:'none', fontWeight:700}}>Login → Dashboard</button>
        <p style={{fontSize:'12px', textAlign:'center', marginTop:'12px', color:'#888'}}>No account? <a href="/signup" style={{color:'#FF2E7E'}}>Sign Up</a></p>
      </form>
    </div>
  )
}
