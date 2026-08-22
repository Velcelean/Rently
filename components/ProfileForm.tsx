"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type ProfileRole = "looking_for_room" | "has_room";

type Profile = {
  id: string;
  full_name: string | null;
  age: number | null;
  budget: number | null;
  role: ProfileRole | null;
  bio: string | null;
};

const inputClassName =
  "block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function ProfileForm() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [role, setRole] = useState<ProfileRole | "">("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, age, budget, role, bio")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      if (profile) {
        populateForm(profile);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  function populateForm(profile: Profile) {
    setFullName(profile.full_name ?? "");
    setAge(profile.age != null ? String(profile.age) : "");
    setBudget(profile.budget != null ? String(profile.budget) : "");
    setRole(profile.role ?? "");
    setBio(profile.bio ?? "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user || !role) return;

    setError(null);
    setSuccess(false);
    setSaving(true);

    const supabase = createClient();

    const { error: upsertError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name: fullName.trim(),
        age: Number(age),
        budget: Number(budget),
        role,
        bio: bio.trim(),
      },
      { onConflict: "id" }
    );

    setSaving(false);

    if (upsertError) {
      setError(upsertError.message);
      return;
    }

    setSuccess(true);
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <svg
          className="h-8 w-8 animate-spin text-brand-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Completează-ți profilul
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Spune-ne câteva detalii ca să te putem conecta cu colegii potriviți.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700"
            >
              Profilul a fost salvat cu succes!
            </div>
          )}

          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Nume complet
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Maria Popescu"
              className={inputClassName}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="age"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Vârstă
              </label>
              <input
                id="age"
                type="number"
                name="age"
                required
                min={18}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 25"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Buget (EUR/lună)
              </label>
              <input
                id="budget"
                type="number"
                name="budget"
                required
                min={0}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex: 300"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value as ProfileRole)}
              className={inputClassName}
            >
              <option value="" disabled>
                Selectează o opțiune
              </option>
              <option value="looking_for_room">Caut coleg/cameră</option>
              <option value="has_room">Am o cameră disponibilă</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Spune-ne câteva lucruri despre tine, obiceiurile tale și ce cauți..."
              className={`${inputClassName} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Se salvează...
              </>
            ) : (
              "Salvează Profilul"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
