"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Verificăm în memoria browser-ului dacă utilizatorul a fost de acord
    const consent = localStorage.getItem('Rently_cookie_performance') === 'true';
    setHasConsent(consent);

    // Opțional: Ascultăm dacă utilizatorul își schimbă preferințele în timp real
    const handleStorageChange = () => {
      const updatedConsent = localStorage.getItem('Rently_cookie_performance') === 'true';
      setHasConsent(updatedConsent);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Dacă nu avem consimțământ, nu încărcăm absolut nimic (Suntem 100% GDPR compliant)
  if (!hasConsent) return null;

  return (
    <>
      {/* ÎNLOCUIEȘTE G-XXXXXXXXXX CU ID-UL TĂU REAL DE GOOGLE ANALYTICS CÂND ÎL AI */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  );
}