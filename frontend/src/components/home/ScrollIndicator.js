"use client";

/**
 * src/components/home/ScrollIndicator.js
 *
 * Animated scroll-down indicator at the bottom of the hero.
 * Uses "use client" because it uses an onClick handler to
 * smooth-scroll to the next section.
 *
 * The bouncing animation is defined in globals.css (.animate-scroll-bounce).
 * prefers-reduced-motion stops the animation via CSS automatically.
 */

export default function ScrollIndicator() {
  const handleClick = () => {
    // Scroll to the section just below the hero
    const nextSection = document.getElementById("ward-intro");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll down to discover more"
      className="flex flex-col items-center gap-2 group
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      {/* Label */}
      <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/40
                       font-body group-hover:text-gold transition-colors duration-200">
        Scroll
      </span>

      {/* Animated arrow container */}
      <span
        className="animate-scroll-bounce flex flex-col items-center gap-0.5"
        aria-hidden="true"
      >
        {/* Three diminishing dots forming a downward arrow */}
        <span className="w-px h-5 bg-gradient-to-b from-gold/60 to-transparent block" />
        <span className="w-1.5 h-1.5 border-b border-r border-gold/50 rotate-45 block" />
      </span>
    </button>
  );
}
