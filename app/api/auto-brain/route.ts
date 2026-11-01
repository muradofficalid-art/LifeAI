export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const key = process.env.PIXABAY_KEY;
    if (!key) return Response.json({ success: false, error: "PIXABAY_KEY missing!" });

    // 5 alag scenes banao - same line ko repeat nahi
    let scenes = input.split(/[.!?،۔]+/).filter((s:string)=>s.trim().length>10);
    if(scenes.length < 5){
      // Agar 1 hi lambi line hai to usko 5 parts me tod do
      const words = input.split(' ');
      const chunk = Math.ceil(words.length/5);
      scenes = [];
      for(let i=0;i<5;i++){
        scenes.push(words.slice(i*chunk, (i+1)*chunk).join(' ') || input);
      }
    }
    scenes = scenes.slice(0,5);

    // 5 alag keywords - har scene alag video
    const baseKeywords = ["railway station pakistan", "lahore train", "person waiting alone", "railway platform crowd", "train journey cinematic"];
    
    const clips = [];
    for(let i=0;i<5;i++){
      const query = i < scenes.length ? baseKeywords[i] : baseKeywords[i%5];
      const r = await fetch(`https://pixabay.com/api/videos/?key=${key}&q=${encodeURIComponent(query)}&per_page=10&safesearch=true&order=popular`);
      const j = await r.json();
      // Har bar alag video lo - random - taake same na aaye
      const randomIdx = Math.floor(Math.random()*Math.min(8, j.hits?.length || 1));
      const hit = j?.hits?.[randomIdx];
      const videoUrl = hit?.videos?.large?.url || hit?.videos?.medium?.url;
      
      clips.push({
        text: scenes[i].trim().slice(0,80),
        videoUrl: videoUrl || "https://videos.pexels.com/video-files/18069234/18069234-hd_1920_1080_30fps.mp4",
        effect: ["zoomIn", "zoomOut", "panLeft", "panRight", "slowMo"][i] // Har scene ka alag effect
      });
    }
    return Response.json({ success: true, clips });
  } catch(e:any){
    return Response.json({ success: false, error: e.message });
  }
}
