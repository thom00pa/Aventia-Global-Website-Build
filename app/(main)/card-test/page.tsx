// app/(main)/card-test/page.tsx
// DEV-ONLY: Card component visual test. Delete before production launch.

import {
  Card,
  DivisionCard,
  FeatureCard,
  StatCard,
} from '@/components/shared'
import { DIVISIONS } from '@/lib/constants'
import {
  Zap, Shield, Globe, Cpu, BarChart3,
  Clock, Lock, Headphones, TrendingUp,
} from 'lucide-react'

export default function CardTestPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 40px',
        marginBottom: '60px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
            Card Components
          </h1>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'rgba(220,38,38,0.08)', color: '#DC2626',
            border: '1px solid rgba(220,38,38,0.2)',
            padding: '4px 12px', borderRadius: '100px',
          }}>Dev Only</span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

        {/* SECTION 1: Base Card */}
        <section style={{ marginBottom: '64px' }}>
          <p className="section-label mb-6">01 — Base Card</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Default hover card */}
            <Card>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                Default Card
              </h3>
              <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                White background, border, shadow. Lifts 4px on hover with blue border.
              </p>
            </Card>

            {/* No hover */}
            <Card hover={false}>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                No Hover
              </h3>
              <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                hover=false. Static card for non-interactive layouts.
              </p>
            </Card>

            {/* Small padding */}
            <Card padding="sm">
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                Small Padding
              </h3>
              <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                padding=&quot;sm&quot; — 20px internal. Compact card variant.
              </p>
            </Card>

            {/* Large padding */}
            <Card padding="lg">
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                Large Padding
              </h3>
              <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                padding=&quot;lg&quot; — 40px internal. Used for feature callouts.
              </p>
            </Card>

            {/* No padding */}
            <Card padding="none" className="overflow-hidden">
              <div style={{ height: '80px', background: 'var(--accent-gradient)' }} />
              <div style={{ padding: '20px' }}>
                <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                  padding=&quot;none&quot; — full-bleed image or custom layout inside.
                </p>
              </div>
            </Card>

            {/* On blue-tint background */}
            <div style={{ background: 'var(--bg-blue-tint)', borderRadius: '16px', padding: '24px' }}>
              <Card>
                <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Card on blue-tint section background. White card pops nicely.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 2: Division Cards */}
        <section style={{ marginBottom: '64px' }}>
          <p className="section-label mb-6">02 — Division Cards (English)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISIONS.map((division) => (
              <DivisionCard key={division.id} division={division} locale="en" />
            ))}
          </div>
        </section>

        {/* Division Cards - Spanish */}
        <section style={{ marginBottom: '64px' }}>
          <p className="section-label mb-6">02b — Division Cards (Spanish)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISIONS.map((division) => (
              <DivisionCard key={division.id} division={division} locale="es" />
            ))}
          </div>
        </section>

        {/* SECTION 3: Feature Cards */}
        <section style={{ marginBottom: '64px' }}>
          <p className="section-label mb-6">03 — Feature Cards</p>

          {/* Default blue accent */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FeatureCard
              icon={<Zap size={22} strokeWidth={2} />}
              title="Instant Savings"
              titleEs="Ahorro Instantáneo"
              description="Compare Texas energy plans and switch in minutes. No paperwork, no phone calls required."
              descriptionEs="Compara planes de energía en Texas y cambia en minutos. Sin papeles, sin llamadas."
              locale="en"
            />
            <FeatureCard
              icon={<Shield size={22} strokeWidth={2} />}
              title="No Hidden Fees"
              titleEs="Sin Cargos Ocultos"
              description="Transparent pricing on every plan. What you see is exactly what you pay, every month."
              descriptionEs="Precios transparentes en cada plan. Lo que ves es exactamente lo que pagas."
              locale="en"
            />
            <FeatureCard
              icon={<Headphones size={22} strokeWidth={2} />}
              title="Bilingual Support"
              titleEs="Soporte Bilingüe"
              description="Our team speaks English and Spanish. Get help your way, in your language."
              descriptionEs="Nuestro equipo habla inglés y español. Obtén ayuda a tu manera."
              locale="en"
              href="/#contact"
            />
          </div>

          {/* Division accent colors */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Globe size={20} strokeWidth={2} />}
              title="Global Network"
              description="Connected to providers worldwide."
              accentColor="#0891B2"
              locale="en"
            />
            <FeatureCard
              icon={<Cpu size={20} strokeWidth={2} />}
              title="AI-Powered"
              description="Smart data annotation at scale."
              accentColor="#059669"
              locale="en"
            />
            <FeatureCard
              icon={<BarChart3 size={20} strokeWidth={2} />}
              title="Real-Time Data"
              description="Analytics and insights dashboard."
              accentColor="#7C3AED"
              locale="en"
            />
            <FeatureCard
              icon={<Clock size={20} strokeWidth={2} />}
              title="48hr Turnaround"
              description="Fast delivery on every project."
              accentColor="#DC2626"
              locale="en"
            />
          </div>
        </section>

        {/* SECTION 4: Stat Cards */}
        <section style={{ marginBottom: '64px' }}>
          <p className="section-label mb-6">04 — Stat Cards</p>

          {/* On white background */}
          <div style={{ background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px', marginBottom: '24px' }}>
            <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
              Default (brand gradient) on white
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                value="48.2k"
                label="Customers Served"
                labelEs="Clientes Atendidos"
                sublabel="Across Texas"
                sublabelEs="En Texas"
                locale="en"
              />
              <StatCard
                value="$2.4M"
                label="Total Savings"
                labelEs="Ahorro Total"
                sublabel="Generated this year"
                sublabelEs="Generado este año"
                locale="en"
              />
              <StatCard
                value="99.9%"
                label="Uptime SLA"
                sublabel="Connect division"
                locale="en"
              />
              <StatCard
                value="5"
                label="Active Divisions"
                labelEs="Divisiones Activas"
                locale="en"
              />
            </div>
          </div>

          {/* On blue-tint background */}
          <div style={{ background: 'var(--bg-blue-tint)', borderRadius: '16px', border: '1px solid var(--border-blue)', padding: '32px', marginBottom: '24px' }}>
            <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
              On blue-tint section background
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard value="0.099¢" label="Per kWh" sublabel="Lowest plan" locale="en" />
              <StatCard value="3yr" label="Contract Options" sublabel="Flexible terms" locale="en" />
              <StatCard value="24/7" label="Customer Support" locale="en" />
              <StatCard value="100%" label="Texas Licensed" sublabel="PUC certified" locale="en" />
            </div>
          </div>

          {/* Division accent gradients */}
          <div style={{ background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px' }}>
            <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
              Custom accent gradients (division pages)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard value="12k" label="Energy Customers" accentGradient="linear-gradient(135deg,#D97706,#F59E0B)" />
              <StatCard value="500+" label="Business WiFi" accentGradient="linear-gradient(135deg,#0891B2,#06B6D4)" />
              <StatCard value="10k" label="Products" accentGradient="linear-gradient(135deg,#7C3AED,#A855F7)" />
              <StatCard value="1M+" label="Annotations" accentGradient="linear-gradient(135deg,#059669,#10B981)" />
              <StatCard value="Q3" label="Drones Launch" accentGradient="linear-gradient(135deg,#DC2626,#EF4444)" />
            </div>
          </div>
        </section>

        {/* SECTION 5: Cards in context */}
        <section style={{ marginBottom: '64px' }}>
          <p className="section-label mb-6">05 — Cards in Context (dark background)</p>
          <div style={{ background: '#0F172A', borderRadius: '16px', padding: '40px' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard value="48.2k" label="Customers" sublabel="Across Texas" locale="en" />
              <StatCard value="$2.4M" label="Total Savings" locale="en" />
              <StatCard value="5" label="Divisions" sublabel="And growing" locale="en" />
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
              StatCard on dark — white card bg contrasts cleanly.
              For fully dark stat designs, use inline gradient text (no card wrapper).
            </p>
          </div>
        </section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', textAlign: 'center' }}>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
            Card component dev test — delete before production launch
            &nbsp;·&nbsp;
            <a href="/" style={{ color: 'var(--accent-blue)' }}>← Home</a>
            &nbsp;·&nbsp;
            <a href="/button-test" style={{ color: 'var(--accent-blue)' }}>Buttons →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
