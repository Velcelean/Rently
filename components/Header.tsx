"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// Iconițe pentru meniul de mobil
const Icons = {
  Menu: () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Close: () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
};

export default function Header() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Stare pentru meniul de mobil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        const { data: convs } = await supabase
          .from("conversations")
          .select("id")
          .or(`tenant_id.eq.${session.user.id},owner_id.eq.${session.user.id}`);

        if (convs && convs.length > 0) {
          const convIds = convs.map(c => c.id);

          const { count, error } = await supabase
            .from("chat_messages")
            .select("*", { count: "exact", head: true })
            .in("conversation_id", convIds)
            .eq("is_read", false)
            .neq("sender_id", session.user.id);

          if (!error && count) {
            setUnreadCount(count);
          }
        }
      }
    };

    fetchUserAndData();

    const channel = supabase
      .channel('header-notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        () => {
          fetchUserAndData(); 
        }
      )
      .subscribe();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setUnreadCount(0);
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsMobileMenuOpen(false); // Închidem meniul pe mobil dacă e deschis
      router.push("/"); 
      router.refresh(); 
    } catch (error: any) {
      alert("A apărut o eroare la deconectare: " + error.message);
    }
  };

  return (
    <header className="px-4 md:px-6 lg:px-12 h-20 flex items-center justify-between border-b border-slate-100 bg-white z-50 sticky top-0 relative">
      
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-50">
        <img src="/logo.png" alt="Rently Logo" className="h-14 md:h-16 lg:h-[4.5rem] w-auto object-contain transform origin-left" />
        <span className="text-xl md:text-2xl font-black text-blue-600 tracking-tight">Rently</span>
      </Link>

      {/* ========================================== */}
      {/* 1. MENIUL PENTRU LAPTOP/TABLETĂ (DESKTOP) */}
      {/* ========================================== */}
      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <>
            <Link href="/inbox" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors relative flex items-center gap-1">
              Mesaje
              {unreadCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link href="/dashboard" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              Contul meu
            </Link>
            
            <Link href="/profile" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              Profilul meu
            </Link>
            
            <button onClick={handleLogout} className="text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors border-l border-slate-200 pl-6">
              Deconectare
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              Autentificare
            </Link>
            <Link href="/signup" className="text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
              Înregistrare
            </Link>
          </>
        )}
      </div>

      {/* ========================================== */}
      {/* 2. BUTONUL HAMBURGER PENTRU MOBIL */}
      {/* ========================================== */}
      <div className="flex md:hidden items-center z-50">
        {/* Bulinuța de notificări roșie peste butonul de meniu pe mobil */}
        {user && unreadCount > 0 && !isMobileMenuOpen && (
          <span className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse pointer-events-none">
            {unreadCount}
          </span>
        )}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-slate-700 hover:text-blue-600 p-2 focus:outline-none transition-colors"
        >
          {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {/* ========================================== */}
      {/* 3. MENIUL DESCHIS PE MOBIL (OVERLAY) */}
      {/* ========================================== */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col p-6 gap-6 md:hidden animate-fade-in-up z-40">
          {user ? (
            <>
              <Link href="/inbox" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900 flex items-center justify-between">
                Mesaje
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
                    {unreadCount} noi
                  </span>
                )}
              </Link>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900">
                Contul meu
              </Link>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900">
                Profilul meu
              </Link>
              <hr className="border-slate-100" />
              <button onClick={handleLogout} className="text-lg font-black text-rose-500 text-left">
                Deconectare
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-slate-900">
                Autentificare
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black bg-blue-600 text-white text-center py-4 rounded-xl shadow-md">
                Creează cont gratuit
              </Link>
            </>
          )}
        </div>
      )}

    </header>
  );
}