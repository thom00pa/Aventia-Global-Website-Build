import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aventia AI — Coming Soon | Data Annotation & AI Training Data',
  description:
    'Enterprise AI data annotation in English, Spanish, and Portuguese. ' +
    'Text, image, audio, and conversation datasets for machine learning teams. ' +
    'Join the waitlist or submit a project inquiry.',
}

export default function AILayout({
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
