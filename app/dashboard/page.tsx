'use client'

export default function Dashboard() {
  const cards = [
    { title:'Script to video', bg:'#B91C1C', img:'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', color:'white' },
    { title:'Avatar video', bg:'#4FD1C5', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', color:'black' },
    { title:'PPT to video', bg:'#065F46', img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', color:'white' },
    { title:'Explainer video', bg:'#F6AD55', img:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400', color:'black' },
    { title:'Motion graphics explainer', bg:'#63B3ED', img:'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400', color:'black' },
    { title:'Music video', bg:'#D69E2E', img:'https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?w=400', color:'black' },
    { title:'Podcast video', bg:'#285E61', img:'https://images.unsplash.com/photo-1590650046871-92d84d3d00b8?w=400', color:'white' },
    { title:'Product video', bg:'#6B46C1', img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', color:'white' },
    { title:'Blog to video', bg:'#9AE6B4', img:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400', color:'black' },
    { title:'Swap Studio', bg:'#B794F6', img:'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400', color:'black' },
  ]

  return (
    <div style={{background:'#0A0A0A', minHeight:'100vh', color:'white', fontFamily:'Inter', paddingBottom:'85px'}}>
      
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
        {cards.map((c,i)=>(
          <div key={i} style={{background:c.bg, borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden'}}>
            {/* Image - Accurate Fit Right Side */}
            <img src={c.img} style={{position:'absolute', right:0, top:0, width:'58%', height:'100%', objectFit:'cover', opacity:0.95}} alt=""/>
            {/* Gradient overlay for text readability */}
            <div style={{position:'absolute', left:0, top:0, width:'60%', height:'100%', background:`linear-gradient(to right, ${c.bg}, transparent)`}}></div>
            
            <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:c.color, width:'90px', lineHeight:'1.2'}}>{c.title}</p>
            <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:c.color, opacity:0.8}}>Try it now →</p>
          </div>
        ))}
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#111', borderTop:'1px solid #222', display:'flex', justifyContent:'space-around', padding:'7px 0'}}>
        {['Home','Files','Characters','Series','Playground','Templates','Resources'].map((l,i)=>(
          <div key={l} style={{textAlign:'center'}}>
            <div style={{fontSize:'13px', color: i===0?'#FF2E7E':'#666'}}>{i===0?'🏠': i===1?'📁': i===2?'👤': i===3?'☰': i===4?'✦': i===5?'📄':'⊞'}</div>
            <div style={{fontSize:'7px', color: i===0?'white':'#666', marginTop:'2px'}}>{l}</div>
          </div>
        ))}
      </div>

    </div>
  )
}
