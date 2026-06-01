// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      // ─────────────────────────────────────────
      // COLORS — Full Aventia Brand Palette
      // ─────────────────────────────────────────
      colors: {
        // Base surfaces
        white: '#FFFFFF',
        'bg-primary': '#F8FAFC',
        'bg-blue-tint': '#EFF6FF',
        'bg-card': '#FFFFFF',

        // Text hierarchy
        'text-primary': '#0F172A',
        'text-secondary': '#334155',
        'text-muted': '#64748B',

        // Brand accents
        'accent-blue': '#2563EB',
        'accent-cyan': '#0891B2',

        // Borders
        border: '#E2E8F0',
        'border-blue': '#BFDBFE',

        // Division accent colors
        energy: '#D97706',
        connect: '#0891B2',
        store: '#7C3AED',
        ai: '#059669',
        drones: '#DC2626',

        // Shadcn/ui compatibility aliases
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      // ─────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────
      fontFamily: {
        // Headlines and display text
        display: ['"Exo 2"', 'system-ui', 'sans-serif'],
        // Body text and UI labels
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        // Stats, numbers, code
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Custom type scale matching design system
        'hero': ['72px', { lineHeight: '1.1', fontWeight: '800' }],
        'section': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'card-title': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'stat': ['48px', { lineHeight: '1.1', fontWeight: '500' }],
      },
      letterSpacing: {
        brand: '0.15em',
        tight: '-0.02em',
        wide: '0.08em',
      },

      // ─────────────────────────────────────────
      // SPACING
      // ─────────────────────────────────────────
      spacing: {
        'section': '100px',
        'section-sm': '60px',
        'card': '32px',
        'gap': '24px',
        'container': '24px',
      },

      // ─────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        // Shadcn/ui compatibility
        DEFAULT: 'var(--radius)',
      },

      // ─────────────────────────────────────────
      // BOX SHADOWS
      // ─────────────────────────────────────────
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06)',
        md: '0 4px 16px rgba(37,99,235,0.10)',
        lg: '0 8px 40px rgba(37,99,235,0.15)',
        'card': '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(37,99,235,0.15)',
        'button': '0 4px 16px rgba(37,99,235,0.30)',
        'glow': '0 0 40px rgba(37,99,235,0.20)',
        'glow-lg': '0 0 80px rgba(37,99,235,0.25)',
      },

      // ─────────────────────────────────────────
      // BACKGROUND GRADIENTS
      // ─────────────────────────────────────────
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2563EB, #0891B2)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(8,145,178,0.08))',
        'hero-mesh':
          'radial-gradient(at 40% 20%, rgba(37,99,235,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(8,145,178,0.10) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(37,99,235,0.08) 0px, transparent 50%)',
        'section-fade': 'linear-gradient(180deg, transparent, rgba(248,250,252,1))',
        // Division gradients
        'energy-gradient': 'linear-gradient(135deg, #D97706, #F59E0B)',
        'connect-gradient': 'linear-gradient(135deg, #0891B2, #06B6D4)',
        'store-gradient': 'linear-gradient(135deg, #7C3AED, #A855F7)',
        'ai-gradient': 'linear-gradient(135deg, #059669, #10B981)',
        'drones-gradient': 'linear-gradient(135deg, #DC2626, #EF4444)',
      },

      // ─────────────────────────────────────────
      // MAX WIDTH
      // ─────────────────────────────────────────
      maxWidth: {
        container: '1200px',
      },

      // ─────────────────────────────────────────
      // ANIMATIONS & KEYFRAMES
      // ─────────────────────────────────────────
      keyframes: {
        // Fade in from transparent
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Slide up from below (used for scroll reveals)
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Slide down from above (used for navbar)
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Subtle float for hero decorative elements
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        // Pulse glow for live badges
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37,99,235,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(37,99,235,0)' },
        },
        // Gradient shift for hero backgrounds
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        // Horizontal scroll for ticker / strip elements
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Shimmer for loading skeletons
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Spin for loading indicators
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Accordion open/close (shadcn/ui)
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'ticker': 'ticker 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      // ─────────────────────────────────────────
      // TRANSITIONS
      // ─────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
