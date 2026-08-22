"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DeCeRoomyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      <main className="flex-grow">
        
        {/* HERO SECTION - MODERN DARK */}
        <div className="bg-[#020617] text-white pt-32 pb-24 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs font-black text-blue-300 uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              Beneficiile Platformei
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Mai mult decât un avizier.<br />
              <span className="text-blue-400">Un ecosistem.</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Am refăcut de la zero modul în care oamenii găsesc chirii și colegi de apartament. Mai rapid, mai sigur și complet gratuit. Iată de ce mii de tineri aleg Roomy.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">

          {/* FEATURE 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">100% Gratuit. Fără agenții și comisioane absurde.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                Piața imobiliară este plină de intermediari care îți cer „50% din prima lună” doar pentru că ți-au deschis o ușă. Noi eliminăm barierele.
              </p>
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex items-center gap-3">
                  <span className="text-green-500 bg-green-100 p-1 rounded-full"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                  Postarea anunțurilor este complet gratuită.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 bg-green-100 p-1 rounded-full"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                  Contact direct cu proprietarii sau chiriașii.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 bg-green-100 p-1 rounded-full"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></span>
                  Fără taxe ascunse sau carduri cerute la înregistrare.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] bg-gradient-to-tr from-blue-100 to-indigo-50 p-8 md:p-12 shadow-2xl border border-white">
                <div className="absolute -top-6 -right-6 text-7xl drop-shadow-xl animate-bounce" style={{animationDuration: '3s'}}>💸</div>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                    <span className="font-bold text-slate-400">Total de plată</span>
                    <span className="text-2xl font-black text-slate-900">0 RON</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2.5 bg-slate-200 rounded-full w-full"></div>
                    <div className="h-2.5 bg-slate-200 rounded-full w-3/4"></div>
                  </div>
                  <button className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl opacity-50 cursor-not-allowed">
                    Nu e nevoie de card
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] bg-gradient-to-tr from-emerald-100 to-teal-50 p-8 md:p-12 shadow-2xl border border-white">
                <div className="absolute -bottom-6 -left-6 text-7xl drop-shadow-xl animate-bounce" style={{animationDuration: '4s'}}>🤝</div>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white">
                  <div className="flex gap-4 items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0"></div>
                    <div>
                      <div className="h-3 bg-slate-200 rounded-full w-24 mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded-full w-16"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Pet-friendly</span>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">LGBTQ+ Friendly</span>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Nefumător</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-6 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Filtre umane. Găsește un OM, nu doar un pat.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                Să împarți chiria înseamnă să împarți viața de zi cu zi. Site-urile clasice îți arată doar pereți și prețuri. Noi îți arătăm oamenii.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Filtrează anunțurile în funcție de stilul tău de viață. Vrei un coleg pasionat de curățenie? Ai un câine? Ești LGBTQ+ și vrei un mediu *safe space*? Profilurile noastre detaliate te ajută să faci *match-ul* perfect înainte să te muți.
              </p>
            </div>
          </div>

          {/* FEATURE 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 mb-6 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Securitate și Intimitate pe bune. Fără spam.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                Când postezi pe grupurile de Facebook, ești bombardat de conturi false și de comentarii irelevante. Pe Roomy, liniștea ta e garantată.
              </p>
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                  Numărul tău de telefon rămâne ascuns până când decizi TU cui vrei să i-l dai.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                  Sistem de mesagerie internă (Chat) rapid și sigur.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                  Toleranță zero pentru scammeri. Blocăm automat IP-urile raportate de comunitate.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] bg-gradient-to-tr from-rose-100 to-orange-50 p-8 md:p-12 shadow-2xl border border-white">
                <div className="absolute -top-6 -left-6 text-7xl drop-shadow-xl animate-bounce" style={{animationDuration: '3.5s'}}>💬</div>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white space-y-4">
                  <div className="bg-slate-100 p-3 rounded-xl rounded-tl-none w-3/4">
                    <div className="h-2 bg-slate-300 rounded-full w-full mb-2"></div>
                    <div className="h-2 bg-slate-300 rounded-full w-2/3"></div>
                  </div>
                  <div className="bg-blue-600 p-3 rounded-xl rounded-tr-none w-3/4 ml-auto">
                    <div className="h-2 bg-blue-300 rounded-full w-full mb-2"></div>
                    <div className="h-2 bg-blue-300 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* QUOTE SECTION */}
        <div className="bg-blue-600 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <span className="text-6xl text-blue-400 opacity-50 font-serif leading-none block mb-4">"</span>
            <p className="text-2xl md:text-4xl text-white font-medium leading-tight mb-8">
              Misiunea noastră este simplă: Să transformăm găsirea unei chirii dintr-un proces stresant, într-o experiență modernă și umană.
            </p>
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">Echipa Roomy</p>
          </div>
        </div>

        {/* FOOTER CTA LINKS */}
        <div className="py-24 bg-white text-center border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Află mai multe despre noi</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link href="/despre-noi" className="group p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-slate-50 hover:bg-white">
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">👋</span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Povestea Noastră</h3>
                <p className="text-sm text-slate-500 font-medium">Află cine suntem și de ce am construit Roomy.</p>
              </Link>
              
              <Link href="/programul-inchiriaza-o-camera" className="group p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-slate-50 hover:bg-white">
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">📘</span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Ghiduri Utile</h3>
                <p className="text-sm text-slate-500 font-medium">Cum să închiriezi sigur și să eviți țepele pe internet.</p>
              </Link>
              
              <Link href="/de-ce-sa-imparti-chiria" className="group p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-slate-50 hover:bg-white">
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">💰</span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Avantaje Coabitare</h3>
                <p className="text-sm text-slate-500 font-medium">De ce este mai avantajos să împarți chiria cu altcineva.</p>
              </Link>
            </div>
            
            <div className="mt-16">
              <Link href="/add-listing" className="inline-flex items-center justify-center bg-slate-900 hover:bg-black text-white font-black text-lg py-4 px-10 rounded-xl transition-all shadow-xl hover:-translate-y-1">
                Postează primul tău anunț &rarr;
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}