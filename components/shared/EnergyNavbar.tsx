// components/shared/EnergyNavbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ArrowRight, ChevronRight } from 'lucide-react'
import AventiaLogo from '@/components/shared/AventiaLogo'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#plans',      labelEn: 'Plans',       labelEs: 'Planes'       },
  { href: '#calculator', labelEn: 'Calculator',   labelEs: 'Calculadora'  },
  { href: '#commercial', labelEn: 'Commercial',   labelEs: 'Comercial'    },
  { href: '#contact',    labelEn: 'Contact',      labelEs: 'Contacto'     },
] as const

// Energy accent styles (amber gradient)
const ENERGY_CTA_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, #D97706, #F59E0B)',
  boxShadow:  '0 4px 16px rgba(217,119,6,0.30)',
  color:      '#FFFFFF',
}

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    setScrolled(window.scrollY > threshold)
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

// ─────────────────────────────────────────────────────────────
// LANGUAGE SWITCHER
// ─────────────────────────────────────────────────────────────

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
      aria-label={locale === 'en' ? 'Switch to Spanish' : 'Switch to English'}
      className={cn(
        'flex items-center gap-1.5 px-2 py-1.5 rounded-lg',
        'font-sans font-medium text-[13px]',
        'text-text-muted hover:text-text-primary transition-colors',
        'hover:bg-bg-primary'
      )}
    >
      <Globe size={13} strokeWidth={2} />
      <span className={cn('transition-colors', locale === 'en' ? 'text-text-primary font-semibold' : 'text-text-muted')}>
        EN
      </span>
      <span style={{ color: 'var(--border)' }}>|</span>
      <span className={cn('transition-colors', locale === 'es' ? 'text-text-primary font-semibold' : 'text-text-muted')}>
        ES
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────────────

function EnergyMobileMenu({
  locale,
  onToggleLocale,
  onClose,
}: {
  locale: 'en' | 'es'
  onToggleLocale: () => void
  onClose: () => void
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="energy-mobile-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.div
        key="energy-mobile-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width:     '100%',
          maxWidth:  '380px',
          background: 'var(--white)',
          boxShadow:  '-8px 0 40px rgba(0,0,0,0.12)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Energy navigation menu"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 shrink-0"
          style={{ height: '72px', borderBottom: '1px solid var(--border)' }}
        >
          <AventiaLogo size="sm" division="energy" href="https://energy.aventiaglobal.com" />
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-bg-primary"
            aria-label="Close navigation menu"
          >
            <X size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between h-12 px-4 rounded-xl font-sans font-medium text-[16px] text-text-secondary hover:bg-bg-primary hover:text-text-primary transition-colors"
                style={{ textDecoration: 'none' }}
              >
                <span>{locale === 'es' ? link.labelEs : link.labelEn}</span>
                <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
              </a>
            ))}
          </div>

          {/* Main site link */}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '20px', paddingTop: '16px' }}>
            <Link
              href="https://aventiaglobal.com"
              onClick={onClose}
              className="flex items-center gap-2 h-11 px-4 rounded-xl font-sans text-[14px] text-text-muted hover:bg-bg-primary transition-colors"
              style={{ textDecoration: 'none' }}
            >
              ← {locale === 'es' ? 'Volver a Aventia Global' : 'Back to Aventia Global'}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div
          className="shrink-0 px-4 py-4 space-y-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <button
            onClick={onToggleLocale}
            className="w-full flex items-center gap-2.5 h-11 px-4 rounded-xl font-sans font-medium text-[14px] hover:bg-bg-primary transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Globe size={16} strokeWidth={2} />
            <span>
              {locale === 'en' ? 'Switch to Spanish — ES' : 'Cambiar a Inglés — EN'}
            </span>
          </button>

          <a
            href="#plans"
            onClick={onClose}
            className="btn w-full justify-center"
            style={ENERGY_CTA_STYLE}
          >
            {locale === 'es' ? 'Ver Planes' : 'Enroll Now'}
          </a>
        </div>
      </motion.div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// ENERGY NAVBAR — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function EnergyNavbar() {
  const scrolled = useScrolled()
  const { locale, toggleLocale } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          height: '72px',
          ...(scrolled
            ? {
                background:           'rgba(255,255,255,0.92)',
                backdropFilter:       'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom:         '1px solid var(--border)',
                boxShadow:            '0 1px 0 var(--border), 0 4px 24px rgba(0,0,0,0.06)',
              }
            : {
                background:   'transparent',
                borderBottom: '1px solid transparent',
              }),
        }}
        aria-label="Aventia Energy navigation"
      >
        <div className="container-aventia h-full flex items-center justify-between">

          {/* Energy logo — links back to Energy home */}
          <AventiaLogo
            size="sm"
            division="energy"
            href="https://energy.aventiaglobal.com"
          />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans font-medium text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                style={{ textDecoration: 'none' }}
              >
                {locale === 'es' ? link.labelEs : link.labelEn}
              </a>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">

            {/* Language switcher — desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} onToggle={toggleLocale} />
            </div>

            {/* Enroll Now CTA — desktop */}
            <a
              href="#plans"
              className="btn btn-sm hidden md:inline-flex items-center gap-1.5"
              style={ENERGY_CTA_STYLE}
            >
              {locale === 'es' ? 'Ver Planes' : 'Enroll Now'}
              <ArrowRight size={14} strokeWidth={2} />
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors hover:bg-bg-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
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
                    transition={{ duration: 0.18 }}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <EnergyMobileMenu
            locale={locale}
            onToggleLocale={toggleLocale}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
