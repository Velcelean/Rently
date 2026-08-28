"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Componentă vizuală pentru reguli (Bife vs X-uri)
const RuleCard = ({ isAllowed, title, desc }: { isAllowed: boolean, title: string, desc: string }) => (
  <div className={`p-5 rounded-2xl border ${isAllowed ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} flex gap-4 items-start`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold ${isAllowed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
      {isAllowed ? '✓' : '✕'}
    </div>
    <div>
      <h4 className={`font-bold mb-1 ${isAllowed ? 'text-emerald-900' : 'text-rose-900'}`}>{title}</h4>
      <p className={`text-sm m-0 ${isAllowed ? 'text-emerald-800' : 'text-rose-800'}`}>{desc}</p>
    </div>
  </div>
);

export default function InchiriazaOCameraPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HERO SECTION - ELEGANT DARK */}
      <div className="bg-[#0f172a] text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-black text-amber-300 uppercase tracking-widest mb-6 backdrop-blur-md">
            Ghidul Proprietarului
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white max-w-4xl leading-tight">
            Închiriază o cameră <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">
              din locuința ta.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Află cum poți genera un venit suplimentar legal, inteligent și sigur, închiriind spațiul pe care nu îl folosești.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col lg:flex-row gap-12 relative -mt-12">
        
        {/* CONȚINUTUL PRINCIPAL (Articolul) */}
        <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 lg:p-14 rounded-[2.5rem] shadow-xl border border-slate-200 z-10">
          
          <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed border-l-4 border-amber-400 pl-6">
            Dacă ai o cameră liberă care stă nefolosită în timp ce costul vieții continuă să crească, poți obține un venit suplimentar considerabil. În acest ghid, îți explicăm simplu și la obiect cum funcționează legal închirierea unei camere în România.
          </p>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-6">Pe scurt: Ce trebuie să știi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition duration-300">
              <span className="text-2xl mt-1">📝</span>
              <p className="text-sm font-medium text-slate-700 m-0">Poți închiria legal o cameră din locuința ta (fie că este proprietate personală sau o chirie pe care o împarți).</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition duration-300">
              <span className="text-2xl mt-1">🏦</span>
              <p className="text-sm font-medium text-slate-700 m-0">Veniturile din chirii se impozitează. Există un impozit pe venit de 10% cu deduceri aplicabile.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition duration-300">
              <span className="text-2xl mt-1">🤝</span>
              <p className="text-sm font-medium text-slate-700 m-0">Dacă ești deja chiriaș, ai nevoie de acordul scris al proprietarului tău pentru a putea subînchiria o cameră.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition duration-300">
              <span className="text-2xl mt-1">⏱️</span>
              <p className="text-sm font-medium text-slate-700 m-0">Contractul de închiriere trebuie înregistrat la ANAF (online) în termen de maxim 30 de zile.</p>
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-6">Pentru cine este potrivit?</h2>
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl shrink-0">🔑</div>
              <div>
                <strong className="text-slate-900 block">Ești Proprietar</strong>
                <span className="text-slate-600 text-sm">Ai o cameră liberă (copiii au plecat la facultate, de exemplu) pe care o poți oferi unui coleg de apartament.</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xl shrink-0">👥</div>
              <div>
                <strong className="text-slate-900 block">Ești Chiriaș (Subînchiriere)</strong>
                <span className="text-slate-600 text-sm">Ai o locuință mare și vrei să aduci un coleg pentru a împărți costurile (necesită modificarea contractului cu proprietarul).</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-xl shrink-0">💡</div>
              <div>
                <strong className="text-slate-900 block">Vrei să reduci costul facturilor</strong>
                <span className="text-slate-600 text-sm">Împărțirea costurilor uriașe la utilități (gaz, curent, internet) pe timp de iarnă îți relaxează bugetul.</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-6">Cerințe și Reguli Absolute</h2>
          <p className="text-slate-600 mb-6">Ești eligibil să închiriezi o cameră doar dacă respecți cadrul legal și de bun simț:</p>
          
          <div className="grid grid-cols-1 gap-4 mb-10">
            <RuleCard 
              isAllowed={true} 
              title="Locuință Activă" 
              desc="Spațiul oferit este destinat locuirii (este un dormitor real), nu un spațiu comercial, debara sau birou improvizat."
            />
            <RuleCard 
              isAllowed={true} 
              title="Locuire Comună" 
              desc="Tu locuiești efectiv în aceeași proprietate în timp ce închiriezi camera respectivă."
            />
            <RuleCard 
              isAllowed={true} 
              title="Acces la Utilități" 
              desc="Asiguri accesul neîngrădit la spațiile comune esențiale pentru un trai decent (baie, bucătărie funcțională)."
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-black text-rose-600 uppercase tracking-widest mb-4 ml-2">Ce NU se califică?</h3>
              <div className="space-y-4">
                <RuleCard 
                  isAllowed={false} 
                  title="Proprietăți Separate" 
                  desc="Apartamentele complet separate de locuința ta (ex: ai o garsonieră la etajul 2 și tu stai la etajul 4) se supun regulilor clasice de închiriere integrală, nu conceptului de Rently/Flatshare."
                />
                <RuleCard 
                  isAllowed={false} 
                  title="Regim Hotelier (Airbnb)" 
                  desc="Închirierea cu ziua/ora necesită certificate de clasificare turistică de la Ministerul Turismului. Rently este strict pentru locuire rezidențială (luni/ani)."
                />
              </div>
            </div>
          </div>

          <div className="bg-[#020617] rounded-[2rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-2xl md:text-3xl font-black mb-6 relative z-10 flex items-center gap-3">
              <span>📊</span> Cum funcționează taxele (ANAF)?
            </h2>
            <p className="text-slate-300 font-medium mb-6 relative z-10">
              În România, orice venit din cedarea folosinței bunurilor (inclusiv a unei singure camere) trebuie declarat. Legislația recentă a simplificat procesul:
            </p>
            
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-blue-400 mt-1">✍️</div>
                <p className="text-sm text-slate-200 m-0">Ai obligația de a încheia un contract de închiriere în scris cu viitorul tău coleg.</p>
              </li>
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-blue-400 mt-1">💻</div>
                <p className="text-sm text-slate-200 m-0">Trebuie să înregistrezi contractul la ANAF (online, prin Spațiul Privat Virtual - SPV) în <strong>maxim 30 de zile</strong> de la semnare.</p>
              </li>
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-blue-400 mt-1">💰</div>
                <p className="text-sm text-slate-200 m-0">Impozitul pe venit este de <strong>10%</strong>. Vestea bună: se aplică automat o cotă forfetară de cheltuieli de 20%, ceea ce înseamnă că practic <strong>plătești 8%</strong> din valoarea brută a chiriei.</p>
              </li>
              <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-blue-400 mt-1">🏥</div>
                <p className="text-sm text-slate-200 m-0">Doar dacă veniturile tale totale anuale (din chirii + alte surse extra) depășesc plafoanele legale de 6, 12 sau 24 de salarii minime pe economie, vei datora și Contribuția la Sănătate (CASS).</p>
              </li>
            </ul>
            <p className="text-xs text-slate-500 mt-6 italic relative z-10">*Consultați mereu un contabil sau site-ul oficial ANAF pentru cele mai recente actualizări ale Codului Fiscal.</p>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">Concluzie</h2>
          <p className="text-lg text-slate-600 mb-4 leading-relaxed">
            Închirierea unei camere libere din propria locuință este una dintre cele mai simple și sigure modalități prin care poți câștiga bani, fără a deveni un „mogul imobiliar” cu zeci de proprietăți de gestionat.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Secretul succesului nu stă în contracte, ci în <strong>găsirea persoanei potrivite</strong>. Să fii confortabil sub același acoperiș este esențial. Exact aici intervine Rently: creează un anunț gratuit și noi te punem în legătură doar cu oameni care au un stil de viață compatibil cu al tău.
          </p>

        </div>

        {/* MENIUL LATERAL (SIDEBAR) */}
        <aside className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 h-fit">
          
          {/* Card Acțiune Principală */}
          <div className="bg-amber-400 p-8 rounded-[2rem] shadow-xl relative overflow-hidden text-amber-950">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            
            <h3 className="font-black text-2xl mb-3 relative z-10">Ai o cameră liberă?</h3>
            <p className="text-sm text-amber-900/80 mb-8 font-medium leading-relaxed relative z-10">Mii de studenți și tineri profesioniști caută o cameră pe Rently chiar acum. Fără agenții. Fără comisioane.</p>
            
            <div className="space-y-4 relative z-10">
              <Link href="/add-listing" className="flex items-center justify-center gap-3 w-full bg-amber-950 hover:bg-black text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5">
                <span className="text-xl">🏠</span> Postează Anunțul Tău
              </Link>
            </div>
          </div>

          {/* Card Alte resurse */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-4">Alte Resurse</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/de-ce-sa-imparti-chiria" className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 font-bold transition-colors p-3 hover:bg-slate-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center text-lg transition-colors">📘</div>
                  Ghid: De ce să împarți chiria?
                </Link>
              </li>
              <li>
                <a href="mailto:contact@Rently.ro" className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 font-bold transition-colors p-3 hover:bg-slate-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center text-lg transition-colors">✉️</div>
                  Contactează Suportul
                </a>
              </li>
            </ul>
          </div>

        </aside>

      </main>

      <Footer />
    </div>
  );
}