// components/sections/energy/CommercialQuote.tsx
'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Users,
  Layers,
  Zap,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────────────────────

const commercialSchema = z.object({
  businessName: z.string().min(2),
  contactName:  z.string().min(2),
  email:        z.string().email(),
  phone:        z.string().regex(/^\d{10}$/, 'Must be 10 digits'),
  meters:       z.enum(['1', '2-5', '6-20', '21+']),
  monthlyKwh:   z.string().optional(),
  notes:        z.string().optional(),
})

type CommercialFormData = z.infer<typeof commercialSchema>

// ─────────────────────────────────────────────────────────────
// BILINGUAL ERRORS
// ─────────────────────────────────────────────────────────────

const ERRORS: Record<string, Record<Locale, string>> = {
  businessName: {
    en: 'Business name is required (min. 2 characters)',
    es: 'El nombre del negocio es requerido (mín. 2 caracteres)',
  },
  contactName: {
    en: 'Contact name is required',
    es: 'El nombre de contacto es requerido',
  },
  email: {
    en: 'Please enter a valid email address',
    es: 'Ingresa un correo electrónico válido',
  },
  phone: {
    en: 'Enter a 10-digit US phone number (digits only)',
    es: 'Ingresa un número de 10 dígitos (solo números)',
  },
  meters: {
    en: 'Please select the number of meters',
    es: 'Por favor selecciona el número de medidores',
  },
}

function getFieldError(field: keyof typeof ERRORS, hasError: boolean, locale: Locale) {
  if (!hasError) return null
  return ERRORS[field]?.[locale] ?? 'Required'
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    Icon:  Building2,
    en:    'Custom rates based on your usage volume',
    es:    'Tarifas personalizadas según tu volumen de consumo',
  },
  {
    Icon:  Users,
    en:    'Dedicated account manager for your business',
    es:    'Gerente de cuenta dedicado para tu empresa',
  },
  {
    Icon:  Layers,
    en:    'Multi-location and multi-meter pricing available',
    es:    'Precios para múltiples ubicaciones y medidores',
  },
  {
    Icon:  Zap,
    en:    'No disruption to your current operations',
    es:    'Sin interrupción a tus operaciones actuales',
  },
  {
    Icon:  Globe,
    en:    'Bilingual support in English and Spanish',
    es:    'Soporte bilingüe en inglés y español',
  },
  {
    Icon:  ShieldCheck,
    en:    'Texas PUC licensed for commercial accounts',
    es:    'Certificado PUC Texas para cuentas comerciales',
  },
] as const

const QUICK_STATS = [
  {
    valueEn: '4hr',
    valueEs: '4hr',
    labelEn: 'Quote response',
    labelEs: 'Respuesta de cotización',
  },
  {
    valueEn: '40+',
    valueEs: '40+',
    labelEn: 'Commercial plans',
    labelEs: 'Planes comerciales',
  },
  {
    valueEn: 'Multi',
    valueEs: 'Multi',
    labelEn: 'Meter pricing',
    labelEs: 'Precios multi-medidor',
  },
] as const

// ─────────────────────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────────────────────

