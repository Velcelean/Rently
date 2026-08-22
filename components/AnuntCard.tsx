import Link from "next/link";

interface AnuntData {
  id: string;
  title: string;
  city: string;
  price: number;
  tip_anunt: 'oferta_camera' | 'cerere_camera';
  image_url?: string;
  image_urls?: string[];
  // Putem adăuga aici și alte câmpuri pe care vrei să le afișăm
  tip_locuinta?: string; 
}

export default function AnuntCard({ data }: { data: AnuntData }) {
  // Aici putem pune logica de formatare vizuală
  const esteOferta = data.tip_anunt === 'oferta_camera';
  const label = esteOferta ? 'Se Oferă' : 'Se Caută';
  const bgColor = esteOferta ? 'bg-blue-600' : 'bg-orange-500';

  return (
    <Link href={`/anunturi/${data.id}`} className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Imaginea - zona de header */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={data.image_url || data.image_urls?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop"} 
          alt={data.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`${bgColor} text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-lg`}>
            {label}
          </span>
        </div>
      </div>

      {/* Detalii anunț */}
      <div className="p-5">
        <div className="mb-2">
           <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">{data.tip_locuinta || 'Locuință'}</span>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {data.title}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {data.city}
        </div>

        {/* Preț */}
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