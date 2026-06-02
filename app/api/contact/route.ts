// app/api/contact/route.ts
// Handles 3 submission types via the 'type' field:
//   'commercial_quote' — from CommercialQuote.tsx (Energy page)
//   'ai_inquiry'       — from InquiryForm in AI page
//   'general'          — fallback for any other contact

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// ── Schemas per type ─────────────────────────────────────────

const commercialSchema = z.object({
  type: z.literal('commercial_quote'),
  businessName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  meters: z.string(),
  monthlyKwh: z.string().optional(),
  notes: z.string().optional(),
  locale: z.enum(['en', 'es']).default('en'),
})

const aiSchema = z.object({
  type: z.literal('ai_inquiry'),
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string(),
  primaryLang: z.string(),
  volume: z.string(),
  description: z.string().optional(),
  locale: z.enum(['en', 'es']).default('en'),
})

const generalSchema = z.object({
  type: z.literal('general').optional().default('general'),
  name: z.string().optional(),
  email: z.string().email(),
  message: z.string().optional(),
  locale: z.enum(['en', 'es']).default('en'),
})

// ── Email text builders ───────────────────────────────────────

function commercialEmailText(d: z.infer<typeof commercialSchema>): string {
  return [
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    'NEW COMMERCIAL QUOTE REQUEST — Aventia Energy',
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    `Business     : ${d.businessName}`,
    `Contact      : ${d.contactName}`,
    `Meters       : ${d.meters}`,
    `Monthly kWh  : ${d.monthlyKwh ?? 'Not provided'}`,
    `Notes        : ${d.notes ?? 'None'}`,
    `Language     : ${d.locale === 'es' ? 'Spanish' : 'English'}`,
    `Submitted    : ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT`,
    '━━━━━━━━━━━━━━━━━━━━━━━━',
  ].join('\n')
}

function aiEmailText(d: z.infer<typeof aiSchema>): string {
  return [
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    'NEW AI PROJECT INQUIRY — Aventia AI',
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    `Company      : ${d.companyName}`,
    `Contact      : ${d.contactName}`,
    `Project Type : ${d.projectType}`,
    `Language     : ${d.primaryLang}`,
    `Volume       : ${d.volume}`,
    `Description  : ${d.description ?? 'None'}`,
    `Locale       : ${d.locale === 'es' ? 'Spanish' : 'English'}`,
    `Submitted    : ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT`,
    '━━━━━━━━━━━━━━━━━━━━━━━━',
  ].join('\n')
}

// ── Route handler ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON' },
      { status: 400 }
    )
  }

  const submissionType = (body.type as string) ?? 'general'

  // Parse based on type
  let parsed:
    | z.infer<typeof commercialSchema>
    | z.infer<typeof aiSchema>
    | z.infer<typeof generalSchema>

  try {
    if (submissionType === 'commercial_quote') {
      parsed = commercialSchema.parse(body)
    } else if (submissionType === 'ai_inquiry') {
      parsed = aiSchema.parse(body)
    } else {
      parsed = generalSchema.parse(body)
    }
  } catch (err) {
    console.error('[Contact] Validation error:', err)
    return NextResponse.json(
      { success: false, message: 'Invalid request data' },
      { status: 400 }
    )
  }

  // Console log (always)
  console.info('[Contact] New submission', {
    type: submissionType,
    locale: parsed.locale,
    email: parsed.email.replace(/(.{2}).+(@.+)/, '$1***$2'),
    timestamp: new Date().toISOString(),
  })

  // Send email via Resend (optional)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      const notifyEmail =
        process.env.CONTACT_NOTIFICATION_EMAIL ?? 'hello@aventiaglobal.com'

      let subject: string
      let text: string

      if (submissionType === 'commercial_quote') {
        const d = parsed as z.infer<typeof commercialSchema>
        subject = `[Commercial Quote] ${d.businessName} — ${d.meters} meter(s)`
        text = commercialEmailText(d)
      } else if (submissionType === 'ai_inquiry') {
        const d = parsed as z.infer<typeof aiSchema>
        subject = `[AI Inquiry] ${d.companyName} — ${d.projectType}`
        text = aiEmailText(d)
      } else {
        subject = '[General Contact] New message — Aventia Global'
        text = `Email: ${parsed.email}\nMessage: ${'message' in parsed ? parsed.message : 'N/A'}`
      }

      await resend.emails.send({
        from: 'Aventia Global <noreply@aventiaglobal.com>',
        to: [notifyEmail],
        subject,
        text,
      })
    } catch (emailErr) {
      console.error('[Contact] Resend error:', emailErr)
    }
  } else {
    console.warn('[Contact] RESEND_API_KEY not set — email skipped')
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
