/**
 * src/components/ui/HeritageCard.js
 *
 * Card component for heritage site previews.
 *
 * Used on listing pages to show:
 *  - A representative image
 *  - Category tag
 *  - Title and brief description
 *  - A "Learn more" link
 *
 * Design: clean editorial style with a hover lift effect.
 * The entire card is a link (accessible — keyboard navigable).
 */

import Link from "next/link";
import Image from "next/image";

export default function HeritageCard({
  title,           // Name of the heritage site / item
  description,     // 1-2 sentence teaser
  category,        // e.g. "Water Shrine" | "Temple"
  imageSrc,        // Path to image (relative to /public)
  imageAlt,        // Descriptive alt text
  href,            // Link destination
}) {
  return (
    /*
      The card is wrapped in an <article> for semantic meaning —
      it represents an independent piece of content.
      The Link overlaps the whole card via an absolute pseudo-element
      (using the "stretched-link" pattern) so the click target is large.
    */
    <article
      className="group relative flex flex-col bg-ivory border border-beige rounded-sm
                 shadow-card hover:shadow-elevated
                 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* ---- Image container ---- */}
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill                     /* Fill the container */
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder when no image is provided yet */
          <div
            className="w-full h-full flex items-center justify-center
                       bg-gradient-to-br from-beige to-ivory"
            aria-hidden="true"
          >
            <span className="text-gold/40 font-display text-5xl select-none">◈</span>
          </div>
        )}

        {/* Category badge — overlaid on the image */}
        {category && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase
                       tracking-widest font-body font-semibold
                       bg-charcoal/80 text-gold rounded-sm backdrop-blur-sm"
          >
            {category}
          </span>
        )}
      </div>

      {/* ---- Text content ---- */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-semibold text-charcoal leading-snug">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm font-body text-charcoal-soft leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Inline arrow link */}
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className="text-xs uppercase tracking-widest text-gold font-body font-semibold
                       group-hover:text-burgundy transition-colors duration-150"
          >
            Explore
          </span>
          {/* Arrow that slides right on hover */}
          <span
            className="text-gold group-hover:text-burgundy group-hover:translate-x-1
                       transition-all duration-200 text-sm"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>

      {/*
        Stretched link: makes the entire card clickable while keeping
        only the <Link> in the accessibility tree.
        The <Link>'s ::after pseudo-element fills the card.
      */}
      <Link
        href={href}
        className="absolute inset-0 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        aria-label={`Explore ${title}`}
      >
        <span className="sr-only">Explore {title}</span>
      </Link>
    </article>
  );
}
