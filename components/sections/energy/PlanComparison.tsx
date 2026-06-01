// components/sections/energy/PlanComparison.tsx
// PLACEHOLDER — Full implementation in Prompt 23.
import { SectionWrapper, SectionHeading } from '@/components/shared'

export default function PlanComparison() {
  return (
    <SectionWrapper bg="white" id="plans">
      <SectionHeading
        label="Our Plans"
        labelEs="Nuestros Planes"
        headline="Three Plans. One Clear Choice."
        headlineEs="Tres Planes. Una Elección Clara."
        subheadline="Compare our fixed and variable rate plans. No surprises, no fine print."
        subheadlineEs="Compara nuestros planes de tasa fija y variable. Sin sorpresas, sin letra pequeña."
        align="center"
        locale="en"
        className="mb-10"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Starter', 'Standard', 'Premium'].map((plan) => (
          <div
            key={plan}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
          >
            <p className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
              {plan}
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
              Plan cards → Prompt 23
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
