// components/sections/energy/EnergyHero.tsx
'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  Ban,
  Globe,
  Zap,
  ChevronDown,
  Building2,
} from 'lucide-react'
import { Button, ButtonGroup } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

// Energy amber gradient — used on CTA button and headline
const ENERGY_GRADIENT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #D97706, #F59E0B)',
  boxShadow:  '0 4px 16px rgba(217,119,6,0.32)',
  color:      '#FFFFFF',
}

// Energy secondary — white bg, amber border + text
const ENERGY_SECONDARY: React.CSSProperties = {
  background:   '#FFFFFF',
  borderColor:  '#D97706',
  color:        '#D97706',
  border:       '1.5px solid #D97706',
}

// Trust badges displayed below the CTAs
const TRUST_BADGES = [
  {
    id:    'puc',
    Icon:  ShieldCheck,
    en:    'Texas PUC Licensed',
    es:    'Certificado PUC Texas',
  },
  {
    id:    'fees',
    Icon:  Ban,
    en:    'No cancellation fees',
    es:    'Sin cargos de cancelación',
  },
  {
    id:    'bilingual',
    Icon:  Globe,
    en:    'Bilingual EN + ES',
    es:    'Bilingüe EN + ES',
  },
  {
    id:    'fast',
    Icon:  Zap,
    en:    'Switch in 5 minutes',
    es:    'Cambia en 5 minutos',
  },
] as const

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden:   {},
  visible:  {
    transition: { staggerChildren: 0.16, delayChildren: 0.12 },
  },
}

// Blur-in phrase reveal — same as main site hero
const phraseRevealVariants = {
  hidden:   { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible:  {
    opacity: 1,
    y:       0,
    filter:  'blur(0px)',
    transition: { duration: 0.68, ease: [0.4, 0, 0.2, 1] as const },
  },
}

// Soft fade up — for subheadline, badges, CTAs
const fadeUpVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
}

// ─────────────────────────────────────────────────────────────
// FLOATING BLOB
// Same structure as main hero but with amber/warm colors.
// ─────────────────────────────────────────────────────────────

interface FloatingBlobProps {
  width:    number
  height:   number
  color:    string
  top?:     string
  bottom?:  string
  left?:    string
  right?:   string
  duration: number
  delay?:   number
}

function FloatingBlob({
  width, height, color,
  top, bottom, left, right,
  duration, delay = 0,
}: FloatingBlobProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width,
        height,
        background: color,
        filter:     'blur(80px)',
        top, bottom, left, right,
      }}
      animate={{
        x: [0, 20, -14, 16, 0],
        y: [0, -24, 12, -14, 0],
      }}
      transition={{
        duration,
        delay,
        repeat:  Infinity,
        ease:    'easeInOut',
        times:   [0, 0.25, 0.5, 0.75, 1],
      }}
      aria-hidden="true"
    />
  )
}

