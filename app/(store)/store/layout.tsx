import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aventia Store — Coming Soon | Tech Hardware Texas',
  description:
    'Premium gaming gear, smart home devices, networking equipment, and ' +
    'tech accessories — coming soon to Texas. Join the waitlist for early access.',
}

export default function StoreLayout({
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
