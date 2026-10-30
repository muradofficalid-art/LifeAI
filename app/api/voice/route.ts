import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text, mode = 'deep-story' } = await req.json()
  if (!text) return NextResponse.json({ error: 'Text do jan' }, { status: 400 })

  // For now success - real audio next step me browser se bajega
  return NextResponse.json({ 
    success: true, 
    mode, 
    message: 'Audio system ready - Rs 0 cost',
    text: text.slice(0, 100)
  })
}
