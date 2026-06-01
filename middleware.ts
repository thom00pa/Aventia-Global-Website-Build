// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Subdomain routing middleware for Aventia Global.
 *
 * Maps inbound hostnames to Next.js route groups:
 *   aventiaglobal.com           → /(main)
 *   energy.aventiaglobal.com    → /(energy)
 *   connect.aventiaglobal.com   → /(connect)
 *   store.aventiaglobal.com     → /(store)
 *   ai.aventiaglobal.com        → /(ai)
 *   drones.aventiaglobal.com    → /(drones)
 *
 * Local development uses subdomain.localhost:3000 pattern.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Strip port for local dev (e.g. "energy.localhost:3000" → "energy.localhost")
  const hostWithoutPort = hostname.split(':')[0]

  // Determine which subdomain is being accessed
  const subdomain = hostWithoutPort
    .replace('.aventiaglobal.com', '')
    .replace('.localhost', '')

  // Map subdomain to route group path prefix
  const subdomainToRoute: Record<string, string> = {
    aventiaglobal: '', // root domain — no rewrite needed
    www: '', // www → main
    energy: '/energy',
    connect: '/connect',
    store: '/store',
    ai: '/ai',
    drones: '/drones',
  }

  // If accessing root domain or www, serve (main) route group
  if (
    hostWithoutPort === 'aventiaglobal.com' ||
    hostWithoutPort === 'www.aventiaglobal.com' ||
    hostWithoutPort === 'localhost'
  ) {
    return NextResponse.next()
  }

  const routePrefix = subdomainToRoute[subdomain]

  if (routePrefix !== undefined) {
    // Rewrite the URL to the matching route group path
    url.pathname = routePrefix + url.pathname
    return NextResponse.rewrite(url)
  }

  // Unknown subdomain → redirect to main site
  url.hostname = 'aventiaglobal.com'
  url.pathname = '/'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
