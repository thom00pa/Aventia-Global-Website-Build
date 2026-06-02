// app/(main)/layout.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title:       'Aventia Global — Texas Technology & Services Company',
  description:
    'Aventia Global LLC operates 5 divisions across Texas: retail electricity, ' +
    'managed WiFi, tech hardware, AI data annotation, and drone services. ' +
    'Bilingual — servimos en inglés y español.',
  openGraph: {
    title:       'Aventia Global — Texas Technology & Services Company',
    description: 'Five divisions, one vision. Energy, internet, AI, hardware, and drones — all from Texas.',
    url:         'https://aventiaglobal.com',
    images: [
      {
        url:    'https://aventiaglobal.com/api/og?title=Aventia+Global&tagline=Five+Divisions%2C+One+Vision&color=%232563EB',
        width:  1200,
        height: 630,
        alt:    'Aventia Global — Technology & Services Company',
      },
    ],
  },
  twitter: {
    title:       'Aventia Global — Texas Technology & Services',
    description: 'Five divisions, one vision. Energy, internet, AI, hardware, and drones.',
    images: ['https://aventiaglobal.com/api/og?title=Aventia+Global&tagline=Five+Divisions%2C+One+Vision&color=%232563EB'],
  },
  alternates: {
    canonical: 'https://aventiaglobal.com',
  },
}

const organizationJsonLd = {
  '@context':   'https://schema.org',
  '@type':      'Organization',
  name:         'Aventia Global LLC',
  url:          'https://aventiaglobal.com',
  logo:         'https://aventiaglobal.com/logo.png',
  description:
    'Texas-based technology and services company with divisions in ' +
    'energy, internet, AI, hardware, and drone services.',
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Houston',
    addressRegion:     'TX',
    postalCode:        '77001',
    addressCountry:    'US',
  },
  contactPoint: {
    '@type':       'ContactPoint',
    telephone:     '+1-214-555-0000',
    contactType:   'customer service',
    availableLanguage: ['English', 'Spanish'],
  },
  sameAs: [
    'https://energy.aventiaglobal.com',
    'https://connect.aventiaglobal.com',
    'https://store.aventiaglobal.com',
    'https://ai.aventiaglobal.com',
    'https://drones.aventiaglobal.com',
  ],
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Fixed navbar — sits above all page content */}
      <Navbar />

      {/*
        Page content wrapper.
        pt-[72px] offsets the fixed navbar height.
        Hero sections that need to bleed behind the navbar
        should override with -mt-[72px] pt-[72px] on their own wrapper.
      */}
      <main className="min-h-screen pt-[72px]">
        {children}
      </main>
      <Footer />
    </>
  )
}
