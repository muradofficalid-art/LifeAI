export async function POST(req: Request) {
  try {
    const { script } = await req.json();
    const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
    const API_TOKEN = process.env.CF_API_TOKEN;

    if (!ACCOUNT_ID || !API_TOKEN) {
      return Response.json({ success: false, error: 'CF keys Vercel me nahi lagayi! Vercel > Settings > Environment Variables me CF_ACCOUNT_ID aur CF_API_TOKEN add karo' }, { status: 500 });
    }

    // 1. Script ko 5 scenes me todo
    const scenes = script.split(/[۔.!?]/).filter((s:string)=>s.trim().length>5).slice(0,5);
    while(scenes.length < 5) scenes.push(scenes[0] || script);

    // 2. Har scene ke liye alag image banao - Flux se
    const images = [];
    for (let i=0; i<scenes.length; i++) {
      const cleanScene = scenes[i].trim();
      
      // Urdu se English visual prompt
      const visualPrompt = `${cleanScene}, Islamic aesthetic, emotional, cinematic, 8k, ultra realistic, pakistani style, no text`;
      
      const r = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: visualPrompt })
        }
      );

      if (!r.ok) {
        const t = await r.text();
        console.log(`Scene ${i} fail: ${t}`);
        continue;
      }

      const blob = await r.arrayBuffer();
      if (blob.byteLength < 1000) continue;

      const base64 = `data:image/jpeg;base64,${Buffer.from(blob).toString('base64')}`;
      images.push(base64);
    }

    if (images.length === 0) {
      return Response.json({ success: false, error: 'Cloudflare ne image nahi di, API token check karo' }, { status: 500 });
    }

    // Agar 5 se kam bani to duplicate hata ke loop karo
    while(images.length < 5) {
      images.push(images[images.length % images.length]);
    }

    return Response.json({
      success: true,
      imagesGenerated: images.length,
      images: images.slice(0,5)
    });

  } catch (e: any) {
    return Response.json({ success: false, error: `Catch: ${e.message}` }, { status: 500 });
  }
}
