"use client";

import { useState } from "react";

interface ReportButtonProps {
  targetId: string;
  targetType: "LISTING" | "USER";
}

export default function ReportButton({ targetId, targetType }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("Anunț Fals / Tentativă de Fraudă");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, targetType, reason, details }),
      });

      if (!res.ok) throw new Error("Eroare la trimitere");

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
        setDetails("");
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la trimiterea raportului.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-xs font-black text-rose-600 hover:text-rose-800 flex items-center justify-center gap-1.5 transition-colors py-2"
      >
        🚩 Raportează acest anunț
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 relative p-6 md:p-8 my-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors font-bold"
            >
              ✕
            </button>

            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                  ✓
                </div>
                <h3 className="font-black text-2xl text-slate-900">Raport Trimis!</h3>
                <p className="text-slate-500 text-sm font-medium">
                  Mulțumim! Echipa noastră va analiza cazul în cel mai scurt timp.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🚨</span>
                  <h3 className="font-black text-2xl text-slate-900">Raportează acest Anunț</h3>
                </div>
                <p className="text-slate-500 font-medium text-xs mb-6">
                  Ajută-ne să păstrăm comunitatea sigură. Raportul tău este 100% anonim.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Motivul raportului
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                    >
                      <option value="Anunț Fals / Tentativă de Fraudă">⚠️ Anunț Fals / Tentativă de Fraudă</option>
                      <option value="Limbaj Jignitor / Hărțuire">🛑 Limbaj Jignitor / Hărțuire</option>
                      <option value="Poze False sau Preluate">📷 Poze False sau Preluate din altă parte</option>
                      <option value="Date de contact sau adresa incorectă">📞 Date de contact sau adresa incorectă</option>
                      <option value="Alt Motiv">❓ Alt Motiv</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                      Detalii suplimentare
                    </label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Descrie pe scurt ce ți se pare suspect..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium resize-none outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
                    >
                      Renunță
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
                    >
                      {submitting ? "Se trimite..." : "Trimite"}
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