// components/sections/energy/EnrollmentForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Building2,
  Star,
} from 'lucide-react'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// ZOD SCHEMA
// ─────────────────────────────────────────────────────────────

const enrollmentSchema = z.object({
  serviceType: z.enum(['residential', 'commercial']),
  firstName:   z.string().min(2),
  lastName:    z.string().min(2),
  email:       z.string().email(),
  phone:       z.string().regex(/^\d{10}$/, 'Must be 10 digits'),
  zip:         z.string().regex(/^\d{5}$/, 'Must be 5 digits'),
  plan:        z.enum(['starter', 'standard', 'premium']),
  howHeard:    z.string().optional(),
  consent:     z.boolean().refine((val) => val === true, 'Required'),
})

type EnrollmentData = z.infer<typeof enrollmentSchema>

// ─────────────────────────────────────────────────────────────
// BILINGUAL ERROR MESSAGES
// Returns a locale-specific message for any field that has an error.
// ─────────────────────────────────────────────────────────────

const ERROR_MESSAGES: Record<string, Record<Locale, string>> = {
  firstName: {
    en: 'First name is required (min. 2 characters)',
    es: 'El nombre es requerido (mín. 2 caracteres)',
  },
  lastName: {
    en: 'Last name is required',
    es: 'El apellido es requerido',
  },
  email: {
    en: 'Please enter a valid email address',
    es: 'Ingresa un correo electrónico válido',
  },
  phone: {
    en: 'Enter a 10-digit US phone number (digits only)',
    es: 'Ingresa un número de 10 dígitos (solo números)',
  },
  zip: {
    en: 'Enter a valid 5-digit Texas ZIP code',
    es: 'Ingresa un código postal válido de 5 dígitos (Texas)',
  },
  plan: {
    en: 'Please select a plan',
    es: 'Por favor selecciona un plan',
  },
  consent: {
    en: 'You must agree to continue',
    es: 'Debes aceptar para continuar',
  },
}

function getFieldError(
  field: keyof typeof ERROR_MESSAGES,
  hasError: boolean,
  locale: Locale
): string | null {
  if (!hasError) return null
  return ERROR_MESSAGES[field]?.[locale] ?? 'Required'
}

// ─────────────────────────────────────────────────────────────
// PLAN MINI-CARD DATA
// ─────────────────────────────────────────────────────────────

const PLAN_OPTIONS = [
  {
    id:         'starter',
    nameEn:     'Starter',
    nameEs:     'Inicial',
    rate:       '$0.099',
    typeEn:     'Variable',
    typeEs:     'Variable',
    featured:   false,
    color:      '#64748B',
  },
  {
    id:         'standard',
    nameEn:     'Standard',
    nameEs:     'Estándar',
    rate:       '$0.109',
    typeEn:     '12-mo Fixed',
    typeEs:     'Fijo 12 m',
    featured:   true,
    color:      '#D97706',
  },
  {
    id:         'premium',
    nameEn:     'Premium',
    nameEs:     'Premium',
    rate:       '$0.119',
    typeEn:     '24-mo Fixed',
    typeEs:     'Fijo 24 m',
    featured:   false,
    color:      '#0891B2',
  },
] as const

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Reusable form field with label, input, and error message */
function FormField({
  label,
  error,
  icon: Icon,
  children,
}: {
  label: string
  error: string | null
  icon?: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-sans font-semibold"
        style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <Icon size={15} style={{ color: 'var(--text-muted)' }} />
          </div>
        )}
        {children}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-sans flex items-center gap-1"
            style={{ fontSize: '12px', color: '#DC2626' }}
            role="alert"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────────────────────

