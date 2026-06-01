// components/shared/Navbar.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Wifi,
  ShoppingBag,
  Brain,
  Navigation,
  ChevronDown,
  Menu,
  X,
  Globe,
  ArrowRight,
} from 'lucide-react'
import AventiaLogo from '@/components/shared/AventiaLogo'
import { cn } from '@/lib/utils'
import { DIVISIONS } from '@/lib/constants'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

/** Maps the `icon` string in lib/constants.ts to Lucide components */
const DIVISION_ICONS: Record<string, React.ElementType> = {
  energy:  Zap,
  connect: Wifi,
  store:   ShoppingBag,
  ai:      Brain,
  drones:  Navigation,
}

const NAV_LINKS = [
  { href: '/',         labelEn: 'Home',    labelEs: 'Inicio'    },
  { href: '/#about',   labelEn: 'About',   labelEs: 'Nosotros'  },
  { href: '/#contact', labelEn: 'Contact', labelEs: 'Contacto'  },
]

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    // Check immediately in case page loads mid-scroll
    setScrolled(window.scrollY > threshold)
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

function useLocale() {
  const [locale, setLocale] = useState<'en' | 'es'>('en')

  useEffect(() => {
    try {
      const fromStorage = localStorage.getItem('NEXT_LOCALE')
      const fromCookie = document.cookie
        .split('; ')
        .find((c) => c.startsWith('NEXT_LOCALE='))
        ?.split('=')[1]
      const resolved = fromStorage ?? fromCookie ?? 'en'
      if (resolved === 'en' || resolved === 'es') setLocale(resolved)
    } catch {
      // localStorage blocked in some private browsing modes
    }
  }, [])

  const toggleLocale = useCallback(() => {
    const next = locale === 'en' ? 'es' : 'en'
    setLocale(next)
    try {
      localStorage.setItem('NEXT_LOCALE', next)
    } catch { /* ignore */ }
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`
    window.location.reload()
  }, [locale])

  return { locale, toggleLocale }
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Single desktop nav link with animated active underline */
function NavLink({
  href,
  labelEn,
  labelEs,
  locale,
  active,
}: {
  href: string
  labelEn: string
  labelEs: string
  locale: 'en' | 'es'
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative font-sans font-medium text-[15px] leading-none',
        'transition-colors duration-200 py-1',
        active
          ? 'text-text-primary'
          : 'text-text-secondary hover:text-text-primary'
      )}
    >
      {locale === 'es' ? labelEs : labelEn}
      {active && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
          style={{ background: 'var(--accent-gradient)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}

/** Language toggle — EN | ES */
function LanguageSwitcher({
  locale,
  onToggle,
}: {
  locale: 'en' | 'es'
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={
        locale === 'en' ? 'Switch to Spanish' : 'Switch to English'
      }
      className={cn(
        'flex items-center gap-1.5',
        'font-sans font-medium text-[13px] leading-none',
        'text-text-muted hover:text-text-primary transition-colors duration-200',
        'px-2 py-1.5 rounded-lg hover:bg-bg-primary'
      )}
    >
      <Globe size={13} strokeWidth={2} />
      <span
        className={cn(
          'transition-colors duration-150',
          locale === 'en' ? 'text-text-primary font-semibold' : 'text-text-muted'
        )}
      >
        EN
      </span>
      <span style={{ color: 'var(--border)' }}>|</span>
      <span
        className={cn(
          'transition-colors duration-150',
          locale === 'es' ? 'text-text-primary font-semibold' : 'text-text-muted'
        )}
      >
        ES
      </span>
    </button>
  )
}

/** Hover dropdown showing all 5 divisions */
function DivisionsDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      // Position: centered below the trigger, 12px gap
      className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[440px]"
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Arrow pointer */}
      <div
        className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderBottom: 'none',
          borderRight: 'none',
        }}
      />

      {/* Header */}
      <div
        className="px-4 pt-4 pb-2"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <p
          className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Our Divisions
        </p>
      </div>

      {/* Division rows */}
      <div className="p-2">
        {DIVISIONS.map((division) => {
          const Icon = DIVISION_ICONS[division.id]
          return (
            <Link
              key={division.id}
              href={division.url}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-xl group transition-colors duration-150 hover:bg-bg-primary"
              style={{ textDecoration: 'none' }}
            >
              {/* Division icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: `${division.color}18`,
                  color: division.color,
                }}
              >
                {Icon && <Icon size={16} strokeWidth={2} />}
              </div>

              {/* Name + tagline */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="font-display font-semibold text-[14px] group-hover:text-accent-blue transition-colors duration-150"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {division.name}
                  </span>
                  {division.status === 'live' ? (
                    <span className="badge badge-live">Live</span>
                  ) : (
                    <span className="badge badge-coming-soon">Soon</span>
                  )}
                </div>
                <p
                  className="font-sans text-[12px] truncate mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {division.tagline}
                </p>
              </div>

              {/* Arrow icon */}
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                style={{ color: 'var(--accent-blue)' }}
              />
            </Link>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-primary)',
        }}
      >
        <p className="font-sans text-[12px]" style={{ color: 'var(--text-muted)' }}>
          Powering Texas homes &amp; businesses
        </p>
        <Link
          href="https://energy.aventiaglobal.com"
          onClick={onClose}
          className="font-sans font-semibold text-[12px] flex items-center gap-1 hover:underline"
          style={{ color: 'var(--accent-blue)' }}
        >
          Get Started <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  )
}

/** Full-screen mobile drawer */
function MobileMenu({
  locale,
  onToggleLocale,
  onClose,
  pathname,
}: {
  locale: 'en' | 'es'
  onToggleLocale: () => void
  onClose: () => void
  pathname: string
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="mobile-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from right */}
      <motion.div
        key="mobile-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'var(--white)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
        }}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 shrink-0"
          style={{
            height: '72px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <AventiaLogo size="sm" href="/" />
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-bg-primary"
            aria-label="Close navigation menu"
          >
            <X size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-5">

          {/* Main nav links */}
          <div className="space-y-1 mb-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center h-12 px-4 rounded-xl',
                    'font-sans font-medium text-[16px] transition-colors duration-150',
                    isActive
                      ? 'text-accent-blue'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary'
                  )}
                  style={
                    isActive
                      ? { background: 'var(--bg-blue-tint)' }
                      : undefined
                  }
                >
                  {locale === 'es' ? link.labelEs : link.labelEn}
                </Link>
              )
            })}
          </div>

          {/* Divider + Divisions label */}
          <div
            className="mb-3 px-1"
            style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}
          >
            <p
              className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase px-3 mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              {locale === 'es' ? 'Nuestras Divisiones' : 'Our Divisions'}
            </p>
          </div>

          {/* Division links */}
          <div className="space-y-1">
            {DIVISIONS.map((division) => {
              const Icon = DIVISION_ICONS[division.id]
              return (
                <Link
                  key={division.id}
                  href={division.url}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 h-[60px] rounded-xl group transition-colors duration-150 hover:bg-bg-primary"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${division.color}18`,
                      color: division.color,
                    }}
                  >
                    {Icon && <Icon size={16} strokeWidth={2} />}
                  </div>

                  {/* Name + status */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-display font-semibold text-[14px]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {division.name}
                      </span>
                      {division.status === 'live' ? (
                        <span className="badge badge-live">Live</span>
                      ) : (
                        <span className="badge badge-coming-soon">Soon</span>
                      )}
                    </div>
                    <p
                      className="font-sans text-[12px] truncate"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {locale === 'es' ? division.taglineEs : division.tagline}
                    </p>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    size={14}
                    className="-rotate-90 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Drawer footer — language + CTA */}
        <div
          className="shrink-0 px-4 py-4 space-y-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {/* Language toggle */}
          <button
            onClick={onToggleLocale}
            className={cn(
              'w-full flex items-center gap-2.5 h-11 px-4 rounded-xl',
              'font-sans font-medium text-[14px] transition-colors duration-150',
              'hover:bg-bg-primary'
            )}
            style={{ color: 'var(--text-secondary)' }}
          >
            <Globe size={16} strokeWidth={2} />
            <span>
              {locale === 'en'
                ? 'Switch to Spanish — ES'
                : 'Cambiar a Inglés — EN'}
            </span>
          </button>

          {/* CTA */}
          <Link
            href="https://energy.aventiaglobal.com"
            onClick={onClose}
            className="btn btn-primary w-full justify-center"
          >
            {locale === 'es' ? 'Comenzar' : 'Get Started'}
          </Link>
        </div>
      </motion.div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN NAVBAR COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const scrolled = useScrolled()
  const { locale, toggleLocale } = useLocale()
  const pathname = usePathname()

  const [divisionsOpen, setDivisionsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const divisionsRef = useRef<HTMLDivElement>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setDivisionsOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeDivisions = useCallback(() => setDivisionsOpen(false), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          height: '72px',
          ...(scrolled
            ? {
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border)',
                boxShadow: '0 1px 0 var(--border), 0 4px 24px rgba(0,0,0,0.06)',
              }
            : {
                background: 'transparent',
                borderBottom: '1px solid transparent',
              }),
        }}
        aria-label="Main navigation"
      >
        <div
          className="container-aventia h-full flex items-center justify-between"
          style={{ maxWidth: 'var(--container-max)' }}
        >

          {/* ── Logo ──────────────────────────────────────────── */}
          <AventiaLogo size="sm" href="/" />

          {/* ── Desktop nav links ─────────────────────────────── */}
          <div className="hidden md:flex items-center gap-7">
            {/* Home */}
            <NavLink
              href="/"
              labelEn="Home"
              labelEs="Inicio"
              locale={locale}
              active={pathname === '/'}
            />

            {/* Divisions dropdown trigger */}
            <div
              ref={divisionsRef}
              className="relative"
              onMouseEnter={() => setDivisionsOpen(true)}
              onMouseLeave={() => setDivisionsOpen(false)}
            >
              <button
                className={cn(
                  'flex items-center gap-1 font-sans font-medium text-[15px]',
                  'transition-colors duration-200 py-1',
                  divisionsOpen
                    ? 'text-accent-blue'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-expanded={divisionsOpen}
                aria-haspopup="true"
              >
                {locale === 'es' ? 'Divisiones' : 'Divisions'}
                <motion.span
                  animate={{ rotate: divisionsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="flex items-center"
                >
                  <ChevronDown size={14} strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence>
                {divisionsOpen && (
                  <DivisionsDropdown onClose={closeDivisions} />
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <NavLink
              href="/#about"
              labelEn="About"
              labelEs="Nosotros"
              locale={locale}
              active={pathname === '/#about'}
            />

            {/* Contact */}
            <NavLink
              href="/#contact"
              labelEn="Contact"
              labelEs="Contacto"
              locale={locale}
              active={pathname === '/#contact'}
            />
          </div>

          {/* ── Right section ─────────────────────────────────── */}
          <div className="flex items-center gap-3">

            {/* Language switcher — desktop only */}
            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} onToggle={toggleLocale} />
            </div>

            {/* Get Started CTA — desktop only */}
            <Link
              href="https://energy.aventiaglobal.com"
              className="btn btn-primary btn-sm hidden md:inline-flex"
            >
              {locale === 'es' ? 'Comenzar' : 'Get Started'}
            </Link>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'md:hidden flex items-center justify-center',
                'w-10 h-10 rounded-xl transition-colors duration-150',
                'hover:bg-bg-primary focus-visible:outline-accent-blue'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    <X size={20} style={{ color: 'var(--text-primary)' }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    <Menu size={20} style={{ color: 'var(--text-primary)' }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            locale={locale}
            onToggleLocale={toggleLocale}
            onClose={closeMobile}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  )
}
