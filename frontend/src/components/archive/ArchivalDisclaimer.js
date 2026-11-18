"use client";

/**
 * src/components/archive/ArchivalDisclaimer.js
 *
 * Notice banner clearly distinguishing living community memories
 * from verified archaeological documentation.
 */

import { useLanguage } from "@/i18n/LanguageContext";

export default function ArchivalDisclaimer({ className = "" }) {
  const { t, isNepali } = useLanguage();

  return (
    <aside
      className={`p-5 sm:p-6 bg-ivory border border-gold/40 rounded-sm shadow-xs ${className}`}
      aria-label="Community archive disclaimer"
    >
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display font-semibold text-charcoal text-base">
              {t("communityArchive.disclaimerTitle", "Community Heritage & Living Memory Notice")}
            </h4>
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-terracotta/15 text-terracotta font-semibold rounded-xs">
              {isNepali ? "जीवित संस्मरण" : "Living Memory"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-body">
            {t(
              "communityArchive.disclaimerText",
              "The stories and reflections in this archive represent personal and community perspectives. While carefully reviewed for authenticity, they reflect lived human experiences and oral tradition rather than officially sanctioned archaeological records."
            )}
          </p>
        </div>
      </div>
    </aside>
  );
}
