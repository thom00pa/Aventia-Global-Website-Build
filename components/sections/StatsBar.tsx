// components/sections/StatsBar.tsx
// PLACEHOLDER — Full implementation in Prompt 15.
import { SectionWrapper, StatCard } from '@/components/shared'

const STATS = [
  {
    value: '$0.099',
    label: 'Per kWh Starting',
    labelEs: 'Por kWh Inicial',
    sublabel: 'Lowest energy rate',
    sublabelEs: 'Tarifa más baja',
  },
  {
    value: '5',
    label: 'Active Divisions',
    labelEs: 'Divisiones Activas',
    sublabel: 'And growing',
    sublabelEs: 'Y creciendo',
  },
  {
    value: '2',
    label: 'Languages',
    labelEs: 'Idiomas',
    sublabel: 'English + Spanish',
    sublabelEs: 'Inglés + Español',
  },
  {
    value: '24/7',
    label: 'Customer Support',
    labelEs: 'Soporte al Cliente',
    sublabel: 'Always available',
    sublabelEs: 'Siempre disponible',
  },
] as const

export default function StatsBar() {
  return (
    <SectionWrapper bg="off-white" padding="sm" id="stats">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <StatCard
            key={stat.value}
            value={stat.value}
            label={stat.label}
            labelEs={stat.labelEs}
            sublabel={stat.sublabel}
            sublabelEs={stat.sublabelEs}
            locale="en"
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
