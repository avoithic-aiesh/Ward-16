/**
 * src/components/ui/Badge.js
 *
 * Small label/tag component for categorisation.
 *
 * Variants:
 *  - "gold"      → highlighted / featured
 *  - "muted"     → secondary info
 *  - "outline"   → low-emphasis
 *
 * Usage:
 *   <Badge>Water Shrine</Badge>
 *   <Badge variant="gold">Featured</Badge>
 */

const VARIANTS = {
  gold:
    "bg-gold/15 text-gold-dark border border-gold/30",
  muted:
    "bg-beige text-charcoal-soft border border-beige",
  outline:
    "bg-transparent text-charcoal-soft border border-charcoal-soft/30",
};

export default function Badge({ children, variant = "muted", className = "" }) {
  return (
    <span
      className={`
        inline-block px-2.5 py-0.5
        text-[10px] uppercase tracking-widest
        font-body font-semibold rounded-sm
        ${VARIANTS[variant] || VARIANTS.muted}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
