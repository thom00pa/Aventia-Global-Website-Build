// app/(main)/layout.tsx
import type { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Aventia Global — Technology. Energy. Innovation.',
    template: '%s | Aventia Global',
  },
  description:
    'Aventia Global is a multi-division technology company based in Texas. Energy, internet, tech hardware, AI data services, and drone innovation — all under one brand.',
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
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
