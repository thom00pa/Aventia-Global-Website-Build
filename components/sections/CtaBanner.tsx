// components/sections/CtaBanner.tsx
// PLACEHOLDER — Full implementation in Prompt 19.
import Link from 'next/link'
import { Button, ButtonGroup, SectionWrapper } from '@/components/shared'
import { ArrowRight, Zap } from 'lucide-react'

export default function CtaBanner() {
  return (
    <SectionWrapper bg="dark" id="contact">
      <div className="text-center" style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Label */}
        <div className="flex justify-center mb-6">
          <span
            className="font-sans font-semibold text-[12px] tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border:     '1px solid rgba(255,255,255,0.15)',
              color:      'rgba(255,255,255,0.6)',
            }}
          >
            Aventia Energy — Live Now
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-display font-bold"
          style={{
            fontSize:     'clamp(32px, 5vw, 52px)',
            lineHeight:   1.1,
            letterSpacing: '-0.02em',
            color:        '#FFFFFF',
            marginBottom: '16px',
          }}
        >
          Ready to Save on{' '}
          <span
            style={{
              background:           'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            Energy?
          </span>
        </h2>

        {/* Subheadline - bilingual */}
        <p
          className="font-sans"
          style={{
            fontSize:     '18px',
            lineHeight:   '1.7',
            color:        'rgba(255,255,255,0.65)',
            marginBottom: '12px',
          }}
        >
          Compare Texas electricity plans and switch in minutes.
          No paperwork, no long hold times, no hidden fees.
        </p>
        <p
          className="font-sans"
          style={{
            fontSize:     '16px',
            lineHeight:   '1.6',
            color:        'rgba(255,255,255,0.40)',
            marginBottom: '40px',
          }}
        >
          Compara planes de electricidad en Texas y cambia en minutos.
          Sin papeles, sin esperas, sin cargos ocultos.
        </p>

        {/* CTAs */}
        <ButtonGroup align="center" gap="lg">
          <Button
            asChild
            variant="primary"
            size="lg"
            leftIcon={<Zap size={18} />}
            rightIcon={<ArrowRight size={18} />}
          >
            <Link href="https://energy.aventiaglobal.com">
              Compare Plans
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            style={{
              background:   'transparent',
              borderColor:  'rgba(255,255,255,0.25)',
              color:        'rgba(255,255,255,0.80)',
            }}
          >
            <Link href="#divisions">
              View All Divisions
            </Link>
          </Button>
        </ButtonGroup>

        {/* Reassurance */}
        <p
          className="font-sans text-[13px] mt-8"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          Texas PUC Licensed · No cancellation fees · Bilingual support
        </p>
      </div>
    </SectionWrapper>
  )
}
