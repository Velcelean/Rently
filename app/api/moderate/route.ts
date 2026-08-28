import { NextResponse } from 'next/server';

// ============================================================================
// 🛡️ RENTLY ENTERPRISE MODERATION ENGINE v2.0
// Acest modul reprezintă scutul principal împotriva conținutului malițios,
// spam-ului, rețelelor de escorte și imaginilor cu caracter explicit.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. INTERFEȚE ȘI TIPURI STRICTE (TypeScript)
// ----------------------------------------------------------------------------
interface ModerationResult {
  safe: boolean;
  score: number;
  reason: string;
  flags: string[];
}

interface SightengineResponse {
  status: string;
  error?: { message: string; type: string; code: number };
  nudity?: {
    safe: number;
    suggestive: number;
    erotica: number;
    sexual_activity: number;
    none: number;
  };
  wad?: {
    weapons: number;
    alcohol: number;
    drugs: number;
  };
  offensive?: { prob: number };
  scam?: { prob: number };
  text?: {
    profanity?: { has_profanity: boolean; matches: any[] };
    personal?: { has_phone_number: boolean };
  };
}

// ----------------------------------------------------------------------------
// 2. DICTIONARE ȘI REGULI DE EXPRESIE REGULATĂ (REGEX)
// ----------------------------------------------------------------------------
const MODERATION_THRESHOLDS = {
  MAX_ALLOWED_SCORE: 100,
  SUGGESTIVE_IMAGE_LIMIT: 0.4,   // Foarte strict pentru "cameră goală cu lumini roșii"
  OFFENSIVE_IMAGE_LIMIT: 0.3,
  SCAM_IMAGE_LIMIT: 0.5,
};

// Categoria 1: Toleranță ZERO (Ban Instant -> Scor +100)
const STRICT_BANS = [
  'escorta', 'escorte', 'escortă', 'prostituata', 'prostituate', 'videochat', 
  'onlyfans', 'masaj erotic', 'happy ending', 'sex', 'curve', 'bordel', 
  'bdsm', 'dominare', 'sclav', 'incest', 'fut', 'pula', 'pizda', 'muie',
  'matrimoniale', 'sugar daddy', 'sugar baby', 'fete dulci', 'companie intima'
];

// Categoria 2: Cuvinte suspecte (Scor +40, necesită și alte dovezi pentru ban)
const SUSPICIOUS_TERMS = [
  'discretie', 'discreție', 'relaxare', 'masaj', 'secreta', 'secretă', 
  'fetis', 'fetiș', 'jucarii', 'domn generos', 'intima', 'intimă', 
  'fara obligatii', 'fără obligații', 'sponsorizare'
];

// Regex pentru detectarea tentativelor de a ocoli filtrele (ex: e.s.c.o.r.t.a, m@saj)
const OBFUSCATION_PATTERNS = [
  { regex: /e[\s\.\-_*]*s[\s\.\-_*]*c[\s\.\-_*]*o[\s\.\-_*]*r[\s\.\-_*]*t/i, weight: 100 },
  { regex: /v[\s\.\-_*]*i[\s\.\-_*]*d[\s\.\-_*]*e[\s\.\-_*]*o[\s\.\-_*]*c[\s\.\-_*]*h[\s\.\-_*]*a[\s\.\-_*]*t/i, weight: 100 },
  { regex: /m[\s\.\-_*]*[a@]+[\s\.\-_*]*s[\s\.\-_*]*[a@]+[\s\.\-_*]*j/i, weight: 60 }
];

// ----------------------------------------------------------------------------
// 3. MOTOARE DE ANALIZĂ (MODULE INTERNE)
// ----------------------------------------------------------------------------

/**
 * Motorul de Analiză a Textului (NLP de bază)
 * Evaluează titlul și descrierea, căutând cuvinte interzise și tehnici de evaziune.
 */
