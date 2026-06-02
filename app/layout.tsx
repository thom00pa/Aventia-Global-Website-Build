// app/layout.tsx
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { fontVariables } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://aventiaglobal.com'),
  title: {
    default: 'Aventia Global — Energy, Internet, AI & More | Texas',
    template: '%s | Aventia Global',
  },
  description:
    'Aventia Global LLC is a Texas-based technology company with 5 divisions: ' +
    'retail electricity (Aventia Energy), managed WiFi (Aventia Connect), tech ' +
    'hardware (Aventia Store), AI data annotation (Aventia AI), and aerial drone ' +
    'services (Aventia Drones). Bilingual — English and Spanish.',
  keywords: [
    'Aventia Global', 'Aventia Energy', 'Texas electricity', 'retail electric provider',
    'managed WiFi Texas', 'AI data annotation', 'drone services Texas',
    'tech hardware', 'bilingual energy', 'electricity español',
  ],
  authors: [{ name: 'Aventia Global LLC', url: 'https://aventiaglobal.com' }],
  creator: 'Aventia Global LLC',
  publisher: 'Aventia Global LLC',
  openGraph: {
    type:            'website',
    siteName:        'Aventia Global',
    locale:          'en_US',
    alternateLocale: ['es_MX'],
    images: [
      {
        url:    '/api/og?title=Aventia+Global&tagline=Energy%2C+Internet%2C+AI+%26+More&color=%232563EB',
        width:  1200,
        height: 630,
        alt:    'Aventia Global LLC — Technology & Services Company',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@AventiaGlobal',
    creator:     '@AventiaGlobal',
    images: ['/api/og?title=Aventia+Global&tagline=Energy%2C+Internet%2C+AI+%26+More&color=%232563EB'],
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
  alternates: {
    canonical: 'https://aventiaglobal.com',
    languages: {
      'en-US': 'https://aventiaglobal.com',
      'es-MX': 'https://aventiaglobal.com',
    },
  },
  verification: {
    // Add Google Search Console verification key here when available:
    // google: 'YOUR_VERIFICATION_CODE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
    >
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
