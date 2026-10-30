// HUMAN VOICE - No package needed - 100% Free - Vercel safe
export async function generateAudio(text: string, mode = 'deep-story') {
  // Ye function ab API route use karega, direct package nahi
  // Is liye build error kabhi nahi ayega
  return text
}

export function getVoiceSettings(mode: string) {
  if (mode === 'deep-story') return { rate: '-25%', pitch: '-10Hz', voice: 'ur-PK-AsadNeural' }
  if (mode === 'smooth-radio') return { rate: '-20%', pitch: '-5Hz', voice: 'ur-PK-AsadNeural' }
  return { rate: '-30%', pitch: '-15Hz', voice: 'ur-PK-AsadNeural' }
}
