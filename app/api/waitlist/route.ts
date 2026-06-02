// app/api/waitlist/route.ts
// Handles waitlist signups from ComingSoon component (all 4 coming-soon divisions)
// Body: { email, name?, divisionId, locale? }

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  divisionId: z.enum(['connect', 'store', 'ai', 'drones']),
  locale: z.enum(['en', 'es']).default('en'),
})

type WaitlistData = z.infer<typeof schema>

const DIVISION_LABELS: Record<WaitlistData['divisionId'], string> = {
  connect: 'Aventia Connect',
  store: 'Aventia Store',
  ai: 'Aventia AI',
  drones: 'Aventia Drones',
}

function buildConfirmationText(data: WaitlistData): string {
  const divisionLabel = DIVISION_LABELS[data.divisionId]
  if (data.locale === 'es') {
    return [
      data.name ? `Hola ${data.name},` : 'Hola,',
      '',
      `¡Gracias por unirte a la lista de espera de ${divisionLabel}!`,
      '',
      'Serás de los primeros en saber cuando lancemos. Te avisaremos por correo electrónico.',
      '',
      'Mientras tanto, visita aventiaglobal.com para conocer nuestras otras divisiones.',
      '',
      '— Equipo Aventia Global',
    ].join('\n')
  }
  return [
    data.name ? `Hi ${data.name},` : 'Hi there,',
    '',
    `Thanks for joining the ${divisionLabel} waitlist!`,
    '',
    "You'll be among the first to know when we launch. We'll email you with updates.",
    '',
    'In the meantime, visit aventiaglobal.com to explore our other divisions.',
    '',
    '— Aventia Global Team',
  ].join('\n')
}

export async function POST(request: NextRequest) {
  let data: WaitlistData

  try {
    const body = await request.json()
    data = schema.parse(body)
  } catch (err) {
    console.error('[Waitlist] Validation error:', err)
    return NextResponse.json(
      { success: false, message: 'Invalid request data' },
      { status: 400 }
    )
  }

  console.info('[Waitlist] New signup', {
    divisionId: data.divisionId,
    locale: data.locale,
    email: data.email.replace(/(.{2}).+(@.+)/, '$1***$2'),
    timestamp: new Date().toISOString(),
  })

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      const notifyEmail =
        process.env.WAITLIST_NOTIFICATION_EMAIL ?? 'hello@aventiaglobal.com'
      const divisionLabel = DIVISION_LABELS[data.divisionId]

      // Internal notification
      await resend.emails.send({
        from: 'Aventia Global <noreply@aventiaglobal.com>',
        to: [notifyEmail],
        subject: `[Waitlist] ${divisionLabel} — ${data.email}`,
        text: [
          `New waitlist signup for ${divisionLabel}`,
          `Name     : ${data.name ?? 'Not provided'}`,
          `Division : ${data.divisionId}`,
          `Locale   : ${data.locale}`,
          `Time     : ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT`,
        ].join('\n'),
      })

      // Customer confirmation
      await resend.emails.send({
        from: `${divisionLabel} <noreply@aventiaglobal.com>`,
        to: [data.email],
        subject:
          data.locale === 'es'
            ? `¡Estás en la lista! ${divisionLabel} — Aventia Global`
            : `You're on the list! ${divisionLabel} — Aventia Global`,
        text: buildConfirmationText(data),
      })
    } catch (emailErr) {
      console.error('[Waitlist] Resend error:', emailErr)
    }
  } else {
    console.warn('[Waitlist] RESEND_API_KEY not set — email skipped')
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
