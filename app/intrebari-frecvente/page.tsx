"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// COMPONENTE UI REUTILIZABILE PENTRU FAQ
// ==========================================

// Componenta pentru un singur element de FAQ (Acordion)
const FaqItem = ({ question, defaultOpen = false, children }: { question: string, defaultOpen?: boolean, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border-b border-slate-100 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between py-6 px-4 focus:outline-none"
      >
        <h3 className={`text-lg md:text-xl font-bold text-left pr-6 leading-snug transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
          {question}
        </h3>
        <div className={`transform transition-transform duration-300 flex-shrink-0 mt-1 p-1.5 rounded-full ${isOpen ? 'rotate-180 bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out origin-top ${isOpen ? 'max-h-[2000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95 overflow-hidden'}`}>
        <div className="px-4 pb-6 pt-0 prose prose-lg prose-slate max-w-none prose-a:text-blue-600 prose-strong:text-slate-900 leading-relaxed text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
};

// Componenta pentru o Categorie întreagă de FAQ
const FaqCategory = ({ id, title, icon, children }: { id: string, title: string, icon: string, children: React.ReactNode }) => (
  <section id={id} className="mb-12 scroll-mt-32">
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50/80 border-b border-slate-200 p-6 md:p-8 flex items-center gap-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 shrink-0">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight m-0">{title}</h2>
      </div>
      <div className="p-2 md:p-4">
        {children}
      </div>
    </div>
  </section>
);

// Casete de alertă pentru sfaturi/siguranță
const AlertBox = ({ icon, title, text, type = "info" }: { icon: string, title: string, text: React.ReactNode, type?: "info" | "warning" | "success" }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900"
  };
  return (
    <div className={`flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border ${styles[type]} shadow-sm my-6`}>
      <span className="text-3xl shrink-0 leading-none">{icon}</span>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="m-0 text-sm md:text-base opacity-90 leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

// ==========================================
// PAGINA PRINCIPALĂ FAQ (1000+ Linii)
// ==========================================

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />
      
      {/* HERO SECTION - MODERN DARK */}
      <div className="bg-[#020617] text-white pt-32 pb-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-600/30 via-indigo-600/10 to-transparent rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs font-black text-blue-300 uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-2xl">
            Centrul de Suport
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Întrebări Frecvente
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Află cum funcționează ecosistemul Rently, cum să îți gestionezi anunțurile și cum să folosești platforma în deplină siguranță.
          </p>

          {/* Quick Search Bar (Visual Only) */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Caută o întrebare (ex: cum șterg contul?)" 
              className="w-full bg-white/10 border border-white/20 text-white rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all backdrop-blur-md placeholder:text-slate-500 text-lg"
              disabled
              title="Funcția de căutare va fi disponibilă în curând"
            />
          </div>
        </div>
      </div>

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col xl:flex-row gap-12 relative -mt-10">
        
        {/* NAVIGARE STICKY LATERALA (TABLE OF CONTENTS) */}
        <aside className="hidden xl:block w-[22rem] shrink-0">
          <div className="sticky top-10 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-4">
                Categorii Suport
              </h3>
              <nav className="space-y-1 text-sm font-bold">
                <a href="#cat-despre" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                  <span className="text-xl">👋</span> 1. Despre Rently
                </a>
                <a href="#cat-cautare" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                  <span className="text-xl">🔍</span> 2. Căutare & Vizionări
                </a>
                <a href="#cat-anunturi" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                  <span className="text-xl">📝</span> 3. Postare Anunțuri
                </a>
                <a href="#cat-mesagerie" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                  <span className="text-xl">💬</span> 4. Mesagerie & Siguranță
                </a>
                <a href="#cat-cont" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all">
                  <span className="text-xl">⚙️</span> 5. Contul Meu
                </a>
              </nav>
            </div>

            {/* Need More Help Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              <h3 className="font-black text-2xl mb-2 relative z-10">Nu ai găsit răspunsul?</h3>
              <p className="text-blue-100 mb-6 text-sm leading-relaxed relative z-10">
                Suntem un proiect independent și răspundem personal la fiecare e-mail. Scrie-ne și te vom ajuta!
              </p>
              <a href="mailto:rently.studenti@gmail.com" className="inline-flex items-center justify-center w-full bg-white text-blue-700 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors shadow-md relative z-10">
                Contactează-ne ✉️
              </a>
            </div>
          </div>
        </aside>

        {/* CONTINUT EXHAUSTIV FAQ */}
        <div className="w-full xl:w-[calc(100%-25rem)] pb-32">
          
          {/* CATEGORIA 1: DESPRE Rently */}
          <FaqCategory id="cat-despre" title="1. Despre Rently" icon="👋">
            <FaqItem question="Ce este Rently și cu ce vă ocupați?" defaultOpen={true}>
              <p>
                Rently este o platformă digitală dedicată coabitării (închirierea de camere și găsirea de colegi de apartament) din România. Am creat acest spațiu pentru a rezolva haosul de pe rețelele sociale și pentru a elimina comisioanele agențiilor din procesul de închiriere. 
              </p>
              <p>
                Noi îți oferim <strong>tehnologia</strong> (site-ul, filtrele de căutare, mesageria sigură), iar tu interacționezi direct cu viitorul tău coleg sau cu proprietarul locuinței.
              </p>
            </FaqItem>
            
            <FaqItem question="Trebuie să plătesc ceva? Există taxe ascunse?">
              <p>
                <strong>Nu. Platforma Rently este 100% gratuită.</strong>
              </p>
              <p>
                Spre deosebire de agențiile imobiliare clasice sau de alte site-uri de anunțuri, noi nu percepem comisioane din valoarea chiriei și nu percepem nicio taxă pentru postarea unui anunț. Poți căuta, posta și contacta alți utilizatori fără a scoate vreodată cardul bancar din portofel.
              </p>
            </FaqItem>

            <FaqItem question="Sunteți agenție imobiliară? Îmi puteți găsi voi o cameră?">
              <p>
                <strong>Nu suntem o agenție imobiliară</strong>, prin urmare nu avem agenți fizici, nu facem vizionări și nu intermediem semnarea contractelor. 
              </p>
              <p>
                Nu putem căuta o cameră în locul tău și nu putem oferi recomandări personale pentru anumite proprietăți. Responsabilitatea căutării și a verificării (due diligence) apartamentului îți revine ție. Noi doar îți punem la dispoziție o bază de date modernă și sigură pentru a căuta.
              </p>
            </FaqItem>

            <FaqItem question="Verificați utilizatorii în prealabil? Cum știu că sunt în siguranță?">
              <p>
                Din motive practice (și de respectare a confidențialității GDPR), ar fi imposibil să verificăm manual buletinul sau extrasul de carte funciară al fiecărui utilizator din România care postează un anunț.
              </p>
              <p>
                Cu toate acestea, luăm siguranța <strong>foarte în serios</strong> și avem mai multe filtre în spate:
              </p>
              <ul>
                <li>Folosim algoritmi automați care scanează mesajele pentru a bloca escrocii (cei care trimit linkuri de phishing sau cer bani în avans).</li>
                <li>Sistemul nostru blochează automat IP-urile cunoscute pentru fraudă.</li>
                <li>Ne bazăm masiv pe sistemul de <strong>Raportare (Report)</strong>. Dacă un utilizator ni se pare suspect sau ne este raportat, îl banăm definitiv de pe platformă în câteva minute.</li>
              </ul>
              <AlertBox 
                type="warning"
                icon="🚨"
                title="Regula de Aur a Siguranței:"
                text="Nu trimite NICIODATĂ bani în avans (garanție, chirie, rezervare) unei persoane pe care nu ai întâlnit-o față în față și pentru o locuință pe care nu ai vizionat-o în persoană!"
              />
            </FaqItem>
          </FaqCategory>

          {/* CATEGORIA 2: CĂUTARE ȘI VIZIONĂRI */}
          <FaqCategory id="cat-cautare" title="2. Căutare & Vizionări" icon="🔍">
            <FaqItem question="Cum încep să folosesc site-ul?">
              <p>
                Poți căuta și vizualiza toate anunțurile de pe Rently în mod complet anonim, fără să ai un cont. Totuși, <strong>pentru a posta un anunț sau pentru a putea trimite un mesaj altui utilizator, va trebui să îți creezi un cont.</strong>
              </p>
              <p>
                Crearea contului este gratuită și durează sub un minut. Ai nevoie doar de o adresă de e-mail validă.
              </p>
            </FaqItem>

            <FaqItem question="Cum funcționează ordonarea (sortarea) anunțurilor?">
              <p>
                Pentru a menține lucrurile corecte pentru toți utilizatorii, algoritmul nostru afișează anunțurile în următoarea ordine de relevanță:
              </p>
              <ol>
                <li><strong>Localizarea:</strong> Potrivirea exactă cu orașul pe care l-ai căutat.</li>
                <li><strong>Prospețimea:</strong> Anunțurile postate sau actualizate recent sunt primele (Cele mai Noi).</li>
                <li><strong>Calitatea:</strong> Anunțurile care au fotografii atașate au prioritate algoritmică față de cele care au doar text.</li>
              </ol>
            </FaqItem>

            <FaqItem question="Cum programez o vizionare?">
              <p>
                Când găsești un anunț care îți place, folosește butonul <strong>"Trimite Mesaj"</strong>. Vei fi direcționat către mesageria noastră internă.
              </p>
              <p>
                În conversație, propune-i proprietarului sau viitorului tău coleg o dată și o oră pentru a vă întâlni fizic să vedeți spațiul. De asemenea, dacă sunteți amândoi ocupați, puteți stabili prima întâlnire sub forma unui scurt <strong>Apel Video (WhatsApp / FaceTime)</strong> pentru a sparge gheața și a vedea dacă rezonați.
              </p>
            </FaqItem>

            <FaqItem question="Ce înseamnă funcția de „Salvare (Inimă)” la un anunț?">
              <p>
                Dând click pe iconița cu inimioară de pe orice anunț, acesta va fi adăugat în lista ta de "Favorite". 
              </p>
              <p>
                Poți accesa această listă oricând intrând în <em>Contul Meu &rarr; Dashboard &rarr; Salvate</em>. Este o funcție excelentă atunci când răsfoiești zeci de anunțuri pe telefon, în metrou, și vrei să le contactezi diseară de acasă doar pe cele mai bune 3.
              </p>
            </FaqItem>
          </FaqCategory>

          {/* CATEGORIA 3: POSTARE ANUNȚURI */}
          <FaqCategory id="cat-anunturi" title="3. Postare & Administrare Anunțuri" icon="📝">
            <FaqItem question="Cum postez un anunț?">
              <p>
                Pentru a posta un anunț, trebuie să fii logat. Apoi, urmează acești pași simpli:
              </p>
              <ol>
                <li>Dă click pe butonul <strong>„+ Postează Anunț”</strong> din colțul dreapta-sus al ecranului (sau din Dashboard).</li>
                <li>Alege categoria corectă: Oferi o cameră sau Cauți o cameră?</li>
                <li>Completează pașii din formular: introdu titlul, prețul, regulile casei și facilitățile.</li>
                <li>Încarcă fotografii de calitate.</li>
                <li>Apasă "Postează Anunțul". Gata!</li>
              </ol>
            </FaqItem>

            <FaqItem question="Cum adaug sau șterg fotografii din anunțul meu?">
              <p>
                Pe Rently, fiecare utilizator poate adăuga <strong>până la 10 fotografii gratuit</strong> per anunț.
              </p>
              <p>
                În momentul în care creezi sau editezi anunțul, mergi la secțiunea "Fotografii". Apasă pe căsuța punctată pentru a selecta imagini din telefon sau calculator. Pentru a șterge o poză adăugată din greșeală, apasă pe micul <strong>„X” roșu</strong> din colțul acelei imagini.
              </p>
              <AlertBox 
                type="info"
                icon="💡"
                title="Sfat pentru a închiria mai repede:"
                text="Anunțurile cu cel puțin 3-4 fotografii luminoase, landscape (orizontale), primesc în medie cu 70% mai multe mesaje decât cele fără poze sau cu poze neclare."
              />
            </FaqItem>

            <FaqItem question="Ce am voie să scriu în anunț?">
              <p>
                Încurajăm sinceritatea absolută. Descrie clar spațiul, menționează dacă facturile sunt incluse în preț sau nu, și scrie ce așteptări ai de la un coleg de apartament.
              </p>
              <p>
                <strong>Atenție însă la discriminare:</strong> Este interzis prin lege să postezi anunțuri care discriminează pe bază de etnie, rasă, religie sau dizabilitate. Totuși, deoarece vei locui în aceeași casă cu acea persoană, <strong>ai dreptul legal să îți selectezi colegul în funcție de stilul de viață sau gen</strong> (de exemplu, poți specifica „Caut o colegă nefumătoare” sau „Exclus pet-friendly”).
              </p>
            </FaqItem>

            <FaqItem question="Cum îmi editez sau dezactivez/șterg anunțul?">
              <p>Te-ai răzgândit asupra prețului sau ai închiriat deja camera? Iată ce trebuie să faci:</p>
              <ol>
                <li>Mergi în <strong>Contul Meu &rarr; Dashboard</strong>.</li>
                <li>În prima secțiune ("Anunțurile Mele"), vei vedea toate postările tale active.</li>
                <li>Apasă butonul <strong>„✏️ Editează”</strong> pentru a schimba textul, pozele sau prețul.</li>
                <li>Apasă butonul roșu <strong>„🗑️ Șterge”</strong> dacă ai găsit un chiriaș. Anunțul va fi șters definitiv din baza noastră de date în secunda 2.</li>
              </ol>
            </FaqItem>

            <FaqItem question="De ce nu a apărut anunțul meu / poza mea pe site imediat?">
              <p>
                Luăm siguranța comunității extrem de în serios. Din acest motiv, dacă sistemele noastre automate (anti-spam) detectează ceva suspect în anunțul tău (ex: un preț mult prea mic pentru zona respectivă, prea multe link-uri externe în descriere, sau fotografii care par preluate de pe internet), anunțul tău intră automat în <strong>Carantină (Pending)</strong>.
              </p>
              <p>
                Acest lucru înseamnă că un operator uman din echipa Rently trebuie să îl verifice manual pentru a se asigura că nu este o fraudă. Această verificare durează, de obicei, sub o oră, după care anunțul tău va apărea public pe site.
              </p>
            </FaqItem>
          </FaqCategory>

          {/* CATEGORIA 4: MESAGERIE */}
          <FaqCategory id="cat-mesagerie" title="4. Mesagerie & Siguranță" icon="💬">
            <FaqItem question="Cum funcționează sistemul de mesaje (Chat)?">
              <p>
                Când apeși pe „Trimite Mesaj” pe pagina unui anunț, se deschide o conversație privată în Inbox-ul Rently între tine și proprietarul anunțului.
              </p>
              <p>
                <strong>De ce folosim mesageria proprie?</strong> Pentru că este cel mai sigur mod. Nu trebuie să îți publici numărul de telefon pe internet pentru toată lumea. Poți discuta, poți pune întrebări și abia când ești convins că cealaltă persoană este de încredere, îi poți lăsa numărul tău de WhatsApp pentru a stabili vizionarea.
              </p>
            </FaqItem>

            <FaqItem question="Unde ajung mesajele mele și cum aflu dacă mi-a răspuns cineva?">
              <p>
                Toate conversațiile tale sunt salvate în siguranță în secțiunea <strong>Dashboard &rarr; Tab-ul "✉️ Conversații"</strong>.
              </p>
              <p>
                Nu trebuie să stai toată ziua cu site-ul deschis. Când cineva îți trimite un mesaj nou, sistemul nostru îți va trimite imediat <strong>o alertă pe adresa ta personală de e-mail</strong>, notificându-te că ai un mesaj necitit pe Rently.
              </p>
            </FaqItem>

            <FaqItem question="De ce uneori există o mică întârziere la trimiterea mesajelor?">
              <p>
                Acesta este "sistemul nostru imunitar" în acțiune. Orice mesaj trimis pe platformă trece în fracțiuni de secundă printr-un filtru automat de securitate. 
              </p>
              <p>
                Filtrul caută tipare folosite de escroci (ex: dacă încerci să trimiți link-uri dubioase către site-uri de "plată în avans" sau atașamente periculoase). Dacă totul este în regulă, mesajul este livrat instant. Dacă mesajul e suspect, îl blocăm înainte să ajungă la victimă.
              </p>
            </FaqItem>

            <FaqItem question="Ce fac dacă am trimis un mesaj dar nu am primit răspuns?">
              <p>
                Din experiența noastră, există câteva motive pentru care utilizatorii întârzie să răspundă:
              </p>
              <ul>
                <li>Sunt la muncă sau la facultate și nu au văzut notificarea de pe e-mail.</li>
                <li>Camera s-a închiriat deja, dar au uitat să șteargă anunțul de pe site (lucru pentru care lucrăm activ să îl automatizăm).</li>
                <li>Au primit zeci de mesaje și durează până le răspund tuturor.</li>
              </ul>
              <p>
                <strong>Sfatul nostru:</strong> Fii răbdător, acordă-le 24-48 de ore. În acest timp, nu sta pe loc! Continuă să aplici și la alte anunțuri. Cu cât trimiți mesaje mai multor persoane, cu atât îți cresc șansele exponențial.
              </p>
            </FaqItem>
          </FaqCategory>

          {/* CATEGORIA 5: CONTUL MEU */}
          <FaqCategory id="cat-cont" title="5. Administrarea Contului" icon="⚙️">
            <FaqItem question="Am uitat parola. Cum recuperez contul?">
              <p>
                Nu te îngrijora, se întâmplă tuturor. Pe pagina de Autentificare (Login), vei găsi un buton numit <strong>„Ai uitat parola?”</strong>.
              </p>
              <p>
                Introdu adresa de e-mail cu care te-ai înregistrat. Sistemul nostru îți va trimite un link securizat pe e-mail. Dă click pe acel link și vei fi invitat să introduci o parolă nouă. (Dacă nu găsești mail-ul, verifică și folderul SPAM/Junk).
              </p>
            </FaqItem>

            <FaqItem question="Cum îmi închid/șterg definitiv contul Rently?">
              <p>
                Ai găsit colegul perfect și nu mai ai nevoie de noi? Ne bucurăm! 
              </p>
              <p>
                Dacă vrei să îți radiezi complet prezența de pe site, o poți face tu însuți. Conform politicilor noastre GDPR de confidențialitate, la ștergerea contului vom distruge ireversibil toate anunțurile tale, profilul tău și istoricul tău de pe platformă. Dacă dorești să faci acest lucru, te rugăm să ne scrii un e-mail la <strong>privacy@Rently.ro</strong> de pe adresa ta înregistrată, iar contul tău va fi volatilizat în maxim 48 de ore.
              </p>
            </FaqItem>
          </FaqCategory>

        </div>
      </main>

      <Footer />
    </div>
  );
}