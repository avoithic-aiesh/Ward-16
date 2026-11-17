"use client";

/**
 * src/components/home/FeaturedHeritage.js
 *
 * "Explore Our Heritage" section — large editorial cards for the
 * two featured landmark sites: 22 Dhara and Pyatho Ajima Temple.
 */

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

/* Heritage site data for the two featured landmarks */
const FEATURED_SITES = [
  {
    number: "01",
    numberNepali: "०१",
    name: "22 Dhara",
    nameNepali: "बाइस धारा",
    subtitle: "Balaju Baisdhara",
    subtitleNepali: "बालाजु बाइसधारा",
    category: "Water Shrine",
    categoryNepali: "जल तीर्थ",
    description:
      "Explore the historic water heritage and cultural significance of Balaju Baisdhara, known for its traditional stone water spouts and surrounding sacred landscape.",
    descriptionNepali:
      "ऐतिहासिक बालाजु बाइसधाराको परम्परागत ढुङ्गेधारा, धार्मिक महत्त्व र यस वरिपरिको पवित्र प्राकृतिक तथा सांस्कृतिक परिदृश्यको अन्वेषण गर्नुहोस्।",
    href: "/heritage/22-dhara",
    imageSrc: null,
    imageAlt:
      "22 Dhara — Balaju Baisdhara, the traditional stone water spouts of Ward 16, Kathmandu",
    placeholderGradient: `
      radial-gradient(ellipse at 25% 60%, rgba(112,44,56,0.6) 0%, transparent 55%),
      radial-gradient(ellipse at 75% 30%, rgba(166,95,69,0.5) 0%, transparent 50%),
      linear-gradient(150deg, #292521 0%, #3D3733 60%, #292521 100%)
    `,
  },
  {
    number: "02",
    numberNepali: "०२",
    name: "Pyatho Ajima Temple",
    nameNepali: "प्याठो अजिमा मन्दिर",
    subtitle: "Sacred Ajima Shrine",
    subtitleNepali: "पवित्र अजिमा पीठ",
    category: "Temple",
    categoryNepali: "मन्दिर",
    description:
      "Discover the sacred heritage of Pyatho Ajima Temple and its place within the cultural and spiritual life of the local Newar community.",
    descriptionNepali:
      "काठमाडौँ वडा नं. १६ को स्थानीय नेवार समुदायको आध्यात्मिक, सामाजिक र सांस्कृतिक जीवनमा प्याठो अजिमा मन्दिरको स्थान र महत्त्व बुझ्नुहोस्।",
    href: "/heritage/pyatho-ajima",
    imageSrc: null,
    imageAlt:
      "Pyatho Ajima Temple — the sacred Ajima shrine in Ward 16, Kathmandu",
    placeholderGradient: `
      radial-gradient(ellipse at 70% 40%, rgba(166,95,69,0.55) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 70%, rgba(87,31,40,0.6) 0%, transparent 55%),
      linear-gradient(160deg, #3D3733 0%, #292521 50%, #3D3733 100%)
    `,
  },
];

/* ── Sub-component: single editorial heritage card ──────────── */
function HeritageFeatureCard({ site, reversed = false }) {
  const { t, isNepali } = useLanguage();

  const displayName = isNepali ? site.nameNepali : site.name;
  const secondaryName = isNepali ? site.name : site.nameNepali;
  const displaySubtitle = isNepali ? site.subtitleNepali : site.subtitle;
  const displayCategory = isNepali ? site.categoryNepali : site.category;
  const displayDesc = isNepali ? site.descriptionNepali : site.description;
  const displayNumber = isNepali ? site.numberNepali : site.number;

  return (
    <article
      className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-0
                  overflow-hidden border border-beige`}
      aria-label={`Heritage site: ${displayName}`}
    >
      {/* ── Image panel ── */}
      <div
        className={`relative min-h-[320px] sm:min-h-[400px] lg:min-h-[500px]
                    overflow-hidden
                    ${reversed ? "lg:order-2" : "lg:order-1"}`}
      >
        {site.imageSrc ? (
          <Image
            src={site.imageSrc}
            alt={site.imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out
                       group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          /* Placeholder — rich gradient */
          <div
            className="w-full h-full"
            style={{ background: site.placeholderGradient }}
            aria-label={`Image placeholder — ${site.imageAlt}`}
          >
            {/* Placeholder indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-gold/15 font-display text-9xl font-semibold select-none">
                {displayNumber}
              </span>
              <p className="text-[10px] uppercase tracking-widest text-ivory/20 font-body">
                {`Add image: public/images/${
                  site.name === "22 Dhara" ? "22-dhara" : "pyatho-ajima"
                }/main.jpg`}
              </p>
            </div>
          </div>
        )}

        {/* Category badge — overlaid on image */}
        <span
          className="absolute top-5 left-5 px-3 py-1 text-[10px] uppercase tracking-widest
                     font-body font-semibold bg-charcoal/80 text-gold backdrop-blur-sm"
        >
          {displayCategory}
        </span>
      </div>

      {/* ── Text panel ── */}
      <div
        className={`relative flex flex-col justify-center bg-ivory p-8 sm:p-10 lg:p-14
                    ${reversed ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Large decorative number */}
        <span
          className="absolute top-6 right-8 font-display text-7xl font-semibold
                     text-beige leading-none select-none"
          aria-hidden="true"
        >
          {displayNumber}
        </span>

        {/* Secondary name */}
        <span className="text-sm font-body text-gold mb-1 tracking-wide">
          {secondaryName}
        </span>

        {/* Primary name */}
        <h3 className="font-display text-charcoal font-semibold leading-tight
                       text-2xl sm:text-3xl lg:text-[2.25rem]">
          {displayName}
        </h3>

        {/* Subtitle */}
        <p className="mt-1 text-sm font-body text-charcoal-soft italic">
          {displaySubtitle}
        </p>

        {/* Gold divider */}
        <div className="mt-5 w-10 h-px bg-gold" aria-hidden="true" />

        {/* Description */}
        <p className="mt-5 font-body text-charcoal-soft leading-relaxed text-[1rem]">
          {displayDesc}
        </p>

        {/* Explore link */}
        <Link
          href={site.href}
          className="mt-8 inline-flex items-center gap-2 group/link
                     text-sm uppercase tracking-widest font-body font-semibold text-burgundy
                     hover:text-gold transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                     focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          aria-label={`Explore ${displayName}`}
        >
          <span>{t("common.explore", "Explore")}</span>
          <span
            className="transition-transform duration-200 group-hover/link:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

/* ── Main section component ─────────────────────────────────── */
export default function FeaturedHeritage() {
  const { t } = useLanguage();

  return (
    <section
      id="featured-heritage"
      className="bg-beige/30"
      aria-labelledby="featured-heritage-heading"
    >
      {/* Top rule */}
      <div className="h-px bg-beige" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 sm:pb-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            eyebrow={t("home.featured.eyebrow", "Heritage Landmarks")}
            title={t("home.featured.title", "Explore Our Heritage")}
            body={t("home.featured.subtitle", "Discover the places that preserve the cultural identity of Ward 16.")}
            align="center"
            as="h2"
          />
        </ScrollReveal>
      </div>

      {/* Cards — full width, no side padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 space-y-6">
        {FEATURED_SITES.map((site, index) => (
          <ScrollReveal
            key={site.name}
            animation="fade-up"
            delay={index * 150}
          >
            <HeritageFeatureCard
              site={site}
              reversed={index % 2 !== 0}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
