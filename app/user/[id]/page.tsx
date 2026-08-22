"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnuntCard from "@/components/AnuntCard";

// ==========================================
// 1. SUPABASE CLIENT
// ==========================================
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// ==========================================
// 2. ICONIȚE VECTORIALE PREMIUM
// ==========================================
const Icons = {
  User: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  StarFull: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.898 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  StarEmpty: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.898 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  ShieldCheck: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Message: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  Flag: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>,
  CheckCircle: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ErrorCircle: () => <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Briefcase: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
};

// ==========================================
// 3. DEFINIREA TIPURILOR
// ==========================================
interface Profile {
  id: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  varsta: number;
  ocupatie: string;
  created_at: string;
}

interface Review {
  id: string;
  reviewer_id: string;
  rating: number;
  message: string;
  created_at: string;
  reviewer?: {
    full_name: string;
    avatar_url: string;
  };
}

// ==========================================
// 4. COMPONENTA PRINCIPALĂ
// ==========================================
export default function PublicProfilePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  
  // Stări Date
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Stări Verificare
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Stări UI Modal Review
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stări UI Modal Report
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("inappropriate");
  const [reportDetails, setReportDetails] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  // UI Notificări
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error', message: string}>({ show: false, type: 'success', message: '' });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 4000);
  };

  // ==========================================
  // FETCH TOATE DATELE
  // ==========================================
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const myId = session?.user?.id;
        if (isMounted && myId) setCurrentUser(session.user);

        // 1. Profilul vizat
        const { data: profData, error: profError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (profError || !profData) {
          router.push("/404");
          return;
        }

        // 2. Anunțurile active ale vizatului
        const { data: listData } = await supabase
          .from("listings")
          .select("*")
          .eq("user_id", id)
          .order("created_at", { ascending: false });

        // 3. Recenziile primite (și cine le-a lăsat)
        const { data: revData } = await supabase
          .from("user_reviews")
          .select("*, reviewer:profiles!reviewer_id(full_name, avatar_url)")
          .eq("reviewee_id", id)
          .order("created_at", { ascending: false });

        // 4. Verificare interacțiune (Pentru a preveni review-urile fake)
        if (myId && myId !== id) {
          const { data: convData } = await supabase
            .from("conversations")
            .select("id")
            .or(`and(tenant_id.eq.${myId},owner_id.eq.${id}),and(tenant_id.eq.${id},owner_id.eq.${myId})`);
            
          if (convData && convData.length > 0) {
            setHasInteracted(true);
          }
        }

        if (isMounted) {
          setProfile(profData);
          setListings(listData || []);
          setReviews(revData || []);
          setLoading(false);
        }

      } catch (error) {
        console.error("Eroare incarcare profil:", error);
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [id, supabase, router]);

  // ==========================================
  // LOGICĂ MATEMATICĂ (Rating)
  // ==========================================
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingLabel = useMemo(() => {
    if (rating === 1) return "Groaznic 😞";
    if (rating === 2) return "Slab 😕";
    if (rating === 3) return "Ok 😐";
    if (rating === 4) return "Foarte Bun 🙂";
    if (rating === 5) return "Excelent! 🌟";
    return "Alege o notă";
  }, [rating]);

  // ==========================================
  // SALVARE REVIEW
  // ==========================================
  const submitReview = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (rating === 0) {
      showNotification('error', "Te rugăm să acorzi cel puțin o stea.");
      return;
    }
    if (reviewMessage.trim().length < 10) {
      showNotification('error', "Recenzia ta este prea scurtă. Fii mai detaliat.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("user_reviews").upsert({
        reviewer_id: currentUser.id,
        reviewee_id: id,
        rating: rating,
        message: reviewMessage.trim()
      }, { onConflict: 'reviewer_id, reviewee_id' });

      if (error) throw error;

      showNotification('success', "Recenzia ta a fost publicată cu succes!");
      setIsReviewModalOpen(false);
      
      const { data: noileRecenzii } = await supabase
          .from("user_reviews")
          .select("*, reviewer:profiles!reviewer_id(full_name, avatar_url)")
          .eq("reviewee_id", id)
          .order("created_at", { ascending: false });
      
      if (noileRecenzii) setReviews(noileRecenzii);

    } catch (err: any) {
      showNotification('error', "A apărut o eroare: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // SALVARE RAPORT (REPORT)
  // ==========================================
  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showNotification('error', "Trebuie să fii autentificat pentru a trimite un raport.");
      router.push("/login");
      return;
    }

    setSubmittingReport(true);
    try {
      const { error } = await supabase.from("reports").insert([
        {
          reporter_id: currentUser.id,
          reported_user_id: id,
          reason: reportReason,
          details: reportDetails.trim(),
          status: "pending"
        }
      ]);

      if (error) throw error;

      showNotification('success', "Raportul a fost trimis! Echipa noastră îl va analiza.");
      setShowReportModal(false);
      setReportDetails("");
    } catch (err: any) {
      showNotification('error', "A apărut o eroare la trimitere: " + err.message);
    } finally {
      setSubmittingReport(false);
    }
  };

  // ==========================================
  // START RENDER & SKELETON
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
        <Header />
        <div className="flex-grow max-w-5xl mx-auto px-4 w-full py-12 animate-pulse">
          <div className="h-64 bg-slate-200 rounded-[3rem] w-full mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 h-96 bg-slate-200 rounded-[2.5rem]"></div>
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 bg-slate-200 rounded-[2rem]"></div>
              <div className="h-40 bg-slate-200 rounded-[2rem]"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) return null;

  const isOwnProfile = currentUser?.id === profile.id;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-200 selection:text-indigo-900 relative">
      <Header />

      {/* NOTIFICARE PLUTITOARE (TOAST) */}
      <div className={`fixed top-24 right-4 sm:right-8 z-50 transition-all duration-500 transform ${notification.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${notification.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' : 'bg-rose-50/90 border-rose-200 text-rose-800'}`}>
          {notification.type === 'success' ? <Icons.CheckCircle /> : <Icons.ErrorCircle />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL DE RECENZIE (P2P REVIEW) */}
      {/* ========================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => !isSubmitting && setIsReviewModalOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative z-10 animate-fade-in-up">
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-slate-900">Evaluează Experiența</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                Cum a fost interacțiunea ta cu {profile.full_name}? Părerea ta ajută comunitatea să ia decizii mai bune.
              </p>
            </div>

            {/* Stele Interactive */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex gap-2 mb-2" onMouseLeave={() => setHoveredStar(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onClick={() => setRating(star)}
                    className="transform transition-transform hover:scale-110 focus:outline-none"
                  >
                    <div className={`${(hoveredStar || rating) >= star ? 'text-amber-400' : 'text-slate-200'} transition-colors duration-200`}>
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.898 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                  </button>
                ))}
              </div>
              <span className={`text-sm font-black uppercase tracking-widest ${rating > 3 ? 'text-emerald-500' : rating > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                {ratingLabel}
              </span>
            </div>

            <textarea 
              rows={4}
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="Ex: Apartamentul a fost super curat, iar el m-a ajutat cu toate detaliile..."
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:border-amber-400 transition-all font-medium resize-none text-sm mb-6"
            />

            <div className="flex w-full gap-3">
              <button onClick={() => setIsReviewModalOpen(false)} disabled={isSubmitting} className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors disabled:opacity-50">
                Anulează
              </button>
              <button onClick={submitReview} disabled={isSubmitting} className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center">
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Publică"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL DE RAPORTARE PROFIL (REPORT USER) */}
      {/* ========================================== */}
      {showReportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => !submittingReport && setShowReportModal(false)}></div>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative z-10 animate-fade-in-up">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚩</span>
              <h3 className="font-black text-2xl text-slate-900">Raportează Profilul</h3>
            </div>
            <p className="text-slate-500 font-medium text-xs mb-6 leading-relaxed">
              Ajută-ne să păstrăm comunitatea Roomy sigură. Raportarea este 100% confidențială și va fi verificată de echipa noastră.
            </p>

            <form onSubmit={handleSendReport} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Motivul Raportului</label>
                <select 
                  value={reportReason} 
                  onChange={(e) => setReportReason(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-slate-900 text-sm outline-none focus:border-rose-500 transition-colors"
                >
                  <option value="inappropriate">🛑 Comportament sau Limbaj Nepotrivit</option>
                  <option value="scam">⚠️ Profil Fals / Suspect de Fraudă</option>
                  <option value="spam">📩 Trimitere de Mesaje Spam</option>
                  <option value="other">❓ Alt Motiv</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Detalii suplimentare</label>
                <textarea 
                  rows={3} 
                  value={reportDetails} 
                  onChange={(e) => setReportDetails(e.target.value)} 
                  placeholder="Descrie pe scurt motivul pentru care raportezi acest profil..." 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 text-sm font-medium resize-none outline-none focus:border-rose-500 transition-colors" 
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowReportModal(false)} 
                  disabled={submittingReport}
                  className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  Renunță
                </button>
                <button 
                  type="submit" 
                  disabled={submittingReport} 
                  className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submittingReport ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Trimite Raport"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* HEADER PROFIL (COVER + INFO) */}
      {/* ========================================== */}
      <div className="bg-[#0f172a] pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow relative -mt-36 pb-24">
        
        {/* CARTE DE VIZITĂ SUPERIOARĂ */}
        <div className="bg-white rounded-[3rem] p-6 sm:p-10 border border-slate-200 shadow-2xl shadow-slate-200/40 mb-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            
            {/* Avatar uriaș */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full bg-slate-100 rounded-[1.5rem] overflow-hidden">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300"><Icons.User /></div>
                )}
              </div>
            </div>

            {/* Informații Esențiale */}
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{profile.full_name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black uppercase tracking-widest border border-emerald-100/50">
                  <Icons.ShieldCheck /> Verificat
                </span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-slate-500 mb-6">
                {profile.ocupatie && <span className="flex items-center gap-1.5"><Icons.Briefcase /> {profile.ocupatie}</span>}
                {profile.varsta && <span className="flex items-center gap-1.5"><Icons.Calendar /> {profile.varsta} ani</span>}
                <span className="flex items-center gap-1.5">Membru din {new Date(profile.created_at).getFullYear()}</span>
              </div>

              {/* Statistici Profil */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <span className="text-amber-400 flex"><Icons.StarFull /></span>
                  <span className="font-black text-slate-900 text-lg">{averageRating}</span>
                  <span className="text-xs font-bold text-slate-400">({reviews.length} recenzii)</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <span className="font-black text-slate-900 text-lg">{listings.length}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Anunțuri active</span>
                </div>
              </div>
            </div>

            {/* Butoane Acțiune (Dreapta) */}
            <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
              {!isOwnProfile && (
                <button 
                  onClick={() => router.push(`/inbox?user=${id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1 flex items-center justify-center gap-2 w-full"
                >
                  <Icons.Message /> Trimite Mesaj
                </button>
              )}
              {isOwnProfile && (
                <Link href="/profile" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-8 py-4 rounded-2xl transition-all text-center w-full">
                  Editează Profilul
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* GRID INFERIOR (STÂNGA/DREAPTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLOANA STÂNGĂ: BIO & ANUNȚURI */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Secțiune Despre Mine */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-4">Despre mine</h3>
              {profile.bio ? (
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
              ) : (
                <p className="text-slate-400 italic text-sm">Acest utilizator nu a adăugat o descriere încă.</p>
              )}
              
              {/* Buton Report Inclus Subtil */}
              {!isOwnProfile && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors"
                  >
                    <Icons.Flag /> Raportează acest profil
                  </button>
                </div>
              )}
            </div>

            {/* Secțiune Anunțuri Active */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                Anunțuri Postate <span className="bg-slate-200 text-slate-600 text-sm px-2.5 py-0.5 rounded-lg">{listings.length}</span>
              </h3>
              {listings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {listings.map(listing => (
                    <div key={listing.id} className="bg-white rounded-[1.5rem] p-3 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                      <AnuntCard data={listing} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 text-center">
                  <p className="text-slate-400 font-medium">Nu există anunțuri active momentan.</p>
                </div>
              )}
            </div>
          </div>

          {/* COLOANA DREAPTĂ: RECENZII (P2P SYSTEM) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden sticky top-24 flex flex-col max-h-[800px]">
              
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-2xl font-black text-slate-900">Recenzii</h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Icons.StarFull />
                    <span className="font-black text-slate-900 text-xl">{averageRating}</span>
                  </div>
                </div>

                {!isOwnProfile && (
                  hasInteracted ? (
                    <button 
                      onClick={() => setIsReviewModalOpen(true)}
                      className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                    >
                      Evaluează Utilizatorul
                    </button>
                  ) : (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-xs font-bold text-amber-700 text-center leading-relaxed">
                        🔒 Poți lăsa o recenzie doar după ce ai inițiat o conversație în mesaje cu {profile.full_name}. Acest sistem previne recenziile false.
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Lista de Review-uri (Scrollable) */}
              <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map(rev => (
                      <div key={rev.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <img src={rev.reviewer?.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(rev.reviewer?.full_name || "User")} alt="avatar" className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{rev.reviewer?.full_name || 'Anonim'}</p>
                              <p className="text-[10px] font-bold text-slate-400">{formatDate(rev.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex text-amber-400 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'opacity-100' : 'opacity-30'}`}><Icons.StarFull /></span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">"{rev.message}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center opacity-50">
                    <Icons.StarEmpty />
                    <p className="text-sm font-bold text-slate-500 mt-2">Nu există nicio recenzie încă.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Funcție utilitară pt dată
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
};