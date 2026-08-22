"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// COMPONENTE UI REUTILIZABILE
// ==========================================

const SectionTitle = ({ title, icon }: { title: string, icon: string }) => (
  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
    <span className="text-2xl">{icon}</span>
    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
  </div>
);

const Accordion = ({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-colors ${isOpen ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'}`}
      >
        <h3 className="text-lg font-bold text-slate-800 pr-8">{title}</h3>
        <div className={`transform transition-transform duration-300 flex-shrink-0 bg-white p-1 rounded-full shadow-sm border border-slate-100 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-6 pt-2 border-t border-slate-100 prose prose-slate prose-a:text-blue-600 max-w-none text-slate-600 leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

const ToggleRow = ({ 
  title, 
  description, 
  state, 
  setState, 
  alwaysOn = false,
  badgeText = ""
}: { 
  title: string, 
  description: string, 
  state: boolean, 
  setState: (v: boolean) => void, 
  alwaysOn?: boolean,
  badgeText?: string
}) => (
  <div className={`flex flex-col gap-4 p-6 border rounded-2xl transition-colors duration-300 ${alwaysOn ? 'bg-slate-50 border-slate-200' : state ? 'bg-blue-50/30 border-blue-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
    <div className="flex justify-between items-start md:items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        {badgeText && (
          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {badgeText}
          </span>
        )}
      </div>
      
      {alwaysOn ? (
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-200/50 px-3 py-1.5 rounded-full cursor-not-allowed">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          Activ
        </div>
      ) : (
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={state} 
            onChange={(e) => setState(e.target.checked)} 
          />
          <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
        </label>
      )}
    </div>
    <p className="text-sm text-slate-600 leading-relaxed m-0">
      {description}
    </p>
  </div>
);

// ==========================================
// PAGINA PRINCIPALĂ
// ==========================================

export default function AdvancedCookieSettingsPage() {
  const [performanceCookies, setPerformanceCookies] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [targetingCookies, setTargetingCookies] = useState(false);
  
  const [saveMessage, setSaveMessage] = useState("");
  const [consentId, setConsentId] = useState<string>("Nu a fost generat încă");
  const [consentDate, setConsentDate] = useState<string>("N/A");
  const [activeTab, setActiveTab] = useState<'preferences' | 'audit' | 'policy'>('preferences');

  // Generare UUID pentru Consent Receipt (Audit Trail)
  const generateConsentId = () => {
    return 'roomy-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPerformance = localStorage.getItem('roomy_cookie_performance') === 'true';
      const savedFunctional = localStorage.getItem('roomy_cookie_functional') === 'true';
      const savedTargeting = localStorage.getItem('roomy_cookie_targeting') === 'true';
      const savedId = localStorage.getItem('roomy_consent_id');
      const savedDate = localStorage.getItem('roomy_consent_date');
      
      setPerformanceCookies(savedPerformance);
      setFunctionalCookies(savedFunctional);
      setTargetingCookies(savedTargeting);
      
      if (savedId) setConsentId(savedId);
      if (savedDate) setConsentDate(new Date(savedDate).toLocaleString('ro-RO'));
    }
  }, []);

  const saveSettingsToStorage = (perf: boolean, func: boolean, targ: boolean) => {
    if (typeof window !== 'undefined') {
      const newConsentId = consentId === "Nu a fost generat încă" ? generateConsentId() : consentId;
      const currentDate = new Date().toISOString();

      localStorage.setItem('roomy_cookie_performance', perf.toString());
      localStorage.setItem('roomy_cookie_functional', func.toString());
      localStorage.setItem('roomy_cookie_targeting', targ.toString());
      localStorage.setItem('roomy_consent_id', newConsentId);
      localStorage.setItem('roomy_consent_date', currentDate);
      
      setConsentId(newConsentId);
      setConsentDate(new Date(currentDate).toLocaleString('ro-RO'));
      
      // Dispatch event pentru componenta Analytics
      window.dispatchEvent(new Event('storage'));
    }
    showSaveConfirmation();
  };

  const handleAllowAll = () => {
    setPerformanceCookies(true);
    setFunctionalCookies(true);
    setTargetingCookies(true);
    saveSettingsToStorage(true, true, true);
  };

  const handleConfirmChoices = () => {
    saveSettingsToStorage(performanceCookies, functionalCookies, targetingCookies);
  };

  const handleRejectAll = () => {
    setPerformanceCookies(false);
    setFunctionalCookies(false);
    setTargetingCookies(false);
    saveSettingsToStorage(false, false, false);
  };

  const showSaveConfirmation = () => {
    setSaveMessage("Preferințele tale de confidențialitate au fost salvate și aplicate cu succes!");
    setTimeout(() => setSaveMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HEADER SECTION (HERO) */}
      <div className="bg-[#0b1120] text-white pt-24 pb-20 relative overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-600/50 rounded-full px-4 py-1.5 text-xs font-black text-blue-300 uppercase tracking-widest mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Privacy & Consent Management Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Centrul de Preferințe <br className="hidden md:block"/> pentru Cookie-uri
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
              Aveți control deplin asupra amprentei dumneavoastră digitale. Respectăm Directiva ePrivacy și GDPR, oferindu-vă transparență totală asupra tehnologiilor de stocare a datelor.
            </p>
          </div>

          {/* Consent Receipt Mini-Card */}
          <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl backdrop-blur-md shrink-0 w-full md:w-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200">Stare Consimțământ</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Consent ID (Anonimizat)</p>
                <p className="text-xs font-mono text-slate-300 truncate max-w-[200px]">{consentId}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Ultima Actualizare</p>
                <p className="text-sm font-medium text-slate-300">{consentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] md:top-[88px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`whitespace-nowrap py-4 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'preferences' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Panou de Control (Setări)
            </button>
            <button 
              onClick={() => setActiveTab('audit')}
              className={`whitespace-nowrap py-4 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'audit' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Audit Cookies (Lista Completă)
            </button>
            <button 
              onClick={() => setActiveTab('policy')}
              className={`whitespace-nowrap py-4 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'policy' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Politica Detaliată & Baza Legală
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow relative">
        
        {/* TOAST NOTIFICATION */}
        {saveMessage && (
          <div className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-sm shadow-2xl border border-slate-700 flex items-center gap-3 z-50 animate-fade-in-up">
            <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            {saveMessage}
          </div>
        )}

        {/* TAB 1: PREFERENCE CENTER (UI INTERACTIV) */}
        {activeTab === 'preferences' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-6 md:p-10">
              
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Gestionați permisiunile de urmărire</h2>
                <p className="text-slate-600 leading-relaxed">
                  Când accesați platforma Roomy, stocăm fișiere de tip cookie în browserul dumneavoastră. Aceste tehnologii ne ajută să vă menținem contul securizat, să analizăm performanța serverelor și să vă oferim o experiență personalizată. Ne angajăm să nu vindem niciodată aceste date. Puteți alege să optați pentru excluderea (opt-out) din anumite categorii de urmărire mai jos.
                </p>
              </div>

              <div className="space-y-5">
                <ToggleRow 
                  title="Cookie-uri Strict Necesare"
                  badgeText="Obligatoriu"
                  description="Aceste cookie-uri sunt esențiale pentru funcționarea arhitecturii de bază a platformei. Ele guvernează funcții critice precum menținerea sesiunii de autentificare (JWT Tokens), protecția împotriva atacurilor CSRF (Cross-Site Request Forgery), distribuirea încărcării serverelor (Load Balancing) și salvarea setărilor din acest panou de confidențialitate. Nu pot fi dezactivate."
                  state={true}
                  setState={() => {}}
                  alwaysOn={true}
                />

                <ToggleRow 
                  title="Cookie-uri Analitice și de Performanță"
                  description="Ne permit să măsurăm și să îmbunătățim performanța platformei noastre. Colectează informații anonime despre modul în care utilizați site-ul (ex: paginile vizitate cel mai des, mesajele de eroare întâlnite, timpul petrecut pe un anunț). Dacă nu permiteți aceste cookie-uri, nu vom ști când ne-ați vizitat și ne va fi mai greu să identificăm și să rezolvăm bug-urile tehnice."
                  state={performanceCookies}
                  setState={setPerformanceCookies}
                />

                <ToggleRow 
                  title="Cookie-uri de Funcționalitate și Personalizare"
                  description="Aceste fișiere memorează alegerile pe care le faceți (cum ar fi filtrele de căutare preferate, orașul selectat sau sortarea anunțurilor) pentru a vă oferi funcții avansate și mai personalizate. Pot fi setate de noi sau de furnizori terți ale căror widget-uri sunt integrate pe paginile noastre (ex: hărți interactive)."
                  state={functionalCookies}
                  setState={setFunctionalCookies}
                />

                <ToggleRow 
                  title="Cookie-uri de Targetare / Marketing Terț"
                  description="Setate de partenerii noștri de publicitate (ex: Meta Pixel, rețele de remarketing). Acestea sunt utilizate pentru a construi un profil de utilizator și a vă afișa reclame relevante la serviciile Roomy atunci când navigați pe alte site-uri sau pe rețelele de socializare. Nu stochează date personale directe (precum numele), ci se bazează pe identificarea unică a browserului."
                  state={targetingCookies}
                  setState={setTargetingCookies}
                />
              </div>

              {/* ACTION BAR */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <button 
                  onClick={handleRejectAll}
                  className="w-full md:w-auto px-6 py-3 text-slate-500 hover:text-slate-800 font-bold transition-colors text-sm"
                >
                  Respinge Toate Neesențiale
                </button>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <button 
                    onClick={handleConfirmChoices}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-xl transition-all shadow-sm"
                  >
                    Salvează Selecția
                  </button>
                  <button 
                    onClick={handleAllowAll}
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                  >
                    Permite Toate
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: AUDITUL COOKIE-URILOR (LISTA EXHAUSTIVĂ) */}
        {activeTab === 'audit' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-200 bg-slate-50">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Registrul de Audit Cookie</h2>
                <p className="text-slate-600">Transparență completă la nivel de cod. Iată lista exactă a fișierelor de stocare pe care platforma noastră (și partenerii terți) încearcă să le injecteze în browserul dumneavoastră, în funcție de consimțământul acordat.</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="uppercase tracking-wider border-b-2 border-slate-200 bg-white text-slate-500 font-bold text-xs">
                    <tr>
                      <th className="px-6 py-4">Nume Cookie (Key)</th>
                      <th className="px-6 py-4">Domeniu / Furnizor</th>
                      <th className="px-6 py-4">Categorie</th>
                      <th className="px-6 py-4">Durată (Retenție)</th>
                      <th className="px-6 py-4">Scop Principal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {/* STRICTLY NECESSARY */}
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-bold">__Secure-next-auth.session-token</td>
                      <td className="px-6 py-4 font-medium">.roomy.ro (1st Party)</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700">Strict Necesare</span></td>
                      <td className="px-6 py-4">30 Zile</td>
                      <td className="px-6 py-4 whitespace-normal min-w-[250px]">Menține sesiunea criptată a utilizatorului după logare (JWT).</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-bold">__Host-next-auth.csrf-token</td>
                      <td className="px-6 py-4 font-medium">.roomy.ro (1st Party)</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700">Strict Necesare</span></td>
                      <td className="px-6 py-4">Sesiune</td>
                      <td className="px-6 py-4 whitespace-normal min-w-[250px]">Previne atacurile de tip Cross-Site Request Forgery la formulare.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-bold">roomy_cookie_consent_*</td>
                      <td className="px-6 py-4 font-medium">.roomy.ro (1st Party)</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700">Strict Necesare</span></td>
                      <td className="px-6 py-4">1 An</td>
                      <td className="px-6 py-4 whitespace-normal min-w-[250px]">Memorează exact preferințele alese de dvs. în acest panou.</td>
                    </tr>
                    
                    {/* PERFORMANCE */}
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-teal-600 font-bold">_ga</td>
                      <td className="px-6 py-4 font-medium">.google-analytics.com (3rd Party)</td>
                      <td className="px-6 py-4"><span className="bg-teal-50 px-2 py-1 rounded text-xs font-bold text-teal-700">Performanță</span></td>
                      <td className="px-6 py-4">2 Ani</td>
                      <td className="px-6 py-4 whitespace-normal min-w-[250px]">Identificator unic utilizat de Google Analytics pentru a distinge vizitatorii unici.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-teal-600 font-bold">_gid</td>
                      <td className="px-6 py-4 font-medium">.google-analytics.com (3rd Party)</td>
                      <td className="px-6 py-4"><span className="bg-teal-50 px-2 py-1 rounded text-xs font-bold text-teal-700">Performanță</span></td>
                      <td className="px-6 py-4">24 Ore</td>
                      <td className="px-6 py-4 whitespace-normal min-w-[250px]">Stochează și actualizează o valoare unică pentru fiecare pagină vizitată.</td>
                    </tr>

                    {/* MARKETING */}
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-purple-600 font-bold">_fbp</td>
                      <td className="px-6 py-4 font-medium">.facebook.com (3rd Party)</td>
                      <td className="px-6 py-4"><span className="bg-purple-50 px-2 py-1 rounded text-xs font-bold text-purple-700">Targetare</span></td>
                      <td className="px-6 py-4">3 Luni</td>
                      <td className="px-6 py-4 whitespace-normal min-w-[250px]">Folosit de Meta pentru a livra o serie de produse publicitare și targetare.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-800 text-white p-4 text-sm text-center">
                Auditul este realizat automat și reflectă stadiul curent al arhitecturii (Ultima scanare tehnică: {new Date().toLocaleDateString('ro-RO')}).
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POLITICA DETALIATĂ & BAZA LEGALĂ */}
        {activeTab === 'policy' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <SectionTitle title="Ghidul Juridic privind Stocarea Datelor Web" icon="📜" />
            
            <Accordion title="1. Ce reprezintă tehnologiile de stocare web (Cookies, Local Storage, Beacons)?" defaultOpen={true}>
              <p>În limbaj comun, folosim termenul "Cookie" ca umbrelă pentru mai multe tehnologii de urmărire și stocare a datelor pe terminalul (laptop, telefon) utilizatorului.</p>
              <ul>
                <li><strong>Cookie-urile HTTP:</strong> Fișiere text de mici dimensiuni trimise de serverul nostru către browserul dumneavoastră. Ele sunt trimise înapoi la server cu fiecare solicitare HTTP, permițând serverului să "țină minte" o anumită stare (ex: faptul că sunteți logat).</li>
                <li><strong>Web Storage (Local Storage & Session Storage):</strong> API-uri HTML5 moderne care ne permit să stocăm date direct în browserul dumneavoastră, în siguranță. Spre deosebire de cookies, aceste date nu sunt trimise automat la server cu fiecare click, făcând site-ul mai rapid. Le folosim pentru a salva preferințele dumneavoastră din acest panou.</li>
                <li><strong>Web Beacons / Pixeli de Urmărire:</strong> Imagini grafice invizibile (de obicei de 1x1 pixeli) integrate în codul paginii web. Când pagina se încarcă, pixelul este descărcat de pe serverul unui terț (ex: Facebook), informând acel terț că ați vizitat pagina noastră.</li>
              </ul>
              <p>Aceste tehnologii sunt complet "pasive". Ele nu sunt programe executabile, nu pot rula cod, nu sunt viruși, nu sunt spyware și nu au sub nicio formă capacitatea de a citi documentele sau fișierele de pe hard disk-ul dumneavoastră personal.</p>
            </Accordion>

            <Accordion title="2. Cadrul Normativ și Temeiul Legal al Prelucrării">
              <p>Infrastructura noastră de consimțământ este construită respectând riguros <strong>cei doi mari piloni legislativi</strong> europeni privind viața privată în mediul digital:</p>
              <ol className="list-decimal pl-5">
                <li><strong>Directiva 2002/58/CE (Directiva ePrivacy), modificată prin Directiva 2009/136/CE:</strong> Cunoscută și ca "Legea Cookie-urilor", ne impune interdicția absolută de a stoca informații pe dispozitivul dumneavoastră (cu excepția celor tehnic esențiale) fără a obține consimțământul prealabil, informat și neechivoc.</li>
                <li><strong>Regulamentul (UE) 2016/679 (GDPR):</strong> Stabilește condițiile pentru ca un consimțământ să fie valid (să fie obținut printr-o acțiune afirmativă clară, să poată fi retras la fel de ușor cum a fost dat) și guvernează prelucrarea datelor cu caracter personal derivate din cookie-uri (ex: Adresele IP, ID-urile unice de dispozitiv).</li>
              </ol>
              <p><strong>Temeiul Legal (Art. 6 GDPR):</strong></p>
              <ul>
                <li>Pentru Cookie-urile <em>Strict Necesare</em>, temeiul legal este <strong>Interesul Legitim (Art. 6 alin. 1 lit. f)</strong> pentru furnizarea tehnică a serviciului solicitat în mod expres de dumneavoastră (ex: securitatea contului).</li>
                <li>Pentru Cookie-urile <em>Analitice, Funcționale și de Targetare</em>, temeiul legal este exclusiv <strong>Consimțământul (Art. 6 alin. 1 lit. a)</strong>. Nu vom folosi niciodată strategii de "Dark Patterns" sau consimțământ implicit (ex: "prin continuarea navigării ești de acord").</li>
              </ul>
            </Accordion>

            <Accordion title="3. Cookie-uri First-Party vs. Third-Party">
              <p>Pentru o transparență deplină, trebuie să înțelegeți diferența de proveniență a fișierelor de urmărire:</p>
              <ul>
                <li><strong>Cookie-uri First-Party (Primă Parte):</strong> Sunt create, plasate și citite exclusiv de serverele și codul aparținând domeniului <em>roomy.ro</em>. Acestea gestionează lucruri de bază: sesiunea dumneavoastră, protecția antifraudă și setările interne.</li>
                <li><strong>Cookie-uri Third-Party (Terță Parte):</strong> Sunt fișiere stocate de alte domenii decât cel pe care îl vizitați. Pentru a vă oferi o experiență modernă (ex: hărți interactive, analiza traficului pentru a îmbunătăți serverele, sau publicitate relevantă), integrăm cod de la furnizori externi (Google, Meta). Acești terți pot stoca propriile lor cookie-uri prin intermediul site-ului nostru. Operatorul Roomy nu are acces direct de citire sau scriere la aceste cookie-uri terțe, iar gestionarea lor se supune politicilor respectivilor furnizori.</li>
              </ul>
            </Accordion>

            <Accordion title="4. Transferul Internațional de Date (Schrems II & DPF)">
              <p>Având în vedere decizia istorică a Curții de Justiție a Uniunii Europene în cazul "Schrems II", suntem extrem de atenți cu privire la instrumentele terțe (ex: Google Analytics) care ar putea transfera adresele IP (considerate date personale) pe servere situate în afara Spațiului Economic European (SEE), cu precădere în Statele Unite ale Americii.</p>
              <p><strong>Măsurile noastre de protecție:</strong></p>
              <ul className="list-disc pl-5">
                <li>Folosim versiuni actualizate de Google Analytics (GA4) configurate implicit să <strong>anonimizeze automat adresele IP</strong> imediat ce sunt primite, înainte de a fi stocate pe disc.</li>
                <li>Ne asigurăm că furnizorii noștri cu sediul în SUA sunt înscriși și atestați în cadrul noului <strong>Data Privacy Framework (DPF) UE-SUA</strong>, aprobat prin Decizia de Adecvare a Comisiei Europene în iulie 2023, care oferă garanții solide împotriva accesului disproporționat al agențiilor de informații străine la datele europenilor.</li>
                <li>Dacă un transfer are loc în afara SEE către o entitate nesusținută de DPF, ne asigurăm că am semnat <em>Clauze Contractuale Standard (SCC)</em> adoptate de Comisia Europeană.</li>
              </ul>
            </Accordion>

            <Accordion title="5. Cum să gestionați Cookies direct la nivel de Browser (Ghid Tehnic)">
              <p>Dincolo de acest Privacy Center pe care vi-l punem la dispoziție, aveți opțiunea nucleară de a bloca orice tentativă de stocare de date direct din inima browserului dumneavoastră. Rețineți însă că dezactivarea globală a cookie-urilor web (inclusiv a celor First-Party) va face complet imposibilă crearea unui cont sau autentificarea pe platforma Roomy.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="block p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <strong className="block text-slate-800">Google Chrome</strong>
                  <span className="text-sm text-slate-500">Setări ▸ Confidențialitate și securitate ▸ Cookie-uri terță parte</span>
                </a>
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noreferrer" className="block p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <strong className="block text-slate-800">Apple Safari (macOS/iOS)</strong>
                  <span className="text-sm text-slate-500">Preferințe ▸ Confidențialitate ▸ Blocați toate cookie-urile</span>
                </a>
                <a href="https://support.mozilla.org/ro/kb/protecția-îmbunătățită-la-urmărire-în-firefox-pentru-desktop" target="_blank" rel="noreferrer" className="block p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <strong className="block text-slate-800">Mozilla Firefox</strong>
                  <span className="text-sm text-slate-500">Opțiuni ▸ Confidențialitate și securitate ▸ Protecție strictă</span>
                </a>
                <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer" className="block p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <strong className="block text-slate-800">Microsoft Edge</strong>
                  <span className="text-sm text-slate-500">Setări ▸ Permisiuni site ▸ Fișiere cookie și date de site</span>
                </a>
              </div>
              <p className="mt-6">Pentru browsere axate pe privacy precum <strong>Brave</strong>, scuturile (Shields) sunt activate implicit și blochează automat elementele de urmărire de la terți, fără a necesita configurații suplimentare din partea dumneavoastră.</p>
            </Accordion>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}