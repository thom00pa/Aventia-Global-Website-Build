// components/sections/energy/EnergyHero.tsx
// PLACEHOLDER — Full implementation in Prompt 21.
import { SectionHeading } from '@/components/shared'

export default function EnergyHero() {
  return (
    <div
      className="-mt-[72px] pt-[72px] flex items-center justify-center"
      style={{
        minHeight:       '100vh',
        backgroundColor: '#FFF7ED',
        backgroundImage: [
          'radial-gradient(at 30% 20%, rgba(217,119,6,0.15) 0px, transparent 50%)',
          'radial-gradient(at 80% 80%, rgba(245,158,11,0.08) 0px, transparent 50%)',
        ].join(','),
      }}
    >
      <div className="container-aventia text-center py-20">
        <SectionHeading
          label="Aventia Energy"
          headline="Power Your Home for Less."
          headlineEs="Ahorra en tu Factura de Electricidad."
          subheadline="Compare Texas electricity rates and switch in minutes. No paperwork, no hidden fees."
          subheadlineEs="Compara tarifas de electricidad en Texas y cambia en minutos. Sin papeles, sin cargos ocultos."
          align="center"
          locale="en"
        />
        <p
          className="font-mono text-xs mt-10"
          style={{ color: 'var(--text-muted)', opacity: 0.5 }}
        >
          Placeholder → Full implementation in Prompt 21
        </p>
      </div>
    </div>
  )
}
