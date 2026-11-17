/**
 * src/components/ui/Button.js
 *
 * Reusable button component used throughout the site.
 *
 * Variants:
 *  - "primary"   → Filled burgundy  (main calls-to-action)
 *  - "secondary" → Gold outline     (secondary actions)
 *  - "ghost"     → Text only        (subtle actions)
 *
 * Sizes:
 *  - "sm"  → compact
 *  - "md"  → default
 *  - "lg"  → hero / prominent
 *
 * The component renders either a <button> or a Next.js <Link>
 * depending on whether an `href` prop is provided.
 *
 * Accessibility: We always pass through aria-* and other HTML
 * attributes via the spread ...props pattern.
 */

import Link from "next/link";

/* Shared base classes — applied to every variant/size */
const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-medium " +
  "rounded-sm transition-all duration-200 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-ivory disabled:opacity-50 disabled:pointer-events-none";

/* Per-variant class strings */
const VARIANTS = {
  primary:
    "bg-burgundy text-ivory hover:bg-burgundy-dark " +
    "active:scale-[0.98] shadow-sm",
  secondary:
    "border border-gold text-gold hover:bg-gold hover:text-charcoal " +
    "active:scale-[0.98]",
  ghost:
    "text-charcoal-soft hover:text-burgundy hover:bg-beige " +
    "active:scale-[0.98]",
};

/* Per-size class strings */
const SIZES = {
  sm: "text-xs px-3 py-1.5 tracking-wide",
  md: "text-sm px-5 py-2.5 tracking-wide",
  lg: "text-base px-8 py-3.5 tracking-wider uppercase text-[0.8rem]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...props            // e.g. onClick, aria-label, type, disabled
}) {
  /* Compose the final class string */
  const classes = [BASE, VARIANTS[variant], SIZES[size], className]
    .filter(Boolean)
    .join(" ");

  /* Render as a Link when href is provided */
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  /* Otherwise render as a semantic <button> */
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
