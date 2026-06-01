// components/shared/ComingSoon.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, ArrowLeft, Bell } from 'lucide-react'
import { Button } from '@/components/shared/Button'

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type Locale = 'en' | 'es'

export interface ComingSoonProps {
  /** Division display name e.g. "Aventia Connect" */
  name: string
  nameEs?: string
  /** Division accent hex color e.g. "#0891B2" */
  color: string
  /** Lucide icon node rendered in the icon badge */
  icon: React.ReactNode
  /** Short one-line tagline */
  tagline: string
  taglineEs?: string
  /** Optional longer description paragraph */
  description?: string
  descriptionEs?: string
  /**
   * Target launch date for the countdown timer.
   * Pass null or omit to hide the countdown.
   */
  launchDate?: Date | string | null
  /**
   * Division ID sent to /api/waitlist on form submission.
   * Must match the DIVISIONS constant id field.
   */
  divisionId: string
  locale?: Locale
  /** Optional launch quarter label e.g. "Q3 2026" shown when launchDate is null */
  launchLabel?: string
  launchLabelEs?: string
}

// ─────────────────────────────────────────────────────────────
// ZOD SCHEMA
// ─────────────────────────────────────────────────────────────

const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

// ─────────────────────────────────────────────────────────────
// COUNTDOWN HOOK
// ─────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function useCountdown(targetDate: Date | string | null | undefined): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    if (!targetDate) return

    const target = targetDate instanceof Date ? targetDate : new Date(targetDate)
    if (isNaN(target.getTime())) return

    function calculate(): TimeLeft | null {
      const now = Date.now()
      const distance = target.getTime() - now
      if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculate())
    const id = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

// ─────────────────────────────────────────────────────────────
// COUNTDOWN UNIT
// ─────────────────────────────────────────────────────────────

function CountdownUnit({
  value,
  labelEn,
  labelEs,
  locale,
  color,
}: {
  value: number
  labelEn: string
  labelEs: string
  locale: Locale
  color: string
}) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center" style={{ minWidth: '64px' }}>
      {/* Number */}
      <motion.div
        key={display}
        initial={{ opacity: 0.6, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="font-mono font-medium"
        style={{
          fontSize:              '40px',
          lineHeight:            1,
          background:            `linear-gradient(135deg, ${color}, ${color}bb)`,
          WebkitBackgroundClip:  'text',
          WebkitTextFillColor:   'transparent',
          backgroundClip:        'text',
        }}
      >
        {display}
      </motion.div>

      {/* Label */}
      <span
        className="font-sans font-semibold mt-1.5"
        style={{
          fontSize:      '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--text-muted)',
        }}
      >
        {locale === 'es' ? labelEs : labelEn}
      </span>
    </div>
  )
}

