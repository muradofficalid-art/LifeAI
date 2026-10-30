"use client"
import { useState } from "react"
export default function Dashboard() {
  const [ratio, setRatio] = useState("9:16")
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* SIDEBAR - Fliki Style */}
      <div className="w-[220px] bg-black border-r border-zinc-800 p-4 hidden md:block">
        <div className="font-bold mb-6">lifeAI App 🔥</div>
        <div className="space-y-2 text-sm">
          <div className="bg-zinc-900 p-2 rounded">📄 New Video</div>
          <div className="p-2 text-zinc-400">📁 My Files</div>
          <div className="p-2 text-zinc-400">💰 Pricing</div>
          <div className="p-2 text-zinc-400">💬 Support Chat</div>
          <div className="p-2 text-zinc-400">⚠️ Complain</div>
        </div>
        <div className="mt-10 p-3 bg-zinc-900 rounded-lg text-xs">
          <p>Free Plan</p><p className="text-zinc-400">5/5 videos left</p>
          <button className="w-full mt-2 bg-red-600 py-1 rounded">Upgrade</button>
        </div>
      </div>

      {/* MAIN - Fliki Editor Style */}
      <div className="flex-1">
        <div className="border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-900/50">
          <h2 className="font-bold">Video Editor - Point 1 Theme (Fliki Style)</h2>
          <a href="/" className="text-xs bg-zinc-800 px-3 py-1 rounded">← Landing</a>
        </div>
        
        <div className="p-4 md:p-6 max-w-4xl">
          <div className="flex gap-3 mb-4 items-center">
            <span className="text-sm text-zinc-400">Ratio Select:</span>
            <button onClick={()=>setRatio("9:16")} className={`px-3 py-1 rounded text-sm ${ratio==="9:16" ? "bg-white text-black" : "bg-zinc-800"}`}>9:16 Shorts</button>
            <button onClick={()=>setRatio("16:9")} className={`px-3 py-1 rounded text-sm ${ratio==="16:9" ? "bg-white text-black" : "bg-zinc-800"}`}>16:9 Long</button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <textarea placeholder="Apni script yahan paste karein... (Urdu me likhein, AI voice auto banayega - Fliki ki tarah)" className="w-full h-[200px] bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm"></textarea>
              <div className="flex gap-3 mt-4">
                <button className="bg-red-600 px-6 py-2 rounded-full font-bold text-sm">Generate Preview (Next Points me)</button>
                <button className="bg-zinc-800 px-6 py-2 rounded-full text-sm">Add Media</button>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-2">Preview - {ratio}</p>
              <div className={`bg-black rounded-lg flex items-center justify-center text-zinc-500 text-xs ${ratio==="9:16" ? "h-[320px] w-[180px] mx-auto" : "h-[180px]"}`}>Video Player</div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between"><span>Voice:</span><span className="text-white">Urdu Male</span></div>
                <div className="flex justify-between"><span>Music:</span><span className="text-white">Auto</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
