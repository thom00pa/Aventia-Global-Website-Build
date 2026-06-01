// components/sections/energy/SavingsCalculator.tsx
// PLACEHOLDER — Full implementation in Prompt 22.
import { SectionWrapper, SectionHeading } from '@/components/shared'

export default function SavingsCalculator() {
  return (
    <SectionWrapper bg="off-white" id="calculator">
      <SectionHeading
        label="Savings Calculator"
        labelEs="Calculadora de Ahorro"
        headline="See How Much You Could Save."
        headlineEs="Descubre Cuánto Podrías Ahorrar."
        subheadline="Enter your average monthly kWh usage and see your estimated savings with Aventia Energy."
        subheadlineEs="Ingresa tu consumo mensual promedio en kWh y descubre tu ahorro estimado con Aventia Energy."
        align="center"
        locale="en"
        className="mb-10"
      />
      <div
        className="mx-auto rounded-2xl p-10 text-center max-w-[600px]"
        style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Interactive slider → Prompt 22
        </p>
      </div>
    </SectionWrapper>
  )
}
