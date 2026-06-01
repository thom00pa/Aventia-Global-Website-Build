// components/sections/AboutSection.tsx
// PLACEHOLDER — Full implementation in Prompt 17.
import Link from 'next/link'
import { SectionWrapper, SectionHeading, Button } from '@/components/shared'
import { MapPin, Users, Zap, Globe } from 'lucide-react'

const PILLARS = [
  {
    icon: MapPin,
    titleEn: 'Based in Texas',
    titleEs: 'Con sede en Texas',
    descEn: 'We operate from the heart of Texas — understanding local energy markets, regulations, and the people we serve.',
    descEs: 'Operamos desde el corazón de Texas, entendiendo los mercados de energía locales, las regulaciones y las personas a quienes servimos.',
  },
  {
    icon: Users,
    titleEn: 'Bilingual by Design',
    titleEs: 'Bilingüe por Diseño',
    descEn: 'Every product, every form, every support call — available in English and Spanish from day one.',
    descEs: 'Cada producto, cada formulario, cada llamada de soporte — disponible en inglés y español desde el primer día.',
  },
  {
    icon: Zap,
    titleEn: 'Starting with Energy',
    titleEs: 'Empezando con Energía',
    descEn: 'Aventia Energy is live now. We help Texas homes and businesses switch to better electricity rates — no hassle, no hidden fees.',
    descEs: 'Aventia Energy está activo ahora. Ayudamos a hogares y empresas de Texas a cambiarse a mejores tarifas eléctricas.',
  },
  {
    icon: Globe,
    titleEn: 'Built to Expand',
    titleEs: 'Construido para Crecer',
    descEn: 'Five divisions in progress. Connect, Store, AI, and Drones are coming — each solving a real problem for Texas and beyond.',
    descEs: 'Cinco divisiones en progreso. Connect, Store, AI y Drones están por llegar.',
  },
] as const

export default function AboutSection() {
  return (
    <SectionWrapper bg="blue-tint" id="about">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left: copy */}
        <div>
          <SectionHeading
            label="About Us"
            labelEs="Nosotros"
            headline="Built in Texas. Built for Growth."
            headlineEs="Construido en Texas. Para Crecer."
            subheadline="We're operators, builders, and problem-solvers based in Texas. Aventia Global started with a simple mission: make technology and energy work better for everyday people — in English and in Spanish."
            subheadlineEs="Somos operadores, constructores y solucionadores de problemas con sede en Texas. Aventia Global comenzó con una misión simple: hacer que la tecnología y la energía funcionen mejor para las personas — en inglés y en español."
            align="left"
            locale="en"
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="primary"
            >
              <Link href="https://energy.aventiaglobal.com">
                Get Started with Energy
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Right: pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.titleEn}
                className="p-5 rounded-2xl"
                style={{
                  background:   'var(--white)',
                  border:       '1px solid var(--border)',
                  boxShadow:    'var(--shadow-sm)',
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                  style={{
                    background: 'rgba(37,99,235,0.08)',
                    color:      'var(--accent-blue)',
                  }}
                >
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3
                  className="font-display font-semibold text-[16px] mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {pillar.titleEn}
                </h3>
                <p
                  className="font-sans text-[13px] leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {pillar.descEn}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
