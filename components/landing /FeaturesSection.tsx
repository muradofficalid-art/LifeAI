"use client";

const FEATURES = [
  { id: "explainer", icon: "🎬", title: "AI Explainer Video Maker", desc: "Script se business explain video banao", color: "#ff006e", free: true },
  { id: "music", icon: "🎵", title: "AI Music Video Generator", desc: "Music + visuals auto sync", color: "#8338ec", free: true },
  { id: "video", icon: "🎥", title: "AI Video Generator", desc: "MAIN - Script to Video - 3 FREE", color: "#00ff88", free: true },
  { id: "voice", icon: "🎙️", title: "AI Voiceover", desc: "Urdu/Hindi/English voice - PRO", color: "#ffbe0b", free: false },
  { id: "avatar", icon: "🧑‍🎤", title: "AI Avatar Video", desc: "Avatar se video - Canvas - PRO", color: "#3a86ff", free: false },
  { id: "translator", icon: "🌐", title: "AI Translator", desc: "Urdu/Hindi/English translate - PRO", color: "#fb5607", free: false },
];

export default function FeaturesSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ padding: "60px 20px", background: "#080810", borderTop: "1px solid #1a1a2e", borderBottom: "1px solid #1a1a2e" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: 0 }}>All AI Tools in One Platform</h2>
          <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>Top 3 FREE (Max 1 Min) • Bottom 3 PRO Only - Rs 8,000</p>
          <div style={{ display: "inline-block", marginTop: 12, background: "#00ff8822", border: "1px solid #00ff8844", color: "#00ff88", fontSize: 11, padding: "4px 12px", borderRadius: 20 }}>✨ Landing pe hi Generate & Download</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {FEATURES.map((f) => (
            <div
              key={f.id}
              onClick={scrollToTop}
              style={{
                background: f.free ? "#111122" : "#0e0e14",
                border: `1px solid ${f.free ? f.color + "55" : "#222"}`,
                borderRadius: 20,
                padding: 20,
                cursor: "pointer",
                transition: "all 0.2s",
                opacity: f.free ? 1 : 0.85,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 32 }}>{f.icon}</div>
                <span style={{ fontSize: 10, background: f.free ? f.color + "22" : "#222", color: f.free ? f.color : "#888", padding: "4px 10px", borderRadius: 20, border: `1px solid ${f.free ? f.color + "66" : "#333"}`, fontWeight: 700 }}>
                  {f.free ? "FREE GENERATE →" : "PRO - SIDE PE"}
                </span>
              </div>
              <h3 style={{ color: "#fff", fontSize: 16, margin: "0 0 6px", fontWeight: 700 }}>{f.title}</h3>
              <p style={{ color: "#888", fontSize: 12, margin: 0, lineHeight: 1.5 }}>{f.desc} • Max 1 Min • 16:9 / 9:16</p>
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#aaa", background: "#00000066", padding: "4px 8px", borderRadius: 10, border: "1px solid #222" }}>⏱️ 1 Min</span>
                <span style={{ fontSize: 11, color: "#aaa", background: "#00000066", padding: "4px 8px", borderRadius: 10, border: "1px solid #222" }}>📱 16:9 / 9:16</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button onClick={scrollToTop} style={{ background: "#ff006e", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 24, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            Generate Your FREE Video Now →
          </button>
        </div>
      </div>
    </div>
  );
}
