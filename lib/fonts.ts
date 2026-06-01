// lib/fonts.ts
import { Exo_2, DM_Sans, JetBrains_Mono } from 'next/font/google'

// ── Exo 2 — Headlines, display text, section titles ──────────────
export const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

// ── DM Sans — Body text, UI labels, navigation ───────────────────
export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

// ── JetBrains Mono — Stats, numbers, code snippets ───────────────
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
})

/**
 * Combined CSS variable class string.
 * Apply to the <html> element in app/layout.tsx.
 * This injects --font-display, --font-sans, --font-mono as CSS vars.
 *
 * Usage in layout.tsx:
 *   import { fontVariables } from '@/lib/fonts'
 *   <html className={fontVariables}>
 */
export const fontVariables = `${exo2.variable} ${dmSans.variable} ${jetbrainsMono.variable}`

/**
 * Pre-composed Tailwind typography class strings.
 * Import and spread into className wherever needed in components.
 *
 * Usage:
 *   import { typography } from '@/lib/fonts'
 *   <h1 className={typography.heroHeadline}>Headline</h1>
 */
export const typography = {
  heroHeadline:
    'font-display text-[72px] leading-[1.1] font-extrabold tracking-[-0.02em]',
  sectionHeadline:
    'font-display text-[48px] leading-[1.2] font-bold tracking-[-0.02em]',
  cardTitle:
    'font-display text-[24px] leading-[1.3] font-semibold',
  bodyLarge:
    'font-sans text-[18px] leading-[1.7] font-normal',
  body:
    'font-sans text-[16px] leading-[1.6] font-normal',
  label:
    'font-sans text-[14px] leading-[1.5] font-medium',
  statNumber:
    'font-mono text-[48px] leading-[1.1] font-medium',
  sectionLabel:
    'font-sans text-[13px] font-semibold tracking-[0.12em] uppercase',
} as const

export type TypographyKey = keyof typeof typography
