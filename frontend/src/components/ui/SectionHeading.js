/**
 * src/components/ui/SectionHeading.js
 *
 * Reusable editorial section heading component.
 *
 * Visual anatomy (top → bottom):
 *  1. Optional eyebrow — tiny uppercase label above the title
 *  2. Main title      — large display-font heading
 *  3. Optional body   — lead paragraph under the title
 *  4. Gold divider    — a short decorative line
 *
 * Alignment:
 *  - "left"   → editorial / article style
 *  - "center" → section intros on the homepage
 *
 * Usage example:
 *   <SectionHeading
 *     eyebrow="Living History"
 *     title="Heritage of Ward 16"
 *     body="Explore the stories behind our community's landmarks."
 *     align="center"
 *   />
 */

export default function SectionHeading({
  eyebrow,         // Small label above the title  (optional)
  title,           // Main heading text            (required)
  body,            // Supporting paragraph         (optional)
  align = "left",  // "left" | "center"
  as: Tag = "h2",  // HTML heading level — default h2, can be h1/h3
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center items-center" : "text-left items-start"} flex flex-col ${className}`}>

      {/* Eyebrow label */}
      {eyebrow && (
        <span
          className="block text-[11px] uppercase tracking-[0.25em] text-gold
                     font-body font-semibold mb-3"
          aria-hidden="true"  /* Decorative — the heading carries the meaning */
        >
          {eyebrow}
        </span>
      )}

      {/* Main title */}
      <Tag className="font-display font-semibold text-charcoal leading-tight">
        {title}
      </Tag>

      {/* Gold divider line */}
      <div
        className={`mt-4 h-px w-12 bg-gold ${isCenter ? "mx-auto" : ""}`}
        aria-hidden="true"
      />

      {/* Optional body text */}
      {body && (
        <p
          className={`mt-5 text-base font-body text-charcoal-soft leading-relaxed
                      ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
