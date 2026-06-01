// components/sections/energy/BilingualContact.tsx
// PLACEHOLDER — Full implementation in Prompt 26.
import { SectionWrapper } from '@/components/shared'

export default function BilingualContact() {
  return (
    <SectionWrapper bg="dark" id="contact" padding="sm">
      <div className="text-center py-8">
        <h3
          className="font-display font-bold text-2xl"
          style={{ color: '#FFFFFF', marginBottom: '8px' }}
        >
          Questions? We&apos;re here.
        </h3>
        <p className="font-sans" style={{ color: 'rgba(255,255,255,0.55)' }}>
          ¿Preguntas? Estamos aquí.
        </p>
        <p className="font-mono text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Contact strip + WhatsApp → Prompt 26
        </p>
      </div>
    </SectionWrapper>
  )
}
