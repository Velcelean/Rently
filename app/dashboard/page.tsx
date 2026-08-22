"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import AnuntCard from "@/components/AnuntCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// 1. DEFINIREA TIPURILOR STRICTE (TYPESCRIPT)
// ==========================================
interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
  [key: string]: any;
}

interface DashboardUser {
  id: string;
  email?: string;
  user_metadata: UserMetadata;
}

// Funcție locală sigură pentru clientul Supabase
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// Funcție inteligentă pentru salut în funcție de ora zilei
const getGreeting = (fullName?: string) => {
  const hour = new Date().getHours();
  let greeting = "Bună seara";
  
  if (hour >= 5 && hour < 12) greeting = "Bună dimineața";
  else if (hour >= 12 && hour < 18) greeting = "Bună ziua";

  const firstName = fullName ? fullName.split(" ")[0] : "bine ai revenit";
  return `${greeting}, ${firstName}!`;
};

// ==========================================
// 2. ICONIȚE SVG (Optimizate)
// ==========================================
const Icons = {
  Home: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Heart: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  Message: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  TrendingUp: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  ShieldCheck: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  CheckCircle: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ErrorCircle: () => <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  AlertTriangle: () => <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
};

// ==========================================
// 3. COMPONENTA PRINCIPALĂ
// ==========================================
export default function DashboardPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Stări pentru date
  const [anunturi, setAnunturi] = useState<any[]>([]);
  const [conversatii, setConversatii] = useState<any[]>([]);
  const [salvate, setSalvate] = useState<any[]>([]);
  
  // Stare Navigare
  const [activeTab, setActiveTab] = useState<"mele" | "salvate" | "mesaje" | "overview">("overview");

  // ==========================================
  // STĂRI NOI: NOTIFICĂRI & MODAL ȘTERGERE
  // ==========================================
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error', message: string}>({ show: false, type: 'success', message: '' });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, listingId: string | null, isDeleting: boolean }>({ isOpen: false, listingId: null, isDeleting: false });

  // Funcție afișare notificare (Toast)
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 4000);
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchData(currentUser: any) {
      try {
        const userId = currentUser.id;

        // 1. Încărcăm anunțurile utilizatorului
        const { data: anunturiData } = await supabase
          .from("listings")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
          
        if (anunturiData && isMounted) setAnunturi(anunturiData);

        // 2. Încărcăm conversațiile
        const { data: convData } = await supabase
          .from("conversations")
          .select(`
            id, created_at, listing_id, tenant_id, owner_id, 
            listings (id, title, image_url, image_urls),
            tenant:profiles!conversations_tenant_id_fkey (full_name, avatar_url),
            owner:profiles!conversations_owner_id_fkey (full_name, avatar_url),
            chat_messages (is_read, sender_id)
          `)
          .or(`tenant_id.eq.${userId},owner_id.eq.${userId}`)
          .order("created_at", { ascending: false });
          
        if (convData && isMounted) setConversatii(convData);

        // 3. Încărcăm anunțurile salvate
        const { data: favoriteData } = await supabase
          .from("saved_listings")
          .select("listing_id")
          .eq("user_id", userId);
          
        if (favoriteData && favoriteData.length > 0 && isMounted) {
          const listingIds = favoriteData.map(fav => fav.listing_id);
          const { data: favListings } = await supabase
            .from("listings")
            .select("*")
            .in("id", listingIds);
            
          if (favListings) setSalvate(favListings);
        }
      } catch (err) {
        console.error("Eroare la preluarea datelor Dashboard:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) { 
          if (isMounted) setUser(session.user as any); 
          fetchData(session.user); 
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Eroare sesiune:", err);
        if (isMounted) setLoading(false);
      }
    };

    checkSession();
    return () => { isMounted = false; };
  }, [supabase, router]);


  // ==========================================
  // LOGICĂ ȘTERGERE ANUNȚ (CU MODAL MODERN)
  // ==========================================
  const confirmDelete = async () => {
    if (!deleteModal.listingId) return;
    
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", deleteModal.listingId)
        .eq("user_id", user?.id);
        
      if (error) throw error;
      
      // Ștergem anunțul din UI instant
      setAnunturi((prev) => prev.filter((anunt) => anunt.id !== deleteModal.listingId));
      
      // Afișăm Notificarea de Succes
      showNotification('success', 'Anunțul a fost șters definitiv din platformă.');
      
    } catch (err: any) {
      showNotification('error', "Eroare la ștergerea anunțului: " + err.message);
    } finally {
      // Închidem modalul
      setDeleteModal({ isOpen: false, listingId: null, isDeleting: false });
    }
  };


  // ==========================================
  // LOGICĂ DERIVATĂ (STATISTICI)
  // ==========================================
  const unreadMessagesCount = useMemo(() => {
    if (!user) return 0;
    return conversatii.reduce((total, conv) => {
      const unreadInConv = conv.chat_messages?.filter((msg: any) => !msg.is_read && msg.sender_id !== user.id).length || 0;
      return total + unreadInConv;
    }, 0);
  }, [conversatii, user]);

  const profileScore = useMemo(() => {
    let score = 0;
    if (user?.email) score += 30;
    if (user?.user_metadata?.full_name) score += 30;
    if (user?.user_metadata?.avatar_url) score += 40;
    return score;
  }, [user]);

  // ==========================================
  // SKELETON LOADERS
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow animate-pulse">
          <div className="h-10 bg-slate-200 rounded-xl w-1/3 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded-md w-1/4 mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-3xl"></div>)}
          </div>
          <div className="flex gap-4 mb-8">
            <div className="h-12 bg-slate-200 rounded-2xl w-32"></div>
            <div className="h-12 bg-slate-200 rounded-2xl w-32"></div>
            <div className="h-12 bg-slate-200 rounded-2xl w-32"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-slate-200 rounded-[2rem]"></div>)}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  // ==========================================
  // RENDER INTERFAȚĂ PRINCIPALĂ
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900 relative">
      <Header />
      
      {/* ========================================== */}
      {/* MODAL ȘTERGERE ANUNȚ (CUSTOM) */}
      {/* ========================================== */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          {/* Fundal Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => !deleteModal.isDeleting && setDeleteModal({ isOpen: false, listingId: null, isDeleting: false })}
          ></div>
          
          {/* Fereastra Modal */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-sm w-full shadow-2xl relative z-10 animate-fade-in-up flex flex-col items-center text-center transform scale-100 transition-transform">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-5 shadow-inner">
              <Icons.AlertTriangle />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2">Ștergi acest anunț?</h3>
            <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
              Dacă ștergi anunțul, el va dispărea definitiv din căutări și toate conversațiile legate de el pot fi afectate. Ești sigur?
            </p>
            
            <div className="flex flex-col sm:flex-row w-full gap-3">
              <button 
                onClick={() => setDeleteModal({ isOpen: false, listingId: null, isDeleting: false })}
                disabled={deleteModal.isDeleting}
                className="flex-1 py-4 px-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Anulează
              </button>
              <button 
                onClick={confirmDelete}
                disabled={deleteModal.isDeleting}
                className="flex-1 py-4 px-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
              >
                {deleteModal.isDeleting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Da, Șterge"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICARE PLUTITOARE (TOAST) */}
      <div className={`fixed top-24 right-4 sm:right-8 z-50 transition-all duration-500 transform ${notification.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${notification.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' : 'bg-rose-50/90 border-rose-200 text-rose-800'}`}>
          {notification.type === 'success' ? <Icons.CheckCircle /> : <Icons.ErrorCircle />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full flex-grow relative">
        
        {/* Antet Personalizat */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-black text-[10px] tracking-widest uppercase rounded-lg mb-3">
              Panou de Control
            </span>
            <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2">
              {getGreeting(user.user_metadata?.full_name)}
            </h1>
            <p className="text-slate-500 text-base font-medium max-w-2xl leading-relaxed">
              Aici ai o privire de ansamblu asupra activității tale pe platformă. Gestionează anunțurile, verifică favoritele și răspunde la mesaje rapid.
            </p>
          </div>
          <Link href="/add-listing" className="shrink-0 flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold px-6 py-4 rounded-2xl transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl">
            <span className="text-xl">+</span> Postează Anunț
          </Link>
        </div>

        {/* WIDGET-URI STATISTICI (Top Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Anunțuri Active */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
              <Icons.Home />
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Icons.Home />
            </div>
            <p className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">Anunțuri Active</p>
            <h3 className="text-4xl font-black text-slate-900">{anunturi.length}</h3>
          </div>

          {/* Card 2: Favorite */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">
              <Icons.Heart />
            </div>
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
              <Icons.Heart />
            </div>
            <p className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">Anunțuri Salvate</p>
            <h3 className="text-4xl font-black text-slate-900">{salvate.length}</h3>
          </div>

          {/* Card 3: Mesaje */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-500">
              <Icons.Message />
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4">
              <Icons.Message />
            </div>
            <p className="text-slate-500 font-bold text-sm mb-1 uppercase tracking-wider">Conversații Noi</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-slate-900">{unreadMessagesCount}</h3>
              <span className="text-sm font-bold text-slate-400">/ {conversatii.length} total</span>
            </div>
          </div>

          {/* Card 4: Status Profil */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-[2rem] shadow-xl relative overflow-hidden text-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Icons.ShieldCheck />
                </div>
                <span className="text-3xl font-black">{profileScore}%</span>
              </div>
              <p className="text-slate-300 font-bold text-sm uppercase tracking-wider">Profil Complet</p>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
                <div className="bg-emerald-400 h-2 rounded-full transition-all duration-1000" style={{ width: `${profileScore}%` }}></div>
              </div>
              {profileScore < 100 && (
                <Link href="/profile" className="text-xs text-emerald-300 font-bold hover:text-white transition-colors">
                  Completează acum &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* NAVIGARE TAB-URI */}
        <div className="flex flex-nowrap gap-2 mb-8 overflow-x-auto pb-4 custom-scrollbar">
          {[
            { id: "overview", label: "Privire generală", icon: "✨" },
            { id: "mele", label: "Anunțurile Mele", count: anunturi.length, icon: "🏠" },
            { id: "salvate", label: "Salvate la Favorite", count: salvate.length, icon: "❤️" },
            { id: "mesaje", label: "Centru Mesaje", count: conversatii.length, icon: "💬" }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105 transform origin-left" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* ========================================== */}
        {/* CONTINUT TAB 0: OVERVIEW (Recomandări)     */}
        {/* ========================================== */}
        {activeTab === "overview" && (
          <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4">Ce urmează să faci?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Verifică-ți mesajele</h4>
                    <p className="text-sm text-slate-500 mt-1">Răspunde rapid colegilor de apartament pentru a stabili vizionări.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Actualizează-ți profilul</h4>
                    <p className="text-sm text-slate-500 mt-1">Adaugă o poză clară pentru a inspira încredere proprietarilor.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Explorează oferte noi</h4>
                    <p className="text-sm text-slate-500 mt-1">Sute de anunțuri noi sunt adăugate săptămânal pe platformă.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-center items-center text-center">
              <span className="text-6xl mb-6">🚀</span>
              <h3 className="text-3xl font-black mb-4">Pregătit să muți lucrurile?</h3>
              <p className="text-blue-100 font-medium mb-8 max-w-sm">
                Ai o cameră liberă sau cauți pe cineva cu care să împarți chiria? Adaugă un anunț și ajunge instant la mii de tineri.
              </p>
              <Link href="/add-listing" className="bg-white text-blue-900 font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg">
                Postează Anunț Acum
              </Link>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* CONTINUT TAB 1: ANUNȚURILE MELE            */}
        {/* ========================================== */}
        {activeTab === "mele" && (
          <div className="animate-fade-in-up">
            {anunturi.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {anunturi.map((anunt) => (
                  <div key={anunt.id} className="flex flex-col bg-white rounded-[2rem] p-4 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <AnuntCard data={anunt} />
                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                      <Link 
                        href={`/edit-listing/${anunt.id}`} 
                        className="flex flex-1 items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 font-bold text-sm text-center rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors"
                      >
                        <Icons.Edit /> Editează
                      </Link>
                      
                      {/* AICI ESTE NOUL BUTON DE ȘTERGERE CARE DESCHIDE MODALUL */}
                      <button 
                        onClick={() => setDeleteModal({ isOpen: true, listingId: anunt.id, isDeleting: false })} 
                        className="flex flex-1 items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 font-bold text-sm rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors"
                      >
                        <Icons.Trash /> Șterge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 px-4 text-center bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
                  <Icons.Home />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Vitrina ta este goală</h3>
                <p className="text-slate-500 max-w-md mx-auto font-medium mb-8 leading-relaxed">
                  Fie că oferi o cameră sau cauți una, postarea unui anunț este primul pas pentru a-ți găsi colegul ideal. Durează doar 2 minute!
                </p>
                <Link href="/add-listing" className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
                  Postează primul anunț
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* CONTINUT TAB 2: SALVATE                    */}
        {/* ========================================== */}
        {activeTab === "salvate" && (
          <div className="animate-fade-in-up">
            {salvate.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {salvate.map((anunt) => (
                  <div key={anunt.id} className="bg-white rounded-[2rem] p-4 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                     <AnuntCard data={anunt} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 px-4 text-center bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col items-center">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-6">
                  <Icons.Heart />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Niciun anunț la favorite</h3>
                <p className="text-slate-500 max-w-md mx-auto font-medium mb-8 leading-relaxed">
                  Apasă pe inimioara de pe orice anunț care îți place pentru a-l salva. Astfel, vei putea reveni oricând la ofertele tale preferate.
                </p>
                <Link href="/anunturi" className="bg-slate-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-black transition shadow-lg hover:-translate-y-1">
                  Explorează apartamente
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* CONTINUT TAB 3: MESAJE                     */}
        {/* ========================================== */}
        {activeTab === "mesaje" && (
          <div className="animate-fade-in-up">
            <div className="bg-white border border-slate-200 p-8 lg:p-12 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Icons.Message />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3">
                    Ai {conversatii.length} conversații active
                  </h3>
                  <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
                    Centrul tău de mesaje este complet integrat. Ai {unreadMessagesCount} mesaje necitite. Pentru a citi, răspunde și gestiona mesajele, folosește platforma de Inbox dedicată.
                  </p>
                </div>
              </div>
              <Link href="/inbox" className="shrink-0 w-full md:w-auto bg-blue-600 text-white text-center font-black px-10 py-5 rounded-2xl hover:bg-blue-700 transition shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
                Deschide Inbox-ul &rarr;
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}