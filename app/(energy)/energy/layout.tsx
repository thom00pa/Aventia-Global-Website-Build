// app/(energy)/energy/layout.tsx
import type { Metadata } from 'next'
import EnergyNavbar from '@/components/shared/EnergyNavbar'
import Footer       from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default:  'Aventia Energy — Texas Electricity Plans',
    template: '%s | Aventia Energy',
  },
  description:
    'Compare Texas electricity plans and switch in minutes. Aventia Energy helps Texas homes and businesses save on energy with transparent rates, no hidden fees, and bilingual support.',
  keywords: [
    'Texas electricity',
    'energy plans Texas',
    'compare electricity rates',
    'electric company Texas',
    'electricidad Texas',
    'planes de energía Texas',
    'Aventia Energy',
  ],
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       'https://energy.aventiaglobal.com',
    siteName:  'Aventia Energy',
    title:     'Aventia Energy — Texas Electricity Plans',
    description:
      'Save on Texas electricity. Compare plans, calculate your savings, and switch in minutes.',
    images: [{ url: '/og-energy.png', width: 1200, height: 630 }],
  },
}

export default function EnergyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <EnergyNavbar />
      <main className="min-h-screen pt-[72px]">
        {children}
      </main>
      <Footer />
    </>
  )
}
