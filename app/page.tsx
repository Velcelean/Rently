"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Funcție locală și sigură pentru conectare
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export default function HomePage() {
  const [supabase] = useState(() => createClient());
  const [latestAds, setLatestAds] = useState<any[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    async function fetchLatestAds() {
      try {
        const tableName = "listings"; 

        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .limit(4);

        if (error) {
          const { data: retryData, error: retryError } = await supabase
            .from("anunturi")
            .select("*")
            .limit(4);

          if (!retryError && retryData) {
            setLatestAds(retryData);
          }
          return;
        }

        if (data && data.length > 0) {
          setLatestAds(data);
        }
      } catch (error: any) {
        console.warn("Eroare la preluarea anunțurilor:", error.message);
      } finally {
        setLoadingAds(false);
      }
    }

    fetchLatestAds();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-white selection:text-blue-600">
      <Header />

      <main className="flex-grow">
        
        {/* ========================================== */}
        {/* HERO SECTION */}
        {/* ========================================== */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white pt-28 pb-40 md:pt-40 md:pb-48 overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter">
            ROOMY
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-5 py-2 text-xs md:text-sm font-bold text-blue-100 mb-8 shadow-lg">
              ✨ Platforma #1 pentru chirii și colegi de apartament
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[1.1] drop-shadow-lg">
              Împarte chiria, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">dublează bucuria.</span>
            </h1>

            <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed mb-12 drop-shadow-md">
              Sigur. Rapid. Transparent. Fie că oferi spre închiriere un apartament, ai o cameră liberă sau cauți un loc de stat, Roomy îți face legătura cu persoana potrivită.
            </p>

            {/* BUTOANELE MODIFICATE */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
              <Link href="/anunturi" className="group flex items-center justify-center gap-3 bg-white text-blue-700 font-black text-lg py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <span className="text-2xl group-hover:-rotate-12 transition-transform">🔍</span>
                Caută un anunț
              </Link>
              <Link href="/add-listing" className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-bold text-lg py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform">➕</span>
                Postează un anunț
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* TRUST BADGES */}
        {/* ========================================== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 mb-24">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              <div className="flex flex-col items-center text-center pt-4 md:pt-0 px-4">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner">🔒</div>
                <h3 className="font-black text-slate-900 text-xl mb-2">Siguranță garantată</h3>
                <p className="text-slate-500 font-medium text-sm">Contact direct în platformă. Nu îți expunem datele private pe internet.</p>
              </div>

              <div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner">⚡</div>
                <h3 className="font-black text-slate-900 text-xl mb-2">Rapid și Eficient</h3>
                <p className="text-slate-500 font-medium text-sm">Filtre avansate pentru a găsi colegul cu stilul tău de viață în câteva secunde.</p>
              </div>

              <div className="flex flex-col items-center text-center pt-8 md:pt-0 px-4">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner">💸</div>
                <h3 className="font-black text-slate-900 text-xl mb-2">0% Comisioane</h3>
                <p className="text-slate-500 font-medium text-sm">Roomy este complet gratuit pentru tine. Păstrează-ți banii pentru lucruri faine.</p>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* CUM FUNCȚIONEAZĂ */}
        {/* ========================================== */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16 tracking-tight">Cum funcționează?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 rounded-full z-0"></div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 group-hover:border-blue-500 text-blue-600 rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-xl transition-colors duration-300">1</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Creează un cont</h3>
                <p className="text-slate-500 font-medium max-w-xs">Te înregistrezi gratuit în mai puțin de 30 de secunde folosind adresa de e-mail.</p>
              </div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 group-hover:border-blue-500 text-blue-600 rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-xl transition-colors duration-300">2</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Caută sau Postează</h3>
                <p className="text-slate-500 font-medium max-w-xs">Răsfoiește anunțurile detaliate cu poze și filtre, sau adaugă propria ta ofertă.</p>
              </div>

              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 group-hover:border-blue-500 text-blue-600 rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-xl transition-colors duration-300">3</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Ia legătura & Mută-te</h3>
                <p className="text-slate-500 font-medium max-w-xs">Trimite mesaje sigure direct din platformă și cunoaște viitorul coleg sau proprietar.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* LATEST ADS SECTION */}
        {/* ========================================== */}
        <div className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">Cele mai noi anunțuri</h2>
                <p className="text-slate-500 font-medium text-lg">Ofertele reale ale comunității noastre.</p>
              </div>
              <Link href="/anunturi" className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2 group transition-colors">
                Vezi tot <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

            {loadingAds ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : latestAds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestAds.map((ad) => {
                  const imgUrl = ad.imagine_principala || ad.image_url || (ad.imagini && ad.imagini[0]) || null;
                  const title = ad.titlu || ad.title || "Anunț";
                  const city = ad.oras || ad.city || ad.locatie || "Locație nespecificată";
                  const price = ad.pret || ad.price || 0;
                  const labelType = ad.tip_anunt || ad.type || "SE OFERĂ";
                  const roomType = ad.tip_camera || ad.room_type || "CAMERA_PRIVATA";

                  return (
                    <Link href={`/anunturi/${ad.id}`} key={ad.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col">
                      
                      <div className="relative h-48 overflow-hidden bg-slate-200">
                        {imgUrl ? (
                          <img src={imgUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                            <span className="text-3xl mb-2">📷</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Fără imagine</span>
                          </div>
                        )}
                        
                        <div className={`absolute top-4 left-4 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md ${labelType.includes('CAUT') ? 'bg-indigo-600' : 'bg-blue-600'}`}>
                          {labelType}
                        </div>
                      </div>
                      
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          {roomType.replace('_', ' ')}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {title}
                        </h3>
                        
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-4 mt-auto">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="truncate">{city}</span>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="font-black text-2xl text-slate-900">{price}€</span>
                            <span className="text-xs text-slate-400 font-medium block">preț lunar</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border border-dashed border-slate-300 p-12 text-center max-w-2xl mx-auto shadow-sm">
                <span className="text-6xl block mb-4">🏠</span>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Niciun anunț momentan</h3>
                <p className="text-slate-500 mb-8 font-medium">Baza de date este goală. Fii primul care sparge gheața și postează un anunț pe platforma Roomy!</p>
                <Link href="/add-listing" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5">
                  Postează un anunț
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* BOTTOM CTA SECTION */}
        {/* ========================================== */}
        <div className="bg-blue-600 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">
              Gata să îți găsești <br /> locul perfect?
            </h2>
            <p className="text-xl text-blue-100 font-medium mb-10 max-w-2xl mx-auto">
              Alătură-te comunității noastre și rezolvă-ți problema chiriei chiar azi. Este complet gratuit și sigur.
            </p>
            <Link href="/add-listing" className="inline-block bg-white text-blue-700 font-black text-lg py-4 px-12 rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
              Creează cont gratuit
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}