import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================================
// 🛡️ RENTLY ENTERPRISE EDGE WAF (WEB APPLICATION FIREWALL)
// ============================================================================
// Arhitectură: Vercel Edge Network
// Funcționalități: IP Blacklisting, Geo-Blocking, Rate Limiting, Bot Detection
// ============================================================================

// ----------------------------------------------------------------------------
// 1. CONFIGURAȚIE GLOBALĂ DE SECURITATE
// ----------------------------------------------------------------------------
const SECURITY_CONFIG = {
  // Limita de cereri per IP pe minut (prevenire DDoS și Spam)
  RATE_LIMIT: {
    MAX_REQUESTS: 60,
    WINDOW_MS: 60000, 
  },
  // Țări blocate automat la nivel de rețea (coduri ISO 3166-1 alpha-2)
  BLOCKED_COUNTRIES: new Set(['RU', 'CN', 'KP', 'IR', 'BY', 'SY']),
  // Boți și Scraperi cunoscuți care consumă resurse
  MALICIOUS_USER_AGENTS: [
    'curl', 'wget', 'python-requests', 'scrapy', 'postman', 
    'nmap', 'sqlmap', 'zmeu', 'nikto', 'dirbuster'
  ],
  // IP-uri confirmate pentru activități frauduloase
  BANNED_IPS: new Set([
    '203.0.113.50',
    '198.51.100.25',
    '185.15.59.224' // Ransomware node examplu
  ])
};

// ----------------------------------------------------------------------------
// 2. STARE IN-MEMORY PENTRU RATE LIMITING (Edge Compatible)
// ----------------------------------------------------------------------------
// Notă: În producție mass-scale se folosește Redis (ex: Upstash), dar pentru 
// MVP și Vercel Edge, acest Map în memorie oferă o protecție robustă per instanță.
interface RateLimitData {
  count: number;
  resetTime: number;
}
const rateLimitCache = new Map<string, RateLimitData>();

// ----------------------------------------------------------------------------
// 3. MOTOARE DE DETECȚIE (HEURISTICI)
// ----------------------------------------------------------------------------

/**
 * Verifică dacă IP-ul a depășit limita de trafic permisă (Rate Limiting)
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestData = rateLimitCache.get(ip);

  if (!requestData) {
    // Prima cerere de la acest IP
    rateLimitCache.set(ip, { count: 1, resetTime: now + SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS });
    return false;
  }

  if (now > requestData.resetTime) {
    // Fereastra de timp a expirat, resetăm contorul
    rateLimitCache.set(ip, { count: 1, resetTime: now + SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS });
    return false;
  }

  if (requestData.count >= SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS) {
    return true; // IP-ul a atins limita de cereri
  }

  // Incrementăm contorul
  requestData.count += 1;
  return false;
}

/**
 * Analizează User-Agent-ul pentru a detecta scripturi automate
 */
function isMaliciousBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // Traficul legitim are mereu un User-Agent
  
  const normalizedUA = userAgent.toLowerCase();
  return SECURITY_CONFIG.MALICIOUS_USER_AGENTS.some(bot => normalizedUA.includes(bot));
}

/**
 * Curăță memoria cache a rate-limiter-ului pentru a preveni memory leaks
 * (Executat probabilistic la 1% din cereri pentru eficiență)
 */
function cleanupCache() {
  if (Math.random() < 0.01) {
    const now = Date.now();
    for (const [ip, data] of rateLimitCache.entries()) {
      if (now > data.resetTime) {
        rateLimitCache.delete(ip);
      }
    }
  }
}

// ----------------------------------------------------------------------------
// 4. GENERATOR DE RĂSPUNSURI BLOCATE (Securizate)
// ----------------------------------------------------------------------------
function generateBlockResponse(reason: string, status: number, req: NextRequest): NextResponse {
  console.warn(`[WAF INTERCEPT] Blocked request to ${req.nextUrl.pathname} | Reason: ${reason}`);
  
  // Returnăm un JSON structurat în caz că cererea a fost către API
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Forbidden by Rently WAF', 
        code: status,
        reason: reason,
        incident_id: crypto.randomUUID()
      }),
      { status, headers: { 'content-type': 'application/json' } }
    );
  }

  // Pentru pagini vizuale, returnăm un ecran simplu de eroare
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Access Denied | Rently Security</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui, sans-serif; background: #020617; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .container { text-align: center; max-width: 500px; padding: 2rem; background: #0f172a; border-radius: 1rem; border: 1px solid #334155; }
          h1 { color: #ef4444; }
          p { color: #94a3b8; line-height: 1.5; }
          .incident { margin-top: 1.5rem; font-family: monospace; font-size: 0.875rem; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔒 Access Denied</h1>
          <p>Your request was blocked by the Rently Edge Security Network. If you believe this is an error, please contact support.</p>
          <p class="incident">Reason: ${reason}<br>Ray ID: ${crypto.randomUUID()}</p>
        </div>
      </body>
    </html>`,
    { status, headers: { 'content-type': 'text/html' } }
  );
}

// ----------------------------------------------------------------------------
// 5. FUNCȚIA MIDDLEWARE PRINCIPALĂ
// ----------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  cleanupCache();

  // 1. Extragere Metadate Client
  const clientIp = request.ip || 
                   request.headers.get('x-real-ip') || 
                   request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   'Unknown';
                   
  const userAgent = request.headers.get('user-agent');
  
  // Extragerea țării de proveniență oferită nativ de Vercel Edge
  // (Funcționează exclusiv în mediul de producție Vercel)
  const country = request.geo?.country || 'Unknown';

  // 2. SCUTUL 1: IP Blacklist Check
  if (SECURITY_CONFIG.BANNED_IPS.has(clientIp)) {
    return generateBlockResponse('IP Address in Blacklist', 403, request);
  }

  // 3. SCUTUL 2: Geo-Blocking
  if (SECURITY_CONFIG.BLOCKED_COUNTRIES.has(country)) {
    return generateBlockResponse(`Traffic from region [${country}] is restricted`, 451, request);
  }

  // 4. SCUTUL 3: Bot & Scraper Detection
  if (isMaliciousBot(userAgent)) {
    return generateBlockResponse('Malicious User-Agent / Automated Scraper Detected', 403, request);
  }

  // 5. SCUTUL 4: Rate Limiting (Protecție DDoS)
  if (clientIp !== 'Unknown' && isRateLimited(clientIp)) {
    return generateBlockResponse('Too Many Requests (Rate Limit Exceeded)', 429, request);
  }

  // 6. Manipulare Headere (Adăugăm headere de securitate HSTS & X-Frame-Options)
  const response = NextResponse.next();
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}

// ----------------------------------------------------------------------------
// 6. CONFIGURARE RUTE MIDDLEWARE
// ----------------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Rulează acest scut de securitate pe absolut toate rutele aplicației,
     * EXCEPTÂND fișierele statice (imagini, fonturi, CSS) pentru a nu 
     * consuma resurse inutile la randarea elementelor de design.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)',
  ],
};