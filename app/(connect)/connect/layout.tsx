// app/(connect)/connect/layout.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Aventia Connect — Coming Soon | Business & Home Internet Texas',
  description:
    'Managed WiFi and internet solutions for Texas businesses and homes. ' +
    'Join the waitlist for early access.',
}

export default function ConnectLayout({
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
