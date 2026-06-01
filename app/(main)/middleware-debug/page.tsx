// app/(main)/middleware-debug/page.tsx
// DEV-ONLY: Routing debug page. Accessible at /middleware-debug.
// Delete before production launch.

import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function MiddlewareDebugPage() {
  const headerStore = await headers()

  // Read the debug headers injected by middleware
  const hostname = headerStore.get('x-aventia-hostname') ?? 'not set (middleware debug only works in dev)'
  const subdomain = headerStore.get('x-aventia-subdomain') ?? 'none'
  const rewrite = headerStore.get('x-aventia-rewrite') ?? 'none (no rewrite)'
  const locale = headerStore.get('x-locale') ?? 'not set'
  const host = headerStore.get('host') ?? 'unknown'

  const rows: { label: string; value: string; note: string }[] = [
    {
      label: 'host header',
      value: host,
      note: 'Raw host from the incoming request',
    },
    {
      label: 'x-aventia-hostname',
      value: hostname,
      note: 'Processed hostname (port stripped)',
    },
    {
      label: 'x-aventia-subdomain',
      value: subdomain,
      note: '"none" means root domain — (main) route group is served',
    },
    {
      label: 'x-aventia-rewrite',
      value: rewrite,
      note: 'The pathname this request was rewritten to',
    },
    {
      label: 'x-locale',
      value: locale,
      note: 'Resolved locale from cookie → Accept-Language → default "en"',
    },
    {
      label: 'NODE_ENV',
      value: process.env.NODE_ENV ?? 'unknown',
      note: 'Debug headers only appear in development',
    },
  ]

  const divisionTests = [
    { label: 'Main site', url: 'http://localhost:3000', expected: 'subdomain: none' },
    { label: 'Energy', url: 'http://energy.localhost:3000', expected: 'subdomain: energy → /energy' },
    { label: 'Connect', url: 'http://connect.localhost:3000', expected: 'subdomain: connect → /connect' },
    { label: 'Store', url: 'http://store.localhost:3000', expected: 'subdomain: store → /store' },
    { label: 'AI', url: 'http://ai.localhost:3000', expected: 'subdomain: ai → /ai' },
    { label: 'Drones', url: 'http://drones.localhost:3000', expected: 'subdomain: drones → /drones' },
  ]

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div
        className="px-8 py-5 border-b"
        style={{ background: 'var(--white)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <div>
            <h1
              className="font-display font-bold text-xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Middleware Debug
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Aventia Global — Routing Inspector
            </p>
          </div>
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(220,38,38,0.08)',
              color: '#DC2626',
              border: '1px solid rgba(220,38,38,0.2)',
            }}
          >
            Dev Only
          </span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-8 py-12 space-y-10">

        {/* Current Request Headers */}
        <section>
          <h2
            className="font-display font-semibold text-xl mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Current Request Headers
          </h2>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--bg-primary)' }}>
                  <th
                    className="text-left px-6 py-3 font-semibold text-xs tracking-widest uppercase"
                    style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                  >
                    Header
                  </th>
                  <th
                    className="text-left px-6 py-3 font-semibold text-xs tracking-widest uppercase"
                    style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                  >
                    Value
                  </th>
                  <th
                    className="text-left px-6 py-3 font-semibold text-xs tracking-widest uppercase"
                    style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
                  >
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    style={{
                      background: i % 2 === 0 ? 'var(--white)' : 'var(--bg-primary)',
                      borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <td className="px-6 py-4">
                      <code
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          background: 'rgba(37,99,235,0.08)',
                          color: 'var(--accent-blue)',
                        }}
                      >
                        {row.label}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <code
                        className="font-mono text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {row.value}
                      </code>
                    </td>
                    <td
                      className="px-6 py-4 text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Test Links */}
        <section>
          <h2
            className="font-display font-semibold text-xl mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Subdomain Test Links
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Click each link to open that subdomain. Chrome and Edge resolve{' '}
            <code
              className="font-mono text-xs px-1.5 py-0.5 rounded"
              style={{ background: 'var(--bg-blue-tint)', color: 'var(--accent-blue)' }}
            >
              *.localhost
            </code>{' '}
            natively — no hosts file edit needed. If a link shows a 404, check
            that{' '}
            <code
              className="font-mono text-xs px-1.5 py-0.5 rounded"
              style={{ background: 'var(--bg-blue-tint)', color: 'var(--accent-blue)' }}
            >
              npm run dev
            </code>{' '}
            is running and note the active port (3000 / 3001 / 3002).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {divisionTests.map((test) => (
              <a
                key={test.url}
                href={test.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex items-start gap-4 no-underline"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: 'var(--accent-gradient)' }}
                />
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {test.label}
                  </p>
                  <code
                    className="font-mono text-xs"
                    style={{ color: 'var(--accent-blue)' }}
                  >
                    {test.url}
                  </code>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Expected: {test.expected}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* How Routing Works */}
        <section>
          <h2
            className="font-display font-semibold text-xl mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            How Subdomain Routing Works
          </h2>

          <div
            className="rounded-2xl p-8"
            style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
          >
            <div className="space-y-4">
              {[
                {
                  from: 'aventiaglobal.com/',
                  arrow: '→',
                  to: 'app/(main)/page.tsx',
                  type: 'passthrough',
                },
                {
                  from: 'energy.aventiaglobal.com/',
                  arrow: '→',
                  to: 'app/(energy)/energy/page.tsx (rewritten to /energy)',
                  type: 'rewrite',
                },
                {
                  from: 'energy.aventiaglobal.com/plans',
                  arrow: '→',
                  to: 'app/(energy)/energy/plans/page.tsx (rewritten to /energy/plans)',
                  type: 'rewrite',
                },
                {
                  from: 'www.aventiaglobal.com/',
                  arrow: '→',
                  to: 'aventiaglobal.com/ (301 redirect)',
                  type: 'redirect',
                },
                {
                  from: 'unknown.aventiaglobal.com/',
                  arrow: '→',
                  to: 'aventiaglobal.com/ (302 redirect)',
                  type: 'redirect',
                },
              ].map((route) => (
                <div key={route.from} className="flex items-start gap-4 text-sm">
                  <code
                    className="font-mono shrink-0 px-2 py-1 rounded text-xs"
                    style={{
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      minWidth: '280px',
                    }}
                  >
                    {route.from}
                  </code>
                  <span style={{ color: 'var(--text-muted)' }}>{route.arrow}</span>
                  <code
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{
                      background:
                        route.type === 'rewrite'
                          ? 'rgba(37,99,235,0.08)'
                          : route.type === 'redirect'
                          ? 'rgba(220,38,38,0.06)'
                          : 'rgba(5,150,105,0.08)',
                      color:
                        route.type === 'rewrite'
                          ? 'var(--accent-blue)'
                          : route.type === 'redirect'
                          ? '#DC2626'
                          : '#059669',
                    }}
                  >
                    {route.to}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div
          className="text-center py-6 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Dev tool — delete before production launch
            <span className="mx-2">·</span>
            <a href="/" style={{ color: 'var(--accent-blue)' }}>
              ← Back to Homepage
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
