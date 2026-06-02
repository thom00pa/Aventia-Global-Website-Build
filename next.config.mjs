// next.config.mjs — Next.js 14 requires .mjs/.js (not .ts)
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Performance ──────────────────────────────────────────
  reactStrictMode: true,

  // Remove X-Powered-By: Next.js header (minor security hygiene)
  poweredByHeader: false,

  // Compress responses with gzip
  compress: true,

  // ── Images ───────────────────────────────────────────────
  images: {
    // Prefer AVIF then WebP for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Allow current external image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod.spline.design',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Disable SVG image optimization for security hardening
    dangerouslyAllowSVG: false,
  },

  // ── Security headers (applied to all routes) ─────────────
  async headers() {
    const securityHeaders = [
      // Prevent MIME-type sniffing
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      // Prevent the site from being embedded in an iframe (clickjacking)
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      // Force HTTPS for 1 year (includeSubDomains covers all subdomains)
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      },
      // Control referrer information
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      // Disable access to sensitive browser features
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=()',
      },
      // Basic XSS protection for older browsers
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
    ]

    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // ── Redirects ─────────────────────────────────────────────
  async redirects() {
    return [
      // www → apex (canonical domain)
      // Vercel handles this in the domain dashboard, but this
      // serves as a fallback for any traffic that bypasses Vercel.
      {
        source: '/',
        has: [{ type: 'host', value: 'www.aventiaglobal.com' }],
        destination: 'https://aventiaglobal.com',
        permanent: true,
      },
    ]
  },

  // Turbopack config (Next 14+)
  experimental: {
    turbo: {},
  },
}

export default withNextIntl(nextConfig)
