// components/sections/energy/SavingsCalculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingDown, ArrowRight, Zap } from 'lucide-react'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const AVENTIA_RATE   = 0.099  // per kWh
const TEXAS_AVG     = 0.128  // Texas residential average (ERCOT)
const SAVINGS_RATE  = parseFloat((TEXAS_AVG - AVENTIA_RATE).toFixed(3)) // 0.029

const MIN_KWH     = 500
const MAX_KWH     = 3000
const STEP_KWH    = 50
const DEFAULT_KWH = 1200

// Width of Aventia bar relative to Texas avg bar (percentage)
const AVENTIA_BAR_WIDTH = `${((AVENTIA_RATE / TEXAS_AVG) * 100).toFixed(1)}%` // 77.3%

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function formatDollars(n: number, decimals = 2): string {
  return `$${n.toFixed(decimals)}`
}

function formatKwh(n: number): string {
  return n.toLocaleString('en-US')
}

/** Returns a usage category label based on kWh */
function getUsageCategory(kwh: number, locale: 'en' | 'es') {
  if (kwh <  800) return locale === 'es' ? 'Uso Bajo'                : 'Low Usage'
  if (kwh < 1500) return locale === 'es' ? 'Hogar Promedio en Texas' : 'Average Texas Home'
  if (kwh < 2500) return locale === 'es' ? 'Uso Alto'                : 'High Usage'
  return locale === 'es' ? 'Uso Muy Alto' : 'Very High Usage'
}

/** Amber category color based on usage level */
function getCategoryColor(kwh: number): string {
  if (kwh <  800) return '#059669'  // green — efficient
  if (kwh < 1500) return '#D97706'  // amber — average
  if (kwh < 2500) return '#EA580C'  // orange — high
  return '#DC2626'                   // red — very high
}

// ─────────────────────────────────────────────────────────────
// SAVINGS CALCULATOR
// ─────────────────────────────────────────────────────────────

