// components/sections/energy/PlanComparison.tsx
'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Minus, ArrowRight, Star } from 'lucide-react'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// PLAN DATA — defined outside component (static, no re-creation)
// ─────────────────────────────────────────────────────────────

const PLANS = [
  {
    id:          'starter',
    nameEn:      'Starter',
    nameEs:      'Inicial',
    typeEn:      'Variable Rate',
    typeEs:      'Tasa Variable',
    rate:        0.099,
    contractEn:  'Month-to-month',
    contractEs:  'Mes a mes',
    featured:    false,
    badgeEn:     null,
    badgeEs:     null,
    bestForEn:   'Maximum flexibility — no commitment',
    bestForEs:   'Máxima flexibilidad — sin compromiso',
    accentColor: '#64748B',
    features: [
      { en: 'Starting rate $0.099/kWh',          es: 'Tarifa inicial $0.099/kWh',         included: true  },
      { en: 'No long-term commitment',            es: 'Sin compromiso a largo plazo',      included: true  },
      { en: 'No cancellation fees',               es: 'Sin cargos de cancelación',         included: true  },
      { en: 'Online account management',          es: 'Gestión de cuenta en línea',        included: true  },
      { en: 'Bilingual support EN + ES',          es: 'Soporte bilingüe EN + ES',          included: true  },
      { en: 'Rate protection from market spikes', es: 'Protección contra picos de tarifa', included: false },
    ],
    ctaEn: 'Select Starter',
    ctaEs: 'Elegir Inicial',
  },
  {
    id:          'standard',
    nameEn:      'Standard',
    nameEs:      'Estándar',
    typeEn:      '12-Month Fixed',
    typeEs:      'Fijo 12 Meses',
    rate:        0.109,
    contractEn:  '12 months',
    contractEs:  '12 meses',
    featured:    true,
    badgeEn:     'Most Popular',
    badgeEs:     'Más Popular',
    bestForEn:   'Best value for most Texas homes',
    bestForEs:   'Mejor valor para hogares en Texas',
    accentColor: '#D97706',
    features: [
      { en: 'Fixed rate $0.109/kWh for 12 months', es: 'Tarifa fija $0.109/kWh por 12 meses', included: true },
      { en: 'No cancellation fees (first 30 days)', es: 'Sin cargos (primeros 30 días)',          included: true },
      { en: 'Protection from market spikes',        es: 'Protección contra picos del mercado',   included: true },
      { en: 'Online account management',            es: 'Gestión de cuenta en línea',             included: true },
      { en: 'Bilingual support EN + ES',            es: 'Soporte bilingüe EN + ES',               included: true },
      { en: 'Rate protection from market spikes',   es: 'Protección contra picos de tarifa',      included: true },
    ],
    ctaEn: 'Select Standard',
    ctaEs: 'Elegir Estándar',
  },
  {
    id:          'premium',
    nameEn:      'Premium',
    nameEs:      'Premium',
    typeEn:      '24-Month Fixed',
    typeEs:      'Fijo 24 Meses',
    rate:        0.119,
    contractEn:  '24 months',
    contractEs:  '24 meses',
    featured:    false,
    badgeEn:     'Best Long-Term Value',
    badgeEs:     'Mejor Valor a Largo Plazo',
    bestForEn:   'Maximum price stability for 2 years',
    bestForEs:   'Máxima estabilidad de precio por 2 años',
    accentColor: '#0891B2',
    features: [
      { en: 'Fixed rate $0.119/kWh for 24 months', es: 'Tarifa fija $0.119/kWh por 24 meses', included: true },
      { en: 'No cancellation fees (first 30 days)', es: 'Sin cargos (primeros 30 días)',          included: true },
      { en: 'Maximum rate protection (2 years)',    es: 'Máxima protección de tarifa (2 años)',  included: true },
      { en: 'Online account management',            es: 'Gestión de cuenta en línea',             included: true },
      { en: 'Bilingual support EN + ES',            es: 'Soporte bilingüe EN + ES',               included: true },
      { en: 'Priority customer support',            es: 'Soporte al cliente prioritario',         included: true },
    ],
    ctaEn: 'Select Premium',
    ctaEs: 'Elegir Premium',
  },
] as const

type Plan = typeof PLANS[number]

// ─────────────────────────────────────────────────────────────
// PLAN CARD COMPONENT
// ─────────────────────────────────────────────────────────────

