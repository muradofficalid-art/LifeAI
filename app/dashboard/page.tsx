'use client'
export default function Dashboard(){
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
    <div style={{background:'#0A0A0A', minHeight:'100vh', color:'white', fontFamily:'system-ui', paddingBottom:'80px'}}>
      
      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px', alignItems:'center'}}>
        <div style={{width:'20px', height:'20px', background:'#FF2E7E', borderRadius:'50%'}}></div>
        <div style={{background:'#FF2E7E', padding:'4px 10px', borderRadius:'999px', fontSize:'11px'}}>✦ Rg</div>
      </div>

      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'11px', fontWeight:600}}>Let's get started, public</p>
        <div style={{display:'flex', justifyContent:'center', gap:'6px', marginTop:'8px'}}>
          <span style={{background:'#FF2E7E', padding:'3px 10px', borderRadius:'999px', fontSize:'10px'}}>◉ Video</span>
          <span style={{background:'#222', padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:'#888'}}>Voiceover</span>
          <span style={{background:'#222', padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:'#888'}}>Design</span>
        </div>
      </div>

      <div style={{background:'#171717', borderRadius:'14px', margin:'14px', padding:'10px', border:'1px solid #222'}}>
        <textarea placeholder="Enter your video idea, script, or blog link..." style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'12px', minHeight:'44px', resize:'none'}}></textarea>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px', alignItems:'center'}}>
          <span style={{fontSize:'12px', color:'#666'}}>👤 ✦</span>
          <button style={{background:'#FF2E7E', color:'white', border:'none', padding:'6px 12px', borderRadius:'999px', fontSize:'11px', fontWeight:700}}>✦ Create →</button>
        </div>
      </div>

      <p style={{fontSize:'10px', color:'#888', padding:'0 14px', marginBottom:'8px'}}>Video workflows</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 10px'}}>
        {items.map((x,j)=>(
          <div key={j} style={{borderRadius:'12px', height:'140px', position:'relative', overflow:'hidden', background:'#111', border:'1px solid #222'}}>
            <img src={x.i} alt={x.t} style={{position:'absolute', right:0, top:0, width:'62%', height:'100%', objectFit:'cover'}}/>
            <div style={{position:'absolute', inset:0, background:'linear-gradient(to right, #000 0%, #000 40%, transparent 75%)'}}></div>
            <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'78px', lineHeight:'1.2'}}>{x.t}</p>
            <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.7}}>Try it now →</p>
          </div>
        ))}
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#111', borderTop:'1px solid #222', display:'flex', justifyContent:'space-around', padding:'7px 0'}}>
        {['Home','Files','Characters','Series','Playground','Templates','Resources'].map((l,i)=>(
          <div key={l} style={{textAlign:'center'}}><div style={{fontSize:'13px', color: i===0?'#FF2E7E':'#666'}}>{i===0?'🏠':'📁'}</div><div style={{fontSize:'7px', color: i===0?'white':'#666'}}>{l}</div></div>
        ))}
      </div>

    </div>
  )
}
