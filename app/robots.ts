// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow: [
          '/api/',         // Never index API routes
          '/middleware-debug',
          '/typography',
          '/logo-test',
          '/button-test',
          '/card-test',
        ],
      },
    ],
    sitemap: 'https://aventiaglobal.com/sitemap.xml',
    host:    'https://aventiaglobal.com',
  }
}
