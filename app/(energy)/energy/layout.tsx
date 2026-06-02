// app/(energy)/energy/layout.tsx
import type { Metadata } from 'next'
import EnergyNavbar from '@/components/shared/EnergyNavbar'
import Footer       from '@/components/shared/Footer'

export const metadata: Metadata = {
  title:       'Aventia Energy — Texas Electricity Plans | Save on Your Energy Bill',
  description:
    'Switch and save on your Texas electricity bill. Aventia Energy offers ' +
    'residential and commercial electricity plans with rates from $0.099/kWh. ' +
    'Bilingual enrollment — English and Spanish. No setup fees.',
  keywords: [
    'Texas electricity', 'retail electric provider', 'electricity plans Texas',
    'save on energy bill', 'Aventia Energy', 'luz electrica Texas', 'energia electrica',
    'planes de electricidad Texas', 'comercial electricity Texas',
  ],
  openGraph: {
    title:       'Aventia Energy — Texas Electricity Plans from $0.099/kWh',
    description:
      'Compare electricity plans for your Texas home or business. ' +
      'Rates from $0.099/kWh. Bilingual enrollment. No setup fees.',
    url:         'https://energy.aventiaglobal.com',
    images: [
      {
        url:
          'https://aventiaglobal.com/api/og?' +
          'title=Aventia+Energy&' +
          'tagline=Texas+Electricity+from+%240.099%2FkWh&' +
          'color=%23D97706',
        width:  1200,
        height: 630,
        alt:    'Aventia Energy — Texas Electricity Plans',
      },
    ],
  },
  twitter: {
    title:       'Aventia Energy — Texas Electricity Plans',
    description: 'Rates from $0.099/kWh. Bilingual enrollment. No setup fees.',
    images: [
      'https://aventiaglobal.com/api/og?title=Aventia+Energy&tagline=Texas+Electricity+from+%240.099%2FkWh&color=%23D97706',
    ],
  },
  alternates: {
    canonical: 'https://energy.aventiaglobal.com',
    languages: {
      'en-US': 'https://energy.aventiaglobal.com',
      'es-MX': 'https://energy.aventiaglobal.com',
    },
  },
}

const energyJsonLd = {
  '@context':   'https://schema.org',
  '@type':      ['LocalBusiness', 'EnergyConsumptionDetails'],
  name:         'Aventia Energy',
  description:
    'Retail electricity broker offering residential and commercial ' +
    'electricity plans for Texas homes and businesses.',
  url:          'https://energy.aventiaglobal.com',
  telephone:    '+1-214-555-0000',
  email:        'energy@aventiaglobal.com',
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Houston',
    addressRegion:     'TX',
    addressCountry:    'US',
  },
  areaServed: {
    '@type': 'State',
    name:    'Texas',
  },
  serviceType:  'Retail Electricity Provider',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card, Check',
  openingHours: 'Mo-Fr 08:00-19:00',
  availableLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Spanish' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name:    'Texas Electricity Plans',
    itemListElement: [
      {
        '@type':       'Offer',
        name:          'Starter Plan',
        description:   'Variable rate electricity plan, month-to-month',
        price:         '0.099',
        priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'kWh' },
      },
      {
        '@type':       'Offer',
        name:          'Standard Plan',
        description:   '12-month fixed rate electricity plan',
        price:         '0.109',
        priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'kWh' },
      },
      {
        '@type':       'Offer',
        name:          'Premium Plan',
        description:   '24-month fixed rate electricity plan',
        price:         '0.119',
        priceCurrency: 'USD',
        priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'kWh' },
      },
    ],
  },
}

export default function EnergyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(energyJsonLd) }}
      />
      <EnergyNavbar />
      <main className="min-h-screen pt-[72px]">
        {children}
      </main>
      <Footer />
    </>
  )
}
