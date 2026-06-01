// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────

const PROD_DOMAIN = 'aventiaglobal.com'
const LOCALE_COOKIE = 'NEXT_LOCALE'
const DEFAULT_LOCALE = 'en'
const SUPPORTED_LOCALES = ['en', 'es'] as const

/**
 * Subdomain → route path prefix mapping.
 *
 * These prefixes match the actual folder structure Cursor created:
 *   app/(energy)/energy/page.tsx → pathname must become /energy/...
 *   app/(connect)/connect/page.tsx → pathname must become /connect/...
 *   etc.
 */
const SUBDOMAIN_ROUTES: Record<string, string> = {
  energy: '/energy',
  connect: '/connect',
  store: '/store',
  ai: '/ai',
  drones: '/drones',
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * Extracts the subdomain from a hostname string.
 *
 * Handles:
 *   energy.aventiaglobal.com  → 'energy'   (production)
 *   energy.localhost           → 'energy'   (local dev)
 *   aventiaglobal.com          → null       (root domain)
 *   localhost                  → null       (root local)
 *   www.aventiaglobal.com      → 'www'      (www — redirect to root)
 */
function getSubdomain(hostname: string): string | null {
  // Strip port number (e.g. "energy.localhost:3000" → "energy.localhost")
  const host = hostname.split(':')[0]

  // Production subdomain: *.aventiaglobal.com
  if (host.endsWith(`.${PROD_DOMAIN}`)) {
    const sub = host.slice(0, host.length - PROD_DOMAIN.length - 1)
    return sub || null
  }

  // Local dev subdomain: *.localhost
  // Modern browsers (Chrome, Edge, Firefox) resolve *.localhost natively.
  // No hosts file edit required.
  if (host.endsWith('.localhost') && host !== 'localhost') {
    return host.slice(0, host.length - '.localhost'.length)
  }

  return null
}

/**
 * Reads the locale from the NEXT_LOCALE cookie.
 * Falls back to DEFAULT_LOCALE if missing or unsupported.
 */
function getLocaleFromRequest(request: NextRequest): string {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (fromCookie && (SUPPORTED_LOCALES as readonly string[]).includes(fromCookie)) {
    return fromCookie
  }

  // Check Accept-Language header as secondary signal
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  if (acceptLanguage.toLowerCase().startsWith('es')) {
    return 'es'
  }

  return DEFAULT_LOCALE
}

/**
 * Attaches the resolved locale as a request header so
 * server components and lib/i18n.ts can read it without
 * re-parsing the cookie.
 */
function withLocaleHeader(
  response: NextResponse,
  locale: string
): NextResponse {
  response.headers.set('x-locale', locale)
  return response
}

/**
 * Attaches routing debug headers (only in development).
 * These show up in the browser DevTools Network tab.
 */
function withDebugHeaders(
  response: NextResponse,
  info: {
    hostname: string
    subdomain: string | null
    rewrittenPath: string | null
    locale: string
  }
): NextResponse {
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('x-aventia-hostname', info.hostname)
    response.headers.set('x-aventia-subdomain', info.subdomain ?? 'none')
    response.headers.set('x-aventia-rewrite', info.rewrittenPath ?? 'none')
    response.headers.set('x-aventia-locale', info.locale)
  }
  return response
}

// ─────────────────────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? 'localhost'
  const { pathname, search } = request.nextUrl

  const subdomain = getSubdomain(hostname)
  const locale = getLocaleFromRequest(request)

  // ── Case 1: Root domain or bare localhost ──────────────────
  // No rewrite needed — serve the (main) route group directly.
  if (!subdomain) {
    const response = NextResponse.next()
    withLocaleHeader(response, locale)
    withDebugHeaders(response, {
      hostname,
      subdomain: null,
      rewrittenPath: null,
      locale,
    })
    return response
  }

  // ── Case 2: www subdomain → redirect to root domain ────────
  if (subdomain === 'www') {
    const url = request.nextUrl.clone()
    // Keep pathname + search, just remove www
    if (process.env.NODE_ENV === 'production') {
      url.hostname = PROD_DOMAIN
    } else {
      // In dev, www.localhost → localhost
      url.hostname = 'localhost'
    }
    return NextResponse.redirect(url, { status: 301 })
  }

  // ── Case 3: Known division subdomain → rewrite path ────────
  const routePrefix = SUBDOMAIN_ROUTES[subdomain]

  if (routePrefix) {
    const url = request.nextUrl.clone()

    // Rewrite: energy.aventiaglobal.com/plans → /energy/plans
    // Rewrite: energy.aventiaglobal.com/      → /energy
    url.pathname =
      pathname === '/'
        ? routePrefix
        : `${routePrefix}${pathname}`

    // Preserve query string
    url.search = search

    const response = NextResponse.rewrite(url)
    withLocaleHeader(response, locale)
    withDebugHeaders(response, {
      hostname,
      subdomain,
      rewrittenPath: url.pathname,
      locale,
    })
    return response
  }

  // ── Case 4: Unknown subdomain → redirect to main site ──────
  // e.g. random.aventiaglobal.com → aventiaglobal.com
  const fallbackUrl = request.nextUrl.clone()
  if (process.env.NODE_ENV === 'production') {
    fallbackUrl.hostname = PROD_DOMAIN
  } else {
    fallbackUrl.hostname = 'localhost'
  }
  fallbackUrl.pathname = '/'
  fallbackUrl.search = ''
  return NextResponse.redirect(fallbackUrl, { status: 302 })
}

// ─────────────────────────────────────────────────────────────
// MATCHER
// ─────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match ALL paths EXCEPT:
     * - _next/static  (Next.js static assets)
     * - _next/image   (Next.js image optimization)
     * - favicon.ico
     * - Static file extensions: images, fonts, manifests, robots, sitemap
     *
     * API routes (/api/*) intentionally INCLUDED so API calls from
     * a subdomain origin are correctly handled.
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt|woff|woff2|ttf|otf|eot)$).*)',
  ],
}
