// app/api/og/route.tsx
//
// Dynamic OpenGraph image generator.
// Used by all division layouts for social sharing previews.
// Served from aventiaglobal.com/api/og
//
// Query params:
//   title    — Division or page name (e.g. "Aventia Energy")
//   tagline  — Supporting line (e.g. "Texas Electricity from $0.099/kWh")
//   color    — Hex accent color URL-encoded (e.g. "%23D97706" for #D97706)
//
// Output: 1200×630 PNG
//
// NOTE: ImageResponse uses Satori (a CSS subset).
// Only inline styles work. No Tailwind, no className.
// All flex children must have display:'flex' set explicitly.

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const title   = searchParams.get('title')   ?? 'Aventia Global'
  const tagline = searchParams.get('tagline') ?? 'Technology & Services'
  const color   = searchParams.get('color')   ?? '#2563EB'

  return new ImageResponse(
    (
      <div
        style={{
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          background:     '#F8FAFC',
          fontFamily:     'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top color accent bar */}
        <div style={{ height: '10px', background: color, width: '100%', display: 'flex' }} />

        {/* Main content area */}
        <div
          style={{
            flex:           1,
            display:        'flex',
            flexDirection:  'row',
            alignItems:     'center',
            padding:        '56px 80px',
            gap:            '48px',
          }}
        >
          {/* Left side — text */}
          <div
            style={{
              flex:           1,
              display:        'flex',
              flexDirection:  'column',
              gap:            '16px',
            }}
          >
            {/* Brand wordmark */}
            <div
              style={{
                fontSize:      '18px',
                fontWeight:    '700',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         '#94A3B8',
                display:       'flex',
              }}
            >
              AVENTIA GLOBAL
            </div>

            {/* Main title */}
            <div
              style={{
                fontSize:   '58px',
                fontWeight: '900',
                color:      '#0F172A',
                lineHeight: '1.1',
                display:    'flex',
              }}
            >
              {title}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize:   '24px',
                color:      '#334155',
                lineHeight: '1.4',
                display:    'flex',
                maxWidth:   '580px',
              }}
            >
              {tagline}
            </div>
          </div>

          {/* Right side — decorative geometric accent */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '16px',
              flexShrink:    0,
            }}
          >
            {/* Large colored square */}
            <div
              style={{
                width:        '160px',
                height:       '160px',
                borderRadius: '28px',
                background:   color,
                opacity:      0.18,
                display:      'flex',
              }}
            />
            {/* Small colored square (offset) */}
            <div
              style={{
                width:        '80px',
                height:       '80px',
                borderRadius: '16px',
                background:   color,
                opacity:      0.30,
                display:      'flex',
                alignSelf:    'flex-end',
                marginTop:    '-48px',
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            height:         '56px',
            background:     '#0F172A',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '0 80px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: '15px', display: 'flex' }}>
            aventiaglobal.com
          </span>
          {/* Color dot indicator */}
          <div
            style={{
              width:        '10px',
              height:       '10px',
              borderRadius: '50%',
              background:   color,
              display:      'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    }
  )
}
