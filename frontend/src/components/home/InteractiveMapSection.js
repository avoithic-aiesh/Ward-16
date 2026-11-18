'use client';

/**
 * src/components/home/InteractiveMapSection.js
 *
 * Interactive Ward 16 Heritage Atlas section on the homepage,
 * matching the user's design mockup with top camera toggles,
 * rounded map container, dashed boundary polygon, and landmark cards.
 */

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/i18n/LanguageContext';
import { HERITAGE_LOCATIONS } from '@/data/heritageLocations';

// Dynamic import with SSR disabled for Leaflet map
const HeritageMap = dynamic(() => import('@/components/map/HeritageMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center bg-[#E9DFCF]/60 text-charcoal/60">
      <div className="w-9 h-9 border-3 border-burgundy border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
        Loading Interactive Heritage Map…
      </p>
    </div>
  ),
});

export default function InteractiveMapSection() {
  const [viewMode, setViewMode] = useState('landmarks');
  const { isNepali } = useLanguage();

  return (
    <section
      id="heritage-map"
      className="relative bg-[#FBF8F2] py-20 sm:py-24 border-t border-beige/60"
      aria-label="Interactive Ward 16 Heritage Map"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <ScrollReveal animation="fade-up">
          <SectionHeading
            eyebrow={isNepali ? "अन्तरक्रियात्मक नक्सा" : "Interactive Atlas"}
            title={isNepali ? "वडा १६ का ऐतिहासिक सम्पदाहरू" : "Explore Ward 16 Heritage"}
            subtitle={
              isNepali
                ? "बालाजु बाइसधारा, प्याः थ्वं अजिमा र वडाका पवित्र सम्पदाहरूको भौगोलिक अवस्थिति।"
                : "Geographical location of 22 Dhara, Pyah Thwam Ajima and sacred heritage sites across Ward 16."
            }
            align="center"
            className="mb-8"
          />
        </ScrollReveal>

        {/* ── View Switcher Buttons ─────────────────────────────────────── */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex items-center justify-center gap-3.5 mb-6">
            <button
              type="button"
              onClick={() => setViewMode('landmarks')}
              className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                viewMode === 'landmarks'
                  ? 'bg-[#F2DEBF] border-2 border-[#B89555] text-charcoal font-bold shadow-sm'
                  : 'bg-white/90 border-2 border-[#D4A373]/70 text-charcoal/80 hover:bg-[#FAF3E8]'
              }`}
            >
              {isNepali ? 'महत्त्वपूर्ण सम्पदाहरू' : 'Zoom to landmarks'}
            </button>

            <button
              type="button"
              onClick={() => setViewMode('ward')}
              className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                viewMode === 'ward'
                  ? 'bg-[#F2DEBF] border-2 border-[#B89555] text-charcoal font-bold shadow-sm'
                  : 'bg-white/90 border-2 border-[#D4A373]/70 text-charcoal/80 hover:bg-[#FAF3E8]'
              }`}
            >
              {isNepali ? 'सम्पूर्ण वडा क्षेत्र' : 'Whole ward'}
            </button>
          </div>
        </ScrollReveal>

        {/* ── Rounded Interactive Map Card ───────────────────────────────── */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="relative w-full h-[450px] sm:h-[520px] md:h-[560px] rounded-3xl overflow-hidden border-2 border-[#5D4037]/25 shadow-md bg-[#E9DFCF]">
            <HeritageMap
              locations={HERITAGE_LOCATIONS}
              viewMode={viewMode}
            />
          </div>

          {/* Caption */}
          <p className="text-center text-xs sm:text-[13px] text-charcoal/70 mt-3.5 mb-7 font-body">
            {isNepali
              ? 'स्थानको विस्तृत जानकारी हेर्न नाममा थिच्नुहोस्। नक्सा डेटा © OpenStreetMap contributors.'
              : 'Tap a landmark name to open its page. Map data © OpenStreetMap contributors.'}
          </p>
        </ScrollReveal>

        {/* ── Side-by-Side Landmark Detail Cards ──────────────────────────── */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {/* 22 Dhara Card */}
            <Link
              href="/heritage/22-dhara"
              className="group bg-[#FDFBF7] border-2 border-[#5D4037]/25 rounded-2xl p-3.5 flex items-center gap-4 hover:border-burgundy hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-beige border border-charcoal/10">
                <Image
                  src="/images/22-dhara/vibrant-spouts.jpg"
                  alt="22 Dhara - Balaju Baisdhara"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-burgundy tracking-wide">
                  २२ धारा
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal group-hover:text-burgundy transition-colors">
                  22 Dhara
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 mt-0.5 leading-snug line-clamp-2">
                  Twenty-two stone water spouts
                </p>
              </div>
            </Link>

            {/* Pyah Thwam Ajima Card */}
            <Link
              href="/heritage/pyatho-ajima"
              className="group bg-[#FDFBF7] border-2 border-[#5D4037]/25 rounded-2xl p-3.5 flex items-center gap-4 hover:border-burgundy hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-beige border border-charcoal/10">
                <Image
                  src="/images/pyatho-ajima/hero.jpg"
                  alt="Pyah Thwam Ajima Shrine"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-burgundy tracking-wide">
                  प्याः थ्वं अजिमा
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal group-hover:text-burgundy transition-colors">
                  Pyah Thwam Ajima
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 mt-0.5 leading-snug line-clamp-2">
                  Protective mother-goddess shrine
                </p>
                <span className="text-[11px] text-charcoal/50 italic mt-1 font-sans">
                  Pin position approximate
                </span>
              </div>
            </Link>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
