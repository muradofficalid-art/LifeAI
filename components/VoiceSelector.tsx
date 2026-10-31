// LOCKED 3 VOICES ONLY!
const VOICES = [
  { id: "ur-PK-AsadNeural", name: "Urdu - Asad", desc: "Documentary / Islami / Vlog" },
  { id: "hi-IN-SwaraNeural", name: "Hindi - Swara", desc: "All Niches" },
  { id: "en-US-GuyNeural", name: "English - Guy", desc: "All Niches" },
];

export default function VoiceSelector({ value, onChange }: any) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full p-3 rounded-xl">
      {VOICES.map(v => (
        <option key={v.id} value={v.id}>{v.name} - {v.desc}</option>
      ))}
    </select>
  );
}
