"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const inputClassName =
  "block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";

export default function AddListingForm() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  // Modificat: Permitem o listă de fișiere (multiple)
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [tipAnunt, setTipAnunt] = useState('oferta_camera');
  const [tipCamera, setTipCamera] = useState('single');
  const [genCautat, setGenCautat] = useState('oricine');
  const [acceptaCupluri, setAcceptaCupluri] = useState(false);
  const [fumatori, setFumatori] = useState(false);

  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    }

    fetchUser();
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setSuccess(false);
    setSubmitting(true);

    const supabase = createClient();
    const uploadedUrls: string[] = [];

    // Încărcăm fiecare imagine selectată în Supabase Storage
    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Eroare la încărcarea unei imagini: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('listing-images')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    const { error: insertError } = await supabase.from("listings").insert({
      user_id: user.id,
      title: title.trim(),
      city: city.trim(),
      price: Number(price),
      description: description.trim(),
      tip_anunt: tipAnunt,
      tip_camera: tipCamera,
      gen_cautat: genCautat,
      accepta_cupluri: acceptaCupluri,
      fumatori: fumatori,
      image_url: uploadedUrls[0] || null,      // Prima poză pentru carduri
      image_urls: uploadedUrls,                // Toate pozele pentru galeria stil Airbnb
      instagram_url: instagramUrl.trim() || null,
      facebook_url: facebookUrl.trim() || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Publică un anunț</h1>
          <p className="mt-2 text-sm text-gray-600">Adaugă detaliile camerei tale și poze multiple.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div role="alert" className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          {success && <div role="status" className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">Anunțul a fost publicat! Redirecționare...</div>}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tip Anunț *</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" name="tip_anunt" value="oferta_camera" checked={tipAnunt === 'oferta_camera'} onChange={(e) => setTipAnunt(e.target.value)} className="w-4 h-4 text-blue-600" />
                <span>Ofer o cameră</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="radio" name="tip_anunt" value="cauta_camera" checked={tipAnunt === 'cauta_camera'} onChange={(e) => setTipAnunt(e.target.value)} className="w-4 h-4 text-blue-600" />
                <span>Caut o cameră</span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Titlu anunț</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Cameră luminoasă în centru" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Oraș</label>
            <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex: București" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Preț lunar (EUR)</label>
            <input type="number" required min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 350" className={inputClassName} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tipul camerei</label>
            <select value={tipCamera} onChange={(e) => setTipCamera(e.target.value)} className={inputClassName}>
              <option value="single">Single room</option>
              <option value="double">Double room</option>
              <option value="any">Orice dimensiune (Any)</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferințe colegi / gen</label>
            <select value={genCautat} onChange={(e) => setGenCautat(e.target.value)} className={inputClassName}>
              <option value="femei">Femei (Females)</option>
              <option value="barbati">Bărbați (Males)</option>
              <option value="mixt">Gospodărie mixtă (Mixed)</option>
              <option value="oricine">Fără preferințe (Any)</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-sm font-medium text-gray-700">Opțiuni suplimentare</label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={acceptaCupluri} onChange={(e) => setAcceptaCupluri(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-700">Acceptă cupluri</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={fumatori} onChange={(e) => setFumatori(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-700">Se acceptă fumători</span>
            </label>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-100 mt-4">
            <label className="block text-sm font-medium text-gray-700">Rețele Sociale (Opțional)</label>
            <input type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="Link profil Instagram" className={inputClassName} />
            <input type="url" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="Link profil Facebook" className={inputClassName} />
          </div>

          <div className="pt-2 border-t border-gray-100">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Imagini anunț (Poți selecta mai multe)</label>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200" 
            />
            {imageFiles.length > 0 && (
              <p className="text-xs text-blue-600 mt-1 font-medium">Ai selectat {imageFiles.length} imagini.</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Descriere</label>
            <textarea rows={5} required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrie camera..." className={`${inputClassName} resize-none`} />
          </div>

          <button type="submit" disabled={submitting || success} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:opacity-70">
            {submitting ? "Se publică..." : "Publică Anunțul"}
          </button>
        </form>
      </div>
    </div>
  );
}