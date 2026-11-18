"use client";

/**
 * src/components/layout/FooterBackToTop.js
 *
 * Back-to-top button in the footer.
 * Uses window.scrollTo — requires a Client Component.
 */

export default function FooterBackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="flex items-center gap-2 text-xs font-body text-ivory/35
                 hover:text-gold transition-colors duration-200
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
    >
      <span>Back to top</span>
      {/* Up arrow */}
      <span className="text-base leading-none" aria-hidden="true">↑</span>
    </button>
  );
}
