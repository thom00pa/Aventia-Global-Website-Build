// hooks/use-locale.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

export type Locale = 'en' | 'es'
const SUPPORTED: Locale[] = ['en', 'es']
const COOKIE_KEY = 'NEXT_LOCALE'
const STORAGE_KEY = 'NEXT_LOCALE'

/**
 * Reads the persisted locale from localStorage (priority) then
 * the NEXT_LOCALE cookie, then falls back to 'en'.
 * Safe in environments where storage is blocked (private browsing).
 */
function readPersistedLocale(): Locale {
  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY)
    if (fromStorage && (SUPPORTED as string[]).includes(fromStorage)) {
      return fromStorage as Locale
    }
    const fromCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_KEY}=`))
      ?.split('=')[1]
    if (fromCookie && (SUPPORTED as string[]).includes(fromCookie)) {
      return fromCookie as Locale
    }
  } catch {
    // Storage blocked — fall through to default
  }
  return 'en'
}

/**
 * Persists the chosen locale to both localStorage and a cookie so
 * both client components and the Next.js middleware / next-intl
 * server config can read it.
 */
function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Ignore storage errors
  }
  document.cookie = `${COOKIE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}

/**
 * Shared locale hook.
 * Returns the current locale and a toggleLocale function that
 * persists the choice and reloads the page to re-fetch server translations.
 *
 * Usage:
 *   const { locale, toggleLocale } = useLocale()
 */
export function useLocale() {
  // Default to 'en' on the server render (SSR), then read storage on mount
  const [locale, setLocale] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLocale(readPersistedLocale())
    setMounted(true)
  }, [])

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === 'en' ? 'es' : 'en'
    setLocale(next)
    persistLocale(next)
    window.location.reload()
  }, [locale])

  const setAndPersistLocale = useCallback((next: Locale) => {
    setLocale(next)
    persistLocale(next)
    window.location.reload()
  }, [])

  return { locale, toggleLocale, setAndPersistLocale, mounted }
}
