// components/sections/energy/CommercialQuote.tsx
// PLACEHOLDER — Full implementation in Prompt 25.
import { SectionWrapper, SectionHeading } from '@/components/shared'

export default function CommercialQuote() {
  return (
    <SectionWrapper bg="white" id="commercial">
      <SectionHeading
        label="For Businesses"
        labelEs="Para Empresas"
        headline="Powering Texas Businesses."
        headlineEs="Energizando Empresas en Texas."
        subheadline="Custom commercial energy rates for small businesses, offices, and retail locations across Texas."
        subheadlineEs="Tarifas de energía comercial personalizadas para pequeñas empresas, oficinas y tiendas en Texas."
        align="center"
        locale="en"
        className="mb-10"
      />
      <div
        className="mx-auto rounded-2xl p-10 text-center max-w-[640px]"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Commercial quote form → Prompt 25
        </p>
      </div>
    </SectionWrapper>
  )
}
