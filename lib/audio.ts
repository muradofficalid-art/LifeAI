// lib/audio.ts - 100% FREE - Rs 0 - Deep Slow Viral
export type VoiceMode = 'deep-story' | 'smooth-radio' | 'vip-hollywood'

const VOICE_CONFIG: any = {
  ur: {
    'deep-story': { voice: 'ur-PK-AsadAPM', rate: '-25%', pitch: '-10Hz', volume: '+10%' },
    'smooth-radio': { voice: 'ur-PK-AsadAPM', rate: '-20%', pitch: '-5Hz', volume: '+5%' },
    'vip-hollywood': { voice: 'ur-PK-AsadAPM', rate: '-30%', pitch: '-15Hz', volume: '+15%' }
  },
  hi: {
    'deep-story': { voice: 'hi-IN-MadhurNeural', rate: '-25%', pitch: '-10Hz', volume: '+10%' },
    'smooth-radio': { voice: 'hi-IN-SwaraNeural', rate: '-20%', pitch: '-5Hz', volume: '+5%' },
    'vip-hollywood': { voice: 'hi-IN-MadhurNeural', rate: '-30%', pitch: '-15Hz', volume: '+15%' }
  }
}

export async function generateAudio(text: string, mode: VoiceMode = 'deep-story', lang: 'ur' = 'ur') {
  try {
    const { EdgeTTS } = await import('edge-tts-node')
    const isHindi = /[\u0900-\u097F]/.test(text) || lang === 'hi'
    const cfg = VOICE_CONFIG[isHindi ? 'hi' : 'ur'][mode]
    
    const tts = new EdgeTTS({
      voice: cfg.voice,
      rate: cfg.rate,
      pitch: cfg.pitch,
      volume: cfg.volume
    })
    
    const buffer = await tts.synthesize(text)
    return buffer
  } catch (e) {
    throw e
  }
}
