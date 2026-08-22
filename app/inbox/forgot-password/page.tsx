"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setMessage("Am trimis un e-mail cu instrucțiuni pentru resetarea parolei.");
    } catch (err: any) {
      setErrorMsg("A apărut o eroare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-200 shadow-xl max-w-md w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Recuperare Parolă</h1>
            <p className="text-slate-500 font-medium text-sm">Introdu adresa de e-mail a contului tău și îți vom trimite un link de resetare.</p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 text-rose-700 px-4 py-3 rounded-xl text-sm font-bold mb-6">
              {errorMsg}
            </div>
          )}

          {message && (
            <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm font-bold mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nume@email.ro"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Se trimite..." : "Trimite Link-ul de Resetare"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm font-bold text-blue-600 hover:underline">
              &larr; Înapoi la Autentificare
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}