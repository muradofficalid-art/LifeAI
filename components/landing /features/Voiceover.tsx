"use client";
import { useState } from "react";

export default function Voiceover() {
  const [text, setText] = useState("5 money habits for success");
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text) return;
    setSpeaking(true);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.onend = () => setSpeaking(false);
    speechSynthesis.speak(u);
  };

  return (
    <div style={{ background: "#111122", border: "1px solid #2a2a4e", borderRadius: 20, padding: 16, color: "#fff", opacity: 0.85, position: "relative" }}>
      <div style={{ position: "absolute", top: 10, right: 10, background: "#ffbe0b", color: "#000", fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>PRO ONLY</div>
      <div style={{ fontSize: 22 }}>🎙️</div>
      <h3 style={{ margin: "8px 0", fontSize: 16 }}>AI Voiceover</h3>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>Text to speech in Urdu/English</p>
      <textarea value={text} onChange={e=>setText(e.target.value)} style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: 10, color: "#fff", fontSize: 12, marginBottom: 10, height: 60 }} />
      <button onClick={speak} disabled={speaking} style={{ width: "100%", background: speaking?"#555":"#333", color: "#fff", border: "1px solid #444", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
        {speaking ? "Speaking..." : "🔊 Play Voiceover"}
      </button>
    </div>
  );
}
