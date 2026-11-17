"use client";

/**
 * src/components/home/CulturalHighlights.js
 *
 * "The Culture That Connects Us" section.
 *
 * Four cultural category tiles arranged in a responsive grid.
 */

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const CULTURAL_CATEGORIES = [
  {
    id: "architecture",
    number: "01",
    numberNepali: "०१",
    title: "Architecture & Sacred Spaces",
    titleNepali: "वास्तुकला र पवित्र स्थल",
    description:
      "The built heritage of Ward 16 reflects centuries of Newari craftsmanship — from water infrastructure and temple architecture to the spatial layout of community life.",
    descriptionNepali:
      "वडा नं. १६ को भौतिक सम्पदाले शताब्दीयौँ पुरानो नेवार शिल्पशैलीलाई झल्काउँछ — परम्परागत ढुङ्गेधारा, काष्ठकला, मन्दिर संरचना र स्थानीय आवासीय चोकको अद्वितीय स्वरूप।",
    imageSrc: null,
    imageAlt: "Traditional Newari architecture and sacred spaces in Ward 16, Kathmandu",
    placeholderColor: "#A65F45",
    placeholderAccent: "#702C38",
  },
  {
    id: "festivals",
    number: "02",
    numberNepali: "०२",
    title: "Festivals & Traditions",
    titleNepali: "चाडपर्व र परम्परा",
    description:
      "Seasonal festivals and cultural ceremonies mark the rhythm of community life, keeping alive traditions that connect generations to their shared heritage and beliefs.",
    descriptionNepali:
      "ऋतुअनुसार मनाइने चाडपर्व, बाइसधारा मेला र परम्परागत जात्राहरूले स्थानीय समुदायको जीवनशैलीलाई जीवन्त राख्दै पुस्तान्तरणको सेतु बनेका छन्।",
    imageSrc: null,
    imageAlt: "Cultural festivals and traditional celebrations in Ward 16, Kathmandu",
    placeholderColor: "#702C38",
    placeholderAccent: "#B89555",
  },
  {
    id: "community",
    number: "03",
    numberNepali: "०३",
    title: "Community & Living Heritage",
    titleNepali: "समुदाय र जीवन्त सम्पदा",
    description:
      "Heritage is not only preserved in monuments — it is carried forward through community practices, collective memory and the everyday acts of a people rooted in place.",
    descriptionNepali:
      "सम्पदा केवल ढुङ्गा र काठमा मात्र सीमित छैन — यो त गुठी परम्परा, स्थानीय दाफा भजन, सामूहिक सहकार्य र दैनिक जीवनमा निरन्तर प्रवाहित छ।",
    imageSrc: null,
    imageAlt: "Community life and living heritage in Ward 16, Kathmandu",
    placeholderColor: "#571F28",
    placeholderAccent: "#A65F45",
  },
  {
    id: "stories",
    number: "04",
    numberNepali: "०४",
    title: "Stories & Memories",
    titleNepali: "कथा र लोकस्मृति",
    description:
      "Every place carries stories. The oral histories, family memories and community narratives of Ward 16 form an invisible but essential layer of its living cultural archive.",
    descriptionNepali:
      "हरेक सम्पदास्थलसँग अनगिन्ती कथाहरू जोडिएका छन्। स्थानीय जेष्ठ नागरिकका मौखिक संस्मरण र पारिवारिक कथाहरू यस डिजिटल अभिलेखका अमूल्य सम्पत्ति हुन्।",
    imageSrc: null,
    imageAlt: "Stories and memories from the community of Ward 16, Kathmandu",
    placeholderColor: "#3D3733",
    placeholderAccent: "#B89555",
  },
];

/* ── Single cultural category tile ─────────────────────────── */
function CultureTile({ item, delay = 0 }) {
  const { isNepali } = useLanguage();

  const displayTitle = isNepali ? item.titleNepali : item.title;
  const displayDesc = isNepali ? item.descriptionNepali : item.description;
  const displayNumber = isNepali ? item.numberNepali : item.number;

  return (
    <ScrollReveal animation="fade-up" delay={delay}>
      <article
        className="group relative overflow-hidden bg-charcoal aspect-[4/5] flex flex-col
                   cursor-default"
        aria-label={displayTitle}
      >
        {/* Background image or placeholder */}
        <div className="absolute inset-0" aria-hidden="true">
          {item.imageSrc ? (
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            /* Placeholder gradient — unique per category */
            <div
              className="w-full h-full"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 50%,
                    ${item.placeholderAccent}40 0%,
                    ${item.placeholderColor} 60%,
                    #292521 100%
                  )
                `,
              }}
            />
          )}
        </div>

        {/* Dark gradient overlay — always present for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t
                     from-charcoal/90 via-charcoal/30 to-transparent
                     transition-opacity duration-500
                     group-hover:from-charcoal/95 group-hover:via-charcoal/50"
          aria-hidden="true"
        />

        {/* Content — pinned to bottom */}
        <div className="relative z-10 mt-auto p-6 sm:p-7">
          {/* Category number */}
          <span
            className="block text-[11px] uppercase tracking-[0.25em] text-gold/70
                       font-body font-semibold mb-3"
            aria-hidden="true"
          >
            {displayNumber}
          </span>

          {/* Title */}
          <h3 className="font-display text-ivory font-semibold leading-snug text-xl sm:text-2xl">
            {displayTitle}
          </h3>

          {/* Description — slides up on hover */}
          <div
            className="overflow-hidden transition-all duration-500
                       max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100"
          >
            <p className="mt-3 text-sm font-body text-ivory/65 leading-relaxed">
              {displayDesc}
            </p>
          </div>

          {/* Gold bottom line — grows on hover */}
          <div
            className="mt-4 h-px bg-gold/40 transition-all duration-500
                       w-8 group-hover:w-full group-hover:bg-gold"
            aria-hidden="true"
          />
        </div>
      </article>
    </ScrollReveal>
  );
}

/* ── Main section component ─────────────────────────────────── */
export default function CulturalHighlights() {
  const { t } = useLanguage();

  return (
    <section
      id="cultural-highlights"
      className="bg-ivory py-20 sm:py-28"
      aria-labelledby="cultural-highlights-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal animation="fade-up">
          <SectionHeading
            eyebrow={t("home.culture.eyebrow", "Intangible Culture")}
            title={t("home.culture.title", "The Culture That Connects Us")}
            body={t(
              "home.culture.subtitle",
              "Beyond stone and brick, our heritage lives in the traditions, rituals and shared memories of the community."
            )}
            align="center"
            as="h2"
          />
        </ScrollReveal>

        {/* 4-column category grid */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CULTURAL_CATEGORIES.map((item, index) => (
            <CultureTile
              key={item.id}
              item={item}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
