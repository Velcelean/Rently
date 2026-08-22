"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

type Listing = {
  id: string;
  title: string;
  city: string;
  price: number;
  description: string;
};

function LoadingSpinner({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin text-brand-600 ${className}`}
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
  );
}

export default function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    async function fetchDashboardData() {
      const supabase = createClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);

      const { data, error: listingsError } = await supabase
        .from("listings")
        .select("id, title, city, price, description")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (listingsError) {
        setError(listingsError.message);
      } else {
        setListings(data ?? []);
      }

      setLoading(false);
    }

    fetchDashboardData();
  }, [router]);

  async function handleSignOut() {
    setSigningOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            SpareRoom RO
          </span>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {signingOut ? "Se deconectează..." : "Deconectare"}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Bun venit!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ești logat ca:{" "}
            <span className="font-medium text-gray-900">{user?.email}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/add-listing"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Publică un anunț nou
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Editează profilul
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Anunțurile tale
          </h2>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {!error && listings.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
              <p className="text-gray-600">
                Nu ai publicat niciun anunț încă. Publică primul tău anunț!
              </p>
              <Link
                href="/add-listing"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Publică un anunț
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <article
                  key={listing.id}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {listing.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{listing.city}</p>
                  <p className="mt-3 text-xl font-bold text-brand-600">
                    {listing.price} EUR
                    <span className="text-sm font-normal text-gray-500">
                      /lună
                    </span>
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-4">
                    {listing.description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
