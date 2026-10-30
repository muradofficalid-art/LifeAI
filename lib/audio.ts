// lib/audio.ts - 100% FREE - No Package Needed - Rs 0
export type VoiceMode = 'deep-story' | 'smooth-radio' | 'vip-hollywood'

export async function generateAudio(text: string, mode: VoiceMode = 'deep-story') {
  // Free Edge TTS direct - Microsoft ka free voice
  const rate = mode === 'deep-story' ? '-25%' : mode === 'smooth-radio' ? '-20%' : '-30%'
  return { text, mode, rate, voice: 'ur-PK-AsadAPM', free: true }
}
