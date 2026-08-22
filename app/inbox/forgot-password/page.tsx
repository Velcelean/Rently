"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Header from "@/components/Header";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setMessage("Dacă acest email există în sistem, vei primi un link pentru resetarea parolei în scurt timp.");
    } catch (err: any) {
      setError("A apărut o eroare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-md w-full shadow-sm text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Resetare Parolă</h1>
          <p className="text-gray-500 mb-8 text-sm">
            Introdu adresa de email asociată contului tău, iar noi îți vom trimite un link pentru a-ți alege o parolă nouă.
          </p>

          {message && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Adresa de email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Ex: andrei@email.com" 
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md disabled:opacity-70 mt-2"
            >
              {loading ? "Se trimite..." : "Trimite link-ul de resetare"}
            </button>
          </form>

          <div className="mt-6 text-sm">
            <Link href="/login" className="text-gray-500 hover:text-blue-600 font-medium transition">
              &larr; Înapoi la autentificare
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}