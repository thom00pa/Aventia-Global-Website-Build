// components/sections/HeroSection.tsx
// PLACEHOLDER — Full animated implementation added in Prompt 13/14.
'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button, ButtonGroup } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'

export default function HeroSection() {
  const { locale } = useLocale()

  return (
    <div
      // Extend behind the fixed navbar by negating the layout's pt-[72px]
      className="-mt-[72px] pt-[72px] relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        backgroundImage: `
          radial-gradient(at 40% 20%, rgba(37,99,235,0.12) 0px, transparent 50%),
          radial-gradient(at 80% 0%,   rgba(8,145,178,0.10) 0px, transparent 50%),
          radial-gradient(at 0%  50%,  rgba(37,99,235,0.08) 0px, transparent 50%),
          radial-gradient(at 60% 80%,  rgba(8,145,178,0.06) 0px, transparent 50%)
        `,
      }}
    >
      {/* ── Content ─────────────────────────────────────────── */}
      <div
        className="container-aventia text-center"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        {/* Section label */}
        <div className="flex justify-center mb-6">
          <span className="section-label">
            {locale === 'es'
              ? 'Bienvenidos a Aventia Global'
              : 'Welcome to Aventia Global'}
          </span>
        </div>

        {/* Hero headline */}
        <h1
          className="hero-headline"
          style={{
            color: 'var(--text-primary)',
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          {locale === 'es' ? (
            <>
              Una Empresa.{' '}
              <span
                style={{
                  background:           'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                }}
              >
                Cinco Divisiones.
              </span>{' '}
              Potencial Ilimitado.
            </>
          ) : (
            <>
              One Company.{' '}
              <span
                style={{
                  background:           'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                }}
              >
                Five Divisions.
              </span>{' '}
              Limitless Potential.
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p
          className="font-sans"
          style={{
            fontSize:   '20px',
            lineHeight: '1.7',
            color:      'var(--text-secondary)',
            maxWidth:   '640px',
            margin:     '24px auto 0',
          }}
        >
          {locale === 'es'
            ? 'Aventia Global ofrece ahorro de energía, internet rápido, tecnología premium, servicios de IA e innovación aérea — todo desde Texas.'
            : 'Aventia Global delivers energy savings, fast internet, premium tech, AI services, and aerial innovation — all from Texas.'}
        </p>

        {/* CTA buttons */}
        <ButtonGroup align="center" gap="md" className="mt-10">
          <Button
            asChild
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={18} />}
          >
            <Link href="#divisions">
              {locale === 'es' ? 'Ver Divisiones' : 'Explore Our Divisions'}
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
          >
            <Link href="#about">
              {locale === 'es' ? 'Sobre Aventia' : 'About Aventia'}
            </Link>
          </Button>
        </ButtonGroup>

        {/* Trust line */}
        <p
          className="font-sans font-medium"
          style={{
            fontSize:  '13px',
            color:     'var(--text-muted)',
            marginTop: '20px',
          }}
        >
          {locale === 'es'
            ? '🇺🇸 Empresa de Texas · Certificada · Bilingüe'
            : '🇺🇸 Texas-based · Licensed · Bilingual'}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
        aria-hidden="true"
      >
        <ChevronDown
          size={20}
          style={{ color: 'var(--text-muted)', opacity: 0.5 }}
        />
      </div>

      {/* PLACEHOLDER label — remove in Prompt 13 */}
      <div
        className="absolute bottom-4 right-4 font-mono text-[10px] px-2 py-1 rounded opacity-40"
        style={{
          background: 'rgba(0,0,0,0.1)',
          color:      'var(--text-muted)',
        }}
        aria-hidden="true"
      >
        Placeholder → replaced in Prompt 13/14
      </div>
    </div>
  )
}
