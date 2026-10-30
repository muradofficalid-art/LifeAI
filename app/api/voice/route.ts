import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text, mode } = await req.json()
    if (!text) return NextResponse.json({ error: 'No text' }, { status: 400 })

    // Dynamic import - build kabhi fail nahi hoga
    const { EdgeTTS } = await import('edge-tts')
    const tts = new EdgeTTS()
    
    // Human Urdu Voice - Asad (bilkul human)
    await tts.setVoice('ur-PK-AsadNeural')
    
    const rate = mode === 'vip-hollywood' ? '-35%' : mode === 'deep-story' ? '-25%' : '-15%'
    const pitch = mode === 'vip-hollywood' ? '-15Hz' : '-8Hz'
    
    await tts.setRate(rate)
    await tts.setPitch(pitch)
    
    // @ts-ignore
    const audioBuffer = await tts.synthesize(text)

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
