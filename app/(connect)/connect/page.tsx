'use client'

/*
  STRUCTURE:
  ┌─────────────────────────────────────────────────────┐
  │  <ComingSoon>                                       │
  │   • Cyan #0891B2 accent                             │
  │   • "Aventia Connect" headline                      │
  │   • Countdown to January 1 2027                     │
  │   • Waitlist form → /api/waitlist                   │
  └─────────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────────┐
  │  <ServicesPreview>  (defined inline below)          │
  │   • bg: var(--bg-primary)                           │
  │   • Section label + headline                        │
  │   • 6 service cards in a 2-col or 3-col grid        │
  └─────────────────────────────────────────────────────┘
*/

import { Wifi, Home, Building2, Users, Activity, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import { useLocale } from '@/hooks/use-locale'
import ComingSoon from '@/components/shared/ComingSoon'

const CONNECT_SERVICES = [
  {
    iconName: 'Wifi',
    titleEn:  'Managed Business WiFi',
    titleEs:  'WiFi Empresarial Administrado',
    descEn:   'Complete WiFi management including hardware provisioning, configuration, monitoring, and bilingual support — so you focus on your business, not your network.',
    descEs:   'Gestión completa del WiFi: hardware, configuración, monitoreo y soporte bilingüe. Tú te enfocas en tu negocio.',
  },
  {
    iconName: 'Home',
    titleEn:  'Personal Internet Plans',
    titleEs:  'Planes de Internet Personal',
    descEn:   'Reliable residential internet plans for individuals and families across Texas, with transparent pricing and no surprise fees.',
    descEs:   'Planes de internet residencial confiables para individuos y familias en Texas, con precios transparentes y sin cargos sorpresa.',
  },
  {
    iconName: 'Building2',
    titleEn:  'Multi-Location Networks',
    titleEs:  'Redes Multi-Ubicación',
    descEn:   'Centralized network management for businesses with multiple locations — restaurants, retail chains, and offices managed from one dashboard.',
    descEs:   'Gestión centralizada de red para negocios con múltiples ubicaciones: restaurantes, cadenas y oficinas desde un solo panel.',
  },
  {
    iconName: 'Users',
    titleEn:  'Guest Network Solutions',
    titleEs:  'Soluciones de Red para Invitados',
    descEn:   'Secure, branded guest WiFi networks that keep your business traffic separate from your customers\' connections — with usage controls.',
    descEs:   'Redes WiFi seguras para invitados que mantienen el tráfico de tu negocio separado del de tus clientes, con controles de uso.',
  },
  {
    iconName: 'Activity',
    titleEn:  '24/7 Network Monitoring',
    titleEs:  'Monitoreo 24/7 de Red',
    descEn:   'Always-on monitoring with instant alerts, proactive issue resolution, and bilingual technical support available around the clock.',
    descEs:   'Monitoreo continuo con alertas instantáneas, resolución proactiva de problemas y soporte técnico bilingüe disponible todo el día.',
  },
  {
    iconName: 'Zap',
    titleEn:  'Fiber Optic Solutions',
    titleEs:  'Soluciones de Fibra Óptica',
    descEn:   'Ultra-fast fiber connectivity where available in Texas, with symmetrical upload and download speeds for modern business demands.',
    descEs:   'Conectividad de fibra ultrarrápida disponible en Texas, con velocidades simétricas de subida y bajada para las exigencias empresariales actuales.',
  },
] as const

const ICON_MAP = { Wifi, Home, Building2, Users, Activity, Zap } as const
type IconName = keyof typeof ICON_MAP

const ACCENT = '#0891B2'

function ServicesPreview() {
  const { locale } = useLocale()

  return (
    <SectionWrapper bg="off-white" id="connect-services">
      <SectionHeading
        label="What's Coming"
        labelEs="Lo Que Viene"
        headline="Internet Solutions Built for Texas."
        headlineEs="Soluciones de Internet para Texas."
        subheadline="Aventia Connect is bringing business-grade internet and managed WiFi to Texas businesses and homes. Here's what's in store."
        subheadlineEs="Aventia Connect lleva internet empresarial y WiFi administrado a empresas y hogares de Texas. Esto es lo que viene."
        align="center"
        locale={locale}
        className="mb-12"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONNECT_SERVICES.map((service, i) => {
          const Icon = ICON_MAP[service.iconName as IconName]
          return (
            <motion.div
              key={service.titleEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: 'var(--white)',
                border:     '1px solid var(--border)',
                boxShadow:  'var(--shadow-card)',
              }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(8,145,178,0.10)' }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-4"
                style={{
                  width:      '44px',
                  height:     '44px',
                  background: `${ACCENT}12`,
                  color:      ACCENT,
                  flexShrink: 0,
                }}
              >
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <span
                className="font-sans font-semibold inline-block mb-3"
                style={{
                  fontSize:      '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding:       '3px 10px',
                  borderRadius:  '100px',
                  background:    `${ACCENT}10`,
                  border:        `1px solid ${ACCENT}25`,
                  color:         ACCENT,
                  width:         'fit-content',
                }}
              >
                {locale === 'es' ? 'Próximamente' : 'Coming Soon'}
              </span>

              <h3
                className="font-display font-bold mb-2"
                style={{ fontSize: '17px', color: 'var(--text-primary)', lineHeight: 1.3 }}
              >
                {locale === 'es' ? service.titleEs : service.titleEn}
              </h3>

              <p
                className="font-sans"
                style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}
              >
                {locale === 'es' ? service.descEs : service.descEn}
              </p>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center mt-12">
        <a
          href="#waitlist"
          className="btn"
          style={{
            background:     ACCENT,
            boxShadow:      `0 4px 16px ${ACCENT}35`,
            color:          '#FFFFFF',
            textDecoration: 'none',
          }}
        >
          {locale === 'es'
            ? 'Unirme a la Lista de Espera'
            : 'Join the Waitlist'}
        </a>
      </div>
    </SectionWrapper>
  )
}

export default function ConnectPage() {
  const { locale } = useLocale()

  return (
    <>
      <ComingSoon
        id="waitlist"
        name="Aventia Connect"
        nameEs="Aventia Connect"
        color={ACCENT}
        icon={<Wifi size={36} strokeWidth={1.8} aria-hidden="true" />}
        tagline="Managed WiFi. Everywhere You Work."
        taglineEs="WiFi Administrado. Donde Trabajes."
        description="Business-grade internet and managed WiFi solutions are coming to Texas. Join the waitlist and be the first to know when we launch in your area."
        descriptionEs="Soluciones de internet empresarial y WiFi administrado llegan a Texas. Únete a la lista de espera y sé el primero en saber cuándo llegamos a tu área."
        launchDate={new Date('2027-01-01T00:00:00')}
        divisionId="connect"
        locale={locale}
      />

      <ServicesPreview />
    </>
  )
}
