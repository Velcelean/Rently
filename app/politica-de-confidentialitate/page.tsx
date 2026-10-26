"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// COMPONENTE UI REUTILIZABILE PENTRU POLITICĂ
// ==========================================

const PolicySection = ({ 
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
        className={`border ${isOpen ? 'border-blue-300 shadow-xl ring-1 ring-blue-100/50' : 'border-slate-200 hover:border-blue-200'} bg-white rounded-3xl overflow-hidden transition-all duration-300`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none transition-colors ${isOpen ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
        >
          <div className="flex items-center gap-4">
            {icon && (
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-colors ${isOpen ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
                {icon}
              </div>
            )}
            <h2 className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${isOpen ? 'text-blue-900' : 'text-slate-900'}`}>
              {title}
            </h2>
          </div>
          <div className={`transform transition-transform duration-500 flex-shrink-0 ml-4 p-2 rounded-full ${isOpen ? 'rotate-180 bg-blue-100 text-blue-700' : 'bg-slate-50 text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </button>
        <div className={`transition-all duration-700 ease-in-out origin-top ${isOpen ? 'max-h-[8000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95 overflow-hidden'}`}>
          <div className="p-6 md:p-8 pt-0 border-t border-slate-100/60 prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-blue-600 prose-strong:text-slate-900 leading-loose text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoBox = ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "success" | "danger" }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    danger: "bg-red-50 border-red-200 text-red-800"
  };
  
  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    danger: "🚨"
  };

  return (
    <div className={`flex gap-4 p-6 rounded-2xl border ${styles[type]} shadow-sm my-6`}>
      <span className="text-2xl shrink-0 leading-none">{icons[type]}</span>
      <div className="text-sm md:text-base leading-relaxed font-medium m-0">
        {children}
      </div>
    </div>
  );
};

// ==========================================
// PAGINA PRINCIPALĂ (Peste 1000 de linii structurate)
// ==========================================

export default function UltimatePrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HEADER ENTERPRISE / LEGAL MASTER */}
      <div className="bg-[#020617] text-white pt-32 pb-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 border-b border-slate-800/80 pb-16">
            <div className="max-w-5xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Politica Globală <br className="hidden md:block" /> de Confidențialitate
              </h1>
              <p className="text-slate-400 text-lg md:text-2xl leading-relaxed font-light max-w-4xl">
                Cadrul normativ exhaustiv privind guvernanța datelor, arhitectura de securitate informatică, prelucrarea, retenția și protecția datelor cu caracter personal în ecosistemul Rently.
              </p>
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
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Index Structural (30 Capitole)</h3>
            </div>
            <nav className="space-y-0.5 text-[13px] font-bold h-[calc(100vh-220px)] overflow-y-auto pr-3 custom-scrollbar">
              <a href="#c1" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">1. Preambul și Filosofie</a>
              <a href="#c2" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">2. Cadrul Legislativ European</a>
              <a href="#c3" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">3. Definiții Extinse (Glosar)</a>
              <a href="#c4" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">4. Identitatea Operatorului</a>
              <a href="#c5" className="block px-4 py-2.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all">5. Declarația "Zero Date Financiare"</a>
              <a href="#c6" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">6. Principiile Prelucrării (Art. 5)</a>
              <a href="#c7" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">7. Tipologia Datelor Colectate Direct</a>
              <a href="#c8" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">8. Telemetrie și Colectare Automată</a>
              <a href="#c9" className="block px-4 py-2.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all">9. Date cu Caracter Special (Sensibile)</a>
              <a href="#c10" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">10. Temeiuri Juridice (Matrice)</a>
              <a href="#c11" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">11. Algoritmi și Decizii Automatizate</a>
              <a href="#c12" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">12. Profilarea Utilizatorilor</a>
              <a href="#c13" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">13. Confidențialitatea Mesajelor</a>
              <a href="#c14" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">14. Transparența Antifraudă</a>
              <a href="#c15" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">15. Destinatarii Datelor</a>
              <a href="#c16" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">16. Lista Sub-Procesatorilor</a>
              <a href="#c17" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">17. Transferuri Internaționale</a>
              <a href="#c18" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">18. Data Privacy Framework (DPF)</a>
              <a href="#c19" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">19. Politica de Retenție a Datelor</a>
              <a href="#c20" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">20. Ciclul de Ștergere a Contului</a>
              <a href="#c21" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">21. Securitatea Informației (IT)</a>
              <a href="#c22" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">22. Criptografia și Stocarea Parolelor</a>
              <a href="#c23" className="block px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all">23. Răspuns la Incidente (Data Breach)</a>
              <a href="#c24" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">24. Cele 6 Drepturi Fundamentale</a>
              <a href="#c25" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">25. Procedura DSAR (Cum soliciți date)</a>
              <a href="#c26" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">26. Colaborarea cu Autoritățile</a>
              <a href="#c27" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">27. Protecția Minorilor (Sub 18 ani)</a>
              <a href="#c28" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">28. Guvernanța Cookie-urilor</a>
              <a href="#c29" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">29. Revizuiri și Versionare Document</a>
              <a href="#c30" className="block px-4 py-2.5 text-blue-700 bg-blue-100/50 rounded-xl transition-all">30. Contact DPO și Plângeri (ANSPDCP)</a>
            </nav>
          </div>
        </aside>

        {/* CONTINUT EXHAUSTIV ACORDIOANE */}
        <div className="w-full xl:w-[calc(100%-25rem)] pb-32">
          
          <PolicySection 
            id="c1" 
            title="1. Preambul și Filosofia Proiectului Independent" 
            defaultOpen={true}
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
          >
            <p className="lead text-xl text-slate-700 mb-6 font-medium">
              Bine ai venit pe Rently. Această platformă s-a născut dintr-o nevoie reală a comunității, fiind dezvoltată exclusiv ca un proiect independent de către un singur programator (Solo Developer). Nu suntem o corporație, nu avem asociați ascunși și nu răspundem în fața unor consilii de administrație obsedate de monetizarea datelor.
            </p>
            <p>
              În conformitate cu principiul transparenței prevăzut de legislația europeană, acest document masiv reprezintă instrumentul fundamental prin care vă informăm, detaliat la nivel de cod și infrastructură, cu privire la guvernanța datelor dumneavoastră personale.
            </p>
            <p>
              Abordarea noastră nu se rezumă la o simplă conformare formală (bifarea unor căsuțe legale impuse de avocați). Am integrat conceptul de <em>Privacy by Design</em> (Confidențialitate din faza de proiectare arhitecturală) în absolut fiecare componentă de cod, flux de date și tabel din baza noastră de date. Ceea ce nu ne este absolut necesar pentru a face site-ul să funcționeze, pur și simplu nu colectăm.
            </p>
          </PolicySection>

          <PolicySection id="c2" title="2. Cadrul Legislativ European și Național">
            <p>Această arhitectură de confidențialitate a fost elaborată sub incidența directă și supravegherea următoarelor acte normative esențiale, care guvernează spațiul digital al Uniunii Europene:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
                <strong className="text-blue-700 block mb-2 text-lg">Regulamentul (UE) 2016/679 (GDPR)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Regulamentul General privind Protecția Datelor, aplicabil direct în toate statele membre UE începând cu 25 mai 2018. Este "Biblia" intimității digitale moderne.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
                <strong className="text-blue-700 block mb-2 text-lg">Directiva 2002/58/CE (ePrivacy)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Directiva privind prelucrarea datelor personale și protejarea confidențialității în sectorul comunicațiilor electronice (cunoscută popular ca "Legea Cookie-urilor").</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
                <strong className="text-blue-700 block mb-2 text-lg">Legea nr. 190/2018 (România)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Legea națională de punere în aplicare a prevederilor GDPR, care definește prerogativele Autorității Naționale (ANSPDCP) și excepțiile naționale.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
                <strong className="text-blue-700 block mb-2 text-lg">Jurisprudența CJUE</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Deciziile Curții de Justiție a Uniunii Europene, în mod cu totul special speța <em>Schrems II (C-311/18)</em>, care ne dictează cum gestionăm transferurile datelor către servere din SUA.</p>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c3" title="3. Definiții Extinse și Glosar Tehnic">
            <p>Pentru a exclude orice fel de echivoc, interpretăm termenii de mai jos exact conform Articolului 4 din GDPR, adaptați la contextul tehnic al platformei Rently:</p>
            <div className="space-y-4 mt-6">
              <div className="p-5 border-l-4 border-blue-500 bg-white shadow-sm rounded-r-xl">
                <h4 className="font-black text-slate-900 m-0 text-lg">Date cu Caracter Personal</h4>
                <p className="text-slate-600 mt-2">Orice informație referitoare la o persoană fizică identificată sau identificabilă („Persoana Vizată”). Pe platforma noastră, aceasta include descriptori direcți (Nume, adresă de e-mail) și descriptori indirecți sau tehnici (Adresa IP de pe care vă logați, un ID unic stocat într-un Cookie, metadate de localizare din browser).</p>
              </div>
              <div className="p-5 border-l-4 border-purple-500 bg-white shadow-sm rounded-r-xl">
                <h4 className="font-black text-slate-900 m-0 text-lg">Categorii Speciale (Date Sensibile - Art. 9)</h4>
                <p className="text-slate-600 mt-2">Sunt un sub-set de date ultra-protejate. Ele dezvăluie originea rasială/etnică, opiniile politice, date biometrice de sănătate sau <strong>orientarea sexuală / viața sexuală</strong>. Pe Rently, selectarea filtrului opțional "LGBTQ+ Friendly" se încadrează strict în această categorie sensibilă.</p>
              </div>
              <div className="p-5 border-l-4 border-blue-500 bg-white shadow-sm rounded-r-xl">
                <h4 className="font-black text-slate-900 m-0 text-lg">Prelucrare (Processing)</h4>
                <p className="text-slate-600 mt-2">Termenul umbrelă pentru <em>absolut orice</em> operațiune automatizată efectuată asupra datelor: la noi se referă la colectarea prin formulare, stocarea în baza de date Supabase, afișarea lor publică în anunțuri, modificarea lor din dashboard și ștergerea definitivă la cerere.</p>
              </div>
              <div className="p-5 border-l-4 border-emerald-500 bg-white shadow-sm rounded-r-xl">
                <h4 className="font-black text-slate-900 m-0 text-lg">Operator (Data Controller)</h4>
                <p className="text-slate-600 mt-2">Persoana fizică sau juridică care determină „de ce” (scopul) și „cum” (mijloacele) sunt prelucrate datele. Operatorul este entitatea care răspunde legal în fața dumneavoastră. În acest caz, fondatorul independent al Rently.</p>
              </div>
              <div className="p-5 border-l-4 border-amber-500 bg-white shadow-sm rounded-r-xl">
                <h4 className="font-black text-slate-900 m-0 text-lg">Persoană Împuternicită (Data Processor)</h4>
                <p className="text-slate-600 mt-2">Orice terț, furnizor de servicii (hosting, baze de date, analytics), care prelucrează date <em>exclusiv</em> în numele, la comanda și sub instrucțiunile stricte ale Operatorului. Aceștia nu au voie să folosească datele pentru interese proprii.</p>
              </div>
              <div className="p-5 border-l-4 border-rose-500 bg-white shadow-sm rounded-r-xl">
                <h4 className="font-black text-slate-900 m-0 text-lg">Pseudonimizare vs. Anonimizare (Diferență critică)</h4>
                <p className="text-slate-600 mt-2"><strong>Pseudonimizarea</strong> maschează datele (ex: parola este transformată într-un hash <code>$2a$12$R9h...</code>), dar ele pot fi re-identificate dacă deții o cheie secretă. <strong>Anonimizarea</strong> presupune distrugerea ireversibilă a oricărei legături cu persoana. Odată anonimizată, o dată iese de sub incidența GDPR.</p>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c4" title="4. Identitatea Operatorului">
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-8 border-b border-slate-700/80 pb-4 text-slate-100 flex items-center gap-3">
                  <span className="text-blue-400">👤</span> Coordonate de Control Juridic
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base">
                  <div>
                    <p className="text-slate-400 mb-1 text-sm font-bold uppercase tracking-wider">Natura Entității:</p>
                    <p className="font-black text-xl text-white mb-6">Proiect Privat Independent <br/><span className="text-sm font-medium text-blue-300 font-mono">(Dezvoltator Persoană Fizică)</span></p>
                    
                    <p className="text-slate-400 mb-1 text-sm font-bold uppercase tracking-wider">Model de Funcționare:</p>
                    <div className="inline-block bg-green-900/50 border border-green-500/30 px-3 py-1.5 rounded-lg">
                      <p className="font-mono text-green-400 font-bold text-sm">100% Gratuit / Fără Monetizare Comercială</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1 text-sm font-bold uppercase tracking-wider">Contact Oficial (Data Protection):</p>
                    <p className="font-black text-2xl text-white mb-6 hover:text-blue-300 transition-colors">
                      <a href="mailto:rently.studenti@gmail.com">rently.studenti@gmail.com</a>
                    </p>
                    
                    <p className="text-slate-400 mb-1 text-sm font-bold uppercase tracking-wider">Jurisdicție Suverană de Operare:</p>
                    <p className="font-medium text-slate-200">România (Guvernată de legile Uniunii Europene)</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-slate-600">
              Notă referitoare la transparență: Deoarece funcționăm ca un proiect personal (persoană fizică), fără personalitate juridică de tip SRL, SA sau PFA în acest stadiu incipient (MVP), domiciliul fizic al dezvoltatorului nu este afișat public din rațiuni evidente de siguranță personală. Toată asistența legală și corespondența privind protecția datelor se derulează electronic, prin intermediul adresei oficiale menționate mai sus, cu eficacitate juridică deplină.
            </p>
          </PolicySection>

          <PolicySection id="c5" title="5. Declarația Zero Date Financiare (Important!)" defaultOpen={true}>
            <InfoBox type="success">
              <h4 className="font-black text-xl mb-3 flex items-center gap-2">Platformă Liberă. Fără Carduri. Fără IBAN-uri.</h4>
              <p className="mb-4">
                Spre deosebire de alte platforme corporatiste imobiliare care vă cer bani pentru fiecare publicare sau "reactualizare" de anunț, Rently este conceput într-un mod complet deschis și oferit gratuit comunității pentru a facilita găsirea colegilor de apartament.
              </p>
              <p className="mb-4">
                Aceasta este o veste extraordinară pentru confidențialitatea datelor dumneavoastră. Pentru că nu vindem nimic, <strong>eliminăm complet din sistemul nostru clasa celor mai sensibile date din lume: datele financiare.</strong>
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2 font-bold text-green-900 bg-green-100/50 p-4 rounded-xl border border-green-200/50">
                <li>NU colectăm, nu cerem și nu procesăm vreodată <strong>numere de card (PAN, Dată de expirare, cod CVV)</strong>.</li>
                <li>NU vă cerem să ne furnizați conturi <strong>IBAN</strong> bancare.</li>
                <li>NU cerem adrese de facturare și nu solicităm Codul Numeric Personal (<strong>CNP</strong>).</li>
              </ul>
              <p className="mt-5 text-sm text-green-700 font-bold uppercase tracking-wide border-t border-green-200 pt-4">
                ⚠️ Avertisment de Securitate: Dacă primiți vreodată un SMS, un mesaj pe WhatsApp sau un E-mail care conține logoul Rently și prin care vi se cere "o taxă de validare a contului" sau "un avans pentru proprietar", sunteți ținta unei tentative externe de fraudă (Scam/Phishing). Blocați imediat acel expeditor!
              </p>
            </InfoBox>
          </PolicySection>

          <PolicySection id="c6" title="6. Cele 6 Principii ale Prelucrării (Articolul 5 din GDPR)">
            <p className="mb-6">Sistemul nostru informatic a fost codat de la zero având în minte cele 6 principii de fier ale Regulamentului European. Fiecare funcție nouă adăugată pe site este auditată mental împotriva acestei listei:</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block opacity-80">⚖️</span>
                <strong className="block mb-2 text-lg text-slate-900">1. Legalitate, Echitate și Transparență</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Nu procesăm absolut nimic ascuns sau "pe sub mână". Orice bit de informație pe care îl stocăm are un temei legal solid în spate (executarea serviciului către dumneavoastră, interes legitim sau consimțământ pur). Acest document în sine este dovada transparenței noastre absolute.</p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block opacity-80">🎯</span>
                <strong className="block mb-2 text-lg text-slate-900">2. Limitarea Scopului (Purpose Limitation)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Datele colectate pentru a vă ajuta să găsiți o chirie sunt folosite exclusiv pentru asta. Nu vă vom lua adresa de email cerută la înregistrare pentru a o vinde unor terți care să vă inunde cu reclame la mașini de spălat sau asigurări de viață.</p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block opacity-80">📉</span>
                <strong className="block mb-2 text-lg text-slate-900">3. Minimizarea Datelor (Data Minimization)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Dacă nu avem absolută nevoie de o informație tehnică pentru a rula site-ul, nu v-o solicităm. De exemplu, platforma este concepută să funcționeze perfect doar cu un simplu "Username" (Nume afișat) inventat, fără a vă obliga să folosiți numele real din buletin.</p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block opacity-80">✅</span>
                <strong className="block mb-2 text-lg text-slate-900">4. Exactitate (Accuracy)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Datele trebuie să fie corecte și actualizate. Pentru a respecta acest principiu, v-am construit un Panou de Control (Dashboard) avansat. Aveți puterea și controlul total de a edita, corecta sau ascunde instantaneu orice informație învechită din profilul dvs.</p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block opacity-80">⏳</span>
                <strong className="block mb-2 text-lg text-slate-900">5. Limitarea Stocării (Storage Limitation)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Nu transformăm baza de date într-un cimitir de informații vechi. Avem reguli clare și sisteme (detaliate în Capitolul 19) care dictează distrugerea datelor odată ce scopul lor a expirat, sau imediat ce apăsați butonul de „Ștergere Cont”.</p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block opacity-80">🛡️</span>
                <strong className="block mb-2 text-lg text-slate-900">6. Integritate și Confidențialitate (Securitate)</strong>
                <p className="text-sm text-slate-600 leading-relaxed">Apărăm baza de date împotriva prelucrării neautorizate (hackeri, scraping) folosind arhitecturi Cloud sigure, token-uri de autentificare, firewall-uri de rețea (WAF) și tehnici avansate de criptare a parolelor la nivel de server.</p>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c7" title="7. Tipologia Datelor Colectate Direct (Input Utilizator)">
            <p className="mb-6">Pentru o transparență deplină asupra fluxurilor noastre operaționale (Data Mapping), iată exact ce informații ne transmiteți în mod direct și conștient, tastând în câmpurile și formularele noastre:</p>
            
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center gap-3">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">A</div> 
                  <h4 className="font-bold text-slate-900 text-lg m-0">Date de Identitate Digitală (Creare Cont)</h4>
                </div>
                <div className="p-6 text-slate-600">
                  <p className="mb-3 text-sm">Aceste date sunt absolut vitale. Fără ele, este imposibil tehnic să vă creăm un cont privat și să vă recunoaștem când reveniți pe site.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Adresa de E-mail:</strong> Unică per utilizator, folosită ca identificator principal de login și canal de asistență (ex: recuperare parolă).</li>
                    <li><strong>Parola:</strong> Așa cum o scrieți în formular (Dar atenție, aceasta este transformată *instantaneu* în server într-un string criptat ireversibil. Nu putem citi parolele).</li>
                    <li><strong>Numele Afișat (Username):</strong> Fie numele real, fie un pseudonim ales de dumneavoastră pentru a fi afișat pe site (ex: "Alex_1995").</li>
                  </ul>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center gap-3">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">B</div> 
                  <h4 className="font-bold text-slate-900 text-lg m-0">Conținut Generat de Utilizator (Anunțuri & UGC)</h4>
                </div>
                <div className="p-6 text-slate-600">
                  <p className="mb-3 text-sm">Aceste informații sunt oferite voluntar și cu intenția absolută de a fi făcute <strong>PUBLICE</strong> pe internet, astfel încât alți oameni să vă poată găsi anunțul.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Informații Imobiliare:</strong> Preț, descrierea apartamentului, orașul, adresa (dacă alegeți să fiți precis), dotări (WiFi, mașină de spălat, etc.).</li>
                    <li><strong>Fișiere Multimedia:</strong> Fotografiile încărcate cu locuința. <em>Notă: Rețineți că imaginile realizate cu smartphone-ul pot conține ascunse în fișier (Metadate EXIF) detalii precise de GPS sau tipul de telefon folosit. Când încărcați poza, sistemul nostru o prelucrează pentru afișare, dar vă recomandăm să nu încărcați poze cu persoane.</em></li>
                    <li><strong>Date de conviețuire:</strong> Mențiuni din text de tipul: „Sunt student la medicină”, „Sunt o persoană liniștită, am o pisică”.</li>
                  </ul>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center gap-3">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">C</div> 
                  <h4 className="font-bold text-slate-900 text-lg m-0">Informații din Mesageria Internă (Chat)</h4>
                </div>
                <div className="p-6 text-slate-600">
                  <p className="mb-3 text-sm">Pentru a facilita contactul fără a fi nevoiți să vă afișați numărul personal de WhatsApp pe un panou public, am construit propriul nostru sistem de inbox.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Stocăm conținutul brut al mesajelor text trimise.</li>
                    <li>Stocăm indicatorii temporali (Timestamp-uri): La ce oră exactă s-a trimis și s-a citit mesajul.</li>
                    <li>Identificatorii tehnici de legătură (Cine a trimis cui).</li>
                  </ul>
                </div>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c8" title="8. Telemetrie, Syslogs și Colectare Automată (Sub Capotă)">
            <p className="mb-4">O platformă web complexă nu poate funcționa fără a colecta anumite metadate de rețea. În momentul în care accesați <code>Rently.ro</code>, browser-ul dumneavoastră „discută” cu serverul nostru și ne lasă automat următoarea "amprentă" tehnică:</p>
            
            <div className="bg-slate-900 text-slate-300 p-6 md:p-8 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
              <span className="text-green-400 font-bold mb-4 block">// Date colectate invizibil, la nivel de infrastructură HTTP/TCP:</span>
              <ul className="list-none space-y-3 pl-0">
                <li><span className="text-blue-400">► IP Address:</span> Adresa de Protocol Internet (ex: 86.121.X.X). Critică pentru firewall-ul nostru (Cloudflare) să blocheze atacuri DDoS rusești sau chinezești. Ne ajută să deducem locația grosieră (orașul).</li>
                <li><span className="text-blue-400">► User-Agent String:</span> Informații despre tipul de browser și dispozitiv (ex: <code>Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)</code>). Ne spune dacă trebuie să servim varianta de mobil sau varianta de laptop a site-ului.</li>
                <li><span className="text-blue-400">► Clickstream & Referrer:</span> Din ce pagină ați venit (dacă ați dat click dintr-o căutare Google) și ce pagini accesați. Ne ajută la statisticile interne.</li>
                <li><span className="text-blue-400">► Timestamps & Auth Logs:</span> Înregistrăm la milisecundă când s-a efectuat un Login sau un Signout, date obligatorii pentru analiza investigativă în cazul spargerii unui cont.</li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-slate-600 font-medium">Aceste fișiere jurnal (Server Logs) sunt ținute strict confidențiale în memoria serverelor noastre, fiind rotite și arhivate automat. Ele nu sunt utilizate pentru a vă crea un profil de utilizator public, ci reprezintă sistemul imunitar al platformei.</p>
          </PolicySection>

          <PolicySection id="c9" title="9. Prelucrarea Datelor Sensibile (Categorii Speciale Art. 9)">
            <InfoBox type="warning">
              <h4 className="font-black text-lg mb-2">Politica privitoare la caracteristicile vizând viața privată</h4>
              <p className="mb-4">Conform Articolului 9 din GDPR, datele care dezvăluie (chiar și indirect) originile etnice, opiniile politice, afilierile religioase sau orientarea / viața sexuală beneficiază de cel mai înalt grad de protecție legislativă (sunt interzise la prelucrare, cu excepții punctuale).</p>
              <p className="mb-4">Pe platforma Rently, nu colectăm, nu procesăm și nu afișăm informații referitoare la aceste categorii speciale sensibile, asigurând astfel un mediu neutru și concentrat exclusiv pe compatibilitatea de coabitare.</p>
            </InfoBox>
          </PolicySection>

          <PolicySection id="c10" title="10. Matricea Temeiurilor Juridice (De ce avem dreptul să facem asta)">
            <p className="mb-6">Pentru ca platforma să poată funcționa în cadrul legii, legăm fiecare acțiune tehnică de un temei juridic clar din Articolul 6(1) GDPR:</p>
            
            <div className="overflow-x-auto shadow-md border border-slate-200 rounded-2xl">
              <table className="min-w-full text-sm text-left whitespace-nowrap md:whitespace-normal">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Acțiune (Ce facem noi)</th>
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs w-48">Date Utilizate</th>
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs w-64">Temei Juridic (Baza Legală)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 leading-relaxed"><strong>Crearea și Găzduirea Contului:</strong> Oferirea posibilității de login, schimbarea parolei, editarea setărilor de profil.</td>
                    <td className="px-6 py-5 text-slate-600">E-mail, Parolă (hash), Username</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-blue-100/50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-lg font-bold">
                        <span>📜</span> Art. 6(1)(b) - Contractual
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 leading-relaxed"><strong>Operarea Core Business-ului:</strong> Afișarea anunțului dumneavoastră public pe internet pentru a găsi chiriași, stocarea pozelor, funcționarea Inbox-ului.</td>
                    <td className="px-6 py-5 text-slate-600">Poze, Texte anunț, Locație, Chat</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-blue-100/50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-lg font-bold">
                        <span>📜</span> Art. 6(1)(b) - Contractual
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 leading-relaxed"><strong>Securitatea Cibernetică:</strong> Analiza traficului pentru blocarea hackerilor, limitarea ratelor de request (Rate-limiting) pentru a nu "pica" serverul.</td>
                    <td className="px-6 py-5 text-slate-600">Adrese IP, User Agent, Timestamp</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-yellow-100/50 border border-yellow-300 text-yellow-800 px-3 py-1.5 rounded-lg font-bold">
                        <span>🛡️</span> Art. 6(1)(f) - Interes Legitim
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 leading-relaxed"><strong>Monitorizarea Anti-Fraudă:</strong> Banarea IP-urilor cunoscute pentru țepe imobiliare, analizarea mesajelor suspecte de Scam/Phishing raportate.</td>
                    <td className="px-6 py-5 text-slate-600">Textele mesajelor, Adresa IP</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-yellow-100/50 border border-yellow-300 text-yellow-800 px-3 py-1.5 rounded-lg font-bold">
                        <span>🛡️</span> Art. 6(1)(f) - Interes Legitim
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 leading-relaxed"><strong>Conformitatea Legală / Penala:</strong> Transmiterea datelor către Poliția Română sau DIICOT la solicitarea acestora prin Ordonanță/Mandat.</td>
                    <td className="px-6 py-5 text-slate-600">Absolut toate datele deținute.</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-red-100/50 border border-red-200 text-red-800 px-3 py-1.5 rounded-lg font-bold">
                        <span>⚖️</span> Art. 6(1)(c) - Obligație Legală
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 leading-relaxed"><strong>Analytics & Performanță (UI/UX):</strong> Colectarea de statistici despre câți oameni intră pe site și unde dau click (ex: Google Analytics).</td>
                    <td className="px-6 py-5 text-slate-600">Cookies, IP Anonimizat</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-green-100/50 border border-green-200 text-green-800 px-3 py-1.5 rounded-lg font-bold">
                        <span>✅</span> Art. 6(1)(a) - Consimțământ
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500">*Noțiunea de "Contract" înseamnă <em>Termenii și Condițiile</em> pe care le acceptați bifând căsuța la înregistrare. Chiar dacă nu este un contract tipărit semnat cu pixul și platforma e gratuită, acesta are putere juridică echivalentă.</p>
          </PolicySection>

          <PolicySection id="c11" title="11. Algoritmi și Decizii Automatizate (Fără impact legal)">
            <p className="mb-4">
              În sensul strict al <strong>Articolului 22 din GDPR</strong>, o decizie exclusiv automatizată care "produce efecte juridice" sau vă "afectează în mod similar semnificativ" înseamnă de exemplu: un algoritm de inteligență artificială care vă respinge complet automat cererea de credit la bancă fără ca un om să se uite pe dosar.
            </p>
            <p className="mb-4">
              Platforma Rently <strong>NU implementează și nu se bazează pe niciun sistem AI sau algoritm decizional de această magnitudine</strong>. Orice excludere permanentă a unui utilizator din comunitate (Banare Definitivă) este rezultatul unei investigații și decizii manuale umane luată de fondatorul proiectului.
            </p>
            <p>
              Singurele componente pur automatizate din sistemul nostru sunt la nivel tehnic de protecție: filtre software care taie temporar accesul la server dacă un IP face 100 de cereri pe secundă (lucru imposibil fizic pentru un om, indicând un atac DdoS sau un scraper bot), sau trigger-e de siguranță care te scot din cont dacă detectează un token expirat.
            </p>
          </PolicySection>

          <PolicySection id="c12" title="12. Profilarea Utilizatorilor">
            <p className="mb-4">
              Termenul "Profilare" înseamnă prelucrarea automată a datelor pentru a evalua aspecte ale unei persoane. Noi facem o profilare extrem de "light" și benignă, cu scopul clar de a vă ușura experiența de navigare pe site:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-3 text-slate-700">
              <li><strong>Sisteme de Recomandare și Sortare:</strong> Algoritmul nostru va încerca (dacă avem destule date implementate pe viitor) să vă arate pe prima pagină apartamente din orașul din care ați căutat cel mai des, în baza istoricului de căutare salvat local (în browser) sau asociat contului.</li>
              <li><strong>Targetare Marketing (Doar cu acord):</strong> Dacă, și numai dacă, ați acceptat explicit cookie-urile de Marketing din centrul de preferințe, partenerii noștri (ex: Facebook Pixel) vor asocia o mică bucată de cod browser-ului dvs. pentru a crea un profil de "persoană care caută chirie", arătându-vă reclame la Rently când derulați pe rețelele de social media. Această profilare este standard în industria de E-commerce și nu afectează integritatea dvs.</li>
            </ul>
          </PolicySection>

          <PolicySection id="c13" title="13. Confidențialitatea și Scanarea Mesajelor Interne" defaultOpen={true}>
            <InfoBox type="warning">
              <strong className="block text-lg mb-2">Lipsa Criptării End-to-End (E2E)</strong>
              <p className="mb-0">Spre deosebire de aplicațiile dedicate precum WhatsApp sau Signal, sistemul de chat intern de pe site-ul Rently <strong>nu beneficiază de criptare E2E.</strong> Acest lucru înseamnă din punct de vedere tehnic că baza noastră de date stochează mesajele în format text citibil (plain text), nu într-o "cutie încuiată" la care aveți doar voi cheia.</p>
            </InfoBox>
            
            <h4 className="font-bold text-slate-900 mt-6 mb-3 text-lg">De ce este gândit așa sistemul?</h4>
            <p className="mb-4 text-slate-700 leading-relaxed">
              Piața imobiliară online este, din nefericire, puternic infiltrată de escroci (persoane care postează poze false, furate de pe Booking.com/Airbnb și cer "rezervări" de bani în avans transferați pe Revolut/Western Union pentru vizionarea locuinței). Aceștia acționează predominant din străinătate și se ascund sub identități false.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
              Pentru a asigura o platformă sigură și a vă proteja banii, <strong>avem nevoie de abilitatea tehnică și legală de a interveni asupra conținutului</strong>, fapt pentru care invocăm interesul nostru legitim (Art 6.1.f).
            </p>

            <h4 className="font-bold text-slate-900 mt-6 mb-3 text-lg">Cum procesăm conversațiile:</h4>
            <ul className="space-y-4 list-none pl-0 text-slate-700">
              <li className="flex gap-3">
                <span className="text-xl">🤖</span>
                <p><strong>Scanare Automată la Nivel de Server:</strong> Implementăm rutine invizibile de cod (scripts) care analizează instantaneu cuvintele cheie din mesaje. Dacă sistemul detectează trimiterea masivă a unui link extern suspect către zeci de utilizatori simultan (tipar de atac Phishing), sau anumite cuvinte asociate clasic cu fraudele financiare, serverul va bloca trimiterea mesajului sau va suspenda temporar contul expediorului.</p>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">👨‍💻</span>
                <p><strong>Accesul Uman Limitat:</strong> Rămânem fideli dreptului dumneavoastră constituțional la secretul corespondenței. Nu citim mesajele obișnuite ca pe niște ziare. Accesul nostru uman, vizual, asupra arhivei conversației unei persoane se face <strong>STRICT</strong> în momentul în care primim un raport (Report Button) de abuz din partea celuilalt participant la conversație, sau la ordinele Poliției. Când apăsați butonul de "Raportează Utilizator", ne dați implicit acordul ca un operator uman de-al nostru să intervină și să citească log-urile respectivei conversații pentru a arbitra problema.</p>
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="c14" title="14. Transparența Anti-Fraudă (Avertisment de Risc)">
            <p className="mb-4 text-slate-700">
              Vă rugăm imperativ să nu folosiți chat-ul nostru pentru a trimite parole, coduri PIN, date de buletin sau numere de card de credit. Responsabilitatea morală și legală a oricărei sume de bani (avansuri, garanții, luni de chirie) expediate „în orb” către o altă persoană necunoscută pe internet vă aparține dumneavoastră în totalitate (conform Cap. 13 din Termeni și Condiții, Platforma Rently se exonerează de responsabilitate financiară pentru faptele ilicite ale terților).
            </p>
            <p className="text-slate-700">
              Reiterăm faptul că noi <strong>nu validăm actele de proprietate, nu inspectăm casele fizic și nu verificăm cazierul utilizatorilor</strong> (fiind o platformă gratuită și un proiect solo). Efectuarea „Due Diligence” (vizionarea fizică, verificarea calității de proprietar) este sarcina dumneavoastră înainte de semnarea oricărui contract.
            </p>
          </PolicySection>

          <PolicySection id="c15" title="15. Destinatarii Datelor (Nu Vindem Date)">
            <div className="bg-slate-900 text-center p-8 md:p-12 rounded-3xl mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              <span className="text-6xl mb-4 block relative z-10 drop-shadow-lg">🚫 💰</span>
              <h4 className="font-black text-2xl md:text-4xl text-white mb-4 relative z-10 tracking-tight">Garanția Anti-Vânzare de Date</h4>
              <p className="text-slate-300 text-lg m-0 relative z-10 max-w-2xl mx-auto leading-relaxed">
                Rently <strong className="text-white underline decoration-red-500 underline-offset-4 decoration-2">NU</strong> este și nu va deveni un Data Broker. Ne angajăm solemn, sub incidența sancțiunilor legale imense impuse de GDPR, că <strong>NU vom vinde, închiria, tranzacționa sau ceda accesul comercial direct</strong> la lista noastră de utilizatori, baze de date cu numere de telefon sau profile imobiliare către agenții de publicitate, firme de telemarketing sau brokeri externi.
              </p>
            </div>
            
            <p className="mb-4">Singurele cazuri în care datele dumneavoastră părăsesc serverul (sau sunt procesate extern) sunt strict operaționale (pentru ca site-ul să nu se "prăbușească" fizic pe internet) sau legale. Aceste entități (Sub-procesatori) acționează sub contracte draconice de confidențialitate (Data Processing Agreements - DPAs) semnate cu noi.</p>
          </PolicySection>

          <PolicySection id="c16" title="16. Lista Oficială a Sub-Procesatorilor (Vendors)">
            <p className="mb-6">Când navigați pe site-ul nostru, informația este procesată în fracțiuni de secundă de giganții tehnologici pe ale căror "umeri" am construit arhitectura platformei:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">▲</div>
                <h4 className="font-black text-slate-900 text-xl mb-2">Vercel Inc.</h4>
                <p className="text-sm text-slate-600 mb-3">Sediul: San Francisco, California (SUA)</p>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  Compania de top care ne găzduiește interfața grafică (Frontend-ul aplicației). Ei asigură rețeaua Edge globală prin care site-ul se încarcă rapid oriunde ați fi. Toate requesturile web (inclusiv IP-urile vizitatorilor) trec inițial prin serverele Vercel pentru rutare.
                </p>
              </div>

              <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">S</div>
                <h4 className="font-black text-slate-900 text-xl mb-2">Supabase Inc.</h4>
                <p className="text-sm text-slate-600 mb-3">Sediul: SUA / Servere Cloud: Regiunea Europa</p>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  „Inima” proiectului. Supabase ne furnizează baza de date relațională de tip PostgreSQL. Aici sunt stocate în mod criptat toate conturile, parolele hașurate, textele anunțurilor și mesajele de chat. Asigură și procesul de autentificare sigur al utilizatorilor.
                </p>
              </div>

              <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4 shadow-md">Send</div>
                <h4 className="font-black text-slate-900 text-xl mb-2">Resend / Twilio SendGrid</h4>
                <p className="text-sm text-slate-600 mb-3">Servicii de livrare E-mail (SaaS)</p>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  Avem nevoie de un serviciu specializat pentru a vă putea trimite e-mailuri sigure, care să nu ajungă în SPAM, pentru funcții critice precum confirmarea contului sau „Resetarea Parolei”. Acești provideri primesc doar adresa de e-mail temporar pentru a face expediția.
                </p>
              </div>

              <div className="border border-slate-200 p-6 rounded-2xl bg-white shadow-sm hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">G</div>
                <h4 className="font-black text-slate-900 text-xl mb-2">Google (Ireland Limited)</h4>
                <p className="text-sm text-slate-600 mb-3">Sediul: Dublin, Irlanda</p>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  Furnizorul soluției <strong>Google Analytics 4 (GA4)</strong>. Acest serviciu se activează <em>doar dacă</em> ați bifat cu degetul „Permit” pe panoul de Cookie-uri. Ne arată grafice agregate (ex: „Azi au intrat 500 de oameni de pe telefoane mobile din Cluj”).
                </p>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c17" title="17. Transferuri Internaționale de Date (Speța Schrems II)">
            <p className="mb-4">
              În era digitală modernă, serverele marilor furnizori SaaS sunt distribuite global. Cu toate că am setat infrastructura de baze de date (Supabase) să ruleze din <strong>Centre de Date situate în inima Uniunii Europene</strong> (exemplu: Frankfurt/Germania), unele componente ale codului (precum CDN-urile Vercel sau procesările Google) pot ruta informația prin servere deținute de companii cu sediul central în Statele Unite ale Americii (SUA).
            </p>
            <p className="mb-4">
              Exportul datelor europenilor în SUA a ridicat mari probleme legale la Curtea de Justiție a UE (CJUE) în procesul faimos cunoscut ca „Schrems II”, din pricina riscului teoretic ca agențiile de securitate națională americane (ex: NSA) să aibă acces la cablurile de net.
            </p>
            <p className="font-bold text-slate-800">
              Ne-am asigurat, în calitatea de Operator, că aceste transferuri extracomunitare sunt acoperite juridic:
            </p>
          </PolicySection>

          <PolicySection id="c18" title="18. Data Privacy Framework (DPF) & SCCs">
            <ol className="list-decimal pl-5 space-y-4 text-slate-700">
              <li>
                <strong>Data Privacy Framework UE-SUA (Decizia de Adecvare 2023):</strong> În iulie 2023, Comisia Europeană a aprobat un nou cadru legal. Acesta garantează că datele europenilor transferate în SUA beneficiază de un nivel de protecție „adecvat” (similar cu cel din UE), dar <em>doar dacă</em> companiile americane de destinație sunt certificate în acest program de către Departamentul de Comerț al SUA. Verificăm constat și colaborăm prioritar cu firme certificate DPF (precum Google LLC).
              </li>
              <li>
                <strong>Clauze Contractuale Standard (SCC - Standard Contractual Clauses):</strong> Pentru cazurile în care transferul nu se încadrează sub noul DPF (sau compania e din altă țară non-UE nesigură), furnizorii noștri se obligă contractual prin semnarea clauzelor standard modernizate redactate de Comisia Europeană, asumându-și responsabilitatea legală la nivel de contract și introducând măsuri tehnice suplimentare.
              </li>
              <li>
                <strong>Criptarea Extinsă (Măsură Tehnică Suplimentară):</strong> Oricum ar fi, transferul datelor prin cablurile transoceanice se face prin tunele de criptare avansate (TLS 1.2+). E ca și cum ai trimite un seif de fier printr-un curier nesigur: chiar dacă cineva interceptează pachetul, nu are codul ca să îl deschidă.
              </li>
            </ol>
          </PolicySection>

          <PolicySection id="c19" title="19. Politica de Retenție a Datelor (Data Retention Policy)">
            <p className="mb-6">Datele dumneavoastră nu devin zombi digitali uitați pe serverele noastre la nesfârșit. Aplicăm politici drastice de "curățenie":</p>
            
            <div className="overflow-x-auto shadow-sm border border-slate-200 rounded-xl mb-4">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Tipul de Dată Stocată</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Durata Maximă de Păstrare</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Evenimentul Declanșator (Trigger)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-medium">1. Date active din Cont (Nume, E-mail, Anunțuri curente, Poze de profil).</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold">Până la închidere</span></td>
                    <td className="px-6 py-4 text-slate-600">Reținute atâta timp cât mențineți relația contractuală și vă folosiți contul curent.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium">2. Conturi Inactive (Abandonate).</td>
                    <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-bold">Max. 24 - 36 Luni</span></td>
                    <td className="px-6 py-4 text-slate-600">Dacă nu ați mai dat login / nu v-ați mai accesat contul de mai bine de 2 ani, sistemul automat va considera că nu mai aveți nevoie de el și îl va marca pentru ștergere de tip "purge". Vă putem alerta pe email înainte de asta.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-medium">3. Jurnale Tehnice IT (Adrese IP, Crash Logs, Audit logs de securitate).</td>
                    <td className="px-6 py-4"><span className="bg-purple-100 text-purple-800 px-3 py-1 rounded font-bold">Aprox. 6 - 12 Luni</span></td>
                    <td className="px-6 py-4 text-slate-600">Sunt stocate pe termen scurt, doar cât să ne permită analiza istorică dacă un hacker a spart un sistem în lunile trecute, apoi sunt suprascrise / rotite automat (Log rotation).</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium">4. Hash-uri de IP/Email pentru Scammeri Banati.</td>
                    <td className="px-6 py-4"><span className="bg-red-100 text-red-800 px-3 py-1 rounded font-bold">Între 3 și 5 Ani</span></td>
                    <td className="px-6 py-4 text-slate-600">Temei legal: Interes Legitim (Cybersecurity). Refuzăm să ștergem amprenta tehnica a unui escroc dovedit, pentru a-l împiedica să își facă mâine un cont nou, fraudulos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </PolicySection>

          <PolicySection id="c20" title="20. Ciclul de Ștergere Definitivă a Contului">
            <p className="mb-4">
              Când intrați în meniul profilului și apăsați butonul fatal de <strong>"Șterge Contul" (Delete Account)</strong>, se întâmplă următoarele pe server:
            </p>
            <ul className="list-decimal pl-5 space-y-2 text-slate-700">
              <li>Paginile publice cu anunțurile dumneavoastră primesc instant un cod "404 Not Found". Accesul de pe internet este tăiat în milisecunda 2. (Există posibilitatea să mai apară pe Google 2-3 săptămâni, până când roboții Google își re-scanează memoria - Google Web Cache).</li>
              <li>Imaginile din bazele de date AWS/Cloud primesc ordinul tehnic de a fi șterse de pe partițiile de stocare (bucket deletion).</li>
              <li>Anunțurile pe care le-ați salvat cu „inimi” la favorite și chaturile dumneavoastră vor dispărea pentru ceilalți utilizatori sau vor afișa mențiunea "Utilizator Șters / Anonim".</li>
              <li><strong className="text-red-600">Backup-uri (Sisteme de Salvare în spatele scenei):</strong> Chiar dacă baza de date de producție vă șterge datele azi, ele vor mai supraviețui parțial, timp de <strong>maxim 30-45 de zile</strong>, adânc îngropate în arhivele de backup criptat pe care Supabase le ține pentru cazul extrem în care "pică serverul și trebuie restaurată planeta". Odată cu trecerea lunii, acele backup-uri vechi sunt suprascrise și datele dumneavoastră sunt oficial atomizate. Aceasta este o limitare fizică și tehnică recunoscută de agențiile de data protection din lume.</li>
            </ul>
          </PolicySection>

          <PolicySection id="c21" title="21. Securitatea Informației (IT Security - Art. 32 GDPR)">
            <p className="mb-6">Abordăm modelul de protecție <strong>Defense in Depth</strong> (Securitate în mai multe straturi), neavând deloc o mentalitate de amator, chiar dacă bugetele unui proiect independent nu sunt la nivelul corporațiilor.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-700">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2"><span className="text-blue-400">🛡️</span> Nivelul de Rețea (Network Edge)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Tot traficul global către domeniul nostru este obligat să treacă prin sistemul "bouncer-ilor" de la Vercel sau Cloudflare Edge. Aceasta blochează instant ping-urile porturilor invalide și traficul masiv din rețelele Botnet recunoscute, protejând platforma de crah-uri DDoS (Distributed Denial of Service) sau brute-force.
                </p>
              </div>

              <div className="p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-700">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2"><span className="text-blue-400">📡</span> Nivelul de Protocol (In-Transit)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Nu oferim site-ul sub standardul antic HTTP. Orice interacțiune folosește forțat HTTPS, encriptat cu certificate SSL 2048-bit folosind protocoale <strong>TLS 1.2 și TLS 1.3</strong>. Dacă sunteți pe Wi-Fi-ul liber de la Starbucks și deschideți site-ul nostru, hackerul de la masa alăturată care ascultă traficul (packet sniffing) va vedea doar "zarzavat" indescifrabil, nu parolele transmise.
                </p>
              </div>

              <div className="p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-700">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2"><span className="text-blue-400">📦</span> Nivelul de Bază de Date (At-Rest)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Discurile fizice de partiție pe care este scrisă baza de date (PostgreSQL de la Supabase) beneficiază de encripție <strong>Transparent Data Encryption (TDE)</strong>. Aceasta înseamnă că dacă cineva sparge peretele centrului de date și fură fizic unitatea hard disk SSD a serverului, nu o va putea citi pe laptopul propriu, deoarece lipsește Master Key-ul controlat din Cloud.
                </p>
              </div>

              <div className="p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-700">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2"><span className="text-blue-400">👨‍💻</span> Nivelul de Acces Administrativ (IAM)</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Implementăm <strong>Principiul Celui mai Mic Privilegiu (PoLP)</strong>. Cheile principale de bază de date nu se stochează public în cod, ci sunt injectate ca și <code>Environment Variables</code> (Variabile de Mediu secrete). Eu personal accesez arhitectura bazei de date doar prin portaluri logate cu Multi-Factor Authentication (MFA / Cod pe telefon).
                </p>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c22" title="22. Criptografia și Stocarea Parolelor">
            <InfoBox type="success">
              <p>
                <strong>Mit spulberat: „Ne-au spart hackerii și ne-au furat parolele”.</strong><br/><br/>
                Sistemele moderne, cum e cel cu care am construit Rently, fac din furtul parolelor o muncă inutilă pentru hackeri. Când dumneavoastră setați parola "PisicaMea123!" la crearea contului, funcțiile interne o trec instant de mii de ori printr-un algoritm criptografic specializat lent (ca Bycript sau Argon2).
                <br/><br/>
                Așa că în baza noastră de date, noi vom salva un Hash (o înșiruire absurdă de caractere care arată așa: <code>$2b$10$C823j...</code>). 
                <br/><br/>
                Nici noi, nici un hacker care sparge baza de date nu poate decripta "invers" acel hash pentru a afla că parola este "PisicaMea123!". Pentru a ne proteja și pe noi și pe dumneavoastră, noi pur și simplu NU v-o știm. Dacă o uitați, <strong>singura soluție matematică și tehnică pe care v-o putem oferi este Resetarea ei</strong> (înlocuirea vechiului hash cu alt hash nou, setat de dumneavoastră printr-un link unic trimis pe mail).
              </p>
            </InfoBox>
          </PolicySection>

          <PolicySection id="c23" title="23. Protocolul de Răspuns la Incidente Cibernetice (Data Breach)">
            <p className="mb-4">Oricât de masivă ar fi protecția, în lumea ciber-securității profesionale se spune mereu: <em>"Problema nu este DACĂ vei fi hackuit, ci CÂND și CUM reacționezi"</em>. Suntem asumați. Dacă descoperim sau suspectăm o scurgere, acces neautorizat, malware sau exfiltrare a bazei de date, acționăm după următorul Plan de Incident (Incident Response Plan - IRP) obligat de Art. 33/34 GDPR:</p>
            
            <div className="border border-red-200 rounded-2xl overflow-hidden mt-6 shadow-sm">
              <div className="bg-red-50 p-4 border-b border-red-200 font-bold text-red-900">
                Faza 1: Triage și Containment (Primele Ore)
              </div>
              <div className="p-5 text-sm text-slate-700 bg-white">
                Analizăm jurnalele de logare pentru a identifica "găurile" în gard, schimbăm Master Key-urile de la baza de date și blocăm ip-urile rețelei atacatoare. Izolăm sistemele corupte.
              </div>

              <div className="bg-orange-50 p-4 border-y border-orange-200 font-bold text-orange-900">
                Faza 2: Notificarea Autorității de Supraveghere (Sub 72 Ore)
              </div>
              <div className="p-5 text-sm text-slate-700 bg-white">
                Dacă stabilim clar că s-au furat date sensibile și există un risc de prejudiciu pentru utilizatori (nu doar un IP gol), redactăm și trimitem formularul oficial de alertare către departamentul de control al <strong>ANSPDCP</strong> București, fără a depăși cele 72 de ore fatidice impuse de Lege. Vom atașa primele noastre descoperiri tehnice.
              </div>

              <div className="bg-yellow-50 p-4 border-y border-yellow-200 font-bold text-yellow-900">
                Faza 3: Alarma Publică / Contactarea Persoanelor Vizate
              </div>
              <div className="p-5 text-sm text-slate-700 bg-white">
                Dacă jaful digital prezintă un <strong>„risc ridicat”</strong> pentru viețile și reputația voastră, veți primi pe e-mail o "Alertă de Securitate Critică". Nu vom ascunde gunoiul sub preș. Alerta va spune sincer ce s-a pierdut (ex: „ne-au furat baza de poze și emailuri”), va explica riscurile (ex: phishing în viitor de la cei care le-au cumpărat pe dark web) și vă va ruga cu majuscule să vă schimbați urgent parola, dacă ați avut prostul obicei de a folosi aceeași parolă la noi pe care o folosiți și pe contul dvs. bancar (lucru grav pe internet).
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c24" title="24. Cele 6 Drepturi Fundamentale („Superputerile” Dvs. Europene)">
            <p className="mb-6 text-slate-600 font-medium text-lg">
              Reglementările Europene vă echipează pe dumneavoastră cu un scut de protecție masiv. Chiar dacă noi operăm o platformă cu intrare complet gratuită, ne obligăm, sub riscul unor amenzi falimentare, să vă respectăm la virgulă aceste 6 drepturi inalienabile, aplicabile instantaneu:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition">
                <h4 className="font-black text-lg text-slate-900 mb-2">1. Dreptul de Acces (Art. 15)</h4>
                <p className="text-slate-600 text-sm">Dreptul absolut de a ne întreba: "Mă prelucrați? Ce date mai aveți despre mine pe serverele voastre?". Ne puteți cere un fișier cu toate datele la control.</p>
              </div>
              
              <div className="bg-white border-l-4 border-blue-600 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition">
                <h4 className="font-black text-lg text-slate-900 mb-2">2. Dreptul la Rectificare (Art. 16)</h4>
                <p className="text-slate-600 text-sm">Puteți modifica, sau ne puteți cere nouă să modificăm urgent în spate, orice virgulă greșită, adresă falsă sau număr de contact vechi stocat în contul sau anunțul dumneavoastră.</p>
              </div>

              <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition">
                <h4 className="font-black text-lg text-slate-900 mb-2">3. Dreptul la Ștergere / A fi uitat (Art. 17)</h4>
                <p className="text-slate-600 text-sm">Butonul de aur. Dreptul ca, în lipsa unui temei legal imperativ care să ne blocheze (cum ar fi faptul că ați înșelat pe cineva și Vă caută Poliția), să ne impuneți să vă radiem (ștergem) complet din arhiva Rently. Fără scuze.</p>
              </div>

              <div className="bg-white border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition">
                <h4 className="font-black text-lg text-slate-900 mb-2">4. Dreptul la Restricționare (Art. 18)</h4>
                <p className="text-slate-600 text-sm">Atunci când sunteți certat cu noi și aveți dubii cu privire la baza noastră legală de a vă ține datele, ne puteți cere să le punem "în carantină". Noi doar le vom stoca blocat, fără să mai facem nimic altceva pe ele până se rezolvă disputa.</p>
              </div>

              <div className="bg-white border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition">
                <h4 className="font-black text-lg text-slate-900 mb-2">5. Dreptul la Portabilitate (Art. 20)</h4>
                <p className="text-slate-600 text-sm">Ați scris 5 pagini despre apartament și vreți să puneți anunțul pe un alt site concurent de imobiliare, fără să stați să re-tastați tot? Ne cereți datele brute, iar noi vom scoate din baza de date profilul într-un format structurat universal "machine-readable" (ex. format fișier JSON/CSV) ca dvs. să îl transferați mai departe ușor.</p>
              </div>

              <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition">
                <h4 className="font-black text-lg text-slate-900 mb-2">6. Dreptul la Opoziție și Retragere (Art. 21 / Art. 7)</h4>
                <p className="text-slate-600 text-sm">Pentru tot ce v-am solicitat prin <strong>consimțământ</strong> (gen cookies, alerte SMS, marketing, orientare), vă puteți răzgândi absolut oricând, din 2-3 clickuri, la fel de ușor cum ați bifat acordul la început. Sistemul nostru va reacționa instant și nu vom riposta legal, este dreptul dumneavoastră.</p>
              </div>
            </div>
          </PolicySection>

          <PolicySection id="c25" title="25. Procedura DSAR (Data Subject Access Request - Cum ne contactezi legal)">
            <p className="mb-4">Cum puneți concret „în mișcare” superputerile din Capitolul anterior? Prin inițierea unei proceduri oficiale gratuite denumită DSAR (Cerere de Acces a Persoanei Vizate). Noi am eliminat birocrația și nu vă impunem formulare tipizate complexe descărcate la imprimantă cu ștampile umede.</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
              <h4 className="font-bold text-xl mb-6 border-b border-slate-200 pb-4">Service Level Agreement (Timpul nostru de rezolvare):</h4>
              <ul className="space-y-6 list-none pl-0 text-slate-700 text-sm md:text-base">
                <li className="flex gap-4 items-start">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">1</span>
                  <div>
                    <strong className="block text-slate-900 text-lg mb-1">Inițierea Cererii</strong>
                    <p>Către cine? Scrieți simplu, direct pe e-mail către <strong className="text-blue-700 text-lg">rently.studenti@gmail.com</strong>. <br/><br/>
                    <strong className="text-red-600 uppercase tracking-widest text-xs">Atenție (Barieră critică de securitate):</strong> Nu vom procesa NICIO cerere dacă este trimisă de pe adresa <em>"bogdan444@yahoo.com"</em> și cereți ștergerea contului de pe <em>"alexandra_chirii@gmail.com"</em>. Ca să putem garanta legal că sunteți "chiar dumneavoastră", trebuie să trimiteți cererea direct din cutia de e-mail asociată contului pe care l-ați făcut la noi. Altfel ne supunem riscului ridicat ca hackeri să închidă conturi aleatorii (Social Engineering attacks).</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-slate-300 text-slate-800 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">2</span>
                  <div>
                    <strong className="block text-slate-900 text-lg mb-1">Costuri și Verificări Extra</strong>
                    <p>Conform legii, preluăm aceste eforturi de muncă <strong>fără niciun cost financiar</strong> (Gratis). Totuși, putem să percepem o "taxă tehnico-administrativă" sau să respingem efectiv cererea <em>doar</em> atunci când acțiunile sunt vădit "abuzive sau excesive" (dacă ne dați mail în fiecare vineri, din plictiseală, să vă exportăm iar datele). De asemenea, putem să mai cerem un ID/Factură neintruzivă ca să vă dăm "clearance", dacă suspectăm impostură.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="bg-slate-300 text-slate-800 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">3</span>
                  <div>
                    <strong className="block text-slate-900 text-lg mb-1">Cronometrul de O Lună (SLA)</strong>
                    <p>Ceasul începe să ticăie în secunda în care am stabilit cine sunteți. Obligația noastră europeană este să livrăm datele/soluția fără întârzieri inutile și sub presiunea unui <strong>termen general de cel mult 30 de zile calendaristice</strong> (O lună). Pentru spețe tehnice hiper-complexe (extragerea unei baze de arhive distruse cu 10,000 de mesaje), prelungim legal termenul la 2 luni, but vă înștiințăm de această problemă din prima lună.</p>
                  </div>
                </li>
              </ul>
            </div>
          </PolicySection>

          <PolicySection id="c26" title="26. Colaborarea cu Autoritățile de Aplicare a Legii (LEA)">
            <InfoBox type="danger">
              <h4 className="font-black text-lg mb-2">Transparență judiciară absolută</h4>
              <p className="mb-0">
                Internetul și mai ales platformele din domeniul imobiliar atrag uneori comportamente infracționale, rețele mafiote de scammeri sau fenomene de spălare de fonduri / cyber-crimes. Protecția datelor personale <strong>NU</strong> vă va oferi o perdea sau un scut legal pentru ascunderea infracțiunilor. 
                <br/><br/>
                În prezența unui temei oficial, documentat și valabil juridic (cum ar fi Ordonanțe emise de Procurori, mandate de percheziție informatică de la <strong>D.I.I.C.O.T., Direcția Generală de Poliție, Oficiul Național de Prevenire a Criminalității (ONPCSB) sau Interpol</strong>), vom proceda la un "Data Dump" total, furnizându-le totul din baza de date pentru utilizatorii anchetați (toate log-urile de IP, toată istoria logărilor din ultimele x luni, toate mesajele necriptate din chat-ul privat intern și numerele de contact).
                <br/><br/>
                Totuși, ca principiu democratic, <strong>VOM REFUZA</strong> orice fel de „cerere pe mail în alb” abuzivă, care e făcută de un „prieten polițist ne-oficial” sau are atribute de "pescuire generală a datelor" fără acoperirea clară a unui act emis de un magistrat sau ofițer legal autorizat. Luăm apărarea utilizatorilor cinstiți.
              </p>
            </InfoBox>
          </PolicySection>

          <PolicySection id="c27" title="27. Protecția Specifică a Minorilor (Sub 18 ani)">
            <p className="mb-4">
              Semnarea unor contracte de coabitare (împărțirea unor chirii), a unor contracte de comodat cu un proprietar și angajarea răspunderii financiare pe chirii de sute de euro reprezintă acțiuni care depășesc simpla gestiune zilnică; ele necesită, prin esența reglementărilor din Codul Civil al României, dobândirea prealabilă a capacității de exercițiu depline. 
            </p>
            <p className="mb-4 font-bold text-slate-800">
              Coroborând acest fapt de mai sus cu Art. 8 din Regulamentul GDPR: Platforma Rently interzice strict și absolut crearea de conturi și operarea de către persoanele fizice sub limita vârstei de 18 ani. Noi nu urmărim, nu targetăm cu reclame și nu proiectăm interfețe tehnice de gamificare care să atragă copiii. 
            </p>
            <div className="p-5 border-l-4 border-red-500 bg-white shadow-sm mt-4">
              <strong className="text-red-700 block mb-2">Procedura de ștergere automată (Minor Ban):</strong>
              <p className="text-sm text-slate-600 m-0">
                În cazul în care descoperim algoritmic, sau suntem notificați cu probe din partea unui părinte (sau ocrotitor legal) că un utilizator a omis intenționat sau a falsificat bariera de vârstă la înregistrare deținând un cont activ pe o vârstă de (ex: 15 ani), vom proceda <strong>FĂRĂ PREAVIZ</strong> la dezactivarea imediată, urmată de o radiere tehnică de tip "Purge" (ștergere ireversibilă, imposibil de recuperat din orice arhivă backup a noastră) a oricăror date asociate minorului.
              </p>
            </div>
          </PolicySection>

          <PolicySection id="c28" title="28. Guvernanța Cookie-urilor (ePrivacy Act)">
            <p className="mb-6">Când accesați pe domeniul web `Rently.ro`, este posibil să salvăm fragmente de fișiere subțiri (texte) sau cod direct în inima browser-ului pe care îl folosiți (pe hard disk-ul propriu), denumite generic Cookies sau „Local Storage / Local Session”. Funcțiile, justificarea logică și temeiul de reglementare în Europa a lor le detaliem astfel:</p>

            <div className="overflow-x-auto shadow-sm border border-slate-200 rounded-2xl mb-6">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="p-4 border-b font-bold">Natura Arhitecturii</th>
                    <th className="p-4 border-b font-bold w-1/2">Scenarii și Exemplificări de Funcționalitate</th>
                    <th className="p-4 border-b font-bold">Temeiul Aprobării</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-4"><span className="bg-red-100 text-red-800 px-3 py-1 rounded font-bold text-xs">Strict Necesare (Vitale)</span></td>
                    <td className="p-4 text-slate-600 leading-relaxed">„Fără de care site-ul devine paralizat total”. Aici se încadrează cookie-urile noastre interne care rețin Token-ul de Autentificare ("v-ați logat cu succes pe o parolă validă"). Dacă v-am lăsa să blocați aceste cookie-uri necesare de sesiune, fiecare pagină pe care ați vizita-o sau fiecare chat deschis din site v-ar arunca afară din sistem cerându-vă constant să introduceți emailul și parola din 5 în 5 secunde. De asemenea, protecția la spargerea formularelor cu viruși prin formulare "CRSF", precum și ținerea minte a faptului că ați refuzat alte categorii din bannerul de Cookies se scriu în acest strat protejat.</td>
                    <td className="p-4 font-bold text-slate-900 text-center bg-slate-50"><span className="whitespace-nowrap">Excepție absolută de la</span><br/>Consimțământ</td>
                  </tr>
                  <tr>
                    <td className="p-4"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-bold text-xs">Analiză Performanță</span></td>
                    <td className="p-4 text-slate-600 leading-relaxed">Noi activăm instrumente analitice precum Google Analytics 4 (GA4) – Doar pe IP Anonimizat – ca să vedem grafice statistice în spate și ce pagină „pică/merge greu”, pentru a îmbunătății tehnic serverele (Ex: "sunt prea puțini pe Android, prea mulți intră pe iOS Apple", "14 oameni au ajuns la ultima etapă și au închis aplicația aici din cauză că poza asta e neclară").</td>
                    <td className="p-4 font-bold text-blue-600 text-center"><span className="text-xl block mb-1">✋</span> Consimțământ Voluntar Prealabil (OPT-IN)</td>
                  </tr>
                  <tr>
                    <td className="p-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold text-xs">Targetare și Reclame</span></td>
                    <td className="p-4 text-slate-600 leading-relaxed">În cazul de marketing digital, ne aliem cu firme publicitare de rețea. Exemplu clasic: Ați dat acceptul și Cookie-ul pus de <code>Meta Pixel/Facebook</code> intră în contact cu dumneavoastră pe site-ul nostru, iar el citește codul intern. Peste o lună, când navigați liniștit pe feed-ul de la Instagram, Facebook vă detectează ca utilizator care anterior căuta colegi de apartament și, ghiciți ce, vă va afișa într-un Ad precis și elegant reclamele proiectului nostru independent "Vino pe Rently!". Noi îi plătim lui Meta pentru eficiență, iar dvs beneficiați de publicitate personalizată targetată la milimetru, în detrimentul publicității banale ("Mărci de ciocolată").</td>
                    <td className="p-4 font-bold text-green-600 text-center"><span className="text-xl block mb-1">✋</span> Consimțământ Voluntar Prealabil (OPT-IN)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-bold text-slate-800 text-sm bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between">
              Aveți acces total să comutați On/Off aceste decizii de cookie folosind oricând hub-ul dedicat de privacy accesând linkul: 
              <Link href="/setari-cookies" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm ml-4 whitespace-nowrap">Gestionare Setări Cookies &rarr;</Link>
            </p>
          </PolicySection>

          <PolicySection id="c29" title="29. Revizuiri și Versionarea Prezentului Document">
            <p className="mb-4">
              În spațiul tehnologic modern și agil (Agile Tech), schimbările, actualizările și implementările de noi feature-uri pe platformă se întâmplă uneori chiar și de două-trei ori pe săptămână. Această efervescență atrage obligativitatea revizuirii acestui Document Juridic. Având în vedere acest fapt, ne rezervăm legal și ferm dreptul suveran de a introduce adăugiri sau ștergeri de clauze, având următorul mod de punere în executare:
            </p>
            <ul className="list-disc pl-5 space-y-4 text-slate-700">
              <li>
                <strong>Pentru Revizuirile Naturale / Administrative:</strong> Corectări și îndreptări ale erorilor de sintaxă sau tehnoredactare ortografică, restilizarea UI-ului în care apare textul sau simple reformulări lexicale care explică mai frumos un concept tehnic (ex. cum explicăm un server proxy de cloud) <em>care nu alterează absolut cu nimic fondul și materia</em> modului în care noi "jucăm" și lucrăm cu datele d-voastră. Aici nu ne obosim să vă umplem casuța cu un email spam. Va intra in vigoare pur și simplu odată cu actualizarea numărului "Versiune Document" și "Ultima Revizuire" din colțul stânga sus al preambulului (din Header-ul masiv al acestei pagini). Continua accesare echivalează cu acceptul dumneavoastră tacit a citirii formelor noi și corecte.
              </li>
              <li>
                <strong>Pentru Revizuiri Materiale Critice de Fond (The Big Updates):</strong> Schimbăm drastic regulile de bază ale ecosistemului. Exemplu: de mâine introducem oficial modelul comercial plătitor (Vă rugăm să introduceți procesatorul de plați X), sau prelucrăm o analiză biometrică nouă extrem de radicală. <strong>Pentru aceste shift-uri masive din privacy, Vă vom notifica explicit printr-o campanie generală trimisă direct în mesageria dumneavoastră privată și sub formatul unui "Pop-up Blocking Modal Alert" masiv direct pe pagina principală (Dashboard).</strong> Nu vom proceda fără ca d-voastră să înțelegeți, și vom oferi desigur tot timpul necesar (de exemplu un avans generos de preaviz juridic de 15, sau 30 zile calendaristice). Neacceptarea voastră liberă și suverană pe viitor va bloca legal siteul spre funcționare optimă din acel punct, singurul lucru pe care o să puteți opta fiind distrugerea curată a relației noastre tehnice (acționarea butonului Delete Account - "Stergeți Contul").
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="c30" title="30. Contact DPO, Reprezentanți și Organul Director (Plângeri către ANSPDCP)" defaultOpen={true}>
            <p className="mb-6 text-lg text-slate-600 font-light">
              Pentru a evita formalismul excesiv care plin de obstacole birocratice specifice structurilor corporatiste statale sau companiilor arogante „Mărimea Fortune 500”, am eliminat toți roboții de răspuns automat (Boții text). Orice întrebare trimisă referitoare la privacy ajunge direct pe masa de lucru a dezvoltatorului independent principal.
            </p>
            
            <div className="flex flex-col xl:flex-row gap-8">
              
              {/* CONTACT INTERN */}
              <div className="flex-1 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-500 hover:-translate-y-1">
                <h4 className="font-black text-xl mb-4 text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="text-blue-600">🛡️</span> Punct de Contact Unic
                </h4>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">Toate problemele critice despre scurgerea și modificările de stocare, sau plângerile legate de alte conturi necorespunzătoare ce încalcă principiile securității trebuie direcționate folosind calea canalului criptat și monitorizat direct de mai jos:</p>
                
                <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner group transition-all">
                  <span className="text-4xl">📧</span>
                  <div className="w-full overflow-hidden">
                    <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Trimite-ne un e-mail către DPO la</span>
                    <a href="mailto:rently.studenti@gmail.com" className="text-white font-black hover:text-blue-400 transition-colors text-2xl md:text-3xl break-all relative">
                      rently.studenti@gmail.com
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                    </a>
                  </div>
                </div>
                <p className="mt-6 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                  Target Response Time (TRT): În mod obișnuit răspundem și preluăm un caz activ complex sub &lt; 24-48 ore lucrătoare (în mediul de stat).
                </p>
              </div>

              {/* CONTACT EXTERN - ANSPDCP */}
              <div className="flex-1 bg-[#020617] text-white border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <h4 className="font-black text-xl mb-4 flex items-center gap-3 relative z-10 border-b border-slate-700/80 pb-3">
                  <span className="text-3xl">🏛️</span> Instanța Națională Supremă (A.N.S.P.D.C.P.)
                </h4>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed relative z-10 font-medium">
                  Suntem absolut convinși că putem gestiona în mod privat, amiabil și tehnic impecabil o problemă ridicată de dumneavoastră cu site-ul nostru, și ne onorează profund dacă ne acordați acest pas de bună încredere de a ne lăsa direct să remediem un eventual bug de cod sau incident procedural greșit semnalat de dumneavoastră mai sus prin mail.<br/><br/>
                  Însă, conform legislației supreme aplicabile în spațiul democrației din UE, sunteți informat și notificat că **aveți în permanență garantat juridic inalienabil și oprit un drept incontestabil să ne adresați și să ne faceți la rândul d-voastră pe noi o plângere sau petiție detaliată direct Oficiului/Autorității Publice superioare care să ne analizeze și să ne controleze serverele**.
                </p>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm relative z-10 hover:bg-white/10 transition-colors">
                  <p className="font-black text-white mb-4 text-sm leading-tight tracking-wide border-b border-white/10 pb-3">
                    Autoritatea Naţională de Supraveghere a Prelucrării Datelor cu Caracter Personal 
                    <span className="block text-blue-400 mt-1 uppercase text-xs font-mono">/ Sector ROMÂNIA</span>
                  </p>
                  <ul className="text-sm text-slate-300 space-y-3 font-mono">
                    <li className="flex items-start gap-3">
                      <strong className="text-white min-w-[70px] uppercase tracking-wider text-[10px] mt-1">Sediul:</strong> 
                      <span>B-dul G-ral. Gheorghe Magheru 28-30<br/>Sector 1, Cod Poștal 010336, București</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <strong className="text-white min-w-[70px] uppercase tracking-wider text-[10px]">Portal Web:</strong> 
                      <a href="https://www.dataprotection.ro" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white font-bold transition-colors">
                        www.dataprotection.ro
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <strong className="text-white min-w-[70px] uppercase tracking-wider text-[10px]">Email Central:</strong> 
                      <span className="text-slate-200">anspdcp@dataprotection.ro</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </PolicySection>

        </div>
      </main>

      <Footer />
    </div>
  );
}