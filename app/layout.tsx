// app/layout.tsx
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Aventia Global — Technology. Energy. Innovation.',
    template: '%s | Aventia Global',
  },
  description:
    'Aventia Global is a multi-division technology and services company based in Texas. We power homes with clean energy, connect businesses with managed WiFi, and build the future with AI and drones.',
  keywords: [
    'Aventia Global',
    'Texas electricity',
    'managed WiFi',
    'AI annotation',
    'drone services',
    'tech company Texas',
  ],
  authors: [{ name: 'Aventia Global LLC' }],
  creator: 'Aventia Global LLC',
  metadataBase: new URL('https://aventiaglobal.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_MX',
    url: 'https://aventiaglobal.com',
    siteName: 'Aventia Global',
    title: 'Aventia Global — Technology. Energy. Innovation.',
    description:
      'A multi-division technology company powering Texas homes, businesses, and beyond.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aventia Global',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aventia Global',
    description: 'Technology. Energy. Innovation.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Exo 2, DM Sans, JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