function PlanCard({ plan, locale }: { plan: Plan; locale: Locale }) {
  const isFeatured = plan.featured

  return (
    <motion.div
      className="flex flex-col h-full"
      style={{
        background:    'var(--white)',
        borderRadius:  'var(--radius-lg)',
        // Featured: amber border + deeper shadow. Others: standard border.
        border:        isFeatured
          ? `2px solid ${plan.accentColor}`
          : '1px solid var(--border)',
        boxShadow:     isFeatured
          ? `var(--shadow-lg), 0 0 0 4px ${plan.accentColor}14`
          : 'var(--shadow-card)',
        overflow:      'hidden',
        position:      'relative',
      }}
      whileHover={{
        y: -5,
        boxShadow: isFeatured
          ? `0 12px 40px ${plan.accentColor}30, 0 0 0 4px ${plan.accentColor}14`
          : `0 8px 32px rgba(0,0,0,0.10)`,
      }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ── Colored top accent bar ─────────────────── */}
      <div
        style={{
          height:     isFeatured ? '4px' : '3px',
          background: isFeatured
            ? `linear-gradient(90deg, ${plan.accentColor}, ${plan.accentColor}cc)`
            : plan.accentColor,
          flexShrink: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Badge (below the top bar) ──────────────── */}
      {(plan.badgeEn || plan.badgeEs) && (
        <div
          className="flex justify-center"
          style={{ paddingTop: '16px' }}
        >
          <span
            className="inline-flex items-center gap-1.5 font-sans font-semibold"
            style={{
              fontSize:      '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding:       '4px 12px',
              borderRadius:  '100px',
              background:    `${plan.accentColor}14`,
              border:        `1px solid ${plan.accentColor}30`,
              color:         plan.accentColor,
            }}
          >
            {isFeatured && (
              <Star size={10} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
            )}
            {locale === 'es'
              ? (plan.badgeEs ?? '')
              : (plan.badgeEn ?? '')}
          </span>
        </div>
      )}

      {/* ── Card body ──────────────────────────────── */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: '24px 28px 28px' }}
      >
        {/* Plan type */}
        <p
          className="font-sans font-semibold"
          style={{
            fontSize:      '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         plan.accentColor,
            marginBottom:  '6px',
          }}
        >
          {locale === 'es' ? plan.typeEs : plan.typeEn}
        </p>

        {/* Plan name */}
        <h3
          className="font-display font-bold"
          style={{
            fontSize:     '26px',
            color:        'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          {locale === 'es' ? plan.nameEs : plan.nameEn}
        </h3>

        {/* Rate display */}
        <div
          className="flex items-baseline gap-1.5"
          style={{ marginBottom: '6px' }}
        >
          <span
            className="font-mono font-medium"
            style={{
              fontSize:             '40px',
              lineHeight:           1,
              background:           isFeatured
                ? `linear-gradient(135deg, ${plan.accentColor}, #F59E0B)`
                : `linear-gradient(135deg, ${plan.accentColor}, ${plan.accentColor}bb)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            ${plan.rate.toFixed(3)}
          </span>
          <span
            className="font-sans"
            style={{ fontSize: '15px', color: 'var(--text-muted)', paddingBottom: '3px' }}
          >
            /kWh
          </span>
        </div>

        {/* Contract term */}
        <p
          className="font-sans"
          style={{
            fontSize:     '13px',
            color:        'var(--text-muted)',
            marginBottom: '8px',
          }}
        >
          {locale === 'es' ? 'Contrato:' : 'Contract:'}{' '}
          <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {locale === 'es' ? plan.contractEs : plan.contractEn}
          </span>
        </p>

        {/* Best for */}
        <p
          className="font-sans text-[13px] mb-6"
          style={{
            color:          plan.accentColor,
            fontStyle:      'italic',
            paddingBottom:  '16px',
            borderBottom:   '1px solid var(--border)',
          }}
        >
          {locale === 'es' ? plan.bestForEs : plan.bestForEn}
        </p>

        {/* Feature list */}
        <ul
          className="space-y-2.5 flex-1 mb-7"
          style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}
        >
          {plan.features.map((feature) => (
            <li
              key={feature.en}
              className="flex items-start gap-2.5"
            >
              {feature.included ? (
                <CheckCircle2
                  size={16}
                  strokeWidth={2}
                  style={{ color: '#059669', flexShrink: 0, marginTop: '1px' }}
                  aria-label="Included"
                />
              ) : (
                <Minus
                  size={16}
                  strokeWidth={2}
                  style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '1px', opacity: 0.5 }}
                  aria-label="Not included"
                />
              )}
              <span
                className="font-sans text-[14px]"
                style={{
                  color: feature.included
                    ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                  opacity: feature.included ? 1 : 0.6,
                }}
              >
                {locale === 'es' ? feature.es : feature.en}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button — sits at the bottom of the card */}
        <a
          href="#enroll"
          className="btn w-full justify-center"
          style={
            isFeatured
              ? {
                  background:     `linear-gradient(135deg, ${plan.accentColor}, #F59E0B)`,
                  boxShadow:      `0 4px 16px ${plan.accentColor}35`,
                  color:          '#FFFFFF',
                  textDecoration: 'none',
                }
              : {
                  background:     'var(--white)',
                  border:         `1.5px solid ${plan.accentColor}`,
                  color:          plan.accentColor,
                  textDecoration: 'none',
                }
          }
        >
          {locale === 'es' ? plan.ctaEs : plan.ctaEn}
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// PLAN COMPARISON — MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function PlanComparison() {
  const { locale } = useLocale()

  return (
    <SectionWrapper bg="white" id="plans">

      {/* ── Section heading ───────────────────────── */}
      <SectionHeading
        label="Our Plans"
        labelEs="Nuestros Planes"
        headline="Three Plans. One Clear Choice."
        headlineEs="Tres Planes. Una Elección Clara."
        subheadline="Whether you want flexibility, stability, or long-term savings — we have a Texas energy plan for you."
        subheadlineEs="Ya sea que quieras flexibilidad, estabilidad o ahorro a largo plazo — tenemos un plan de energía para ti."
        align="center"
        locale={locale}
        className="mb-4"
      />

      {/* ── "All plans include" strip ─────────────── */}
      <div className="flex justify-center mb-10">
        <div
          className="inline-flex flex-wrap justify-center gap-x-5 gap-y-2 px-6 py-3 rounded-full"
          style={{
            background: 'var(--bg-primary)',
            border:     '1px solid var(--border)',
          }}
        >
          {[
            { en: 'Free enrollment',          es: 'Inscripción gratuita'        },
            { en: 'No setup fees',             es: 'Sin cargos de activación'   },
            { en: 'Texas PUC Licensed',        es: 'Certificado PUC Texas'      },
            { en: 'Bilingual support',         es: 'Soporte bilingüe'           },
          ].map((item) => (
            <span
              key={item.en}
              className="inline-flex items-center gap-1.5 font-sans"
              style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
            >
              <CheckCircle2
                size={13}
                strokeWidth={2.5}
                style={{ color: '#059669' }}
                aria-hidden="true"
              />
              {locale === 'es' ? item.es : item.en}
            </span>
          ))}
        </div>
      </div>

      {/* ── Plan cards grid ───────────────────────── */}
      {/*
        Featured (Standard) card is at lg:mt-0.
        Starter and Premium are at lg:mt-4 to visually push them down
        so the center card appears to "pop" above the others on desktop.
        On mobile, all cards are the same height in a single column.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={plan.featured ? 'lg:mt-0' : 'lg:mt-4'}
          >
            <PlanCard plan={plan} locale={locale} />
          </div>
        ))}
      </div>

      {/* ── Bottom note ───────────────────────────── */}
      <div className="mt-10 text-center">
        <p
          className="font-sans"
          style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}
        >
          {locale === 'es'
            ? '* Las tarifas son ejemplos de referencia. Las tarifas reales varían según el proveedor, zona y condiciones del mercado. Sujeto a aprobación y términos del contrato.'
            : '* Rates are reference examples. Actual rates vary by provider, zone, and market conditions. Subject to approval and contract terms.'}
        </p>
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {locale === 'es'
            ? '¿Tienes preguntas? Estamos aquí en español e inglés.'
            : 'Have questions? We\'re here in English and Spanish.'}
          {' '}
          <a
            href="#contact"
            className="font-semibold hover:underline"
            style={{ color: '#D97706' }}
          >
            {locale === 'es' ? 'Contáctanos →' : 'Contact us →'}
          </a>
        </p>
      </div>

    </SectionWrapper>
  )
}