// Separator between countdown units
function CountdownSep({ color }: { color: string }) {
  return (
    <div
      className="font-mono font-medium self-start pt-1"
      style={{ fontSize: '36px', lineHeight: 1, color, opacity: 0.4 }}
    >
      :
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// WAITLIST FORM
// ─────────────────────────────────────────────────────────────

function WaitlistForm({
  divisionId,
  color,
  locale,
}: {
  divisionId: string
  color: string
  locale: Locale
}) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  })

  const onSubmit = async (data: WaitlistFormData) => {
    setSubmitStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:    data.email,
          division: divisionId,
          locale,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
      setErrorMsg(
        locale === 'es'
          ? 'Algo salió mal. Por favor intenta de nuevo.'
          : 'Something went wrong. Please try again.'
      )
    }
  }

  // ── Success state ────────────────────────────────────────
  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 px-5 py-4 rounded-xl"
        style={{
          background: 'rgba(5,150,105,0.08)',
          border:     '1px solid rgba(5,150,105,0.25)',
        }}
      >
        <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
        <div>
          <p className="font-display font-semibold text-[15px]" style={{ color: '#059669' }}>
            {locale === 'es' ? '¡Estás en la lista!' : "You're on the list!"}
          </p>
          <p className="font-sans text-[13px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {locale === 'es'
              ? 'Te avisaremos en cuanto lancemos.'
              : "We'll email you the moment we launch."}
          </p>
        </div>
      </motion.div>
    )
  }

  // ── Form state ───────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-2">
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder={
            locale === 'es' ? 'tu@correo.com' : 'your@email.com'
          }
          className="input flex-1"
          disabled={submitStatus === 'loading'}
          aria-label={locale === 'es' ? 'Correo electrónico' : 'Email address'}
          aria-invalid={!!errors.email}
        />
        <Button
          type="submit"
          variant="primary"
          loading={submitStatus === 'loading'}
          leftIcon={<Bell size={15} />}
          style={
            submitStatus !== 'loading'
              ? {
                  background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                  boxShadow:  `0 4px 16px ${color}44`,
                }
              : undefined
          }
        >
          {locale === 'es' ? 'Notificarme' : 'Notify Me'}
        </Button>
      </div>

      {/* Validation error */}
      <AnimatePresence>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-sans text-[13px] mt-2"
            style={{ color: '#DC2626' }}
            role="alert"
          >
            {errors.email.message}
          </motion.p>
        )}
        {submitStatus === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-sans text-[13px] mt-2"
            style={{ color: '#DC2626' }}
            role="alert"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────
// COMING SOON MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export function ComingSoon({
  name,
  nameEs,
  color,
  icon,
  tagline,
  taglineEs,
  description,
  descriptionEs,
  launchDate,
  divisionId,
  locale = 'en',
  launchLabel,
  launchLabelEs,
}: ComingSoonProps) {
  const timeLeft = useCountdown(launchDate ?? null)
  const displayName      = locale === 'es' && nameEs    ? nameEs    : name
  const displayTagline   = locale === 'es' && taglineEs ? taglineEs : tagline
  const displayDesc      = locale === 'es' && descriptionEs ? descriptionEs : description
  const displayLaunchLbl = locale === 'es' && launchLabelEs ? launchLabelEs : launchLabel

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        backgroundImage: `
          radial-gradient(at 20% 30%, ${color}12 0px, transparent 50%),
          radial-gradient(at 80% 70%, rgba(37,99,235,0.06) 0px, transparent 50%)
        `,
        paddingTop:    '96px',
        paddingBottom: '80px',
      }}
    >
      {/* Back to main site */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium transition-colors hover:underline"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={14} />
          {locale === 'es' ? 'Aventia Global' : 'Aventia Global'}
        </Link>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full text-center"
        style={{ maxWidth: '580px', padding: '0 24px' }}
      >

        {/* Division icon badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 300 }}
          className="inline-flex items-center justify-center mx-auto mb-6"
          style={{
            width:        '72px',
            height:       '72px',
            borderRadius: '20px',
            background:   `${color}18`,
            color:        color,
            border:       `1px solid ${color}30`,
          }}
        >
          {icon}
        </motion.div>

        {/* Coming soon badge */}
        <div className="flex justify-center mb-5">
          <span className="badge badge-coming-soon">
            {locale === 'es' ? 'Próximamente' : 'Coming Soon'}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-extrabold"
          style={{
            fontSize:     'clamp(32px, 6vw, 56px)',
            lineHeight:   1.1,
            letterSpacing: '-0.02em',
            color:        'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          {displayName}{' '}
          <span
            style={{
              background:           `linear-gradient(135deg, ${color}, ${color}aa)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            {locale === 'es' ? 'llega pronto' : 'is coming'}
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="font-sans"
          style={{
            fontSize:     '18px',
            lineHeight:   '1.6',
            color:        'var(--text-secondary)',
            marginBottom: displayDesc ? '12px' : '36px',
          }}
        >
          {displayTagline}
        </p>

        {/* Optional description */}
        {displayDesc && (
          <p
            className="font-sans"
            style={{
              fontSize:     '15px',
              lineHeight:   '1.7',
              color:        'var(--text-muted)',
              marginBottom: '36px',
            }}
          >
            {displayDesc}
          </p>
        )}

        {/* Launch label (when no countdown date) */}
        {!launchDate && displayLaunchLbl && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 font-sans font-semibold text-[14px]"
            style={{
              background: `${color}10`,
              border:     `1px solid ${color}25`,
              color:      color,
            }}
          >
            {displayLaunchLbl}
          </div>
        )}

        {/* Countdown timer */}
        {launchDate && timeLeft && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-10"
            aria-label="Launch countdown"
          >
            <CountdownUnit value={timeLeft.days}    labelEn="Days"    labelEs="Días"    locale={locale} color={color} />
            <CountdownSep color={color} />
            <CountdownUnit value={timeLeft.hours}   labelEn="Hours"   labelEs="Horas"   locale={locale} color={color} />
            <CountdownSep color={color} />
            <CountdownUnit value={timeLeft.minutes} labelEn="Minutes" labelEs="Minutos" locale={locale} color={color} />
            <CountdownSep color={color} />
            <CountdownUnit value={timeLeft.seconds} labelEn="Seconds" labelEs="Segs"    locale={locale} color={color} />
          </motion.div>
        )}

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <p
            className="font-sans font-medium text-[14px] mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            {locale === 'es'
              ? 'Sé el primero en saber cuándo lanzamos.'
              : 'Be the first to know when we launch.'}
          </p>

          <WaitlistForm divisionId={divisionId} color={color} locale={locale} />
        </motion.div>

        {/* Privacy note */}
        <p
          className="font-sans text-[12px] mt-4"
          style={{ color: 'var(--text-muted)' }}
        >
          {locale === 'es'
            ? 'Sin spam. Cancela cuando quieras.'
            : 'No spam. Unsubscribe at any time.'}
        </p>
      </motion.div>
    </div>
  )
}

export default ComingSoon
