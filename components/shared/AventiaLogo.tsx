// components/shared/AventiaLogo.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type LogoSize = 'sm' | 'md' | 'lg'
type LogoVariant = 'default' | 'white' | 'dark'
type Division = 'energy' | 'connect' | 'store' | 'ai' | 'drones'

export interface AventiaLogoProps {
  /** Icon + text size preset */
  size?: LogoSize
  /**
   * Color variant:
   *  'default' — blue→cyan gradient wordmark (light backgrounds)
   *  'white'   — all white (dark/colored backgrounds)
   *  'dark'    — forced dark text #0F172A (when gradient causes contrast issues)
   */
  variant?: LogoVariant
  /**
   * Division mode: renders "AVENTIA [DIVISION]" with division accent color.
   * null = show "AVENTIA" only.
   */
  division?: Division | null
  /** Show the SVG globe-orbit icon to the left of the wordmark */
  showIcon?: boolean
  /**
   * When provided, wraps the entire logo in a Next.js <Link>.
   * The link gets an accessible aria-label automatically.
   */
  href?: string
  className?: string
  /** Override the default accessible label */
  'aria-label'?: string
}

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────

const SIZE_CONFIG: Record<LogoSize, {
  iconSize: number
  fontSize: string
  gap: string
  divisionGap: string
}> = {
  sm: { iconSize: 18, fontSize: '13px', gap: '6px',  divisionGap: '0.28em' },
  md: { iconSize: 26, fontSize: '18px', gap: '8px',  divisionGap: '0.30em' },
  lg: { iconSize: 34, fontSize: '24px', gap: '10px', divisionGap: '0.32em' },
}

/** Division accent colors from the design system */
const DIVISION_ACCENTS: Record<Division, string> = {
  energy:  '#D97706',
  connect: '#0891B2',
  store:   '#7C3AED',
  ai:      '#059669',
  drones:  '#DC2626',
}

// ─────────────────────────────────────────────────────────────
// SVG ICON — Globe with orbital ring
// ─────────────────────────────────────────────────────────────
// Design: A sphere (circle) crossed by a tilted elliptical orbit ring,
// with a center node dot. Suggests global reach and technology orbit.
// Renders cleanly at all sizes from 18px to 64px.
// The gradient ID "aventia-g" is static — safe because all instances
// use the identical gradient (same blue→cyan), so sharing the definition
// across multiple SVG instances on the same page is visually correct.

function GlobeOrbitIcon({
  size,
  variant,
}: {
  size: number
  variant: LogoVariant
}) {
  const isWhite = variant === 'white'
  const isDark = variant === 'dark'

  const strokeRef = isWhite ? 'white' : isDark ? '#0F172A' : 'url(#aventia-g)'
  const fillRef   = isWhite ? 'white' : isDark ? '#0F172A' : 'url(#aventia-g)'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Globe sphere — main circle */}
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke={strokeRef}
        strokeWidth="2"
        fill="none"
      />

      {/*
        Orbital ring — tilted ellipse that extends slightly beyond
        the globe edge, creating a Saturn-like orbit ring effect.
        Tilted at -22° for a dynamic, non-static feel.
        strokeOpacity on the ring gives depth vs the solid globe edge.
      */}
      <ellipse
        cx="16"
        cy="16"
        rx="15"
        ry="5.5"
        stroke={strokeRef}
        strokeWidth="1.8"
        fill="none"
        transform="rotate(-22 16 16)"
        strokeOpacity={isWhite || isDark ? 0.75 : 0.85}
      />

      {/* Center node — anchors the globe visually */}
      <circle
        cx="16"
        cy="16"
        r="2.5"
        fill={fillRef}
      />

      {/* Gradient definition — only rendered for 'default' variant */}
      {!isWhite && !isDark && (
        <defs>
          <linearGradient
            id="aventia-g"
            x1="5"
            y1="5"
            x2="27"
            y2="27"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#0891B2" />
          </linearGradient>
        </defs>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// LOGO COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AventiaLogo({
  size = 'md',
  variant = 'default',
  division = null,
  showIcon = true,
  href,
  className,
  'aria-label': ariaLabel,
}: AventiaLogoProps) {
  const config = SIZE_CONFIG[size]
  const isWhite = variant === 'white'
  const isDark  = variant === 'dark'

  // ── Base letterform style (shared between AVENTIA + division) ──
  const baseLetterStyle: CSSProperties = {
    fontFamily:    'var(--font-display)',
    fontSize:      config.fontSize,
    fontWeight:    800,
    letterSpacing: '0.15em',
    lineHeight:    1,
    textTransform: 'uppercase',
    display:       'inline-block',
  }

  // ── "AVENTIA" wordmark style ───────────────────────────────────
  const aventiaStyle: CSSProperties = isWhite
    ? { ...baseLetterStyle, color: '#FFFFFF' }
    : isDark
    ? { ...baseLetterStyle, color: '#0F172A' }
    : {
        ...baseLetterStyle,
        background:              'linear-gradient(135deg, #2563EB, #0891B2)',
        WebkitBackgroundClip:    'text',
        WebkitTextFillColor:     'transparent',
        backgroundClip:          'text',
        // Fallback for browsers without background-clip: text
        color:                   '#2563EB',
      }

  // ── Division name style ────────────────────────────────────────
  const divisionStyle: CSSProperties | undefined = division
    ? {
        ...baseLetterStyle,
        color: isWhite
          ? 'rgba(255,255,255,0.65)'
          : isDark
          ? '#334155'
          : DIVISION_ACCENTS[division],
      }
    : undefined

  // ── Compute default aria-label ─────────────────────────────────
  const defaultAriaLabel = division
    ? `Aventia ${division.charAt(0).toUpperCase() + division.slice(1)}`
    : 'Aventia Global'

  // ── Inner markup (icon + wordmark) ────────────────────────────
  const inner = (
    <span
      className={cn('inline-flex items-center select-none', className)}
      style={{ gap: config.gap }}
    >
      {/* Globe-orbit SVG icon */}
      {showIcon && (
        <GlobeOrbitIcon size={config.iconSize} variant={variant} />
      )}

      {/* Wordmark */}
      <span
        className="inline-flex items-baseline"
        style={{ gap: config.divisionGap }}
      >
        <span style={aventiaStyle}>AVENTIA</span>

        {division && (
          <span style={divisionStyle}>
            {division.toUpperCase()}
          </span>
        )}
      </span>
    </span>
  )

  // ── With link wrapper ──────────────────────────────────────────
  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center"
        style={{ textDecoration: 'none' }}
        aria-label={ariaLabel ?? `${defaultAriaLabel} — Home`}
      >
        {inner}
      </Link>
    )
  }

  // ── Without link ──────────────────────────────────────────────
  return (
    <span
      role="img"
      aria-label={ariaLabel ?? defaultAriaLabel}
    >
      {inner}
    </span>
  )
}
