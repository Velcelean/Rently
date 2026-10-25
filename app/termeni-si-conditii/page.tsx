"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// COMPONENTE UI REUTILIZABILE PENTRU T&C
// ==========================================

const TermsSection = ({ 
  title, 
  defaultOpen = false, 
  children, 
  id, 
  icon 
}: { 
  title: string, 
  defaultOpen?: boolean, 
  children: React.ReactNode, 
  id: string,
  icon?: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <section id={id} className="mb-6 scroll-mt-32">
      <div 
        className={`border ${isOpen ? 'border-indigo-300 shadow-xl ring-1 ring-indigo-100/50' : 'border-slate-200 hover:border-indigo-200'} bg-white rounded-3xl overflow-hidden transition-all duration-300`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none transition-colors ${isOpen ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
        >
          <div className="flex items-center gap-4">
            {icon && (
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-colors ${isOpen ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                {icon}
              </div>
            )}
            <h2 className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${isOpen ? 'text-indigo-900' : 'text-slate-900'}`}>
              {title}
            </h2>
          </div>
          <div className={`transform transition-transform duration-500 flex-shrink-0 ml-4 p-2 rounded-full ${isOpen ? 'rotate-180 bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </button>
        <div className={`transition-all duration-700 ease-in-out origin-top ${isOpen ? 'max-h-[8000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95 overflow-hidden'}`}>
          <div className="p-6 md:p-8 pt-0 border-t border-slate-100/60 prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-indigo-600 prose-strong:text-slate-900 leading-loose text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

const AlertBox = ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "critical" }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    critical: "bg-red-50 border-red-200 text-red-800"
  };
  
  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    critical: "🚨"
  };

  return (
    <div className={`flex gap-4 p-6 rounded-2xl border ${styles[type]} shadow-sm my-6`}>
      <span className="text-2xl shrink-0 leading-none">{icons[type]}</span>
      <div className="text-sm md:text-base leading-relaxed font-medium m-0 w-full">
        {children}
      </div>
    </div>
  );
};

// ==========================================
// PAGINA PRINCIPALĂ (Peste 1000 de linii structurate)
// ==========================================

export default function UltimateTermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-200 selection:text-indigo-900">
      <Header />
      
      {/* HEADER ENTERPRISE / LEGAL MASTER */}
      <div className="bg-[#020617] text-white pt-32 pb-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 border-b border-slate-800/80 pb-16">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-3 bg-slate-900/90 border border-slate-700/60 rounded-full px-5 py-2.5 text-xs font-black text-indigo-300 uppercase tracking-[0.25em] mb-8 backdrop-blur-md shadow-2xl ring-1 ring-white/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                Contract Juridic Obligatoriu | V. 3.0.0
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Termeni și <br className="hidden md:block" /> Condiții Generale
              </h1>
              <p className="text-slate-400 text-lg md:text-2xl leading-relaxed font-light max-w-4xl">
                Regulamentul oficial, extins și imperativ al platformei Rently. Acest document guvernează drepturile, obligațiile și limitele de răspundere dintre utilizatori și Operator.
              </p>
            </div>
            
            <div className="bg-slate-900/80 border border-slate-700/80 p-8 rounded-[2rem] backdrop-blur-xl shrink-0 w-full xl:w-auto shadow-2xl ring-1 ring-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-8">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Statut Comercial</p>
                  <p className="text-base font-bold text-green-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Proiect Liber / Zero Plăți
                  </p>
                </div>
                <div className="hidden sm:block xl:hidden w-px h-full bg-slate-800"></div>
                <div className="hidden xl:block h-px w-full bg-slate-800"></div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Data Intrării în Vigoare</p>
                  <p className="text-base font-bold text-indigo-300 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date().toLocaleDateString('ro-RO')} (Efect Imediat)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col xl:flex-row gap-12 relative">
        
        {/* NAVIGARE STICKY LATERALA (TABLE OF CONTENTS) */}
        <aside className="hidden xl:block w-[22rem] shrink-0">
          <div className="sticky top-10 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">#</span>
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Index Contractual (30 Capitole)</h3>
            </div>
            <nav className="space-y-0.5 text-[13px] font-bold h-[calc(100vh-220px)] overflow-y-auto pr-3 custom-scrollbar">
              <a href="#t1" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">1. Preambul și Valoare Juridică</a>
              <a href="#t2" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">2. Identitatea Operatorului</a>
              <a href="#t3" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">3. Definiții Esențiale</a>
              <a href="#t4" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">4. Natura Serviciului (As-Is)</a>
              <a href="#t5" className="block px-4 py-2.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all">5. Funcționare 100% Gratuită</a>
              <a href="#t6" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">6. Statutul Juridic (Intermediar Tehnic)</a>
              <a href="#t7" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">7. Exonerarea de Răspundere la Teren</a>
              <a href="#t8" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">8. Condiții de Eligibilitate și Vârstă</a>
              <a href="#t9" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">9. Crearea și Securitatea Contului</a>
              <a href="#t10" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">10. Regula Contului Unic (Anti-Sybil)</a>
              <a href="#t11" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">11. Codul de Conduită (Restricții)</a>
              <a href="#t12" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">12. Politica Anti-Spam și Scraping</a>
              <a href="#t13" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">13. Standarde pentru Publicarea Anunțurilor</a>
              <a href="#t14" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">14. Reguli pentru Imagini și Descrieri</a>
              <a href="#t15" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">15. Monitorizarea Mesageriei Interne</a>
              <a href="#t16" className="block px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all">16. Politica Anti-Fraudă (Mandatoriu)</a>
              <a href="#t17" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">17. Proprietatea Intelectuală (IP) a Platformei</a>
              <a href="#t18" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">18. Licențierea Conținutului Utilizatorului (UGC)</a>
              <a href="#t19" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">19. Raportarea Încălcărilor (DMCA/Takedown)</a>
              <a href="#t20" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">20. Link-uri și Platforme Terțe</a>
              <a href="#t21" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">21. Dreptul de Suspendare și Banare</a>
              <a href="#t22" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">22. Rezilierea și Ștergerea Contului</a>
              <a href="#t23" className="block px-4 py-2.5 text-red-600 font-bold bg-red-50/50 rounded-xl transition-all">23. LIMITAREA ABSOLUTĂ A RĂSPUNDERII</a>
              <a href="#t24" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">24. Clauza de Despăgubire (Indemnification)</a>
              <a href="#t25" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">25. Separabilitatea Clauzelor</a>
              <a href="#t26" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">26. Forța Majoră și Întreruperi Tehnice</a>
              <a href="#t27" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">27. Legislația Guvernantă (România)</a>
              <a href="#t28" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">28. Soluționarea Litigiilor și Competența</a>
              <a href="#t29" className="block px-4 py-2.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all">29. Modificarea Prezentului Contract</a>
              <a href="#t30" className="block px-4 py-2.5 text-indigo-700 bg-indigo-100/50 rounded-xl transition-all">30. Date de Contact Oficiale</a>
            </nav>
          </div>
        </aside>

        {/* CONTINUT EXHAUSTIV ACORDIOANE */}
        <div className="w-full xl:w-[calc(100%-25rem)] pb-32">
          
          <TermsSection 
            id="t1" 
            title="1. Preambul și Acceptarea Acordului" 
            defaultOpen={true}
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
          >
            <AlertBox type="info">
              <strong className="block text-lg mb-2">Acord cu Forță Juridică Deplină</strong>
              <p>
                Prin accesarea, vizitarea, înregistrarea pe, sau utilizarea oricărei funcționalități a platformei web <strong>Rently</strong> (și a oricăror subdomenii sau aplicații asociate), confirmați în mod expres, liber și neechivoc că ați citit, înțeles și acceptat să fiți legat juridic de toate prevederile acestui document.
              </p>
            </AlertBox>
            <p>
              Prezentul document, intitulat „Termeni și Condiții Generale” (denumit în continuare „Acordul”, „Termenii” sau „Contractul”), reprezintă contractul-cadru cu forță obligatorie încheiat între dumneavoastră, în calitate de Utilizator, și Operatorul independent al platformei Rently.
            </p>
            <p>
              Dacă nu sunteți de acord, în totalitate sau parțial, cu regulile, disclaimerele sau limitările de răspundere expuse mai jos, aveți obligația absolută de a părăsi imediat platforma și de a nu utiliza serviciile noastre. Continuarea navigării echivalează juridic cu o semnătură olografă pe un contract scris, fiindu-i aplicabile prevederile legii privind comerțul electronic.
            </p>
          </TermsSection>

          <TermsSection id="t2" title="2. Identitatea Operatorului și Natura Proiectului">
            <p>Platforma Rently este dezvoltată, administrată și menținută exclusiv ca un <strong>Proiect Independent (Solo Developer / Persoană Fizică)</strong>, și nu ca o entitate corporatistă (SRL, SA, PFA) în această fază a ciclului său de viață.</p>
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mt-4">
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Jurisdicție:</strong> Proiectul este operat din teritoriul României și se supune legilor statului român și ale Uniunii Europene.</li>
                <li><strong>Contact Juridic:</strong> Orice corespondență referitoare la încălcări ale prezentului acord, raportări de abuz sau solicitări de natură legală trebuie îndreptată exclusiv și în scris către adresa: <strong className="text-indigo-600">rently.studenti@gmail.com</strong>.</li>
              </ul>
            </div>
          </TermsSection>

          <TermsSection id="t3" title="3. Glosar și Definiții Esențiale">
            <p className="mb-6">Pentru a asigura o interpretare unitară a prezentului Contract, termenii de mai jos, indiferent dacă sunt utilizați la singular sau plural, vor avea următoarele semnificații fixe:</p>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg">
                <h4 className="font-bold text-slate-900 m-0">Platforma (sau Site-ul)</h4>
                <p className="text-sm text-slate-600 mt-1">Întregul ecosistem digital găzduit la adresa <em>Rently.ro</em>, incluzând infrastructura backend, bazele de date, codul sursă, interfețele grafice și orice actualizări viitoare.</p>
              </div>
              <div className="p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg">
                <h4 className="font-bold text-slate-900 m-0">Utilizator</h4>
                <p className="text-sm text-slate-600 mt-1">Orice persoană fizică care accesează URL-ul platformei. Include vizitatorii anonimi (care doar citesc anunțuri) și membrii înregistrați (care dețin un cont cu parolă).</p>
              </div>
              <div className="p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg">
                <h4 className="font-bold text-slate-900 m-0">Proprietar / Locator</h4>
                <p className="text-sm text-slate-600 mt-1">Utilizatorul care susține (pe propria răspundere penală și civilă) că deține dreptul legal de proprietate sau un drept valid de subînchiriere asupra unui spațiu și publică o ofertă.</p>
              </div>
              <div className="p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg">
                <h4 className="font-bold text-slate-900 m-0">Chiriaș / Căutător</h4>
                <p className="text-sm text-slate-600 mt-1">Utilizatorul care navighează platforma pentru a găsi un spațiu de locuit sau un coleg de apartament.</p>
              </div>
              <div className="p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg">
                <h4 className="font-bold text-slate-900 m-0">Conținut Generat de Utilizator (UGC)</h4>
                <p className="text-sm text-slate-600 mt-1">Orice fragment de text, fotografie, video, locație geografică declarată sau mesaj privat inserat în baza noastră de date de către un Utilizator.</p>
              </div>
            </div>
          </TermsSection>

          <TermsSection id="t4" title="4. Natura Serviciului („As-Is” și „As-Available”)">
            <p className="mb-4">
              Înțelegeți și sunteți de acord că Platforma Rently vă este furnizată strict pe baza principiului <strong>„așa cum este” (As-Is)</strong> și <strong>„în funcție de disponibilitate” (As-Available)</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Nu garantăm că platforma va fi neîntreruptă, complet lipsită de erori tehnice (bug-uri) sau complet sigură împotriva unor atacuri cibernetice de nivel statal.</li>
              <li>Nu garantăm că rezultatele căutărilor vor răspunde 100% așteptărilor dumneavoastră subiective sau că veți reuși să închiriați imobilul în timpul dorit.</li>
              <li>Ne rezervăm dreptul de a suspenda temporar sau de a opri definitiv funcționarea platformei, total sau parțial, pentru lucrări de mentenanță, upgrade-uri de cod sau din orice alt motiv, fără a vă datora notificări prealabile sau compensații de nicio natură.</li>
            </ul>
          </TermsSection>

          <TermsSection id="t5" title="5. Declarația Comercială: Funcționare 100% Gratuită" defaultOpen={true}>
          <AlertBox type="info">
              <h4 className="font-black text-xl mb-2 flex items-center gap-2">Zero Taxe. Zero Comisioane.</h4>
              <p className="mb-3">
                Rently a fost construit din dorința de a curăța piața imobiliară și de a oferi un instrument util comunității. De aceea, la acest moment, <strong>utilizarea platformei este absolut gratuită pentru toți utilizatorii</strong>.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 font-bold text-green-900">
                <li>Nu percepem taxe de publicare a anunțurilor.</li>
                <li>Nu percepem comisioane procentuale din valoarea chiriei sau a garanțiilor tranzacționate între utilizatori (precum o fac agențiile imobiliare clasice).</li>
                <li>Nu integrăm procesatori de plăți (Stripe/Paypal) pe site și nu vă vom cere NICIODATĂ să introduceți datele cardului bancar în niciun câmp de pe Rently.ro.</li>
              </ul>
            </AlertBox>
          </TermsSection>

          <TermsSection id="t6" title="6. Statutul Juridic (Intermediar Digital Tehnic)">
            <p className="mb-4">
              Este imperativ să înțelegeți poziția noastră limitată în arhitectura oricărei tranzacții. Rently funcționează exclusiv ca un <strong>avizier digital inteligent (hosting provider / bulletin board)</strong>.
            </p>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li><strong>Nu suntem Agenție Imobiliară:</strong> Nu acționăm în calitate de agent, broker, mandatar, dezvoltator imobiliar, administrator de proprietăți sau reprezentant legal pentru niciun Utilizator.</li>
                <li><strong>Nu intermediem contracte:</strong> Orice contract de locațiune, înțelegere de împărțire a costurilor (split-rent), contract de comodat sau plată a garanțiilor se negociază, se redactează și se semnează <strong>strict, direct și exclusiv</strong> între dumneavoastră și celălalt utilizator. Operatorul Rently nu este parte semnatară, nu vizează și nu mediază aceste contracte în lumea fizică.</li>
              </ul>
            </div>
          </TermsSection>

          <TermsSection id="t7" title="7. Exonerarea de Răspundere la Teren (Due Diligence)">
            <p className="mb-4 text-slate-700">
              Datorită naturii de proiect independent (100% online) și gratuității serviciului, Operatorul <strong>NU deține echipe fizice pe teren</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Fără Verificări Fizice</h4>
                <p className="text-sm text-slate-600 m-0">Nu inspectăm fizic apartamentele, nu validăm existența reală a mobilierului din poze, nu verificăm dacă locuința are utilități funcționale sau dacă respectă normele ISU de siguranță la incendiu.</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Fără Validare Juridică</h4>
                <p className="text-sm text-slate-600 m-0">Nu avem capacitatea și nici obligația legală de a verifica la Cartea Funciară dacă Utilizatorul care publică anunțul este cu adevărat proprietarul de drept sau dacă are permisiunea legală să subînchirieze acel spațiu.</p>
              </div>
            </div>
            <p className="mt-6 font-bold text-slate-800 bg-amber-50 border border-amber-200 p-4 rounded-xl">
              Prin urmare, Transferul de Risc este total. Efectuarea tuturor demersurilor necesare (due diligence) — inclusiv solicitarea Extrasului de Carte Funciară, a actului de identitate al proprietarului și vizionarea în persoană a locației — cade exclusiv în sarcina dumneavoastră înainte de a înmâna orice sumă de bani.
            </p>
          </TermsSection>

          <TermsSection id="t8" title="8. Condiții de Eligibilitate și Vârstă">
            <p className="mb-4">Domeniul coabitării și al închirierilor imobiliare implică asumarea unor obligații financiare lunare severe și semnarea unor contracte cu forță juridică. Ca atare, platforma impune bariere stricte de acces:</p>
            
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-4 bg-white border border-slate-200 p-5 rounded-2xl">
                <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0">18+</div>
                <div>
                  <strong className="text-slate-900 block mb-1">Vârsta Majoratului</strong>
                  <p className="text-sm text-slate-600 m-0">Crearea unui cont și utilizarea serviciilor Platformei sunt <strong>strict interzise minorilor (persoanelor sub 18 ani împliniți)</strong>. Prin apăsarea butonului "Creează Cont", declarați pe proprie răspundere, sub sancțiunea legii penale privind falsul în declarații, că aveți capacitate deplină de exercițiu.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white border border-slate-200 p-5 rounded-2xl">
                <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0">⚖️</div>
                <div>
                  <strong className="text-slate-900 block mb-1">Lipsa Interdicțiilor</strong>
                  <p className="text-sm text-slate-600 m-0">Confirmați că nu vă este interzis printr-o hotărâre judecătorească să accesați servicii online și că nu ați fost anterior banat definitiv de pe Rently pentru fraude, limbaj abuziv sau încălcarea acestor Termeni.</p>
                </div>
              </li>
            </ul>
          </TermsSection>

          <TermsSection id="t9" title="9. Crearea și Securitatea Contului">
            <p className="mb-4">Anumite funcționalități critice (contactarea unui proprietar, publicarea unei camere) necesită înregistrarea unui cont. Vă asumați următoarele obligații operaționale:</p>
            <div className="space-y-4 text-slate-700">
              <p><strong>Acuratețea Datelor:</strong> Vă obligați să furnizați o adresă de e-mail reală, funcțională și controlată de dumneavoastră. Este strict interzisă utilizarea unor adrese de email de unică folosință (temporare / burner emails) pentru a vă masca identitatea sau a rula scripturi de creare de conturi în masă.</p>
              <p><strong>Securitatea Credențialelor:</strong> Sunteți unicul responsabil pentru păstrarea confidențialității parolei setate. Rently stochează parolele exclusiv în format criptat ireversibil, deci nu vi le putem "spune" dacă le uitați. Orice acțiune derulată din contul dumneavoastră (inclusiv postarea unor anunțuri false sau trimiterea de spam în mesagerie) se prezumă a fi fost efectuată de dumneavoastră personal și vă asumați răspunderea pentru ea.</p>
              <p><strong>Notificarea Breșelor:</strong> În cazul în care constatați sau suspectați compromiterea contului dumneavoastră (furtul parolei), aveți obligația de a ne notifica imediat pentru a putea îngheța contul.</p>
            </div>
          </TermsSection>

          <TermsSection id="t10" title="10. Regula Contului Unic (Anti-Sybil Policy)">
            <AlertBox type="warning">
              <p>
                Pentru a asigura o piață corectă, transparentă și pentru a preveni manipularea algoritmilor noștri de vizibilitate, <strong>Rently implementează o politică strictă de „Un Cont per Persoană Fizică”.</strong>
              </p>
              <p className="mt-2">
                Crearea de conturi multiple (Sybils / Clone) de către același utilizator în vederea:
                <br/>- Ocolirii unor suspendări temporare (Ban Evasion);
                <br/>- Postării aceluiași anunț de mai multe ori pentru a "acapara" prima pagină de rezultate;
                <br/>- Creării unei false impresii de concurență;
                <br/>... constituie o încălcare gravă a acestui Contract și va atrage după sine suspendarea automată și permanentă a tuturor conturilor asociate adresei IP și dispozitivului dumneavoastră.
              </p>
            </AlertBox>
          </TermsSection>

          <TermsSection id="t11" title="11. Codul de Conduită Acceptabilă (Restricții Generale)" icon="🛑">
            <p className="mb-6 font-bold text-slate-800">Când accesați și navigați pe Rently, vă angajați imperativ să NU întreprindeți, să nu facilitați și să nu încurajați terții să întreprindă următoarele acțiuni:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <strong className="text-red-700 block mb-2">Comportament Ilegal</strong>
                <p className="text-sm text-slate-700">Utilizarea platformei pentru orice scop care încalcă legile României sau normele internaționale (inclusiv fraude, spălare de bani, trafic de persoane, promovarea substanțelor ilegale).</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <strong className="text-red-700 block mb-2">Discriminare și Ură</strong>
                <p className="text-sm text-slate-700">Publicarea de texte sau trimiterea de mesaje care conțin amenințări, instigare la violență, sau care discriminează direct pe bază de rasă, etnie, religie sau dizabilitate.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <strong className="text-red-700 block mb-2">Fals în Identitate</strong>
                <p className="text-sm text-slate-700">Asumarea identității unei alte persoane (impersonare), folosirea numelui sau fotografiei altei persoane fără consimțământ, sau susținerea falsă a afilierii cu o agenție.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <strong className="text-red-700 block mb-2">Hărțuire (Cyberbullying)</strong>
                <p className="text-sm text-slate-700">Urmărirea, intimidarea sau hărțuirea altor utilizatori prin sistemul de chat după ce aceștia v-au comunicat că nu doresc să mai comunice sau v-au respins oferta.</p>
              </div>
            </div>
          </TermsSection>

          <TermsSection id="t12" title="12. Politica Anti-Spam și Interzicerea Scraping-ului (Sabotaj Tehnic)">
            <p className="mb-4">Protejarea infrastructurii tehnice și a liniștii utilizatorilor noștri este prioritatea numărul unu. Prin urmare, sunt strict interzise sub sancțiunea atragerii răspunderii civile (pentru daune) și penale:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-700">
              <li><strong>Spam și Marketing Nesolicitat:</strong> Utilizarea bazei de date de anunțuri sau a mesageriei interne pentru a trimite comunicări comerciale nesolicitate, oferte de credite, servicii de mutări mobilă, scheme piramidale (MLM) sau linkuri către alte platforme imobiliare concurente.</li>
              <li><strong>Data Scraping:</strong> Utilizarea oricăror roboți, spideri, crawlere, scripturi automate, add-on-uri de browser sau a oricărei alte metode tehnologice pentru a extrage, copia sau clona masiv (scraping) arhitectura site-ului, adresele de email, prețurile sau fotografiile de pe Rently în vederea creării unei baze de date paralele.</li>
              <li><strong>Atacuri de Infrastructură:</strong> Orice tentativă deliberată de a supraîncărca serverele (atacuri DDoS / Rate Limit Evasion), de a găsi vulnerabilități în cod, de a injecta scripturi malițioase (SQLi, XSS) sau de a distribui viruși și troieni prin intermediul funcției de încărcare imagini.</li>
            </ul>
          </TermsSection>

          <TermsSection id="t13" title="13. Standarde Obligatorii pentru Publicarea Anunțurilor">
            <p className="mb-4">Pentru a menține un avizier curat și util, fiecare ofertă sau cerere de chirie publicată trebuie să respecte cumulativ următoarele rigori de calitate:</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <strong className="text-slate-900">Prețuri Reale și Transparente</strong>
                <p className="text-sm text-slate-600 mt-1">Prețul introdus în câmpul principal trebuie să fie suma exactă cerută lunar pentru chirie. Este interzisă tactica de „clickbait” (ex. setarea prețului la „1 RON” pentru a forța apariția pe prima pagină, cerând suma reală doar în descriere).</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <strong className="text-slate-900">Exclusivitatea și Interzicerea Duplicatelor</strong>
                <p className="text-sm text-slate-600 mt-1">Nu puteți publica mai multe anunțuri active pentru exact aceeași cameră. Dacă doriți să actualizați informațiile, folosiți funcția de "Editare" a anunțului existent, nu creați unul nou.</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <strong className="text-slate-900">Disponibilitatea Reală („Fără Bait and Switch”)</strong>
                <p className="text-sm text-slate-600 mt-1">Anunțul trebuie să reflecte o proprietate fizic disponibilă spre închiriere. Imediat ce ați semnat un contract cu un chiriaș, aveți obligația morală și asumată prin acest contract de a șterge anunțul de pe site, pentru a nu pierde timpul altor căutători.</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-1">
                <strong className="text-slate-900">Exclusiv Rezidențial (Fără Regim Hotelier)</strong>
                <p className="text-sm text-slate-600 mt-1">Platforma este concepută pentru coabitare și închirieri rezidențiale pe termen mediu și lung. Respingem și vom șterge anunțurile destinate închirierilor cu ora, în regim hotelier de 1-2 zile (Airbnb style) sau spațiilor strict comerciale/industriale.</p>
              </div>
            </div>
          </TermsSection>

          <TermsSection id="t14" title="14. Reguli Specifice pentru Imagini și Descrieri (UGC)">
            <p className="mb-4">Conținutul multimedia încărcat de dumneavoastră trebuie să reflecte realitatea de la fața locului.</p>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <ul className="list-disc pl-5 space-y-3 text-slate-700 text-sm">
                <li><strong>Autenticitatea Imaginilor:</strong> Pozele trebuie să prezinte starea actuală a apartamentului. Este <strong>strict interzisă</strong> folosirea de randări 3D (dacă nu este clar menționat acest lucru pentru blocurile în construcție), a fotografiilor generate de Inteligența Artificială (AI), a pozelor furate de pe site-urile hotelurilor sau din portofoliile altor agenții imobiliare.</li>
                <li><strong>Fără Watermark-uri Comerciale:</strong> Nu acceptăm fotografii care conțin ștampile vizuale (watermarks), texte promoționale, link-uri sau numere de telefon suprapuse cu Photoshop peste imagine.</li>
                <li><strong>Imagini Inadecvate:</strong> Este interzisă încărcarea de imagini cu caracter pornografic, nuditate, violență sau care nu au absolut nicio legătură cu piața imobiliară (ex: poze cu mașini la vânzare, meme-uri pe internet).</li>
              </ul>
            </div>
            <p className="mt-4 font-medium text-slate-700">
              Ne rezervăm dreptul suveran de a decupa imaginile, de a le reduce rezoluția pentru optimizarea serverului, de a aplica propriul nostru watermark invizibil pentru a preveni furtul lor de către web-scrapere și de a șterge unilateral orice fotografie care încalcă aceste prevederi.
            </p>
          </TermsSection>

          <TermsSection id="t15" title="15. Monitorizarea Mesageriei Interne și Confidențialitatea" icon="👁️">
            <p className="mb-4 text-slate-700">
              Rently vă pune la dispoziție un sistem intern de chat pentru a facilita primele contacte fără a fi nevoie să vă publicați numărul de telefon. Pentru securitatea comunității, trebuie să cunoașteți cum funcționează acest sistem:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-slate-200 p-6 rounded-2xl shadow-sm bg-white">
                <h4 className="font-bold text-slate-900 mb-2">Lipsa Criptării E2E</h4>
                <p className="text-sm text-slate-600 m-0">Sistemul <strong>NU</strong> utilizează criptare End-to-End. Baza noastră de date înregistrează mesajele în format text clar, nu criptat cu chei private aflate doar pe dispozitivul dvs.</p>
              </div>
              <div className="border border-slate-200 p-6 rounded-2xl shadow-sm bg-white">
                <h4 className="font-bold text-slate-900 mb-2">Filtre Automate (Boți)</h4>
                <p className="text-sm text-slate-600 m-0">Implementăm scripturi automate care scanează instantaneu mesajele trimise în căutarea de link-uri malițioase (viruși) sau tipare de text folosite frecvent de escrocii bancari.</p>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
              <strong className="text-blue-900 block mb-1">Garanția Secretului Corespondenței:</strong>
              <p className="text-sm text-blue-800 m-0">
                Administratorul platformei <strong>nu va citi niciodată proactiv și manual</strong> conversațiile obișnuite. Intervenția umană (citirea logurilor din chat) se face <strong>strict</strong> în două situații: 1) Când apăsați butonul de „Raportare Abuz” din chat (dându-ne implicit acordul să arbitrăm problema), sau 2) La cererea oficială a organelor de urmărire penală.
              </p>
            </div>
          </TermsSection>

          <TermsSection id="t16" title="16. Politica Anti-Fraudă (AVERTISMENT CRITIC)" defaultOpen={true}>
            <AlertBox type="critical">
              <h4 className="font-black text-xl mb-4 uppercase tracking-widest text-red-900">Pericol Major de Pierdere Financiară</h4>
              <p className="mb-4 font-bold">
                Din calitatea de furnizor tehnic independent (care doar ține site-ul pornit), Rently NU ARE CAPACITATEA FIZICĂ DE A VĂ RECUPERA BANII dacă alegeți să îi trimiteți de bunăvoie unui escroc. Trebuie să citiți și să aplicați următoarele reguli de aur:
              </p>
              
              <div className="bg-white p-5 rounded-xl border border-red-100 mt-4 text-slate-800">
                <h5 className="font-bold mb-2 text-lg">Regula Supremă de Protecție:</h5>
                <p className="text-lg font-black text-red-600 uppercase border-b border-red-100 pb-3 mb-3">
                  Nu trimiteți NICIODATĂ bani în avans (Chirie, Garanție, "Taxă de vizionare") prin Transfer Bancar, Revolut, Western Union sau MoneyGram unei persoane pe care nu ați întâlnit-o FIZIC și pentru un apartament în care nu ați intrat personal împreună cu ea.
                </p>
                <h5 className="font-bold mb-2">Atenție la "Schema Proprietarului din Străinătate":</h5>
                <p className="text-sm">Aceasta este frauda numărul 1 pe glob în imobiliare. Un individ cu poze luxoase postează un anunț foarte ieftin. Când îl contactați, vă spune că lucrează în Anglia/Germania și nu poate veni să vă arate casa. Vă va cere să-i trimiteți o lună de garanție "prin Airbnb" sau "prin TripAdvisor" (folosind site-uri false clonate de ei) promițând că vă trimite cheile prin curier (DHL/FedEx). <strong>ESTE 100% O FRAUDĂ. Nu există niciun serviciu oficial pe Pământ care trimite chei prin curier după plata în avans.</strong> Raportați-l imediat!</p>
              </div>
            </AlertBox>
          </TermsSection>

          <TermsSection id="t17" title="17. Proprietatea Intelectuală (IP) a Platformei Rently">
            <p className="mb-4">
              Arhitectura completă a platformei — incluzând, dar fără a se limita la, codul sursă (front-end în React/Next.js, back-end), interfața grafică (UI/UX), designul, logo-ul, mărcile comerciale, paletele de culori, algoritmii de sortare și textele de pe paginile statice (cum este și acest document) — reprezintă proprietatea exclusivă a Operatorului și este protejată de legislația națională (Legea nr. 8/1996) și tratatele internaționale privind dreptul de autor.
            </p>
            <p className="font-bold text-slate-800 bg-slate-100 p-4 rounded-xl border border-slate-200">
              Accesul dumneavoastră pe site constituie strict o licență limitată, revocabilă și non-exclusivă de a utiliza funcționalitățile software-ului în scopul declarat. Nu dobândiți niciun drept de proprietate asupra codului sau brandului Rently. Vă este strict interzis să decompilați (reverse engineer), să copiați structura vizuală sau să încercați să clonați site-ul pentru a lansa un serviciu concurent.
            </p>
          </TermsSection>

          <TermsSection id="t18" title="18. Licențierea Conținutului Generat de Utilizator (UGC)">
            <p className="mb-4">
              În mod clar: <strong>Dumneavoastră rămâneți proprietarul de drept al textelor și fotografiilor</strong> pe care le postați pe platformă. Rently nu vă fură dreptul de autor asupra pozelor din dormitorul dumneavoastră.
            </p>
            <p className="mb-4">
              Totuși, pentru ca internetul și serverele să funcționeze tehnic (pentru a vă putea salva pozele pe hard-disk-ul nostru de Cloud, pentru a le redimensiona ca să se încarce rapid pe ecranele telefoanelor și pentru a le afișa miilor de vizitatori), legea impune să ne acordați permisiunea de a face asta.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r-xl">
              <strong className="text-indigo-900 block mb-1">Acordarea Licenței:</strong>
              <p className="text-sm text-indigo-800 m-0">
                Prin simplul fapt al publicării unui anunț pe Rently, ne acordați automat, cu titlu gratuit, o licență non-exclusivă, transferabilă și aplicabilă la nivel mondial pentru a stoca, reproduce, prelucra tehnic, formata, afișa public și distribui acel conținut (inclusiv pe canalele noastre de Social Media, cum ar fi Instagram/TikTok, exclusiv în scopul promovării anunțului dumneavoastră și al ecosistemului). Această licență tehnică încetează logic din secunda în care dumneavoastră apăsați butonul de ștergere a anunțului.
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              *Garanție obligatorie: Prin postare, garantați legal că dețineți drepturile depline asupra imaginilor urcate sau că aveți acordul fotografului (dacă ați angajat unul). Vă asumați întreaga despăgubire a platformei în eventualitatea în care suntem acționați în instanță de o agenție terță pentru furt de poze comis de dumneavoastră.
            </p>
          </TermsSection>

          <TermsSection id="t19" title="19. Raportarea Încălcărilor Drepturilor de Autor (Procedura DMCA/Takedown)">
            <p className="mb-4">
              În conformitate cu reglementările de Safe Harbor privind comerțul electronic, Rently funcționează tehnic ca un furnizor de servicii de „găzduire” (Hosting) și nu are obligația (nici capacitatea tehnică absolută) de a monitoriza proactiv fiecare poză urcată pe site pentru a verifica dacă încalcă drepturile de autor ale altcuiva.
            </p>
            <p className="mb-4 font-bold text-slate-800">
              Dacă reprezentați o agenție imobiliară, un site concurent sau sunteți un proprietar care observă că pozele sale au fost furate și postate nelegitim pe Rently, punem la dispoziție următoarea procedură (Notice and Takedown):
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <li>Trimiteți o Notificare Oficială la <strong>rently.studenti@gmail.com</strong>.</li>
              <li>Includeți URL-ul (linkul) exact al paginii de pe Rently unde apare conținutul care vă încalcă drepturile.</li>
              <li>Atașați dovada calității dumneavoastră de proprietar al drepturilor (ex: link către prima publicare oficială pe site-ul dvs, actul de proprietate, fotografiile brute RAW).</li>
              <li>Formulați o declarație sub sancțiunea falsului în înscrisuri cum că sunteți persoana vătămată sau reprezentantul autorizat al acesteia.</li>
            </ol>
            <p className="mt-4 text-sm text-slate-600">
              Odată validată notificarea, vom elimina sau bloca accesul la conținutul vizat în regim de urgență (de regulă în sub 48 de ore) și vom suspenda contul utilizatorului care a comis încălcarea (conform politicii Repeat Infringer).
            </p>
          </TermsSection>

          <TermsSection id="t20" title="20. Link-uri și Platforme Terțe">
            <p className="mb-4">
              Platforma poate conține, în interfață sau direct în textele anunțurilor, hyper-linkuri care vă redirecționează către site-uri externe (de exemplu: Google Maps pentru localizare exactă, linkuri către profiluri de Instagram ale utilizatorilor, portaluri universitare).
            </p>
            <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200">
              <strong className="block text-slate-900 mb-2">Exonerare:</strong>
              <p className="text-sm text-slate-700 m-0">
                Includerea acestor link-uri pe Rently este oferită strict pentru comoditatea utilizatorilor și <strong>nu constituie o aprobare, susținere sau garanție</strong> din partea noastră cu privire la securitatea, calitatea sau legalitatea acelor site-uri externe. Din momentul în care faceți click și părăsiți domeniul <code>Rently.ro</code>, navigați exclusiv pe propriul risc și vă supuneți termenilor și politicilor acelui site terț. Rently nu poate fi făcut responsabil pentru nicio daună cibernetică (ex: viruși) preluată de pe site-uri externe.
              </p>
            </div>
          </TermsSection>

          <TermsSection id="t21" title="21. Dreptul Absolut de Suspendare și Banare (Shadowban / IP Ban)" icon="🔨">
            <p className="mb-4">
              Platforma Rently, fiind o proprietate digitală administrată privat, nu este un spațiu public al statului. Accesul dumneavoastră aici este un privilegiu, nu un drept constituțional absolut.
            </p>
            <p className="mb-4 font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
              Ne rezervăm dreptul absolut, discreționar și inatacabil de a vă restricționa, suspenda temporar sau bana definitiv (inclusiv blocarea clasei de IP sau a ID-ului dispozitivului) de pe platformă, ÎN ORICE MOMENT, IMEDIAT și FĂRĂ NICIO NOTIFICARE PREALABILĂ sau explicație, în situația în care:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
              <li>Încălcați, în litera sau în spiritul ei, oricare dintre clauzele expuse în acești Termeni și Condiții (în special Codul de Conduită de la Cap. 11 și 12).</li>
              <li>Atrageți mai multe „Raportări” (Reports) legitime din partea altor utilizatori pentru comportament toxic, agresivitate în chat sau limbaj neadecvat.</li>
              <li>Avem suspiciunea rezonabilă și tehnică că utilizați platforma pentru spălare de bani, escrocherii imobiliare (Scam) sau postarea de anunțuri false („momeală”).</li>
              <li>Aduceți un prejudiciu de imagine brandului Rently sau periclitați funcționarea infrastructurii tehnice a serverului.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500 italic">
              *În cazul unei banări definitive, orice licență acordată prin prezentul document este revocată instantaneu. Nu aveți dreptul la nicio procedură de "apel" tehnic.
            </p>
          </TermsSection>

          <TermsSection id="t22" title="22. Rezilierea Voluntară și Efectele Ștergerii Contului">
            <p className="mb-4">
              Prezentul Contract are o durată nedeterminată (intră în vigoare la prima vizită și continuă pe durata existenței contului). 
            </p>
            <h4 className="font-bold text-slate-800 mb-2">Cum reziliați contractul?</h4>
            <p className="mb-6 text-slate-700">
              Aveți libertatea deplină să puneți capăt acestui acord oricând, fără a ne oferi niciun motiv, prin simpla utilizare a funcției <strong>"Șterge Contul" (Delete Account)</strong> din panoul de setări, urmată de ștergerea cookie-urilor din browser și încetarea definitivă a accesării site-ului.
            </p>
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-md">
              <h4 className="font-bold text-blue-300 mb-2">Efectele Rezilierii (Survival Clauses):</h4>
              <p className="text-sm text-slate-300 m-0 leading-relaxed">
                La momentul radierii contului, toate datele dvs. publice dispar. Totuși, conform practicilor juridice internaționale, anumite clauze critice din acest document <strong>vor supraviețui rezilierii</strong> și vor continua să producă efecte legale pe termen nedeterminat. Aceste "Survival Clauses" includ: Proprietatea Intelectuală (Cap. 17), Limitarea Răspunderii (Cap. 23), Despăgubirile (Cap. 24) și Jurisdicția (Cap. 27). Faptul că v-ați șters contul azi nu anulează dreptul nostru de a ne apara în instanță mâine dacă ne-ați produs o daună ieri.
              </p>
            </div>
          </TermsSection>

          <TermsSection id="t23" title="23. LIMITAREA ABSOLUTĂ A RĂSPUNDERII (LIABILITY CAP)" defaultOpen={true} icon="🛑">
            <AlertBox type="critical">
              <h4 className="font-black text-2xl mb-4 uppercase tracking-widest text-red-900 border-b border-red-200 pb-3">
                SECȚIUNE CRITICĂ - CITIȚI CU ATENȚIE
              </h4>
              <p className="font-bold text-lg mb-4 text-red-800">
                PENTRU A PUTEA OPERA ACEST PROIECT ÎN MOD 100% GRATUIT, FĂRĂ BARIERE FINANCIARE PENTRU COMUNITATE, ESTE JURIDIC IMPERATIV SĂ NE PROTEJĂM DE PROCESE RUINATOARE CAUZATE DE FAPTELE ALTOR UTILIZATORI.
              </p>
              <div className="space-y-4 text-red-900/90 text-sm md:text-base leading-relaxed font-medium uppercase text-justify">
                <p>
                  ÎN MĂSURA MAXIMĂ PERMISĂ DE LEGEA APLICABILĂ, OPERATORUL Rently (INCLUSIV FONDATORUL SĂU, ANGAJAȚII SAU COLABORATORII SĂI, DACĂ VA FI CAZUL PE VIITOR) RESPINGE ÎN MOD EXPRES ORICE FEL DE GARANȚII, EXPRESE SAU IMPLICITE.
                </p>
                <p>
                  SUB NICIO CIRCUMSTANȚĂ, Rently NU VA FI RĂSPUNZĂTOR FAȚĂ DE DUMNEAVOASTRĂ SAU FAȚĂ DE ORICE TERȚĂ PARTE PENTRU NICIUN FEL DE DAUNE DIRECTE, INDIRECTE, INCIDENTALE, SPECIALE, PUNITIVE SAU CONSECVENTE, INCLUZÂND, DAR FĂRĂ A SE LIMITA LA:
                </p>
                <ul className="list-disc pl-6 space-y-2 normal-case font-bold">
                  <li>Pierderea de bani (avansuri, chirii, garanții) cauzată de escrocherii, țepe imobiliare sau fraude orchestrate de alți utilizatori ai platformei pe care nu i-ați verificat;</li>
                  <li>Vătămări corporale, daune morale, suferințe psihice sau pagube aduse bunurilor materiale rezultate din întâlnirile fizice pentru vizionare sau din perioada de coabitare cu un coleg găsit prin intermediul platformei;</li>
                  <li>Pierderea de date informatice (poze/mesaje) din cauza picării serverelor, erorilor de cod (bug-uri) sau hack-urilor cibernetice;</li>
                  <li>Incapacitatea platformei de a găsi un chiriaș/coleg în timpul dorit de dumneavoastră.</li>
                </ul>
              </div>
              <div className="mt-6 bg-red-900 text-white p-5 rounded-xl border border-red-700">
                <strong className="block mb-2 text-red-300 uppercase tracking-widest text-xs">Plafonarea Maximă a Răspunderii (Maximum Liability Cap)</strong>
                <p className="text-sm m-0 leading-relaxed font-bold">
                  ÎN SITUAȚIA EXTREMĂ ÎN CARE O INSTANȚĂ JUDECĂTOREASCĂ DIN ROMÂNIA ANULEAZĂ PREVEDERILE DE MAI SUS ȘI STABILEȘTE O CULPĂ DIRECTĂ A OPERATORULUI Rently, RECUNOAȘTEȚI ȘI ACCEPTAȚI CĂ RĂSPUNDEREA FINANCIARĂ MAXIMĂ, CUMULATĂ, A PLATFORMEI PENTRU ORICE PRETENȚIE NU VA DEPĂȘI NICIODATĂ SUMA DE 50 RON (CINCIZECI LEI NOI). ACEASTĂ PLAFONARE FIXĂ REFLECTĂ NATURA GRATUITĂ A SERVICIULUI OFERIT.
                </p>
              </div>
            </AlertBox>
          </TermsSection>

          <TermsSection id="t24" title="24. Clauza de Despăgubire (Hold Harmless & Indemnification)">
            <p className="mb-4">
              În contrapartidă cu utilizarea gratuită a ecosistemului nostru, vă asumați întreaga responsabilitate pentru actele dumneavoastră juridice, digitale și fizice.
            </p>
            <p className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-700 font-medium">
              Vă angajați în mod ferm și irevocabil să apărați, să despăgubiți pe deplin și să mențineți Operatorul Rently complet inofensiv și exonerat de orice răspundere împotriva oricăror cereri de chemare în judecată, plângeri, datoriilor, daunelor, amenzilor (inclusiv amenzi GDPR cauzate de faptele dvs), costurilor sau cheltuielilor (incluzând onorarii avocațiale și taxe de timbru rezonabile) inițiate de o terță parte sau de autorități, care decurg direct sau indirect din:
            </p>
            <ul className="list-disc pl-8 mt-4 space-y-2 text-slate-700">
              <li>Încălcarea de către dumneavoastră a oricărei clauze din acești Termeni și Condiții;</li>
              <li>Evaziunea fiscală, neînregistrarea contractelor de închiriere la ANAF sau neplata impozitelor pe venit aferente chiriilor obținute prin platformă;</li>
              <li>Încălcarea drepturilor de autor ale unui fotograf sau ale unei agenții prin publicarea de poze furate pe Rently;</li>
              <li>Orice conflict violent, neînțelegere contractuală sau litigiu survenit în lumea reală între dumneavoastră și un chiriaș/proprietar cunoscut pe site.</li>
            </ul>
          </TermsSection>

          <TermsSection id="t25" title="25. Separabilitatea Clauzelor (Severability)">
            <p className="bg-slate-100 p-6 rounded-2xl text-slate-800 font-medium border border-slate-200">
              Dacă un judecător, un tribunal competent sau o autoritate cu jurisdicție asupra acestui Acord determină că o anumită prevedere (sau o parte dintr-o prevedere) din acești Termeni și Condiții este invalidă, ilegală, nulă sau neaplicabilă dintr-un viciu juridic, <strong>acea prevedere specifică va fi eliminată (separată) din contract.</strong> Această invalidare <strong>NU va afecta sub nicio formă validitatea, legalitatea și forța executorie a restului clauzelor rămase</strong>, care vor continua să producă efecte juridice depline ca și cum clauza nulă nu ar fi existat niciodată.
            </p>
          </TermsSection>

          <TermsSection id="t26" title="26. Forța Majoră și Căderi Tehnice">
            <p className="mb-4">
              Principiul Forței Majore, așa cum este definit de Codul Civil Român, se aplică în totalitate acestui acord. Rently nu va fi ținut răspunzător pentru nicio întârziere, neexecutare sau ștergere de date cauzată de circumstanțe care scapă complet controlului nostru rezonabil.
            </p>
            <p className="mb-2 font-bold text-slate-800">În lumea arhitecturii web Cloud, „Forța Majoră” include, pe lângă calamitățile clasice, următoarele:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
              <li>Colapsul total al infrastructurii globale de Cloud (ex: dacă serverele Amazon AWS sau Supabase se prăbușesc simultan la nivel european);</li>
              <li>Tăierea sau sabotarea cablurilor de fibră optică magistrale (Backbone fiber cuts) care conectează Europa de restul lumii;</li>
              <li>Atacuri cibernetice la scară mondială (Ransomware global, Zero-Day Exploits în limbajele de programare);</li>
              <li>Cenzura impusă de stat, schimbări radicale ale legislației internetului sau blocarea domeniilor la nivel de ISP.</li>
            </ul>
          </TermsSection>

          <TermsSection id="t27" title="27. Legislația Guvernantă">
            <p className="text-lg font-medium text-slate-800 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              Conținutul, interpretarea, validitatea și punerea în executare a prezentului Contract (precum și orice litigii extra-contractuale derivate din utilizarea platformei) vor fi guvernate în mod absolut și exclusiv de <strong>legislația materială și procesuală a României</strong> (și de regulamentele aplicabile direct ale Uniunii Europene, precum GDPR). Se exclude în mod expres aplicarea normelor de conflict de legi care ar putea trimite soluționarea litigiului către legislația altui stat.
            </p>
          </TermsSection>

          <TermsSection id="t28" title="28. Soluționarea Litigiilor și Competența Teritorială" icon="⚖️">
            <p className="mb-4">Orice comunitate implică fricțiuni, însă fondatorul Rently susține rezolvarea elegantă a oricărei discrepanțe tehnice sau contractuale. Ca atare, sunteți de acord cu următorul proces în doi pași obligatorii:</p>
            
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><span className="text-blue-600 bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Medierea Amiabilă Prealabilă (Obligatorie)</h4>
                <p className="text-sm text-slate-700 m-0">Înainte de a declanșa orice acțiune litigioasă în instanță sau o plângere la ANPC, vă asumați obligația contractuală de a ne notifica în scris problema la adresa <strong>rently.studenti@gmail.com</strong>. Vom dispune de un termen de grație de <strong>30 de zile calendaristice</strong> pentru a investiga tehnic și a încerca o rezolvare pe cale amiabilă a diferendului.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><span className="text-red-600 bg-red-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Competența Exclusivă a Instanțelor (Prorogare de competență)</h4>
                <p className="text-sm text-slate-700 m-0">Dacă încercarea de mediere eșuează după trecerea celor 30 de zile, ambele părți consimt în mod ferm, irevocabil și neechivoc că <strong>orice litigiu va fi dedus spre soluționare exclusiv instanțelor judecătorești competente material de pe raza teritorială a Municipiului Timișoara, Județul Timiș, România</strong> (domiciliul operațional al proiectului). Prin acceptarea Termenilor, renunțați în mod expres la orice excepție sau obiecție privind necompetența teritorială a acestor instanțe.</p>
              </div>
            </div>
          </TermsSection>

          <TermsSection id="t29" title="29. Actualizarea și Modificarea Prezentului Contract">
            <p className="mb-4">
              Dinamicile tehnologice de dezvoltare software (vom lansa versiuni noi ale site-ului frecvent) și evoluția legislației (noi legi digitale impuse de Uniunea Europeană) necesită o adaptabilitate contractuală absolută.
            </p>
            <p className="mb-4 font-bold text-slate-900 bg-slate-100 p-4 rounded-xl">
              Prin urmare, Administratorul își rezervă dreptul inalienabil și unilateral de a revizui, a adăuga, a șterge sau a modifica oricare dintre clauzele acestor Termeni și Condiții, în orice moment, fără necesitatea acordului dumneavoastră prealabil pe textul nou.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              <li>Modificările administrative (corectarea de virgule, reformulări pentru a fi mai ușor de citit) produc efecte <strong>instantaneu</strong> de la data publicării lor pe această pagină.</li>
              <li>Dacă vom implementa o schimbare masivă (de exemplu, renunțarea la statutul de 100% gratuit și introducerea unui sistem de plată a anunțurilor), ne angajăm să vă trimitem un aviz prin e-mail și să afișăm un banner mare pe prima pagină a site-ului cu cel puțin 15 zile înainte.</li>
              <li>Dacă nu sunteți de acord cu noua versiune a Termenilor, aveți opțiunea și obligația de a vă opri din folosirea site-ului și de a apăsa butonul de ștergere a contului. Continuarea accesării site-ului după data publicării constituie acceptarea automată și fermă a noilor modificări juridice.</li>
            </ul>
          </TermsSection>

          <TermsSection id="t30" title="30. Date de Contact Oficiale și Soluționarea Problemelor" defaultOpen={true}>
            <p className="mb-8 text-lg text-slate-600 font-light">
              Acest document uriaș nu a fost scris pentru a ne ascunde de dumneavoastră, ci pentru a clarifica și proteja ambele părți într-un ecosistem online adesea haotic. Fiind un proiect independent, comunicarea este umană, directă și la obiect. Nu veți primi "tickete de suport" generate de roboți care să vă plimbe pe la 5 departamente inexistente.
            </p>
            
            <div className="bg-[#020617] rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 opacity-20 rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600 opacity-20 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h4 className="font-black text-3xl md:text-4xl mb-6 text-white tracking-tight">Ai o problemă tehnică sau o neclaritate legală?</h4>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                  Pentru orice problemă legată de interpretarea unei clauze, pentru raportarea urgentă a unui utilizator scammer care v-a cerut bani în avans, sau pur și simplu pentru a ne da un feedback constructiv, lăsați-ne un mesaj.
                </p>
                
                <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl w-full sm:w-auto">
                  <span className="block text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Adresa Unică de Corespondență</span>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <span className="text-4xl mb-2 sm:mb-0">✉️</span>
                    <a href="mailto:rently.studenti@gmail.com" className="text-white text-2xl sm:text-3xl md:text-4xl font-black hover:text-blue-400 transition-colors border-b-[3px] border-transparent hover:border-blue-400 pb-1 break-all">
                      rently.studenti@gmail.com
                    </a>
                  </div>
                </div>
                
                <p className="mt-10 text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-900/50 inline-block px-4 py-2 rounded-lg border border-slate-800">
                  Timp asumat de răspuns (SLA): Sub 48 de ore lucrătoare
                </p>
              </div>
            </div>
          </TermsSection>

        </div>
      </main>

      <Footer />
    </div>
  );
}