// ─────────────────────────────────────────────────────────────
// ENERGY HERO — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function EnergyHero() {
  const { locale } = useLocale()

  return (
    <div
      className="-mt-[72px] pt-[72px] relative overflow-hidden flex flex-col"
      style={{ minHeight: '100vh' }}
    >

      {/* ══ BACKGROUND LAYERS ════════════════════════════ */}

      {/* Layer 1: Warm base surface */}
      <div
        className="absolute inset-0"
        style={{ background: '#FFFBF5' }}
        aria-hidden="true"
      />

      {/* Layer 2: Amber dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(217,119,6,0.14) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          opacity:        0.55,
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Warm radial glow overlays */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 75% 55% at 50% 0%,    rgba(255,247,237,0.95) 0%, transparent 70%)',
            'radial-gradient(ellipse 55% 45% at 100% 100%, rgba(255,247,237,0.80) 0%, transparent 70%)',
          ].join(','),
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Floating amber blobs */}
      {/* Blob A — large amber, top-right */}
      <FloatingBlob
        width={380} height={380}
        color="rgba(217,119,6,0.10)"
        top="8%" right="5%"
        duration={22} delay={0}
      />
      {/* Blob B — medium yellow-amber, bottom-left */}
      <FloatingBlob
        width={280} height={280}
        color="rgba(245,158,11,0.09)"
        bottom="12%" left="4%"
        duration={18} delay={4}
      />
      {/* Blob C — small amber, center */}
      <FloatingBlob
        width={160} height={160}
        color="rgba(217,119,6,0.07)"
        top="44%" right="30%"
        duration={14} delay={8}
      />

      {/* Layer 5: Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height:     '180px',
          background: 'linear-gradient(to bottom, transparent 0%, #FFFBF5 100%)',
        }}
        aria-hidden="true"
      />

      {/* ══ CONTENT ══════════════════════════════════════ */}
      <div
        className="relative z-10 container-aventia flex flex-col items-center flex-1 justify-center"
        style={{ paddingTop: '80px', paddingBottom: '48px' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center w-full"
          style={{ maxWidth: '820px', margin: '0 auto' }}
        >

          {/* Section label — amber pill */}
          <motion.div
            variants={phraseRevealVariants}
            className="flex justify-center mb-6"
          >
            <span
              className="inline-flex items-center gap-2 font-sans font-semibold"
              style={{
                fontSize:      '13px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding:       '6px 16px',
                borderRadius:  '100px',
                background:    'rgba(217,119,6,0.09)',
                border:        '1px solid rgba(217,119,6,0.22)',
                color:         '#D97706',
              }}
            >
              <ShieldCheck size={13} strokeWidth={2} aria-hidden="true" />
              {locale === 'es'
                ? 'Proveedor de Energía en Texas · Certificado PUC'
                : 'Texas Energy Provider · PUC Licensed'}
            </span>
          </motion.div>

          {/* Live rate badge */}
          <motion.div
            variants={phraseRevealVariants}
            className="flex justify-center mb-7"
          >
            <div
              className="inline-flex items-center gap-2.5"
              style={{
                padding:      '8px 20px',
                borderRadius: '100px',
                background:   'rgba(5,150,105,0.08)',
                border:       '1px solid rgba(5,150,105,0.22)',
              }}
            >
              {/* Pulsing green live dot */}
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#059669', flexShrink: 0 }}
                aria-hidden="true"
              />
              <span
                className="font-mono font-medium"
                style={{ fontSize: '16px', color: '#059669' }}
              >
                $0.099/kWh
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: '13px',
                  color:    'var(--text-muted)',
                  paddingLeft: '4px',
                  borderLeft: '1px solid var(--border)',
                }}
              >
                {locale === 'es' ? 'Tarifa Inicial' : 'Starting Rate'}
              </span>
            </div>
          </motion.div>

          {/* Headline — phrase-by-phrase blur reveal */}
          <h1
            className="hero-headline"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            {locale === 'es' ? (
              <>
                <motion.span variants={phraseRevealVariants} className="block">
                  Ahorra en tu
                </motion.span>
                <motion.span
                  variants={phraseRevealVariants}
                  className="block"
                  style={{
                    background:           'linear-gradient(135deg, #D97706, #F59E0B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  Factura de Electricidad.
                </motion.span>
              </>
            ) : (
              <>
                <motion.span variants={phraseRevealVariants} className="block">
                  Save on Your Texas
                </motion.span>
                <motion.span
                  variants={phraseRevealVariants}
                  className="block"
                  style={{
                    background:           'linear-gradient(135deg, #D97706, #F59E0B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                  }}
                >
                  Electricity Bill.
                </motion.span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans"
            style={{
              fontSize:   '19px',
              lineHeight: '1.75',
              color:      'var(--text-secondary)',
              maxWidth:   '620px',
              margin:     '24px auto 0',
            }}
          >
            {locale === 'es'
              ? 'Compara más de 40 planes de energía de los mejores proveedores de Texas. Cambia en minutos sin papeles, sin cargos de cancelación y con soporte bilingüe.'
              : 'Compare 40+ Texas energy plans from top providers. Switch in minutes with no paperwork, no cancellation fees, and full bilingual support.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUpVariants} className="mt-10">
            <ButtonGroup align="center" gap="md">
              {/* Primary — amber gradient */}
              <Button
                asChild
                size="lg"
                style={ENERGY_GRADIENT}
                rightIcon={<ArrowRight size={18} strokeWidth={2} />}
              >
                <a href="#plans">
                  {locale === 'es' ? 'Comparar Planes' : 'Compare Plans'}
                </a>
              </Button>

              {/* Secondary — amber outlined */}
              <Button
                asChild
                size="lg"
                style={ENERGY_SECONDARY}
                leftIcon={<Building2 size={17} strokeWidth={2} />}
              >
                <a href="#commercial">
                  {locale === 'es' ? 'Para Empresas' : 'For Businesses'}
                </a>
              </Button>
            </ButtonGroup>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUpVariants} className="mt-8">
            <div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            >
              {TRUST_BADGES.map((badge, index) => {
                const Icon = badge.Icon
                return (
                  <div
                    key={badge.id}
                    className="flex items-center gap-1.5"
                  >
                    {/* Separator dot between items (not before first) */}
                    {index > 0 && (
                      <span
                        className="hidden sm:block w-1 h-1 rounded-full mx-1"
                        style={{ background: 'var(--text-muted)', opacity: 0.4 }}
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      size={13}
                      strokeWidth={2}
                      style={{ color: '#D97706' }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-sans font-medium"
                      style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                    >
                      {locale === 'es' ? badge.es : badge.en}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══ SCROLL INDICATOR ═════════════════════════════ */}
      <div
        className="relative z-10 flex flex-col items-center gap-1.5 pb-6"
        aria-hidden="true"
      >
        <p
          className="font-sans font-semibold"
          style={{
            fontSize:      '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--text-muted)',
            opacity:       0.5,
          }}
        >
          {locale === 'es' ? 'Ver Planes' : 'See Plans'}
        </p>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={18}
            style={{ color: '#D97706', opacity: 0.55 }}
          />
        </motion.div>
      </div>

    </div>
  )
}
