// components/sections/HeroSectionSpline.tsx
// Spline 3D alternative hero — swap with HeroSection.tsx via one import change.
// See: app/(main)/page.tsx → change HeroSection import to HeroSectionSpline
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
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
// SPLINE SCENE URL
// ─────────────────────────────────────────────────────────────
// Replace this placeholder with your scene URL from spline.design.
//
// How to get a scene URL:
//   1. Go to https://spline.design and sign up (free tier available)
//   2. Create a scene OR remix a community scene from
//      https://app.spline.design/community
//      Recommended searches: "globe", "orb", "tech", "3d sphere"
//   3. Click the Export button in the top bar
//   4. Choose "Spline Viewer" → copy the URL
//   5. The URL format is: https://prod.spline.design/[ID]/scene.splinecode
//   6. Paste it below and replace REPLACE_WITH_YOUR_SCENE_ID
//
// Good free community scenes to remix:
//   - Search "Spline globe" for a rotating Earth
//   - Search "abstract orb" for a glowing sphere
//   - Search "tech sphere" for a data visualization orb
//
const SPLINE_SCENE_URL =
  'https://prod.spline.design/REPLACE_WITH_YOUR_SCENE_ID/scene.splinecode'

// ─────────────────────────────────────────────────────────────
// SPLINE FALLBACK
// Shown while the scene loads or if WebGL is unavailable.
// Animated gradient orb that matches the brand aesthetic.
// ─────────────────────────────────────────────────────────────

function SplineFallbackGradient() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-blue-tint)' }}
      aria-hidden="true"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width:      '340px',
          height:     '340px',
          background: 'var(--accent-gradient)',
          opacity:    0.08,
          filter:     'blur(40px)',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width:      '220px',
          height:     '220px',
          border:     '1.5px solid rgba(37,99,235,0.25)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner ring — tilted (orbit) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width:     '160px',
          height:    '60px',
          border:    '1.5px solid rgba(8,145,178,0.30)',
          transform: 'rotateX(60deg)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width:      '80px',
          height:     '80px',
          background: 'var(--accent-gradient)',
          opacity:    0.25,
        }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Loading label */}
      <p
        className="absolute bottom-6 font-sans font-medium"
        style={{
          fontSize:  '11px',
          color:     'var(--text-muted)',
          opacity:   0.6,
          letterSpacing: '0.1em',
        }}
      >
        Loading 3D scene…
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// DYNAMIC IMPORT
// ssr: false is REQUIRED — Spline uses WebGL/browser APIs
// that are not available during server-side rendering.
// ─────────────────────────────────────────────────────────────

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr:     false,
  loading: () => <SplineFallbackGradient />,
})

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS (same as HeroSection.tsx)
// ─────────────────────────────────────────────────────────────

