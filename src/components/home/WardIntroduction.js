/**
 * src/components/home/WardIntroduction.js
 *
 * Editorial two-column introduction to Ward 16.
 *
 * Layout (desktop):
 *   Left  — Section number, heading, body text, decorative rule
 *   Right — Large heritage photograph (or textured placeholder)
 *
 * On mobile both columns stack vertically (image below text).
 *
 * IMAGE:
 * ─────────────────────────────────────────────────────────────
 * To add your heritage photo for this section:
 *   1. Copy image to: public/images/heritage/ward-intro.jpg
 *   2. Set INTRO_IMAGE_SRC = "/images/heritage/ward-intro.jpg"
 *   3. Update INTRO_IMAGE_ALT with an accurate description
 * ─────────────────────────────────────────────────────────────
 *
 * CONTENT RULES:
 * The text below is general and accurate — no specific historical
 * dates or statistics have been invented. When verified community
 * content is available, replace the placeholder text.
 */

'use client';

/**
 * src/components/home/WardIntroduction.js
 *
 * Editorial two-column introduction to Ward 16 with bilingual support.
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

/* Image configuration — set to null until a real photo is provided */
const INTRO_IMAGE_SRC = null;
const INTRO_IMAGE_ALT =
  "Heritage landscape of Ward 16, Kathmandu — traditional architecture and cultural spaces";

export default function WardIntroduction() {
  const { t, isNepali } = useLanguage();
  return (
    <section
      id="ward-intro"
      className="relative bg-ivory overflow-hidden"
      aria-labelledby="ward-intro-heading"
    >
      {/* Top beige band — visual separation from hero */}
      <div className="h-px bg-beige" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT COLUMN: Text ── */}
          <div className="order-2 lg:order-1">

            {/* Section number — decorative editorial device */}
            <ScrollReveal animation="fade-left" delay={0}>
              <span
                className="block font-display text-[6rem] font-semibold leading-none
                           text-beige select-none mb-2 -ml-1"
                aria-hidden="true"
              >
                01
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={100}>
              {/* Eyebrow */}
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gold
                               font-body font-semibold mb-4">
                {t("home.wardIntro.eyebrow", "Our Ward")}
              </span>

              {/* Heading */}
              <h2
                id="ward-intro-heading"
                className="font-display text-charcoal font-semibold leading-tight
                           text-3xl sm:text-4xl lg:text-[2.75rem]"
              >
                {isNepali ? (
                  <>
                    इतिहास र आस्थाको संगम।{" "}
                    <span className="italic text-burgundy font-serif">जीवन्त सम्पदा।</span>
                  </>
                ) : (
                  <>
                    More Than a Place.{" "}
                    <span className="italic text-burgundy">A Living Heritage.</span>
                  </>
                )}
              </h2>
            </ScrollReveal>

            {/* Gold divider */}
            <ScrollReveal animation="fade-in" delay={200}>
              <div className="mt-6 w-12 h-px bg-gold" aria-hidden="true" />
            </ScrollReveal>

            {/* Body paragraphs */}
            <ScrollReveal animation="fade-left" delay={250}>
              <div className="mt-6 space-y-4 font-body text-charcoal-soft leading-relaxed text-[1.0625rem]">
                <p>
                  {t(
                    "home.wardIntro.paragraph1",
                    "Kathmandu Metropolitan City Ward No. 16 is a dynamic urban landscape where historic shrines, traditional waterworks, and generations of Newar cultural heritage intersect with contemporary city life."
                  )}
                </p>
                <p>
                  {t(
                    "home.wardIntro.paragraph2",
                    "From the forested slopes of Nagarjun to the bustling residential courtyards of Balaju and Sorhakhutte, the ward preserves sacred landmarks that have anchored community rituals for centuries."
                  )}
                </p>
              </div>
            </ScrollReveal>

            {/* Decorative bottom accent */}
            <ScrollReveal animation="fade-in" delay={350}>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-8 h-px bg-gold/40" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal-soft/60 font-body">
                  Kathmandu · Nepal
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN: Image ── */}
          <div className="order-1 lg:order-2">
            <ScrollReveal animation="fade-right" delay={150}>
              {/* Outer frame with gold corner accents */}
              <div className="relative">

                {/* Corner accent: top-left */}
                <span className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold z-10" aria-hidden="true" />
                {/* Corner accent: bottom-right */}
                <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold z-10" aria-hidden="true" />

                {/* Image container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                  {INTRO_IMAGE_SRC ? (
                    <Image
                      src={INTRO_IMAGE_SRC}
                      alt={INTRO_IMAGE_ALT}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    /*
                      Placeholder panel — clearly not a real photograph.
                      Replace by setting INTRO_IMAGE_SRC above.
                    */
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-4 p-8"
                      style={{
                        background: `
                          radial-gradient(ellipse at 40% 40%, rgba(166,95,69,0.15) 0%, transparent 60%),
                          radial-gradient(ellipse at 70% 70%, rgba(112,44,56,0.12) 0%, transparent 50%),
                          #E9DFCF
                        `,
                      }}
                    >
                      {/* Decorative Nepali-inspired motif */}
                      <span className="text-gold/25 text-8xl font-display select-none">◈</span>
                      <div className="text-center">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal-soft/40 font-body">
                          Heritage photograph
                        </p>
                        <p className="text-[10px] text-charcoal-soft/30 font-body mt-1">
                          Add image: public/images/heritage/ward-intro.jpg
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Caption strip below image */}
                <div className="mt-3 pl-1 flex items-center justify-between">
                  <p className="text-xs font-body italic text-charcoal-soft/60">
                    Ward No. 16, Kathmandu Metropolitan City
                  </p>
                  <div className="w-6 h-px bg-gold/40" aria-hidden="true" />
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
