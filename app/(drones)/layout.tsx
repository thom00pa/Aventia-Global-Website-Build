import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aventia Drones — Launching Q3 2026 | Aerial Imaging Texas',
  description:
    'Professional aerial imaging, infrastructure inspection, agricultural ' +
    'surveys, and event coverage launching in Texas. Join the waitlist for ' +
    'priority access when we launch.',
}

export default function DronesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
