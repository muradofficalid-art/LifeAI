// Only 3 Allowed Voices
export const ALLOWED_VOICES = [
  "ur-PK-AsadNeural",
  "hi-IN-SwaraNeural",
  "en-US-GuyNeural"
] as const;

export function isValidVoice(voice: string) {
  return ALLOWED_VOICES.includes(voice as any);
}
