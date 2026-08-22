"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function Filtre() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Citim valorile actuale din URL sau setăm valori implicite
  const [tipAnunt, setTipAnunt] = useState(searchParams.get("tip_anunt") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [tipCamera, setTipCamera] = useState(searchParams.get("tip_camera") || "");
  const [genCautat, setGenCautat] = useState(searchParams.get("gen_cautat") || "");
  const [acceptaCupluri, setAcceptaCupluri] = useState(searchParams.get("accepta_cupluri") === "true");
  const [fumatori, setFumatori] = useState(searchParams.get("fumatori") === "true");

  function handleFilterChange(newParams: { [key: string]: string | boolean }) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "" || value === false) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    startTransition(() => {
      router.push(`/anunturi?${params.toString()}`);
    });
  }

  return (
    <aside className="w-full lg:w-72 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-gray-900">Filtrează anunțurile</h2>
        {isPending && <span className="text-xs text-brand-600 animate-pulse">Se actualizează...</span>}
      </div>

      {/* 1. Tip Anunț */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tip Anunț</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              const val = tipAnunt === "oferta_camera" ? "" : "oferta_camera";
              setTipAnunt(val);
              handleFilterChange({ tip_anunt: val });
            }}
            className={`rounded-lg py-2 text-xs font-medium transition ${
              tipAnunt === "oferta_camera"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Ofer cameră
          </button>
          <button
            type="button"
            onClick={() => {
              const val = tipAnunt === "cauta_camera" ? "" : "cauta_camera";
              setTipAnunt(val);
              handleFilterChange({ tip_anunt: val });
            }}
            className={`rounded-lg py-2 text-xs font-medium transition ${
              tipAnunt === "cauta_camera"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Caut cameră
          </button>
        </div>
      </div>

      {/* 2. Oraș */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Oraș</label>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            handleFilterChange({ city: e.target.value });
          }}
          placeholder="Ex: București"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {/* 3. Tip Cameră */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tip Cameră</label>
        <select
          value={tipCamera}
          onChange={(e) => {
            setTipCamera(e.target.value);
            handleFilterChange({ tip_camera: e.target.value });
          }}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">Toate tipurile</option>
          <option value="single">Single room</option>
          <option value="double">Double room</option>
        </select>
      </div>

      {/* 4. Preferințe Gen */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Preferințe Colegi</label>
        <select
          value={genCautat}
          onChange={(e) => {
            setGenCautat(e.target.value);
            handleFilterChange({ gen_cautat: e.target.value });
          }}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">Oricine</option>
          <option value="femei">Femei</option>
          <option value="barbati">Bărbați</option>
          <option value="mixt">Mixt</option>
        </select>
      </div>

      {/* 5. Opțiuni Extra (Checkbox-uri) */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
          <input
            type="checkbox"
            checked={acceptaCupluri}
            onChange={(e) => {
              setAcceptaCupluri(e.target.checked);
              handleFilterChange({ accepta_cupluri: e.target.checked });
            }}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
          />
          <span>Acceptă cupluri</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
          <input
            type="checkbox"
            checked={fumatori}
            onChange={(e) => {
              setFumatori(e.target.checked);
              handleFilterChange({ fumatori: e.target.checked });
            }}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
          />
          <span>Se acceptă fumători</span>
        </label>
      </div>
    </aside>
  );
}