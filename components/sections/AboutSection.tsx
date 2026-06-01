// components/sections/AboutSection.tsx
'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Globe,
  Zap,
  Users,
  ArrowRight,
  Building2,
  CheckCircle2,
  Navigation,
} from 'lucide-react'
import { SectionWrapper } from '@/components/shared'
import { Button } from '@/components/shared/Button'
import { useLocale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const leftContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const fadeUpVariants = {
  hidden:   { opacity: 0, y: 22 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const KEY_FACTS = [
  {
    id:     'location',
    Icon:   Building2,
    textEn: 'Texas LLC — Actively registered',
    textEs: 'LLC de Texas — Activamente registrada',
  },
  {
    id:     'bilingual',
    Icon:   Globe,
    textEn: 'Bilingual: English + Spanish',
    textEs: 'Bilingüe: Inglés + Español',
  },
  {
    id:     'live',
    Icon:   Zap,
    textEn: 'Aventia Energy: Live now in Texas',
    textEs: 'Aventia Energy: En vivo en Texas',
    highlight: true,
  },
] as const

const PILLARS = [
  {
    id:      'texas',
    Icon:    MapPin,
    color:   '#2563EB',
    titleEn: 'Based in Texas',
    titleEs: 'Con sede en Texas',
    descEn:  'We operate from the heart of Texas — understanding local energy markets, regulations, and the people we serve every day.',
    descEs:  'Operamos desde el corazón de Texas, entendiendo los mercados de energía locales, las regulaciones y las personas a quienes servimos.',
  },
  {
    id:      'bilingual',
    Icon:    Users,
    color:   '#0891B2',
    titleEn: 'Bilingual by Design',
    titleEs: 'Bilingüe por Diseño',
    descEn:  'Every product, form, and support call is available in English and Spanish from day one — not as an afterthought.',
    descEs:  'Cada producto, formulario y llamada de soporte está disponible en inglés y español desde el primer día.',
  },
  {
    id:      'energy',
    Icon:    Zap,
    color:   '#D97706',
    titleEn: 'Starting with Energy',
    titleEs: 'Empezando con Energía',
    descEn:  'Aventia Energy is live now. We help Texas homes and businesses switch to better rates — no hassle, no hidden fees.',
    descEs:  'Aventia Energy está activo ahora. Ayudamos a hogares y empresas de Texas a cambiarse a mejores tarifas.',
  },
  {
    id:      'expand',
    Icon:    Navigation,
    color:   '#7C3AED',
    titleEn: 'Built to Expand',
    titleEs: 'Construido para Crecer',
    descEn:  'Five divisions in motion. Connect, Store, AI, and Drones are coming — each solving a real problem for Texas and beyond.',
    descEs:  'Cinco divisiones en movimiento. Connect, Store, AI y Drones están llegando — cada uno resolviendo un problema real.',
  },
] as const

// ─────────────────────────────────────────────────────────────
// ABOUT SECTION — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AboutSection() {
  const { locale } = useLocale()

  // Refs for the two columns — each triggers its own inView detection
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const leftInView  = useInView(leftRef,  { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper bg="blue-tint" id="about" animate={false}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

        {/* ══ LEFT COLUMN — Text content ═══════════════════ */}
        <motion.div
          ref={leftRef}
          variants={leftContainerVariants}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          {/* Section label */}
          <motion.div variants={fadeUpVariants} className="mb-5">
            <span className="section-label">
              {locale === 'es' ? 'Sobre Nosotros' : 'About Us'}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            className="section-headline"
            style={{ color: 'var(--text-primary)', marginBottom: '20px' }}
          >
            {locale === 'es' ? (
              <>
                Construido en Texas.{' '}
                <span
                  style={{
                    background:           'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  Para Crecer.
                </span>
              </>
            ) : (
              <>
                Built in Texas.{' '}
                <span
                  style={{
                    background:           'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  Built for Growth.
                </span>
              </>
            )}
          </motion.h2>

          {/* Paragraph 1 */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans"
            style={{
              fontSize:     '17px',
              lineHeight:   '1.75',
              color:        'var(--text-secondary)',
              marginBottom: '16px',
            }}
          >
            {locale === 'es'
              ? 'Somos operadores, constructores y solucionadores de problemas con sede en Texas. Aventia Global comenzó con una misión simple: hacer que la tecnología y la energía funcionen mejor para las personas de todos los días — en inglés y en español.'
              : "We're operators, builders, and problem-solvers based in Texas. Aventia Global started with a simple mission: make technology and energy work better for everyday people — in English and in Spanish."}
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans"
            style={{
              fontSize:     '17px',
              lineHeight:   '1.75',
              color:        'var(--text-secondary)',
              marginBottom: '32px',
            }}
          >
            {locale === 'es'
              ? 'Comenzamos con Aventia Energy, ayudando a hogares y empresas de Texas a comparar y cambiar planes de electricidad en minutos. Cinco divisiones están en marcha, cada una abordando un problema real en los mercados que mejor conocemos.'
              : 'We started with Aventia Energy, helping Texas homes and businesses compare and switch electricity plans in minutes. Five divisions are in motion, each tackling a real problem in the markets we know best.'}
          </motion.p>

          {/* Key facts list */}
          <motion.ul
            variants={fadeUpVariants}
            className="space-y-3 mb-10"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {KEY_FACTS.map((fact) => {
              const Icon = fact.Icon
              const isHighlight = 'highlight' in fact && fact.highlight
              return (
                <li
                  key={fact.id}
                  className="flex items-center gap-3"
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center shrink-0 rounded-lg"
                    style={{
                      width:      '32px',
                      height:     '32px',
                      background: isHighlight
                        ? 'rgba(217,119,6,0.12)'
                        : 'rgba(37,99,235,0.09)',
                      color: isHighlight
                        ? '#D97706'
                        : 'var(--accent-blue)',
                    }}
                  >
                    <Icon size={15} strokeWidth={2} aria-hidden="true" />
                  </div>

                  {/* Text */}
                  <span
                    className="font-sans font-medium"
                    style={{
                      fontSize: '15px',
                      color:    isHighlight
                        ? '#D97706'
                        : 'var(--text-secondary)',
                    }}
                  >
                    {locale === 'es' ? fact.textEs : fact.textEn}
                  </span>

                  {/* Live indicator dot */}
                  {isHighlight && (
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans font-semibold"
                      style={{
                        fontSize:   '10px',
                        background: 'rgba(5,150,105,0.1)',
                        color:      '#059669',
                        border:     '1px solid rgba(5,150,105,0.25)',
                      }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: '#059669' }}
                        aria-hidden="true"
                      />
                      {locale === 'es' ? 'En vivo' : 'Live'}
                    </span>
                  )}
                </li>
              )
            })}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap gap-3"
          >
            <Button
              asChild
              variant="primary"
              rightIcon={<ArrowRight size={16} strokeWidth={2} />}
            >
              <Link href="https://energy.aventiaglobal.com">
                {locale === 'es'
                  ? 'Comenzar con Energía'
                  : 'Get Started with Energy'}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="#contact">
                {locale === 'es' ? 'Contáctanos' : 'Contact Us'}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* ══ RIGHT COLUMN — Pillar cards panel ════════════ */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 40 }}
          animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="lg:sticky lg:top-[96px]"
        >
          {/* Panel card */}
          <div
            style={{
              background:   'var(--white)',
              border:       '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow:     'hidden',
              boxShadow:    'var(--shadow-md)',
            }}
          >
            {/* Top gradient accent bar */}
            <div
              style={{ height: '3px', background: 'var(--accent-gradient)' }}
              aria-hidden="true"
            />

            {/* Panel header */}
            <div
              className="px-7 py-5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <p
                className="font-sans font-semibold"
                style={{
                  fontSize:      '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'var(--text-muted)',
                }}
              >
                {locale === 'es' ? 'Nuestros Fundamentos' : 'Our Foundation'}
              </p>
            </div>

            {/* 4 pillar items */}
            <div>
              {PILLARS.map((pillar, index) => {
                const Icon = pillar.Icon
                const isLast = index === PILLARS.length - 1
                return (
                  <div
                    key={pillar.id}
                    className="flex items-start gap-4 px-7 py-5"
                    style={{
                      borderBottom: isLast
                        ? 'none'
                        : '1px solid var(--border)',
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center shrink-0 rounded-xl"
                      style={{
                        width:      '38px',
                        height:     '38px',
                        background: `${pillar.color}14`,
                        color:      pillar.color,
                        marginTop:  '2px',
                      }}
                    >
                      <Icon size={17} strokeWidth={2} aria-hidden="true" />
                    </div>

                    {/* Text */}
                    <div>
                      <h4
                        className="font-display font-semibold"
                        style={{
                          fontSize:     '15px',
                          color:        'var(--text-primary)',
                          marginBottom: '4px',
                        }}
                      >
                        {locale === 'es' ? pillar.titleEs : pillar.titleEn}
                      </h4>
                      <p
                        className="font-sans"
                        style={{
                          fontSize:   '13px',
                          lineHeight: '1.6',
                          color:      'var(--text-muted)',
                        }}
                      >
                        {locale === 'es' ? pillar.descEs : pillar.descEn}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Panel footer */}
            <div
              className="px-7 py-4 flex items-center gap-2"
              style={{
                borderTop:  '1px solid var(--border)',
                background: 'var(--bg-primary)',
              }}
            >
              <CheckCircle2
                size={14}
                style={{ color: '#059669', flexShrink: 0 }}
                aria-hidden="true"
              />
              <p
                className="font-sans font-medium"
                style={{ fontSize: '12px', color: 'var(--text-muted)' }}
              >
                {locale === 'es'
                  ? 'Aventia Global LLC — Texas, EE.UU. — Activa'
                  : 'Aventia Global LLC — Texas, USA — Active'}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