function analyzeTextContent(text: string): Omit<ModerationResult, 'safe'> {
  let score = 0;
  const flags: string[] = [];
  
  if (!text || text.trim() === '') {
    return { score: 0, reason: '', flags: [] };
  }

  // Normalizare text (scoatem accentele pentru a prinde variațiile)
  const normalizedText = text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

  // 1. Verificare Strictă (Ban Instant)
  for (const word of STRICT_BANS) {
    const cleanWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(`\\b${cleanWord}\\b`, 'i');
    if (regex.test(normalizedText)) {
      score += 150; 
      flags.push(`Cuvânt interzis strict: [${word}]`);
    }
  }

  // 2. Verificare Cuvinte Suspecte
  for (const word of SUSPICIOUS_TERMS) {
    const cleanWord = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(`\\b${cleanWord}\\b`, 'i');
    if (regex.test(normalizedText)) {
      score += 40;
      flags.push(`Termen suspect detectat: [${word}]`);
    }
  }

  // 3. Verificare Obfuscare (Evaziune Filtre)
  for (const pattern of OBFUSCATION_PATTERNS) {
    if (pattern.regex.test(normalizedText)) {
      score += pattern.weight;
      flags.push(`Detectare obfuscare text (Evaziune filtru)`);
    }
  }

  // 4. Verificare Spam (Prea multe numere de telefon - posibil agenție fake/spam)
  const phonePattern = /(?:\+?40|0)\s*7\d{2}\s*\d{3}\s*\d{3}/g;
  const phoneMatches = normalizedText.match(phonePattern);
  if (phoneMatches && phoneMatches.length > 2) {
    score += 50;
    flags.push(`Prea multe numere de telefon (${phoneMatches.length} detectate)`);
  }

  return {
    score,
    reason: flags.length > 0 ? `Analiza text a detectat riscuri.` : '',
    flags
  };
}

/**
 * Motorul de Analiză a Imaginilor (Deep Vision API)
 * Comunică cu Sightengine pentru a analiza contextul, obiectele și textul de pe imagini.
 */
async function analyzeImageContent(imageUrl: string, apiUser: string, apiSecret: string): Promise<Omit<ModerationResult, 'safe'>> {
  let score = 0;
  const flags: string[] = [];

  try {
    // Modele folosite: nuditate 2.0, arme/droguri(wad), jignitor, spam/scam, OCR (text pe poză)
    const models = 'nudity-2.0,wad,offensive,scam,text-content';
    const endpoint = `https://api.sightengine.com/1.0/check.json?models=${models}&api_user=${apiUser}&api_secret=${apiSecret}&url=${encodeURIComponent(imageUrl)}`;
    
    const response = await fetch(endpoint, { method: 'GET', cache: 'no-store' });
    const data: SightengineResponse = await response.json();

    if (data.status !== 'success' || data.error) {
      console.warn(`[AI VISION WARN] Eroare de la Sightengine pentru poza ${imageUrl}:`, data.error);
      return { score: 0, reason: '', flags: ['Eroare scanare imagine'] };
    }

    // 1. Analiză Nuditate & Sugestiv (BDSM, Lumini Roșii Sugestive, Lenjerie)
    if (data.nudity) {
      const { suggestive, erotica, sexual_activity, safe } = data.nudity;
      
      if (erotica > 0.2 || sexual_activity > 0.2) {
        score += 200; // Ban instant
        flags.push(`Conținut Erotic Explicit (Erotica: ${erotica.toFixed(2)})`);
      } else if (suggestive > MODERATION_THRESHOLDS.SUGGESTIVE_IMAGE_LIMIT) {
        score += 80; // Risc masiv
        flags.push(`Conținut Sugestiv Ridicat (Sugestiv: ${suggestive.toFixed(2)})`);
      } else if (safe < 0.5) {
        score += 40; 
        flags.push(`Nivel de siguranță scăzut (Safe: ${safe.toFixed(2)})`);
      }
    }

    // 2. Analiză Arme, Droguri, Alcool
    if (data.wad) {
      if (data.wad.drugs > 0.4) { score += 100; flags.push('Detectare Droguri'); }
      if (data.wad.weapons > 0.4) { score += 100; flags.push('Detectare Arme'); }
    }

    // 3. Analiză Text pe Poză (Deseori escorte pun text peste poze cu "Ofer servicii")
    if (data.text?.profanity?.has_profanity) {
      score += 150;
      flags.push('Înjurături sau termeni interziși scriși direct pe fotografie');
    }

    // 4. Conținut Ofensator & Scam
    if (data.offensive && data.offensive.prob > MODERATION_THRESHOLDS.OFFENSIVE_IMAGE_LIMIT) {
      score += 60;
      flags.push(`Imagini ofensatoare (Probabilitate: ${data.offensive.prob.toFixed(2)})`);
    }
    if (data.scam && data.scam.prob > MODERATION_THRESHOLDS.SCAM_IMAGE_LIMIT) {
      score += 70;
      flags.push(`Posibil Scam/Fraudă vizuală detectată`);
    }

  } catch (err) {
    console.error(`[AI VISION ERROR] Scanarea imaginii a eșuat complet:`, err);
  }

  return {
    score,
    reason: flags.length > 0 ? 'Analiza vizuală a detectat nereguli.' : '',
    flags
  };
}