function CommercialSuccess({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        className="flex justify-center mb-5"
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width:      '64px',
            height:     '64px',
            background: 'rgba(5,150,105,0.10)',
            border:     '2px solid rgba(5,150,105,0.25)',
          }}
        >
          <CheckCircle2 size={32} strokeWidth={1.5} style={{ color: '#059669' }} />
        </div>
      </motion.div>

      <h4
        className="font-display font-bold"
        style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}
      >
        {locale === 'es' ? '¡Cotización Enviada!' : 'Quote Request Sent!'}
      </h4>

      <p
        className="font-sans"
        style={{
          fontSize:   '15px',
          color:      'var(--text-secondary)',
          lineHeight: '1.6',
          maxWidth:   '320px',
          margin:     '0 auto 6px',
        }}
      >
        {locale === 'es'
          ? 'Nuestro equipo comercial te contactará en menos de 4 horas hábiles.'
          : 'Our commercial team will reach out within 4 business hours.'}
      </p>

      <p
        className="font-sans"
        style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}
      >
        {locale === 'es'
          ? 'Nos comunicaremos en el idioma de tu preferencia.'
          : "We'll contact you in your preferred language."}
      </p>

      <a
        href="#enroll"
        className="font-sans font-semibold text-[14px] hover:underline"
        style={{ color: '#D97706' }}
      >
        {locale === 'es' ? '← Inscripción residencial' : '← Residential enrollment'}
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// COMMERCIAL QUOTE — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CommercialQuote() {
  const { locale } = useLocale()
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const leftRef   = useRef<HTMLDivElement>(null)
  const rightRef  = useRef<HTMLDivElement>(null)
  const leftInView  = useInView(leftRef,  { once: true, margin: '-60px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommercialFormData>({ resolver: zodResolver(commercialSchema) })

  const onSubmit = async (data: CommercialFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, type: 'commercial_quote', locale }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Shared input class
  const inputClass = (hasError: boolean) =>
    cn('input w-full', hasError && 'border-red-400 focus:border-red-500')

  return (
    <SectionWrapper bg="white" id="commercial" animate={false}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* ══ LEFT — Benefits copy ════════════════════ */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, y: 28 }}
          animate={leftInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <SectionHeading
            label="For Businesses"
            labelEs="Para Empresas"
            headline="Power Your Business for Less."
            headlineEs="Ahorra Energía en tu Empresa."
            subheadline="Aventia Energy serves Texas businesses of all sizes — restaurants, offices, retail, and multi-location operations — with competitive commercial rates and dedicated support."
            subheadlineEs="Aventia Energy sirve empresas de todos los tamaños en Texas — restaurantes, oficinas, comercios y operaciones multi-ubicación — con tarifas comerciales competitivas y soporte dedicado."
            align="left"
            locale={locale}
            className="mb-8"
          />

          {/* Benefits list */}
          <ul
            style={{
              listStyle:     'none',
              padding:       0,
              margin:        '0 0 32px 0',
              display:       'flex',
              flexDirection: 'column',
              gap:           '14px',
            }}
          >
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.Icon
              return (
                <motion.li
                  key={benefit.en}
                  initial={{ opacity: 0, x: -16 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  {/* Amber icon box */}
                  <div
                    className="flex items-center justify-center shrink-0 rounded-lg"
                    style={{
                      width:      '34px',
                      height:     '34px',
                      background: 'rgba(217,119,6,0.10)',
                      color:      '#D97706',
                      marginTop:  '1px',
                    }}
                  >
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  </div>

                  <span
                    className="font-sans"
                    style={{ fontSize: '15px', lineHeight: '1.5', color: 'var(--text-secondary)' }}
                  >
                    {locale === 'es' ? benefit.es : benefit.en}
                  </span>
                </motion.li>
              )
            })}
          </ul>

          {/* Quick stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.65 }}
            className="grid grid-cols-3 gap-3"
          >
            {QUICK_STATS.map((stat) => (
              <div
                key={stat.labelEn}
                className="flex flex-col items-center text-center py-4 px-3 rounded-xl"
                style={{
                  background: 'rgba(217,119,6,0.07)',
                  border:     '1px solid rgba(217,119,6,0.18)',
                }}
              >
                <span
                  className="font-mono font-medium block"
                  style={{
                    fontSize:             '22px',
                    lineHeight:           1,
                    background:           'linear-gradient(135deg, #D97706, #F59E0B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:  'transparent',
                    backgroundClip:       'text',
                    marginBottom:         '4px',
                  }}
                >
                  {locale === 'es' ? stat.valueEs : stat.valueEn}
                </span>
                <span
                  className="font-sans"
                  style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}
                >
                  {locale === 'es' ? stat.labelEs : stat.labelEn}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ RIGHT — Quote request form ═══════════════ */}
        <motion.div
          ref={rightRef}
          className="lg:sticky lg:top-[96px]"
          initial={{ opacity: 0, x: 32 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] as const }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background:  'var(--white)',
              border:      '1px solid var(--border)',
              boxShadow:   'var(--shadow-md)',
            }}
          >
            {/* Amber top accent bar */}
            <div
              style={{ height: '3px', background: 'linear-gradient(90deg, #D97706, #F59E0B)' }}
              aria-hidden="true"
            />

            <div style={{ padding: '32px 36px' }}>

              {/* Card title */}
              <div style={{ marginBottom: '24px' }}>
                <h3
                  className="font-display font-bold"
                  style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '4px' }}
                >
                  {locale === 'es' ? 'Solicitar Cotización Comercial' : 'Request Commercial Quote'}
                </h3>
                <p className="font-sans" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {locale === 'es'
                    ? 'Respuesta garantizada en 4 horas hábiles.'
                    : 'Guaranteed response within 4 business hours.'}
                </p>
              </div>

              <AnimatePresence mode="wait">

                {/* SUCCESS */}
                {status === 'success' && (
                  <motion.div key="success" exit={{ opacity: 0 }}>
                    <CommercialSuccess locale={locale} />
                  </motion.div>
                )}

                {/* FORM */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                    exit={{ opacity: 0 }}
                  >

                    {/* Business name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold"
                        style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Nombre del Negocio *' : 'Business Name *'}
                      </label>
                      <input
                        {...register('businessName')}
                        type="text"
                        autoComplete="organization"
                        placeholder={locale === 'es' ? 'Mi Empresa S.A.' : 'Acme Corp.'}
                        className={inputClass(!!errors.businessName)}
                      />
                      {errors.businessName && (
                        <p className="font-sans text-[12px] flex items-center gap-1" style={{ color: '#DC2626' }}>
                          <AlertCircle size={11} />{getFieldError('businessName', true, locale)}
                        </p>
                      )}
                    </div>

                    {/* Contact name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold"
                        style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Nombre de Contacto *' : 'Contact Name *'}
                      </label>
                      <input
                        {...register('contactName')}
                        type="text"
                        autoComplete="name"
                        placeholder={locale === 'es' ? 'Juan García' : 'Jane Smith'}
                        className={inputClass(!!errors.contactName)}
                      />
                      {errors.contactName && (
                        <p className="font-sans text-[12px] flex items-center gap-1" style={{ color: '#DC2626' }}>
                          <AlertCircle size={11} />{getFieldError('contactName', true, locale)}
                        </p>
                      )}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-sans font-semibold"
                          style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                        >
                          {locale === 'es' ? 'Correo *' : 'Email *'}
                        </label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
                          <input
                            {...register('email')}
                            type="email"
                            autoComplete="email"
                            placeholder={locale === 'es' ? 'tu@empresa.com' : 'you@co.com'}
                            className={cn(inputClass(!!errors.email), 'pl-9')}
                          />
                        </div>
                        {errors.email && (
                          <p className="font-sans text-[12px] flex items-center gap-1" style={{ color: '#DC2626' }}>
                            <AlertCircle size={11} />{getFieldError('email', true, locale)}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-sans font-semibold"
                          style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                        >
                          {locale === 'es' ? 'Teléfono *' : 'Phone *'}
                        </label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
                          <input
                            {...register('phone')}
                            type="tel"
                            autoComplete="tel"
                            placeholder="2145551234"
                            maxLength={10}
                            className={cn(inputClass(!!errors.phone), 'pl-9')}
                          />
                        </div>
                        {errors.phone && (
                          <p className="font-sans text-[12px] flex items-center gap-1" style={{ color: '#DC2626' }}>
                            <AlertCircle size={11} />{getFieldError('phone', true, locale)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Meters + Monthly kWh */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-sans font-semibold"
                          style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                        >
                          {locale === 'es' ? 'Número de Medidores *' : 'Number of Meters *'}
                        </label>
                        <select
                          {...register('meters')}
                          className={inputClass(!!errors.meters)}
                          style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
                        >
                          <option value="">{locale === 'es' ? '— Seleccionar —' : '— Select —'}</option>
                          <option value="1">1 {locale === 'es' ? 'medidor' : 'meter'}</option>
                          <option value="2-5">2–5 {locale === 'es' ? 'medidores' : 'meters'}</option>
                          <option value="6-20">6–20 {locale === 'es' ? 'medidores' : 'meters'}</option>
                          <option value="21+">21+ {locale === 'es' ? 'medidores' : 'meters'}</option>
                        </select>
                        {errors.meters && (
                          <p className="font-sans text-[12px] flex items-center gap-1" style={{ color: '#DC2626' }}>
                            <AlertCircle size={11} />{getFieldError('meters', true, locale)}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-sans font-semibold"
                          style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                        >
                          {locale === 'es'
                            ? 'kWh Mensuales (opcional)'
                            : 'Monthly kWh (optional)'}
                        </label>
                        <input
                          {...register('monthlyKwh')}
                          type="text"
                          inputMode="numeric"
                          placeholder={locale === 'es' ? 'ej. 5000' : 'e.g. 5000'}
                          className="input"
                        />
                        <p className="font-sans" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {locale === 'es' ? '¿No sabes? Lo calculamos.' : "Don't know? We'll calculate it."}
                        </p>
                      </div>
                    </div>

                    {/* Additional notes */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold"
                        style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es'
                          ? 'Notas adicionales (opcional)'
                          : 'Additional notes (optional)'}
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        placeholder={
                          locale === 'es'
                            ? 'Horarios, requisitos especiales, ubicaciones…'
                            : 'Operating hours, special requirements, locations…'
                        }
                        className="input"
                        style={{ resize: 'vertical', minHeight: '80px' }}
                      />
                    </div>

                    {/* API error banner */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-3 px-4 py-3 rounded-xl"
                          style={{
                            background: 'rgba(220,38,38,0.06)',
                            border:     '1px solid rgba(220,38,38,0.2)',
                          }}
                          role="alert"
                        >
                          <AlertCircle size={15} style={{ color: '#DC2626', flexShrink: 0, marginTop: '1px' }} />
                          <p className="font-sans text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                            {locale === 'es'
                              ? 'Algo salió mal. Por favor intenta de nuevo.'
                              : 'Something went wrong. Please try again.'}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn w-full justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #D97706, #F59E0B)',
                        boxShadow:  '0 4px 16px rgba(217,119,6,0.32)',
                        color:      '#FFFFFF',
                        opacity:    status === 'loading' ? 0.75 : 1,
                        cursor:     status === 'loading' ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                          {locale === 'es' ? 'Enviando…' : 'Sending…'}
                        </>
                      ) : (
                        <>
                          {locale === 'es' ? 'Solicitar Cotización' : 'Request Quote'}
                          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                        </>
                      )}
                    </button>

                    {/* Privacy note */}
                    <p
                      className="font-sans text-center"
                      style={{ fontSize: '12px', color: 'var(--text-muted)' }}
                    >
                      🔒{' '}
                      {locale === 'es'
                        ? 'Tu información está segura y no será compartida.'
                        : 'Your information is secure and never shared.'}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
