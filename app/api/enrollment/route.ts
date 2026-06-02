// app/api/enrollment/route.ts
// Handles residential and commercial enrollment submissions from EnrollmentForm.tsx
// Body: { serviceType, firstName, lastName, email, phone, zip, plan, howHeard?, consent, locale? }

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  serviceType: z.enum(['residential', 'commercial']),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  zip: z.string().min(5),
  plan: z.enum(['starter', 'standard', 'premium']),
  howHeard: z.string().optional(),
  consent: z.boolean(),
  locale: z.enum(['en', 'es']).default('en'),
})

type EnrollmentData = z.infer<typeof schema>

function buildInternalEmailText(data: EnrollmentData): string {
  return [
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    'NEW AVENTIA ENERGY ENROLLMENT',
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    `Service Type : ${data.serviceType.toUpperCase()}`,
    `Plan         : ${data.plan.toUpperCase()}`,
    `Name         : ${data.firstName} ${data.lastName}`,
    `ZIP          : ${data.zip}`,
    `How heard    : ${data.howHeard ?? 'Not specified'}`,
    `Language     : ${data.locale === 'es' ? 'Spanish' : 'English'}`,
    `Submitted    : ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT`,
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    'Contact the customer to complete enrollment.',
  ].join('\n')
}

function buildConfirmationText(data: EnrollmentData): string {
  if (data.locale === 'es') {
    return [
      `Hola ${data.firstName},`,
      '',
      'Hemos recibido tu solicitud de inscripción en Aventia Energy.',
      `Plan seleccionado: ${data.plan.charAt(0).toUpperCase() + data.plan.slice(1)}`,
      '',
      'Nuestro equipo te contactará en menos de 24 horas para completar tu cambio de proveedor.',
      '',
      'Si tienes preguntas, contáctanos por WhatsApp o al (214) 555-0000.',
      '',
      '— Equipo Aventia Energy',
      'energy@aventiaglobal.com',
    ].join('\n')
  }
  return [
    `Hi ${data.firstName},`,
    '',
    "We've received your Aventia Energy enrollment request.",
    `Selected plan: ${data.plan.charAt(0).toUpperCase() + data.plan.slice(1)}`,
    '',
    'Our team will contact you within 24 hours to complete your provider switch.',
    '',
    'Questions? Reach us on WhatsApp or call (214) 555-0000.',
    '',
    '— Aventia Energy Team',
    'energy@aventiaglobal.com',
  ].join('\n')
}

export async function POST(request: NextRequest) {
  let data: EnrollmentData

  // 1. Parse + validate body
  try {
    const body = await request.json()
    data = schema.parse(body)
  } catch (err) {
    console.error('[Enrollment] Validation error:', err)
    return NextResponse.json(
      { success: false, message: 'Invalid request data' },
      { status: 400 }
    )
  }

  // 2. Console log (redacted — always runs)
  console.info('[Enrollment] New submission', {
    serviceType: data.serviceType,
    plan: data.plan,
    zip: data.zip,
    locale: data.locale,
    email: data.email.replace(/(.{2}).+(@.+)/, '$1***$2'), // partial redaction
    timestamp: new Date().toISOString(),
  })

  // 3. Send emails via Resend (optional — only when key is present)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      const notifyEmail =
        process.env.ENERGY_NOTIFICATION_EMAIL ?? 'energy@aventiaglobal.com'

      // Internal notification email
      await resend.emails.send({
        from: 'Aventia Energy <noreply@aventiaglobal.com>',
        to: [notifyEmail],
        subject: `[Enrollment] ${data.serviceType} — ${data.plan} plan — ${data.firstName} ${data.lastName}`,
        text: buildInternalEmailText(data),
      })

      // Customer confirmation email
      await resend.emails.send({
        from: 'Aventia Energy <energy@aventiaglobal.com>',
        to: [data.email],
        subject:
          data.locale === 'es'
            ? 'Solicitud de inscripción recibida — Aventia Energy'
            : 'Enrollment request received — Aventia Energy',
        text: buildConfirmationText(data),
      })
    } catch (emailErr) {
      // Email failure should NOT fail the user-facing request
      console.error('[Enrollment] Resend error:', emailErr)
    }
  } else {
    console.warn('[Enrollment] RESEND_API_KEY not set — email skipped')
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
