"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Componente UI
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

const ExampleBox = ({ type, title, text }: { type: 'good' | 'bad', title: string, text: string }) => (
  <div className={`p-5 rounded-2xl border ${type === 'good' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'} flex items-start gap-4 my-4`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-white ${type === 'good' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
      {type === 'good' ? '✓' : '✕'}
    </div>
    <div>
      <h4 className={`m-0 mb-1 font-bold ${type === 'good' ? 'text-emerald-900' : 'text-rose-900'}`}>{title}</h4>
      <p className={`m-0 text-sm md:text-base leading-relaxed ${type === 'good' ? 'text-emerald-800' : 'text-rose-800'}`}>„{text}”</p>
    </div>
  </div>
);

export default function DiscriminationPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HERO SECTION */}
      <div className="bg-[#020617] text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-rose-600/20 via-blue-600/10 to-transparent rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/10 to-transparent rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-xs font-black text-rose-300 uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-2xl ring-1 ring-white/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            Comunitate Deschisă & Sigură
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white max-w-4xl">
            Oportunități Egale și <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-300 to-amber-300">
              Politica Anti-Discriminare
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl leading-relaxed font-light max-w-4xl">
            Rently este un spațiu dedicat tuturor. Monitorizăm anunțurile pentru a ne asigura că respectă legislația națională și europeană. Află ce trebuie să știe proprietarii, agenții și colegii de apartament.
          </p>
        </div>
      </div>

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col xl:flex-row gap-12 relative -mt-12">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="hidden xl:block w-[22rem] shrink-0">
          <div className="sticky top-10 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
            <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4">Cuprinsul Politicii</h3>
            <nav className="space-y-1 text-[13px] font-bold h-[calc(100vh-220px)] overflow-y-auto pr-3 custom-scrollbar">
               <a href="#d1" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">1. Angajamentul Rently</a>
              <a href="#d2" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">2. Reguli pentru Proprietari / Agenți</a>
              <a href="#d3" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">3. Coabitare: Când cauți un coleg</a>
              <a href="#d4" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">4. Cum scriem un anunț corect</a>
              <a href="#d5" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">5. Câini Ghid vs. Animale de Companie</a>
              <a href="#d6" className="block px-4 py-2.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all">6. Discriminarea Financiară</a>
              <a href="#d7" className="block px-4 py-2.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all">7. Sancțiuni și Raportare</a>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="w-full xl:w-[calc(100%-25rem)] pb-32">
          
          <PolicySection id="d1" title="1. Angajamentul Rently" defaultOpen={true} icon={<span className="text-3xl">🤝</span>}>
            <p className="lead text-xl text-slate-700 mb-6 font-medium">
              Abordarea noastră depășește cerințele minime legale. Nu este vorba doar despre ceea ce este sau nu este legal în România – este vorba despre a trata oamenii așa cum ți-ai dori să fii tratat tu.
            </p>
            <p>
              Rently se angajează ferm să ofere oportunități egale. Toate anunțurile sunt filtrate de sistemele noastre și de echipa de suport pentru a ne asigura că respectă legislația privind combaterea discriminării (inclusiv O.G. 137/2000 și directivele UE). Anunțurile care conțin limbaj ofensator, restrictiv nejustificat sau discriminatoriu vor fi șterse imediat.
            </p>
          </PolicySection>

          <PolicySection id="d2" title="2. Legile pentru Proprietari și Agenți (Închirierea Integrală)" icon={<span className="text-3xl">⚖️</span>}>
            <p className="mb-4">
              Dacă ești un <strong>proprietar care nu locuiește în proprietate</strong> (non-resident landlord) sau un agent imobiliar care închiriază un apartament/o casă întreagă, regulile sunt extrem de stricte.
            </p>
            <p className="mb-4 text-slate-700 font-medium">
              Conform legislației privind egalitatea de șanse, îți este strict interzis să publici anunțuri care sugerează o preferință sau o respingere a potențialilor chiriași pe baza următoarelor caracteristici protejate legal:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0 mt-6 mb-6">
              <li className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center gap-3"><span className="text-blue-500">🔹</span> Sex sau Gen</li>
              <li className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center gap-3"><span className="text-blue-500">🔹</span> Rasă, etnie sau naționalitate</li>
              <li className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center gap-3"><span className="text-blue-500">🔹</span> Dizabilitate fizică sau mentală</li>
              <li className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center gap-3"><span className="text-blue-500">🔹</span> Religie sau credință</li>
              <li className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center gap-3"><span className="text-blue-500">🔹</span> Sarcină sau maternitate</li>
              <li className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center gap-3"><span className="text-blue-500">🔹</span> Statut familial (A avea copii)</li>
            </ul>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
              <strong className="text-red-900 block mb-1">Pe scurt:</strong>
              <p className="text-sm text-red-800 m-0">
                Nu poți refuza un chiriaș, nu poți exclude aplicanți și nu poți folosi cuvinte în anunțul tău care discriminează pe aceste criterii dacă oferi locuința integral (nu o împarți cu ei).
              </p>
            </div>
          </PolicySection>

          <PolicySection id="d3" title="3. Coabitare: Când cauți un coleg de apartament (Flatsharing)" defaultOpen={true} icon={<span className="text-3xl">🏠</span>}>
            <p className="mb-4">
              Situația este <strong>fundamental diferită</strong> atunci când tu locuiești în acea proprietate (de exemplu, cauți un coleg pentru camera liberă din apartamentul tău, sau iei pe cineva în gazdă). 
            </p>
            <p className="mb-6">
              Deoarece intimitatea spațiului de locuit este critică, legea este mai flexibilă. <strong>Ai dreptul de a avea preferințe</strong> cu privire la cine îți va fi viitorul coleg de apartament (ex: poți dori să locuiești doar cu fete, sau doar cu studenți). <strong>Excepția majoră: nici măcar la coabitare NU este permisă discriminarea pe criterii de rasă sau naționalitate.</strong>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
              <h4 className="font-bold text-blue-900 text-lg mb-3">Cum exprimăm o preferință?</h4>
              <p className="text-sm text-blue-800 m-0 leading-relaxed">
                Acolo unde preferințele sunt permise (ex: gen, stil de viață, profesie), ne așteptăm ca advertiserii de pe Rently să le exprime într-un mod <strong>pozitiv și respectuos</strong>, explicând contextul, și NU folosind un limbaj de excludere sau agresiv.
              </p>
            </div>
          </PolicySection>

          <PolicySection id="d4" title="4. Exemple: Cum scriem un anunț corect" icon={<span className="text-3xl">✍️</span>}>
            <p className="mb-6">Iată cum se aplică practic regula comunicării pozitive pe platforma noastră atunci când cauți un coleg de apartament:</p>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Exemplul 1: Genul</h4>
                <ExampleBox type="good" title="Acceptabil (Oferă context)" text="Suntem două fete în apartament, deci am prefera o a treia colegă fată pentru a păstra dinamica casei." />
                <ExampleBox type="bad" title="Inacceptabil (Excludere agresivă)" text="Bărbații să nu deranjeze. Fără băieți." />
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Exemplul 2: Stilul de Viață / Convingeri</h4>
                <ExampleBox type="good" title="Acceptabil (Stil de viață împărtășit)" text="Suntem o casă de studenți vegani/vegetarieni. Ne-ar plăcea un coleg cu același stil de viață, deoarece gătim des împreună." />
                <ExampleBox type="bad" title="Inacceptabil (Discriminare)" text="Nu acceptăm persoane care mănâncă carne. Doar creștini ortodocși." />
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Exemplul 3: Vârsta și Ocupația</h4>
                <p className="text-sm text-slate-500 mb-3">*Atenție: Vârsta nu este o caracteristică strict protejată în coabitare (ai dreptul să vrei să locuiești cu persoane de vârsta ta).</p>
                <ExampleBox type="good" title="Acceptabil" text="Suntem 2 tineri profesioniști în IT (25-30 ani). Căutăm pe cineva cu un program similar, liniștit în timpul săptămânii." />
                <ExampleBox type="bad" title="Inacceptabil" text="Fără pensionari sau persoane peste 40 de ani." />
              </div>
            </div>
          </PolicySection>

          <PolicySection id="d5" title="5. Câini Ghid vs. Animale de Companie (Pets)" icon={<span className="text-3xl">🦮</span>}>
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-6">
              <h4 className="font-bold text-amber-900 text-lg mb-2">Atenție: Câinii ghid sunt echipamente medicale, nu "animale de companie".</h4>
              <p className="text-sm text-amber-800 m-0 leading-relaxed">
                Această distincție este vitală legal. Un câine ghid (pentru nevăzători) sau un animal de asistență atestat medical este considerat o necesitate de mobilitate. Refuzul de a închiria o locuință cuiva doar pentru că folosește un câine ghid este echivalent cu refuzul de a închiria cuiva pentru că folosește un scaun cu rotile – reprezintă <strong>discriminare directă pe bază de dizabilitate</strong>.
              </p>
            </div>
            <p className="mb-4">
              <strong>Situația animalelor de companie obișnuite (Pets):</strong> 
              <br/>Ca proprietar, ai dreptul să decizi dacă accepți sau nu animale de companie clasice (pisici, câini etc.). Totuși, încurajăm deschiderea dialogului. Din ce în ce mai multe inițiative legislative europene (precum Renters' Rights) stipulează că proprietarii nu ar trebui să refuze <em>în mod nerezonabil</em> cererea unui chiriaș de a ține un animal de companie cuminte, dacă spațiul permite.
            </p>
          </PolicySection>

          <PolicySection id="d6" title="6. Venituri și Ajutoare Sociale" icon={<span className="text-3xl">💳</span>}>
            <p className="mb-4">
              Pe platforma Rently, susținem incluziunea socială. Un proprietar își dorește, pe bună dreptate, chiriași care pot plăti chiria la timp. Totuși, <strong>sursa legală a veniturilor</strong> nu ar trebui să fie un motiv de respingere automată.
            </p>
            <p className="mb-4">
              Este împotriva practicilor bune să folosiți etichete discriminatorii referitoare la sursa de venit, cum ar fi:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
              <li>„Nu acceptăm persoane care trăiesc din ajutoare sociale.”</li>
              <li>„Exclus studenți susținuți de părinți.”</li>
              <li>„Doar corporatiști / persoane cu fluturaș de salariu.”</li>
            </ul>
            <p className="mt-6 text-sm text-slate-500 italic">
              *Evaluarea bonității (capacității de plată) a chiriașului este dreptul proprietarului, dar aceasta se face în privat, în momentul discuțiilor sau semnării contractului, nu prin excluderi verbale jignitoare în textul anunțului public.
            </p>
          </PolicySection>

          <PolicySection id="d7" title="7. Raportarea Abuzurilor și Sancțiuni" icon={<span className="text-3xl">🛑</span>} defaultOpen={true}>
            <p className="mb-6">
              Rently își rezervă dreptul absolut de a interveni asupra oricărui Conținut Generat de Utilizator (UGC) care încalcă prezenta politică.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-t-4 border-blue-500 p-6 rounded-b-2xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Acțiunile noastre</h4>
                <p className="text-sm text-slate-600 m-0">Anunțurile care conțin cuvinte neclare, discriminatorii sau ofensatoare pot fi <strong>editate, ascunse din căutări sau șterse definitiv</strong> de către moderatorii noștri, fără notificare prealabilă.</p>
              </div>
              
              <div className="bg-white border-t-4 border-rose-500 p-6 rounded-b-2xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Banarea Contului</h4>
                <p className="text-sm text-slate-600 m-0">Utilizatorii care trimit constant mesaje abuzive, rasiste sau homofobe către alți membri ai comunității vor fi <strong>banați definitiv</strong>, iar adresa lor IP va fi blocată.</p>
              </div>
            </div>

            <div className="mt-8 bg-slate-900 p-8 rounded-3xl text-center shadow-lg">
              <h4 className="font-black text-white text-xl mb-4">Ajută-ne să păstrăm comunitatea curată</h4>
              <p className="text-slate-300 text-sm mb-0 max-w-2xl mx-auto">
                Dacă observi un anunț sau primești un mesaj care încalcă regulile de mai sus, te rugăm să folosești imediat butonul <strong>„Raportează”</strong> de pe profilul utilizatorului sau să ne trimiți un e-mail direct. Vom investiga problema în câteva minute.
              </p>
            </div>
          </PolicySection>

        </div>
      </main>

      <Footer />
    </div>
  );
}