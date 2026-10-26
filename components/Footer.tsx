"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-slate-300 py-16 border-t border-slate-800 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform -translate-x-1/2"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black text-white tracking-tighter">
                Rently<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              Platforma independentă și 100% gratuită din România dedicată găsirii celor mai buni colegi de apartament și a chiriilor de încredere. Fără agenții, fără comisioane.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Platformă</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/anunturi" className="hover:text-blue-400 transition-colors">Caută o cameră</Link></li>
              <li><Link href="/add-listing" className="hover:text-blue-400 transition-colors">Postează un anunț</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Autentificare</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Contul Meu</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Comunitate</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/despre-noi" className="hover:text-blue-400 transition-colors">Despre Noi</Link></li>
              <li><Link href="/de-ce-rently" className="hover:text-blue-400 transition-colors">De ce Rently?</Link></li>
              <li><Link href="/de-ce-sa-imparti-chiria" className="hover:text-blue-400 transition-colors">Ghid: Flatsharing</Link></li>
              <li><Link href="/programul-inchiriaza-o-camera" className="hover:text-blue-400 transition-colors">Ghid: Pentru Proprietari</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Suport & Juridic</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/intrebari-frecvente" className="text-blue-400 hover:text-white transition-colors flex items-center gap-2">Întrebări Frecvente (FAQ) <span className="w-2 h-2 rounded-full bg-blue-500"></span></Link></li>
              <li><Link href="/politica-anti-discriminare" className="hover:text-blue-400 transition-colors">Politica Anti-Discriminare</Link></li>
              <li><Link href="/termeni-si-conditii" className="hover:text-blue-400 transition-colors">Termeni și Condiții</Link></li>
              <li><Link href="/politica-de-confidentialitate" className="hover:text-blue-400 transition-colors">Politica de Confidențialitate</Link></li>
              <li><Link href="/setari-cookies" className="hover:text-blue-400 transition-colors">Setări Cookies</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>
            &copy; {currentYear} Rently.ro. Toate drepturile rezervate. Un proiect independent creat în România.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:rently.studenti@gmail.com" className="hover:text-white transition-colors">rently.studenti@gmail.com</a>
            <Link href="/intrebari-frecvente" className="hover:text-white transition-colors">Centrul de Suport</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}