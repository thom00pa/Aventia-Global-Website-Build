// components/sections/DivisionsGrid.tsx
// PLACEHOLDER — Full implementation with locale in Prompt 16.
import {
  SectionWrapper,
  SectionHeading,
  SectionItem,
  DivisionCard,
} from '@/components/shared'
import { DIVISIONS } from '@/lib/constants'

export default function DivisionsGrid() {
  return (
    <SectionWrapper bg="white" id="divisions" stagger>
      {/* Section heading */}
      <SectionItem>
        <SectionHeading
          label="What We Do"
          labelEs="Lo Que Hacemos"
          headline="Five Divisions. One Vision."
          headlineEs="Cinco Divisiones. Una Visión."
          subheadline="From household energy bills to enterprise AI data — Aventia Global is building the technology stack Texas deserves."
          subheadlineEs="Desde facturas de energía del hogar hasta datos de IA empresarial — Aventia Global está construyendo la infraestructura tecnológica que Texas merece."
          align="center"
          locale="en"
          className="mb-12"
        />
      </SectionItem>

      {/* Division cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIVISIONS.map((division) => (
          <SectionItem key={division.id}>
            <DivisionCard division={division} locale="en" />
          </SectionItem>
        ))}
      </div>

      {/* Bottom note */}
      <SectionItem>
        <p
          className="font-sans text-center mt-10 text-[14px]"
          style={{ color: 'var(--text-muted)' }}
        >
          All divisions operate under Aventia Global LLC · Texas, USA
        </p>
      </SectionItem>
    </SectionWrapper>
  )
}
