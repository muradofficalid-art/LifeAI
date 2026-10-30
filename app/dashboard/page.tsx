'use client'

export default function Dashboard() {
  return (
    <div style={{background:'#0A0A0A', minHeight:'100vh', color:'white', fontFamily:'system-ui', paddingBottom:'90px'}}>
      
      <div style={{display:'flex', justifyContent:'space-between', padding:'12px 14px'}}>
        <div style={{width:'22px', height:'22px', background:'#FF2E7E', borderRadius:'50%'}}></div>
        <div style={{display:'flex', gap:'8px'}}><span style={{background:'#FF2E7E', padding:'4px 10px', borderRadius:'999px', fontSize:'11px'}}>✦ Rg</span><div style={{width:'26px', height:'26px', background:'#222', borderRadius:'50%'}}></div></div>
      </div>

      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'11px', fontWeight:600, marginTop:'6px'}}>Let's get started, public</p>
        <div style={{display:'flex', justifyContent:'center', gap:'6px', marginTop:'8px'}}>
          <span style={{background:'#FF2E7E', padding:'3px 10px', borderRadius:'999px', fontSize:'10px'}}>◉ Video</span>
          <span style={{background:'#222', padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:'#888'}}>Voiceover</span>
          <span style={{background:'#222', padding:'3px 10px', borderRadius:'999px', fontSize:'10px', color:'#888'}}>Design</span>
        </div>
      </div>

      <div style={{background:'#171717', borderRadius:'14px', margin:'14px', padding:'10px', border:'1px solid #222'}}>
        <textarea placeholder="Enter your video idea, script, or blog link..." style={{width:'100%', background:'transparent', border:'none', outline:'none', color:'white', fontSize:'12px', minHeight:'44px'}}></textarea>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'8px'}}><span style={{fontSize:'12px'}}>👤 ✦</span><button style={{background:'#FF2E7E', color:'white', border:'none', padding:'6px 12px', borderRadius:'999px', fontSize:'11px'}}>✦ Create →</button></div>
      </div>

      <p style={{fontSize:'10px', color:'#888', padding:'0 14px', marginBottom:'8px'}}>Video workflows</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', padding:'0 10px'}}>
        
        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#A52A2A,#FF6B6B)'}}>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/document-3d-icon-download-in-png-blend-fbx-gltf-file-formats--paper-file-folder-pack-files-folders-icons-5182715.png" style={{position:'absolute', right:'0', top:'10px', width:'110px'}}/>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700}}>Script to video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.8}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#2EC4B6,#E0FFF9)'}}>
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300" style={{position:'absolute', right:'-10px', top:'0', width:'110px', height:'136px', objectFit:'cover'}}/>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'#000'}}>Avatar video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'#000'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#0B6E4F,#6BFFB8)'}}>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700}}>PPT to video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', opacity:0.8}}>Try it now →</p>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/slides-3d-icon-download-in-png-blend-fbx-gltf-file-formats--presentation-ppt-powerpoint-pack-miscellaneous-icons-5182722.png" style={{position:'absolute', right:'5px', top:'20px', width:'100px'}}/>
        </div>

        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#FF8C42,#FFD6B3)'}}>
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300" style={{position:'absolute', right:'-5px', top:'0', width:'100px', height:'136px', objectFit:'cover', borderRadius:'8px'}}/>
          <p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'#000'}}>Explainer video</p>
          <p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'#000'}}>Try it now →</p>
        </div>

        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#4A90E2,#B0D8FF)'}}><p style={{position:'absolute', left:'8px', top:'8px', fontSize:'10px', fontWeight:700}}>Motion graphics explainer</p><p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px'}}>Try it now →</p></div>
        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#B7791F,#FEEBC8)'}}><img src="https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?w=300" style={{position:'absolute', right:'0', width:'80px', height:'136px', objectFit:'cover'}}/><p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'#000'}}>Music video</p><p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'#000'}}>Try it now →</p></div>
        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#1A535C,#8FE1D7)'}}><p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700}}>Podcast video</p><p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px'}}>Try it now →</p></div>
        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#553C9A,#D6BCFA)'}}><p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700}}>Product video</p><p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px'}}>Try it now →</p></div>
        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#68D391,#C6F6D5)'}}><p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'#000'}}>Blog to video</p><p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'#000'}}>Try it now →</p></div>
        <div style={{borderRadius:'12px', height:'136px', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#9F7AEA,#E9D8FD)'}}><img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300" style={{position:'absolute', right:'0', width:'100px', height:'136px', objectFit:'cover'}}/><p style={{position:'absolute', left:'8px', top:'8px', fontSize:'11px', fontWeight:700, color:'#000'}}>Swap Studio</p><p style={{position:'absolute', left:'8px', bottom:'8px', fontSize:'9px', color:'#000'}}>Try it now →</p></div>
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#111', borderTop:'1px solid #222', display:'flex', justifyContent:'space-around', padding:'8px 0'}}>
        <div style={{textAlign:'center'}}><div style={{color:'#FF2E7E'}}>🏠</div><div style={{fontSize:'8px'}}>Home</div></div>
        <div style={{textAlign:'center'}}><div style={{color:'#666'}}>📁</div><div style={{fontSize:'8px', color:'#666'}}>Files</div></div>
        <div style={{textAlign:'center'}}><div style={{color:'#666'}}>👤</div><div style={{fontSize:'8px', color:'#666'}}>Characters</div></div>
        <div style={{textAlign:'center'}}><div style={{color:'#666'}}>☰</div><div style={{fontSize:'8px', color:'#666'}}>Series</div></div>
        <div style={{textAlign:'center'}}><div style={{color:'#666'}}>✦</div><div style={{fontSize:'8px', color:'#666'}}>Playground</div></div>
        <div style={{textAlign:'center'}}><div style={{color:'#666'}}>📄</div><div style={{fontSize:'8px', color:'#666'}}>Templates</div></div>
        <div style={{textAlign:'center'}}><div style={{color:'#666'}}>⊞</div><div style={{fontSize:'8px', color:'#666'}}>Resources</div></div>
      </div>
    </div>
  )
}
