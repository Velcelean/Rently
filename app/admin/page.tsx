"use client";

import { useEffect, useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ==========================================
// 1. SUPABASE CLIENT
// ==========================================
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// ==========================================
// 2. TYPESCRIPT INTERFACES
// ==========================================
interface DashboardStats {
  usersCount: number;
  listingsCount: number;
  feedbackCount: number;
  reportsCount: number;
}

interface Listing {
  id: string;
  title: string;
  city: string;
  price: number;
  created_at: string;
  user_id: string;
  profiles?: { full_name: string; avatar_url: string };
  image_urls?: string[];
}

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  email?: string;
}

interface Feedback {
  id: string;
  user_id: string;
  rating: number;
  message: string;
  type: string;
  created_at: string;
  profiles?: { full_name: string; email: string };
}

interface Report {
  id: string;
  reporter_id: string;
  reported_type: string;
  reported_id: string;
  reason: string;
  description: string;
  status: string;
  created_at: string;
  reporter?: { full_name: string };
}

interface Toast {
  id: number;
  type: "success" | "error" | "warning";
  message: string;
}

// ==========================================
// 3. ICONIȚE PREMIUM (SVG LIBRARY)
// ==========================================
const Icons = {
  Lock: () => <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Listings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  Feedback: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  Flag: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  CheckCircle: () => <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ErrorCircle: () => <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Warning: () => <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Star: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.898 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
};

// ==========================================
// 4. UTILS & HELPERS
// ==========================================
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' };
  return new Date(dateString).toLocaleDateString('ro-RO', options);
};

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
};

