"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// O componentă mică pentru a evidenția avantajele financiare/sociale în text
const BenefitCard = ({ icon, title, text, color }: { icon: string, title: string, text: string, color: 'blue' | 'emerald' | 'purple' }) => {
  const colorStyles = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border ${colorStyles[color]} my-8 shadow-sm`}>
      <div className={`w-14 h-14 shrink-0 flex items-center justify-center text-3xl bg-white rounded-xl shadow-sm border ${colorStyles[color]}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 m-0">{title}</h3>
        <p className="text-slate-700 m-0 leading-relaxed text-sm md:text-base">
          {text}
        </p>
      </div>
    </div>
  );
};

export default function DeCeSaImpartiChiriaPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HEADER-UL PAGINII */}
      <div className="bg-[#0f172a] text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-black text-blue-300 uppercase tracking-widest mb-6 backdrop-blur-md">
            Ghid Rently • Baza Cunoștințelor
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white max-w-3xl">
            Tot ce trebuie să știi despre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">împărțirea chiriei</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Un ghid complet despre viața la comun, avantajele financiare majore și modul în care poți să îți găsești colegul de apartament perfect, în siguranță.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col lg:flex-row gap-12 relative -mt-10">
        
        {/* CONȚINUTUL PRINCIPAL (Articolul) */}
        <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-xl border border-slate-200 z-10">
          
          <article className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900 leading-loose text-slate-600">
            
            <h2 className="text-3xl font-black tracking-tight mt-0">Ce înseamnă să împarți chiria (Flatsharing)?</h2>
            <p>
              Împărțirea chiriei, cunoscută internațional sub termenii de <em>flatsharing</em> sau <em>house-sharing</em>, este situația în care două sau mai multe persoane locuiesc împreună într-un apartament sau o casă. Regulile sunt simple: fiecare persoană are propriul dormitor privat (spațiul intim), în timp ce spațiile precum bucătăria, baia, holul și livingul sunt folosite la comun.
            </p>
            <p>
              În România, această practică a explodat în popularitate, extinzându-se de la clasicele orașe universitare (București, Cluj, Timișoara, Iași) la marile centre de business. Nu mai este doar „o treabă de studenți”, ci a devenit o decizie financiară extrem de inteligentă.
            </p>

            <BenefitCard 
              icon="📉"
              color="emerald"
              title="Adevăratul Motiv: Economia la Sânge"
              text="Dacă locuiești într-o garsonieră, suporți 100% din șocul pieței: chirie integrală, factură de internet de 50 de lei, întreținere și curent. Când te muți într-un apartament de 3 camere cu încă 2 colegi, chiria totală este împărțită la 3. Dar și factura de net se împarte la 3! Astfel, ajungi să locuiești într-o zonă centrală și într-un apartament mai mare cu banii cu care abia ai fi închiriat o garsonieră la marginea orașului."
            />

            <h2 className="text-3xl font-black tracking-tight">O experiență profund umană</h2>
            <p>
              Pe lângă economiile substanțiale, aspectul social este un bonus imens pe care mulți îl ignoră inițial. Marile orașe pot fi locuri singuratice, mai ales dacă te muți pentru un job nou și nu cunoști pe nimeni.
            </p>
            <p>
              Statisticile internaționale arată că marea majoritate a tinerilor profesioniști aleg să împartă chiria tocmai pentru a avea cu cine schimba o vorbă la finalul unei zile grele de muncă, pentru a împărți costul unei pizza sau pur și simplu pentru a forma un grup de prieteni cu care să iasă vineri seara. Un coleg de apartament bun devine deseori un prieten pe viață.
            </p>

            <div className="my-12 py-10 border-y border-slate-200 relative">
              <div className="absolute top-1/2 left-0 w-1 h-20 bg-blue-600 transform -translate-y-1/2 rounded-r-lg"></div>
              <p className="text-3xl font-light text-slate-800 italic leading-snug m-0 pl-6">
                „Credem cu tărie că o casă nu este doar o simplă adresă pe o hartă, ci este formată din oamenii cu care o împarți în fiecare zi.”
              </p>
            </div>

            <h2 className="text-3xl font-black tracking-tight">Cu cine vei locui?</h2>
            <p>
              Absolut oricine folosește Rently. Platforma noastră nu discriminează, iar baza noastră de date include:
            </p>
            <ul className="space-y-2 font-medium">
              <li><strong>Studenți în primul an</strong> care caută colegi cu același program haotic și chef de viață.</li>
              <li><strong>Tineri Profesioniști (Yuppies):</strong> IT-iști, medici rezidenți, arhitecți care vor liniște după ora 22:00.</li>
              <li><strong>Proprietari:</strong> Oameni care au un dormitor gol în propriul apartament și preferă să ia pe cineva în gazdă.</li>
            </ul>
            <p>
              Sistemul nostru detaliat de profiluri te ajută să scapi de anxietatea de a te muta cu un "străin". Filtrele te lasă să specifici exact ce cauți: ești alergic și vrei pe cineva fără pisică? Ești nefumător? Ai bifat. Noi conectăm stiluri de viață compatibile.
            </p>

            <BenefitCard 
              icon="🛡️"
              color="blue"
              title="Dar riscurile? Siguranța pe Rently"
              text="La fel ca în orice interacțiune interumană, există mici riscuri. Însă noi am construit Rently tocmai pentru a anula haosul grupurilor de Facebook. Pe Rently, ai un profil clar, poți vedea link-uri către social media (Instagram/Facebook) pentru a confirma identitatea persoanei. Nu îți publicăm numărul de telefon și ai la dispoziție mesageria noastră internă pentru a face 'filtrarea' la rece înainte să vă întâlniți."
            />

            <h2 className="text-3xl font-black tracking-tight">Sunt proprietar. Pot lua pe cineva în gazdă?</h2>
            <p>
              Absolut! De fapt, acesta este sectorul cu cea mai mare creștere în piața imobiliară globală. Având în vedere inflația și creșterea uriașă a ratelor bancare (ROBOR/IRCC), închirierea dormitorului tău liber (sau a camerei copilului plecat la facultate) reprezintă o injecție financiară uriașă în bugetul casei.
            </p>
            <p>
              Mai mult, din perspectiva viitorului tău coleg de apartament (chiriașul tău), el beneficiază de un apartament de obicei mult mai bine dotat și îngrijit (pentru că locuiești tu în el), adesea sub prețul pieței. Este un contract de tip Win-Win (câștig pentru ambele părți).
            </p>

          </article>
        </div>

        {/* MENIUL LATERAL (SIDEBAR) */}
        <aside className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 h-fit">
          
          {/* Card Acțiune Principală */}
          <div className="bg-[#0f172a] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl"></div>
            
            <h3 className="font-black text-2xl mb-3 relative z-10">Gata să faci pasul?</h3>
            <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed relative z-10">Mii de camere libere și colegi de apartament mișto te așteaptă chiar acum pe platformă. Fără comision.</p>
            
            <div className="space-y-4 relative z-10">
              <Link href="/anunturi" className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
                <span className="text-xl">🔍</span> Caută o cameră
              </Link>
              <Link href="/add-listing" className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 px-6 rounded-xl transition-all backdrop-blur-sm hover:-translate-y-0.5">
                <span className="text-xl">🏠</span> Ofer o cameră
              </Link>
            </div>
          </div>

          {/* Card Ajutor / FAQ */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-4">Ai nevoie de ajutor?</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 font-bold transition-colors p-3 hover:bg-blue-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center text-lg transition-colors">❓</div>
                  Întrebări Frecvente (FAQ)
                </Link>
              </li>
              <li>
                <a href="mailto:contact@Rently.ro" className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 font-bold transition-colors p-3 hover:bg-blue-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center text-lg transition-colors">✉️</div>
                  Scrie-ne pe E-mail
                </a>
              </li>
            </ul>
          </div>

          {/* Mini-Banner Trust */}
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-start gap-4">
            <span className="text-3xl">🛡️</span>
            <div>
              <strong className="block text-emerald-900 mb-1">Siguranță Garantată</strong>
              <p className="text-xs text-emerald-800 m-0 leading-relaxed font-medium">Toate conturile sunt monitorizate, iar spam-ul este raportat și blocat de sistemele noastre anti-fraudă.</p>
            </div>
          </div>

        </aside>

      </main>

      <Footer />
    </div>
  );
}