// components/shared/Card.tsx
'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  Wifi,
  ShoppingBag,
  Brain,
  Navigation,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DIVISIONS } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────
// SHARED TYPES
// ─────────────────────────────────────────────────────────────

export type Locale = 'en' | 'es'

/** Maps the icon string from lib/constants.ts to Lucide components */
const DIVISION_ICONS: Record<string, React.ElementType> = {
  energy:  Zap,
  connect: Wifi,
  store:   ShoppingBag,
  ai:      Brain,
  drones:  Navigation,
}

// ─────────────────────────────────────────────────────────────
// 1. BASE CARD
// ─────────────────────────────────────────────────────────────
// Composable container. Accepts any children.
// Used as a building block for custom card layouts across the site.

export interface CardProps {
  children: React.ReactNode
  className?: string
  /**
   * Enable hover animation: lifts 4px, shadow deepens, border turns blue.
   * Set to false for non-interactive cards (e.g., inside a list item that
   * is itself a link).
   * @default true
   */
  hover?: boolean
  /**
   * Internal padding preset.
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Optional click handler — adds cursor:pointer automatically */
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const CARD_PADDING: Record<string, string> = {
  none: '',
  sm:   'p-5',
  md:   'p-8',
  lg:   'p-10',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, padding = 'md', onClick }, ref) => {
    const baseStyle: React.CSSProperties = {
      background:    'var(--bg-card)',
      border:        '1px solid var(--border)',
      borderRadius:  'var(--radius-md)',
      boxShadow:     'var(--shadow-card)',
      cursor:        onClick ? 'pointer' : undefined,
    }

    if (!hover) {
      return (
        <div
          ref={ref}
          className={cn(CARD_PADDING[padding], className)}
          style={baseStyle}
          onClick={onClick}
        >
          {children}
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={cn(CARD_PADDING[padding], className)}
        style={baseStyle}
        whileHover={{
          y: -4,
          boxShadow: '0 8px 40px rgba(37,99,235,0.15)',
          borderColor: 'var(--border-blue)',
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = 'Card'

// ─────────────────────────────────────────────────────────────
// 2. DIVISION CARD
// ─────────────────────────────────────────────────────────────
// Used in the homepage Divisions grid and any "Our Divisions"
// section. Each card links to its division subdomain.
// Hover shadow uses the division's accent color (not generic blue).

export type DivisionData = typeof DIVISIONS[number]

export interface DivisionCardProps {
  division: DivisionData
  /**
   * Locale for tagline translation.
   * @default 'en'
   */
  locale?: Locale
}

export function DivisionCard({ division, locale = 'en' }: DivisionCardProps) {
  const Icon = DIVISION_ICONS[division.id]
  const isLive = division.status === 'live'
  const tagline = locale === 'es' ? division.taglineEs : division.tagline

  return (
    <Link
      href={division.url}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      aria-label={`Go to ${division.name}`}
    >
      <motion.div
        style={{
          background:    'var(--bg-card)',
          border:        '1px solid var(--border)',
          borderRadius:  'var(--radius-md)',
          boxShadow:     'var(--shadow-card)',
          overflow:      'hidden',
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
        }}
        whileHover={{
          y: -6,
          // Shadow uses division accent color for a branded lift effect
          boxShadow: `0 12px 40px ${division.color}28`,
          borderColor: `${division.color}50`,
        }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Colored top accent bar ────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            height: '3px',
            background: `linear-gradient(90deg, ${division.color}, ${division.color}66)`,
            flexShrink: 0,
          }}
        />

        {/* ── Card body ─────────────────────────────────────── */}
        <div
          style={{
            padding:       '28px',
            flex:          1,
            display:       'flex',
            flexDirection: 'column',
          }}
        >
          {/* Icon + Status row */}
          <div
            style={{
              display:        'flex',
              alignItems:     'flex-start',
              justifyContent: 'space-between',
              marginBottom:   '20px',
            }}
          >
            {/* Division icon */}
            <div
              style={{
                width:          '44px',
                height:         '44px',
                borderRadius:   '12px',
                background:     `${division.color}18`,
                color:          division.color,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}
            >
              {Icon && <Icon size={20} strokeWidth={2} aria-hidden="true" />}
            </div>

            {/* Status badge */}
            {isLive ? (
              <span className="badge badge-live">
                {locale === 'es' ? 'Activo' : 'Live'}
              </span>
            ) : (
              <span className="badge badge-coming-soon">
                {locale === 'es' ? 'Próximo' : 'Soon'}
              </span>
            )}
          </div>

          {/* Division name */}
          <h3
            className="font-display font-semibold"
            style={{
              fontSize:     '18px',
              lineHeight:   '1.3',
              color:        'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            {division.name}
          </h3>

          {/* Tagline */}
          <p
            className="font-sans"
            style={{
              fontSize:   '14px',
              lineHeight: '1.6',
              color:      'var(--text-muted)',
              flex:       1,
            }}
          >
            {tagline}
          </p>

          {/* ── Footer CTA ──────────────────────────────────── */}
          <div
            style={{
              marginTop:      '20px',
              paddingTop:     '16px',
              borderTop:      '1px solid var(--border)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              className="font-sans font-semibold"
              style={{ fontSize: '13px', color: division.color }}
            >
              {isLive
                ? locale === 'es' ? 'Ver Planes' : 'View Plans'
                : locale === 'es' ? 'Notificarme' : 'Notify Me'}
            </span>
            <motion.span
              style={{ display: 'flex', color: division.color }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────
// 3. FEATURE CARD
// ─────────────────────────────────────────────────────────────
// Used in feature grids across all division pages and the homepage.
// Accepts any Lucide icon node, a title, and a description.
// Optionally links to an internal or external page.

export interface FeatureCardProps {
  /** Lucide icon component node, e.g. <Zap size={22} /> */
  icon: React.ReactNode
  title: string
  titleEs?: string
  description: string
  descriptionEs?: string
  /**
   * Accent color for the icon box background and tint.
   * Defaults to the brand blue.
   */
  accentColor?: string
  locale?: Locale
  /** When provided, renders a "Learn more →" link at the bottom */
  href?: string
  hrefLabelEn?: string
  hrefLabelEs?: string
  className?: string
}

export function FeatureCard({
  icon,
  title,
  titleEs,
  description,
  descriptionEs,
  accentColor = 'var(--accent-blue)',
  locale = 'en',
  href,
  hrefLabelEn = 'Learn more',
  hrefLabelEs = 'Saber más',
  className,
}: FeatureCardProps) {
  const displayTitle = locale === 'es' && titleEs ? titleEs : title
  const displayDesc  = locale === 'es' && descriptionEs ? descriptionEs : description
  const displayHref  = locale === 'es' ? hrefLabelEs : hrefLabelEn

  return (
    <motion.div
      className={className}
      style={{
        background:    'var(--bg-card)',
        border:        '1px solid var(--border)',
        borderRadius:  'var(--radius-md)',
        padding:       'var(--card-padding)',
        boxShadow:     'var(--shadow-card)',
        height:        '100%',
        display:       'flex',
        flexDirection: 'column',
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 40px rgba(37,99,235,0.15)',
        borderColor: 'var(--border-blue)',
      }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Icon box */}
      <div
        aria-hidden="true"
        style={{
          width:          '48px',
          height:         '48px',
          borderRadius:   '12px',
          background:     `${accentColor === 'var(--accent-blue)' ? 'rgba(37,99,235,0.10)' : accentColor + '18'}`,
          color:          accentColor,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          marginBottom:   '20px',
          flexShrink:     0,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="font-display font-semibold"
        style={{
          fontSize:     '20px',
          lineHeight:   '1.3',
          color:        'var(--text-primary)',
          marginBottom: '10px',
        }}
      >
        {displayTitle}
      </h3>

      {/* Description */}
      <p
        className="font-sans"
        style={{
          fontSize:   '15px',
          lineHeight: '1.65',
          color:      'var(--text-secondary)',
          flex:       1,
        }}
      >
        {displayDesc}
      </p>

      {/* Optional learn more link */}
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-sans font-semibold mt-5 transition-all duration-200 hover:gap-2"
          style={{
            fontSize:       '13px',
            color:          accentColor === 'var(--accent-blue)' ? 'var(--accent-blue)' : accentColor,
            textDecoration: 'none',
          }}
        >
          {displayHref}
          <ArrowRight size={12} strokeWidth={2.5} aria-hidden="true" />
        </Link>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// 4. STAT CARD
// ─────────────────────────────────────────────────────────────
// Used in the homepage stats bar (Prompt 15) and division page
// metrics sections. The value uses the .stat-number CSS class
// from globals.css — JetBrains Mono, 48px, brand gradient text.

export interface StatCardProps {
  /**
   * The metric value displayed in large gradient monospace font.
   * Can include formatting: "48.2k", "$2.4M", "99.9%", "5"
   */
  value: string
  /** Primary label below the value */
  label: string
  labelEs?: string
  /** Optional secondary descriptor below the label */
  sublabel?: string
  sublabelEs?: string
  /**
   * Override the gradient with a division accent color.
   * Useful for division-specific stat sections.
   */
  accentGradient?: string
  locale?: Locale
  className?: string
}

export function StatCard({
  value,
  label,
  labelEs,
  sublabel,
  sublabelEs,
  accentGradient,
  locale = 'en',
  className,
}: StatCardProps) {
  const displayLabel    = locale === 'es' && labelEs    ? labelEs    : label
  const displaySublabel = locale === 'es' && sublabelEs ? sublabelEs : sublabel

  // Custom gradient overrides the .stat-number CSS class gradient
  const valueStyle: React.CSSProperties = accentGradient
    ? {
        background:            accentGradient,
        WebkitBackgroundClip:  'text',
        WebkitTextFillColor:   'transparent',
        backgroundClip:        'text',
        fontFamily:            'var(--font-mono)',
        fontSize:              'var(--text-stat)',
        fontWeight:            500,
        lineHeight:            1.1,
      }
    : {}

  return (
    <motion.div
      className={cn('text-center', className)}
      style={{
        background:   'var(--bg-card)',
        border:       '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding:      '28px 20px',
        boxShadow:    'var(--shadow-card)',
      }}
      whileHover={{
        y: -3,
        boxShadow: 'var(--shadow-md)',
        borderColor: 'var(--border-blue)',
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Stat value */}
      {accentGradient ? (
        <div style={valueStyle}>{value}</div>
      ) : (
        <div className="stat-number">{value}</div>
      )}

      {/* Label */}
      <p
        className="font-sans font-medium"
        style={{
          fontSize:   '15px',
          lineHeight: '1.4',
          color:      'var(--text-secondary)',
          marginTop:  '8px',
        }}
      >
        {displayLabel}
      </p>

      {/* Optional sublabel */}
      {displaySublabel && (
        <p
          className="font-sans"
          style={{
            fontSize:  '12px',
            color:     'var(--text-muted)',
            marginTop: '4px',
          }}
        >
          {displaySublabel}
        </p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────

export { Card }
export default Card
