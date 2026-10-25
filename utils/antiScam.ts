// utils/antiScam.ts

/**
 * ============================================================================
 * RENTLY ENTERPRISE SECURITY ENGINE - THREAT INTELLIGENCE MODULE
 * ============================================================================
 * Version: 1.0.0 (MVP)
 * Architecture: Multi-Vector Heuristic Analysis & NLP Pattern Matching
 * 
 * Acest modul procesează mesajele utilizatorilor printr-o cascadă de filtre:
 * 1. Sanitizare și Normalizare Text
 * 2. Analiză de Entropie (pentru text obfuscat)
 * 3. Fuzzy Matching (Algoritmul Levenshtein pentru typos/evaziune)
 * 4. Extragere de Entități (RegEx pentru IBAN, Crypto, URL-uri mascate)
 */

export interface ThreatIntelligenceReport {
    isBlocked: boolean;
    riskScore: number;
    confidenceLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    vectors: string[];
    metadata: {
      messageLength: number;
      entropyScore: number;
      extractedEntities: string[];
    };
    timestamp: string;
  }
  
  // ----------------------------------------------------------------------------
  // 1. CONFIGURAȚIE ȘI DICȚIONARE DE AMENINȚĂRI
  // ----------------------------------------------------------------------------
  
  const SECURITY_CONFIG = {
    BLOCK_THRESHOLD: 85,
    FLAG_THRESHOLD: 50,
    MAX_ENTROPY: 4.5, // Peste această valoare, textul este considerat spam/obfuscat
  };
  
  const THREAT_VECTORS = {
    FINANCIAL_ADVANCE: {
      weight: 45,
      terms: ["avans", "garantie", "transfer", "rezervare", "trimite bani", "plata inainte", "prima luna"]
    },
    OFF_PLATFORM_ROUTING: {
      weight: 35,
      terms: ["whatsapp", "wapp", "revolut", "telegram", "paypal", "western union", "moneygram", "airbnb", "booking"]
    },
    SCAM_NARRATIVES: {
      weight: 60,
      terms: ["plecat din tara", "sunt in strainatate", "cheile prin curier", "nu sunt in romania", "verific contul"]
    },
    URGENCY_MANIPULATION: {
      weight: 20,
      terms: ["urgent", "mai am oferte", "primul venit", "grabeste-te", "expira", "acum"]
    }
  };
  
  const REGEX_PATTERNS = {
    IBAN: /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/g,
    CRYPTO: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$|^(0x)[a-fA-F0-9]{40}$/g,
    PHONE: /(?:\+?40|0)\s*7\d{2}\s*\d{3}\s*\d{3}/g,
    OBSCURED_URL: /([a-zA-Z0-9_-]+(?:\s*\[dot\]\s*|\s*\.\s*|\s*dot\s*)[a-zA-Z]{2,6})/gi
  };
  
  // ----------------------------------------------------------------------------
  // 2. ALGORITMI MATEMATICI ȘI NLP
  // ----------------------------------------------------------------------------
  
  /**
   * Calculează Distanța Levenshtein între două șiruri de caractere.
   * Detectează variații și typo-uri (ex: "revolut" vs "rev0lut" vs "revoluț").
   * O(n*m) complexitate temporală.
   */
  function calculateLevenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,       // Deletion
          matrix[i][j - 1] + 1,       // Insertion
          matrix[i - 1][j - 1] + cost // Substitution
        );
      }
    }
    return matrix[a.length][b.length];
  }
  
  /**
   * Calculează Entropia Shannon pentru a detecta mesaje generate aleator
   * sau spam obfuscat masiv.
   */
  function calculateEntropy(str: string): number {
    const len = str.length;
    if (len === 0) return 0;
    
    const frequencies: Record<string, number> = {};
    for (let i = 0; i < len; i++) {
      frequencies[str[i]] = (frequencies[str[i]] || 0) + 1;
    }
    
    return Object.values(frequencies).reduce((sum, count) => {
      const p = count / len;
      return sum - p * Math.log2(p);
    }, 0);
  }
  
  /**
   * Curăță zgomotul din text (diacritice, caractere speciale, spații mascate).
   */
  function sanitizePayload(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Elimină diacriticele
      .replace(/[^a-z0-9\s]/g, " ")    // Păstrează doar alfanumerice
      .replace(/\s+/g, " ")            // Normalizează spațiile
      .trim();
  }
  
  // ----------------------------------------------------------------------------
  // 3. MOTORUL PRINCIPAL DE ANALIZĂ
  // ----------------------------------------------------------------------------
  
  export class RentlySecurityEngine {
    
    public static analyze(message: string): ThreatIntelligenceReport {
      let riskScore = 0;
      const vectors: string[] = [];
      const extractedEntities: string[] = [];
  
      if (!message || message.trim().length < 2) {
        return this.generateReport(0, [], { messageLength: 0, entropyScore: 0, extractedEntities: [] });
      }
  
      const cleanText = sanitizePayload(message);
      const textWithoutSpaces = cleanText.replace(/\s+/g, ""); // Pentru cuvinte tip "a v a n s"
      const words = cleanText.split(" ");
      
      // A. Analiza Entropiei (Spam/Zgomot)
      const entropy = calculateEntropy(textWithoutSpaces);
      if (entropy > SECURITY_CONFIG.MAX_ENTROPY) {
        riskScore += 40;
        vectors.push("HIGH_ENTROPY_DETECTED");
      }
  
      // B. Detecție RegEx (Date Sensibile)
      if (REGEX_PATTERNS.IBAN.test(message)) {
        riskScore += 90;
        vectors.push("IBAN_EXCHANGE");
        extractedEntities.push("IBAN");
      }
      
      if (REGEX_PATTERNS.CRYPTO.test(message)) {
        riskScore += 100; // Toleranță zero pentru crypto pe o platformă de chirii
        vectors.push("CRYPTO_WALLET_DETECTED");
        extractedEntities.push("CRYPTO_WALLET");
      }
  
      if (REGEX_PATTERNS.OBSCURED_URL.test(message)) {
        riskScore += 60;
        vectors.push("OBFUSCATED_EXTERNAL_LINK");
      }
  
      if (REGEX_PATTERNS.PHONE.test(message)) {
        riskScore += 15;
        vectors.push("EARLY_PHONE_EXCHANGE");
        extractedEntities.push("PHONE_NUMBER");
      }
  
      // C. Analiza Euristică și Fuzzy Matching
      for (const [category, config] of Object.entries(THREAT_VECTORS)) {
        let categoryTriggered = false;
  
        for (const term of config.terms) {
          // 1. Potrivire exactă sau ascunsă prin spații ("revolut" vs "r e v o l u t")
          if (cleanText.includes(term) || textWithoutSpaces.includes(term.replace(/\s+/g, ""))) {
            categoryTriggered = true;
          }
          
          // 2. Fuzzy Matching (pentru cuvinte lungi, permitem 1-2 greșeli - ex: "qarantie")
          if (!categoryTriggered && term.length > 5) {
            for (const word of words) {
              if (word.length > 4 && calculateLevenshteinDistance(term, word) <= 2) {
                categoryTriggered = true;
                break;
              }
            }
          }
  
          if (categoryTriggered) {
            riskScore += config.weight;
            vectors.push(`HEURISTIC_${category}`);
            break; // Oprim evaluarea termenilor din această categorie pentru a nu dubla scorul
          }
        }
      }
  
      // D. Analiza Comportamentală (Shouting)
      const upperCaseRatio = (message.match(/[A-Z]/g)?.length || 0) / message.length;
      if (upperCaseRatio > 0.6 && message.length > 20) {
        riskScore += 10;
        vectors.push("AGGRESSIVE_TYPING_STYLE");
      }
  
      return this.generateReport(riskScore, vectors, {
        messageLength: message.length,
        entropyScore: Number(entropy.toFixed(2)),
        extractedEntities
      });
    }
  
    private static generateReport(score: number, vectors: string[], metadata: any): ThreatIntelligenceReport {
      let confidence: ThreatIntelligenceReport["confidenceLevel"] = "LOW";
      
      if (score >= SECURITY_CONFIG.BLOCK_THRESHOLD) confidence = "CRITICAL";
      else if (score >= SECURITY_CONFIG.FLAG_THRESHOLD) confidence = "HIGH";
      else if (score >= 20) confidence = "MEDIUM";
  
      return {
        isBlocked: score >= SECURITY_CONFIG.BLOCK_THRESHOLD,
        riskScore: score,
        confidenceLevel: confidence,
        vectors,
        metadata,
        timestamp: new Date().toISOString()
      };
    }
  }