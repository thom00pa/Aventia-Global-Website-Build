// app/(main)/button-test/page.tsx
// DEV-ONLY: Button component visual test. Delete before production launch.

import Link from 'next/link'
import { Button, ButtonGroup } from '@/components/shared'
import {
  ArrowRight,
  Zap,
  Download,
  ExternalLink,
  Trash2,
  Check,
  ChevronRight,
  Mail,
} from 'lucide-react'

export default function ButtonTestPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Page header */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 40px',
        marginBottom: '60px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
            Button Component
          </h1>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'rgba(220,38,38,0.08)', color: '#DC2626',
            border: '1px solid rgba(220,38,38,0.2)',
            padding: '4px 12px', borderRadius: '100px',
          }}>
            Dev Only
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

        {/* SECTION 1: Variants */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">01 — Variants</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Button variant="primary">Get Started</Button>
              <Button variant="secondary">Compare Plans</Button>
              <Button variant="ghost">Learn More</Button>
              <Button variant="danger">Delete Account</Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              primary · secondary · ghost · danger
            </p>
          </div>
        </section>

        {/* SECTION 2: Sizes */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">02 — Sizes</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Button variant="primary" size="lg">Large Button</Button>
              <Button variant="primary" size="md">Default Button</Button>
              <Button variant="primary" size="sm">Small Button</Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '16px' }}>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" size="md">Default</Button>
              <Button variant="secondary" size="sm">Small</Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              size=&quot;lg&quot; · size=&quot;md&quot; (default) · size=&quot;sm&quot;
            </p>
          </div>
        </section>

        {/* SECTION 3: Icons */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">03 — Icon Slots</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Button
                variant="primary"
                leftIcon={<Zap size={16} strokeWidth={2} />}
              >
                Compare Plans
              </Button>
              <Button
                variant="primary"
                rightIcon={<ArrowRight size={16} strokeWidth={2} />}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                leftIcon={<Download size={16} strokeWidth={2} />}
              >
                Download
              </Button>
              <Button
                variant="secondary"
                rightIcon={<ExternalLink size={14} strokeWidth={2} />}
              >
                View Site
              </Button>
              <Button
                variant="ghost"
                rightIcon={<ChevronRight size={16} strokeWidth={2} />}
              >
                Learn More
              </Button>
              <Button
                variant="danger"
                leftIcon={<Trash2 size={15} strokeWidth={2} />}
              >
                Delete
              </Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              leftIcon + rightIcon slots — pass any React node
            </p>
          </div>
        </section>

        {/* SECTION 4: Loading State */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">04 — Loading State</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Button variant="primary" loading>Sending...</Button>
              <Button variant="secondary" loading>Processing</Button>
              <Button variant="primary" size="sm" loading>Loading</Button>
              <Button variant="primary" size="lg" loading>Please wait</Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              loading=&#123;true&#125; — spinner replaces leftIcon, button is disabled
            </p>
          </div>
        </section>

        {/* SECTION 5: Disabled State */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">05 — Disabled State</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Button variant="primary" disabled>Get Started</Button>
              <Button variant="secondary" disabled>Compare</Button>
              <Button variant="ghost" disabled>Learn More</Button>
              <Button variant="danger" disabled>Delete</Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              disabled=&#123;true&#125; — 50% opacity, no pointer events, no whileTap
            </p>
          </div>
        </section>

        {/* SECTION 6: Full Width */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">06 — Full Width</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary" fullWidth rightIcon={<ArrowRight size={16} />}>
                Enroll Now — Full Width Primary
              </Button>
              <Button variant="secondary" fullWidth leftIcon={<Mail size={16} />}>
                Join the Waitlist — Full Width Secondary
              </Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              fullWidth=&#123;true&#125; — w-full, used in forms and mobile CTAs
            </p>
          </div>
        </section>

        {/* SECTION 7: asChild with Link */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">07 — asChild Pattern (wrapping Next.js Link)</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              {/* asChild renders a single <a> tag — no nested <button><a> */}
              <Button asChild variant="primary" rightIcon={<ArrowRight size={16} />}>
                <Link href="https://energy.aventiaglobal.com">
                  View Energy Plans
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/typography">Typography →</Link>
              </Button>
            </div>
            <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              asChild=&#123;true&#125; — renders as &lt;a&gt; (inspect DOM to confirm no nested &lt;button&gt;)
            </p>
          </div>
        </section>

        {/* SECTION 8: ButtonGroup */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">08 — ButtonGroup (Hero CTA patterns)</p>
          <div
            style={{
              background: 'var(--white)', borderRadius: '16px',
              border: '1px solid var(--border)', padding: '40px',
            }}
          >
            {/* Standard hero CTA pair */}
            <div style={{ marginBottom: '32px' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                align=&quot;start&quot; · gap=&quot;md&quot; · stack=true (mobile: column, desktop: row)
              </p>
              <ButtonGroup align="start" gap="md">
                <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
                  Compare Plans
                </Button>
                <Button variant="secondary">
                  Learn More
                </Button>
              </ButtonGroup>
            </div>

            {/* Center aligned */}
            <div style={{ marginBottom: '32px' }}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                align=&quot;center&quot; · gap=&quot;lg&quot;
              </p>
              <ButtonGroup align="center" gap="lg">
                <Button variant="primary" size="lg" leftIcon={<Zap size={18} />}>
                  Start Saving Today
                </Button>
                <Button variant="ghost" size="lg" rightIcon={<ChevronRight size={18} />}>
                  How It Works
                </Button>
              </ButtonGroup>
            </div>

            {/* Three buttons */}
            <div>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                Three buttons · gap=&quot;sm&quot;
              </p>
              <ButtonGroup gap="sm">
                <Button variant="primary" size="sm" leftIcon={<Check size={14} />}>Enroll</Button>
                <Button variant="secondary" size="sm">Compare</Button>
                <Button variant="ghost" size="sm">FAQ</Button>
              </ButtonGroup>
            </div>
          </div>
        </section>

        {/* SECTION 9: Dark background test */}
        <section style={{ marginBottom: '56px' }}>
          <p className="section-label mb-6">09 — On Dark Background</p>
          <div
            style={{
              background: '#0F172A', borderRadius: '16px',
              padding: '40px',
            }}
          >
            <ButtonGroup gap="md">
              <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
                Get Started
              </Button>
              <Button
                variant="secondary"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                Learn More
              </Button>
            </ButtonGroup>
            <p className="font-mono text-xs mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Primary looks great on dark. Secondary needs manual style override on dark bg.
              A white-variant secondary will be added for hero sections as needed.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', textAlign: 'center' }}>
          <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
            Button component dev test — delete before production launch
            &nbsp;·&nbsp;
            <a href="/" style={{ color: 'var(--accent-blue)' }}>← Home</a>
            &nbsp;·&nbsp;
            <a href="/logo-test" style={{ color: 'var(--accent-blue)' }}>Logo →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
