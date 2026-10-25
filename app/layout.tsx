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
  title: "Rently România | Platformă de Chirii și Colegi de Apartament",
  description: "Găsește colegul de apartament perfect sau chiriile ideale în România. Rently te ajută să împarți costurile simplu și sigur, fără comisioane.",
  keywords: ["rently romania", "rently chirii", "colegi de apartament", "caut coleg camera", "inchirieri directe", "flatsharing romania"],
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