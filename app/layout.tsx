import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importăm componenta noastră inteligentă pentru Google Analytics
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

// ==========================================
// 1. METADATELE SITE-ULUI (SEO & Social Media)
// ==========================================
export const metadata: Metadata = {
  title: "Rently - Găsește colegi de apartament și chirii",
  description: "Platforma #1 din România pentru colegi de apartament și chirii pe termen lung. 100% gratuit, sigur și fără comisioane.",
};

// ==========================================
// 2. SETĂRI STRICTE PENTRU MOBIL (EXPERIENȚĂ NATIVĂ APP)
// ==========================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Previne zoom-ul enervant pe iPhone când apeși pe un input
  themeColor: "#0f172a", // Colorează bara de sus a telefonului (Android/iOS) în Dark Slate
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" data-scroll-behavior="smooth">
      <body className={inter.className}>
        
        {/* 
          Aici am adăugat componenta. Ea va rula silențios în fundal.
          Dacă omul nu a acceptat cookie-urile, componenta nu va face nimic.
          Dacă le-a acceptat, va injecta scriptul Google Analytics.
        */}
        <Analytics />
        
        {/* Aici se încarcă restul paginilor tale (page.tsx din fiecare folder) */}
        {children}
        
      </body>
    </html>
  );
}