import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LgbtFlatsharePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex flex-col justify-center">
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 p-8 sm:p-16 md:p-20 text-center relative overflow-hidden">
          
          {/* Un detaliu de design subtil în fundal */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-500 opacity-80"></div>
          
          <span className="text-6xl sm:text-7xl block mb-8">🌈</span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004B73] mb-6 leading-tight">
            Găsește camere în locuințe sigure, deschise și prietenoase
          </h1>
          
          <p className="text-xl sm:text-2xl font-light text-gray-500 mb-12 max-w-2xl mx-auto">
            Pentru că a te simți cu adevărat „acasă” înseamnă să te poți exprima liber, exact așa cum ești.
          </p>
          
          <div className="text-gray-600 space-y-6 text-lg leading-relaxed max-w-3xl mx-auto text-left">
            <p>
              Să găsești locul perfect nu ține doar de buget, locație sau facilități. Ține în primul rând de sentimentul de siguranță și de a trăi alături de oameni care îți împărtășesc valorile.
            </p>
            <p>
              Dacă ești în căutarea unei camere într-un apartament sau a unei case LGBTQ+ friendly, pe Roomy ai la dispoziție o comunitate întreagă. Cu sute de anunțuri active din toată România, platforma noastră te ajută să te conectezi rapid cu persoane deschise la minte.
            </p>
            <p>
              Unele locuințe sunt formate exclusiv din membri ai comunității LGBTQ+, în timp ce altele sunt apartamente mixte, împărțite cu colegi aliați care pun preț pe respect reciproc, toleranță și un mediu lipsit de orice fel de prejudecăți.
            </p>
          </div>

          <div className="mt-12 bg-blue-50 p-8 rounded-2xl border border-blue-100 max-w-3xl mx-auto text-left flex flex-col sm:flex-row gap-6 items-center">
            <div className="text-5xl">🔍</div>
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Cum folosești filtrul?</h3>
              <p className="text-blue-800">
                Am implementat un filtru dedicat. Când cauți o chirie pe pagina noastră principală, deschide secțiunea de <strong>Filtre Avansate</strong> și bifează opțiunea <strong className="font-black bg-white px-2 py-1 rounded shadow-sm">LGBTQ+ Friendly 🌈</strong>. Astfel, vei vedea doar anunțurile verificate, publicate de persoane care garantează un mediu sigur și primitor.
              </p>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}