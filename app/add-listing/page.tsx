"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// 1. SUPABASE CLIENT
// ==========================================
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// ==========================================
// 2. FILTRE TEXT & DATE CONSTANTE
// ==========================================
const BAD_WORDS_LIST = [
  "videochat", "escorta", "escortă", "onlyfans", "masaj erotic", "prostituata", 
  "prostituată", "curva", "curvă", "sex", "porn", "porno", "fut", "dracu", "dracului",
  "pula", "pizda", "muie", "sugi", "sugaci", "curve"
];

const AMENITIES_LIST = [
  { id: "wifi", label: "Wi-Fi viteză", icon: "📶" },
  { id: "ac", label: "Aer condiționat", icon: "❄️" },
  { id: "centrala", label: "Încălzire", icon: "🔥" },
  { id: "masina_spalat", label: "Mașină spălat", icon: "🧺" },
  { id: "masina_vase", label: "Mașină vase", icon: "🍽️" },
  { id: "uscator", label: "Uscător rufe", icon: "💨" },
  { id: "bucatarie", label: "Bucătărie", icon: "🍳" },
  { id: "cuptor", label: "Microunde", icon: "🍕" },
  { id: "balcon", label: "Balcon / Terasă", icon: "☀️" },
  { id: "parcare", label: "Parcare", icon: "🚗" },
  { id: "lift", label: "Lift", icon: "🛗" },
  { id: "boxa", label: "Boxă", icon: "📦" },
  { id: "tv", label: "Televizor", icon: "📺" },
  { id: "birou", label: "Birou lucru", icon: "💻" },
];

const MIN_PHOTOS_REQUIRED = 3;
const MAX_PHOTOS_ALLOWED = 10;

// ==========================================
// 3. ICONIȚE VECTORIALE
// ==========================================
const Icons = {
  Upload: () => <svg className="w-10 h-10 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
  CheckCircle: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ErrorCircle: () => <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Shield: () => <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  MapPin: () => <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
};

