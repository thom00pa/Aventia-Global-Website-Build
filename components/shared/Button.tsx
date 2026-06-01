// components/shared/Button.tsx
'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────
// VARIANTS
// Uses the .btn base class + variant modifier classes defined
// in app/globals.css (Prompt 02). CVA composes them at runtime.
// ─────────────────────────────────────────────────────────────

export const buttonVariants = cva(
  // Base: applies .btn from globals.css (display, font, padding,
  // border-radius, transition, cursor)
  'btn',
  {
    variants: {
      variant: {
        /** Blue→Cyan gradient, white text. Default CTA style. */
        primary: 'btn-primary',

        /** White background, blue border and text. Secondary action. */
        secondary: 'btn-secondary',

        /** Transparent, no border. Inline text action with underline on hover. */
        ghost: 'btn-ghost',

        /**
         * Red gradient. Destructive actions.
         * Defined inline with Tailwind arbitrary values to avoid
         * specificity conflicts with .btn-primary in globals.css.
         */
        danger: [
          '[background:linear-gradient(135deg,#DC2626,#EF4444)]',
          'text-white',
          '[box-shadow:0_4px_16px_rgba(220,38,38,0.30)]',
          'hover:[box-shadow:0_6px_24px_rgba(220,38,38,0.40)]',
          'hover:scale-[1.02]',
          'active:scale-[0.99]',
        ].join(' '),
      },
      size: {
        /** 14px text, 10px/20px padding */
        sm: 'btn-sm',
        /** 16px text, 14px/28px padding (default) */
        md: '',
        /** 18px text, 16px/36px padding */
        lg: 'btn-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, renders the Radix <Slot> instead of <button>.
   * Use this to pass a Next.js <Link> as the child while keeping
   * Button's styles and without generating nested <a><button> markup.
   *
   * @example
   * <Button asChild variant="primary">
   *   <Link href="/plans">Compare Plans</Link>
   * </Button>
   */
  asChild?: boolean

  /**
   * When true, shows an animated spinner and disables the button.
   * The spinner replaces the leftIcon if one is provided.
   */
  loading?: boolean

  /** Icon rendered to the left of the button label */
  leftIcon?: React.ReactNode

  /** Icon rendered to the right of the button label */
  rightIcon?: React.ReactNode
}

// ─────────────────────────────────────────────────────────────
// BUTTON COMPONENT
// ─────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className)

    // ── Inner content (shared between asChild and button) ────
    const inner = (
      <>
        {/* Loading spinner replaces leftIcon */}
        {loading ? (
          <Loader2
            className="animate-spin shrink-0"
            size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span className="shrink-0 flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}

        {/* Label */}
        <span>{children}</span>

        {/* Right icon — hidden during loading */}
        {!loading && rightIcon && (
          <span className="shrink-0 flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    )

    // ── asChild mode — Radix Slot, no motion ─────────────────
    // Use when you want Button styling on a non-button element
    // (e.g., Next.js Link) without nesting interactive elements.
    if (asChild) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Slot ref={ref as any} className={classes} {...props}>
          {inner}
        </Slot>
      )
    }

    // ── Standard mode — motion.button with spring press ──────
    // whileTap provides the physical press-down feel.
    // transition: spring gives a snappy, not-floaty response.
    // Cast is safe: motion.button accepts all HTML button attrs.
    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        whileTap={
          !isDisabled
            ? { scale: variant === 'ghost' ? 0.99 : 0.97 }
            : undefined
        }
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.8,
        }}
        // Cast: motion.button is a superset of HTMLButtonElement attrs
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {inner}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// ─────────────────────────────────────────────────────────────
// BUTTON GROUP
// Side-by-side button pairs for hero sections and CTAs.
// Stacks vertically on mobile, horizontal on sm+ by default.
// ─────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  /**
   * Gap between buttons.
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg'
  /**
   * Alignment of the group.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end'
  /**
   * When true, buttons stack vertically on mobile and go horizontal
   * on sm (640px) and above.
   * @default true
   */
  stack?: boolean
}

const GAP_CLASSES: Record<string, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

const ALIGN_CLASSES: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
}

export function ButtonGroup({
  children,
  className,
  gap = 'md',
  align = 'start',
  stack = true,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center',
        GAP_CLASSES[gap],
        ALIGN_CLASSES[align],
        stack && 'flex-col sm:flex-row',
        className
      )}
    >
      {children}
    </div>
  )
}

ButtonGroup.displayName = 'ButtonGroup'

export { Button }
export default Button
