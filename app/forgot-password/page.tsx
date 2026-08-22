"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

// Funcție locală sigură pentru conectarea la Supabase
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export default function ForgotPasswordPage() {
  const [supabase] = useState(() => createClient());
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Supabase trimite automat email-ul cu link-ul de resetare
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Redirecționăm utilizatorul către pagina de schimbare a parolei după ce dă click pe linkul din email
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        throw error;
      }

      setSuccessMsg("Link-ul de recuperare a fost trimis! Te rugăm să îți verifici adresa de e-mail (inclusiv folderul Spam/Junk).");
      setEmail(""); // Golim input-ul după succes
      
    } catch (error: any) {
      setErrorMsg("A apărut o eroare: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* JUMĂTATEA STÂNGĂ - BRANDING */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-800/40 rounded-full blur-[100px]"></div>

        {/* LOGO */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-max">
            <img src="/logo.png" alt="Roomy Logo" className="h-16 w-auto object-contain brightness-0 invert" />
            <span className="text-4xl font-black text-white tracking-tighter">Roomy</span>
          </Link>
        </div>

        {/* MOTTO ANIMAT */}
        <div className="relative z-10 flex-grow flex items-center justify-center w-full px-8">
          <div className="relative w-full max-w-lg group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-300 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 shadow-2xl flex flex-col gap-6 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                <svg className="w-7 h-7 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Împarte chiria, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-100 drop-shadow-sm">
                  dublează bucuria.
                </span>
              </h3>
              <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-90 mt-2"></div>
            </div>
          </div>
        </div>

        {/* TEXT DESCRIERE MODIFICAT PENTRU CONTEXT */}
        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Recuperează-ți <br/> accesul la cont.
          </h2>
          <p className="text-blue-100 text-lg font-medium leading-relaxed">
            Nu-ți face griji, se mai întâmplă! Îți vom trimite un link securizat pentru a-ți alege o nouă parolă și a te întoarce pe Roomy în câteva secunde.
          </p>
        </div>
      </div>

      {/* JUMĂTATEA DREAPTĂ - FORMULAR */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Buton Înapoi / Logo Mobile */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Roomy Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-black text-blue-600 tracking-tight">Roomy</span>
          </Link>
        </div>

        <div className="w-full max-w-lg mt-12 lg:mt-0">
          
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-8">
            <span>&larr;</span> Înapoi la conectare
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Ai uitat parola?</h1>
            <p className="text-slate-500 font-medium">Introdu adresa de e-mail asociată contului tău și îți vom trimite un link pentru resetarea parolei.</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-5 py-4 rounded-r-xl text-sm font-bold mb-8 animate-fade-in-up flex items-center gap-3">
              <span className="text-xl">⚠️</span> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 px-5 py-4 rounded-r-xl text-sm font-bold mb-8 animate-fade-in-up flex items-center gap-3">
              <span className="text-xl">📧</span> {successMsg}
            </div>
          )}

          {!successMsg && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              
              {/* E-mail */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">E-mail cont</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nume@email.ro"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:font-medium placeholder:text-slate-400"
                />
              </div>

              {/* Buton Submit */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-slate-900 hover:bg-black text-white font-black text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Se trimite link-ul...
                  </>
                ) : (
                  "Trimite link de resetare"
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}