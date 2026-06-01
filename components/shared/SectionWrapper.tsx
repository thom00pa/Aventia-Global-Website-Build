// components/shared/SectionWrapper.tsx
'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

/**
 * Container variant — when stagger=true, staggers direct children.
 * Used on the motion.div inside SectionWrapper.
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

/**
 * Item variant — each SectionItem animates with this.
 * Also used as the single animation when stagger=false.
 */
const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
}

// ─────────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────────

export interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  /**
   * Background color. Sections should alternate to create
   * visual rhythm: white → off-white → blue-tint → white → ...
   * @default 'white'
   */
  bg?: 'white' | 'off-white' | 'blue-tint' | 'dark'
  /**
   * Vertical padding preset.
   * @default 'default'
   */
  padding?: 'default' | 'sm' | 'lg' | 'none'
  /**
   * When true, wraps children in a container-aventia div
   * (max-width 1200px, centered, 24px side padding).
   * Set false for full-bleed sections like hero.
   * @default true
   */
  contained?: boolean
  /**
   * Animates the section content into view on scroll.
   * Uses Framer Motion whileInView with once:true.
   * @default true
   */
  animate?: boolean
  /**
   * When true, children are staggered.
   * Wrap direct children in <SectionItem> to receive stagger.
   * @default false
   */
  stagger?: boolean
  /** HTML id for anchor navigation e.g. /#about */
  id?: string
}

const BG_STYLES: Record<string, React.CSSProperties> = {
  'white':     { background: '#FFFFFF' },
  'off-white': { background: 'var(--bg-primary)' },
  'blue-tint': { background: 'var(--bg-blue-tint)' },
  'dark':      { background: '#0F172A' },
}

const PADDING_STYLES: Record<string, React.CSSProperties> = {
  default: {
    paddingTop:    'var(--section-padding-y)',
    paddingBottom: 'var(--section-padding-y)',
  },
  sm: {
    paddingTop:    'var(--section-padding-y-sm)',
    paddingBottom: 'var(--section-padding-y-sm)',
  },
  lg: {
    paddingTop:    'calc(var(--section-padding-y) * 1.4)',
    paddingBottom: 'calc(var(--section-padding-y) * 1.4)',
  },
  none: {},
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      children,
      className,
      bg = 'white',
      padding = 'default',
      contained = true,
      animate = true,
      stagger = false,
      id,
    },
    ref
  ) => {
    const sectionStyle: React.CSSProperties = {
      ...BG_STYLES[bg],
      ...PADDING_STYLES[padding],
    }

    // ── Inner content (with optional container) ───────────
    const content = contained ? (
      <div className="container-aventia">{children}</div>
    ) : (
      children
    )

    // ── No animation — plain section ──────────────────────
    if (!animate) {
      return (
        <section
          ref={ref}
          id={id}
          className={className}
          style={sectionStyle}
        >
          {content}
        </section>
      )
    }

    // ── Stagger — children should be wrapped in SectionItem ──
    if (stagger) {
      return (
        <section
          ref={ref}
          id={id}
          className={className}
          style={sectionStyle}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {contained ? (
              <div className="container-aventia">{children}</div>
            ) : (
              children
            )}
          </motion.div>
        </section>
      )
    }

    // ── Default — whole section fades up as one unit ──────
    return (
      <motion.section
        ref={ref as React.Ref<HTMLElement>}
        id={id}
        className={className}
        style={sectionStyle}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {content}
      </motion.section>
    )
  }
)

SectionWrapper.displayName = 'SectionWrapper'

// ─────────────────────────────────────────────────────────────
// SECTION ITEM
// ─────────────────────────────────────────────────────────────
// Wrap individual items inside a stagger SectionWrapper.
// Each SectionItem picks up the stagger delay automatically.
//
// Usage:
//   <SectionWrapper stagger>
//     <SectionItem><Card>...</Card></SectionItem>
//     <SectionItem><Card>...</Card></SectionItem>
//     <SectionItem><Card>...</Card></SectionItem>
//   </SectionWrapper>

export interface SectionItemProps {
  children: React.ReactNode
  className?: string
  /** Manual delay override in seconds (rarely needed) */
  delay?: number
}

export function SectionItem({ children, className, delay }: SectionItemProps) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={delay !== undefined ? { duration: 0.55, delay } : undefined}
    >
      {children}
    </motion.div>
  )
}

SectionItem.displayName = 'SectionItem'

// ─────────────────────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────────────────────
// The standard label + headline + subheadline pattern used in
// every section across the site. Import and use directly —
// does NOT need to be inside a SectionWrapper.
//
// Usage:
//   <SectionHeading
//     label="Why Choose Us"
//     labelEs="Por Qué Elegirnos"
//     headline="Energy savings made simple"
//     headlineEs="Ahorro de energía hecho simple"
//     subheadline="Compare 40+ Texas energy providers in seconds."
//     subheadlineEs="Compara más de 40 proveedores de energía en Texas en segundos."
//     locale={locale}
//     align="center"
//   />

export interface SectionHeadingProps {
  /** Tiny uppercase label above the headline */
  label?: string
  labelEs?: string
  /** Main section headline */
  headline: string
  headlineEs?: string
  /**
   * When true, applies the brand gradient to the entire headline.
   * Useful when the headline IS the visual hero of the section.
   * @default false
   */
  headlineGradient?: boolean
  /** Supporting text below the headline — 1–2 sentences max */
  subheadline?: string
  subheadlineEs?: string
  /** @default 'left' */
  align?: 'left' | 'center'
  locale?: 'en' | 'es'
  className?: string
  /** Override the max-width of the subheadline text (default: 600px) */
  subheadlineMaxWidth?: string
}

export function SectionHeading({
  label,
  labelEs,
  headline,
  headlineEs,
  headlineGradient = false,
  subheadline,
  subheadlineEs,
  align = 'left',
  locale = 'en',
  className,
  subheadlineMaxWidth = '600px',
}: SectionHeadingProps) {
  const displayLabel      = locale === 'es' && labelEs      ? labelEs      : label
  const displayHeadline   = locale === 'es' && headlineEs   ? headlineEs   : headline
  const displaySubhead    = locale === 'es' && subheadlineEs ? subheadlineEs : subheadline

  const isCenter = align === 'center'

  const headlineStyle: React.CSSProperties = headlineGradient
    ? {
        background:           'var(--accent-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        backgroundClip:       'text',
      }
    : { color: 'var(--text-primary)' }

  return (
    <div
      className={cn(
        'flex flex-col',
        isCenter ? 'items-center text-center' : 'items-start',
        className
      )}
    >
      {/* Section label */}
      {displayLabel && (
        <span className="section-label mb-4">{displayLabel}</span>
      )}

      {/* Headline */}
      <h2 className="section-headline" style={headlineStyle}>
        {displayHeadline}
      </h2>

      {/* Subheadline */}
      {displaySubhead && (
        <p
          className="font-sans mt-4"
          style={{
            fontSize:   '18px',
            lineHeight: '1.7',
            color:      'var(--text-secondary)',
            maxWidth:   isCenter ? subheadlineMaxWidth : undefined,
          }}
        >
          {displaySubhead}
        </p>
      )}
    </div>
  )
}

SectionHeading.displayName = 'SectionHeading'
