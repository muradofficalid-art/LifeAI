export async function POST(req) {
  const { script } = await req.json();
  
  const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
  const API_TOKEN = process.env.CF_API_TOKEN;

  if (!ACCOUNT_ID || !API_TOKEN) {
    return Response.json({ error: "CF keys missing" }, { status: 500 });
  }

  // STEP 1: Simple prompts from script
  const prompts = [
    `${script}, realistic, cinematic, pakistani father, bus station, 8k`,
    `${script}, bus on highway to karachi, sunset, realistic`,
    `${script}, emotional, cinematic lighting, 8k`,
  ];

  // STEP 2: Image generation
  let images = [];
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
    const blob = await r.arrayBuffer();
    images.push(blob.byteLength); // size check
  }

  return Response.json({ success: true, imagesGenerated: images.length });
}
