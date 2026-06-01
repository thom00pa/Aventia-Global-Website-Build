// components/sections/HeroSection.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
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
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

/**
 * Stagger container for the headline + body content.
 * Children animate in sequence with 0.18s gap.
 */
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren:   0.15,
    },
  },
}

/**
 * Blur-in phrase reveal — used for each headline line.
 * Starts blurred, shifted down, transparent; resolves to clear.
 */
const phraseRevealVariants = {
  hidden: {
    opacity: 0,
    y:       32,
    filter:  'blur(8px)',
  },
  visible: {
    opacity: 1,
    y:       0,
    filter:  'blur(0px)',
    transition: {
      duration: 0.7,
      ease:     [0.4, 0, 0.2, 1] as const,
    },
  },
}

/**
 * Softer fade-up — used for subheadline, CTAs, trust line.
 */
const fadeUpVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: {
      duration: 0.6,
      ease:     [0.4, 0, 0.2, 1] as const,
    },
  },
}

// ─────────────────────────────────────────────────────────────
// DIVISION ICON MAP
// ─────────────────────────────────────────────────────────────

const DIVISION_ICONS: Record<string, React.ElementType> = {
  energy:  Zap,
  connect: Wifi,
  store:   ShoppingBag,
  ai:      Brain,
  drones:  Navigation,
}

// ─────────────────────────────────────────────────────────────
// FLOATING BLOB
// Slowly animates along a gentle curved path using
// Framer Motion's keyframe array syntax.
// blur-[80px] creates a large soft glow.
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
        top,
        bottom,
        left,
        right,
      }}
      animate={{
        x: [0, 22, -14, 18, 0],
        y: [0, -28, 12, -16, 0],
      }}
      transition={{
        duration,
        delay,
        repeat:     Infinity,
        ease:       'easeInOut',
        times:      [0, 0.25, 0.5, 0.75, 1],
      }}
      aria-hidden="true"
    />
  )
}

// ─────────────────────────────────────────────────────────────
// DIVISION STRIP
// Glassmorphism bar showing all 5 divisions.
// On mobile: horizontally scrollable.
// On desktop: equal-width columns spanning full container width.
// ─────────────────────────────────────────────────────────────

