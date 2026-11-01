"use client";
import { useState } from "react";

export default function Avatar() {
  const [active, setActive] = useState(false);
  return (
    <div style={{ background: "#111122", border: "1px solid #2a2a4e", borderRadius: 20, padding: 16, color: "#fff", opacity: 0.85, position: "relative" }}>
      <div style={{ position: "absolute", top: 10, right: 10, background: "#ffbe0b", color: "#000", fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>PRO ONLY</div>
      <div style={{ fontSize: 22 }}>🧑‍🎤</div>
      <h3 style={{ margin: "8px 0", fontSize: 16 }}>AI Avatar</h3>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>Talking avatar for videos</p>
      <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 20, textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 50 }}>{active ? "🗣️" : "🧑‍💼"}</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>{active ? "Avatar Speaking..." : "Avatar Ready"}</div>
      </div>
      <button onClick={()=>setActive(!active)} style={{ width: "100%", background: active?"#555":"#333", color: "#fff", border: "1px solid #444", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
        {active ? "Stop Avatar" : "▶️ Preview Avatar"}
      </button>
    </div>
  );
}
