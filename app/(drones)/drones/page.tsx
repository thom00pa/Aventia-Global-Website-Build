'use client'

import { Camera, Sprout, Video, Building, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import ComingSoon from '@/components/shared/ComingSoon'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ACCENT = '#DC2626' // Aventia Drones red
const LAUNCH_DATE = new Date('2026-09-01T00:00:00')

// ─────────────────────────────────────────────────────────────
// DRONE ICON — inline SVG (Lucide has no drone icon)
// Simple quadcopter outline: central body + 4 arms + 4 rotors
// ─────────────────────────────────────────────────────────────

function DroneIcon({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Central body */}
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
      {/* Camera lens below body */}
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      {/* Arms */}
      <line x1="9" y1="9" x2="5" y2="5" />
      <line x1="15" y1="9" x2="19" y2="5" />
      <line x1="9" y1="15" x2="5" y2="19" />
      <line x1="15" y1="15" x2="19" y2="19" />
      {/* Rotors (circles at arm tips) */}
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// USE CASE DATA — 4 cards in a 2×2 grid
// ─────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    Icon: Camera,
    titleEn: 'Infrastructure Inspection',
    titleEs: 'Inspección de Infraestructura',
    descEn:
      'Precision aerial inspection of power lines, bridges, cell towers, oil & gas facilities, and industrial sites — reducing risk and time versus traditional methods.',
    descEs:
      'Inspección aérea de líneas eléctricas, puentes, torres de telecomunicaciones, instalaciones de petróleo y gas y sitios industriales — con menor riesgo y tiempo.',
    statEn: '80% faster than ground inspection',
    statEs: '80% más rápido que la inspección terrestre',
  },
  {
    Icon: Sprout,
    titleEn: 'Agricultural Surveys',
    titleEs: 'Levantamientos Agrícolas',
    descEn:
      'Multispectral crop health mapping, NDVI analysis, irrigation planning, and field-level precision agriculture data to maximize yield across Texas farms.',
    descEs:
      'Mapeo multiespectral de cultivos, análisis NDVI, planificación de riego y datos de agricultura de precisión para maximizar el rendimiento en granjas de Texas.',
    statEn: 'Acre-level crop health data',
    statEs: 'Datos de salud de cultivos por acre',
  },
  {
    Icon: Video,
    titleEn: 'Event & Media Coverage',
    titleEs: 'Cobertura de Eventos y Medios',
    descEn:
      '4K aerial cinematography for concerts, weddings, sporting events, festivals, and commercial productions that ground cameras simply cannot capture.',
    descEs:
      'Cinematografía aérea 4K para conciertos, bodas, eventos deportivos, festivales y producciones comerciales que las cámaras terrestres no pueden capturar.',
    statEn: '4K / 60fps aerial footage',
    statEs: 'Video aéreo 4K / 60fps',
  },
  {
    Icon: Building,
    titleEn: 'Real Estate & Construction',
    titleEs: 'Bienes Raíces y Construcción',
    descEn:
      'High-resolution property photography, construction progress monitoring, 3D site modeling, and volumetric surveys for developers and realtors across Texas.',
    descEs:
      'Fotografía de propiedades de alta resolución, monitoreo de progreso de construcción, modelado 3D y levantamientos volumétricos para desarrolladores en Texas.',
    statEn: 'Listings sell 32% faster',
    statEs: 'Las propiedades se venden 32% más rápido',
  },
] as const

// ─────────────────────────────────────────────────────────────
// USE CASES SECTION
// ─────────────────────────────────────────────────────────────

