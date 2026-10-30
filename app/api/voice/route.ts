import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text, mode } = await req.json()
    if (!text) return NextResponse.json({ error: 'No text' }, { status: 400 })

    const EdgeTTS = (await import('edge-tts')).EdgeTTS
    const tts = new EdgeTTS()
    
    await tts.setVoice('ur-PK-AsadNeural')
    const rate = mode === 'vip-hollywood' ? '-35%' : '-20%'
    await tts.setRate(rate)
    await tts.setPitch('-10Hz')
    
    const audioBuffer: any = await (tts as any).synthesize(text)

    return new NextResponse(audioBuffer, {
      headers: { 'Content-Type': 'audio/mpeg' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
