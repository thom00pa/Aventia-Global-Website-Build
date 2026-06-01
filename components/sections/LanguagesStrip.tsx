// components/sections/LanguagesStrip.tsx
// PLACEHOLDER — Full implementation in Prompt 18.
import { SectionWrapper } from '@/components/shared'

const FEATURES = [
  {
    en: 'Energy plans in English and Spanish',
    es: 'Planes de energía en inglés y español',
  },
  {
    en: 'Bilingual customer support team',
    es: 'Equipo de soporte bilingüe',
  },
  {
    en: 'Spanish-language enrollment forms',
    es: 'Formularios de inscripción en español',
  },
  {
    en: 'WhatsApp support available',
    es: 'Soporte disponible por WhatsApp',
  },
] as const

export default function LanguagesStrip() {
  return (
    <SectionWrapper bg="white" id="languages" padding="sm">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background:   'var(--accent-gradient)',
          padding:      '48px',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left: headline */}
          <div>
            <p
              className="font-sans font-semibold text-[13px] tracking-widest uppercase mb-4"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Serving Texas in Two Languages
            </p>
            <h2
              className="font-display font-bold"
              style={{
                fontSize:     'clamp(28px, 4vw, 42px)',
                lineHeight:   1.15,
                color:        '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              We Speak English.
            </h2>
            <h2
              className="font-display font-bold"
              style={{
                fontSize:   'clamp(28px, 4vw, 42px)',
                lineHeight: 1.15,
                color:      'rgba(255,255,255,0.75)',
              }}
            >
              Hablamos Español.
            </h2>
          </div>

          {/* Right: feature list */}
          <ul className="space-y-3">
            {FEATURES.map((item) => (
              <li
                key={item.en}
                className="flex items-start gap-3"
              >
                <span
                  className="flex items-center justify-center shrink-0 rounded-full mt-0.5"
                  style={{
                    width:      '20px',
                    height:     '20px',
                    background: 'rgba(255,255,255,0.25)',
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <span
                    className="font-sans font-medium text-[15px] block"
                    style={{ color: '#FFFFFF' }}
                  >
                    {item.en}
                  </span>
                  <span
                    className="font-sans text-[14px] block"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {item.es}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}
