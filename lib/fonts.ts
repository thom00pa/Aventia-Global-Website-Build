// lib/fonts.ts

/**
 * Font family class utilities for Aventia Global.
 * Import these in components instead of hardcoding font family classes.
 *
 * Usage:
 *   import { displayFont, monoFont } from '@/lib/fonts'
 *   <h1 className={displayFont}>Headline</h1>
 *   <span className={monoFont}>48.2k</span>
 */

/** Exo 2 — Headlines, display text, section titles */
export const displayFont = 'font-display'

/** DM Sans — Body text, UI labels, navigation */
export const sansFont = 'font-sans'

/** JetBrains Mono — Stats, numbers, code snippets */
export const monoFont = 'font-mono'

/**
 * Pre-composed typography class strings
 * for common text patterns across the site.
 */
export const typography = {
  heroHeadline: 'font-display text-[72px] leading-[1.1] font-extrabold tracking-tight',
  sectionHeadline: 'font-display text-[48px] leading-[1.2] font-bold tracking-tight',
  cardTitle: 'font-display text-[24px] leading-[1.3] font-semibold',
  bodyLarge: 'font-sans text-[18px] leading-[1.7] font-normal',
  body: 'font-sans text-[16px] leading-[1.6] font-normal',
  label: 'font-sans text-[14px] leading-[1.5] font-medium',
  statNumber: 'font-mono text-[48px] leading-[1.1] font-medium',
  sectionLabel: 'font-sans text-[13px] font-semibold tracking-[0.12em] uppercase',
} as const

export type TypographyKey = keyof typeof typography
