// components/sections/energy/EnrollmentForm.tsx
// PLACEHOLDER — Full implementation in Prompt 24.
import { SectionWrapper, SectionHeading } from '@/components/shared'

export default function EnrollmentForm() {
  return (
    <SectionWrapper bg="blue-tint" id="enroll">
      <SectionHeading
        label="Get Started"
        labelEs="Comenzar"
        headline="Switch in Minutes."
        headlineEs="Cambia en Minutos."
        subheadline="Fill out our quick enrollment form and we'll handle the rest. Available in English and Spanish."
        subheadlineEs="Llena nuestro formulario de inscripción rápido y nosotros nos encargamos del resto."
        align="center"
        locale="en"
        className="mb-10"
      />
      <div
        className="mx-auto rounded-2xl p-10 text-center max-w-[560px]"
        style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Enrollment form (EN + ES) → Prompt 24
        </p>
      </div>
    </SectionWrapper>
  )
}
