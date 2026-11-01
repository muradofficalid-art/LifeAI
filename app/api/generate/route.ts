export async function POST(req: Request) {
  try {
    const { script } = await req.json();
    
    if (!script) {
      return Response.json({ error: "script missing" }, { status: 400 });
    }

    const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
    const API_TOKEN = process.env.CF_API_TOKEN;

    if (!ACCOUNT_ID || !API_TOKEN) {
      return Response.json({ error: "CF keys missing in Vercel env" }, { status: 500 });
    }

    // STEP 1: Prompts from script
    const prompts = [
      `${script}, realistic, cinematic, pakistani father, bus station, 8k, ultra detailed`,
      `${script}, bus on highway to karachi, sunset, realistic, cinematic`,
      `${script}, emotional reunion, cinematic lighting, 8k, highly detailed`,
    ];

    // STEP 2: Image generation via Cloudflare FLUX
    let images: string[] = [];
    let errors: any[] = [];

    for (let p of prompts) {
      const r = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
        {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: p, steps: 4, width: 1024, height: 576 })
        }
      );

      if (!r.ok) {
        const errText = await r.text();
        errors.push(errText);
        continue;
      }

      const blob = await r.arrayBuffer();
      // Base64 me convert taake frontend pe dikh jaye
      const base64 = `data:image/jpeg;base64,${Buffer.from(blob).toString('base64')}`;
      images.push(base64);
    }

    return Response.json({ 
      success: true, 
      imagesGenerated: images.length,
      images: images, // ye frontend pe dikhenge
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
