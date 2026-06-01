// components/sections/CtaBanner.tsx
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Wifi,
  ShoppingBag,
  Brain,
  Navigation,
} from 'lucide-react'
import { Button, ButtonGroup } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'
import { DIVISIONS } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const DIVISION_ICONS: Record<string, React.ElementType> = {
  energy:  Zap,
  connect: Wifi,
  store:   ShoppingBag,
  ai:      Brain,
  drones:  Navigation,
}

/** Three quick-stat facts about Aventia Energy */
const ENERGY_STATS = [
  {
    id:      'rate',
    valueEn: 'From $0.099',
    valueEs: 'Desde $0.099',
    unitEn:  'per kWh',
    unitEs:  'por kWh',
    labelEn: 'Starting rate',
    labelEs: 'Tarifa inicial',
  },
  {
    id:      'time',
    valueEn: '5 min',
    valueEs: '5 min',
    unitEn:  'to switch',
    unitEs:  'para cambiar',
    labelEn: 'Plan enrollment',
    labelEs: 'Inscripción al plan',
  },
  {
    id:      'fees',
    valueEn: '$0',
    valueEs: '$0',
    unitEn:  'enrollment fee',
    unitEs:  'cargos de inscripción',
    labelEn: 'No hidden costs',
    labelEs: 'Sin costos ocultos',
  },
] as const

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden:   {},
  visible:  {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const fadeUpVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
}

const blurRevealVariants = {
  hidden:   { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible:  {
    opacity: 1,
    y:       0,
    filter:  'blur(0px)',
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] as const },
  },
}

