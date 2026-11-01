"use client";
import ExplainerVideoMaker from "./features/ExplainerVideoMaker";
import MusicVideoGenerator from "./features/MusicVideoGenerator";
import VideoGenerator from "./features/VideoGenerator";
import Voiceover from "./features/Voiceover";
import Avatar from "./features/Avatar";
import Translator from "./features/Translator";

export default function FeaturesSection() {
  return (
    <div style={{ padding: "40px 20px", background: "#0a0a0f" }}>
      <h2 style={{ textAlign: "center", color: "#fff", fontSize: 28, marginBottom: 8, fontWeight: 800 }}>All AI Tools in One Platform</h2>
      <p style={{ textAlign: "center", color: "#888", fontSize: 13, marginBottom: 24 }}>Top 3 FREE (Max 1 Min) • Bottom 3 PRO Only</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
        <ExplainerVideoMaker />
        <MusicVideoGenerator />
        <VideoGenerator />
        <Voiceover />
        <Avatar />
        <Translator />
      </div>
    </div>
  );
}