function SuccessState({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="text-center py-10"
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
            width:      '72px',
            height:     '72px',
            background: 'rgba(5,150,105,0.10)',
            border:     '2px solid rgba(5,150,105,0.25)',
          }}
        >
          <CheckCircle2
            size={36}
            strokeWidth={1.5}
            style={{ color: '#059669' }}
          />
        </div>
      </motion.div>

      <h3
        className="font-display font-bold"
        style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '10px' }}
      >
        {locale === 'es'
          ? '¡Solicitud Enviada!'
          : 'Enrollment Submitted!'}
      </h3>

      <p
        className="font-sans"
        style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px', maxWidth: '380px', margin: '0 auto 8px' }}
      >
        {locale === 'es'
          ? 'Nuestro equipo te contactará en menos de 24 horas para completar tu cambio de plan.'
          : 'Our team will reach out within 24 hours to complete your plan switch.'}
      </p>

      <p
        className="font-sans"
        style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}
      >
        {locale === 'es'
          ? 'Nos comunicaremos en el idioma de tu preferencia.'
          : 'We\'ll contact you in your preferred language.'}
      </p>

      <a
        href="#plans"
        className="font-sans font-semibold text-[14px] hover:underline"
        style={{ color: '#D97706' }}
      >
        {locale === 'es' ? '← Ver otros planes' : '← View other plans'}
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// ENROLLMENT FORM — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function EnrollmentForm() {
  const { locale }  = useLocale()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnrollmentData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      serviceType: 'residential',
      plan:        'standard',   // Pre-select the recommended plan
      consent:     false,
    },
  })

  const serviceType = watch('serviceType')
  const selectedPlan = watch('plan')

  // ── Form submission ────────────────────────────────────────
  const onSubmit = async (data: EnrollmentData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/enrollment', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, locale }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // ── Input base class ───────────────────────────────────────
  const inputClass = (hasError: boolean, hasIcon = true) =>
    cn(
      'input w-full',
      hasIcon && 'pl-9',
      hasError && 'border-red-400 focus:border-red-500'
    )

  return (
    <SectionWrapper bg="blue-tint" id="enroll">

      {/* ── Section heading ─────────────────────────── */}
      <SectionHeading
        label="Get Started"
        labelEs="Comenzar"
        headline="Switch in Minutes."
        headlineEs="Cambia en Minutos."
        subheadline="Fill in your details, pick your plan, and we'll handle the rest. Available in English and Spanish."
        subheadlineEs="Completa tus datos, elige tu plan y nosotros nos encargamos del resto. Disponible en inglés y español."
        align="center"
        locale={locale}
        className="mb-10"
      />

      {/* ── Form card ───────────────────────────────── */}
      <div
        className="mx-auto rounded-2xl"
        style={{
          maxWidth:   '640px',
          background: 'var(--white)',
          border:     '1px solid var(--border)',
          boxShadow:  'var(--shadow-md)',
          overflow:   'hidden',
        }}
      >
        {/* Card header */}
        <div
          style={{
            height:           '4px',
            background:       'linear-gradient(90deg, #D97706, #F59E0B)',
          }}
          aria-hidden="true"
        />

        <div style={{ padding: '36px 40px' }}>

          <AnimatePresence mode="wait">

            {/* ── SUCCESS STATE ──────────────────────── */}
            {status === 'success' && (
              <motion.div key="success">
                <SuccessState locale={locale} />
              </motion.div>
            )}

            {/* ── FORM STATE ─────────────────────────── */}
            {status !== 'success' && (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >

                {/* ── Service type toggle ─────────────── */}
                <div>
                  <p
                    className="font-sans font-semibold mb-3"
                    style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                  >
                    {locale === 'es' ? 'Tipo de Servicio' : 'Service Type'}
                  </p>
                  <div
                    className="grid grid-cols-2 rounded-xl p-1 gap-1"
                    style={{
                      background: 'var(--bg-primary)',
                      border:     '1px solid var(--border)',
                    }}
                  >
                    {[
                      { value: 'residential', Icon: Home,      en: 'Residential', es: 'Residencial' },
                      { value: 'commercial',  Icon: Building2, en: 'Commercial',  es: 'Comercial'   },
                    ].map(({ value, Icon, en, es }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setValue('serviceType', value as 'residential' | 'commercial')}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-sans font-semibold transition-all duration-200"
                        style={{
                          fontSize:    '14px',
                          background:  serviceType === value ? '#FFFFFF' : 'transparent',
                          color:       serviceType === value ? '#D97706' : 'var(--text-muted)',
                          boxShadow:   serviceType === value ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                          border:      'none',
                          cursor:      'pointer',
                        }}
                        aria-pressed={serviceType === value}
                      >
                        <Icon size={15} strokeWidth={2} aria-hidden="true" />
                        {locale === 'es' ? es : en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Name row ──────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label={locale === 'es' ? 'Nombre *' : 'First Name *'}
                    error={getFieldError('firstName', !!errors.firstName, locale)}
                    icon={User}
                  >
                    <input
                      {...register('firstName')}
                      type="text"
                      autoComplete="given-name"
                      placeholder={locale === 'es' ? 'Juan' : 'John'}
                      className={inputClass(!!errors.firstName)}
                    />
                  </FormField>

                  <FormField
                    label={locale === 'es' ? 'Apellido *' : 'Last Name *'}
                    error={getFieldError('lastName', !!errors.lastName, locale)}
                  >
                    <input
                      {...register('lastName')}
                      type="text"
                      autoComplete="family-name"
                      placeholder={locale === 'es' ? 'García' : 'Smith'}
                      className={inputClass(!!errors.lastName, false)}
                    />
                  </FormField>
                </div>

                {/* ── Contact row ───────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label={locale === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
                    error={getFieldError('email', !!errors.email, locale)}
                    icon={Mail}
                  >
                    <input
                      {...register('email')}
                      type="email"
                      autoComplete="email"
                      placeholder={locale === 'es' ? 'tu@correo.com' : 'you@email.com'}
                      className={inputClass(!!errors.email)}
                    />
                  </FormField>

                  <FormField
                    label={locale === 'es' ? 'Teléfono *' : 'Phone Number *'}
                    error={getFieldError('phone', !!errors.phone, locale)}
                    icon={Phone}
                  >
                    <input
                      {...register('phone')}
                      type="tel"
                      autoComplete="tel"
                      placeholder="2145551234"
                      maxLength={10}
                      className={inputClass(!!errors.phone)}
                    />
                  </FormField>
                </div>

                {/* ── Texas ZIP ─────────────────────────── */}
                <FormField
                  label={locale === 'es' ? 'Código Postal de Texas *' : 'Texas ZIP Code *'}
                  error={getFieldError('zip', !!errors.zip, locale)}
                  icon={MapPin}
                >
                  <input
                    {...register('zip')}
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="75001"
                    maxLength={5}
                    className={inputClass(!!errors.zip)}
                    style={{ maxWidth: '200px' }}
                  />
                </FormField>

                {/* ── Plan selector ─────────────────────── */}
                <div>
                  <p
                    className="font-sans font-semibold mb-3"
                    style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                  >
                    {locale === 'es' ? 'Selecciona tu Plan *' : 'Select Your Plan *'}
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {PLAN_OPTIONS.map((plan) => {
                      const isSelected = selectedPlan === plan.id
                      return (
                        <label key={plan.id} style={{ cursor: 'pointer' }}>
                          {/* Hidden radio input registered with RHF */}
                          <input
                            {...register('plan')}
                            type="radio"
                            value={plan.id}
                            className="sr-only"
                            aria-label={`${plan.nameEn} — ${plan.rate}/kWh`}
                          />

                          <div
                            className="flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200"
                            style={{
                              border:     isSelected
                                ? `2px solid ${plan.color}`
                                : '1px solid var(--border)',
                              background: isSelected
                                ? `${plan.color}08`
                                : 'var(--white)',
                              boxShadow:  isSelected
                                ? `0 2px 12px ${plan.color}20`
                                : 'none',
                            }}
                          >
                            {/* Featured star */}
                            {plan.featured && (
                              <Star
                                size={11}
                                strokeWidth={2}
                                fill={plan.color}
                                style={{ color: plan.color, marginBottom: '3px' }}
                                aria-label="Recommended"
                              />
                            )}

                            <span
                              className="font-display font-bold block"
                              style={{ fontSize: '14px', color: isSelected ? plan.color : 'var(--text-primary)' }}
                            >
                              {locale === 'es' ? plan.nameEs : plan.nameEn}
                            </span>
                            <span
                              className="font-mono font-medium block"
                              style={{ fontSize: '13px', color: plan.color }}
                            >
                              {plan.rate}
                            </span>
                            <span
                              className="font-sans block"
                              style={{ fontSize: '11px', color: 'var(--text-muted)' }}
                            >
                              {locale === 'es' ? plan.typeEs : plan.typeEn}
                            </span>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  <AnimatePresence>
                    {errors.plan && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-sans text-[12px] mt-1.5 flex items-center gap-1"
                        style={{ color: '#DC2626' }}
                      >
                        <AlertCircle size={11} />
                        {getFieldError('plan', true, locale)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── How did you hear (optional) ────────── */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-sans font-semibold"
                    style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                  >
                    {locale === 'es'
                      ? '¿Cómo nos conociste? (opcional)'
                      : 'How did you hear about us? (optional)'}
                  </label>
                  <select
                    {...register('howHeard')}
                    className="input"
                    style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                  >
                    <option value="">
                      {locale === 'es' ? '— Seleccionar —' : '— Select —'}
                    </option>
                    <option value="google">{locale === 'es' ? 'Google / Búsqueda' : 'Google / Search'}</option>
                    <option value="social">{locale === 'es' ? 'Redes sociales' : 'Social media'}</option>
                    <option value="referral">{locale === 'es' ? 'Recomendación' : 'Friend / Referral'}</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="flyer">{locale === 'es' ? 'Volante / Correo' : 'Flyer / Direct mail'}</option>
                    <option value="other">{locale === 'es' ? 'Otro' : 'Other'}</option>
                  </select>
                </div>

                {/* ── Consent checkbox ──────────────────── */}
                <div className="flex items-start gap-3">
                  <input
                    {...register('consent')}
                    type="checkbox"
                    id="enrollment-consent"
                    className="mt-0.5 w-4 h-4 rounded cursor-pointer"
                    style={{
                      accentColor: '#D97706',
                      flexShrink:   0,
                    }}
                  />
                  <label
                    htmlFor="enrollment-consent"
                    className="font-sans cursor-pointer"
                    style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}
                  >
                    {locale === 'es'
                      ? 'Acepto ser contactado por Aventia Energy en inglés o español para completar mi inscripción. No se realizarán cargos sin mi confirmación.'
                      : 'I agree to be contacted by Aventia Energy in English or Spanish to complete my enrollment. No charges will be made without my confirmation.'}
                  </label>
                </div>

                <AnimatePresence>
                  {errors.consent && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-sans text-[12px] flex items-center gap-1 -mt-4"
                      style={{ color: '#DC2626' }}
                      role="alert"
                    >
                      <AlertCircle size={11} />
                      {getFieldError('consent', true, locale)}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* ── API error banner ──────────────────── */}
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
                      <AlertCircle
                        size={16}
                        style={{ color: '#DC2626', flexShrink: 0, marginTop: '1px' }}
                      />
                      <div>
                        <p className="font-sans font-semibold text-[14px]" style={{ color: '#DC2626' }}>
                          {locale === 'es' ? 'Algo salió mal' : 'Something went wrong'}
                        </p>
                        <p className="font-sans text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                          {locale === 'es'
                            ? 'Por favor intenta de nuevo o contáctanos por WhatsApp.'
                            : 'Please try again or reach us via WhatsApp.'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Submit button ─────────────────────── */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn w-full justify-center"
                  style={{
                    background:    'linear-gradient(135deg, #D97706, #F59E0B)',
                    boxShadow:     '0 4px 16px rgba(217,119,6,0.32)',
                    color:         '#FFFFFF',
                    opacity:       status === 'loading' ? 0.75 : 1,
                    cursor:        status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      {locale === 'es' ? 'Enviando…' : 'Submitting…'}
                    </>
                  ) : (
                    locale === 'es'
                      ? 'Enviar Solicitud de Inscripción'
                      : 'Submit Enrollment Request'
                  )}
                </button>

                {/* ── Privacy note ──────────────────────── */}
                <p
                  className="font-sans text-center"
                  style={{ fontSize: '12px', color: 'var(--text-muted)' }}
                >
                  {locale === 'es'
                    ? '🔒 Tu información está segura y no será vendida a terceros.'
                    : '🔒 Your information is secure and will never be sold to third parties.'}
                </p>

              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Disclaimer below card ─────────────────── */}
      <p
        className="font-sans text-center mt-6 mx-auto"
        style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '560px' }}
      >
        {locale === 'es'
          ? '* Al enviar este formulario, un representante de Aventia Energy se comunicará contigo. No se procesarán cargos hasta que firmes el contrato de servicio.'
          : '* By submitting this form, an Aventia Energy representative will contact you. No charges are processed until you sign your service agreement.'}
      </p>
    </SectionWrapper>
  )
}
