// components/sections/LanguagesStrip.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { SectionWrapper } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id:  'plans',
    en:  'Energy plans in English and Spanish',
    es:  'Planes de energía en inglés y español',
  },
  {
    id:  'support',
    en:  'Bilingual customer support team',
    es:  'Equipo de soporte al cliente bilingüe',
  },
  {
    id:  'forms',
    en:  'Spanish-language enrollment forms',
    es:  'Formularios de inscripción en español',
  },
  {
    id:  'whatsapp',
    en:  'WhatsApp support available',
    es:  'Soporte disponible por WhatsApp',
  },
] as const

/** Mini energy plan preview data shown inside the interactive card */
const PLAN_PREVIEW = {
  en: {
    tag:      'Residential Plan',
    name:     'Lone Star Fixed 12',
    price:    '$0.099',
    unit:     'per kWh',
    features: [
      '12-month fixed rate',
      'No cancellation fees',
      'Online account management',
    ],
    cta: 'Select Plan',
  },
  es: {
    tag:      'Plan Residencial',
    name:     'Lone Star Fijo 12',
    price:    '$0.099',
    unit:     'por kWh',
    features: [
      'Tasa fija por 12 meses',
      'Sin cargos de cancelación',
      'Gestión de cuenta en línea',
    ],
    cta: 'Seleccionar Plan',
  },
} as const

// ─────────────────────────────────────────────────────────────
// PLAN PREVIEW CARD
// Interactive card that auto-cycles between EN and ES preview.
// Clicking the tabs or dot indicators also switches the language.
// ─────────────────────────────────────────────────────────────

