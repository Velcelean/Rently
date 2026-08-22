"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (password.length < 8) {
      setErrorMsg("Parola trebuie să aibă minim 8 caractere.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Parolele nu se potrivesc!");
      setLoading(false);
      return;
    }

    try {
      // Funcția magică care actualizează parola utilizatorului care a venit de pe link-ul din email
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setSuccessMsg("Parola a fost actualizată cu succes! Te redirecționăm către contul tău...");
      
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 2000);

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
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-800/40 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-max">
            <img src="/logo.png" alt="Roomy Logo" className="h-16 w-auto object-contain brightness-0 invert" />
            <span className="text-4xl font-black text-white tracking-tighter">Roomy</span>
          </Link>
        </div>

        <div className="relative z-10 flex-grow flex items-center justify-center w-full px-8">
          <div className="relative w-full max-w-lg group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-300 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 shadow-2xl flex flex-col gap-6 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                <svg className="w-7 h-7 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Securitate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-100 drop-shadow-sm">
                  pe primul loc.
                </span>
              </h3>
              <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-90 mt-2"></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Alege o nouă <br/> parolă sigură.
          </h2>
          <p className="text-blue-100 text-lg font-medium leading-relaxed">
            Asigură-te că folosești o parolă unică, pe care nu o mai folosești pe alte site-uri, pentru a-ți păstra contul Roomy în siguranță.
          </p>
        </div>
      </div>

      {/* JUMĂTATEA DREAPTĂ - FORMULAR */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Roomy Logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-black text-blue-600 tracking-tight">Roomy</span>
          </Link>
        </div>

        <div className="w-full max-w-lg mt-12 lg:mt-0">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Resetare parolă</h1>
            <p className="text-slate-500 font-medium">Introdu noua ta parolă mai jos. Aceasta o va înlocui pe cea veche.</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-5 py-4 rounded-r-xl text-sm font-bold mb-8 animate-fade-in-up flex items-center gap-3">
              <span className="text-xl">⚠️</span> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 px-5 py-4 rounded-r-xl text-sm font-bold mb-8 animate-fade-in-up flex items-center gap-3">
              <span className="text-xl">✅</span> {successMsg}
            </div>
          )}

          {!successMsg && (
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              
              {/* Parolă Nouă */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Noua parolă</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minim 8 caractere"
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmare Parolă Nouă */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Confirmă noua parolă</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repetă parola"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-slate-900 hover:bg-black text-white font-black text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Se actualizează...
                  </>
                ) : (
                  "Schimbă Parola"
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}