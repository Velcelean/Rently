import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, imageUrls } = await req.json();

    // 1. FILTRUL DE TEXT (Extins)
    const badWords = ['escorta', 'escortă', 'masaj erotic', 'relaxare', 'discretie', 'prostituata', 'prostituată', 'sex', 'matrimoniale', 'onlyfans'];
    
    if (text) {
      const lowerText = text.toLowerCase();
      for (const word of badWords) {
        if (lowerText.includes(word)) {
          return NextResponse.json({ safe: false, reason: 'Textul conține termeni interziși de politicile platformei.' });
        }
      }
    }

    // 2. FILTRUL AI PENTRU IMAGINI (Sightengine)
    const apiUser = process.env.SIGHTENGINE_USER;
    const apiSecret = process.env.SIGHTENGINE_SECRET;

    if (imageUrls && imageUrls.length > 0 && apiUser && apiSecret) {
      for (const imgUrl of imageUrls) {
        // Cerem AI-ului să verifice conținut explicit
        const url = `https://api.sightengine.com/1.0/check.json?models=nudity-2.0,gore,offensive&api_user=${apiUser}&api_secret=${apiSecret}&url=${encodeURIComponent(imgUrl)}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success') {
          // data.nudity.none = Cât de "safe" este poza (1 înseamnă complet îmbrăcat/normal)
          const nudityScore = data.nudity.none; 
          const suggestiveScore = data.nudity.suggestive; 
          
          if (nudityScore < 0.4 || suggestiveScore > 0.6 || data.offensive.prob > 0.5) {
             return NextResponse.json({ safe: false, reason: 'Imaginile încărcate încalcă regulile (conținut explicit/sugestiv).' });
          }
        }
      }
    }

    return NextResponse.json({ safe: true });

  } catch (error) {
    console.error("Eroare Moderație API:", error);
    // În caz de eroare la serverul extern, permitem trecerea pentru a nu bloca utilizatorii reali
    return NextResponse.json({ safe: true });
  }
}