export default function SavingsCalculator() {
  const { locale }    = useLocale()
  const [usage, setUsage] = useState<number>(DEFAULT_KWH)

  // Real-time calculations
  const monthlySavings = useMemo(() => usage * SAVINGS_RATE,          [usage])
  const annualSavings  = useMemo(() => monthlySavings * 12,           [monthlySavings])
  const monthlyBillTX  = useMemo(() => usage * TEXAS_AVG,             [usage])
  const monthlyBillAV  = useMemo(() => usage * AVENTIA_RATE,          [usage])

  // Slider fill percentage for dynamic track color
  const sliderPercent = ((usage - MIN_KWH) / (MAX_KWH - MIN_KWH)) * 100

  const category      = useMemo(() => getUsageCategory(usage, locale), [usage, locale])
  const categoryColor = useMemo(() => getCategoryColor(usage),         [usage])

  return (
    <>
      {/* ── Range input custom styles ────────────────── */}
      {/* Inline <style> is necessary because the track fill is a
          dynamic percentage that changes on every slider move.
          Tailwind cannot express this at build time. */}
      <style>{`
        .energy-calc-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        .energy-calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2.5px solid #D97706;
          box-shadow: 0 2px 8px rgba(217,119,6,0.35);
          cursor: pointer;
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        .energy-calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.12);
          box-shadow: 0 3px 14px rgba(217,119,6,0.50);
        }
        .energy-calc-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2.5px solid #D97706;
          box-shadow: 0 2px 8px rgba(217,119,6,0.35);
          cursor: pointer;
        }
      `}</style>

      <SectionWrapper bg="off-white" id="calculator">
        {/* ── Section heading ───────────────────────── */}
        <SectionHeading
          label="Savings Calculator"
          labelEs="Calculadora de Ahorro"
          headline="See How Much You Could Save."
          headlineEs="Descubre Cuánto Podrías Ahorrar."
          subheadline="Slide to your monthly kWh usage. We compare your current Texas rate to Aventia's starting rate in real time."
          subheadlineEs="Desliza hasta tu consumo mensual en kWh. Comparamos tu tarifa actual de Texas con la tarifa inicial de Aventia en tiempo real."
          align="center"
          locale={locale}
          className="mb-12"
        />

        {/* ── Calculator card ───────────────────────── */}
        <div
          className="mx-auto rounded-2xl overflow-hidden"
          style={{
            maxWidth:     '860px',
            background:   'var(--white)',
            border:       '1px solid var(--border)',
            boxShadow:    'var(--shadow-md)',
          }}
        >

          {/* ── Two-column panel ─────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── LEFT: Slider ───────────────────────── */}
            <div
              className="p-8 flex flex-col justify-center"
              style={{ borderBottom: 'none', borderRight: '1px solid var(--border)' }}
            >
              {/* Label */}
              <p
                className="font-sans font-semibold mb-2"
                style={{
                  fontSize:      '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         'var(--text-muted)',
                }}
              >
                {locale === 'es'
                  ? 'Tu Consumo Mensual'
                  : 'Your Monthly Usage'}
              </p>

              {/* Usage amount — animates on change */}
              <div className="flex items-baseline gap-2 mb-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={usage}
                    className="font-mono font-medium"
                    style={{
                      fontSize:             '52px',
                      lineHeight:           1,
                      background:           `linear-gradient(135deg, #D97706, #F59E0B)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor:  'transparent',
                      backgroundClip:       'text',
                    }}
                    initial={{ opacity: 0.6, scale: 0.96 }}
                    animate={{ opacity: 1,   scale: 1    }}
                    transition={{ duration: 0.15 }}
                  >
                    {formatKwh(usage)}
                  </motion.span>
                </AnimatePresence>
                <span
                  className="font-sans font-medium"
                  style={{ fontSize: '18px', color: 'var(--text-muted)', paddingBottom: '4px' }}
                >
                  kWh
                </span>
              </div>

              {/* Usage category badge */}
              <div className="mb-7">
                <span
                  className="inline-flex items-center gap-1.5 font-sans font-semibold"
                  style={{
                    fontSize:   '13px',
                    color:      categoryColor,
                    background: `${categoryColor}14`,
                    border:     `1px solid ${categoryColor}30`,
                    padding:    '3px 10px',
                    borderRadius: '100px',
                  }}
                >
                  <Zap size={11} strokeWidth={2.5} aria-hidden="true" />
                  {category}
                </span>
              </div>

              {/* Range slider */}
              <input
                type="range"
                className="energy-calc-slider mb-3"
                min={MIN_KWH}
                max={MAX_KWH}
                step={STEP_KWH}
                value={usage}
                onChange={(e) => setUsage(Number(e.target.value))}
                aria-label={
                  locale === 'es'
                    ? `Consumo mensual: ${formatKwh(usage)} kWh`
                    : `Monthly usage: ${formatKwh(usage)} kWh`
                }
                style={{
                  background: `linear-gradient(to right,
                    #D97706 0%,
                    #D97706 ${sliderPercent}%,
                    var(--border) ${sliderPercent}%,
                    var(--border) 100%
                  )`,
                }}
              />

              {/* Slider range labels */}
              <div className="flex justify-between">
                <span className="font-sans text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  500 kWh
                </span>
                <span className="font-sans text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {locale === 'es' ? 'Promedio 1,200' : 'Avg 1,200'}
                </span>
                <span className="font-sans text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  3,000 kWh
                </span>
              </div>

              {/* Source note */}
              <p
                className="font-sans mt-5"
                style={{ fontSize: '11px', color: 'var(--text-muted)', opacity: 0.7 }}
              >
                {locale === 'es'
                  ? '* Tarifa promedio de Texas basada en datos de ERCOT'
                  : '* Texas avg rate based on ERCOT residential data'}
              </p>
            </div>

            {/* ── RIGHT: Savings display ──────────────── */}
            <div className="p-8 flex flex-col justify-center">

              {/* Monthly savings hero number */}
              <div className="text-center mb-6">
                <p
                  className="font-sans font-medium mb-2"
                  style={{ fontSize: '13px', color: 'var(--text-muted)' }}
                >
                  {locale === 'es'
                    ? 'Ahorro Mensual Estimado'
                    : 'Estimated Monthly Savings'}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={Math.round(monthlySavings)}
                    initial={{ opacity: 0.5, scale: 0.96 }}
                    animate={{ opacity: 1,   scale: 1    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className="font-mono font-medium block"
                      style={{
                        fontSize:             '56px',
                        lineHeight:           1,
                        background:           'linear-gradient(135deg, #D97706, #F59E0B)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor:  'transparent',
                        backgroundClip:       'text',
                      }}
                    >
                      {formatDollars(monthlySavings)}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <p
                  className="font-sans mt-1"
                  style={{ fontSize: '14px', color: 'var(--text-muted)' }}
                >
                  {locale === 'es' ? 'por mes' : 'per month'}
                </p>

                {/* Annual savings callout */}
                <div
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(5,150,105,0.09)',
                    border:     '1px solid rgba(5,150,105,0.22)',
                  }}
                >
                  <TrendingDown size={13} style={{ color: '#059669' }} aria-hidden="true" />
                  <span
                    className="font-sans font-semibold"
                    style={{ fontSize: '13px', color: '#059669' }}
                  >
                    {formatDollars(annualSavings, 0)}{' '}
                    {locale === 'es' ? 'ahorrado por año' : 'saved per year'}
                  </span>
                </div>
              </div>

              {/* Rate comparison bars */}
              <div className="space-y-4">

                {/* Texas avg rate */}
                <div>
                  <div
                    className="flex justify-between items-center mb-1.5"
                  >
                    <span
                      className="font-sans text-[13px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {locale === 'es'
                        ? 'Tarifa promedio Texas'
                        : 'Texas avg rate'}
                    </span>
                    <span
                      className="font-mono font-medium text-[13px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {formatDollars(monthlyBillTX, 2)}
                      <span className="font-sans font-normal text-[11px] ml-1">
                        / {locale === 'es' ? 'mes' : 'mo'}
                      </span>
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(239,68,68,0.12)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width:      '100%',
                        background: 'rgba(239,68,68,0.45)',
                      }}
                    />
                  </div>
                  <p
                    className="font-mono text-[11px] mt-1 text-right"
                    style={{ color: 'rgba(239,68,68,0.7)' }}
                  >
                    $0.128/kWh
                  </p>
                </div>

                {/* Aventia rate */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span
                      className="font-sans font-semibold text-[13px]"
                      style={{ color: '#D97706' }}
                    >
                      Aventia Energy
                    </span>
                    <span
                      className="font-mono font-medium text-[13px]"
                      style={{ color: '#D97706' }}
                    >
                      {formatDollars(monthlyBillAV, 2)}
                      <span className="font-sans font-normal text-[11px] ml-1">
                        / {locale === 'es' ? 'mes' : 'mo'}
                      </span>
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(217,119,6,0.12)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(to right, #D97706, #F59E0B)' }}
                      initial={{ width: AVENTIA_BAR_WIDTH }}
                      animate={{ width: AVENTIA_BAR_WIDTH }}
                    />
                  </div>
                  <p
                    className="font-mono text-[11px] mt-1 text-right"
                    style={{ color: '#D97706' }}
                  >
                    $0.099/kWh
                  </p>
                </div>

                {/* Savings per kWh callout */}
                <div
                  className="flex items-center gap-2 pt-1"
                >
                  <TrendingDown
                    size={14}
                    style={{ color: '#059669', flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-sans font-medium"
                    style={{ fontSize: '13px', color: '#059669' }}
                  >
                    {locale === 'es'
                      ? `Ahorras $${SAVINGS_RATE.toFixed(3)} por kWh con Aventia`
                      : `Save $${SAVINGS_RATE.toFixed(3)} per kWh with Aventia`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card footer — summary + CTA ──────────── */}
          <div
            className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              borderTop:  '1px solid var(--border)',
              background: 'var(--bg-primary)',
            }}
          >
            {/* Summary text */}
            <p
              className="font-sans"
              style={{ fontSize: '13px', color: 'var(--text-muted)' }}
            >
              {locale === 'es'
                ? `Usando ${formatKwh(usage)} kWh/mes · Tarifa TX promedio vs $0.099 Aventia`
                : `Using ${formatKwh(usage)} kWh/mo · TX avg rate vs $0.099 Aventia`}
            </p>

            {/* CTA */}
            <a
              href="#plans"
              className="btn btn-sm inline-flex items-center gap-1.5 shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D97706, #F59E0B)',
                boxShadow:  '0 4px 12px rgba(217,119,6,0.28)',
                color:      '#FFFFFF',
                textDecoration: 'none',
              }}
            >
              {locale === 'es' ? 'Ver Mis Planes' : 'See My Plans'}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ── Disclaimer ────────────────────────────── */}
        <p
          className="font-sans text-center mt-6"
          style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '600px', margin: '24px auto 0' }}
        >
          {locale === 'es'
            ? '* Las estimaciones se basan en tarifas de referencia. Los ahorros reales varían según el plan, el uso y las tarifas de distribución. Sujeto a términos del contrato.'
            : '* Estimates based on reference rates. Actual savings vary by plan, usage, and distribution charges. Subject to contract terms.'}
        </p>
      </SectionWrapper>
    </>
  )
}
