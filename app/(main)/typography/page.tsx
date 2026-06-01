// app/(main)/typography/page.tsx
// DEV-ONLY: Visual typography and design token reference.
// Accessible at /typography during development. Delete before launch.

export default function TypographyPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 px-8 py-4 border-b"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full"
              style={{ background: 'var(--accent-gradient)' }}
            />
            <span
              className="font-display font-bold text-lg tracking-[0.15em] uppercase"
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AVENTIA
            </span>
          </div>
          <span className="font-sans text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            Typography & Design Tokens — Dev Reference
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-16 space-y-24">

        {/* ── SECTION 1: Font Families ─────────────────────────── */}
        <section>
          <div className="mb-10">
            <span className="section-label">01</span>
            <h2
              className="font-display font-bold mt-4"
              style={{ fontSize: '32px', color: 'var(--text-primary)' }}
            >
              Font Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Exo 2 */}
            <div className="card">
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Exo 2 — Display
              </p>
              <p className="font-display font-normal text-2xl mb-1"
                style={{ color: 'var(--text-primary)' }}>Regular 400</p>
              <p className="font-display font-semibold text-2xl mb-1"
                style={{ color: 'var(--text-primary)' }}>SemiBold 600</p>
              <p className="font-display font-bold text-2xl mb-1"
                style={{ color: 'var(--text-primary)' }}>Bold 700</p>
              <p className="font-display font-extrabold text-2xl"
                style={{ color: 'var(--text-primary)' }}>ExtraBold 800</p>
              <p className="font-sans text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                Headlines, hero text, section titles
              </p>
            </div>

            {/* DM Sans */}
            <div className="card">
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                DM Sans — Body
              </p>
              <p className="font-sans font-normal text-xl mb-1"
                style={{ color: 'var(--text-primary)' }}>Regular 400</p>
              <p className="font-sans font-medium text-xl mb-1"
                style={{ color: 'var(--text-primary)' }}>Medium 500</p>
              <p className="font-sans font-semibold text-xl"
                style={{ color: 'var(--text-primary)' }}>SemiBold 600</p>
              <p className="font-sans text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                Body copy, UI labels, navigation, buttons
              </p>
            </div>

            {/* JetBrains Mono */}
            <div className="card">
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                JetBrains Mono — Stats
              </p>
              <p className="font-mono font-normal text-xl mb-1"
                style={{ color: 'var(--text-primary)' }}>Regular 400</p>
              <p className="font-mono font-medium text-xl"
                style={{ color: 'var(--text-primary)' }}>Medium 500</p>
              <div className="mt-4 flex gap-4">
                <span className="font-mono font-medium text-2xl"
                  style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  48.2k
                </span>
                <span className="font-mono font-medium text-2xl"
                  style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  $2.4M
                </span>
              </div>
              <p className="font-sans text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                Stats, numbers, code snippets
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Type Scale ────────────────────────────── */}
        <section>
          <div className="mb-10">
            <span className="section-label">02</span>
            <h2 className="font-display font-bold mt-4"
              style={{ fontSize: '32px', color: 'var(--text-primary)' }}>
              Type Scale
            </h2>
          </div>

          <div className="space-y-10 p-10 rounded-2xl"
            style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>

            {/* Hero */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Hero Headline — Exo 2 ExtraBold / 72px / -0.02em tracking
              </p>
              <h1 className="hero-headline" style={{ color: 'var(--text-primary)' }}>
                Power Your Future
              </h1>
            </div>

            {/* Hero Gradient */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Hero Headline — Gradient Variant
              </p>
              <h1 className="hero-headline text-gradient">
                One Company. Five Divisions.
              </h1>
            </div>

            {/* Section Headline */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Section Headline — Exo 2 Bold / 48px
              </p>
              <h2 className="section-headline" style={{ color: 'var(--text-primary)' }}>
                Five Divisions. One Vision.
              </h2>
            </div>

            {/* Card Title */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Card Title — Exo 2 SemiBold / 24px
              </p>
              <h3 style={{ color: 'var(--text-primary)' }}>
                Aventia Energy — Texas Power
              </h3>
            </div>

            {/* Body Large */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Body Large — DM Sans Regular / 18px / 1.7 line-height
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                Aventia Global is a multi-division technology company based in Texas.
                We deliver energy savings, fast internet, premium tech hardware, AI data services,
                and aerial drone innovation — all under one trusted brand.
              </p>
            </div>

            {/* Body Default */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Body Default — DM Sans Regular / 16px / 1.6 line-height
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Switch to a better electricity plan in minutes. Compare Texas energy rates,
                see your estimated monthly savings, and enroll online or over the phone
                in English or Spanish. No hidden fees. No long hold times.
              </p>
            </div>

            {/* Label / Caption */}
            <div className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>
                Label / Caption — DM Sans Medium / 14px
              </p>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>
                Starting from $0.099/kWh · No cancellation fees · Texas PUC licensed
              </p>
            </div>

            {/* Stat Numbers */}
            <div>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-6"
                style={{ color: 'var(--text-muted)' }}>
                Stat Numbers — JetBrains Mono Medium / 48px
              </p>
              <div className="flex flex-wrap gap-12">
                {[
                  { value: '48.2k', label: 'Customers Served' },
                  { value: '$2.4M', label: 'Total Savings' },
                  { value: '99.9%', label: 'Uptime SLA' },
                  { value: '5', label: 'Divisions' },
                ].map((stat) => (
                  <div key={stat.value}>
                    <div className="stat-number">{stat.value}</div>
                    <p className="font-sans text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Brand Colors ──────────────────────────── */}
        <section>
          <div className="mb-10">
            <span className="section-label">03</span>
            <h2 className="font-display font-bold mt-4"
              style={{ fontSize: '32px', color: 'var(--text-primary)' }}>
              Brand Colors
            </h2>
          </div>

          <div className="space-y-8">

            {/* Core Palette */}
            <div>
              <p className="font-sans text-sm font-semibold mb-4"
                style={{ color: 'var(--text-secondary)' }}>Core Palette</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { name: 'Accent Blue', hex: '#2563EB', var: '--accent-blue', dark: true },
                  { name: 'Accent Cyan', hex: '#0891B2', var: '--accent-cyan', dark: true },
                  { name: 'Text Primary', hex: '#0F172A', var: '--text-primary', dark: true },
                  { name: 'Text Secondary', hex: '#334155', var: '--text-secondary', dark: true },
                  { name: 'Text Muted', hex: '#64748B', var: '--text-muted', dark: false },
                  { name: 'BG Primary', hex: '#F8FAFC', var: '--bg-primary', dark: false },
                  { name: 'BG Blue Tint', hex: '#EFF6FF', var: '--bg-blue-tint', dark: false },
                  { name: 'Border', hex: '#E2E8F0', var: '--border', dark: false },
                ].map((color) => (
                  <div key={color.var} className="space-y-2">
                    <div
                      className="h-16 rounded-lg border"
                      style={{
                        backgroundColor: color.hex,
                        borderColor: 'var(--border)',
                      }}
                    />
                    <p className="font-sans text-xs font-semibold"
                      style={{ color: 'var(--text-primary)' }}>{color.name}</p>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      {color.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Division Colors */}
            <div>
              <p className="font-sans text-sm font-semibold mb-4"
                style={{ color: 'var(--text-secondary)' }}>Division Accents</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: 'Energy', hex: '#D97706', gradient: 'var(--energy-gradient)' },
                  { name: 'Connect', hex: '#0891B2', gradient: 'var(--connect-gradient)' },
                  { name: 'Store', hex: '#7C3AED', gradient: 'var(--store-gradient)' },
                  { name: 'AI', hex: '#059669', gradient: 'var(--ai-gradient)' },
                  { name: 'Drones', hex: '#DC2626', gradient: 'var(--drones-gradient)' },
                ].map((div) => (
                  <div key={div.name} className="space-y-2">
                    <div
                      className="h-16 rounded-lg"
                      style={{ background: div.gradient }}
                    />
                    <p className="font-display font-semibold text-sm"
                      style={{ color: 'var(--text-primary)' }}>
                      Aventia {div.name}
                    </p>
                    <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      {div.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Gradient Text ─────────────────────────── */}
        <section>
          <div className="mb-10">
            <span className="section-label">04</span>
            <h2 className="font-display font-bold mt-4"
              style={{ fontSize: '32px', color: 'var(--text-primary)' }}>
              Gradient Text Variants
            </h2>
          </div>

          <div className="space-y-4 p-10 rounded-2xl"
            style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <h2 className="section-headline text-gradient">Brand Gradient (Blue → Cyan)</h2>
            <h2 className="section-headline text-gradient-energy">Energy Gradient (Amber)</h2>
            <h2 className="section-headline text-gradient-connect">Connect Gradient (Cyan)</h2>
            <h2 className="section-headline text-gradient-store">Store Gradient (Violet)</h2>
            <h2 className="section-headline text-gradient-ai">AI Gradient (Emerald)</h2>
            <h2 className="section-headline text-gradient-drones">Drones Gradient (Red)</h2>
          </div>
        </section>

        {/* ── SECTION 5: Section Labels & Badges ──────────────── */}
        <section>
          <div className="mb-10">
            <span className="section-label">05</span>
            <h2 className="font-display font-bold mt-4"
              style={{ fontSize: '32px', color: 'var(--text-primary)' }}>
              Labels & Badges
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <span className="section-label">Division Overview</span>
            <span className="section-label">Our Services</span>
            <span className="badge badge-live">Live Now</span>
            <span className="badge badge-coming-soon">Coming Soon</span>
            <span className="badge badge-coming-soon">Q3 2026</span>
          </div>
        </section>

        {/* ── SECTION 6: Logo Wordmark ─────────────────────────── */}
        <section>
          <div className="mb-10">
            <span className="section-label">06</span>
            <h2 className="font-display font-bold mt-4"
              style={{ fontSize: '32px', color: 'var(--text-primary)' }}>
              Logo Wordmark
            </h2>
          </div>

          <div className="flex flex-col gap-8 p-10 rounded-2xl"
            style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>

            {/* Default */}
            <div>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-muted)' }}>Default — Light Background</p>
              <span
                className="font-display font-extrabold text-4xl tracking-[0.15em] uppercase"
                style={{
                  background: 'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AVENTIA
              </span>
            </div>

            {/* With Division */}
            <div className="flex flex-wrap gap-8">
              {['ENERGY', 'CONNECT', 'STORE', 'AI', 'DRONES'].map((div) => (
                <div key={div}>
                  <span
                    className="font-display font-extrabold text-2xl tracking-[0.15em] uppercase"
                    style={{
                      background: 'var(--accent-gradient)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    AVENTIA{' '}
                  </span>
                  <span
                    className="font-display font-extrabold text-2xl tracking-[0.15em] uppercase"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {div}
                  </span>
                </div>
              ))}
            </div>

            {/* Dark background */}
            <div className="p-8 rounded-xl"
              style={{ background: 'var(--text-primary)' }}>
              <span
                className="font-display font-extrabold text-4xl tracking-[0.15em] uppercase"
                style={{
                  background: 'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AVENTIA
              </span>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div
          className="text-center py-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
            Aventia Global Design System — Dev Reference Page
            <span className="mx-2">·</span>
            Delete this page before production launch
            <span className="mx-2">·</span>
            <a href="/" style={{ color: 'var(--accent-blue)' }}>← Back to Homepage</a>
          </p>
        </div>

      </div>
    </div>
  )
}
