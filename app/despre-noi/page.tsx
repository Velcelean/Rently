"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Componentă reutilizabilă pentru cardurile de valori
const ValueCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 hover:-translate-y-2 transition-transform duration-500 group">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-black text-slate-900 text-2xl mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

export default function DespreNoiPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      <main className="flex-grow">
        
        {/* HERO SECTION - MODERN & BOLD */}
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#020617]">
          {/* Efecte de background */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-xs font-black text-blue-300 uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Proiect Independent Românesc
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white leading-tight">
              Împarte chiria. <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Păstrează experiența.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Suntem aici să reparăm piața închirierilor din România. Fără agenții, fără comisioane absurde, fără spam. Doar oameni reali care caută un loc pe care să-l numească "acasă".
            </p>
          </div>
        </div>

        {/* SCRISOAREA FONDATORULUI (THE MANIFESTO) */}
        <div className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-8 md:p-14 relative shadow-xl">
              <div className="absolute -top-8 left-10 text-8xl text-blue-200 font-serif opacity-50">"</div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 relative z-10">
                Totul a început de la o frustrare personală.
              </h2>
              
              <div className="space-y-6 text-lg text-slate-700 leading-loose relative z-10 font-medium">
                <p>
                  Găsirea unui coleg de apartament sau a unei chirii decente în România devenise un proces obositor, haotic și adesea nesigur. Piața era și este dominată de grupuri de social media dezorganizate (unde mesajele tale se pierd în spam), de anunțuri false copiate de pe internet și de zeci de intermediari care îți cer „50% comision” doar pentru că ți-au deschis o ușă.
                </p>
                <p>
                  Am căutat o alternativă, dar nu exista. Așa că am decis să o construiesc.
                </p>
                <p>
                  <strong className="text-slate-900 bg-blue-100/50 px-2 py-1 rounded">Roomy nu este o corporație. Nu este o agenție imobiliară.</strong> Este un proiect independent, construit de la zero, din dorința de a aduce puțină ordine și mult mai multă umanitate în procesul de închiriere. 
                </p>
                <p>
                  Nu avem bugete de marketing de milioane de euro și nici un consiliu de administrație care să ne preseze să vindem datele utilizatorilor pentru profit. De fapt, la acest moment, <strong>platforma este susținută din fonduri proprii și oferită 100% gratuit</strong>, fără nicio taxă ascunsă sau plată cu cardul, pentru a ajuta comunitatea să crească organic.
                </p>
              </div>
              
              <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xl shadow-md">
                  R
                </div>
                <div>
                  <p className="font-black text-slate-900 text-lg">Fondator Roomy</p>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Solo Developer • România</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VALORILE NOASTRE (GRID) */}
        <div className="py-24 bg-slate-50 relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Valorile Noastre</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Ce ne face diferiți?</h3>
              <p className="text-xl text-slate-600 font-medium">Nu am construit doar un alt site de imobiliare. Am construit o unealtă pentru oameni, bazată pe principii clare.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ValueCard 
                icon="💸"
                title="Zero Comisioane"
                description="Nu suntem agenți. Nu cerem '50% din prima lună'. Punem în contact direct și complet gratuit chiriașii cu proprietarii sau cu viitorii lor colegi de apartament. Păstrează-ți banii pentru lucrurile care contează."
              />
              <ValueCard 
                icon="🤝"
                title="Comunitate Reală"
                description="Credem că o casă nu înseamnă doar pereți, ci și oamenii cu care o împarți. Prin profiluri detaliate și filtre de stil de viață (inclusiv pet-friendly sau LGBTQ+), te ajutăm să găsești compatibilitate, nu doar un pat."
              />
              <ValueCard 
                icon="🛡️"
                title="Privacy by Design"
                description="Datele tale nu sunt de vânzare. Nu suntem un data-broker și nu folosim tactici ascunse pentru a te spama. Ai control absolut asupra contului tău, poți șterge totul cu un singur click."
              />
              <ValueCard 
                icon="⚡"
                title="Tehnologie Modernă"
                description="Am aruncat la gunoi interfețele învechite din anii 2000. Roomy este construit pe tehnologii Cloud de ultimă generație, oferind o experiență ultra-rapidă, sigură și optimizată perfect pentru telefonul tău."
              />
              <ValueCard 
                icon="💬"
                title="Comunicare Sigură"
                description="Gata cu zecile de apeluri de la necunoscuți sau cu postarea numărului personal de WhatsApp pe internet. Sistemul nostru de mesagerie internă îți protejează intimitatea până ești gata să faci pasul următor."
              />
              <ValueCard 
                icon="🚫"
                title="Fără Spam & Fake-uri"
                description="Investim masiv în sisteme și filtre anti-fraudă pentru a curăța platforma de 'oferte capcană' sau de persoane care cer bani în avans pentru vizionări. Dacă un anunț e fals, dispare imediat."
              />
            </div>
          </div>
        </div>

        {/* COMPARATIE: OLD WAY VS ROOMY */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#020617] rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                
                {/* Modul Vechi */}
                <div className="space-y-8">
                  <h3 className="text-3xl font-black text-slate-400 flex items-center gap-3">
                    <span className="text-red-500">❌</span> Modul Vechi
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-bold">1</div>
                      <p className="text-slate-300 font-medium text-lg leading-relaxed">Grupuri de Facebook pline de zgomot, comentarii inutile și spam. Anunțul tău se pierde în 5 minute.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-bold">2</div>
                      <p className="text-slate-300 font-medium text-lg leading-relaxed">Site-uri de agenții care îți cer o avere (comisioane uriașe) doar pentru o simplă intermedire.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 font-bold">3</div>
                      <p className="text-slate-300 font-medium text-lg leading-relaxed">Filtre slabe. Nu știi dacă viitorul tău coleg fumează, are animale de companie sau cu ce se ocupă.</p>
                    </li>
                  </ul>
                </div>

                {/* Modul Roomy */}
                <div className="space-y-8 bg-blue-600/10 p-8 rounded-3xl border border-blue-500/20 relative">
                  <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transform rotate-3">
                    Evoluția
                  </div>
                  <h3 className="text-3xl font-black text-white flex items-center gap-3">
                    <span className="text-green-400">✅</span> Modul Roomy
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 font-bold">1</div>
                      <p className="text-blue-50 font-medium text-lg leading-relaxed">O platformă dedicată, curată, unde anunțurile rămân relevante și ușor de găsit prin căutare avansată.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 font-bold">2</div>
                      <p className="text-blue-50 font-medium text-lg leading-relaxed">Contact direct între utilizatori. ZERO taxe. Proiect menținut din pasiune, nu pentru profit rapid.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 font-bold">3</div>
                      <p className="text-blue-50 font-medium text-lg leading-relaxed">Profiluri umane. Poți filtra anunțurile în funcție de stilul de viață, gen, preferințe și regulile casei.</p>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Fii parte din schimbare.
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium max-w-2xl mx-auto">
              Suntem la început de drum, dar avem planuri mari. Ajută-ne să creștem această comunitate postând primul tău anunț. Este complet gratuit și durează doar 2 minute.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/add-listing" className="bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
                Postează Anunț (Gratuit)
              </Link>
              <Link href="/anunturi" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg py-4 px-10 rounded-xl transition-all shadow-sm">
                Explorează Ofertele
              </Link>
            </div>
            
            <div className="mt-12 flex justify-center gap-6 text-sm font-bold text-slate-400">
              <Link href="/termeni-si-conditii" className="hover:text-blue-600 transition">Termeni și Condiții</Link>
              <span>•</span>
              <Link href="/politica-de-confidentialitate" className="hover:text-blue-600 transition">Confidențialitate</Link>
              <span>•</span>
              <a href="mailto:contact@roomy.ro" className="hover:text-blue-600 transition">Contactează-ne</a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}