const heroContainerVariants = {
  hidden:   {},
  visible:  {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
}

const phraseRevealVariants = {
  hidden:   { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible:  {
    opacity: 1,
    y:       0,
    filter:  'blur(0px)',
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
  },
}

const fadeUpVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
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
// SPLINE CONTAINER
// Manages the loading → loaded state transition.
// Fades the scene in once WebGL renders to prevent a jarring pop.
// On load error, falls back to the gradient orb permanently.
// ─────────────────────────────────────────────────────────────

function SplineContainer() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // If scene URL is still the placeholder, show the fallback
  const isPlaceholder = SPLINE_SCENE_URL.includes('REPLACE_WITH_YOUR_SCENE_ID')

  if (isPlaceholder || hasError) {
    return (
      <div className="w-full h-full relative">
        <SplineFallbackGradient />
        {isPlaceholder && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div
              className="font-mono text-[11px] px-3 py-2 rounded-lg text-center max-w-[220px]"
              style={{
                background: 'rgba(37,99,235,0.12)',
                color:      'var(--accent-blue)',
                border:     '1px solid rgba(37,99,235,0.2)',
                lineHeight: '1.5',
              }}
            >
              Replace SPLINE_SCENE_URL
              <br />
              at top of this file
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {/* Show fallback below scene until Spline loads */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <SplineFallbackGradient />
        </div>
      )}

      {/* Spline scene — fades in on load */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <Spline
          scene={SPLINE_SCENE_URL}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FLOATING BLOB (same as HeroSection.tsx — duplicated for
// standalone deployability of each hero variant)
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
      animate={{ x: [0, 18, -12, 14, 0], y: [0, -22, 10, -14, 0] }}
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
// DIVISION STRIP (same as HeroSection.tsx — duplicated)
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

      <div
        className="glass rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border-blue)' }}
      >
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
                <span
                  className="font-display font-semibold text-center leading-tight transition-colors duration-200 group-hover:text-accent-blue"
                  style={{ fontSize: '12px', color: 'var(--text-primary)' }}
                >
                  {division.name.replace('Aventia ', '')}
                </span>
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
// HERO SECTION SPLINE — MAIN COMPONENT
//
// Layout:
//   Desktop (≥ 1024px): 2-column grid
//     Left 55%: text content, CTAs
//     Right 45%: Spline 3D scene in a rounded card
//   Mobile (< 1024px): single column, Spline hidden
//
// This component exports as default with the name HeroSection
// so it's a drop-in replacement for the CSS hero in page.tsx:
//   import HeroSection from '@/components/sections/HeroSectionSpline'
// ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { locale } = useLocale()

  return (
    <div
      className="-mt-[72px] pt-[72px] relative overflow-hidden flex flex-col"
      style={{ minHeight: '100vh' }}
    >

      {/* ══ BACKGROUND LAYERS ════════════════════════════════ */}

      <div
        className="absolute inset-0"
        style={{ background: 'var(--bg-primary)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(37,99,235,0.12) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          opacity: 0.45,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 70% 60% at 50% 0%,    rgba(239,246,255,0.95) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 50% at 100% 100%, rgba(239,246,255,0.70) 0%, transparent 70%)',
          ].join(','),
        }}
        aria-hidden="true"
      />

      {/* Floating blobs — LEFT side only (Spline is on right) */}
      <FloatingBlob
        width={300} height={300}
        color="rgba(37,99,235,0.08)"
        top="15%" left="0%"
        duration={20} delay={0}
      />
      <FloatingBlob
        width={200} height={200}
        color="rgba(8,145,178,0.07)"
        bottom="20%" left="10%"
        duration={16} delay={5}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height:     '160px',
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)',
          zIndex:     2,
        }}
        aria-hidden="true"
      />

      {/* ══ CONTENT ══════════════════════════════════════════ */}
      <div
        className="relative z-10 container-aventia flex-1 flex flex-col justify-center"
        style={{ paddingTop: '80px', paddingBottom: '48px' }}
      >
        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Text content ─────────────────────────── */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Section label */}
            <motion.div variants={phraseRevealVariants} className="mb-7">
              <span className="section-label">
                {locale === 'es'
                  ? 'Tecnología · Energía · Innovación'
                  : 'Technology · Energy · Innovation'}
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="hero-headline"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              <motion.span variants={phraseRevealVariants} className="block">
                {locale === 'es' ? 'Una Empresa.' : 'One Company.'}
              </motion.span>
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
              <motion.span variants={phraseRevealVariants} className="block">
                {locale === 'es' ? 'Potencial Ilimitado.' : 'Limitless Potential.'}
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              className="font-sans mt-6"
              style={{
                fontSize:   '18px',
                lineHeight: '1.75',
                color:      'var(--text-secondary)',
                maxWidth:   '520px',
              }}
            >
              {locale === 'es'
                ? 'Aventia Global ofrece ahorro de energía, internet rápido, tecnología premium, servicios de IA e innovación aérea — todo desde Texas.'
                : 'Aventia Global delivers energy savings, fast internet, premium tech, AI services, and aerial innovation — all from Texas.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariants} className="mt-9">
              <ButtonGroup align="start" gap="md">
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
                <Button asChild variant="secondary" size="lg">
                  <Link href="#about">
                    {locale === 'es' ? 'Sobre Aventia' : 'About Aventia'}
                  </Link>
                </Button>
              </ButtonGroup>
            </motion.div>

            {/* Trust line */}
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

          {/* ── RIGHT: Spline 3D scene — desktop only ────────── */}
          {/* Hidden on mobile (hidden lg:block) to protect performance */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Scene card */}
            <div
              style={{
                position:     'relative',
                height:       '520px',
                borderRadius: 'var(--radius-lg)',
                overflow:     'hidden',
                border:       '1px solid var(--border-blue)',
                boxShadow:    'var(--shadow-lg)',
                background:   'var(--bg-blue-tint)',
              }}
            >
              {/* Glow ring behind the scene card */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-30 blur-xl pointer-events-none"
                style={{ background: 'var(--accent-gradient)', zIndex: -1 }}
                aria-hidden="true"
              />

              {/* Spline scene */}
              <SplineContainer />

              {/* Subtle gradient overlay at bottom of scene */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height:     '80px',
                  background: 'linear-gradient(to top, rgba(239,246,255,0.6), transparent)',
                  zIndex:     1,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Caption below the scene */}
            <p
              className="font-sans text-center mt-3"
              style={{
                fontSize:      '11px',
                color:         'var(--text-muted)',
                letterSpacing: '0.06em',
              }}
            >
              {locale === 'es'
                ? 'Interactivo — arrastra para rotar'
                : 'Interactive — drag to rotate'}
            </p>
          </motion.div>
        </div>

        {/* ── Division strip ──────────────────────────────── */}
        <div className="mt-14 w-full">
          <DivisionStrip locale={locale} />
        </div>
      </div>

      {/* ══ SCROLL INDICATOR ═════════════════════════════════ */}
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
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ color: 'var(--text-muted)', opacity: 0.45 }} />
        </motion.div>
      </div>

    </div>
  )
}
