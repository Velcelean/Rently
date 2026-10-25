"use client";

import { useState } from "react";

interface ReportButtonProps {
  targetId: string;
  targetType: "USER" | "LISTING";
}

export default function ReportButton({ targetId, targetType }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("SUBMITTING");

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, targetType, reason, details }),
      });

      if (!response.ok) throw new Error("Eroare la trimitere");
      
      // Trecem la starea de succes (Apare bifa verde în modal)
      setStatus("SUCCESS");
      
      // Închidem fereastra automat după 3 secunde și resetăm formularul
      setTimeout(() => {
        setIsOpen(false);
        setStatus("IDLE");
        setReason("");
        setDetails("");
      }, 3000);
      
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
        title="Raportează o problemă"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
        <span>Raportează</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {status === "SUCCESS" ? (
              // MESAJUL NOU DE SUCCES (Fără alert urât)
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl animate-bounce">✓</div>
                <h4 className="text-xl font-black text-slate-900">Raport Trimis!</h4>
                <p className="text-slate-500 mt-2 font-medium">Echipa noastră îl va analiza în cel mai scurt timp.</p>
              </div>
            ) : (
              // FORMULARUL DE RAPORTARE
              <>
                <div className="bg-red-50 p-6 border-b border-red-100">
                  <h3 className="text-xl font-black text-red-900 flex items-center gap-2">
                    🚨 Raportează acest {targetType === "USER" ? "Utilizator" : "Anunț"}
                  </h3>
                  <p className="text-red-700 text-sm mt-2">
                    Ajută-ne să păstrăm comunitatea sigură. Raportul tău este 100% anonim.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Motivul raportului</label>
                    <select 
                      required
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    >
                      <option value="" disabled>Selectează o problemă...</option>
                      <option value="SCAM">Anunț Fals / Tentativă de Fraudă</option>
                      <option value="INAPPROPRIATE">Conținut Inadecvat / Escorte</option>
                      <option value="HARASSMENT">Limbaj Agresiv</option>
                      <option value="OTHER">Alt motiv</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Detalii suplimentare</label>
                    <textarea 
                      required
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Descrie pe scurt ce ți se pare suspect..."
                      className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                    />
                  </div>

                  {status === "ERROR" && <p className="text-red-600 text-sm font-bold">A apărut o eroare. Te rugăm să încerci din nou.</p>}

                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                      Renunță
                    </button>
                    <button type="submit" disabled={status === "SUBMITTING"} className="flex-1 py-3 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50">
                      {status === "SUBMITTING" ? "Se trimite..." : "Trimite"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}