export default function AddListingPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error' | 'warning', message: string}>({ show: false, type: 'success', message: '' });

  // Verificare Sesiune
  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/login");
      else setUser(session.user);
    }
    checkUser();
  }, [router, supabase]);

  // ==========================================
  // STĂRI FORMULAR
  // ==========================================
  const [tipAnunt, setTipAnunt] = useState("oferta_camera");
  const [tipLocuinta, setTipLocuinta] = useState("camera_privata");
  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [pret, setPret] = useState("");
  const [oras, setOras] = useState("");
  const [adresa, setAdresa] = useState("");
  const [utilitatiIncluse, setUtilitatiIncluse] = useState(false);
  const [garantie, setGarantie] = useState("1_luna");
  
  const [tipCamera, setTipCamera] = useState("single");
  const [numarBai, setNumarBai] = useState("1");
  const [baiePrivata, setBaiePrivata] = useState(false);
  
  const [genCautat, setGenCautat] = useState("oricare");
  const [acceptaCupluri, setAcceptaCupluri] = useState(false);
  const [fumatori, setFumatori] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [lgbtFriendly, setLgbtFriendly] = useState(false);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // 🛡️ Filtru Text Anti-Spam
  const containsBadWords = (text: string) => {
    const normalizedText = text.toLowerCase();
    return BAD_WORDS_LIST.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(normalizedText);
    });
  };

  // ==========================================
  // LOGICĂ NOUĂ: VALIDARE INTELIGENTĂ
  // ==========================================
  const isFormValid = useMemo(() => {
    const isOferta = tipAnunt === "oferta_camera";
    const hasEnoughPhotos = isOferta ? imageFiles.length >= MIN_PHOTOS_REQUIRED : true;

    return (
      titlu.trim().length >= 5 &&
      descriere.trim().length >= 20 &&
      pret.trim() !== "" &&
      oras.trim().length >= 2 &&
      hasEnoughPhotos
    );
  }, [titlu, descriere, pret, oras, imageFiles, tipAnunt]);

  const photoProgress = useMemo(() => {
    if (tipAnunt === "cerere_camera") return 100; // Verde maxim pentru căutare (pozele sunt opționale)
    return Math.min(100, (imageFiles.length / MIN_PHOTOS_REQUIRED) * 100);
  }, [imageFiles.length, tipAnunt]);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // ==========================================
  // LOGICA FOTO 
  // ==========================================
  const processFiles = (filesArray: File[]) => {
    const validImageFiles = filesArray.filter(file => file.type.startsWith('image/'));
    
    if (validImageFiles.length !== filesArray.length) {
      showNotification('warning', 'Am ignorat fișierele care nu sunt imagini.');
    }
    if (imageFiles.length + validImageFiles.length > MAX_PHOTOS_ALLOWED) {
      showNotification('error', `Poți adăuga maxim ${MAX_PHOTOS_ALLOWED} poze în total.`);
      return;
    }

    const newFiles = [...imageFiles, ...validImageFiles];
    setImageFiles(newFiles);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(Array.from(e.target.files));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // ==========================================
  // SUBMIT SPRE SUPABASE
  // ==========================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Verificăm dacă oferă chirie și nu are destule poze
    if (tipAnunt === "oferta_camera" && imageFiles.length < MIN_PHOTOS_REQUIRED) {
      showNotification('error', `Ai nevoie de minim ${MIN_PHOTOS_REQUIRED} poze pentru a posta oferta.`);
      document.getElementById('photo-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const combinedText = titlu + " " + descriere;
    if (containsBadWords(combinedText)) {
      showNotification('error', '🛑 Anunțul conține termeni interziși sau asociați cu spam. Te rugăm să ajustezi textul.');
      return;
    }

    setLoading(true);

    try {
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage.from('listing-images').upload(fileName, file);
          if (uploadError) throw uploadError;
          
          const { data } = supabase.storage.from('listing-images').getPublicUrl(fileName);
          imageUrls.push(data.publicUrl);
        }
      }

      const newListing = {
        user_id: user.id,
        tip_anunt: tipAnunt,
        tip_locuinta: tipLocuinta,
        title: titlu.trim(),
        description: descriere.trim(),
        price: Number(pret),
        city: oras.trim(),
        adresa: adresa.trim(),
        utilitati_incluse: utilitatiIncluse,
        // Salvăm "fara" garanție automat dacă este o cerere
        garantie: tipAnunt === "cerere_camera" ? "fara" : garantie,
        tip_camera: tipCamera,
        numar_bai: Number(numarBai),
        baie_privata: baiePrivata,
        gen_cautat: genCautat,
        accepta_cupluri: acceptaCupluri,
        fumatori: fumatori,
        pet_friendly: petFriendly,
        lgbt_friendly: lgbtFriendly,
        amenities: selectedAmenities,
        image_urls: imageUrls,
        image_url: imageUrls.length > 0 ? imageUrls[0] : null,
      };

      const { error } = await supabase.from("listings").insert([newListing]);
      if (error) throw error;

      showNotification('success', 'Anunțul a fost postat cu succes! 🎉');
      setTimeout(() => { router.push("/dashboard"); }, 1500);

    } catch (error: any) {
      console.error(error);
      showNotification('error', `Eroare: ${error.message}`);
      setLoading(false);
    }
  };

  // ==========================================
  // COMPONENTE UI INTERNE
  // ==========================================
  const ToggleSwitch = ({ checked, onChange, label, sublabel }: any) => (
    <div className={`cursor-pointer flex items-center justify-between p-5 border-2 rounded-2xl transition-all duration-300 ${checked ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300 bg-white'}`} onClick={() => onChange(!checked)}>
      <div>
        <h4 className={`text-sm font-bold ${checked ? 'text-blue-900' : 'text-slate-700'}`}>{label}</h4>
        {sublabel && <p className="text-xs text-slate-500 font-medium mt-1">{sublabel}</p>}
      </div>
      <div className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}>
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );

  const SectionBadge = ({ number, title, colorClass, bgClass }: any) => (
    <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-8">
      <span className={`w-12 h-12 rounded-[1rem] ${bgClass} ${colorClass} flex items-center justify-center font-black text-xl shadow-sm`}>{number}</span>
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900 relative">
      <Header />
      
      <div className="bg-slate-900 text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-2">
        <Icons.Shield /> 
        Platformă protejată de un filtru avansat de securitate.
      </div>

      <div className={`fixed top-24 right-4 sm:right-8 z-50 transition-all duration-500 transform ${notification.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${notification.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' : notification.type === 'warning' ? 'bg-amber-50/90 border-amber-200 text-amber-800' : 'bg-rose-50/90 border-rose-200 text-rose-800'}`}>
          {notification.type === 'success' ? <Icons.CheckCircle /> : <Icons.ErrorCircle />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      <div className="bg-[#0f172a] pt-16 pb-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 font-black text-[11px] tracking-widest uppercase rounded-xl mb-4 border border-blue-500/30">Formular Publicare</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-sm">Postează un anunț</h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto">Detaliază spațiul, adaugă fotografii clare și găsește chiriașul perfect.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow relative -mt-24 pb-24">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-14">
            
            {/* 1. INFORMATII BAZA */}
            <section>
              <SectionBadge number="1" title="Informații de bază" colorClass="text-blue-600" bgClass="bg-blue-100" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Scopul anunțului</label>
                  <select value={tipAnunt} onChange={(e) => setTipAnunt(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 transition-colors">
                    <option value="oferta_camera">Ofer o cameră / locuință</option>
                    <option value="cerere_camera">Caut o cameră</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tip Locuință</label>
                  <select value={tipLocuinta} onChange={(e) => setTipLocuinta(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-blue-600">
                    <option value="camera_privata">Cameră privată</option>
                    <option value="camera_partajata">Cameră partajată</option>
                    <option value="apartament_intreg">Apartament întreg</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Titlul anunțului (Minim 5 caractere) *</label>
                <input type="text" required value={titlu} onChange={(e) => setTitlu(e.target.value)} placeholder="Ex: Cameră spațioasă și luminoasă" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-bold focus:border-blue-600" />
              </div>

              {/* RÂND DINAMIC: Dacă Oferă -> 3 coloane (Include Garanția). Dacă Caută -> 2 coloane */}
              <div className={`grid grid-cols-1 ${tipAnunt === 'oferta_camera' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-6 mb-6`}>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Oraș *</label>
                  <input type="text" required value={oras} onChange={(e) => setOras(e.target.value)} placeholder="Ex: Timișoara" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    {tipAnunt === "cerere_camera" ? "Buget Maxim (Lunar) *" : "Preț (Lunar) *"}
                  </label>
                  <div className="relative">
                    <input type="number" required min="1" value={pret} onChange={(e) => setPret(e.target.value)} placeholder="250" className="w-full pl-5 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600" />
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-slate-400 font-black">€</div>
                  </div>
                </div>
                {tipAnunt === "oferta_camera" && (
                  <div className="animate-fade-in">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Garanție cerută</label>
                    <select value={garantie} onChange={(e) => setGarantie(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold focus:border-blue-600">
                      <option value="fara">Fără garanție</option>
                      <option value="1_luna">1 lună avans</option>
                      <option value="2_luni">2 luni avans</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ToggleSwitch 
                  checked={utilitatiIncluse} 
                  onChange={setUtilitatiIncluse} 
                  label={tipAnunt === "cerere_camera" ? "Caut cu utilități incluse 💡" : "Cheltuielile sunt incluse? 💡"} 
                  sublabel="Apă, gaz, internet" 
                />
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    {tipAnunt === "cerere_camera" ? "Zona preferată (Opțional)" : "Adresa (Opțional)"}
                  </label>
                  <input type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} placeholder="Ex: Complex Studențesc" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-medium focus:border-blue-600 h-[76px]" />
                </div>
              </div>

              {/* 🗺️ GOOGLE MAPS LIVE PREVIEW */}
              {oras.length >= 2 && (
                <div className="mb-8 animate-fade-in-up bg-slate-50 border border-slate-200 p-2 sm:p-4 rounded-[2rem] shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-center px-2 mb-3">
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Icons.MapPin /> Previzualizare {tipAnunt === 'cerere_camera' ? 'Zonă' : 'Locație'} pe Hartă
                    </label>
                  </div>
                  <div className="w-full h-64 sm:h-80 bg-slate-200 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-md relative group">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      loading="lazy" 
                      allowFullScreen 
                      src={`https://www.google.com/maps?q=${encodeURIComponent(`${adresa ? adresa + ', ' : ''}${oras}, Romania`)}&output=embed`}
                    ></iframe>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-lg border border-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span>🌍</span> Vedere Satelit 
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                  <span>Descriere (Minim 20 caractere) *</span>
                  <span className={`${descriere.length < 20 ? 'text-rose-500' : 'text-emerald-500'}`}>{descriere.length} / 20</span>
                </label>
                <textarea 
                  required 
                  rows={5} 
                  value={descriere} 
                  onChange={(e) => setDescriere(e.target.value)} 
                  placeholder={tipAnunt === "cerere_camera" ? "Descrie-te pe tine și exact ce fel de locuință / colegi cauți..." : "Descrie locuința..."} 
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-medium focus:border-blue-600 resize-none" 
                />
              </div>
            </section>

            {/* 2. FACILITATI */}
            <section>
              <SectionBadge number="2" title="Detalii și Facilități" colorClass="text-indigo-600" bgClass="bg-indigo-100" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Capacitate</label>
                  <select value={tipCamera} onChange={(e) => setTipCamera(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold focus:border-indigo-600">
                    <option value="single">Single (1 pers)</option>
                    <option value="dubla">Dublă (2 pers)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Total băi</label>
                  <select value={numarBai} onChange={(e) => setNumarBai(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold focus:border-indigo-600">
                    <option value="1">1 Baie</option>
                    <option value="2">2 Băi</option>
                  </select>
                </div>
                <div className="sm:pt-[28px]">
                  <ToggleSwitch 
                    checked={baiePrivata} 
                    onChange={setBaiePrivata} 
                    label={tipAnunt === "cerere_camera" ? "Vreau baie privată 🛁" : "Oferă baie privată 🛁"} 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">
                  {tipAnunt === "cerere_camera" ? "Facilități dorite" : "Dotări locuință"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {AMENITIES_LIST.map((amenity) => (
                    <div key={amenity.id} onClick={() => toggleAmenity(amenity.id)} className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center text-center gap-2 transition-all duration-300 ${selectedAmenities.includes(amenity.id) ? "border-indigo-600 bg-indigo-50/50 scale-[1.02] shadow-sm" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"}`}>
                      <span className="text-3xl mb-1">{amenity.icon}</span>
                      <span className={`text-[11px] uppercase font-black ${selectedAmenities.includes(amenity.id) ? 'text-indigo-900' : 'text-slate-500'}`}>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. REGULI */}
            <section>
              <SectionBadge number="3" title={tipAnunt === 'cerere_camera' ? 'Preferințe & Stil de Viață' : 'Reguli și Preferințe'} colorClass="text-pink-600" bgClass="bg-pink-100" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Gen preferat</label>
                  <select value={genCautat} onChange={(e) => setGenCautat(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold focus:border-pink-500">
                    <option value="oricare">Indiferent</option>
                    <option value="femei">Doar Femei</option>
                    <option value="barbati">Doar Bărbați</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Stil de viață</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ToggleSwitch 
                    checked={acceptaCupluri} 
                    onChange={setAcceptaCupluri} 
                    label={tipAnunt === "cerere_camera" ? "Suntem un cuplu 👫" : "Acceptați cupluri? 👫"} 
                  />
                  <ToggleSwitch 
                    checked={fumatori} 
                    onChange={setFumatori} 
                    label={tipAnunt === "cerere_camera" ? "Sunt fumător 🚬" : "Acceptați fumători? 🚬"} 
                  />
                  <ToggleSwitch 
                    checked={petFriendly} 
                    onChange={setPetFriendly} 
                    label={tipAnunt === "cerere_camera" ? "Am animal de companie 🐾" : "Pet-friendly? 🐾"} 
                  />
                  <ToggleSwitch 
                    checked={lgbtFriendly} 
                    onChange={setLgbtFriendly} 
                    label={tipAnunt === "cerere_camera" ? "Fac parte din comunitate 🌈" : "LGBTQ+ Friendly? 🌈"} 
                  />
                </div>
              </div>
            </section>

            {/* 4. FOTOGRAFII & SCUT */}
            <section id="photo-section" className="scroll-mt-24">
              <SectionBadge 
                number="4" 
                title={tipAnunt === "cerere_camera" ? "Fotografii (Opțional)" : `Fotografii (Minim ${MIN_PHOTOS_REQUIRED})`} 
                colorClass="text-emerald-600" 
                bgClass="bg-emerald-100" 
              />
              
              <div className="mb-6 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-200 relative overflow-hidden transition-all duration-300">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h4 className="font-black text-slate-900">
                      {tipAnunt === "cerere_camera" ? "Imagini profil căutare" : "Nivel încredere anunț"}
                    </h4>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      {tipAnunt === "cerere_camera" 
                        ? "Nu este obligatoriu să adaugi poze pentru o cerere de chirie. Te poți prezenta doar prin text!"
                        : (imageFiles.length === 0 
                            ? `Pentru a posta, trebuie să adaugi minim ${MIN_PHOTOS_REQUIRED} poze clare.` 
                            : imageFiles.length < MIN_PHOTOS_REQUIRED 
                              ? `Mai adaugă ${MIN_PHOTOS_REQUIRED - imageFiles.length} poze.` 
                              : "Perfect! Ai atins minimul!")
                      }
                    </p>
                  </div>
                  <span className={`text-2xl font-black ${tipAnunt === "cerere_camera" || imageFiles.length >= MIN_PHOTOS_REQUIRED ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {tipAnunt === "cerere_camera" && imageFiles.length === 0 ? "Opțional" : `${imageFiles.length}${tipAnunt === "oferta_camera" ? `/${MIN_PHOTOS_REQUIRED}` : ''}`}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${tipAnunt === "cerere_camera" ? 'bg-emerald-500 w-full' : (imageFiles.length === 0 ? 'bg-transparent' : imageFiles.length < MIN_PHOTOS_REQUIRED ? 'bg-amber-400' : 'bg-emerald-500')}`} style={{ width: tipAnunt === "cerere_camera" ? '100%' : `${photoProgress}%` }}></div>
                </div>
              </div>

              <div 
                className={`relative border-4 border-dashed rounded-[2rem] p-8 sm:p-12 text-center flex flex-col items-center min-h-[250px] transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : imageFiles.length === 0 ? 'border-slate-300 bg-slate-50' : 'border-slate-200 bg-white'}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              >
                {imageFiles.length === 0 ? (
                  <div className="flex flex-col items-center animate-fade-in">
                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-blue-500"><Icons.Upload /></div>
                    <h3 className="text-xl font-black mb-2">Trage pozele aici</h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm">
                      {tipAnunt === "cerere_camera" 
                        ? "Opțional: Adaugă o fotografie reprezentativă cu tine sau animalul tău de companie." 
                        : `Minim ${MIN_PHOTOS_REQUIRED} fotografii luminoase și clare cu proprietatea ta.`}
                    </p>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white border-2 border-slate-200 font-bold px-6 py-3 rounded-xl hover:text-blue-600 transition-colors shadow-sm hover:shadow-md">
                      Caută în calculator
                    </button>
                  </div>
                ) : (
                  <div className="w-full animate-fade-in">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                      {imagePreviews.map((src, index) => (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                          {index === 0 && <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent pt-2 pb-4 px-2 z-10"><span className="text-white text-[10px] font-black uppercase bg-emerald-500 px-2 py-1 rounded-md">Copertă</span></div>}
                          <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center z-10 transition-opacity">
                            <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="bg-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold hover:bg-rose-600 transition-colors shadow-lg">✕</button>
                          </div>
                        </div>
                      ))}
                      {imageFiles.length < MAX_PHOTOS_ALLOWED && (
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 transition-colors bg-slate-50 hover:bg-blue-50">
                          <span className="text-4xl mb-1">+</span><span className="text-[11px] font-black uppercase">Adaugă</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
                <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
              </div>
            </section>

            {/* BUTON SUBMIT */}
            <div className="pt-10 flex flex-col items-center justify-center border-t border-slate-100">
              {!isFormValid && !loading && (
                <div className="mb-6 flex items-start gap-3 bg-amber-50 text-amber-800 px-5 py-4 rounded-2xl border border-amber-200 max-w-lg text-left animate-fade-in-up">
                  <span className="text-xl">⚠️</span>
                  <p className="text-sm font-bold">
                    Formular incomplet! Asigură-te că ai completat toate câmpurile obligatorii
                    {tipAnunt === "oferta_camera" && ` și ai adăugat minim ${MIN_PHOTOS_REQUIRED} poze`}.
                  </p>
                </div>
              )}
              <button type="submit" disabled={loading || !isFormValid} className="bg-slate-900 hover:bg-black text-white font-black py-5 px-16 rounded-[1.5rem] disabled:opacity-40 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                {loading ? "Se publică..." : !isFormValid ? <><Icons.Lock /> Formular Incomplet</> : "🚀 Postează Anunțul"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}