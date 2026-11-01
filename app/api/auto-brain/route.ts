export const dynamic = 'force-dynamic';

// Full Urdu -> English visual dictionary
const MAP: Record<string,string> = {
  "railway": "railway station", "station": "railway station", "lahore": "lahore railway station pakistan",
  "chai": "man drinking chai tea", "admi": "pakistani man", "mard": "man", "betha": "man sitting",
  "bethi": "woman sitting", "hath": "hand", "suitcase": "red suitcase travel", "lal": "red", "red": "red luggage",
  "intazar": "waiting at station", "intezar": "waiting", "pe": "", "per": "", "aik": "", "tha": "", "thi": "",
  "larki": "girl", "khari": "standing", "khara": "standing", "pee raha": "drinking tea"
};

function urduToVisualQuery(scene: string): string {
  let s = scene.toLowerCase();
  // 1. Direct map
  let words = s.split(/[\s،۔,]+/).map(w=>{
    for(const k in MAP) if(w.includes(k)) return MAP[k];
    return w;
  }).join(' ').replace(/\s+/g,' ').trim();
  
  // 2. Clean small urdu words
  words = words.replace(/\b(per|aik|tha|thi|ma|hai|ke|ki|ko|se|mein)\b/gi, '').trim();
  if(words.length < 4) words += " pakistan railway";
  
  // 3. Limit 5 words - Pixabay best works with 3-5 words
  return words.split(' ').slice(0,5).join(' ');
}

export async function POST(req: Request){
  try{
    const { input } = await req.json();
    const pixKey = process.env.PIXABAY_KEY!;
    
    // Scene split - har jumla alag scene
    let scenes = input.split(/[.!?۔،]+/).map((s:string)=>s.trim()).filter(s=>s.length>6);
    if(scenes.length < 5){
      const ws = input.split(' ');
      const c = Math.ceil(ws.length/5);
      scenes = [];
      for(let i=0;i<5;i++) scenes.push(ws.slice(i*c, (i+1)*c).join(' ') || input);
    }
    scenes = scenes.slice(0,5);

    const clips = [];
    for(let i=0;i<5;i++){
      const rawScene = scenes[i];
      // Try free translate first (no key) - Urdu to English
      let q = urduToVisualQuery(rawScene);
      try{
        const tr = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawScene)}&langpair=ur|en`);
        const tj = await tr.json();
        if(tj?.responseData?.translatedText && tj.responseData.translatedText.length>5){
          q = tj.responseData.translatedText.split(' ').slice(0,5).join(' ') + " pakistan";
        }
      }catch{}

      // Pixabay search - best match = longest + most views (Fliki trick)
      const r = await fetch(`https://pixabay.com/api/videos/?key=${pixKey}&q=${encodeURIComponent(q)}&per_page=20&safesearch=true&order=popular`);
      const j = await r.json();
      const sorted = (j.hits || []).sort((a:any,b:any)=> (b.duration + b.views/10000) - (a.duration + a.views/10000));
      const best = sorted[0];
      const url = best?.videos?.large?.url || best?.videos?.medium?.url || best?.videos?.tiny?.url;

      clips.push({
        text: rawScene.slice(0,80),
        videoUrl: url || "",
        query: q,
        effect: ["zoomIn","zoomOut","panLeft","panRight","slowMo"][i]
      });
    }

    return Response.json({ success:true, clips, debug: clips.map(c=>c.query) });
  }catch(e:any){
    return Response.json({ success:false, error:e.message });
  }
}
