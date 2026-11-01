"use client";
import { useState } from "react";

export default function Translator() {
  const [text, setText] = useState("5 money habits for success");
  const [translated, setTranslated] = useState("");

  const translate = () => {
    if (text.toLowerCase().includes("money") || text.toLowerCase().includes("success")) {
      setTranslated("کامیابی کے لیے 5 پیسے کی عادات");
    } else {
      setTranslated("اردو ترجمہ: " + text);
    }
  };

  return (
    <div style={{ background: "#111122", border: "1px solid #2a2a4e", borderRadius: 20, padding: 16, color: "#fff", opacity: 0.85, position: "relative" }}>
      <div style={{ position: "absolute", top: 10, right: 10, background: "#ffbe0b", color: "#000", fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>PRO ONLY</div>
      <div style={{ fontSize: 22 }}>🌐</div>
      <h3 style={{ margin: "8px 0", fontSize: 16 }}>AI Translator</h3>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>English to Urdu translation</p>
      <input value={text} onChange={e=>setText(e.target.value)} style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: 10, color: "#fff", fontSize: 12, marginBottom: 10 }} />
      <button onClick={translate} style={{ width: "100%", background: "#333", color: "#fff", border: "1px solid #444", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
        Translate to Urdu
      </button>
      {translated && <div style={{ marginTop: 10, background: "#1a1a2e", padding: 10, borderRadius: 10, fontSize: 13, color: "#00ff88" }}>{translated}</div>}
    </div>
  );
}
