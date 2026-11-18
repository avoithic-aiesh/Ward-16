'use client';

/**
 * HeritageHero.js
 *
 * Immersive editorial hero section for heritage detail pages.
 *
 * Features:
 * - Heritage category badge and bilingual titles.
 * - Subtitle: "Where water, architecture and cultural memory meet."
 * - Location info clearly indicating verification status.
 * - High-resolution cover photo support with architectural SVG pattern fallback.
 * - Animated scroll indicator.
 * - Deep burgundy, gold, and warm ivory styling following Modern Heritage design system.
 */

import Image from 'next/image';
import ScrollIndicator from '@/components/home/ScrollIndicator';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HeritageHero({
  title = "22 Dhara — Balaju Baisdhara",
  titleNepali = "बाइस धारा",
  subtitle = "Where water, architecture and cultural memory meet.",
  subtitleNepali = null,
  category = "Water Heritage & Sacred Shrine",
  location = "Balaju, Ward No. 16, Kathmandu",
  coordinatesVerified = false,
  coverImage = null,
  imageCaption = null,
}) {
  const { t, isNepali } = useLanguage();

  const displayTitle = isNepali && titleNepali ? titleNepali : title;
  const secondaryTitle = isNepali ? title : titleNepali;
  const displaySubtitle = isNepali && subtitleNepali ? subtitleNepali : subtitle;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-charcoal text-ivory overflow-hidden pt-24 pb-12">
      {/* ── Background Layer: Photograph or Elegant Pattern ─────────────── */}
      <div className="absolute inset-0 z-0">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-60"
          />
        ) : (
          /* Architectural textured fallback */
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-soft to-charcoal">
            {/* Traditional diagonal grid pattern */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #B89555 1px, transparent 0)`,
                backgroundSize: '36px 36px',
              }}
            />
            {/* Subtle central warm radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(112,44,56,0.35)_0%,_transparent_70%)]" />
          </div>
        )}

        {/* Cinematic gradient overlays for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent" />
      </div>

      {/* ── Main Content Container ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow & Category Badge */}
          <div className="flex flex-wrap items-center gap-3 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-medium uppercase tracking-widest bg-gold/20 text-gold border border-gold/40 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {category}
            </span>

            {/* Location status pill */}
            <span className="inline-flex items-center gap-1 text-xs text-ivory/60 bg-charcoal/60 border border-ivory/15 px-2.5 py-1 rounded-sm backdrop-blur-sm">
              <svg className="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{location}</span>
              {!coordinatesVerified && (
                <span className="text-gold/80 italic text-[11px] ml-1">
                  ({isNepali ? "स्थान प्रमाणीकरण बाँकी" : "Survey verification pending"})
                </span>
              )}
            </span>
          </div>

          {/* Heritage Titles */}
          <div className="space-y-2 animate-fade-up">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ivory leading-[1.08]">
              {displayTitle}
            </h1>
            {secondaryTitle && (
              <p className="font-serif text-2xl sm:text-3xl text-gold/90 tracking-wide font-normal">
                {secondaryTitle}
              </p>
            )}
          </div>

          {/* Decorative Divider */}
          <div className="w-20 h-0.5 bg-gradient-to-r from-gold to-transparent" />

          {/* Subtitle / Poetic Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl font-light text-beige/90 leading-relaxed font-serif italic max-w-2xl animate-fade-up delay-200">
            &ldquo;{displaySubtitle}&rdquo;
          </p>

          {/* Optional Caption if photo is loaded */}
          {coverImage && imageCaption && (
            <p className="text-xs text-ivory/50 italic pt-2">
              Photograph: {imageCaption}
            </p>
          )}
        </div>
      </div>

      {/* ── Bottom Bar: Scroll Indicator ─────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-4">
        <ScrollIndicator
          targetId="historical-overview"
          label={t("heritageDetail.exploreDocumentation", "Explore Documentation")}
        />
      </div>
    </section>
  );
}