// ─────────────────────────────────────────────────────────────
// CTA BANNER — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CtaBanner() {
  const { locale } = useLocale()
  const sectionRef  = useRef<HTMLElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Call to action — Aventia Energy"
      style={{
        backgroundColor: '#0F172A',
        // Subtle warm glow in bottom-left, cool glow top-right
        backgroundImage: [
          'radial-gradient(at 15% 85%, rgba(37,99,235,0.14) 0px, transparent 55%)',
          'radial-gradient(at 85% 15%, rgba(8,145,178,0.09) 0px, transparent 55%)',
          'radial-gradient(at 50% 50%, rgba(37,99,235,0.04) 0px, transparent 70%)',
        ].join(','),
        paddingTop:    'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="container-aventia">

        {/* ══ MAIN CONTENT — center-aligned text + CTAs ═══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
          style={{ maxWidth: '720px', margin: '0 auto' }}
        >

          {/* Section label pill */}
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center mb-6"
          >
            <span
              className="font-sans font-semibold"
              style={{
                fontSize:      '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding:       '6px 16px',
                borderRadius:  '100px',
                background:    'rgba(255,255,255,0.07)',
                border:        '1px solid rgba(255,255,255,0.12)',
                color:         'rgba(255,255,255,0.55)',
              }}
            >
              {locale === 'es'
                ? 'Aventia Energy — En Vivo Ahora'
                : 'Aventia Energy — Live Now'}
            </span>
          </motion.div>

          {/* Main headline — blur reveal */}
          <motion.h2
            variants={blurRevealVariants}
            className="font-display font-bold"
            style={{
              fontSize:      'clamp(36px, 5.5vw, 58px)',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              color:         '#FFFFFF',
              marginBottom:  '20px',
            }}
          >
            {locale === 'es' ? (
              <>
                ¿Listo para Ahorrar en{' '}
                <span
                  style={{
                    background:           'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  Energía?
                </span>
              </>
            ) : (
              <>
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
              </>
            )}
          </motion.h2>

          {/* Primary subheadline — in current locale */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans"
            style={{
              fontSize:     '18px',
              lineHeight:   '1.7',
              color:        'rgba(255,255,255,0.65)',
              marginBottom: '10px',
            }}
          >
            {locale === 'es'
              ? 'Compara planes de electricidad en Texas y cambia en minutos. Sin papeles, sin esperas, sin cargos ocultos.'
              : 'Compare Texas electricity plans and switch in minutes. No paperwork, no long hold times, no hidden fees.'}
          </motion.p>

          {/* Secondary line — in the OTHER language (shows bilingual commitment) */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans"
            style={{
              fontSize:     '15px',
              lineHeight:   '1.6',
              color:        'rgba(255,255,255,0.30)',
              marginBottom: '40px',
            }}
          >
            {locale === 'es'
              ? 'Compare Texas electricity plans and switch in minutes. No paperwork, no hidden fees.'
              : 'Compara planes de electricidad en Texas y cambia en minutos. Sin papeles, sin cargos ocultos.'}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUpVariants}>
            <ButtonGroup align="center" gap="md">
              <Button
                asChild
                variant="primary"
                size="lg"
                leftIcon={<Zap size={18} strokeWidth={2} />}
                rightIcon={<ArrowRight size={18} strokeWidth={2} />}
              >
                <Link href="https://energy.aventiaglobal.com">
                  {locale === 'es' ? 'Comparar Planes' : 'Compare Plans'}
                </Link>
              </Button>

              {/* Ghost button — override secondary for dark background */}
              <Button
                asChild
                size="lg"
                style={{
                  background:   'transparent',
                  borderColor:  'rgba(255,255,255,0.22)',
                  color:        'rgba(255,255,255,0.80)',
                }}
              >
                <Link href="#divisions">
                  {locale === 'es' ? 'Ver Divisiones' : 'View All Divisions'}
                </Link>
              </Button>
            </ButtonGroup>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans mt-5"
            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}
          >
            {locale === 'es'
              ? 'Certificada por PUC Texas · Sin cargos de cancelación · Soporte EN + ES'
              : 'Texas PUC Licensed · No cancellation fees · Support in EN + ES'}
          </motion.p>
        </motion.div>

        {/* ══ ENERGY QUICK STATS — dark glassmorphism card ══ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.4, 0, 0.2, 1] as const }}
          className="mx-auto mt-14"
          style={{ maxWidth: '680px' }}
        >
          <div
            className="grid grid-cols-3 rounded-2xl overflow-hidden"
            style={{
              background:      'rgba(255,255,255,0.05)',
              border:          '1px solid rgba(255,255,255,0.09)',
              backdropFilter:  'blur(12px)',
            }}
          >
            {ENERGY_STATS.map((stat, index) => {
              const isLast = index === ENERGY_STATS.length - 1
              return (
                <div
                  key={stat.id}
                  className="flex flex-col items-center justify-center text-center py-7 px-4"
                  style={{
                    borderRight: isLast
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Value + unit */}
                  <div
                    className="flex items-baseline gap-1.5 mb-1"
                  >
                    <span
                      className="font-mono font-medium"
                      style={{
                        fontSize:             '22px',
                        lineHeight:           1,
                        background:           'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor:  'transparent',
                        backgroundClip:       'text',
                      }}
                    >
                      {locale === 'es' ? stat.valueEs : stat.valueEn}
                    </span>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '11px',
                        color:    'rgba(255,255,255,0.35)',
                      }}
                    >
                      {locale === 'es' ? stat.unitEs : stat.unitEn}
                    </span>
                  </div>

                  {/* Label */}
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '12px',
                      color:    'rgba(255,255,255,0.40)',
                    }}
                  >
                    {locale === 'es' ? stat.labelEs : stat.labelEn}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ══ ALL DIVISIONS ROW ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          className="mt-12"
        >
          {/* Row label */}
          <p
            className="font-sans text-center mb-5"
            style={{
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.28)',
            }}
          >
            {locale === 'es' ? 'Todas Nuestras Divisiones' : 'All Our Divisions'}
          </p>

          {/* Division pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {DIVISIONS.map((division) => {
              const Icon = DIVISION_ICONS[division.id]
              return (
                <Link
                  key={division.id}
                  href={division.url}
                  className="group flex items-center gap-2 rounded-xl transition-all duration-200 hover:scale-[1.04]"
                  style={{
                    padding:    '10px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border:     '1px solid rgba(255,255,255,0.09)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background   = `${division.color}1a`
                    el.style.borderColor  = `${division.color}44`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background   = 'rgba(255,255,255,0.05)'
                    el.style.borderColor  = 'rgba(255,255,255,0.09)'
                  }}
                  aria-label={`Visit ${division.name}`}
                >
                  {/* Division icon */}
                  {Icon && (
                    <Icon
                      size={14}
                      strokeWidth={2}
                      style={{ color: division.color, flexShrink: 0 }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Division short name */}
                  <span
                    className="font-display font-semibold"
                    style={{
                      fontSize: '13px',
                      color:    'rgba(255,255,255,0.72)',
                    }}
                  >
                    {division.name.replace('Aventia ', '')}
                  </span>

                  {/* Live dot for Energy */}
                  {division.status === 'live' && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#059669' }}
                      aria-label="Live"
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* ══ BOTTOM COPYRIGHT LINE ════════════════════════ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="font-sans text-center mt-12"
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.16)' }}
        >
          {locale === 'es'
            ? `© ${new Date().getFullYear()} Aventia Global LLC · Texas, EE.UU. · Todos los derechos reservados`
            : `© ${new Date().getFullYear()} Aventia Global LLC · Texas, USA · All rights reserved`}
        </motion.p>

      </div>
    </section>
  )
}
