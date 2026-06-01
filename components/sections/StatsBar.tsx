// components/sections/StatsBar.tsx
// Full implementation — replaces placeholder from Prompt 12.
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { SectionWrapper } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

/** A stat whose value animates from 0 to a target number */
type NumericStat = {
  kind:          'number'
  to:            number
  from?:         number
  /** Decimal places to show. 0 = integer. */
  decimals?:     number
  prefix?:       string
  suffix?:       string
  /** Duration of the count-up in seconds */
  animDuration?: number
}

/** A stat with a fixed text value (e.g. "24/7", "EN+ES") */
type TextStat = {
  kind:    'text'
  display: string
}

type StatBase = {
  id:          string
  labelEn:     string
  labelEs:     string
  sublabelEn?: string
  sublabelEs?: string
}

type StatDefinition = (NumericStat | TextStat) & StatBase

// ─────────────────────────────────────────────────────────────
// STATS DATA
// ─────────────────────────────────────────────────────────────
// Four stats chosen to be factually accurate for Aventia Global:
// $0.099/kWh — real market starting rate for Texas energy plans
// 5          — actual number of divisions in the portfolio
// EN+ES      — actual bilingual commitment (text, not counted)
// 24/7       — actual customer support promise (text, not counted)
//
// To update stats: change the values here only. No other code changes.

const STATS: StatDefinition[] = [
  {
    kind:         'number',
    id:           'rate',
    to:           0.099,
    from:         0,
    decimals:     3,
    prefix:       '$',
    animDuration: 2.2,
    labelEn:      'Per kWh Starting',
    labelEs:      'Por kWh Inicial',
    sublabelEn:   'Lowest available plan',
    sublabelEs:   'Plan más económico',
  },
  {
    kind:         'number',
    id:           'divisions',
    to:           5,
    from:         0,
    decimals:     0,
    animDuration: 1.6,
    labelEn:      'Active Divisions',
    labelEs:      'Divisiones Activas',
    sublabelEn:   'And growing',
    sublabelEs:   'Y creciendo',
  },
  {
    kind:        'text',
    id:          'languages',
    display:     'EN+ES',
    labelEn:     'Languages',
    labelEs:     'Idiomas',
    sublabelEn:  'Bilingual service',
    sublabelEs:  'Servicio bilingüe',
  },
  {
    kind:        'text',
    id:          'support',
    display:     '24/7',
    labelEn:     'Customer Support',
    labelEs:     'Soporte al Cliente',
    sublabelEn:  'Always available',
    sublabelEs:  'Siempre disponible',
  },
]

// ─────────────────────────────────────────────────────────────
// COUNT UP NUMBER
// Animated number that counts from `from` to `to` once the
// element enters the viewport.
//
// Uses framer-motion's standalone animate() to drive a React
// state value. The hasRun ref prevents re-animation on
// subsequent inView triggers (once: true equivalent for state).
// ─────────────────────────────────────────────────────────────

interface CountUpProps {
  to:           number
  from?:        number
  decimals?:    number
  prefix?:      string
  suffix?:      string
  duration?:    number
}

function CountUpNumber({
  to,
  from       = 0,
  decimals   = 0,
  prefix     = '',
  suffix     = '',
  duration   = 2.0,
}: CountUpProps) {
  const [value, setValue] = useState<number>(from)
  const spanRef           = useRef<HTMLSpanElement>(null)
  const hasRun            = useRef(false)

  // useInView detects when the span enters the viewport.
  // margin: '-40px' gives a 40px head start so the animation
  // begins just as the section scrolls into comfortable view.
  const inView = useInView(spanRef, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    // animate() drives a raw number from `from` to `to`.
    // onUpdate fires on every animation frame.
    const controls = animate(from, to, {
      duration,
      // Custom cubic-bezier: fast start, smooth deceleration.
      // Feels like a "ticker" settling on the final value.
      ease: [0, 0.55, 0.45, 1.0] as [number, number, number, number],
      onUpdate: (v) => setValue(v),
    })

    // Cleanup: stop animation if component unmounts mid-count.
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  // Format the animated value with the specified decimal places.
  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toString()

  return (
    <span ref={spanRef} className="stat-number">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// STAT ITEM
// A single stat cell. Handles both numeric (CountUpNumber) and
// text (motion.span with fade-in) stat types.
// Also carries the cell border for the grid divider system.
// ─────────────────────────────────────────────────────────────

interface StatItemProps {
  stat:   StatDefinition
  locale: Locale
}

function StatItem({ stat, locale }: StatItemProps) {
  const cellRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(cellRef, { once: true, margin: '-40px' })

  const label    = locale === 'es' ? stat.labelEs    : stat.labelEn
  const sublabel = locale === 'es' ? stat.sublabelEs : stat.sublabelEn

  return (
    <div
      ref={cellRef}
      className="flex flex-col items-center justify-center text-center py-10 px-6"
      style={{
        // Each cell provides its own right + bottom border.
        // Combined with the parent's top + left border,
        // this creates a seamless grid of dividers at
        // any responsive breakpoint.
        borderRight:  '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* ── Stat value ─────────────────────────────────── */}
      {stat.kind === 'number' ? (
        // Numeric: count-up animation driven by CountUpNumber.
        // CountUpNumber applies the .stat-number class internally.
        <CountUpNumber
          to={stat.to}
          from={stat.from}
          decimals={stat.decimals}
          prefix={stat.prefix}
          suffix={stat.suffix}
          duration={stat.animDuration}
        />
      ) : (
        // Text: simple fade-in when cell enters view.
        // .stat-number applies the gradient + mono font.
        <motion.span
          className="stat-number"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {stat.display}
        </motion.span>
      )}

      {/* ── Label ────────────────────────────────────────── */}
      <motion.p
        className="font-sans font-medium"
        style={{
          fontSize:   '15px',
          lineHeight: '1.4',
          color:      'var(--text-secondary)',
          marginTop:  '10px',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        {label}
      </motion.p>

      {/* ── Sublabel ─────────────────────────────────────── */}
      {sublabel && (
        <motion.p
          className="font-sans"
          style={{
            fontSize:   '13px',
            color:      'var(--text-muted)',
            marginTop:  '4px',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
        >
          {sublabel}
        </motion.p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// STATS BAR — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function StatsBar() {
  const { locale } = useLocale()

  return (
    <SectionWrapper
      bg="off-white"
      padding="none"
      id="stats"
      // animate={false}: individual StatItems have their own
      // enter animations. The SectionWrapper fade would mask
      // the count-up as it begins, so we disable it here.
      animate={false}
    >
      <div
        className="container-aventia"
        style={{
          // Top + bottom borders create clear visual separation
          // from the hero (same bg-primary background) and the
          // Divisions section (white background) below.
          borderTop:    '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/*
          Border grid system:
          Parent carries border-left.
          Each cell carries border-right + border-bottom.
          Together these render a complete cell border at any
          column count (grid-cols-2 on mobile, grid-cols-4 on md+).
        */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft: '1px solid var(--border)' }}
        >
          {STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} locale={locale} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
