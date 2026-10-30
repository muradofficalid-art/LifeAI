export async function generateAudio(text: string, mode = 'deep-story') {
  const { EdgeTTS } = await import('edge-tts')
  const tts = new EdgeTTS()
  await tts.setVoice('ur-PK-AsadNeural')
  await tts.setRate(mode==='deep-story' ? '-25%' : '-20%')
  await tts.setPitch('-10Hz')
  const buffer = await tts.synthesize(text)
  return buffer
}
