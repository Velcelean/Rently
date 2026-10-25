import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rently România | Platformă de Chirii și Colegi de Apartament",
  description: "Găsește colegul de apartament perfect sau chiriile ideale în România. Rently te ajută să împarți costurile simplu și sigur, fără comisioane.",
  keywords: ["rently romania", "rently chirii", "colegi de apartament", "caut coleg camera", "inchirieri directe", "flatsharing romania"],
  openGraph: {
    siteName: "Rently România",
    type: "website",
    locale: "ro_RO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema markup pentru Google Site Name
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rently România",
    "alternateName": ["Rently", "Rently Romania"],
    "url": "https://rently-ro.vercel.app/"
  };

  return (
    <html lang="ro" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}