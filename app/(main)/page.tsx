// app/(main)/page.tsx
import HeroSection      from '@/components/sections/HeroSection'
import StatsBar         from '@/components/sections/StatsBar'
import DivisionsGrid    from '@/components/sections/DivisionsGrid'
import AboutSection     from '@/components/sections/AboutSection'
import LanguagesStrip   from '@/components/sections/LanguagesStrip'
import CtaBanner        from '@/components/sections/CtaBanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <DivisionsGrid />
      <AboutSection />
      <LanguagesStrip />
      <CtaBanner />
    </>
  )
}
