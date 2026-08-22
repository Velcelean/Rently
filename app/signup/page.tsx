"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

// Funcție locală sigură pentru conectarea la Supabase
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export default function SignupPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  
  // Stocare date formular
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  // Stări pentru UI și Securitate
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Funcție care evaluează puterea parolei în timp real (Minim 8 caractere)
  useEffect(() => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (pwd.match(/[A-Z]/)) strength += 1;
    if (pwd.match(/[0-9]/)) strength += 1;
    if (pwd.match(/[^A-Za-z0-9]/)) strength += 1;
    setPasswordStrength(Math.min(strength, 4));
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Validări Frontend
    if (formData.password.length < 8) {
      setErrorMsg("Parola trebuie să aibă minim 8 caractere.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Parolele nu se potrivesc!");
      setLoading(false);
      return;
    }

    if (!formData.agreedToTerms) {
      setErrorMsg("Trebuie să fii de acord cu Termenii și Condițiile pentru a continua.");
      setLoading(false);
      return;
    }

    try {
      // Creare cont securizat în Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) throw authError;

      // Salvare date adiționale în tabelul public (profiles)
      if (authData.user) {
        const profilePayload = {
          id: authData.user.id,
          full_name: formData.fullName,
          email: formData.email,
          created_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
          .from("profiles")
          .insert([profilePayload]);

        if (profileError) {
          console.error("Eroare profil:", profileError);
        }
      }

      setSuccessMsg("Cont securizat creat cu succes! Redirecționare spre contul tău...");
      
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 2000);

    } catch (error: any) {
      if (error.message.includes("already registered")) {
        setErrorMsg("Acest email este deja înregistrat pe Roomy.");
      } else {
        setErrorMsg("Eroare la înregistrare: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // LOGICĂ ÎNREGISTRARE CU GOOGLE
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setErrorMsg("Eroare la înregistrarea cu Google: " + error.message);
      setLoading(false);
    }
  };

  const strengthColors = ["bg-slate-200", "bg-rose-500", "bg-amber-400", "bg-emerald-400", "bg-emerald-600"];
  const strengthLabels = ["Prea scurtă", "Slabă", "Acceptabilă", "Bună", "Puternică"];

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

        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Găsește chiriile <br/> ascunse din oraș.
          </h2>
          <p className="text-blue-100 text-lg font-medium leading-relaxed">
            Alătură-te comunității noastre securizate. Fără agenți, fără comisioane ascunse. Doar tu, proprietari de încredere și colegi de apartament pe placul tău.
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
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Creează un cont securizat</h1>
            <p className="text-slate-500 font-medium">Completează datele tale reale pentru a inspira încredere proprietarilor.</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-5 py-4 rounded-r-xl text-sm font-bold mb-6 animate-fade-in-up flex items-center gap-3">
              <span className="text-xl">⚠️</span> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 px-5 py-4 rounded-r-xl text-sm font-bold mb-6 animate-fade-in-up flex items-center gap-3">
              <span className="text-xl">✅</span> {successMsg}
            </div>
          )}

          {/* BUTON CONTINUĂ CU GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-base py-3.5 px-4 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continuă cu Google
          </button>

          {/* SEPARATOR „SAU” */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-grow h-px bg-slate-200"></div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">sau cu e-mail</span>
            <div className="flex-grow h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Nume Complet</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ex: Ion Popescu"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:font-medium placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nume@email.ro"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:font-medium placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Alege o parolă</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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

              {formData.password.length > 0 && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-grow flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-slate-100'}`}
                      ></div>
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${strengthColors[passwordStrength].replace('bg-', 'text-')}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Confirmă Parola</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repetă parola de mai sus"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="pt-2 pb-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors peer"
                  />
                  <svg className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-xs text-slate-600 font-medium leading-snug">
                  Sunt de acord cu <Link href="/termeni-si-conditii" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Termenii și Condițiile</Link> și <Link href="/politica-de-confidentialitate" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">Politica de Confidențialitate</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || successMsg !== ""}
              className="w-full bg-slate-900 hover:bg-black text-white font-black text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Se securizează contul...
                </>
              ) : (
                "Creează Contul"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Ai deja un cont?{" "}
              <Link href="/login" className="font-black text-blue-600 hover:text-blue-800 transition-colors">
                Conectează-te aici
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}