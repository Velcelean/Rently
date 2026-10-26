"use client";

import Link from "next/link";

interface AnuntData {
  id: string;
  title: string;
  city: string;
  price: number;
  tip_anunt?: 'oferta_camera' | 'cerere_camera';
  image_url?: string;
  image_urls?: string[];
  tip_locuinta?: string; 
}

export default function AnuntCard({ data }: { data: AnuntData }) {
  // Verificăm dacă există cel puțin o imagine validă
  const hasImage = data.image_url || (data.image_urls && data.image_urls.length > 0);
  const imageUrl = data.image_url || (data.image_urls ? data.image_urls[0] : "");

  return (
    <Link href={`/anunturi/${data.id}`} className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Imaginea - zona de header */}
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-50">
        {hasImage ? (
          <img 
            src={imageUrl} 
            alt={data.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-800 flex flex-col items-center justify-center text-white relative overflow-hidden group-hover:scale-105 transition-transform duration-500 border-b border-slate-800">
            {/* Efecte de fundal abstracte */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[40px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-[40px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
            
            {/* Logo-ul R. în loc de emoji */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-white rounded-[0.8rem] flex items-center justify-center mb-3 shadow-2xl">
                <span className="font-black text-blue-700 text-2xl tracking-tighter -ml-0.5">R.</span>
              </div>
              <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Fără fotografii
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Detalii anunț */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {data.title}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {data.city}
        </div>

        {/* Preț și Acțiuni */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="block text-2xl font-black text-gray-900">{data.price}€</span>
            <span className="text-xs text-gray-400 font-medium">preț lunar</span>
          </div>
          
          <div className="bg-gray-100 text-gray-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>

    </Link>
  );
}