// ==========================================
// 5. MAIN COMPONENT (THE GOD MODE)
// ==========================================
export default function AdminCommandCenter() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  
  // Stări de Încărcare & Securitate
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  // Stări Navigare
  const [activeTab, setActiveTab] = useState<"overview" | "listings" | "users" | "feedback" | "reports">("overview");

  // Stări Date (Database)
  const [stats, setStats] = useState<DashboardStats>({ usersCount: 0, listingsCount: 0, feedbackCount: 0, reportsCount: 0 });
  const [listings, setListings] = useState<Listing[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Stări UI Complexe
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, id: string | null, type: 'listing' | 'report' | 'feedback', title: string}>({isOpen: false, id: null, type: 'listing', title: ''});
  const [isProcessing, setIsProcessing] = useState(false);

  // ==========================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================
  const addToast = (type: "success" | "error" | "warning", message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // ==========================================
  // INITIALIZARE & FETCH DATE
  // ==========================================
  useEffect(() => {
    let isMounted = true;

    async function verifyAndLoad() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push("/login");
          return;
        }

        // VERIFICARE "GOD MODE"
        const role = session.user.user_metadata?.role;
        if (role !== 'admin') {
          if (isMounted) {
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setIsAdmin(true);
          setAdminUser(session.user);
        }

        // FETCH PARALEL PENTRU VITEZĂ MAXIMĂ
        const [
          listingsRes,
          feedbackRes,
          reportsRes,
          profilesRes
        ] = await Promise.all([
          supabase.from("listings").select("*, profiles(full_name, avatar_url)").order("created_at", { ascending: false }),
          supabase.from("platform_feedback").select("*, profiles(full_name, email)").order("created_at", { ascending: false }),
          supabase.from("reports").select("*, reporter:profiles(full_name)").order("created_at", { ascending: false }),
          supabase.from("profiles").select("*").order("created_at", { ascending: false })
        ]);

        if (isMounted) {
          const lData = listingsRes.data || [];
          const fData = feedbackRes.data || [];
          const rData = reportsRes.data || [];
          const pData = profilesRes.data || [];

          setListings(lData);
          setFeedback(fData);
          setReports(rData);
          setProfiles(pData);

          setStats({
            usersCount: pData.length,
            listingsCount: lData.length,
            feedbackCount: fData.length,
            reportsCount: rData.length
          });
          setLoading(false);
        }

      } catch (err: any) {
        console.error("Critical Admin Error:", err);
        if (isMounted) setLoading(false);
      }
    }

    verifyAndLoad();
    return () => { isMounted = false; };
  }, [supabase, router]);

  // ==========================================
  // HANDLERS ACȚIUNI ADMIN
  // ==========================================
  const executeDelete = async () => {
    if (!deleteModal.id) return;
    setIsProcessing(true);

    try {
      if (deleteModal.type === 'listing') {
        const { error } = await supabase.from("listings").delete().eq("id", deleteModal.id);
        if (error) throw error;
        setListings(prev => prev.filter(l => l.id !== deleteModal.id));
        setStats(prev => ({...prev, listingsCount: prev.listingsCount - 1}));
        addToast("success", "Anunțul a fost șters definitiv din baza de date.");
      } 
      else if (deleteModal.type === 'report') {
        const { error } = await supabase.from("reports").update({ status: 'resolved' }).eq("id", deleteModal.id);
        if (error) throw error;
        setReports(prev => prev.map(r => r.id === deleteModal.id ? {...r, status: 'resolved'} : r));
        addToast("success", "Raportul a fost marcat ca rezolvat.");
      }

      setDeleteModal({ isOpen: false, id: null, type: 'listing', title: '' });
    } catch (err: any) {
      addToast("error", `Eroare: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // ==========================================
  // FILTERING LOGIC
  // ==========================================
  const filteredListings = useMemo(() => {
    return listings.filter(l => 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.includes(searchQuery)
    );
  }, [listings, searchQuery]);

  // ==========================================
  // RENDER: ECRAN DE BLOCARE (ACCESS DENIED)
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-blue-400 font-black tracking-widest uppercase text-sm animate-pulse">Verificare Protocoale Securitate...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center text-white px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="w-[800px] h-[800px] bg-rose-600/20 rounded-full blur-[120px] absolute pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center bg-slate-900/80 p-12 rounded-[3rem] border border-rose-500/20 backdrop-blur-xl shadow-2xl">
          <div className="text-rose-500 mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
            <Icons.Lock />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">Acces Restricționat</h1>
          <p className="text-slate-400 font-medium max-w-md mb-10 text-lg">
            Te afli într-o zonă guvernată de protocoale stricte de securitate. Nu deții privilegiile necesare (Rol Administrator) pentru a accesa Centrul de Comandă.
          </p>
          <button 
            onClick={() => router.push('/dashboard')} 
            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black transition-all shadow-xl hover:-translate-y-1 hover:shadow-white/20 flex items-center gap-2"
          >
            Întoarce-te la Siguranță <Icons.ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: PANOUL DE CONTROL (THE GOD MODE)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-500 selection:text-white">
      
      {/* MODAL GLOBAL ACȚIUNI */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => !isProcessing && setDeleteModal({...deleteModal, isOpen: false})}></div>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl relative z-10 animate-fade-in-up flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Icons.Warning />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">{deleteModal.type === 'listing' ? "Ștergi definitiv?" : "Marchezi ca rezolvat?"}</h3>
            <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
              {deleteModal.type === 'listing' 
                ? `Anunțul "${deleteModal.title}" va fi șters permanent din baza de date. Utilizatorul nu îl va mai putea recupera.`
                : `Plângerea pentru "${deleteModal.title}" va fi arhivată ca fiind rezolvată.`}
            </p>
            <div className="flex w-full gap-3">
              <button onClick={() => setDeleteModal({...deleteModal, isOpen: false})} disabled={isProcessing} className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors">
                Anulează
              </button>
              <button onClick={executeDelete} disabled={isProcessing} className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center">
                {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Confirmă"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST MANAGER */}
      <div className="fixed top-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-fade-in pointer-events-auto ${toast.type === 'success' ? 'bg-emerald-900 border-emerald-700 text-emerald-50' : toast.type === 'error' ? 'bg-rose-900 border-rose-700 text-rose-50' : 'bg-amber-900 border-amber-700 text-amber-50'}`}>
            {toast.type === 'success' ? <Icons.CheckCircle /> : <Icons.ErrorCircle />}
            <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* SIDEBAR (Dark Mode Enterprise) */}
      <aside className="w-72 bg-[#0f172a] text-slate-300 hidden lg:flex flex-col shrink-0 border-r border-slate-800 shadow-2xl relative z-20">
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-3 text-white mb-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-black text-xl">R</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Rently<span className="text-blue-500">OS</span></h2>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-13">Admin Workspace</p>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {[
            { id: "overview", icon: <Icons.Dashboard />, label: "Overview" },
            { id: "listings", icon: <Icons.Listings />, label: "Anunțuri Active" },
            { id: "users", icon: <Icons.Users />, label: "Utilizatori Platformă" },
            { id: "feedback", icon: <Icons.Feedback />, label: "Feedback & Rating" },
            { id: "reports", icon: <Icons.Flag />, label: "Centru Moderație", badge: reports.filter(r=>r.status==='pending').length }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={activeTab === item.id ? "text-white" : "text-slate-500"}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge ? (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden ring-2 ring-blue-500/50 p-1">
              <div className="w-full h-full bg-slate-700 rounded-lg overflow-hidden">
                {adminUser?.user_metadata?.avatar_url ? (
                  <img src={adminUser.user_metadata.avatar_url} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500"><Icons.Users /></div>
                )}
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-black text-sm truncate">{adminUser?.user_metadata?.full_name || "Super Admin"}</p>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={() => router.push('/dashboard')} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-sm transition-colors">
            <Icons.Logout /> Ieși din Admin
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden bg-slate-50">
        
        {/* TOPBAR MOBILE */}
        <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-20">
           <h2 className="font-black tracking-tight text-xl">Rently<span className="text-blue-500">OS</span></h2>
           <button onClick={() => router.push('/dashboard')} className="text-xs bg-slate-800 px-3 py-2 rounded-lg font-bold">Ieși</button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-4 sm:p-8 lg:p-12 relative">
          
          {/* HEADER SECTIUNE */}
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight capitalize">
                {activeTab === 'users' ? 'Utilizatori Înregistrați' : activeTab.replace('_', ' ')}
              </h1>
              <p className="text-slate-500 font-medium mt-2 max-w-xl">
                {activeTab === 'overview' && "Privire de ansamblu asupra performanței și sănătății platformei Rently."}
                {activeTab === 'listings' && "Gestionează, filtrează și moderează toate anunțurile postate de utilizatori."}
                {activeTab === 'users' && "Lista completă a conturilor înregistrate în baza de date Supabase."}
                {activeTab === 'feedback' && "Citește ce spun utilizatorii despre platformă. Părerile lor contează."}
                {activeTab === 'reports' && "Atenție necesară: investighează plângerile și asigură un mediu curat."}
              </p>
            </div>
            
            {activeTab === 'listings' && (
              <div className="relative w-full md:w-80">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută după ID, Titlu sau Oraș..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                />
              </div>
            )}
          </header>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fade-in-up space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[1.2rem] flex items-center justify-center shrink-0"><Icons.Users /></div>
                  <div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Total Utilizatori</p>
                    <h3 className="text-3xl font-black text-slate-900">{stats.usersCount}</h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.2rem] flex items-center justify-center shrink-0"><Icons.Listings /></div>
                  <div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Anunțuri Active</p>
                    <h3 className="text-3xl font-black text-slate-900">{stats.listingsCount}</h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-[1.2rem] flex items-center justify-center shrink-0"><Icons.Feedback /></div>
                  <div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Feedback Primit</p>
                    <h3 className="text-3xl font-black text-slate-900">{stats.feedbackCount}</h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-[1.2rem] flex items-center justify-center shrink-0"><Icons.Flag /></div>
                  <div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Reporturi</p>
                    <h3 className="text-3xl font-black text-slate-900">{stats.reportsCount}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Evoluție Platformă (Ultimele 7 zile)</h3>
                    <p className="text-sm text-slate-500 font-medium">Anunțuri noi postate vs. Utilizatori noi</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">+24% Creștere</span>
                </div>
                
                <div className="w-full h-64 relative">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-slate-100/80"></div>)}
                  </div>
                  <svg viewBox="0 0 1000 200" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradientBlue" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0,180 L100,150 L300,160 L500,80 L700,100 L900,40 L1000,20 L1000,200 L0,200 Z" fill="url(#gradientBlue)" />
                    <path d="M0,180 L100,150 L300,160 L500,80 L700,100 L900,40 L1000,20" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="500" cy="80" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" className="animate-pulse" />
                    <circle cx="900" cy="40" r="6" fill="#fff" stroke="#3b82f6" strokeWidth="3" className="animate-pulse" />
                  </svg>
                </div>
                <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
                  <span>Luni</span><span>Marți</span><span>Miercuri</span><span>Joi</span><span>Vineri</span><span>Sâmbătă</span><span>Duminică</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LISTINGS */}
          {activeTab === "listings" && (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden animate-fade-in-up">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Anunț / ID</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Proprietar</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Locație & Preț</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Data Postării</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Acțiuni Moderație</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredListings.length > 0 ? filteredListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                              {listing.image_urls?.[0] ? <img src={listing.image_urls[0]} alt="cover" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-100"></div>}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm max-w-[200px] truncate">{listing.title}</p>
                              <p className="text-[10px] font-medium text-slate-400 font-mono mt-0.5 truncate max-w-[150px]">ID: {listing.id.split('-')[0]}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <img src={listing.profiles?.avatar_url || "https://ui-avatars.com/api/?name=" + listing.profiles?.full_name} alt="avatar" className="w-8 h-8 rounded-full bg-slate-200" />
                            <span className="font-bold text-sm text-slate-700">{listing.profiles?.full_name || 'Utilizator'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="font-black text-emerald-600 text-base">{formatMoney(listing.price)}</p>
                          <p className="text-xs font-bold text-slate-500 uppercase">{listing.city}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-medium text-slate-600">{formatDate(listing.created_at)}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/listing/${listing.id}`} target="_blank" className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-colors" title="Vezi pe site">
                              <Icons.Eye />
                            </Link>
                            <button onClick={() => setDeleteModal({isOpen: true, id: listing.id, type: 'listing', title: listing.title})} className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-colors" title="Șterge Forțat">
                              <Icons.Trash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-8 py-16 text-center text-slate-400 font-medium">
                          Nu am găsit niciun anunț care să corespundă căutării.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: USERS (ACUM FUNCTIONAL CU TABEL DE PROFILE) */}
          {activeTab === "users" && (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden animate-fade-in-up">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Utilizator</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">ID Utilizator</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Data Înregistrării</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {profiles.length > 0 ? profiles.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.avatar_url || "https://ui-avatars.com/api/?name=" + (user.full_name || 'User')} 
                              alt="avatar" 
                              className="w-10 h-10 rounded-full bg-slate-200 object-cover" 
                            />
                            <span className="font-bold text-sm text-slate-900">{user.full_name || 'Utilizator Fără Nume'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{user.id}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-medium text-slate-600">
                            {user.created_at ? formatDate(user.created_at) : 'N/A'}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="px-8 py-16 text-center text-slate-400 font-medium">
                          Niciun utilizator înregistrat în baza de date momentan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FEEDBACK */}
          {activeTab === "feedback" && (
            <div className="animate-fade-in-up">
              {feedback.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-200">
                  <div className="text-slate-300 flex justify-center mb-4"><Icons.Feedback /></div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Liniște totală</h3>
                  <p className="text-slate-500 font-medium">Niciun utilizator nu a lăsat feedback încă. Tabela e pregătită!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {feedback.map(fb => (
                    <div key={fb.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl">
                            {fb.profiles?.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{fb.profiles?.full_name || 'Anonim'}</p>
                            <p className="text-xs font-bold text-slate-400">{fb.profiles?.email || 'Fără email'}</p>
                          </div>
                        </div>
                        <div className="flex bg-amber-50 px-3 py-1.5 rounded-lg text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < fb.rating ? 'opacity-100' : 'opacity-30'}><Icons.Star /></span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-grow bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-100">
                        <p className="text-sm font-medium text-slate-700 italic leading-relaxed">"{fb.message}"</p>
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${fb.type === 'bug' ? 'bg-rose-100 text-rose-600' : fb.type === 'feature_request' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                          {fb.type.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{formatDate(fb.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REPORTS */}
          {activeTab === "reports" && (
            <div className="animate-fade-in-up">
              {reports.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-200">
                  <div className="text-emerald-300 flex justify-center mb-4"><Icons.CheckCircle /></div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Platformă Curată</h3>
                  <p className="text-slate-500 font-medium">Nu există plângeri sau raportări active. Scutul AI face treabă bună!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className={`bg-white p-6 rounded-[2rem] border ${report.status === 'resolved' ? 'border-emerald-200 opacity-70' : 'border-rose-200 shadow-lg'} flex flex-col md:flex-row gap-6 items-start md:items-center`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${report.status === 'resolved' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-600'}`}>
                        <Icons.Flag />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-black text-slate-900">{report.reason}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${report.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Raportat pe entitatea: <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{report.reported_id}</span> ({report.reported_type})</p>
                        {report.description && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm text-slate-700 italic border-l-4 border-l-rose-400">
                            "{report.description}"
                          </div>
                        )}
                        <p className="text-xs font-bold text-slate-400 mt-3">Raportat de: {report.reporter?.full_name || 'Anonim'} pe {formatDate(report.created_at)}</p>
                      </div>
                      <div className="shrink-0 flex gap-2 w-full md:w-auto">
                        <button onClick={() => window.open(`/${report.reported_type === 'listing' ? 'listing' : 'profile'}/${report.reported_id}`, '_blank')} className="flex-1 md:flex-none px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors">
                          Investighează
                        </button>
                        {report.status !== 'resolved' && (
                          <button onClick={() => setDeleteModal({isOpen: true, id: report.id, type: 'report', title: report.reason})} className="flex-1 md:flex-none px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-rose-600/30">
                            Rezolvă
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}