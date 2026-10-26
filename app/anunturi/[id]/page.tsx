"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportButton from "@/components/ReportButton";

function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

const AMENITY_ICONS: { [key: string]: { label: string; icon: string } } = {
  wifi: { label: "Wi-Fi mare viteză", icon: "📶" },
  ac: { label: "Aer condiționat", icon: "❄️" },
  centrala: { label: "Încălzire centrală", icon: "🔥" },
  masina_spalat: { label: "Mașină de spălat", icon: "🧺" },
  masina_vase: { label: "Mașină de spălat vase", icon: "🍽️" },
  uscator: { label: "Uscător rufe", icon: "💨" },
  bucatarie: { label: "Bucătărie utilată", icon: "🍳" },
  cuptor: { label: "Microunde / Cuptor", icon: "🍕" },
  balcon: { label: "Balcon / Terasă", icon: "☀️" },
  parcare: { label: "Parcare", icon: "🚗" },
  lift: { label: "Lift", icon: "🛗" },
  boxa: { label: "Boxă depozitare", icon: "📦" },
  tv: { label: "Televizor", icon: "📺" },
  birou: { label: "Spațiu de lucru", icon: "💻" },
};

export default function AdDetailsPage() {
  const params = useParams();
  const adId = params?.id as string;
  const router = useRouter();

  const [supabase] = useState(() => createClient());
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);
  const [ownerProfile, setOwnerProfile] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // CHAT MODAL STATE
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [quickMessage, setQuickMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!adId) return;

      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        if (user) setCurrentUser(user);

        const { data: listingData, error: listingError } = await supabase
          .from("listings")
          .select("*")
          .eq("id", adId)
          .single();

        if (listingError || !listingData) {
          setLoading(false);
          return;
        }
        setListing(listingData);

        if (listingData.user_id) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", listingData.user_id)
            .single();

          if (profileData) setOwnerProfile(profileData);

          if (user) {
            if (user.id !== listingData.user_id) {
              const { data: convData } = await supabase
                .from("conversations")
                .select("id")
                .eq("listing_id", adId)
                .eq("tenant_id", user.id)
                .maybeSingle();

              if (convData) {
                setActiveConversationId(convData.id);
              }
            }

            const { data: savedData } = await supabase
              .from("saved_listings")
              .select("id")
              .eq("user_id", user.id)
              .eq("listing_id", adId)
              .maybeSingle();

            if (savedData) setIsSaved(true);
          }
        }
      } catch (err) {
        console.error("Eroare la încărcarea datelor:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [adId, supabase]);

  const handleSaveClick = async () => {
    if (!currentUser) {
      alert("Trebuie să fii logat pentru a salva un anunț la favorite!");
      router.push("/login");
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        const { error } = await supabase.from("saved_listings").delete().eq("user_id", currentUser.id).eq("listing_id", adId);
        if (error) throw error;
        setIsSaved(false);
      } else {
        const { error } = await supabase.from("saved_listings").insert([{ user_id: currentUser.id, listing_id: adId }]);
        if (error) throw error;
        setIsSaved(true);
      }
    } catch (error: any) {
      console.error(error.message);
      alert("Eroare la favorite.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMainActionClick = () => {
    if (!currentUser) {
      alert("Trebuie să fii logat pentru a contacta proprietarul!");
      router.push("/login");
      return;
    }

    if (activeConversationId) {
      router.push(`/inbox/${activeConversationId}`);
    } else {
      setShowContactModal(true);
    }
  };

  const handleSendQuickMessage = async () => {
    if (!quickMessage.trim() || !currentUser || !listing.user_id) return;
    setSendingMsg(true);

    try {
      let convId = activeConversationId;
      
      if (!convId) {
        const { data: newConv, error: convError } = await supabase
          .from("conversations")
          .insert([{
            listing_id: adId,
            tenant_id: currentUser.id,
            owner_id: listing.user_id
          }])
          .select()
          .single();
          
        if (convError) throw convError;
        convId = newConv.id;
        setActiveConversationId(convId);
      }

      const { error: msgError } = await supabase
        .from("chat_messages")
        .insert([{
          conversation_id: convId,
          sender_id: currentUser.id,
          text: quickMessage.trim(),
          is_read: false
        }]);
      
      if (msgError) throw msgError;
      
      alert("Mesaj trimis cu succes!");
      setShowContactModal(false);
      router.push(`/inbox/${convId}`); 

    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la trimiterea mesajului.");
    } finally {
      setSendingMsg(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Se încarcă detaliile anunțului...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <span className="text-6xl mb-4">🔍</span>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Anunțul nu a fost găsit</h1>
          <p className="text-slate-500 mb-8">Se pare că acest anunț a fost șters sau nu mai este disponibil.</p>
          <Link href="/anunturi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all">
            Vezi toate anunțurile
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = listing.image_urls || (listing.image_url ? [listing.image_url] : []);
  const isMyListing = currentUser?.id === listing.user_id;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />

      <main className="flex-grow pb-24 relative">
        <div className="bg-white border-b border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {listing.title}
                </h1>
                <p className="text-slate-500 font-medium text-base mt-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {listing.city} {listing.adresa ? `• ${listing.adresa}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveClick}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                    isSaved ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  } ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                >
                  <span>{isSaving ? "⏳..." : isSaved ? "❤️ Salvat" : "🤍 Salvează"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* SECȚIUNEA PENTRU IMAGINE/FALLBACK */}
          {allImages.length > 0 ? (
            <div className="space-y-4">
              <div className="w-full h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl bg-slate-900 relative">
                <img src={allImages[activeImageIndex]} alt={listing.title} className="w-full h-full object-cover transition-all duration-500" />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold">
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {allImages.map((img: string, idx: number) => (
                    <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-4 transition-all ${activeImageIndex === idx ? 'border-blue-600 scale-95 shadow-md' : 'border-white opacity-70 hover:opacity-100'}`}>
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // APLICARE DESIGN NOU (Logo R.) PENTRU ANUNȚURILE FĂRĂ FOTOGRAFII
            <div className="w-full h-[350px] md:h-[500px] rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-800 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <span className="font-black text-blue-700 text-4xl tracking-tighter -ml-1">R.</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  Anunț fără fotografii
                </h3>
                <p className="text-slate-400 font-medium max-w-md text-sm md:text-base leading-relaxed">
                  Acest utilizator caută un coleg de apartament sau o locuință și nu a atașat imagini profilului. 
                  Folosește mesageria internă pentru a intra în contact.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold block uppercase mb-1">Tip Cameră</span>
                  <span className="font-black text-slate-900 text-lg uppercase">{listing.tip_camera || "Single"}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold block uppercase mb-1">Garanție</span>
                  <span className="font-black text-slate-900 text-lg uppercase">{listing.garantie?.replace('_', ' ') || "1 lună"}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold block uppercase mb-1">Băi în casă</span>
                  <span className="font-black text-slate-900 text-lg">{listing.numar_bai || 1}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-bold block uppercase mb-1">Baie Privată</span>
                  <span className="font-black text-slate-900 text-lg">{listing.baie_privata ? "Da 🛁" : "Nu"}</span>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span>📄</span> Despre acest anunț
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-line font-medium">
                  {listing.description || "Fără descriere furnizată."}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span>✨</span> Ce oferă această locuință
                </h2>
                {listing.amenities && listing.amenities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listing.amenities.map((amenityKey: string) => {
                      const info = AMENITY_ICONS[amenityKey] || { label: amenityKey, icon: "🔹" };
                      return (
                        <div key={amenityKey} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-2xl">{info.icon}</span>
                          <span className="font-bold text-slate-800 text-sm">{info.label}</span>
                        </div>
                      );
                    });}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">Nu au fost menționate facilități suplimentare.</p>
                )}
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span>🏡</span> Reguli și Preferințe casă
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">Gen preferat coleg</span>
                    <span className="font-black text-slate-900 uppercase text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200">{listing.gen_cautat || "Indiferent"}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">Acceptă cupluri</span>
                    <span className={`font-black text-xs px-3 py-1.5 rounded-lg ${listing.accepta_cupluri ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {listing.accepta_cupluri ? "Da ✓" : "Nu ✕"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">Fumători</span>
                    <span className={`font-black text-xs px-3 py-1.5 rounded-lg ${listing.fumatori ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                      {listing.fumatori ? "Permis 🚬" : "Interzis ✕"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">Pet-friendly</span>
                    <span className={`font-black text-xs px-3 py-1.5 rounded-lg ${listing.pet_friendly ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {listing.pet_friendly ? "Da 🐾" : "Nu ✕"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700 text-sm">Utilități incluse</span>
                    <span className={`font-black text-xs px-3 py-1.5 rounded-lg ${listing.utilitati_incluse ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                      {listing.utilitati_incluse ? "Incluse în preț ⚡" : "Separate"}
                    </span>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span>📍</span> Locație pe hartă
                </h2>
                <p className="text-slate-500 font-medium mb-6">
                  {listing.city} {listing.adresa ? `• ${listing.adresa}` : ""}
                </p>
                <div className="w-full h-80 rounded-[1.5rem] overflow-hidden shadow-inner border-4 border-slate-50 relative group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${listing.adresa ? listing.adresa + ', ' : ''}${listing.city}, Romania`)}&output=embed`}
                  ></iframe>
                </div>
              </div>

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                  <div className="mb-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Preț chirie</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-slate-900 tracking-tight">{listing.price}€</span>
                      <span className="text-slate-500 font-bold text-sm">/ lună</span>
                    </div>
                  </div>

                  {isMyListing ? (
                    <button disabled className="w-full bg-slate-100 text-slate-400 font-black text-lg py-4 px-8 rounded-2xl cursor-not-allowed mb-6">
                      Acesta este anunțul tău
                    </button>
                  ) : (
                    <button 
                      onClick={handleMainActionClick}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 mb-6"
                    >
                      {activeConversationId ? "💬 Continuă conversația" : "👋 Trimite Mesaj"}
                    </button>
                  )}

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Anunț postat de</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                        {ownerProfile?.avatar_url ? (
                          <img src={ownerProfile.avatar_url} alt="Owner" className="w-full h-full object-cover" />
                        ) : (
                          <span>👤</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base">{ownerProfile?.full_name || "Utilizator Rently"}</h4>
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-0.5">✓ E-mail verificat</span>
                      </div>
                    </div>
                    {listing.user_id && (
                      <Link href={`/user/${listing.user_id}`} className="block w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-colors text-sm">
                        Vezi profilul complet &rarr;
                      </Link>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🛡️</span>
                    <h4 className="font-black text-amber-900 text-base">Siguranța ta este pe primul loc</h4>
                  </div>
                  <p className="text-amber-800 text-xs leading-relaxed mb-4">
                    Nu trimite niciodată bani în avans și nu achita garanția înainte de a viziona locuința fizic sau prin apel video cu proprietarul.
                  </p>
                  
                  {!isMyListing && (
                    <div className="w-full pt-4 mt-2 border-t border-amber-200/60 flex justify-center">
                      <ReportButton targetId={adId} targetType="LISTING" />
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />

      {/* MODAL CONTACT */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 relative p-8">
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors">✕</button>
            <h3 className="font-black text-2xl text-slate-900 mb-2">Ia legătura cu {ownerProfile?.full_name?.split(' ')[0] || "proprietarul"}</h3>
            <p className="text-slate-500 font-medium text-sm mb-6">Trimite un mesaj direct pe Rently.</p>
            <textarea rows={4} value={quickMessage} onChange={(e) => setQuickMessage(e.target.value)} placeholder="Scrie mesajul tău..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium resize-none mb-4" />
            <button onClick={handleSendQuickMessage} disabled={!quickMessage.trim() || sendingMsg} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-all disabled:opacity-50">
              {sendingMsg ? "Se trimite..." : "Trimite Primul Mesaj"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}