// ----------------------------------------------------------------------------
// 4. FORMATOR JURNALE AUDIT (Logging System)
// ----------------------------------------------------------------------------
function printAuditLog(textScore: number, imgScore: number, totalScore: number, allFlags: string[]) {
  const isBanned = totalScore >= MODERATION_THRESHOLDS.MAX_ALLOWED_SCORE;
  const statusIcon = isBanned ? '🔴 BLOCAT' : '🟢 APROBAT';
  
  console.log('\n========================================================');
  console.log(`🛡️  RENTLY AUDIT REPORT - ${new Date().toISOString()}`);
  console.log('========================================================');
  console.log(`STATUS:    ${statusIcon}`);
  console.log(`SCOR TOTAL: ${totalScore} / ${MODERATION_THRESHOLDS.MAX_ALLOWED_SCORE} (Limită)`);
  console.log(`DETALII:   Scor Text [${textScore}] | Scor Imagini [${imgScore}]`);
  
  if (allFlags.length > 0) {
    console.log('STEAGURI ROȘII (RED FLAGS):');
    allFlags.forEach((flag, i) => console.log(`  ${i + 1}. 🚩 ${flag}`));
  } else {
    console.log('STEAGURI:  Niciun risc detectat. Conținut imaculat. ✨');
  }
  console.log('========================================================\n');
}


// ----------------------------------------------------------------------------
// 5. HANDLER PRINCIPAL RUTA API (POST)
// ----------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text = '', imageUrls = [] }: { text: string, imageUrls: string[] } = body;

    let cumulativeScore = 0;
    let masterFlags: string[] = [];

    // --- ETAPA 1: ANALIZA TEXTULUI ---
    const textAnalysis = analyzeTextContent(text);
    cumulativeScore += textAnalysis.score;
    if (textAnalysis.flags.length > 0) {
      masterFlags = [...masterFlags, ...textAnalysis.flags];
    }

    // --- ETAPA 2: ANALIZA IMAGINILOR (PARALELIZATĂ PENTRU VITEZĂ MAXIMĂ) ---
    const apiUser = process.env.SIGHTENGINE_USER;
    const apiSecret = process.env.SIGHTENGINE_SECRET;
    let imageScore = 0;

    if (!apiUser || !apiSecret) {
      console.error("🚨 CRITIC: Cheile Sightengine (USER/SECRET) lipsesc din mediul de producție!");
      masterFlags.push("Sistemul AI Vizual este Offline - Chei lipsă");
    } else if (imageUrls.length > 0) {
      
      // Lansăm toate cererile către AI simultan pentru a nu ține utilizatorul pe loc
      const imagePromises = imageUrls.map(url => analyzeImageContent(url, apiUser, apiSecret));
      const imageResults = await Promise.all(imagePromises);

      // Agregăm scorurile imaginilor
      for (const res of imageResults) {
        imageScore += res.score;
        if (res.flags.length > 0) {
          masterFlags = [...masterFlags, ...res.flags];
        }
      }
      cumulativeScore += imageScore;
    }

    // --- ETAPA 3: DECIZIA FINALĂ (JUDGEMENT) ---
    const isSafe = cumulativeScore < MODERATION_THRESHOLDS.MAX_ALLOWED_SCORE;
    
    // Tipărim un jurnal detaliat în Vercel pentru tine (Developer)
    printAuditLog(textAnalysis.score, imageScore, cumulativeScore, masterFlags);

    // --- ETAPA 4: RĂSPUNS CĂTRE FRONTEND ---
    if (!isSafe) {
      // Generăm un motiv "politicos" dar ferm pentru utilizator
      const userReason = masterFlags[0] || 'Conținutul încalcă Termenii și Condițiile Rently.';
      return NextResponse.json(
        { 
          safe: false, 
          score: cumulativeScore,
          reason: userReason,
          internal_flags: masterFlags 
        },
        { status: 200 } // Răspundem cu 200, dar safe: false pentru a fi procesat de frontend
      );
    }

    return NextResponse.json({ 
      safe: true, 
      score: cumulativeScore,
      message: 'Conținut aprobat de Rently Guard.'
    });

  } catch (error: any) {
    console.error("💥 EROARE FATALĂ ÎN RUTINA DE MODERARE:", error.message || error);
    // Siguranța primează: dacă pică sistemul nostru intern de moderare, 
    // lăsăm fluxul să treacă temporar pentru a nu opri un business legitim (Fail Open).
    return NextResponse.json({ safe: true, fallback: true });
  }
}