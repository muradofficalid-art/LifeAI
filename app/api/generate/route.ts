export async function POST(req: Request) {
  try {
    const { script } = await req.json();
    const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
    const API_TOKEN = process.env.CF_API_TOKEN;

    if (!ACCOUNT_ID || !API_TOKEN) {
      return Response.json({ success: false, error: `CF keys missing! ACCOUNT_ID:${!!ACCOUNT_ID} TOKEN:${!!API_TOKEN}` }, { status: 500 });
    }

    const prompts = [
      `${script}, realistic, cinematic, pakistani railway station, 8k`,
    ];

    const r = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompts[0] })
      }
    );

    const contentType = r.headers.get('content-type');
    
    if (!r.ok) {
      const errText = await r.text();
      return Response.json({ success: false, error: `CF Error ${r.status}: ${errText}`, contentType }, { status: 500 });
    }

    const blob = await r.arrayBuffer();
    if(blob.byteLength < 1000){
        const txt = new TextDecoder().decode(blob);
        return Response.json({ success: false, error: `CF returned small response: ${txt}` }, { status: 500 });
    }

    const base64 = `data:image/jpeg;base64,${Buffer.from(blob).toString('base64')}`;
    
    return Response.json({ 
      success: true, 
      imagesGenerated: 1,
      images: [base64, base64, base64] // 1 image se 3 video clips bana denge
    });

  } catch (e: any) {
    return Response.json({ success: false, error: `Catch: ${e.message}` }, { status: 500 });
  }
}
