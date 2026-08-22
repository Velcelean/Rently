"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Funcție locală sigură pentru clientul Supabase
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

const AMENITIES_LIST = [
  { id: "wifi", label: "Wi-Fi mare viteză", icon: "📶" },
  { id: "ac", label: "Aer condiționat", icon: "❄️" },
  { id: "centrala", label: "Încălzire centrală", icon: "🔥" },
  { id: "masina_spalat", label: "Mașină de spălat", icon: "🧺" },
  { id: "masina_vase", label: "Mașină de spălat vase", icon: "🍽️" },
  { id: "uscator", label: "Uscător rufe", icon: "💨" },
  { id: "bucatarie", label: "Bucătărie utilată", icon: "🍳" },
  { id: "cuptor", label: "Microunde", icon: "🍕" },
  { id: "balcon", label: "Balcon / Terasă", icon: "☀️" },
  { id: "parcare", label: "Parcare", icon: "🚗" },
  { id: "lift", label: "Lift", icon: "🛗" },
  { id: "boxa", label: "Boxă", icon: "📦" },
  { id: "tv", label: "Televizor", icon: "📺" },
  { id: "birou", label: "Spațiu lucru", icon: "💻" },
];

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params?.id;

  const [supabase] = useState(() => createClient());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Stări pentru câmpurile anunțului
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
  
  // Gestionare imagini existente / noi
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    async function loadListingAndUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);

      if (listingId) {
        const { data: listing, error } = await supabase
          .from("listings")
          .select("*")
          .eq("id", listingId)
          .single();

        if (error || !listing) {
          alert("Anunțul nu a fost găsit.");
          router.push("/dashboard");
          return;
        }

        // Setăm valorile existente în formular
        setTipAnunt(listing.tip_anunt || "oferta_camera");
        setTipLocuinta(listing.tip_locuinta || "camera_privata");
        setTitlu(listing.title || "");
        setDescriere(listing.description || "");
        setPret(listing.price?.toString() || "");
        setOras(listing.city || "");
        setAdresa(listing.adresa || "");
        setUtilitatiIncluse(listing.utilitati_incluse || false);
        setGarantie(listing.garantie || "1_luna");
        setTipCamera(listing.tip_camera || "single");
        setNumarBai(listing.numar_bai?.toString() || "1");
        setBaiePrivata(listing.baie_privata || false);
        setGenCautat(listing.gen_cautat || "oricare");
        setAcceptaCupluri(listing.accepta_cupluri || false);
        setFumatori(listing.fumatori || false);
        setPetFriendly(listing.pet_friendly || false);
        setLgbtFriendly(listing.lgbt_friendly || false);
        setSelectedAmenities(listing.amenities || []);
        setExistingImages(listing.image_urls || (listing.image_url ? [listing.image_url] : []));
      }
      setLoading(false);
    }
    loadListingAndUser();
  }, [listingId, router, supabase]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const totalImagesCount = existingImages.length + imageFiles.length + filesArray.length;
      if (totalImagesCount > 10) {
        alert("Poți adăuga maxim 10 poze în total.");
        return;
      }
      const newFiles = [...imageFiles, ...filesArray];
      setImageFiles(newFiles);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  const removeExistingImage = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const removeNewImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
    
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      let imageUrls = [...existingImages];

      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Math.random()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from('listings').upload(fileName, file);
          if (uploadError) throw uploadError;
          const { data } = supabase.storage.from('listings').getPublicUrl(fileName);
          imageUrls.push(data.publicUrl);
        }
      }

      const updatedListing = {
        tip_anunt: tipAnunt,
        tip_locuinta: tipLocuinta,
        title: titlu,
        description: descriere,
        price: Number(pret),
        city: oras,
        adresa: adresa,
        utilitati_incluse: utilitatiIncluse,
        garantie: garantie,
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

      const { error } = await supabase
        .from("listings")
        .update(updatedListing)
        .eq("id", listingId);

      if (error) throw error;

      alert("🎉 Anunțul a fost actualizat cu succes!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert("A apărut o eroare: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const ToggleSwitch = ({ checked, onChange, label, sublabel }: any) => (
    <div 
      className={`cursor-pointer flex items-center justify-between p-5 border-2 rounded-2xl transition-all duration-300 ${checked ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
      onClick={() => onChange(!checked)}
    >
      <div>
        <h4 className={`font-bold ${checked ? 'text-blue-900' : 'text-slate-800'}`}>{label}</h4>
        {sublabel && <p className="text-xs text-slate-500 font-medium mt-0.5">{sublabel}</p>}
      </div>
      <div className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Se încarcă datele anunțului...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HEADER DECORATIV */}
      <div className="bg-[#0f172a] pt-20 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Editează Anunțul</h1>
          <p className="text-slate-400 text-lg font-medium">Modifică detaliile proprietății sau preferințele tale.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow relative -mt-20 pb-24">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl shadow-slate-200/50">
          
          <form onSubmit={handleUpdate} className="space-y-12">
            
            {/* 1. INFORMAȚII DE BAZĂ */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg">1</span>
                <h2 className="text-2xl font-black text-slate-900">Informații de bază</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tip Anunț</label>
                  <select value={tipAnunt} onChange={(e) => setTipAnunt(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="oferta_camera">Ofer o cameră / locuință</option>
                    <option value="cerere_camera">Caut o cameră (Sunt chiriaș)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tip Locuință</label>
                  <select value={tipLocuinta} onChange={(e) => setTipLocuinta(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="camera_privata">Cameră privată</option>
                    <option value="camera_partajata">Cameră partajată</option>
                    <option value="apartament_intreg">Apartament întreg / Garsonieră</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Titlu anunț</label>
                <input type="text" required value={titlu} onChange={(e) => setTitlu(e.target.value)} placeholder="Ex: Cameră spațioasă lângă Universitate" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Oraș</label>
                  <input type="text" required value={oras} onChange={(e) => setOras(e.target.value)} placeholder="Ex: Timișoara" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preț lunar</label>
                  <div className="relative">
                    <input type="number" required value={pret} onChange={(e) => setPret(e.target.value)} placeholder="250" className="w-full pl-5 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all" />
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-slate-400 font-black">€</div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Garanție</label>
                  <select value={garantie} onChange={(e) => setGarantie(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="fara">Fără garanție</option>
                    <option value="1_luna">1 lună avans</option>
                    <option value="2_luni">2 luni avans</option>
                  </select>
                </div>
              </div>

              <div>
                <ToggleSwitch 
                  checked={utilitatiIncluse} 
                  onChange={setUtilitatiIncluse} 
                  label="Toate utilitățile sunt incluse în preț?" 
                  sublabel="Apă, curent, gaz, internet, întreținere"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Adresa exactă sau Strada (Opțional)</label>
                <input type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} placeholder="Ex: Strada Mureș 12" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Descriere detaliată</label>
                <textarea required rows={6} value={descriere} onChange={(e) => setDescriere(e.target.value)} placeholder="Descrie locuința, zona, ce fel de coleg cauți..." className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-medium text-slate-700 focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none leading-relaxed" />
              </div>
            </section>

            {/* 2. DETALII ȘI FACILITĂȚI */}
            <section className="space-y-8 pt-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg">2</span>
                <h2 className="text-2xl font-black text-slate-900">Detalii și Facilități</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Capacitate</label>
                  <select value={tipCamera} onChange={(e) => setTipCamera(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="single">Single (1 pers)</option>
                    <option value="dubla">Dublă (2 pers)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Băi în casă</label>
                  <select value={numarBai} onChange={(e) => setNumarBai(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="1">1 Baie</option>
                    <option value="2">2 Băi</option>
                    <option value="3">3+ Băi</option>
                  </select>
                </div>
                <div className="sm:pt-6">
                  <ToggleSwitch 
                    checked={baiePrivata} 
                    onChange={setBaiePrivata} 
                    label="Baie privată" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Ce facilități oferă locuința?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {AMENITIES_LIST.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity.id);
                    return (
                      <div 
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center text-center gap-2 transition-all duration-300 ${
                          isSelected ? "border-indigo-600 bg-indigo-50/50 shadow-sm transform scale-[1.02]" : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-3xl mb-1">{amenity.icon}</span>
                        <span className={`text-xs font-bold ${isSelected ? "text-indigo-900" : "text-slate-600"}`}>
                          {amenity.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. REGULI ȘI PREFERINȚE */}
            <section className="space-y-8 pt-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-lg">3</span>
                <h2 className="text-2xl font-black text-slate-900">Reguli și Preferințe</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Gen preferat pentru coleg</label>
                  <select value={genCautat} onChange={(e) => setGenCautat(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-pink-500 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="oricare">Indiferent</option>
                    <option value="femei">Doar Femei</option>
                    <option value="barbati">Doar Bărbați</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Stil de viață permis</label>
                <div className="grid grid-cols-2 gap-4">
                  <ToggleSwitch checked={acceptaCupluri} onChange={setAcceptaCupluri} label="Acceptați cupluri?" />
                  <ToggleSwitch checked={fumatori} onChange={setFumatori} label="Acceptați fumători? 🚬" />
                  <ToggleSwitch checked={petFriendly} onChange={setPetFriendly} label="Pet-friendly 🐾" />
                  <ToggleSwitch checked={lgbtFriendly} onChange={setLgbtFriendly} label="LGBTQ+ Friendly 🌈" />
                </div>
              </div>
            </section>

            {/* 4. FOTOGRAFII */}
            <section className="space-y-8 pt-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg">4</span>
                <h2 className="text-2xl font-black text-slate-900">Fotografii</h2>
              </div>
              
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-[2rem] p-6 sm:p-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {/* Poze existente */}
                  {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md group">
                      <img src={url} alt="Listing" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeExistingImage(index)} 
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-200"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Poze noi încărcate */}
                  {imagePreviews.map((src, index) => (
                    <div key={`new-${index}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md group">
                      <img src={src} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeNewImage(index)} 
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-200"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {(existingImages.length + imagePreviews.length) < 10 && (
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()} 
                      className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 transition-all duration-300 group"
                    >
                      <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">+</span>
                      <span className="text-sm font-bold">Adaugă poze</span>
                    </button>
                  )}
                </div>
                
                <div className="text-center text-sm font-medium text-slate-500">
                  Poți adăuga maxim 10 poze în total.
                </div>
                <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
              </div>
            </section>

            {/* BUTTON SUBMIT */}
            <div className="pt-10 flex flex-col items-center justify-center border-t border-slate-100">
              <button 
                type="submit" 
                disabled={saving} 
                className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white font-black py-5 px-16 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-xl flex items-center justify-center gap-3"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Se actualizează...
                  </>
                ) : (
                  "💾 Salvează Modificările"
                )}
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}