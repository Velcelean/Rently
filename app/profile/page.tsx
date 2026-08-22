"use client";

import { useEffect, useState, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// 1. DEFINIREA TIPURILOR STRICTE
// ==========================================
interface UserProfile {
  id: string;
  full_name: string;
  bio: string;
  varsta: number | null;
  ocupatie: string;
  avatar_url: string;
  instagram_url: string;
  facebook_url: string;
}

// ==========================================
// 2. ICONIȚE SVG PREMIUM VECTORIALE
// ==========================================
const Icons = {
  Camera: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  CheckCircle: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ErrorCircle: () => <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  UserCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  IdCard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
  Quote: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  LinkIcon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  Instagram: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>,
  Facebook: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>,
  Trash: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
};

// ==========================================
// 3. FUNCȚIE CLIENT SUPABASE
// ==========================================
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export default function IdentityProfilePage() {
  const [supabase] = useState(() => createClient());
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Stări de Încărcare și UI
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Stare pentru Notificări Custom (Toasts)
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error', message: string}>({ show: false, type: 'success', message: '' });

  // Stările Formularului
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [varsta, setVarsta] = useState("");
  const [ocupatie, setOcupatie] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  // Stări pentru Ștergerea Contului (DANGER ZONE)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const BIO_MAX_LENGTH = 300;

  // ==========================================
  // FETCH DATE INITIALE
  // ==========================================
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login");
          return;
        }
        if (isMounted) setUser(session.user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile && isMounted) {
          setFullName(profile.full_name || "");
          setBio(profile.bio || "");
          setVarsta(profile.varsta?.toString() || "");
          setOcupatie(profile.ocupatie || "");
          setAvatarUrl(profile.avatar_url || "");
          setInstagram(profile.instagram_url || "");
          setFacebook(profile.facebook_url || "");
        }
      } catch (error) {
        console.error("Eroare la încărcarea profilului:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProfile();

    return () => { isMounted = false; };
  }, [supabase, router]);

  // ==========================================
  // UPLOAD AVATAR (COMPLEX)
  // ==========================================
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Nu ai selectat nicio imagine.");
      }

      const file = event.target.files[0];
      
      // Validare mărime fișier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Imaginea este prea mare. Te rugăm să încarci o poză sub 5MB.");
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      
      showNotification('success', 'Fotografia a fost încărcată cu succes!');
      
    } catch (error: any) {
      showNotification('error', error.message);
    } finally {
      setIsUploading(false);
      // Reset input ca să poți reîncărca aceeași poză dacă vrei
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SALVARE DATE
  // ==========================================
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 3) {
      showNotification('error', 'Te rugăm să introduci un nume valid.');
      return;
    }
    
    setSaving(true);

    try {
      const updates = {
        id: user.id,
        full_name: fullName.trim(),
        bio: bio.trim(),
        varsta: varsta ? parseInt(varsta) : null,
        ocupatie: ocupatie.trim(),
        avatar_url: avatarUrl,
        instagram_url: instagram.trim(),
        facebook_url: facebook.trim(),
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      // Actualizăm și metadatele de auth pentru sincronizare perfectă în header
      await supabase.auth.updateUser({
        data: { full_name: fullName.trim(), avatar_url: avatarUrl }
      });

      showNotification('success', 'Cartea ta de vizită a fost salvată!');
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error: any) {
      showNotification('error', `Eroare: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // ȘTERGERE CONT (DANGER ZONE)
  // ==========================================
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // 1. Apelăm funcția RPC creată în SQL pentru ștergerea completă din backend
      const { error } = await supabase.rpc('delete_my_account');
      if (error) throw error;

      // 2. Deconectăm utilizatorul forțat
      await supabase.auth.signOut();
      
      // 3. Îl aruncăm pe prima pagină
      router.push("/");
      router.refresh();
      
    } catch (error: any) {
      showNotification('error', "Eroare la ștergerea contului: " + error.message);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // ==========================================
  // SKELETON LOADER UI (Premium Shimmer)
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex justify-center p-4 lg:p-12 animate-pulse">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-40 bg-slate-200 rounded-[2rem] w-full"></div>
              <div className="h-96 bg-slate-200 rounded-[2rem] w-full"></div>
            </div>
            <div className="hidden lg:block h-[500px] bg-slate-200 rounded-[2.5rem] w-full"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ==========================================
  // MAIN RENDER (UI COMPLEX)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900 relative">
      <Header />
      
      {/* NOTIFICARE PLUTITOARE (TOAST) */}
      <div className={`fixed top-24 right-4 sm:right-8 z-50 transition-all duration-500 transform ${notification.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${notification.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' : 'bg-rose-50/90 border-rose-200 text-rose-800'}`}>
          {notification.type === 'success' ? <Icons.CheckCircle /> : <Icons.ErrorCircle />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      {/* MODAL ȘTERGERE CONT (CONFIRMARE) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => !isDeleting && setShowDeleteModal(false)}></div>
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative z-10 animate-fade-in-up">
            
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Icons.Trash />
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Ești absolut sigur?</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Această acțiune va șterge <b>definitiv</b> contul tău, toate anunțurile tale active, mesajele și recenziile pe care le-ai lăsat. Nu putem recupera aceste date.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDeleteAccount} 
                disabled={isDeleting} 
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Se șterge...</>
                ) : "Da, Șterge Definitiv"}
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)} 
                disabled={isDeleting} 
                className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Nu, renunță
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO BANNER DECORATIV */}
      <div className="bg-[#0f172a] text-white pt-20 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-sm">
            Cartea ta de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Vizită</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto lg:mx-0">
            Aici construiești prima impresie. Editează-ți datele și vezi în timp real cum te vor percepe viitorii colegi sau proprietari.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full flex-grow relative -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================== */}
          {/* COLOANA STÂNGĂ: FORMULARUL COMPLEX (SPAN 7) */}
          {/* ========================================== */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-2xl shadow-slate-200/50">
            <form onSubmit={handleSave} className="space-y-10">
              
              {/* SECȚIUNEA 1: AVATAR UPLOADER */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <label className="relative group cursor-pointer shrink-0 block">
                  <div className="w-32 h-32 md:w-36 md:h-36 bg-slate-50 rounded-[2.5rem] border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-5xl transform transition-all duration-400 group-hover:scale-105 group-hover:shadow-2xl relative ring-1 ring-slate-100/50">
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 transition-all">
                        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                    )}

                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-200">
                        <Icons.UserCircle />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <span className="text-white text-xs font-black tracking-widest uppercase flex flex-col items-center gap-1">
                        <Icons.Camera /> Upload
                      </span>
                    </div>
                  </div>
                </label>

                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  disabled={isUploading}
                  className="hidden" 
                />
                
                <div className="w-full text-center sm:text-left mt-2 sm:mt-4 flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Poza de profil</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto sm:mx-0">
                    O poză clară, luminoasă și prietenoasă crește exponențial încrederea. Click pe iconiță pentru a încărca (Max 5MB).
                  </p>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl w-max mx-auto sm:mx-0 transition-colors"
                  >
                    Alege altă imagine
                  </button>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* SECȚIUNEA 2: DATE DE BAZĂ */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Icons.IdCard /></div>
                  Date Principale
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nume și Prenume *</label>
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      placeholder="Ex: Alexandru Popescu"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Vârsta</label>
                      <input 
                        type="number" 
                        value={varsta} 
                        onChange={(e) => setVarsta(e.target.value)} 
                        placeholder="Ex: 24" 
                        min="16" max="99"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Ocupația</label>
                      <input 
                        type="text" 
                        value={ocupatie} 
                        onChange={(e) => setOcupatie(e.target.value)} 
                        placeholder="Ex: Arhitect / Student"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold truncate" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECȚIUNEA 3: BIO */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Icons.Quote /></div>
                  Scurtă Prezentare (Bio)
                </h3>
                <div className="relative">
                  <textarea 
                    rows={5} 
                    maxLength={BIO_MAX_LENGTH}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="Spune-ne câteva lucruri despre tine: ce pasiuni ai, cum arată programul tău, cum ești ca și coleg de apartament..." 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium resize-none leading-relaxed" 
                  />
                  <div className={`absolute bottom-3 right-4 text-xs font-bold ${bio.length >= BIO_MAX_LENGTH ? 'text-rose-500' : 'text-slate-400'}`}>
                    {bio.length} / {BIO_MAX_LENGTH}
                  </div>
                </div>
              </div>

              {/* SECȚIUNEA 4: SOCIAL MEDIA */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center"><Icons.LinkIcon /></div>
                  Conexiuni Sociale
                </h3>
                <div className="space-y-4">
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-pink-500"><Icons.Instagram /></div>
                    <input 
                      type="url" 
                      value={instagram} 
                      onChange={(e) => setInstagram(e.target.value)} 
                      placeholder="Link către profilul tău de Instagram" 
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-medium" 
                    />
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-blue-600"><Icons.Facebook /></div>
                    <input 
                      type="url" 
                      value={facebook} 
                      onChange={(e) => setFacebook(e.target.value)} 
                      placeholder="Link către profilul tău de Facebook" 
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium" 
                    />
                  </div>
                </div>
              </div>

              {/* BUTTONS SAVE */}
              <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => router.back()}
                  className="w-full sm:w-auto px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  Anulează
                </button>
                <button 
                  type="submit" 
                  disabled={saving || isUploading || fullName.trim().length < 3} 
                  className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white font-black text-lg py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Se actualizează...
                    </>
                  ) : (
                    "Salvează Modificările"
                  )}
                </button>
              </div>
            </form>

            {/* ========================================== */}
            {/* ZONA DE PERICOL (DANGER ZONE) */}
            {/* ========================================== */}
            <div className="mt-12 pt-8 border-t border-rose-100">
              <h3 className="text-lg font-black text-rose-600 mb-4 flex items-center gap-2">
                <Icons.Trash /> Zona de Pericol
              </h3>
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-rose-900 mb-1">Șterge contul definitiv</h4>
                  <p className="text-sm text-rose-700/80 font-medium leading-relaxed max-w-sm">
                    Odată șters, contul tău, anunțurile, mesajele și recenziile nu mai pot fi recuperate. Această acțiune este ireversibilă.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="shrink-0 bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 font-black px-6 py-3.5 rounded-xl transition-all shadow-sm"
                >
                  Șterge Contul
                </button>
              </div>
            </div>

          </div>

          {/* ========================================== */}
          {/* COLOANA DREAPTĂ: LIVE PREVIEW (SPAN 5)     */}
          {/* ========================================== */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 pl-2">Live Preview</h3>
            
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden group">
              {/* Cover Image Decorativ pentru Card */}
              <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              </div>
              
              <div className="px-8 pb-8 pt-0 relative flex flex-col items-center">
                {/* Avatar pe Preview */}
                <div className="w-28 h-28 bg-white rounded-3xl p-1.5 shadow-lg -mt-14 relative z-10">
                  <div className="w-full h-full bg-slate-100 rounded-2xl overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><Icons.UserCircle /></div>
                    )}
                  </div>
                </div>

                {/* Date pe Preview */}
                <div className="mt-4 text-center w-full">
                  <h2 className={`text-2xl font-black truncate px-2 ${fullName ? 'text-slate-900' : 'text-slate-300'}`}>
                    {fullName || "Numele Tău"}
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {ocupatie && (
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold truncate max-w-[150px]">
                        {ocupatie}
                      </span>
                    )}
                    {varsta && (
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">
                        {varsta} ani
                      </span>
                    )}
                    {!ocupatie && !varsta && (
                      <span className="text-slate-400 text-xs font-medium italic">Completează vârsta/ocupația</span>
                    )}
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-6"></div>

                <div className="w-full text-left">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Despre mine</h4>
                  {bio ? (
                    <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap break-words">
                      {bio}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-full"></div>
                      <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                      <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                    </div>
                  )}
                </div>

                {(instagram || facebook) && (
                  <div className="w-full mt-6 pt-6 border-t border-slate-100 flex justify-center gap-4">
                    {instagram && (
                      <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center transform transition-transform hover:scale-110">
                        <Icons.Instagram />
                      </div>
                    )}
                    {facebook && (
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transform transition-transform hover:scale-110">
                        <Icons.Facebook />
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            </div>
            
            <div className="mt-6 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4 items-start">
              <span className="text-2xl mt-0.5">🧐</span>
              <p className="text-sm text-blue-900 font-medium leading-relaxed">
                Acesta este cardul pe care îl vor vedea ceilalți utilizatori când dau click pe profilul tău din secțiunea de mesaje sau din pagina unui anunț. Asigură-te că arată impecabil!
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}