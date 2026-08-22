"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnuntCard from "@/components/AnuntCard";

// ==========================================
// 1. TIPURI STRICTE PENTRU TYPESCRIPT
// ==========================================
interface Listing {
  id: string;
  created_at: string;
  title: string;
  description: string;
  price: number;
  city: string;
  tip_anunt: string;
  tip_locuinta: string;
  tip_camera: string;
  numar_bai: number;
  baie_privata: boolean;
  pet_friendly: boolean;
  accepta_cupluri: boolean;
  utilitati_incluse: boolean;
  lgbt_friendly: boolean;
  amenities: string[];
  image_url: string | null;
  image_urls: string[] | null;
  user_id: string;
}

// ==========================================
// 2. CONSTANTE ȘI DATE FIXE
// ==========================================
const AMENITIES_LIST = [
  { id: "wifi", label: "Wi-Fi rapid", icon: "📶" },
  { id: "ac", label: "Aer condiționat", icon: "❄️" },
  { id: "centrala", label: "Încălzire", icon: "🔥" },
  { id: "masina_spalat", label: "Mașină spălat", icon: "🧺" },
  { id: "masina_vase", label: "Mașină vase", icon: "🍽️" },
  { id: "uscator", label: "Uscător rufe", icon: "💨" },
  { id: "bucatarie", label: "Bucătărie utilată", icon: "🍳" },
  { id: "cuptor", label: "Cuptor / Microunde", icon: "🍕" },
  { id: "balcon", label: "Balcon / Terasă", icon: "☀️" },
  { id: "parcare", label: "Parcare", icon: "🚗" },
  { id: "lift", label: "Lift", icon: "🛗" },
  { id: "boxa", label: "Boxă depozitare", icon: "📦" },
  { id: "tv", label: "Televizor", icon: "📺" },
  { id: "birou", label: "Spațiu lucru", icon: "💻" },
];

// ==========================================
// 3. ICONIȚE SVG VECTORIALE (PREMIUM)
// ==========================================
const Icons = {
  Location: () => <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>,
  Settings: () => <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>,
  Search: () => <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>,
  ChevronDown: () => <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>,
};

