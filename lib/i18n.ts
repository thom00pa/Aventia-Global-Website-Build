// lib/i18n.ts
import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const SUPPORTED_LOCALES = ['en', 'es'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]
const DEFAULT_LOCALE: Locale = 'en'

function isValidLocale(value: string | undefined): value is Locale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export default getRequestConfig(async () => {
  // Priority 1: NEXT_LOCALE cookie (set by client-side language switcher)
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value

  // Priority 2: x-locale header (set by middleware from cookie/Accept-Language)
  const headerStore = await headers()
  const headerLocale = headerStore.get('x-locale') ?? undefined

  // Resolve locale with fallback chain
  const locale: Locale = isValidLocale(cookieLocale)
    ? cookieLocale
    : isValidLocale(headerLocale)
    ? headerLocale
    : DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // Time zone for date formatting — Texas is Central Time
    timeZone: 'America/Chicago',
    // Formats for numbers and dates used across the site
    formats: {
      number: {
        currency: {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        },
        kwh: {
          style: 'decimal',
          minimumFractionDigits: 3,
          maximumFractionDigits: 4,
        },
      },
    },
  }
})
