// components/sections/DivisionsGrid.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import {
  SectionWrapper,
  SectionItem,
  SectionHeading,
  DivisionCard,
} from '@/components/shared'
import { Button } from '@/components/shared/Button'
import { useLocale } from '@/hooks/use-locale'
import { DIVISIONS } from '@/lib/constants'

export default function DivisionsGrid() {
  const { locale } = useLocale()

  // Split divisions into two rows for centered desktop layout:
  // Row 1: Energy, Connect, Store  (3 cards — full row)
  // Row 2: AI, Drones              (2 cards — centered in 3-col grid)
  const rowOne = DIVISIONS.slice(0, 3)
  const rowTwo = DIVISIONS.slice(3)

  return (
    <SectionWrapper bg="white" id="divisions" stagger>

      {/* ── Section heading ─────────────────────────────── */}
      <SectionItem className="mb-14">
        <SectionHeading
          label="What We Do"
          labelEs="Lo Que Hacemos"
          headline="Five Divisions. One Vision."
          headlineEs="Cinco Divisiones. Una Visión."
          subheadline="From household energy bills to enterprise AI — Aventia Global is building the technology stack Texas deserves."
          subheadlineEs="Desde facturas de energía del hogar hasta IA empresarial — Aventia Global está construyendo la infraestructura tecnológica que Texas merece."
          align="center"
          locale={locale}
          subheadlineMaxWidth="580px"
        />
      </SectionItem>

      {/* ── Row 1: First 3 divisions ────────────────────── */}
      <SectionItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rowOne.map((division) => (
            <div key={division.id} className="flex flex-col">
              <DivisionCard division={division} locale={locale} />
            </div>
          ))}
        </div>
      </SectionItem>

      {/* ── Row 2: Last 2 divisions — centered on desktop ── */}
      <SectionItem className="mt-6">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          style={{ maxWidth: 'calc(66.667% - 8px)', margin: '0 auto' }}
        >
          {rowTwo.map((division) => (
            <div key={division.id} className="flex flex-col">
              <DivisionCard division={division} locale={locale} />
            </div>
          ))}
        </div>
      </SectionItem>

      {/* ── Energy live callout banner ───────────────────── */}
      {/* Highlights the only live division and drives enrollment */}
      <SectionItem className="mt-10">
        <div
          className="rounded-2xl px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(217,119,6,0.07), rgba(245,158,11,0.04))',
            border:     '1px solid rgba(217,119,6,0.22)',
          }}
        >
          {/* Left: live badge + copy */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="flex items-center justify-center rounded-xl shrink-0 mt-0.5"
              style={{
                width:      '44px',
                height:     '44px',
                background: 'rgba(217,119,6,0.12)',
                color:      '#D97706',
              }}
            >
              <Zap size={20} strokeWidth={2} aria-hidden="true" />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge badge-live">
                  {locale === 'es' ? 'En Vivo Ahora' : 'Live Now'}
                </span>
                <span
                  className="font-sans text-[12px] font-medium"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {locale === 'es' ? '— Disponible en Texas' : '— Available Across Texas'}
                </span>
              </div>

              <h3
                className="font-display font-bold"
                style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px' }}
              >
                {locale === 'es'
                  ? 'Aventia Energy está listo para ti'
                  : 'Aventia Energy is ready for you'}
              </h3>

              <p
                className="font-sans"
                style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
              >
                {locale === 'es'
                  ? 'Compara planes de electricidad en Texas y cambia en minutos. Sin papeles, sin cargos ocultos.'
                  : 'Compare Texas electricity plans and switch in minutes. No paperwork, no hidden fees.'}
              </p>
            </div>
          </div>

          {/* Right: CTA button */}
          <div className="shrink-0">
            <Button
              asChild
              variant="primary"
              rightIcon={<ArrowRight size={16} strokeWidth={2} />}
              style={{
                background:  'linear-gradient(135deg, #D97706, #F59E0B)',
                boxShadow:   '0 4px 16px rgba(217,119,6,0.30)',
              }}
            >
              <Link href="https://energy.aventiaglobal.com">
                {locale === 'es' ? 'Comparar Planes' : 'Compare Plans'}
              </Link>
            </Button>
          </div>
        </div>
      </SectionItem>

      {/* ── Bottom note ──────────────────────────────────── */}
      <SectionItem>
        <p
          className="font-sans text-center mt-8"
          style={{ fontSize: '13px', color: 'var(--text-muted)' }}
        >
          {locale === 'es'
            ? 'Todas las divisiones operan bajo Aventia Global LLC · Texas, EE.UU. · En expansión'
            : 'All divisions operate under Aventia Global LLC · Texas, USA · Actively expanding'}
        </p>
      </SectionItem>

    </SectionWrapper>
  )
}
