'use client';

/**
 * src/components/ui/LanguageSwitcher.js
 *
 * Reusable bilingual language switcher component (English | नेपाली).
 *
 * Features:
 * - Direct toggle between English (en) and Nepali (ne).
 * - Fully accessible keyboard controls.
 * - Dynamic styling based on transparent header vs scrolled/solid header.
 * - Supports compact mode for mobile menu.
 */

import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageSwitcher({
  variant = "header", // "header" | "mobile" | "inline"
  scrolled = false,
  className = "",
}) {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Language selection">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          aria-pressed={language === 'en'}
          className={[
            "text-sm font-medium px-2.5 py-1 rounded transition-colors",
            language === 'en'
              ? "bg-burgundy text-ivory font-semibold shadow-xs"
              : "text-charcoal/70 hover:text-charcoal hover:bg-beige/40",
          ].join(" ")}
        >
          English
        </button>
        <span className="text-gold/40 text-xs">|</span>
        <button
          type="button"
          onClick={() => setLanguage('ne')}
          aria-pressed={language === 'ne'}
          className={[
            "text-sm font-serif px-2.5 py-1 rounded transition-colors",
            language === 'ne'
              ? "bg-burgundy text-ivory font-semibold shadow-xs"
              : "text-charcoal/70 hover:text-charcoal hover:bg-beige/40",
          ].join(" ")}
        >
          नेपाली
        </button>
      </div>
    );
  }

  // Desktop / Header variant
  return (
    <div
      role="group"
      aria-label="Language selector"
      className={[
        "flex items-center rounded-sm text-xs font-medium border transition-colors duration-200",
        scrolled
          ? "border-beige bg-ivory/80 text-charcoal shadow-xs"
          : "border-ivory/25 bg-charcoal/40 text-ivory backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        title="Switch to English"
        className={[
          "px-2.5 py-1.5 rounded-l-sm transition-all duration-150 focus-visible:ring-1 focus-visible:ring-gold",
          language === 'en'
            ? scrolled
              ? "bg-burgundy text-ivory font-semibold"
              : "bg-gold text-charcoal font-semibold"
            : scrolled
            ? "hover:text-burgundy hover:bg-beige/30"
            : "hover:text-gold hover:bg-white/10",
        ].join(" ")}
      >
        EN
      </button>

      <span className={scrolled ? "text-beige" : "text-ivory/20"} aria-hidden="true">
        /
      </span>

      <button
        type="button"
        onClick={() => setLanguage('ne')}
        aria-pressed={language === 'ne'}
        title="नेपाली भाषामा हेर्नुहोस्"
        className={[
          "px-2.5 py-1.5 rounded-r-sm font-serif transition-all duration-150 focus-visible:ring-1 focus-visible:ring-gold",
          language === 'ne'
            ? scrolled
              ? "bg-burgundy text-ivory font-semibold"
              : "bg-gold text-charcoal font-semibold"
            : scrolled
            ? "hover:text-burgundy hover:bg-beige/30"
            : "hover:text-gold hover:bg-white/10",
        ].join(" ")}
      >
        नेपाली
      </button>
    </div>
  );
}
