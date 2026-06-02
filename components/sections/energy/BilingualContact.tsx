// components/sections/energy/BilingualContact.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, X, Clock, MapPin } from 'lucide-react'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

// WhatsApp number from env, stripped of '+' for the deep link
const RAW_WA_NUMBER =
  (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+12145550000').replace('+', '')

const DISMISS_KEY = 'aventia-energy-wa-float-dismissed'

// ─────────────────────────────────────────────────────────────
// WHATSAPP ICON (inline SVG — official brand path)
// ─────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// FLOATING WHATSAPP BUTTON
// Appears after 5 seconds. Dismissed state persisted in
// sessionStorage so it doesn't reappear during the session.
// ─────────────────────────────────────────────────────────────

function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const [visible,   setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user already dismissed this session
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) {
        setDismissed(true)
        return
      }
    } catch {
      // sessionStorage blocked in private mode — show anyway
    }

    // Show after 5 seconds
    const id = setTimeout(() => setVisible(true), 5000)
    return () => clearTimeout(id)
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch { /* ignore */ }
  }

  // Build locale-aware WhatsApp deep link
  const prefilledMessage = locale === 'es'
    ? 'Hola, tengo una pregunta sobre los planes de Aventia Energy.'
    : 'Hi, I have a question about Aventia Energy plans.'
  const waHref = `https://wa.me/${RAW_WA_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="wa-float"
          className="fixed z-50"
          style={{ bottom: '24px', right: '24px' }}
          initial={{ opacity: 0, scale: 0.8,  y: 40 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{   opacity: 0, scale: 0.85,  y: 30 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          <div className="relative">

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute flex items-center justify-center rounded-full transition-colors hover:bg-gray-700"
              style={{
                top:        '-8px',
                right:      '-8px',
                width:      '22px',
                height:     '22px',
                background: '#374151',
                border:     '2px solid #1F2937',
                color:      'rgba(255,255,255,0.85)',
                zIndex:     1,
                cursor:     'pointer',
              }}
              aria-label={locale === 'es' ? 'Cerrar' : 'Dismiss'}
            >
              <X size={10} strokeWidth={3} />
            </button>

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'rgba(37,211,102,0.30)' }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            {/* WhatsApp button */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2.5 font-sans font-semibold rounded-full transition-transform hover:scale-[1.04] active:scale-[0.97]"
              style={{
                padding:    '12px 20px',
                fontSize:   '14px',
                background: '#25D366',
                color:      '#FFFFFF',
                boxShadow:  '0 6px 24px rgba(37,211,102,0.40)',
                textDecoration: 'none',
                display:    'flex',
              }}
              aria-label={
                locale === 'es'
                  ? 'Abrir WhatsApp para chatear con Aventia Energy'
                  : 'Open WhatsApp to chat with Aventia Energy'
              }
            >
              <WhatsAppIcon size={20} />
              <span>
                {locale === 'es' ? 'Chat en WhatsApp' : 'Chat on WhatsApp'}
              </span>
            </a>

            {/* Tooltip below */}
            <p
              className="font-sans text-center mt-1.5"
              style={{
                fontSize:  '11px',
                color:     'rgba(255,255,255,0.65)',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {locale === 'es' ? 'Respuesta rápida · EN + ES' : 'Quick reply · EN + ES'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────
// BILINGUAL CONTACT — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function BilingualContact() {
  const { locale } = useLocale()

  // Build the inline WhatsApp link for the section button
  const sectionWaMessage = locale === 'es'
    ? 'Hola, tengo una pregunta sobre los planes de Aventia Energy.'
    : 'Hi, I have a question about Aventia Energy plans.'
  const sectionWaHref =
    `https://wa.me/${RAW_WA_NUMBER}?text=${encodeURIComponent(sectionWaMessage)}`

  return (
    <>
      {/* ══ CONTACT STRIP SECTION ═══════════════════ */}
      <section
        id="contact"
        aria-label="Contact Aventia Energy"
        style={{
          backgroundColor: '#0F172A',
          backgroundImage: [
            'radial-gradient(at 15% 80%, rgba(217,119,6,0.08) 0px, transparent 55%)',
            'radial-gradient(at 85% 20%, rgba(37,99,235,0.06) 0px, transparent 50%)',
          ].join(','),
          paddingTop:    'var(--section-padding-y)',
          paddingBottom: 'var(--section-padding-y)',
        }}
      >
        <div
          className="container-aventia"
          style={{ maxWidth: '880px' }}
        >

          {/* ── Section label ─────────────────────── */}
          <div className="flex justify-center mb-6">
            <span
              className="font-sans font-semibold"
              style={{
                fontSize:      '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding:       '6px 16px',
                borderRadius:  '100px',
                background:    'rgba(217,119,6,0.12)',
                border:        '1px solid rgba(217,119,6,0.25)',
                color:         '#F59E0B',
              }}
            >
              {locale === 'es' ? 'Contáctanos' : 'Get in Touch'}
            </span>
          </div>

          {/* ── Headline ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <h2
              className="font-display font-bold"
              style={{
                fontSize:      'clamp(28px, 4vw, 40px)',
                lineHeight:    1.15,
                color:         '#FFFFFF',
                marginBottom:  '6px',
              }}
            >
              {locale === 'es'
                ? 'Preguntas? Estamos Aquí.'
                : "Questions? We're Here."}
            </h2>
            {/* Always shows BOTH languages — emphasizes bilingual commitment */}
            <p
              className="font-display font-semibold"
              style={{
                fontSize:     'clamp(18px, 2.5vw, 24px)',
                color:        'rgba(255,255,255,0.55)',
              }}
            >
              {locale === 'es'
                ? 'We speak English. · Hablamos español.'
                : 'Hablamos español. · We speak English.'}
            </p>
          </motion.div>

          {/* ── Contact method cards ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
          >

            {/* Phone */}
            <div
              className="flex flex-col items-center text-center rounded-2xl py-7 px-5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border:     '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-4"
                style={{
                  width:      '48px',
                  height:     '48px',
                  background: 'rgba(217,119,6,0.14)',
                  color:      '#F59E0B',
                }}
              >
                <Phone size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p
                className="font-display font-semibold mb-1"
                style={{ fontSize: '15px', color: '#FFFFFF' }}
              >
                {locale === 'es' ? 'Teléfono / Phone' : 'Phone / Teléfono'}
              </p>
              <a
                href="tel:+12145550000"
                className="font-mono font-medium block mb-1 hover:underline"
                style={{ fontSize: '16px', color: '#F59E0B', textDecoration: 'none' }}
              >
                (214) 555-0000
              </a>
              <p
                className="font-sans"
                style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.4' }}
              >
                {locale === 'es'
                  ? 'Llamadas y mensajes de texto'
                  : 'Calls and text messages'}
              </p>
            </div>

            {/* Email */}
            <div
              className="flex flex-col items-center text-center rounded-2xl py-7 px-5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border:     '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-4"
                style={{
                  width:      '48px',
                  height:     '48px',
                  background: 'rgba(37,99,235,0.15)',
                  color:      '#60A5FA',
                }}
              >
                <Mail size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p
                className="font-display font-semibold mb-1"
                style={{ fontSize: '15px', color: '#FFFFFF' }}
              >
                {locale === 'es' ? 'Correo / Email' : 'Email / Correo'}
              </p>
              <a
                href="mailto:energy@aventiaglobal.com"
                className="font-sans font-medium block mb-1 hover:underline"
                style={{ fontSize: '14px', color: '#93C5FD', textDecoration: 'none' }}
              >
                energy@aventiaglobal.com
              </a>
              <p
                className="font-sans"
                style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}
              >
                {locale === 'es'
                  ? 'Respuesta en menos de 24 horas'
                  : 'Response within 24 hours'}
              </p>
            </div>

            {/* WhatsApp */}
            <div
              className="flex flex-col items-center text-center rounded-2xl py-7 px-5"
              style={{
                background: 'rgba(37,211,102,0.06)',
                border:     '1px solid rgba(37,211,102,0.18)',
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-4"
                style={{
                  width:      '48px',
                  height:     '48px',
                  background: 'rgba(37,211,102,0.15)',
                  color:      '#34D399',
                }}
              >
                <WhatsAppIcon size={22} />
              </div>
              <p
                className="font-display font-semibold mb-1"
                style={{ fontSize: '15px', color: '#FFFFFF' }}
              >
                WhatsApp
              </p>
              <a
                href={sectionWaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-medium block mb-1 hover:underline"
                style={{ fontSize: '14px', color: '#34D399', textDecoration: 'none' }}
              >
                {locale === 'es' ? 'Iniciar chat →' : 'Start a chat →'}
              </a>
              <p
                className="font-sans"
                style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}
              >
                {locale === 'es'
                  ? 'Respuesta más rápida'
                  : 'Fastest response'}
              </p>
            </div>
          </motion.div>

          {/* ── Office hours strip ────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            style={{
              padding:      '16px 24px',
              borderRadius: '14px',
              background:   'rgba(255,255,255,0.04)',
              border:       '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: 'rgba(255,255,255,0.45)' }} aria-hidden="true" />
              <span className="font-sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                Mon–Fri 8:00 AM – 7:00 PM CT
              </span>
            </div>
            <span
              className="hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.2)', fontSize: '16px' }}
              aria-hidden="true"
            >
              ·
            </span>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: 'rgba(255,255,255,0.45)' }} aria-hidden="true" />
              <span className="font-sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                Lun–Vie 8:00 AM – 7:00 PM CT
              </span>
            </div>
          </motion.div>

          {/* ── WhatsApp main CTA ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-10"
          >
            <a
              href={sectionWaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans font-semibold rounded-full transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{
                padding:    '14px 32px',
                fontSize:   '16px',
                background: '#25D366',
                color:      '#FFFFFF',
                boxShadow:  '0 6px 28px rgba(37,211,102,0.38)',
                textDecoration: 'none',
              }}
            >
              <WhatsAppIcon size={22} />
              {locale === 'es'
                ? 'Iniciar Conversación en WhatsApp'
                : 'Start a WhatsApp Conversation'}
            </a>
          </motion.div>

          {/* ── Location + copyright ──────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px' }}
          >
            <div className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: 'rgba(255,255,255,0.3)' }} aria-hidden="true" />
              <span
                className="font-sans"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.30)' }}
              >
                Houston, Texas, USA
              </span>
            </div>

            <p
              className="font-sans"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.20)' }}
            >
              {locale === 'es'
                ? `© ${new Date().getFullYear()} Aventia Energy · Aventia Global LLC · Texas PUC Licensed`
                : `© ${new Date().getFullYear()} Aventia Energy · Aventia Global LLC · Texas PUC Licensed`}
            </p>
          </motion.div>

        </div>
      </section>

      {/* ══ FLOATING WHATSAPP BUTTON ════════════════ */}
      {/* Renders as position:fixed — appears above all page content */}
      <FloatingWhatsApp locale={locale} />
    </>
  )
}
