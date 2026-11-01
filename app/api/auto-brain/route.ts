export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    if (!input) {
      return Response.json({ success: false, error: "Input empty" }, { status: 400 });
    }

    // 5 scenes for 20 sec film
    const scenes = [
      `${input}, wide establishing shot, empty foggy road night, slow dolly forward`,
      `${input}, closeup wet road rain reflection, shallow depth of field`,
      `${input}, side tracking shot, trees parallax, fog moving`,
      `${input}, low angle, dramatic flicker light in distance, cinematic`,
      `${input}, final wide shot, hope light, smooth camera push in`
    ];

    const clips = [];

    for (const scene of scenes) {
      const finalPrompt = `${scene}, ultra realistic, 8K, anamorphic 35mm lens, volumetric fog, wet asphalt reflection, cinematic lighting, Netflix documentary style, highly detailed, no cartoon, no logo, no watermark, no text`;

      const res = await fetch(process.env.MY_BRAIN_SERVER!, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: finalPrompt })
      });

      if (!res.ok) {
        throw new Error(`Brain busy: ${res.status}`);
      }

      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = `data:${blob.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;

      clips.push({
        imageUrl: base64,
        movement: "FORWARD_DOLLY + PARALLAX_FOG + RAIN",
        duration: 4,
        prompt: scene
      });
    }

    return Response.json({
      success: true,
      totalDuration: 20,
      clips: clips
    });

  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
