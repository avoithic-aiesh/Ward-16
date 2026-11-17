/**
 * src/components/ui/ImageFrame.js
 *
 * Heritage-styled image container.
 *
 * Used for documentary / archival image presentation.
 * Features:
 *  - Thin gold border frame with corner accents
 *  - Optional caption with source attribution
 *  - Responsive aspect ratio control
 *
 * Usage:
 *   <ImageFrame
 *     src="/images/22-dhara/fountain.jpg"
 *     alt="The 22 stone waterspouts of Balaju Baisdhara"
 *     caption="Balaju Baisdhara — the 22 Dhara, Kathmandu"
 *     aspect="landscape"
 *   />
 */

import Image from "next/image";

/* Aspect ratio presets */
const ASPECT_RATIOS = {
  landscape: "aspect-[16/10]",
  portrait:  "aspect-[3/4]",
  square:    "aspect-square",
  wide:      "aspect-[21/9]",
};

export default function ImageFrame({
  src,
  alt,
  caption,       // Optional caption text below the image
  attribution,   // Optional source/photographer credit
  aspect = "landscape",
  priority = false,  // Set true for above-the-fold images
  className = "",
}) {
  return (
    <figure className={`group ${className}`}>

      {/* ---- Outer frame with corner accents ---- */}
      <div className="relative p-1 border border-gold/30">

        {/* Corner decorations — pure CSS, no extra elements needed */}
        {/* Top-left corner */}
        <span
          className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold pointer-events-none"
          aria-hidden="true"
        />
        {/* Top-right corner */}
        <span
          className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom-left corner */}
        <span
          className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom-right corner */}
        <span
          className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold pointer-events-none"
          aria-hidden="true"
        />

        {/* ---- Image itself ---- */}
        <div className={`relative overflow-hidden ${ASPECT_RATIOS[aspect] || ASPECT_RATIOS.landscape}`}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 60vw"
            />
          ) : (
            /* Placeholder panel when image is not yet available */
            <div
              className="w-full h-full bg-beige flex flex-col items-center justify-center gap-2"
              aria-label={alt || "Image placeholder"}
            >
              <span className="text-gold/30 font-display text-6xl select-none">◈</span>
              <span className="text-xs text-charcoal-soft/50 font-body uppercase tracking-widest">
                Image coming soon
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ---- Caption ---- */}
      {(caption || attribution) && (
        <figcaption className="mt-2.5 px-1">
          {caption && (
            <span className="block text-sm font-body italic text-charcoal-soft">
              {caption}
            </span>
          )}
          {attribution && (
            <span className="block text-[11px] font-body text-gold/70 mt-0.5 uppercase tracking-wide">
              {attribution}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
