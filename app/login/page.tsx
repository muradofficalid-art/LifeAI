'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login(){
  const [email,setEmail]=useState(''); 
  const [pass,setPass]=useState('');
  const [error,setError]=useState('');
  const router = useRouter()
  
  const handle = (e:any)=>{
    e.preventDefault();
    setError('');
    
    if(!email || !pass){
      setError('Email aur Password likho jan!');
      return;
    }

    const saved = localStorage.getItem('lifeai_user');
    if(!saved){ 
      setError('Pehle Signup karo jan! No account found');
      setTimeout(()=> router.push('/signup'), 1000);
      return;
    }
    
    try{
      const user = JSON.parse(saved);
      // Proper check
      if(user.email === email && user.pass === pass){
        localStorage.setItem('lifeai_auth','true');
        router.push('/dashboard')
      }else{
        setError('Galat Email ya Password jan! 😢');
      }
    }catch{
      setError('Account corrupt hai - dobara signup karo');
      localStorage.removeItem('lifeai_user');
    }
  }
  
  return (
    <div style={{minHeight:'100vh', background:'#0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>
      <form onSubmit={handle} style={{background:'#1A1A1A', padding:'32px', borderRadius:'16px', width:'360px', border:'1px solid #222'}}>
        <h2 style={{fontSize:'22px', fontWeight:800, textAlign:'center'}}>Welcome back - <span style={{color:'#FF2E7E'}}>Life-AI</span></h2>
        
        {error && <div style={{background:'#FF2E7E22', border:'1px solid #FF2E7E', color:'#FF8DB0', padding:'10px', borderRadius:'8px', fontSize:'12px', marginTop:'16px', textAlign:'center'}}>{error}</div>}
        
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" required style={{width:'100%', marginTop:'20px', padding:'12px', borderRadius:'8px', background:'#222', border:'1px solid #333', color:'white'}}/>
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" required style={{width:'100%', marginTop:'12px', padding:'12px', borderRadius:'8px', background:'#222', border:'1px solid #333', color:'white'}}/>
        <button type="submit" style={{width:'100%', marginTop:'20px', background:'#FF2E7E', color:'white', padding:'12px', borderRadius:'999px', border:'none', fontWeight:700, cursor:'pointer'}}>Login → Dashboard</button>
        <p style={{fontSize:'12px', textAlign:'center', marginTop:'12px', color:'#888'}}>No account? <a href="/signup" style={{color:'#FF2E7E'}}>Sign Up</a></p>
      </form>
    </div>
  )
}
