'use client'

export default function Dashboard() {
  return (
    <div style={{background:'#0A0A0A', minHeight:'100vh', color:'white', fontFamily:'Inter', paddingBottom:'85px'}}>
      
      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px'}}>
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

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#B91C1C'}}>
          <img src="https://picsum.photos/seed/script1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #B91C1C 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'80px'}}>Script to video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.8}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#4FD1C5'}}>
          <img src="https://picsum.photos/seed/avatar1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #4FD1C5 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'black', width:'70px'}}>Avatar video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'black'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#065F46'}}>
          <img src="https://picsum.photos/seed/ppt1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #065F46 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'70px'}}>PPT to video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.8}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#ED8936'}}>
          <img src="https://picsum.photos/seed/explainer1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #ED8936 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'black', width:'70px'}}>Explainer video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'black'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#63B3ED'}}>
          <img src="https://picsum.photos/seed/motion1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #63B3ED 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'10px', fontWeight:700, color:'black', width:'80px', lineHeight:'1.2'}}>Motion graphics explainer</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'black'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#D69E2E'}}>
          <img src="https://picsum.photos/seed/music1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #D69E2E 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'black'}}>Music video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'black'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#285E61'}}>
          <img src="https://picsum.photos/seed/podcast1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #285E61 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'70px'}}>Podcast video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.8}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#6B46C1'}}>
          <img src="https://picsum.photos/seed/product1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #6B46C1 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, width:'70px'}}>Product video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.8}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#9AE6B4'}}>
          <img src="https://picsum.photos/seed/blog1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #9AE6B4 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'black'}}>Blog to video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'black'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'138px', position:'relative', overflow:'hidden', background:'#B794F6'}}>
          <img src="https://picsum.photos/seed/swap1/200/140" style={{position:'absolute', right:0, top:0, width:'55%', height:'100%', objectFit:'cover'}}/>
          <div style={{position:'absolute', left:0, top:0, width:'55%', height:'100%', background:'linear-gradient(to right, #B794F6 70%, transparent)'}}></div>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'black'}}>Swap Studio</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'black'}}>Try it now →</p>
        </div>

      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#111', borderTop:'1px solid #222', display:'flex', justifyContent:'space-around', padding:'7px 0'}}>
        {['Home','Files','Characters','Series','Playground','Templates','Resources'].map((l,i)=>(
          <div key={l} style={{textAlign:'center'}}><div style={{fontSize:'13px', color: i===0?'#FF2E7E':'#666'}}>{i===0?'🏠':'📁'}</div><div style={{fontSize:'7px', color: i===0?'white':'#666'}}>{l}</div></div>
        ))}
      </div>
    </div>
  )
}
