/**
 * src/components/ui/PageLayout.js
 *
 * Standard page wrapper used by most content pages.
 *
 * Provides:
 *  - A consistent max-width container
 *  - Standard horizontal padding (responsive)
 *  - Vertical breathing room between sections
 *  - Optional page hero area at the top
 *
 * Variants:
 *  - "default" → standard left-aligned article page
 *  - "wide"    → wider content (map, galleries)
 *  - "narrow"  → long-form reading (about, articles)
 */

const MAX_WIDTHS = {
  default: "max-w-7xl",
  wide:    "max-w-screen-2xl",
  narrow:  "max-w-3xl",
};

export default function PageLayout({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <div
      className={`
        ${MAX_WIDTHS[variant] || MAX_WIDTHS.default}
        mx-auto
        px-4 sm:px-6 lg:px-8
        py-12 sm:py-16 lg:py-24
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * PageLayout.Section
 *
 * A vertical section within a page. Adds top padding between
 * sections so they breathe consistently.
 *
 * Usage:
 *   <PageLayout>
 *     <PageLayout.Section>…</PageLayout.Section>
 *     <PageLayout.Section>…</PageLayout.Section>
 *   </PageLayout>
 */
PageLayout.Section = function PageLayoutSection({ children, className = "" }) {
  return (
    <section className={`mt-16 sm:mt-20 lg:mt-28 first:mt-0 ${className}`}>
      {children}
    </section>
  );
};
