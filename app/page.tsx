'use client'
import { useState } from 'react'

export default function LandingPage() {
  const [duration, setDuration] = useState(5)
  const estimated = (duration * 0.5).toFixed(1)

  return (
    <div className="bg-white text-black">
      <nav className="bg-white border-b px-20 py-4 flex justify-between sticky top-0 z-50">
        <div className="flex gap-10 items-center">
          <div className="font-bold text-xl flex gap-2"><span className="bg-black text-white w-8 h-8 rounded flex items-center justify-center">L</span> lifeAI</div>
          <div className="hidden lg:flex gap-6 text-sm">Explore ▼</div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 text-sm">Login</button>
          <button className="bg-[#FF2E7E] text-white px-6 py-2.5 rounded-full text-sm">Sign up</button>
        </div>
      </nav>

      <div className="bg-[#FF2E7E] text-white text-center py-2.5 text-sm">
        Eid Sale! Use code <span className="bg-yellow-300 text-black px-2 rounded font-bold ml-2">LIFEAI40</span> for 40% off annual plans
      </div>

      <div className="text-center py-14">
        <p className="text-[11px] tracking-[0.2em] text-gray-500 font-semibold">SIMPLE, TRANSPARENT PRICING</p>
        <h1 className="text-5xl font-extrabold mt-4">Your AI partner for <span className="text-[#FF2E7E]">video creation</span></h1>
        <p className="text-gray-600 mt-4">Free forever. Upgrade for more credits, longer videos, more Urdu voices, and HD exports.</p>
        <div className="mt-7 inline-flex bg-gray-100 rounded-full p-1.5">
          <button className="bg-black text-white px-7 py-2 rounded-full text-sm">Monthly</button>
          <button className="px-7 py-2 text-sm text-gray-600">Yearly <span className="text-[#FF2E7E]">⚡ 40% off</span></button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 px-20 pb-20">
        <div className="border rounded-[20px] p-8">
          <h3 className="font-semibold">Basic</h3>
          <p className="text-sm text-gray-500">For beginners</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ 60 credits per month</li>
            <li>✓ 1000 voices with 200 ultra-realistic</li>
            <li>✓ Full HD - 1080p videos</li>
            <li>✓ Premium stock images, video clips & music</li>
            <li>✓ Videos upto 5 minutes</li>
            <li>✓ Commercial rights</li>
          </ul>
          <p className="font-bold mt-8">Rs 2,299 / per month</p>
          <button className="w-full mt-5 border rounded-full py-3 text-sm">Start for free →</button>
        </div>

        <div className="border-2 border-[#FF2E7E] rounded-[20px] p-8 relative">
          <span className="absolute -top-3 right-6 bg-[#FF2E7E] text-white text-[11px] px-3 py-1 rounded-full font-bold">⭐ MOST POPULAR</span>
          <h3 className="font-semibold">Standard</h3>
          <p className="text-sm text-gray-500">For creators venturing into AI video production.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>✓ 180 credits per month</li>
            <li>✓ 1000 voices with 500 ultra-realistic</li>
            <li>✓ Videos upto 15 minutes, 60+ languages</li>
            <li>✓ Voice cloning + limited stock avatars</li>
            <li>✓ Custom characters + Series</li>
            <li>✓ AI Playground & commercial rights</li>
          </ul>
          <p className="font-bold text-lg mt-8">Rs 7,799 per user / per month</p>
          <button className="w-full mt-5 bg-[#FF2E7E] text-white rounded-full py-3.5 text-sm">Start for free →</button>
        </div>

        <div className="border rounded-[20px] p-8">
          <h3 className="font-semibold">Premium</h3>
          <p className="text-sm text-gray-500">For professional teams & studios</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ 600 credits per month</li>
            <li>✓ 2300+ voices, 1000+ ultra-realistic</li>
            <li>✓ Videos upto 40 minutes</li>
            <li>✓ Generate AI video clips + photo avatars</li>
            <li>✓ All AI avatars + multiple voice cloning</li>
            <li>✓ Multiple brand kits, priority support</li>
            <li>✓ API access</li>
          </ul>
          <p className="font-bold mt-8">Rs 23,999 per user / per month</p>
          <button className="w-full mt-5 border rounded-full py-3 text-sm">Start for free →</button>
        </div>
      </div>

      <div className="bg-[#FAFAFA] border-y px-20 py-12 grid lg:grid-cols-2 gap-10">
        <div>
          <p className="text-[11px] tracking-widest text-gray-500 font-bold">PRICING CALCULATOR</p>
          <h2 className="text-3xl font-bold mt-2">Estimate your credits</h2>
          <div className="mt-10">
            <div className="flex justify-between text-xs"><span>VIDEO DURATION</span><span>{duration} mins</span></div>
            <input type="range" min="1" max="30" value={duration} onChange={e=>setDuration(Number(e.target.value))} className="w-full mt-3 accent-black" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 MIN</span><span>30 MIN</span></div>
          </div>
        </div>
        <div className="bg-[#0F172A] rounded-[24px] p-10 text-center text-white">
          <p className="text-[#FF2E7E] text-[11px] tracking-widest font-bold">ESTIMATED CREDITS</p>
          <h1 className="text-6xl font-bold mt-6">{estimated} Credits</h1>
          <p className="text-gray-400 text-sm mt-2">0.5 credits / min</p>
        </div>
      </div>

      <div className="py-12 text-center bg-white">
        <div className="flex justify-center gap-6">
          <div className="border px-12 py-6 rounded-2xl font-bold">14M+ USERS WORLDWIDE</div>
          <div className="border px-12 py-6 rounded-2xl font-bold">80+ LANGUAGES SUPPORTED</div>
        </div>
        <p className="mt-10 text-xs tracking-widest text-gray-500">TRUSTED BY 50,000+ COMPANIES</p>
        <div className="flex justify-center gap-8 mt-4 text-gray-400 text-sm">TOYOTA TATA ByteDance MetLife SIEMENS PayPal</div>
      </div>

      <div className="fixed bottom-6 right-6 w-14 h-14 bg-[#FF2E7E] rounded-full flex items-center justify-center text-white text-xl shadow-lg">💬</div>
    </div>
  )
}