// ==========================================
// 4. FUNCȚIE CLIENT SUPABASE
// ==========================================
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// ==========================================
// 5. COMPONENTA PRINCIPALĂ
// ==========================================
export default function AnunturiPage() {
  const [supabase] = useState(() => createClient());
  const [anunturi, setAnunturi] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------
  // STĂRI PENTRU FILTRE DE BAZĂ (Top Bar)
  // ----------------------------------------
  const [oras, setOras] = useState("");
  const [tipAnunt, setTipAnunt] = useState("");
  const [tipCamera, setTipCamera] = useState("");
  const [pretMax, setPretMax] = useState("");
  const [sortOrder, setSortOrder] = useState("noi");

  // ----------------------------------------
  // STĂRI PENTRU MODAL (Filtre Avansate)
  // ----------------------------------------
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  
  const [tipLocuinta, setTipLocuinta] = useState("");
  const [minBai, setMinBai] = useState("");
  const [baiePrivata, setBaiePrivata] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [utilitatiIncluse, setUtilitatiIncluse] = useState(false); // Cheltuieli incluse
  const [lgbtFriendly, setLgbtFriendly] = useState(false);
  const [acceptaCupluri, setAcceptaCupluri] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // ----------------------------------------
  // FUNCȚIA DE FETCH (MOTORUL DE CĂUTARE)
  // ----------------------------------------
  const fetchAnunturi = async (reset = false) => {
    setLoading(true);
    
    // Inițiem query-ul de bază
    let query = supabase.from("listings").select("*");

    // Dacă nu facem RESET total, aplicăm filtrele curente
    if (!reset) {
      // Filtrele din bara de sus
      if (oras.trim()) query = query.ilike("city", `%${oras.trim()}%`);
      if (tipAnunt) query = query.eq("tip_anunt", tipAnunt);
      if (tipCamera) query = query.eq("tip_camera", tipCamera);
      if (pretMax) query = query.lte("price", parseInt(pretMax));

      // Filtrele din Modalul Avansat
      if (tipLocuinta) query = query.eq("tip_locuinta", tipLocuinta);
      if (minBai) query = query.gte("numar_bai", parseInt(minBai));
      if (baiePrivata) query = query.eq("baie_privata", true);
      if (petFriendly) query = query.eq("pet_friendly", true);
      if (utilitatiIncluse) query = query.eq("utilitati_incluse", true); // Bifa pentru cheltuieli
      if (lgbtFriendly) query = query.eq("lgbt_friendly", true);
      if (acceptaCupluri) query = query.eq("accepta_cupluri", true);
      
      // Filtrare după lista de facilități (Amenities)
      if (selectedAmenities.length > 0) {
        query = query.contains("amenities", selectedAmenities);
      }
    }

    // Aplicăm Sortarea
    const currentSort = reset ? "noi" : sortOrder;
    if (currentSort === "noi") {
      query = query.order("created_at", { ascending: false });
    } else if (currentSort === "pret_cresc") {
      query = query.order("price", { ascending: true });
    } else if (currentSort === "pret_desc") {
      query = query.order("price", { ascending: false });
    }

    // Executăm query-ul final
    const { data, error } = await query;
    
    if (error) {
      console.error("Eroare la aducerea anunțurilor:", error);
    } else if (data) {
      setAnunturi(data as Listing[]);
    }
    
    setLoading(false);
  };

  // Rulează la prima încărcare a paginii
  useEffect(() => {
    // Verificăm dacă avem oraș în URL (când vii de pe Homepage)
    const urlParams = new URLSearchParams(window.location.search);
    const orasDinUrl = urlParams.get('oras');
    
    if (orasDinUrl) {
      setOras(orasDinUrl);
      // Ca să preia orașul imediat în query, îl trimitem forțat o singură dată
      let initialQuery = supabase.from("listings").select("*").ilike("city", `%${orasDinUrl}%`).order("created_at", { ascending: false });
      
      initialQuery.then(({ data }) => {
        if (data) setAnunturi(data as Listing[]);
        setLoading(false);
      });
    } else {
      fetchAnunturi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // Se declanșează doar când schimbi sortarea (dropdown-ul din dreapta)
  useEffect(() => {
    fetchAnunturi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  // ----------------------------------------
  // HANDLERE PENTRU BUTOANE
  // ----------------------------------------
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnunturi();
  };

  const handleApplyAdvancedFilters = () => {
    setIsAdvancedModalOpen(false);
    fetchAnunturi();
  };

  const handleResetAll = () => {
    // Curățăm bara de sus
    setOras("");
    setTipAnunt("");
    setPretMax("");
    setTipCamera("");
    
    // Curățăm modalul avansat
    setTipLocuinta("");
    setMinBai("");
    setBaiePrivata(false);
    setPetFriendly(false);
    setUtilitatiIncluse(false);
    setLgbtFriendly(false);
    setAcceptaCupluri(false);
    setSelectedAmenities([]);
    
    setSortOrder("noi");
    
    // Facem fetch curat
    fetchAnunturi(true);
  };

  const clearAdvancedFiltersOnly = () => {
    setTipLocuinta("");
    setMinBai("");
    setBaiePrivata(false);
    setPetFriendly(false);
    setUtilitatiIncluse(false);
    setLgbtFriendly(false);
    setAcceptaCupluri(false);
    setSelectedAmenities([]);
    // Nu închidem modalul și nu facem fetch aici. Așteptăm să dea "Arată rezultatele".
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculăm câte filtre din MODAL sunt active (pentru bulina roșie)
  const activeAdvancedFiltersCount = 
    (tipLocuinta ? 1 : 0) + 
    (minBai ? 1 : 0) + 
    (baiePrivata ? 1 : 0) + 
    (petFriendly ? 1 : 0) + 
    (utilitatiIncluse ? 1 : 0) +
    (lgbtFriendly ? 1 : 0) +
    (acceptaCupluri ? 1 : 0) +
    selectedAmenities.length;

  // ==========================================
  // COMPONENTE UI REUTILIZABILE (PENTRU MODAL)
  // ==========================================
  
  // Custom Checkbox premium (Cum a cerut user-ul în poze)
  const FilterCheckbox = ({ checked, onChange, label, sublabel }: any) => (
    <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${checked ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'}`}>
      <div className={`relative w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
        {checked && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <div className="flex flex-col">
        <span className={`text-sm font-bold ${checked ? 'text-blue-900' : 'text-gray-700'}`}>{label}</span>
        {sublabel && <span className="text-xs font-semibold text-gray-400 mt-0.5">{sublabel}</span>}
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 w-full flex-grow flex flex-col">
        
        {/* TITLU PAGINĂ */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">Găsește locul perfect</h1>
          <p className="text-lg text-slate-500 font-medium">Avem zeci de opțiuni pregătite pentru tine. Setează filtrele și descoperă.</p>
        </div>

        {/* ========================================== */}
        {/* BARA ORIZONTALĂ DE CĂUTARE (Ca în Screenshot) */}
        {/* ========================================== */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-6 mb-10 relative z-10">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-end">
            
            {/* 1. Oraș */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1">
                <Icons.Location /> Oraș
              </label>
              <input 
                type="text" 
                value={oras} 
                onChange={(e) => setOras(e.target.value)} 
                placeholder="Ex: București..." 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400" 
              />
            </div>

            {/* 2. Tip Anunț */}
            <div className="md:col-span-2 relative">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Tip Anunț</label>
              <div className="relative">
                <select 
                  value={tipAnunt} 
                  onChange={(e) => setTipAnunt(e.target.value)} 
                  className="w-full pl-5 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Oricare</option>
                  <option value="oferta_camera">Se Oferă</option>
                  <option value="cerere_camera">Se Caută</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <Icons.ChevronDown />
                </div>
              </div>
            </div>

            {/* 3. Cameră */}
            <div className="md:col-span-2 relative">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Cameră</label>
              <div className="relative">
                <select 
                  value={tipCamera} 
                  onChange={(e) => setTipCamera(e.target.value)} 
                  className="w-full pl-5 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Oricare</option>
                  <option value="single">Single</option>
                  <option value="dubla">Dublă</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <Icons.ChevronDown />
                </div>
              </div>
            </div>

            {/* 4. Preț Max */}
            <div className="md:col-span-2 relative">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Preț Max (€)</label>
              <input 
                type="number" 
                value={pretMax} 
                onChange={(e) => setPretMax(e.target.value)} 
                placeholder="Ex: 300" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400" 
              />
            </div>

            {/* 5. Butoane de Acțiune */}
            <div className="md:col-span-3 flex gap-2 h-[58px]">
              
              {/* Buton Filtre Avansate */}
              <button 
                type="button" 
                onClick={() => setIsAdvancedModalOpen(true)} 
                className="relative flex-1 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-[1.25rem] transition-colors border border-slate-200 shadow-sm flex items-center justify-center gap-2 group"
              >
                <Icons.Settings /> Filtre
                {activeAdvancedFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-md ring-2 ring-white animate-bounce-short">
                    {activeAdvancedFiltersCount}
                  </span>
                )}
              </button>
              
              {/* Buton Reset 'X' */}
              <button 
                type="button" 
                onClick={handleResetAll} 
                className="w-[58px] shrink-0 bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 rounded-[1.25rem] transition-colors flex items-center justify-center" 
                title="Resetează toate filtrele"
              >
                <Icons.Close />
              </button>
              
              {/* Buton Caută */}
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[1.25rem] transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <Icons.Search /> Caută
              </button>
            </div>
            
          </form>
        </div>

        {/* ========================================== */}
        {/* BARĂ REZULTATE ȘI SORTARE                  */}
        {/* ========================================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            {anunturi.length} {anunturi.length === 1 ? 'rezultat găsit' : 'rezultate găsite'}
          </h2>
          
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Sortează:</label>
            <div className="relative">
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)} 
                className="text-sm font-black text-slate-900 bg-transparent outline-none cursor-pointer pr-6 appearance-none"
              >
                <option value="noi">Cele mai noi primele</option>
                <option value="pret_cresc">Preț: De la mic la mare</option>
                <option value="pret_desc">Preț: De la mare la mic</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-500">
                <Icons.ChevronDown />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* ZONA DE CONȚINUT (SKELETON / GRID / EMPTY) */}
        {/* ========================================== */}
        {loading ? (
          /* SKELETON LOADER PREMIUM */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm animate-pulse">
                <div className="w-full h-56 bg-slate-200 rounded-[1.5rem] mb-5"></div>
                <div className="h-4 bg-slate-200 rounded-md w-1/3 mb-4"></div>
                <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-4"></div>
                <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : anunturi.length > 0 ? (
          /* GRILA REZULTATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-0">
            {anunturi.map((anunt) => (
              <div key={anunt.id} className="hover:-translate-y-1 transition-transform duration-300 group">
               <AnuntCard data={anunt as any} />
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE (FĂRĂ REZULTATE) */
          <div className="py-24 text-center bg-white border border-slate-200 rounded-[3rem] shadow-sm flex flex-col items-center mt-4">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-6 ring-8 ring-slate-50/50">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Niciun anunț găsit</h3>
            <p className="text-slate-500 font-medium max-w-md mb-8 leading-relaxed">
              Nu am găsit rezultate care să se potrivească exact cu filtrele tale. Încearcă să schimbi orașul, să mărești bugetul sau să elimini din filtrele avansate.
            </p>
            <button 
              onClick={handleResetAll} 
              className="bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-black transition-all shadow-xl hover:-translate-y-1"
            >
              Șterge toate filtrele
            </button>
          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* MODAL FILTRE AVANSATE (Popup)              */}
      {/* ========================================== */}
      {isAdvancedModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity p-0 sm:p-4 animate-fade-in">
          
          {/* Fereastra Modal */}
          <div className="bg-white w-full max-w-2xl sm:rounded-[2.5rem] rounded-t-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-slide-up sm:animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 shrink-0 bg-white">
              <h3 className="text-2xl font-black text-slate-900">Filtre Avansate</h3>
              <button 
                onClick={() => setIsAdvancedModalOpen(false)} 
                className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 w-10 h-10 rounded-full flex items-center justify-center"
              >
                <Icons.Close />
              </button>
            </div>

            {/* Modal Body (Scrollabil) */}
            <div className="p-8 overflow-y-auto flex-grow space-y-10 bg-slate-50/50 custom-scrollbar">
              
              {/* 1. Tip Locuință */}
              <section>
                <h4 className="font-black text-slate-900 mb-4 text-lg">Tip Locuință</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'camera_privata', label: 'Cameră Privată' },
                    { id: 'camera_partajata', label: 'Cameră Partajată' },
                    { id: 'apartament_intreg', label: 'Apt. Întreg' }
                  ].map((tip) => (
                    <label key={tip.id} className={`cursor-pointer border-2 p-5 rounded-2xl flex items-center justify-center text-center text-sm font-bold transition-all ${tipLocuinta === tip.id ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-600'}`}>
                      <input type="radio" name="tipLocuinta" value={tip.id} checked={tipLocuinta === tip.id} onChange={(e) => setTipLocuinta(e.target.value)} className="hidden" />
                      {tip.label}
                    </label>
                  ))}
                </div>
              </section>

              {/* 2. Băi și Intimitate */}
              <section>
                <h4 className="font-black text-slate-900 mb-4 text-lg">Băi și Intimitate</h4>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Număr minim băi</label>
                    <div className="relative">
                      <select 
                        value={minBai} 
                        onChange={(e) => setMinBai(e.target.value)} 
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="">Oricâte</option>
                        <option value="1">1+ Băi</option>
                        <option value="2">2+ Băi</option>
                        <option value="3">3+ Băi</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <Icons.ChevronDown />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <FilterCheckbox 
                      label="Vreau baie privată" 
                      sublabel="Nu împarți baia cu nimeni."
                      checked={baiePrivata} 
                      onChange={() => setBaiePrivata(!baiePrivata)} 
                    />
                  </div>
                </div>
              </section>

              {/* 3. Reguli & Financiar (Aici apare și Cheltuieli Incluse) */}
              <section>
                <h4 className="font-black text-slate-900 mb-4 text-lg">Reguli & Financiar</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FilterCheckbox 
                    label="Pet-friendly 🐾" 
                    checked={petFriendly} 
                    onChange={() => setPetFriendly(!petFriendly)} 
                  />
                  <FilterCheckbox 
                    label="Utilități incluse 💡" 
                    sublabel="Cheltuielile sunt deja plătite"
                    checked={utilitatiIncluse} 
                    onChange={() => setUtilitatiIncluse(!utilitatiIncluse)} 
                  />
                  <FilterCheckbox 
                    label="Acceptă cupluri 👫" 
                    checked={acceptaCupluri} 
                    onChange={() => setAcceptaCupluri(!acceptaCupluri)} 
                  />
                  <FilterCheckbox 
                    label="LGBTQ+ Friendly 🌈" 
                    checked={lgbtFriendly} 
                    onChange={() => setLgbtFriendly(!lgbtFriendly)} 
                  />
                </div>
              </section>

              {/* 4. Facilități esențiale */}
              <section>
                <h4 className="font-black text-slate-900 mb-4 text-lg">Facilități esențiale</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AMENITIES_LIST.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity.id);
                    return (
                      <div 
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 ${
                          isSelected ? "border-blue-600 bg-blue-50/50 shadow-sm transform scale-[1.02]" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-3xl mb-1">{amenity.icon}</span>
                        <span className={`text-[11px] uppercase tracking-wide font-black leading-tight ${isSelected ? "text-blue-900" : "text-slate-500"}`}>
                          {amenity.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
              
            </div>

            {/* Modal Footer (Butoane) */}
            <div className="px-8 py-6 border-t border-slate-100 bg-white shrink-0 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <button 
                onClick={clearAdvancedFiltersOnly} 
                className="w-full sm:w-auto font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4 py-2 transition-colors"
              >
                Șterge selecțiile
              </button>
              <button 
                onClick={handleApplyAdvancedFilters} 
                className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white font-black text-lg py-4 px-10 rounded-2xl transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
              >
                Arată rezultatele
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}