"use client";

/**
 * src/components/archive/ArchiveHero.js
 *
 * Immersive editorial hero section for the Ward 16 Community Heritage Archive.
 */

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ArchiveHero() {
  const { t, isNepali } = useLanguage();

  return (
    <div className="relative bg-charcoal text-ivory pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Decorative texture overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Atmospheric gold/terracotta radial lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 85% 20%, rgba(184,149,85,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 15% 80%, rgba(112,44,56,0.3) 0%, transparent 55%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-[11px] uppercase tracking-widest text-gold mb-6 font-mono">
          <span>◈</span>
          <span>{isNepali ? "काठमाडौँ महानगरपालिका वडा नं. १६" : "Ward 16 Living Cultural Memory"}</span>
          <span>◈</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ivory max-w-4xl mx-auto leading-tight">
          {t("communityArchive.pageTitle", "Community Heritage Archive")}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-ivory/70 max-w-2xl mx-auto leading-relaxed font-body">
          {t(
            "communityArchive.pageSubtitle",
            "Living memories, oral histories, family photographs, and local traditions from the people of Ward 16, Kathmandu."
          )}
        </p>

        {/* Action Button */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/community-archive/submit"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-burgundy hover:bg-burgundy-light text-ivory font-body font-semibold text-sm uppercase tracking-wider rounded-sm shadow-md transition-all duration-200 border border-burgundy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t("communityArchive.shareStoryCta", "Contribute Your Story")}</span>
          </Link>
          <a
            href="#explore-stories"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal/80 hover:bg-charcoal text-ivory/80 hover:text-ivory font-body font-medium text-sm rounded-sm border border-gold/30 transition-all duration-200"
          >
            <span>{isNepali ? "कथाहरू पढ्नुहोस् ↓" : "Browse Archive ↓"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
