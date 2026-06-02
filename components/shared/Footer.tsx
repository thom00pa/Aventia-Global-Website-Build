// components/shared/Footer.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { LucideProps } from 'lucide-react'
import {
  Zap,
  Wifi,
  ShoppingBag,
  Brain,
  Navigation,
  MapPin,
  ArrowUpRight,
  Heart,
} from 'lucide-react'
import AventiaLogo from '@/components/shared/AventiaLogo'
import { useLocale } from '@/hooks/use-locale'
import { DIVISIONS } from '@/lib/constants'

// lucide-react v1 removed brand icons — stroke-matched local equivalents
function Linkedin(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function Twitter(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function Instagram(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function Facebook(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const DIVISION_ICONS: Record<string, React.ElementType> = {
  energy:  Zap,
  connect: Wifi,
  store:   ShoppingBag,
  ai:      Brain,
  drones:  Navigation,
}

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/aventiaglobal',
    Icon: Linkedin,
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com/aventiaglobal',
    Icon: Twitter,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/aventiaglobal',
    Icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/aventiaglobal',
    Icon: Facebook,
  },
]

interface FooterLinkItem {
  labelEn: string
  labelEs: string
  href: string
  external?: boolean
}

interface FooterColumn {
  headingEn: string
  headingEs: string
  links: FooterLinkItem[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    headingEn: 'Company',
    headingEs: 'Empresa',
    links: [
      { labelEn: 'About Us',   labelEs: 'Sobre Nosotros', href: '/#about'   },
      { labelEn: 'Careers',    labelEs: 'Carreras',        href: '/careers'  },
      { labelEn: 'Press',      labelEs: 'Prensa',          href: '/press'    },
      { labelEn: 'Blog',       labelEs: 'Blog',            href: '/blog'     },
    ],
  },
  {
    headingEn: 'Support',
    headingEs: 'Soporte',
    links: [
      { labelEn: 'Contact Us',   labelEs: 'Contáctanos',            href: '/#contact'                         },
      { labelEn: 'FAQ',          labelEs: 'Preguntas Frecuentes',   href: '/faq'                              },
      { labelEn: 'WhatsApp',     labelEs: 'WhatsApp',               href: 'https://wa.me/12145550000', external: true },
      { labelEn: 'Energy Plans', labelEs: 'Planes de Energía',      href: 'https://energy.aventiaglobal.com', external: true },
    ],
  },
  {
    headingEn: 'Legal',
    headingEs: 'Legal',
    links: [
      { labelEn: 'Privacy Policy',   labelEs: 'Política de Privacidad', href: 'https://aventiaglobal.com/privacy', external: true },
      { labelEn: 'Terms of Service', labelEs: 'Términos de Servicio',   href: 'https://aventiaglobal.com/terms', external: true },
      { labelEn: 'Cookie Policy',    labelEs: 'Política de Cookies',    href: '/cookies'      },
      { labelEn: 'Disclosures',      labelEs: 'Divulgaciones',          href: '/disclosures'  },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const, delay },
  }),
}

// ─────────────────────────────────────────────────────────────
// FOOTER COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Footer() {
  const { locale } = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      aria-label="Site footer"
      style={{
        backgroundColor: '#0F172A',
        backgroundImage:
          'radial-gradient(at 10% 80%, rgba(37,99,235,0.10) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(8,145,178,0.07) 0px, transparent 50%)',
      }}
    >
      {/* ── Top accent gradient line ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.8) 30%, rgba(8,145,178,0.8) 70%, transparent 100%)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        className="container-aventia"
        style={{
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: '48px',
        }}
      >

        {/* ── Brand row ──────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
          style={{
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '48px',
          }}
        >
          {/* Logo + description */}
          <div style={{ maxWidth: '320px' }}>
            <AventiaLogo size="md" variant="white" href="/" />

            <p
              className="font-sans text-[15px] leading-relaxed mt-4"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {locale === 'es'
                ? 'Empresa tecnológica de Texas que ofrece energía, internet, hardware, servicios de IA e innovación aérea bajo una sola marca.'
                : 'A Texas technology company delivering energy, internet, hardware, AI services, and aerial innovation under one trusted brand.'}
            </p>

            {/* Texas badge */}
            <div
              className="inline-flex items-center gap-1.5 mt-5"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                padding: '5px 12px',
              }}
            >
              <MapPin size={12} style={{ color: 'rgba(255,255,255,0.45)' }} />
              <span
                className="font-sans text-[12px] font-medium"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                Houston, Texas, USA
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all duration-200 hover:scale-110"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(37,99,235,0.2)'
                  el.style.borderColor = 'rgba(37,99,235,0.5)'
                  el.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.05)'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                <Icon size={16} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Link grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
          style={{ marginBottom: '56px' }}
        >

          {/* Divisions column — first, gets extra visual treatment */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.05}
          >
            <h3
              className="font-display font-semibold text-[13px] tracking-[0.1em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {locale === 'es' ? 'Divisiones' : 'Divisions'}
            </h3>
            <ul className="space-y-2.5">
              {DIVISIONS.map((division) => {
                const Icon = DIVISION_ICONS[division.id]
                return (
                  <li key={division.id}>
                    <Link
                      href={division.url}
                      className="group flex items-center gap-2.5 transition-all duration-200"
                      style={{ textDecoration: 'none' }}
                    >
                      {/* Colored icon dot */}
                      <span
                        className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          background: `${division.color}22`,
                          color: division.color,
                        }}
                      >
                        {Icon && <Icon size={11} strokeWidth={2.2} />}
                      </span>

                      <span
                        className="font-sans text-[14px] font-medium transition-colors duration-200 group-hover:text-white flex items-center gap-1.5"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {division.name}
                        {division.status === 'live' && (
                          <span
                            className="font-sans text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(5,150,105,0.2)',
                              color: '#34d399',
                              border: '1px solid rgba(5,150,105,0.3)',
                            }}
                          >
                            {locale === 'es' ? 'Activo' : 'Live'}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Company, Support, Legal columns */}
          {FOOTER_COLUMNS.map((col, colIndex) => (
            <motion.div
              key={col.headingEn}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={(colIndex + 1) * 0.08}
            >
              <h3
                className="font-display font-semibold text-[13px] tracking-[0.1em] uppercase mb-5"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {locale === 'es' ? col.headingEs : col.headingEn}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-1 font-sans text-[14px] transition-colors duration-200 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
                    >
                      {locale === 'es' ? link.labelEs : link.labelEn}
                      {link.external && (
                        <ArrowUpRight
                          size={12}
                          strokeWidth={2}
                          className="opacity-0 -translate-y-0.5 group-hover:opacity-70 transition-all duration-150"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          custom={0.3}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Copyright */}
          <p
            className="font-sans text-[13px]"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            {locale === 'es'
              ? `© ${currentYear} Aventia Global LLC. Todos los derechos reservados.`
              : `© ${currentYear} Aventia Global LLC. All rights reserved.`}
          </p>

          {/* Right side — tagline */}
          <p
            className="font-sans text-[13px] flex items-center gap-1.5"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            {locale === 'es'
              ? 'Construyendo Texas con'
              : 'Built in Texas with'}
            <Heart
              size={12}
              strokeWidth={0}
              fill="rgba(220,38,38,0.7)"
              aria-label="love"
            />
            {locale === 'es'
              ? 'para el mundo'
              : 'for the world'}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