function UseCasesSection({ locale }: { locale: Locale }) {
  return (
    <SectionWrapper bg="off-white" id="drones-services">
      <SectionHeading
        label="What We Fly"
        labelEs="Lo Que Volamos"
        headline="Eyes in the Sky. Data on the Ground."
        headlineEs="Ojos en el Cielo. Datos en el Suelo."
        subheadline="From farmland to skyscrapers — Aventia Drones delivers professional aerial services across Texas with FAA Part 107 certified operators."
        subheadlineEs="Desde terrenos agrícolas hasta rascacielos — Aventia Drones ofrece servicios aéreos profesionales en Texas con operadores certificados FAA Parte 107."
        align="center"
        locale={locale}
        className="mb-12"
      />

      {/* 2×2 grid on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {USE_CASES.map((useCase, i) => {
          const Icon = useCase.Icon
          return (
            <motion.div
              key={useCase.titleEn}
              className="flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{
                y: -5,
                boxShadow: '0 10px 36px rgba(220,38,38,0.13)',
              }}
            >
              {/* Red top accent bar — thicker for drama */}
              <div
                style={{
                  height: '4px',
                  background: `linear-gradient(90deg, ${ACCENT}, #F87171)`,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 p-7">
                {/* Icon box */}
                <div
                  className="flex items-center justify-center rounded-xl mb-5"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: `${ACCENT}12`,
                    color: ACCENT,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold mb-3"
                  style={{
                    fontSize: '20px',
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                  }}
                >
                  {locale === 'es' ? useCase.titleEs : useCase.titleEn}
                </h3>

                {/* Description */}
                <p
                  className="font-sans flex-1 mb-5"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.65',
                  }}
                >
                  {locale === 'es' ? useCase.descEs : useCase.descEn}
                </p>

                {/* Stat chip */}
                <div className="flex items-center gap-2">
                  <Zap
                    size={13}
                    strokeWidth={2.5}
                    fill={ACCENT}
                    style={{ color: ACCENT, flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-sans font-semibold"
                    style={{ fontSize: '13px', color: ACCENT }}
                  >
                    {locale === 'es' ? useCase.statEs : useCase.statEn}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Specs strip */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          {
            valueEn: '4K',
            valueEs: '4K',
            labelEn: 'Video resolution',
            labelEs: 'Resolución de video',
          },
          {
            valueEn: '500ft',
            valueEs: '500ft',
            labelEn: 'Max altitude covered',
            labelEs: 'Altitud máx. cubierta',
          },
          {
            valueEn: 'FAA',
            valueEs: 'FAA',
            labelEn: 'Part 107 certified',
            labelEs: 'Certificado Parte 107',
          },
          {
            valueEn: 'Texas',
            valueEs: 'Texas',
            labelEn: 'Service area',
            labelEs: 'Área de servicio',
          },
        ].map((spec) => (
          <div
            key={spec.labelEn}
            className="flex flex-col items-center text-center py-4 px-3 rounded-xl"
            style={{
              background: `${ACCENT}07`,
              border: `1px solid ${ACCENT}18`,
            }}
          >
            <span
              className="font-mono font-medium block"
              style={{
                fontSize: '22px',
                lineHeight: 1,
                background: `linear-gradient(135deg, ${ACCENT}, #F87171)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px',
              }}
            >
              {locale === 'es' ? spec.valueEs : spec.valueEn}
            </span>
            <span
              className="font-sans"
              style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3 }}
            >
              {locale === 'es' ? spec.labelEs : spec.labelEn}
            </span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

// ─────────────────────────────────────────────────────────────
// EARLY ADOPTER URGENCY STRIP
// Dark background — creates separation and builds FOMO
// ─────────────────────────────────────────────────────────────

function EarlyAdopterStrip({ locale }: { locale: Locale }) {
  return (
    <section
      aria-label="Early access"
      style={{
        background: '#0F172A',
        backgroundImage: [
          `radial-gradient(at 20% 50%, ${ACCENT}14 0px, transparent 55%)`,
          'radial-gradient(at 80% 50%, rgba(37,99,235,0.06) 0px, transparent 50%)',
        ].join(','),
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className="container-aventia">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Copy */}
          <div className="text-center lg:text-left max-w-[560px]">
            {/* Urgency chip */}
            <span
              className="inline-flex items-center gap-1.5 font-sans font-semibold mb-4"
              style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '5px 14px',
                borderRadius: '100px',
                background: `${ACCENT}18`,
                border: `1px solid ${ACCENT}30`,
                color: '#F87171',
              }}
            >
              {/* Pulsing red dot */}
              <motion.span
                className="block rounded-full"
                style={{ width: '6px', height: '6px', background: '#F87171', flexShrink: 0 }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                aria-hidden="true"
              />
              {locale === 'es' ? 'Lanzamiento Q3 2026' : 'Launching Q3 2026'}
            </span>

            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '12px',
              }}
            >
              {locale === 'es' ? 'Sé el Primero en Volar.' : 'Be First to Fly.'}
            </h2>
            <p
              className="font-sans"
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.60)',
                lineHeight: '1.65',
              }}
            >
              {locale === 'es'
                ? 'Los primeros 50 clientes en la lista de espera reciben acceso prioritario y 20% de descuento en su primer vuelo cuando lancemos en septiembre de 2026.'
                : 'The first 50 clients on our waitlist get priority scheduling and 20% off their first flight mission when we launch in September 2026.'}
            </p>
          </div>

          {/* CTA button */}
          <a
            href="#waitlist"
            className="btn shrink-0"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, #F87171)`,
              boxShadow: `0 6px 24px ${ACCENT}40`,
              color: '#FFFFFF',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              fontSize: '16px',
              padding: '16px 36px',
            }}
          >
            {locale === 'es' ? 'Reservar mi Lugar' : 'Reserve My Spot'}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// PAGE DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────

export default function DronesPage() {
  const { locale } = useLocale()

  return (
    <>
      <ComingSoon
        name="Aventia Drones"
        color={ACCENT}
        icon={<DroneIcon size={34} />}
        tagline="The Sky Is the New Ground Floor."
        taglineEs="El Cielo Es el Nuevo Piso Principal."
        description="Professional aerial imaging, infrastructure inspection, agricultural surveys, and event coverage — launching across Texas this summer. Get on the waitlist for priority access."
        descriptionEs="Imágenes aéreas profesionales, inspección de infraestructura, levantamientos agrícolas y cobertura de eventos — llegando a Texas este verano. Únete a la lista para acceso prioritario."
        launchDate={LAUNCH_DATE}
        divisionId="drones"
        id="waitlist"
      />

      <UseCasesSection locale={locale} />

      <EarlyAdopterStrip locale={locale} />
    </>
  )
}
