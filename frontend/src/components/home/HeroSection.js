"use client";

/**
 * frontend/src/components/home/HeroSection.js
 *
 * Modeled directly after the user's design reference:
 * - Left-aligned text layout with "— PRESERVING OUR HERITAGE —" gold eyebrow
 * - Two-line display title: "Ward 16 / Digital Heritage"
 * - Italicized subtitle: "Discover the history, culture and timeless beauty of 22 Dhara and Pyatho Ajima"
 * - Two rounded pill action buttons: "Explore Heritage →" (Burgundy) & "▶ Watch Story" (Gold-outlined)
 * - Traditional Newari pagoda temple silhouette watermark at the bottom-left
 * - Beautiful photographic background showing pagoda temple + carved Makara water spout
 */

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroSection() {
  const { isNepali } = useLanguage();

  return (
    <section
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero/hero-vibrant.jpg"
          alt="Ward 16 Heritage — Newari pagoda temple with prayer flags and sacred architecture"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Deep contrast gradient overlay on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1816]/95 via-[#1A1816]/75 sm:via-[#1A1816]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/80 via-transparent to-black/25" />
      </div>

      {/* ── Bottom-Left Traditional Pagoda Silhouettes Watermark ── */}
      <div
        className="absolute bottom-0 left-0 w-80 sm:w-96 h-28 pointer-events-none z-10 opacity-30 text-gold"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 120" fill="currentColor" className="w-full h-full">
          {/* Temple 1 (Far Left, Large) */}
          <path d="M40 10L37 18H43L40 10Z" />
          <path d="M28 28L40 18L52 28L54 30H26L28 28Z" />
          <rect x="33" y="30" width="14" height="6" />
          <path d="M20 44L40 33L60 44L63 47H17L20 44Z" />
          <rect x="26" y="47" width="28" height="10" />
          <path d="M10 68L40 54L70 68L74 72H6L10 68Z" />
          <rect x="18" y="72" width="44" height="24" />
          <path d="M12 96H68L72 102H8L12 96Z" />
          <rect x="4" y="102" width="72" height="18" />

          {/* Temple 2 (Middle, Medium) */}
          <path d="M110 32L108 38H112L110 32Z" />
          <path d="M100 46L110 38L120 46L122 48H98L100 46Z" />
          <rect x="104" y="48" width="12" height="6" />
          <path d="M92 62L110 52L128 62L131 65H89L92 62Z" />
          <rect x="98" y="65" width="24" height="12" />
          <path d="M84 84L110 74L136 84L140 88H80L84 84Z" />
          <rect x="90" y="88" width="40" height="20" />
          <rect x="76" y="108" width="68" height="12" />

          {/* Temple 3 (Small, Right) */}
          <path d="M170 54L168 59H172L170 54Z" />
          <path d="M162 66L170 59L178 66L180 68H160L162 66Z" />
          <rect x="165" y="68" width="10" height="6" />
          <path d="M154 82L170 72L186 82L189 85H151L154 82Z" />
          <rect x="159" y="85" width="22" height="16" />
          <rect x="146" y="101" width="48" height="19" />
        </svg>
      </div>

      {/* ── Main Hero Content (Left-Aligned) ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl text-left">

          {/* Eyebrow: "— PRESERVING OUR HERITAGE —" */}
          <div className="flex items-center gap-3 text-gold font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase font-semibold mb-4">
            <div className="w-7 sm:w-10 h-px bg-gold/75" />
            <span>{isNepali ? "हाम्रो सम्पदा संरक्षण" : "PRESERVING OUR HERITAGE"}</span>
            <div className="w-7 sm:w-10 h-px bg-gold/75" />
          </div>

          {/* Two-Line Title in Yatra One Display Font */}
          <h1
            id="hero-heading"
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight mb-5 drop-shadow-md"
          >
            {isNepali ? (
              <>
                वडा १६ <br />
                डिजिटल सम्पदा
              </>
            ) : (
              <>
                Ward 16 <br />
                Digital Heritage
              </>
            )}
          </h1>

          {/* Subtitle in Italic Serif */}
          <p className="font-display italic text-base sm:text-lg lg:text-xl text-ivory/95 font-light leading-relaxed max-w-xl mb-9 drop-shadow">
            {isNepali
              ? "२२ धारा र प्याठो अजिमाको इतिहास, संस्कृति र अनन्त सौन्दर्यको अन्वेषण गर्नुहोस्।"
              : "Discover the history, culture and timeless beauty of 22 Dhara and Pyatho Ajima"}
          </p>

          {/* Two Pill CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary Button: Explore Heritage */}
            <Link
              href="/explore-map"
              className="px-7 py-3.5 bg-burgundy hover:bg-burgundy-light text-white font-body font-medium text-sm sm:text-base rounded-full transition-all duration-200 shadow-md hover:shadow-elevated flex items-center gap-2 group"
            >
              <span>{isNepali ? "सम्पदा अन्वेषण गर्नुहोस्" : "Explore Heritage"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            {/* Secondary Button: Watch Story */}
            <Link
              href="/community-archive"
              className="px-7 py-3.5 bg-black/40 hover:bg-black/60 text-ivory font-body font-medium text-sm sm:text-base rounded-full border border-gold/70 transition-all duration-200 backdrop-blur-xs flex items-center gap-2.5 group"
            >
              <span className="text-gold text-xs transition-transform group-hover:scale-125">▶</span>
              <span>{isNepali ? "कथाहरू हेर्नुहोस्" : "Watch Story"}</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
