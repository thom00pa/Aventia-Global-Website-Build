'use client'

// No metadata export — it lives in layout.tsx

import { Gamepad2, Home, Wifi, Headphones, Plug, Monitor, ArrowRight, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import ComingSoon from '@/components/shared/ComingSoon'
import { useLocale } from '@/hooks/use-locale'

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ACCENT = '#7C3AED' // Aventia Store violet

const LAUNCH_DATE = new Date('2027-01-01T00:00:00')

// ─────────────────────────────────────────────────────────────
// PRODUCT CATEGORY DATA
// ─────────────────────────────────────────────────────────────

const PRODUCT_CATEGORIES = [
  {
    Icon: Gamepad2,
    titleEn: 'Gaming Gear',
    titleEs: 'Equipos de Gaming',
    descEn:
      'Mechanical keyboards, precision mice, gaming headsets, controllers, and peripherals from the top brands that serious players trust.',
    descEs:
      'Teclados mecánicos, ratones de precisión, auriculares gaming, controles y periféricos de las marcas que los jugadores serios confían.',
    badgeEn: 'High Demand',
    badgeEs: 'Alta Demanda',
  },
  {
    Icon: Home,
    titleEn: 'Smart Home Devices',
    titleEs: 'Dispositivos para el Hogar',
    descEn:
      'Smart speakers, connected bulbs, thermostats, security cameras, and home automation systems that make life simpler.',
    descEs:
      'Altavoces inteligentes, focos conectados, termostatos, cámaras de seguridad y sistemas de automatización del hogar.',
    badgeEn: 'Trending',
    badgeEs: 'Tendencia',
  },
  {
    Icon: Wifi,
    titleEn: 'Networking Equipment',
    titleEs: 'Equipos de Red',
    descEn:
      'High-performance routers, whole-home mesh WiFi systems, managed switches, and range extenders for fast, stable connections.',
    descEs:
      'Routers de alto rendimiento, sistemas WiFi mesh, switches administrados y extensores de señal para conexiones rápidas y estables.',
    badgeEn: 'Best Sellers',
    badgeEs: 'Más Vendidos',
  },
  {
    Icon: Headphones,
    titleEn: 'Audio & Video',
    titleEs: 'Audio y Video',
    descEn:
      'Wireless earbuds, over-ear headphones, high-quality webcams, studio microphones, and streaming gear for creators and professionals.',
    descEs:
      'Audífonos inalámbricos, auriculares, cámaras web, micrófonos de estudio y equipo de transmisión para creadores y profesionales.',
    badgeEn: 'Popular',
    badgeEs: 'Popular',
  },
  {
    Icon: Plug,
    titleEn: 'Accessories & Cables',
    titleEs: 'Accesorios y Cables',
    descEn:
      'USB-C hubs, docking stations, fast chargers, braided cables, and essential tech accessories to keep your setup running smoothly.',
    descEs:
      'Hubs USB-C, estaciones de acoplamiento, cargadores rápidos, cables trenzados y accesorios de tecnología para tu configuración.',
    badgeEn: 'Essentials',
    badgeEs: 'Esenciales',
  },
  {
    Icon: Monitor,
    titleEn: 'Workspace Essentials',
    titleEs: 'Esenciales de Espacio de Trabajo',
    descEn:
      'Monitor arms, LED desk lamps, ergonomic accessories, laptop stands, and productivity gear to build the perfect work setup.',
    descEs:
      'Brazos para monitores, lámparas LED, accesorios ergonómicos, soportes para laptop y equipo de productividad para tu escritorio ideal.',
    badgeEn: 'Work From Home',
    badgeEs: 'Trabaja Desde Casa',
  },
] as const

// ─────────────────────────────────────────────────────────────
// PRODUCT PREVIEW SECTION
// ─────────────────────────────────────────────────────────────

function ProductPreview() {
  const { locale } = useLocale()

  return (
    <SectionWrapper bg="off-white" id="store-products">
      <SectionHeading
        label="What's In Store"
        labelEs="Lo Que Viene"
        headline="Premium Tech, Curated for You."
        headlineEs="Tecnología Premium, Seleccionada para Ti."
        subheadline="Aventia Store is launching with a hand-picked catalog of tech hardware — gaming, smart home, networking, and workspace gear shipped directly to your door."
        subheadlineEs="Aventia Store llanza con un catálogo seleccionado de hardware tecnológico: gaming, hogar inteligente, redes y equipo de trabajo enviado directamente a tu puerta."
        align="center"
        locale={locale}
        className="mb-12"
      />

      {/* Product category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {PRODUCT_CATEGORIES.map((category, i) => {
          const Icon = category.Icon
          return (
            <motion.div
              key={category.titleEn}
              className="flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{
                y: -5,
                boxShadow: '0 8px 32px rgba(124,58,237,0.12)',
              }}
            >
              {/* Violet top accent bar */}
              <div
                style={{
                  height: '3px',
                  background: `linear-gradient(90deg, ${ACCENT}, #A855F7)`,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />

              <div className="flex flex-col flex-1 p-6">
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: `${ACCENT}12`,
                      color: ACCENT,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  {/* Category badge */}
                  <span
                    className="font-sans font-semibold"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '3px 9px',
                      borderRadius: '100px',
                      background: `${ACCENT}10`,
                      border: `1px solid ${ACCENT}22`,
                      color: ACCENT,
                    }}
                  >
                    {locale === 'es' ? category.badgeEs : category.badgeEn}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold mb-2"
                  style={{ fontSize: '17px', color: 'var(--text-primary)', lineHeight: 1.3 }}
                >
                  {locale === 'es' ? category.titleEs : category.titleEn}
                </h3>

                {/* Description */}
                <p
                  className="font-sans flex-1 mb-5"
                  style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}
                >
                  {locale === 'es' ? category.descEs : category.descEn}
                </p>

                {/* Notify Me button */}
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-1.5 font-sans font-semibold self-start transition-colors hover:opacity-80"
                  style={{
                    fontSize: '13px',
                    color: ACCENT,
                    textDecoration: 'none',
                  }}
                >
                  {locale === 'es' ? 'Notificarme' : 'Notify Me'}
                  <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom CTA strip */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}10, rgba(168,85,247,0.06))`,
          border: `1px solid ${ACCENT}20`,
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p
            className="font-display font-bold"
            style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px' }}
          >
            {locale === 'es' ? '¿Listo para comprar cuando abramos?' : 'Ready to shop when we open?'}
          </p>
          <p className="font-sans" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {locale === 'es'
              ? 'Únete ahora y recibe acceso anticipado, descuentos exclusivos y novedades de lanzamiento.'
              : 'Join now for early access, exclusive launch discounts, and new arrival alerts.'}
          </p>
        </div>
        <a
          href="#waitlist"
          className="btn shrink-0"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #A855F7)`,
            boxShadow: `0 4px 16px ${ACCENT}35`,
            color: '#FFFFFF',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {locale === 'es' ? 'Unirme a la Lista de Espera' : 'Join the Waitlist'}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </motion.div>
    </SectionWrapper>
  )
}

// ─────────────────────────────────────────────────────────────
// PAGE DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────

export default function StorePage() {
  return (
    <>
      <ComingSoon
        name="Aventia Store"
        color={ACCENT}
        icon={<ShoppingBag size={34} strokeWidth={2} aria-hidden="true" />}
        tagline="Premium Tech. Delivered to Your Door."
        taglineEs="Tecnología Premium. Entregada en Tu Puerta."
        description="Gaming gear, smart home devices, networking equipment, and workspace essentials — all in one place, shipped directly to you. Join the waitlist and be the first to shop when we launch."
        descriptionEs="Equipos de gaming, dispositivos para el hogar inteligente, equipo de red y accesorios de trabajo — todo en un solo lugar, enviado directamente a ti. Únete a la lista de espera."
        launchDate={LAUNCH_DATE}
        divisionId="store"
        id="waitlist"
      />

      <ProductPreview />
    </>
  )
}
