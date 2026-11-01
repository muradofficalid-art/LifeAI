export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const key = process.env.PIXABAY_KEY;
    if (!key) return Response.json({ success: false, error: "PIXABAY_KEY nahi mili Vercel me!" });

    const sentences = input.split(/[.!?]+/).filter((s:string)=>s.trim().length > 8);
    const scenes = sentences.length >= 5 ? sentences.slice(0,5) : Array(5).fill(input);

    const clips = [];
    for (const text of scenes) {
      const q = text.split(' ').slice(0,3).join(' ') || "nature cinematic";
      const r = await fetch(`https://pixabay.com/api/videos/?key=${key}&q=${encodeURIComponent(q)}&per_page=3&safesearch=true&order=popular`);
      const j = await r.json();
      // Large HD video
      const videoUrl = j?.hits?.[0]?.videos?.large?.url || j?.hits?.[0]?.videos?.medium?.url || j?.hits?.[0]?.videos?.small?.url;
      
      clips.push({ 
        text: text.trim().slice(0, 100), 
        videoUrl: videoUrl || "https://videos.pexels.com/video-files/18069234/18069234-hd_1920_1080_30fps.mp4",
        query: q
      });
    }
    return Response.json({ success: true, clips });
  } catch(e:any){
    return Response.json({ success: false, error: e.message });
  }
}
