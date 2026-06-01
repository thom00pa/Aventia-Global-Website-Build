// app/(main)/logo-test/page.tsx
// DEV-ONLY: AventiaLogo visual test page.
// Accessible at /logo-test — delete before production launch.

import { AventiaLogo } from '@/components/shared'

const divisions = ['energy', 'connect', 'store', 'ai', 'drones'] as const

export default function LogoTestPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 40px',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <AventiaLogo size="md" href="/" />
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.2)',
            color: '#DC2626',
            padding: '4px 12px',
            borderRadius: '100px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Dev Only
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 40px' }}>

        {/* ── SECTION 1: Size Variants ──────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            01 — Size Variants (default variant, no division)
          </p>

          <div style={{
            background: 'var(--white)', borderRadius: '16px',
            border: '1px solid var(--border)', padding: '40px',
            display: 'flex', flexDirection: 'column', gap: '32px',
          }}>
            {(['lg', 'md', 'sm'] as const).map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <AventiaLogo size={s} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  padding: '4px 10px', borderRadius: '6px',
                }}>
                  {`size="${s}" · icon ${s === 'lg' ? '34px' : s === 'md' ? '26px' : '18px'} · text ${s === 'lg' ? '24px' : s === 'md' ? '18px' : '13px'}`}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: Color Variants ─────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            02 — Color Variants (size=&quot;md&quot;)
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>

            {/* Default variant */}
            <div style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              alignItems: 'flex-start',
            }}>
              <AventiaLogo size="md" variant="default" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                variant=&quot;default&quot;<br />Light backgrounds
              </span>
            </div>

            {/* White variant */}
            <div style={{
              background: 'linear-gradient(135deg, #1e40af, #0e7490)', borderRadius: '16px',
              padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              alignItems: 'flex-start',
            }}>
              <AventiaLogo size="md" variant="white" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>
                variant=&quot;white&quot;<br />Dark / colored backgrounds
              </span>
            </div>

            {/* Dark variant */}
            <div style={{
              background: 'var(--bg-blue-tint)', borderRadius: '16px',
              border: '1px solid var(--border-blue)', padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              alignItems: 'flex-start',
            }}>
              <AventiaLogo size="md" variant="dark" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                variant=&quot;dark&quot;<br />Tinted backgrounds
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Division Variants ──────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            03 — Division Variants (size=&quot;md&quot;, variant=&quot;default&quot;)
          </p>

          <div style={{
            background: 'var(--white)', borderRadius: '16px',
            border: '1px solid var(--border)', padding: '40px',
            display: 'flex', flexDirection: 'column', gap: '28px',
          }}>
            {/* No division */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '280px' }}>
                <AventiaLogo size="md" division={null} />
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)',
              }}>
                division=&#123;null&#125; — root brand (homepage, footer)
              </span>
            </div>

            {divisions.map((div) => (
              <div key={div} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '280px' }}>
                  <AventiaLogo size="md" division={div} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {`division="${div}" · accent `}
                  {
                    div === 'energy' ? '#D97706' :
                    div === 'connect' ? '#0891B2' :
                    div === 'store' ? '#7C3AED' :
                    div === 'ai' ? '#059669' : '#DC2626'
                  }
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Division Variants on Dark Backgrounds ── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            04 — Division Variants on Dark Background (variant=&quot;white&quot;)
          </p>

          <div style={{
            background: '#0F172A', borderRadius: '16px',
            padding: '40px',
            display: 'flex', flexDirection: 'column', gap: '28px',
          }}>
            {[null, ...divisions].map((div) => (
              <AventiaLogo
                key={div ?? 'null'}
                size="md"
                variant="white"
                division={div ?? null}
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 5: Icon On / Off ───────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            05 — Icon Visibility
          </p>

          <div style={{
            background: 'var(--white)', borderRadius: '16px',
            border: '1px solid var(--border)', padding: '40px',
            display: 'flex', flexDirection: 'column', gap: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <AventiaLogo size="md" showIcon={true} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                showIcon=&#123;true&#125; — default
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <AventiaLogo size="md" showIcon={false} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                showIcon=&#123;false&#125; — wordmark only
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: As Link ─────────────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            06 — With href (Link wrapper) — hover to confirm cursor:pointer
          </p>

          <div style={{
            background: 'var(--white)', borderRadius: '16px',
            border: '1px solid var(--border)', padding: '40px',
            display: 'flex', flexDirection: 'column', gap: '24px',
          }}>
            <AventiaLogo size="md" href="/" />
            <AventiaLogo size="md" division="energy" href="https://energy.aventiaglobal.com" />
          </div>
        </section>

        {/* ── SECTION 7: Responsive Sizes on Full Width ─────── */}
        <section style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '24px',
          }}>
            07 — All Sizes × All Division Colors
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(['lg', 'md', 'sm'] as const).map((s) =>
              divisions.map((div) => (
                <AventiaLogo key={`${s}-${div}`} size={s} division={div} />
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '32px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)' }}>
            AventiaLogo component dev test — delete before production launch
            &nbsp;·&nbsp;
            <a href="/" style={{ color: 'var(--accent-blue)' }}>← Home</a>
            &nbsp;·&nbsp;
            <a href="/typography" style={{ color: 'var(--accent-blue)' }}>Typography →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