function DivisionStrip({ locale }: { locale: 'en' | 'es' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.9, ease: [0.4, 0, 0.2, 1] as const }}
      className="w-full mx-auto"
      style={{ maxWidth: '860px' }}
    >
      {/* Label */}
      <p
        className="font-sans text-center mb-3"
        style={{
          fontSize:      '11px',
          fontWeight:    600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'var(--text-muted)',
        }}
      >
        {locale === 'es' ? 'Nuestras Divisiones' : 'Our Divisions'}
      </p>

      {/* Strip card */}
      <div
        className="glass rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border-blue)' }}
      >
        {/* Horizontal scroll wrapper for mobile */}
        <div className="flex items-stretch overflow-x-auto scrollbar-hide">
          {DIVISIONS.map((division, index) => {
            const Icon = DIVISION_ICONS[division.id]
            const isLast = index === DIVISIONS.length - 1

            return (
              <Link
                key={division.id}
                href={division.url}
                className="group flex flex-col items-center gap-2 py-4 px-5 flex-1 transition-colors duration-200 hover:bg-[#EFF6FF]"
                style={{
                  textDecoration: 'none',
                  minWidth:       '120px',
                  borderRight:    isLast ? 'none' : '1px solid var(--border)',
                }}
                aria-label={`Go to ${division.name}`}
              >
                {/* Division icon */}
                <div
                  className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{
                    width:      '34px',
                    height:     '34px',
                    background: `${division.color}1a`,
                    color:      division.color,
                  }}
                >
                  {Icon && <Icon size={15} strokeWidth={2} aria-hidden="true" />}
                </div>

                {/* Division name (short) */}
                <span
                  className="font-display font-semibold text-center leading-tight transition-colors duration-200 group-hover:text-accent-blue"
                  style={{
                    fontSize: '12px',
                    color:    'var(--text-primary)',
                  }}
                >
                  {division.name.replace('Aventia ', '')}
                </span>

                {/* Status badge */}
                {division.status === 'live' ? (
                  <span
                    className="badge badge-live"
                    style={{ fontSize: '9px', padding: '2px 7px', lineHeight: 1.4 }}
                  >
                    {locale === 'es' ? 'Activo' : 'Live'}
                  </span>
                ) : (
                  <span
                    className="badge badge-coming-soon"
                    style={{ fontSize: '9px', padding: '2px 7px', lineHeight: 1.4 }}
                  >
                    {locale === 'es' ? 'Próximo' : 'Soon'}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { locale } = useLocale()

  return (
    <div
      className="-mt-[72px] pt-[72px] relative overflow-hidden flex flex-col"
      style={{ minHeight: '100vh' }}
    >

      {/* ══ BACKGROUND LAYERS (z-0) ══════════════════════════ */}

      {/* Layer 1: Base surface */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--bg-primary)' }}
        aria-hidden="true"
      />

      {/* Layer 2: Dot grid — subtle depth texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 1px 1px, rgba(37,99,235,0.13) 1px, transparent 0)',
          ].join(','),
          backgroundSize: '32px 32px',
          opacity:        0.5,
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Large static radial overlay — softens the grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(239,246,255,0.9) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 100% 100%, rgba(239,246,255,0.7) 0%, transparent 70%)',
          ].join(','),
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Floating color blobs — the animated "mesh" effect */}
      {/* Blob A — large blue, top-right */}
      <FloatingBlob
        width={420}
        height={420}
        color="rgba(37,99,235,0.09)"
        top="8%"
        right="6%"
        duration={22}
        delay={0}
      />
      {/* Blob B — medium cyan, bottom-left */}
      <FloatingBlob
        width={320}
        height={320}
        color="rgba(8,145,178,0.09)"
        bottom="15%"
        left="4%"
        duration={18}
        delay={4}
      />
      {/* Blob C — small blue, center */}
      <FloatingBlob
        width={180}
        height={180}
        color="rgba(37,99,235,0.07)"
        top="42%"
        right="28%"
        duration={14}
        delay={8}
      />

      {/* Layer 5: Bottom fade — merges hero into StatsBar */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height:     '180px',
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ══ CONTENT (z-10) ═══════════════════════════════════ */}
      <div
        className="relative z-10 container-aventia flex flex-col items-center flex-1 justify-center"
        style={{ paddingTop: '80px', paddingBottom: '48px' }}
      >

        {/* Animated content group */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center w-full"
          style={{ maxWidth: '820px', margin: '0 auto' }}
        >

          {/* ── Section label ──────────────────────────────── */}
          <motion.div
            variants={phraseRevealVariants}
            className="flex justify-center mb-7"
          >
            <span className="section-label">
              {locale === 'es'
                ? 'Tecnología · Energía · Innovación'
                : 'Technology · Energy · Innovation'}
            </span>
          </motion.div>

          {/* ── Headline (phrase-by-phrase blur reveal) ─────── */}
          <h1
            className="hero-headline"
            style={{
              color:         'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {/* Phrase 1 */}
            <motion.span
              variants={phraseRevealVariants}
              className="block"
            >
              {locale === 'es' ? 'Una Empresa.' : 'One Company.'}
            </motion.span>

            {/* Phrase 2 — gradient highlight */}
            <motion.span
              variants={phraseRevealVariants}
              className="block"
              style={{
                background:           'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
              }}
            >
              {locale === 'es' ? 'Cinco Divisiones.' : 'Five Divisions.'}
            </motion.span>

            {/* Phrase 3 */}
            <motion.span
              variants={phraseRevealVariants}
              className="block"
            >
              {locale === 'es' ? 'Potencial Ilimitado.' : 'Limitless Potential.'}
            </motion.span>
          </h1>

          {/* ── Subheadline ─────────────────────────────────── */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans"
            style={{
              fontSize:   '20px',
              lineHeight: '1.75',
              color:      'var(--text-secondary)',
              maxWidth:   '600px',
              margin:     '24px auto 0',
            }}
          >
            {locale === 'es'
              ? 'Aventia Global ofrece ahorro de energía, internet rápido, tecnología premium, servicios de IA e innovación aérea — todo desde Texas.'
              : 'Aventia Global delivers energy savings, fast internet, premium tech, AI services, and aerial innovation — all from Texas.'}
          </motion.p>

          {/* ── CTA Buttons ─────────────────────────────────── */}
          <motion.div variants={fadeUpVariants} className="mt-10">
            <ButtonGroup align="center" gap="md">
              <Button
                asChild
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} strokeWidth={2} />}
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
          </motion.div>

          {/* ── Trust line ──────────────────────────────────── */}
          <motion.p
            variants={fadeUpVariants}
            className="font-sans font-medium mt-5"
            style={{ fontSize: '13px', color: 'var(--text-muted)' }}
          >
            {locale === 'es'
              ? '🇺🇸 Con sede en Texas · Certificada por PUC · Bilingüe EN + ES'
              : '🇺🇸 Texas-based · PUC Licensed · Bilingual EN + ES'}
          </motion.p>
        </motion.div>

        {/* ── Division preview strip ──────────────────────── */}
        <div className="mt-14 w-full">
          <DivisionStrip locale={locale} />
        </div>
      </div>

      {/* ══ SCROLL INDICATOR (z-10) ══════════════════════════ */}
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
            opacity:       0.55,
          }}
        >
          {locale === 'es' ? 'Explorar' : 'Scroll'}
        </p>

        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration:   1.6,
            repeat:     Infinity,
            ease:       'easeInOut',
          }}
        >
          <ChevronDown
            size={18}
            style={{ color: 'var(--text-muted)', opacity: 0.45 }}
          />
        </motion.div>
      </div>

    </div>
  )
}
