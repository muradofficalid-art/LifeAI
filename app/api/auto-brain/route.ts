export const maxDuration = 60;
export const dynamic = 'force-dynamic';

async function callBrain(prompt: string, server: string, token: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(server, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (res.status === 503) {
        // Model loading - wait 10 sec and retry
        await new Promise(r => setTimeout(r, 10000));
        continue;
      }

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HF ${res.status}: ${txt.slice(0,200)}`);
      }

      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = `data:${blob.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
      return base64;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  throw new Error("Brain failed after retries");
}

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    if (!input) return Response.json({ success: false, error: "Input empty" }, { status: 400 });

    const server = process.env.MY_BRAIN_SERVER;
    const token = process.env.HF_TOKEN;
    if (!server || !token) return Response.json({ success: false, error: "Env missing" }, { status: 500 });

    const scenes = [
      `${input}, wide establishing shot, empty foggy road night, slow dolly forward`,
      `${input}, closeup wet road rain reflection, shallow depth`,
      `${input}, side tracking shot, trees parallax, fog moving`,
      `${input}, low angle, dramatic flicker light in distance, cinematic`,
      `${input}, final wide shot, hope light, smooth camera push in`
    ];

    const clips = [];
    for (const scene of scenes) {
      const finalPrompt = `${scene}, ultra realistic, 8K, anamorphic 35mm lens, volumetric fog, wet asphalt reflection, cinematic lighting, highly detailed, no cartoon, no logo, no watermark, no text`;
      const imageUrl = await callBrain(finalPrompt, server, token);
      clips.push({
        imageUrl,
        movement: "FORWARD_DOLLY + PARALLAX_FOG + RAIN",
        duration: 4,
        prompt: scene
      });
    }

    return Response.json({ success: true, totalDuration: 20, clips });

  } catch (e: any) {
    console.error(e);
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
