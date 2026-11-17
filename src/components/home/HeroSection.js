'use client';

/**
 * src/components/home/HeroSection.js
 *
 * Cinematic full-viewport hero section with full bilingual (EN/NE) support.
 */

import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── Image configuration ──────────────────────────────────── */

/*
  PLACEHOLDER: Set to null until a real photograph is provided.
  When you have your heritage photo, change this to its path:
    const HERO_IMAGE_SRC = "/images/hero/hero-main.jpg";
*/
const HERO_IMAGE_SRC = null;

/*
  Update this alt text to accurately describe your photograph
  when you add the real image.
*/
const HERO_IMAGE_ALT =
  "Heritage site in Ward 16, Kathmandu — traditional Newari architecture";

/* ── Component ────────────────────────────────────────────── */

export default function HeroSection() {
  const { t, isNepali } = useLanguage();

  return (
    <section
      /*
        min-h-screen ensures the hero covers the full viewport.
        The fixed navbar is 64px tall (h-16). We don't add
        padding-top here — the content is vertically centred anyway,
        and the navbar is transparent so it overlays the hero.
      */
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >

      {/* ══════════════════════════════════════════════════
          LAYER 1: Background image or warm gradient fallback
          ══════════════════════════════════════════════════ */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_IMAGE_SRC ? (
          /*
            priority={true} — preloads the hero image so it appears
            immediately without a flash of empty space (LCP optimisation).
            fill — expands the image to cover the container.
            object-cover — crops to fill without stretching.
          */
          <Image
            src={HERO_IMAGE_SRC}
            alt={HERO_IMAGE_ALT}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          /*
            Placeholder: a rich, layered gradient that evokes the
            warm terracotta and deep burgundy of Newari architecture.
            This is intentionally beautiful — not a grey box.
          */
          <div
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse at 30% 60%, #702C38 0%, transparent 50%),
                radial-gradient(ellipse at 75% 30%, #A65F45 0%, transparent 45%),
                radial-gradient(ellipse at 55% 85%, #571F28 0%, transparent 50%),
                linear-gradient(160deg, #292521 0%, #3D3733 50%, #292521 100%)
              `,
            }}
          />
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          LAYER 2: Overlay — darkens the image for text legibility
          ══════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 bg-charcoal/55"
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════
          LAYER 3: Subtle dot pattern — traditional texture
          ══════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pattern-overlay opacity-20"
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════
          LAYER 4: Decorative border lines
          ══════════════════════════════════════════════════ */}
      {/* Top gold line */}
      <div
        className="absolute top-0 inset-x-0 h-px
                   bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden="true"
      />
      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px
                   bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />
      {/* Left vertical accent */}
      <div
        className="absolute left-6 lg:left-12 top-1/4 bottom-1/4 w-px
                   bg-gradient-to-b from-transparent via-gold/20 to-transparent"
        aria-hidden="true"
      />
      {/* Right vertical accent */}
      <div
        className="absolute right-6 lg:right-12 top-1/4 bottom-1/4 w-px
                   bg-gradient-to-b from-transparent via-gold/20 to-transparent"
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════
          LAYER 5: Content — text, buttons, decorative number
          ══════════════════════════════════════════════════ */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto">

        {/* ── Eyebrow label ── */}
        <p
          className="animate-fade-in delay-100
                     text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gold
                     font-body font-semibold mb-6"
        >
          {t("home.hero.eyebrow", "Kathmandu Metropolitan City · Ward No. 16")}
        </p>

        {/* ── Main heading ── */}
        <h1
          id="hero-heading"
          className="animate-fade-up delay-200
                     font-display font-semibold text-ivory leading-[1.08]
                     text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]"
        >
          {isNepali ? (
            <>
              जहाँ सम्पदा बाँच्छ,{" "}
              <span className="block italic text-gold font-serif">कथाहरू निरन्तर छन्।</span>
            </>
          ) : (
            <>
              Where Heritage Lives,{" "}
              <span className="block italic text-gold">Stories Continue.</span>
            </>
          )}
        </h1>

        {/* ── Decorative rule ── */}
        <div
          className="animate-fade-in delay-300
                     mt-8 mx-auto w-16 h-px bg-gold/50"
          aria-hidden="true"
        />

        {/* ── Supporting text ── */}
        <p
          className="animate-fade-up delay-400
                     mt-6 text-base sm:text-lg font-body text-ivory/70
                     max-w-xl mx-auto leading-relaxed"
        >
          {t(
            "home.hero.subtitle",
            "Discover the living heritage, cultural traditions, sacred spaces and stories that shape the identity of Ward 16, Kathmandu."
          )}
        </p>

        {/* ── CTA Buttons ── */}
        <div
          className="animate-fade-up delay-500
                     mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/explore-map" size="lg" variant="primary">
            {t("home.hero.exploreButton", "Explore Our Heritage")}
          </Button>
          <Button href="/ward" size="lg" variant="secondary">
            {t("home.hero.wardButton", "Discover Our Ward")}
          </Button>
        </div>

        {/* ── Decorative heritage badge / emblem ── */}
        <div
          className="animate-fade-in delay-600
                     mt-16 flex items-center justify-center gap-4"
          aria-hidden="true"
        >
          <div className="w-12 h-px bg-ivory/20" />
          <span className="text-gold/40 font-display text-sm tracking-[0.3em] uppercase">
            {t("home.hero.badge", "Est. heritage")}
          </span>
          <div className="w-12 h-px bg-ivory/20" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          LAYER 6: Scroll indicator — bottom centre
          ══════════════════════════════════════════════════ */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <ScrollIndicator label={isNepali ? "थप हेर्न तल स्क्रोल गर्नुहोस्" : "Scroll to explore"} />
      </div>
    </section>
  );
}