function PlanPreviewCard() {
  const [activeLang, setActiveLang] = useState<'en' | 'es'>('en')
  const plan = PLAN_PREVIEW[activeLang]

  // Auto-cycle EN ↔ ES every 3.5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveLang((prev) => (prev === 'en' ? 'es' : 'en'))
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        background:            'rgba(255,255,255,0.94)',
        backdropFilter:        'blur(16px)',
        WebkitBackdropFilter:  'blur(16px)',
        borderRadius:          'var(--radius-lg)',
        border:                '1px solid rgba(255,255,255,0.85)',
        boxShadow:             '0 20px 60px rgba(0,0,0,0.16)',
        overflow:              'hidden',
      }}
    >
      {/* ── Language toggle tabs ─────────────────────────── */}
      <div
        style={{
          display:      'flex',
          gap:          '4px',
          padding:      '6px',
          background:   'rgba(0,0,0,0.04)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {(['en', 'es'] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            style={{
              flex:         1,
              padding:      '8px 0',
              borderRadius: '8px',
              fontFamily:   'var(--font-sans)',
              fontSize:     '13px',
              fontWeight:   600,
              letterSpacing: '0.04em',
              cursor:       'pointer',
              border:       'none',
              transition:   'all 200ms ease',
              background:   activeLang === lang ? '#FFFFFF' : 'transparent',
              color:        activeLang === lang ? 'var(--accent-blue)' : 'rgba(0,0,0,0.4)',
              boxShadow:    activeLang === lang ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}
            aria-pressed={activeLang === lang}
            aria-label={lang === 'en' ? 'Show English preview' : 'Show Spanish preview'}
          >
            {lang === 'en' ? '🇺🇸 English' : '🇲🇽 Español'}
          </button>
        ))}
      </div>

      {/* ── Animated plan content ────────────────────────── */}
      <div style={{ padding: '24px', minHeight: '228px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Plan tag */}
            <p
              style={{
                fontFamily:    'var(--font-sans)',
                fontSize:      '11px',
                fontWeight:    600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--accent-blue)',
                marginBottom:  '6px',
              }}
            >
              {plan.tag}
            </p>

            {/* Plan name */}
            <h4
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     '17px',
                fontWeight:   700,
                color:        'var(--text-primary)',
                marginBottom: '10px',
              }}
            >
              {plan.name}
            </h4>

            {/* Price */}
            <div
              style={{
                display:      'flex',
                alignItems:   'baseline',
                gap:          '4px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontFamily:           'var(--font-mono)',
                  fontSize:             '30px',
                  fontWeight:           500,
                  lineHeight:           1,
                  background:           'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                }}
              >
                {plan.price}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize:   '12px',
                  color:      'var(--text-muted)',
                }}
              >
                {plan.unit}
              </span>
            </div>

            {/* Features */}
            <ul
              style={{
                listStyle:     'none',
                padding:       0,
                margin:        '0 0 18px 0',
                display:       'flex',
                flexDirection: 'column',
                gap:           '6px',
              }}
            >
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  style={{ display: 'flex', alignItems: 'center', gap: '7px' }}
                >
                  <Check
                    size={12}
                    strokeWidth={2.5}
                    style={{ color: '#059669', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize:   '13px',
                      color:      'var(--text-secondary)',
                    }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mini CTA (decorative — not a real link) */}
            <div
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '6px',
                padding:        '8px 16px',
                borderRadius:   '8px',
                background:     'var(--accent-gradient)',
                fontFamily:     'var(--font-sans)',
                fontSize:       '13px',
                fontWeight:     600,
                color:          'white',
                boxShadow:      '0 2px 10px rgba(37,99,235,0.28)',
                cursor:         'default',
                userSelect:     'none',
              }}
              aria-hidden="true"
            >
              <Zap size={12} strokeWidth={2} />
              {plan.cta}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress dot indicators ───────────────────────── */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'center',
          gap:            '6px',
          paddingBottom:  '16px',
        }}
      >
        {(['en', 'es'] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            style={{
              width:        '28px',
              height:       '4px',
              borderRadius: '2px',
              border:       'none',
              cursor:       'pointer',
              padding:      0,
              transition:   'all 300ms ease',
              background:   activeLang === lang
                ? 'var(--accent-blue)'
                : 'rgba(0,0,0,0.14)',
            }}
            aria-label={`Switch to ${lang === 'en' ? 'English' : 'Spanish'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// LANGUAGES STRIP — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function LanguagesStrip() {
  const { locale } = useLocale()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(wrapperRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper bg="white" id="languages" padding="sm" animate={false}>
      <div ref={wrapperRef}>

        {/* ── Gradient banner ───────────────────────────── */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--accent-gradient)',
            padding:    'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT: Headline + feature list ─────────── */}
            <div>
              {/* Section label */}
              <p
                style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.58)',
                  marginBottom:  '20px',
                }}
              >
                {locale === 'es'
                  ? 'Sirviendo a Texas en Dos Idiomas'
                  : 'Serving Texas in Two Languages'}
              </p>

              {/* Bilingual headline — always shows both lines */}
              <motion.h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(28px, 4vw, 44px)',
                  fontWeight:    800,
                  lineHeight:    1.15,
                  letterSpacing: '-0.02em',
                  marginBottom:  '6px',
                  color:         '#FFFFFF',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                We Speak English.
              </motion.h2>

              <motion.h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(28px, 4vw, 44px)',
                  fontWeight:    800,
                  lineHeight:    1.15,
                  letterSpacing: '-0.02em',
                  marginBottom:  '36px',
                  color:         'rgba(255,255,255,0.68)',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                Hablamos Español.
              </motion.h2>

              {/* Feature list — each item shows BOTH languages */}
              <ul
                style={{
                  listStyle: 'none',
                  padding:   0,
                  margin:    0,
                  display:   'flex',
                  flexDirection: 'column',
                  gap:       '16px',
                }}
              >
                {FEATURES.map((feature, index) => (
                  <motion.li
                    key={feature.id}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                    initial={{ opacity: 0, x: -18 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay:    0.3 + index * 0.09,
                      ease:     [0.4, 0, 0.2, 1] as const,
                    }}
                  >
                    {/* Checkmark circle */}
                    <div
                      style={{
                        width:          '22px',
                        height:         '22px',
                        borderRadius:   '50%',
                        background:     'rgba(255,255,255,0.22)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        flexShrink:     0,
                        marginTop:      '2px',
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* EN + ES text stacked */}
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize:   '15px',
                          fontWeight: 500,
                          color:      '#FFFFFF',
                          display:    'block',
                          lineHeight: 1.4,
                        }}
                      >
                        {feature.en}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize:   '13px',
                          color:      'rgba(255,255,255,0.58)',
                          display:    'block',
                          lineHeight: 1.4,
                        }}
                      >
                        {feature.es}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ── RIGHT: Interactive preview card ──────── */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.4, 0, 0.2, 1] as const }}
            >
              {/* Caption above card */}
              <p
                style={{
                  fontFamily:    'var(--font-sans)',
                  fontSize:      '11px',
                  fontWeight:    600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         'rgba(255,255,255,0.5)',
                  textAlign:     'center',
                  marginBottom:  '12px',
                }}
              >
                {locale === 'es' ? '↓ Demostración en vivo' : '↓ Live preview'}
              </p>

              <PlanPreviewCard />

              {/* Caption below card */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize:   '12px',
                  color:      'rgba(255,255,255,0.42)',
                  textAlign:  'center',
                  marginTop:  '10px',
                }}
              >
                {locale === 'es'
                  ? 'Cambia automáticamente · Haz clic para controlar'
                  : 'Auto-switches · Click to control'}
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
