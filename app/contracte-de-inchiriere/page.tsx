"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Componentă vizuală pentru tipurile de contracte
const ContractCard = ({ icon, title, type, children, colorClass }: { icon: string, title: string, type: string, children: React.ReactNode, colorClass: string }) => (
  <div className={`p-6 md:p-8 rounded-[2rem] border shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${colorClass}`}>
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-xs font-black uppercase tracking-widest opacity-70 block mb-1">{type}</span>
        <h3 className="text-xl md:text-2xl font-black m-0 leading-tight">{title}</h3>
      </div>
    </div>
    <div className="text-sm md:text-base leading-relaxed opacity-90 relative z-10">
      {children}
    </div>
  </div>
);

// Componentă pentru avertismente/sfaturi
const AlertBox = ({ icon, title, text, type = "warning" }: { icon: string, title: string, text: React.ReactNode, type?: "warning" | "info" | "danger" }) => {
  const styles = {
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    danger: "bg-red-50 border-red-200 text-red-900",
  };
  return (
    <div className={`flex flex-col sm:flex-row gap-4 p-6 rounded-2xl border ${styles[type]} shadow-sm my-8`}>
      <span className="text-3xl shrink-0 leading-none">{icon}</span>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="m-0 text-sm md:text-base opacity-90 leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default function ContracteInchirierePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HERO SECTION - MODERN DARK */}
      <div className="bg-[#0f172a] text-white pt-32 pb-24 relative overflow-hidden">
        {/* Efecte de fundal */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-black text-indigo-300 uppercase tracking-widest mb-6 backdrop-blur-md">
            Ghid Juridic Rently
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white max-w-4xl leading-tight">
            Ghidul complet al <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-400">
              contractelor de închiriere.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Află ce tip de contract ți se potrivește, cum să te protejezi legal și cum să eviți litigiile atunci când împarți sau oferi o locuință.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col lg:flex-row gap-12 relative -mt-12">
        
        {/* CONȚINUTUL PRINCIPAL (Articolul) */}
        <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 lg:p-14 rounded-[2.5rem] shadow-xl border border-slate-200 z-10">
          
          <article className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900 leading-loose text-slate-600">
            
            <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed border-l-4 border-indigo-500 pl-6">
              O strângere de mână și o promisiune verbală nu țin loc de garanție în fața legii. Indiferent dacă oferi o garsonieră, subînchiriezi o cameră colegului tău sau iei pe cineva în gazdă, redactarea unui acord scris este un pas absolut obligatoriu.
            </p>

            <h2 className="text-3xl font-black tracking-tight mt-0 mb-8">Alege tipul corect de contract</h2>
            <p className="mb-6">
              Piața imobiliară și fenomenul de <em>flatsharing</em> (împărțirea apartamentelor) necesită abordări diferite în funcție de cine deține spațiul și cum este el folosit. Iată cele 3 scenarii majore:
            </p>

            <div className="space-y-6 mb-12">
              <ContractCard 
                icon="📄" 
                type="Cel mai comun" 
                title="Contractul Standard de Locațiune" 
                colorClass="bg-blue-50 border-blue-100 text-blue-900"
              >
                <p className="mb-3">Se folosește atunci când proprietarul de drept închiriază o locuință (garsonieră, apartament, casă) integral către unul sau mai mulți chiriași. Este contractul clasic care oferă chiriașului dreptul <strong>exclusiv</strong> de folosință.</p>
                <ul className="list-disc pl-5 space-y-1 font-medium">
                  <li>Trebuie redactat și semnat în scris (fizic sau cu semnătură electronică validă).</li>
                  <li>Poate fi pe perioadă determinată (ex: 12 luni) sau nedeterminată.</li>
                  <li>Poate fi autentificat la Notar (oferă putere executorie pentru evacuare/plată) sau semnat sub semnătură privată.</li>
                </ul>
              </ContractCard>

              <ContractCard 
                icon="🤝" 
                type="Pentru Colegi de Apartament" 
                title="Contractul de Subînchiriere" 
                colorClass="bg-indigo-50 border-indigo-100 text-indigo-900"
              >
                <p className="mb-3">Ești deja chiriaș într-un apartament cu 3 camere, unul pleacă și vrei să aduci un alt coleg de apartament (flatmate) pentru a împărți costurile? Folosești contractul de subînchiriere.</p>
                <AlertBox 
                  type="danger"
                  icon="🛑"
                  title="Avertisment Legal Critic:"
                  text={<>Conform Codului Civil Român, subînchirierea este permisă <strong>DOAR DACĂ</strong> proprietarul principal ți-a acordat acest drept în mod explicit, în scris, în contractul tău inițial. Dacă subînchiriezi fără acordul proprietarului, acesta are dreptul de a rezilia contractul și de a vă evacua imediat pe toți.</>}
                />
              </ContractCard>

              <ContractCard 
                icon="🏠" 
                type="Pentru Proprietari" 
                title="Înțelegerea pentru o cameră (În Gazdă)" 
                colorClass="bg-emerald-50 border-emerald-100 text-emerald-900"
              >
                <p className="mb-3">Se folosește atunci când tu ești proprietarul, locuiești în apartament și oferi doar o cameră (un dormitor) spre închiriere unui <em>lodger</em> (persoană luată în gazdă). Veți împărți baia, bucătăria și livingul.</p>
                <p className="font-medium m-0">Deși este o situație mai informală, un contract scris este vital pentru a stabili clar regulile casei, împărțirea facturilor la utilități, accesul la zonele comune și termenul de preaviz.</p>
              </ContractCard>
            </div>

            <h2 className="text-3xl font-black tracking-tight mb-6">Obligația înregistrării la ANAF</h2>
            <AlertBox 
              type="info"
              icon="🏛️"
              title="Atenție la Termenele Fiscale!"
              text={<>Începând cu 1 ianuarie 2023, înregistrarea contractelor de închiriere la ANAF a redevenit <strong>obligatorie</strong>. Proprietarul are obligația de a înregistra contractul (și orice act adițional) în termen de maxim <strong>30 de zile</strong> de la încheierea acestuia. Acest lucru se poate face exclusiv online, prin Spațiul Privat Virtual (SPV), completând Formularul 168. Impozitul pe venitul din chirii se reține la sursă sau se declară prin Declarația Unică.</>}
            />

            <h2 className="text-3xl font-black tracking-tight mb-6 mt-12">Marele Secret: Procesul Verbal și Inventarul</h2>
            <p className="mb-4">
              În 90% din cazuri, disputele dintre proprietari și chiriași apar la finalul contractului, din cauza reținerii Garanției (Deposit). Proprietarul susține că s-a distrus ceva, chiriașul susține că acel defect exista din prima zi. Cum se rezolvă? Prin <strong>Inventar</strong>.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl mt-6">
              <h3 className="font-bold text-slate-900 text-xl mb-4 mt-0">Cum să faci un Proces Verbal blindat:</h3>
              <ol className="list-decimal pl-5 space-y-3 text-slate-700">
                <li><strong>Listează totul:</strong> Notează starea mobilierului, a electrocasnicelor, curățenia pereților și a parchetului. Nu folosi doar cuvinte generale precum „stare bună”. Notează: „Zgârietură de 5cm pe ușa de la intrare”.</li>
                <li><strong>Contoarele:</strong> Notează indexul exact de la curent, gaz și apă în secunda predării cheilor. Trece aceste cifre în procesul verbal.</li>
                <li><strong>Fotografii (Dovada Supremă):</strong> În ziua mutării, faceți poze clare sau un videoclip la absolut toate camerele, în special la posibilele defecte deja existente. Trimiteți-le pe email ambelor părți în aceeași zi, pentru a avea o dovadă cu <em>dată certă (timestamp)</em>.</li>
                <li><strong>Semnături:</strong> Ambii (proprietar și chiriaș) trebuie să semneze inventarul și să păstreze o copie originală.</li>
              </ol>
            </div>

          </article>
        </div>

        {/* MENIUL LATERAL (SIDEBAR) */}
        <aside className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 h-fit">
          
          {/* Card Acțiune Principală */}
          <div className="bg-[#0f172a] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden text-white">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/30 rounded-full blur-2xl"></div>
            
            <h3 className="font-black text-2xl mb-3 relative z-10">Ai locuința pregătită?</h3>
            <p className="text-sm text-slate-400 mb-8 font-medium leading-relaxed relative z-10">
              Un contract bun merge mână în mână cu un chiriaș de încredere. Găsește-l astăzi pe Rently. Mii de oameni caută chiar acum.
            </p>
            
            <div className="space-y-4 relative z-10">
              <Link href="/add-listing" className="flex items-center justify-center gap-3 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5">
                <span className="text-xl">🏠</span> Postează Anunțul Tău
              </Link>
            </div>
          </div>

          {/* Card Alte resurse */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-4">Alte Ghiduri Utile</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/programul-inchiriaza-o-camera" className="group flex items-center gap-3 text-slate-600 hover:text-indigo-600 font-bold transition-colors p-3 hover:bg-slate-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center text-lg transition-colors">📘</div>
                  Ghid: Închiriază o cameră
                </Link>
              </li>
              <li>
                <Link href="/de-ce-sa-imparti-chiria" className="group flex items-center gap-3 text-slate-600 hover:text-indigo-600 font-bold transition-colors p-3 hover:bg-slate-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center text-lg transition-colors">🤝</div>
                  De ce să împarți chiria?
                </Link>
              </li>
              <li>
                <a href="mailto:contact.rently@gmail.com" className="group flex items-center gap-3 text-slate-600 hover:text-indigo-600 font-bold transition-colors p-3 hover:bg-slate-50 rounded-xl -ml-3">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center text-lg transition-colors">✉️</div>
                  Contactează-ne
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