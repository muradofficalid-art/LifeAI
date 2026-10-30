// lib/audio.ts - 100% FREE UNLIMITED - Rs 0
export type VoiceMode = 'deep-story' | 'smooth-radio' | 'vip-hollywood'

const VOICES: any = {
  ur: {
    'deep-story': { voice: 'ur-PK-AsadAPM', rate: '-25%', pitch: '-10Hz' },
    'smooth-radio': { voice: 'ur-PK-AsadAPM', rate: '-20%', pitch: '-5Hz' },
    'vip-hollywood': { voice: 'ur-PK-AsadAPM', rate: '-30%', pitch: '-15Hz' }
  },
  hi: {
    'deep-story': { voice: 'hi-IN-MadhurNeural', rate: '-25%', pitch: '-10Hz' },
    'smooth-radio': { voice: 'hi-IN-SwaraNeural', rate: '-20%', pitch: '-5Hz' },
    'vip-hollywood': { voice: 'hi-IN-MadhurNeural', rate: '-30%', pitch: '-15Hz' }
  }
}

export async function getVoiceBuffer(text: string, mode: VoiceMode = 'deep-story', lang: 'ur' = 'ur') {
  // Edge TTS free API - no key needed
  const cfg = VOICES[lang][mode]
  const res = await fetch(`https://api.edge-tts.com/tts?voice=${cfg.voice}&rate=${cfg.rate}&text=${encodeURIComponent(text)}`)
  return res.arrayBuffer()
}

export function getModes() {
  return [
    { id: 'deep-story', name: 'Deep Story 0.75x - Viral', cost: 'FREE' },
    { id: 'smooth-radio', name: 'Smooth Radio 0.80x', cost: 'FREE' },
    { id: 'vip-hollywood', name: 'VIP Hollywood 0.70x', cost: 'FREE' }
  ]
}
