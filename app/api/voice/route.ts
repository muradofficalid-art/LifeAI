import { NextResponse } from 'next/server'
import { generateAudio } from '@/lib/audio'

export async function POST(req: Request) {
  try {
    const { text, mode = 'deep-story', lang = 'ur' } = await req.json()
    if (!text) return NextResponse.json({ error: 'Text chahiye jan' }, { status: 400 })

    const audioBuffer = await generateAudio(text, mode, lang)

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="story.mp3"',
      },
    })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: 'Voice fail: ' + e.message }, { status: 500 })
  }
}
