"use client";

/**
 * src/components/home/ExploreCTA.js
 *
 * "Every Place Has a Story" — closing call-to-action section
 * before the footer.
 */

import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

/* Optional background photograph — set to null until provided */
const CTA_IMAGE_SRC = null;
const CTA_IMAGE_ALT = "Heritage panorama of Ward 16, Kathmandu";

export default function ExploreCTA() {
  const { t, isNepali } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-charcoal"
      aria-labelledby="cta-heading"
    >
      {/* Optional background image */}
      {CTA_IMAGE_SRC && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={CTA_IMAGE_SRC}
            alt={CTA_IMAGE_ALT}
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
          />
        </div>
      )}

      {/* Dot pattern texture */}
      <div className="absolute inset-0 pattern-overlay opacity-30" aria-hidden="true" />

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/80"
        aria-hidden="true"
      />

      {/* Decorative top border */}
      <div
        className="absolute top-0 inset-x-0 h-px
                   bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8
                      py-24 sm:py-32 lg:py-40 text-center">

        {/* Top ornament */}
        <ScrollReveal animation="fade-in">
          <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-gold/50 font-display text-lg">◈</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </ScrollReveal>

        {/* Eyebrow */}
        <ScrollReveal animation="fade-up" delay={100}>
          <span className="block text-[11px] uppercase tracking-[0.3em] text-gold
                           font-body font-semibold mb-6">
            {t("home.cta.eyebrow", "Preserving Our Heritage Together")}
          </span>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal animation="fade-up" delay={200}>
          {isNepali ? (
            <h2
              id="cta-heading"
              className="font-display font-semibold text-ivory leading-tight
                         text-3xl sm:text-4xl lg:text-5xl"
            >
              हरेक सम्पदासँग कथा हुन्छ।{" "}
              <span className="block mt-1 italic text-gold">
                हरेक कथा संरक्षण योग्य हुन्छ।
              </span>
            </h2>
          ) : (
            <h2
              id="cta-heading"
              className="font-display font-semibold text-ivory leading-tight
                         text-3xl sm:text-4xl lg:text-5xl"
            >
              Every Place Has a Story.{" "}
              <span className="block mt-1 italic text-gold">
                Every Story Deserves to Be Preserved.
              </span>
            </h2>
          )}
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal animation="fade-in" delay={300}>
          <div className="mt-8 mx-auto w-12 h-px bg-gold/40" aria-hidden="true" />
        </ScrollReveal>

        {/* Supporting text */}
        <ScrollReveal animation="fade-up" delay={350}>
          <p className="mt-6 text-base sm:text-lg font-body text-ivory/60
                        max-w-xl mx-auto leading-relaxed">
            {t(
              "home.cta.description",
              "Join us in exploring, documenting and celebrating the living heritage of Ward 16, Kathmandu."
            )}
          </p>
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal animation="fade-up" delay={450}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/explore-map" size="lg" variant="primary">
              {t("home.cta.buttonExplore", "Begin Exploring")}
            </Button>
            <Button href="/about" size="lg" variant="secondary">
              {t("home.cta.buttonAbout", "About the Project")}
            </Button>
          </div>
        </ScrollReveal>

        {/* Bottom ornament */}
        <ScrollReveal animation="fade-in" delay={500}>
          <div className="flex items-center justify-center gap-4 mt-16" aria-hidden="true">
            <div className="w-8 h-px bg-gold/20" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/20 font-body">
              {isNepali ? "काठमाडौँ महानगरपालिका · वडा नं. १६" : "Ward 16 · Kathmandu"}
            </span>
            <div className="w-8 h-px bg-gold/20" />
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-px
                   bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
