"use client"
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* NAVBAR - Fliki Style */}
      <nav className="flex justify-between items-center p-4 md:px-10 border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur z-50">
        <div className="font-bold text-xl">lifeAI 🔥 <span className="text-xs font-normal text-zinc-400 ml-2">Urdu AI Video Generator</span></div>
        <a href="/dashboard" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200">Dashboard</a>
      </nav>

      {/* HERO - Fliki Style */}
      <section className="text-center py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="inline-block bg-zinc-900 border border-zinc-800 px-4 py-1 rounded-full text-xs mb-6">⭐ Trusted by 5000+ Pakistani Creators</div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Urdu AI Video Generator <br/>
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Fliki Se 10x Better</span>
        </h1>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Photo + Video Clips + Ratio + Audio + Auto Film — Fliki ka sara system, lekin Urdu voice + Pakistani pricing me</p>
        <div className="flex gap-4 justify-center mt-8">
          <a href="/dashboard" className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold">Video Banao - Free Start</a>
          <a href="#pricing" className="bg-zinc-800 px-8 py-3 rounded-full">Pricing Dekho</a>
        </div>
        {/* Mock Preview like Fliki */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 md:p-4 shadow-2xl">
          <div className="bg-black rounded-xl h-[280px] flex items-center justify-center text-zinc-500">▶️ Your AI Video Preview Here (Fliki Style Player)</div>
        </div>
      </section>

      {/* PRICING - Fliki 3 Columns */}
      <section id="pricing" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Simple Pricing - Pakistan ke liye</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3>Free</h3><p className="text-sm text-zinc-400">5 Videos / Day</p><p className="text-2xl font-bold mt-4">0 PKR</p>
            <a href="/dashboard" className="block mt-6 bg-zinc-800 text-center py-2 rounded-full">Start Free</a>
          </div>
          <div className="bg-zinc-900 border-2 border-red-500 rounded-2xl p-6 relative">
            <span className="absolute -top-3 left-6 bg-red-500 text-xs px-2 py-1 rounded-full">Most Popular</span>
            <h3>Standard</h3><p className="text-sm text-zinc-400">60 Long + 60 Short</p><p className="text-2xl font-bold mt-4">8,000 PKR</p>
            <a href="/dashboard" className="block mt-6 bg-red-600 text-center py-2 rounded-full font-bold">Buy Standard</a>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3>Premium</h3><p className="text-sm text-zinc-400">120 Long + 120 Short</p><p className="text-2xl font-bold mt-4">15,000 PKR</p>
            <a href="/dashboard" className="block mt-6 bg-zinc-800 text-center py-2 rounded-full">Buy Premium</a>
          </div>
        </div>
      </section>

      {/* REVIEWS + COMPLAIN - Fliki Social Proof */}
      <section className="px-6 pb-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <h4 className="font-bold">Reviews Box ⭐⭐⭐⭐⭐</h4>
          <p className="text-sm text-zinc-300 mt-2">"lifeAI ne meri earning double kardi" - Ahmed, Lahore</p>
          <p className="text-sm text-zinc-300 mt-1">"Fliki se sasta aur Urdu best hai" - Fatima, Karachi</p>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <h4 className="font-bold">Complain Box</h4>
          <input placeholder="Apni shikayat likhein..." className="w-full mt-3 p-3 rounded-lg bg-black border border-zinc-800 text-sm" />
          <button className="mt-3 bg-white text-black px-4 py-1 rounded-full text-sm">Send</button>
        </div>
      </section>

      <footer className="text-center text-zinc-500 text-xs py-8 border-t border-zinc-800">© 2026 lifeAI - Fliki Alternative for Pakistan</footer>
    </div>
  )
}
