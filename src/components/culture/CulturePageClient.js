"use client";

/**
 * src/components/culture/CulturePageClient.js
 *
 * Dedicated editorial page for "Culture & Traditions" in Ward 16.
 * Documents intangible cultural heritage, Guthi institutions, Dafa music,
 * sacred festivals, and living Newari traditions.
 */

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CulturePageClient() {
  const { isNepali } = useLanguage();

  const culturalPillars = [
    {
      number: "01",
      title: isNepali ? "परम्परागत जल संस्कृति र हिटी प्रणाली" : "Traditional Water Culture & Hiti Systems",
      subtitle: isNepali ? "नागार्जुनका मूल र ढुङ्गेधारा इन्जिनियरिङ" : "Sacred Aquifers & Subterranean Engineering",
      desc: isNepali
        ? "काठमाडौँका ढुङ्गेधारा (हिटी) केवल पानी पिउने धारा मात्र होइनन्; यी त प्रकृति, धर्म र समुदायलाई एकाकार गर्ने पवित्र इन्जिनियरिङ हुन्। बाइसधारामा मकरको मुखबाट बग्ने कञ्चन जललाई दैवी ऊर्जा र औषधीय गुण भएको मानिन्छ।"
        : "Traditional stone water spouts (Hitis) embody a sophisticated synthesis of hydrology and spiritual reverence. Filtered naturally through mountain gravel, the water issuing from carved Makara spouts at Balaju sustains centuries-old purification rites.",
      linkText: isNepali ? "२२ धाराको वास्तुकला हेर्नुहोस् →" : "Explore 22 Dhara Hydraulic Archive →",
      href: "/heritage/22-dhara",
    },
    {
      number: "02",
      title: isNepali ? "मातृका देवी र प्याठो अजिमा परम्परा" : "Matrika Deity Traditions & Pyatho Ajima",
      subtitle: isNepali ? "संरक्षक देवी र टोलको आध्यात्मिक आस्था" : "The Guardian Mother Goddess & Neighborhood Faith",
      desc: isNepali
        ? "नेवार सभ्यतामा 'अजिमा' (हजुरआमा / मातृका देवी) लाई टोल, बस्ती र बालबच्चाको रक्षा गर्ने देवीका रूपमा पुजिन्छ। प्याठो अजिमा मन्दिर वडा १६ को शक्तिशाली शक्तिपीठ हो, जहाँ रोगव्याधिबाट सुरक्षा र पारिवारिक सुखका लागि पूजा गरिन्छ।"
        : "In Newar cosmology, the Ajima deities represent maternal protector spirits safeguarding neighborhoods from sickness and misfortune. Pyatho Ajima Temple is an active spiritual sanctuary holding regular worship, guthi rituals, and annual processions.",
      linkText: isNepali ? "प्याठो अजिमाको इतिहास पढ्नुहोस् →" : "Read Pyatho Ajima Temple History →",
      href: "/heritage/pyatho-ajima",
    },
    {
      number: "03",
      title: isNepali ? "दाफा भजन र परम्परागत सांगीतिक सम्पदा" : "Dafa Bhajan & Sacred Devotional Music",
      subtitle: isNepali ? "गुँला पर्व र साँझको शास्त्रीय राग" : "Ancient Evening Ragas and Community Singing",
      desc: isNepali
        ? "हरेक साँझ मन्दिरका पाटीहरूमा स्थानीय दाफा खलः (भजन समूह) भेला भएर खिं, ताः र बभु बाजाको तालमा प्राचीन रागहरू गाउँछन्। विशेषगरी पवित्र गुँला महिनाभरि यो सांगीतिक परम्पराले बस्तीलाई अध्यात्मको लयमा बाँध्छ।"
        : "Dafa Bhajan represents the oldest surviving classical communal singing tradition in the Kathmandu Valley. Local singing guilds gather at temple colonnades with traditional drums and cymbals to perform ancient ragas tuned to the hours of dusk.",
      linkText: isNepali ? "सामुदायिक दाफा संस्मरण सुन्नुहोस् →" : "Explore Dafa Bhajan Oral Memories →",
      href: "/community-archive/pyatho-ajima-dafa-tradition",
    },
    {
      number: "04",
      title: isNepali ? "गुठी व्यवस्था र सामाजिक सहकार्य" : "The Guthi System & Social Kinship",
      subtitle: isNepali ? "सम्पदा संरक्षणको सामाजिक मेरुदण्ड" : "The Civic Backbone of Living Heritage",
      desc: isNepali
        ? "गुठी भनेको शताब्दीयौँदेखि सम्पदाको संरक्षण, चाडपर्वको सञ्चालन र सामुदायिक काम गर्न स्थापित सामाजिक संस्था हो। सरकारी निकाय हुनुभन्दा धेरै पहिलेदेखि स्थानीय गुठीहरूले नै मन्दिर, पाटी र ढुङ्गेधाराको मर्मत गर्दै आएका छन्।"
        : "The Guthi system is an indigenous socio-religious cooperative that has sustained monuments and communal life for over a millennium. Guthis manage festival funding, temple upkeep, and mutual assistance without relying on state bureaucracy.",
      linkText: isNepali ? "सामुदायिक अभिलेखालय हेर्नुहोस् →" : "Browse Community Guthi Stories →",
      href: "/community-archive",
    },
  ];

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-ivory pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-25 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 85% 20%, rgba(184,149,85,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 15% 80%, rgba(112,44,56,0.35) 0%, transparent 55%)
            `,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-[11px] uppercase tracking-widest text-gold mb-6 font-mono">
            <span>◈</span>
            <span>{isNepali ? "काठमाडौँ वडा १६ को अमूर्त संस्कृति" : "Intangible Cultural Heritage"}</span>
            <span>◈</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ivory max-w-4xl mx-auto leading-tight">
            {isNepali ? "संस्कृति र जीवित परम्पराहरू" : "Culture & Living Traditions"}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ivory/70 max-w-2xl mx-auto leading-relaxed font-body">
            {isNepali
              ? "ढुङ्गा र काठभन्दा पर, हाम्रो सम्पदा स्थानीय समुदायका चाडपर्व, बाजा, भजन, गुठी र पुस्तान्तरित परम्परामा बाँचिरहेको छ।"
              : "Beyond ancient stone and carved brick, our heritage lives within seasonal rituals, sacred melodies, cooperative kinship, and the collective memory of the neighborhood."}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/community-archive"
              className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-light text-ivory font-body font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md"
            >
              {isNepali ? "सामुदायिक कथाहरू पढ्नुहोस् →" : "Explore Community Stories →"}
            </Link>
            <a
              href="#cultural-pillars"
              className="px-6 py-3.5 bg-charcoal/80 hover:bg-charcoal text-ivory/80 hover:text-ivory font-body font-medium text-xs rounded-sm border border-gold/30 transition-all duration-200"
            >
              {isNepali ? "प्रमुख परम्पराहरू ↓" : "View Traditions ↓"}
            </a>
          </div>
        </div>
      </section>

      {/* Main Pillars Section */}
      <section id="cultural-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-16">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            eyebrow={isNepali ? "संस्कृतिका चार स्तम्भहरू" : "The Core Cultural Pillars"}
            title={isNepali ? "हाम्रो पहिचान जोगाउने जीवित परम्पराहरू" : "The Living Traditions That Define Ward 16"}
            body={
              isNepali
                ? "यी परम्पराहरूले पुस्ताहरूलाई एकताबद्ध गर्दै स्थानीय समुदायको मौलिकता र आत्मीयतालाई जोगाएका छन्।"
                : "Explore the ritual rhythms, sacred water stewardship, and communal kinship that sustain neighborhood memory."
            }
            align="center"
          />
        </ScrollReveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {culturalPillars.map((pillar) => (
            <article
              key={pillar.number}
              className="bg-ivory border border-beige hover:border-gold/60 p-8 sm:p-10 rounded-sm shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="font-display text-4xl sm:text-5xl font-semibold text-gold/40 block">
                  {pillar.number}
                </span>
                <span className="text-xs uppercase font-mono tracking-widest text-burgundy font-semibold block">
                  {pillar.subtitle}
                </span>
                <h3 className="font-display font-semibold text-2xl text-charcoal">
                  {pillar.title}
                </h3>
                <div className="w-12 h-px bg-gold/50" />
                <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-body">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-beige/60">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-burgundy hover:text-gold transition-colors"
                >
                  <span>{pillar.linkText}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Annual Festivals Banner */}
        <div className="p-8 sm:p-12 bg-charcoal text-ivory rounded-sm border border-gold/40 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-gold">
              ◈ {isNepali ? "वार्षिक चाडपर्व तालिका" : "Annual Heritage Celebrations"}
            </span>
            <span className="text-xs font-mono text-ivory/50">
              {isNepali ? "वडा १६, काठमाडौँ" : "Ward 16 Cultural Calendar"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-body">
            <div className="space-y-1.5">
              <span className="text-gold font-semibold block text-base font-display">
                {isNepali ? "बाइसधारा मेला (चैत्र पूर्णिमा)" : "Baisdhara Mela (Chaitra Purnima)"}
              </span>
              <p className="text-xs text-ivory/70 leading-relaxed">
                {isNepali
                  ? "चैत्र शुक्ल पूर्णिमाको दिन हजारौँ भक्तजनहरू बाइसधारामा पवित्र स्नान गर्न र बालाजु उद्यानमा भेला हुन्छन्।"
                  : "Thousands of devotees from across Nepal gather at Balaju to take a sacred bath in the 22 spouts on the full moon of Chaitra."}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-gold font-semibold block text-base font-display">
                {isNepali ? "गुँला पर्व (नेपाल संवत्)" : "Gunla Sacred Month"}
              </span>
              <p className="text-xs text-ivory/70 leading-relaxed">
                {isNepali
                  ? "एक महिनाभरि बिहान र साँझ मन्दिरहरूमा दाफा भजन गाउने र परम्परागत बाजा बजाउने पवित्र आध्यात्मिक पर्व।"
                  : "A month-long period of spiritual discipline, early morning pilgrimages, and daily Dafa performances across neighborhood shrines."}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-gold font-semibold block text-base font-display">
                {isNepali ? "प्याठो अजिमा जात्रा" : "Pyatho Ajima Annual Jatra"}
              </span>
              <p className="text-xs text-ivory/70 leading-relaxed">
                {isNepali
                  ? "टोलको सुरक्षा र कल्याणका लागि स्थानीय गुठीले आयोजना गर्ने विशेष पूजा, भोज र सांस्कृतिक अनुष्ठान।"
                  : "Special Guthi rituals, communal feasts (Samay Baji), and blessing ceremonies conducted by hereditary custodians."}
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Community Archive */}
        <div className="text-center pt-8 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal">
            {isNepali ? "तपाईंको आफ्नै पारिवारिक परम्परा वा कथा छ?" : "Do you have a personal tradition or family memory to share?"}
          </h2>
          <p className="text-sm text-charcoal/70 max-w-lg mx-auto">
            {isNepali
              ? "वडा १६ को सामुदायिक सम्पदा अभिलेखालयमा आफ्नो कथा पठाउनुहोस् र हाम्रो जीवित इतिहास सुरक्षित गर्न मद्दत गर्नुहोस्।"
              : "Contribute to the Ward 16 Community Heritage Archive to ensure our oral histories and cultural practices are remembered."}
          </p>
          <div className="pt-2">
            <Link
              href="/community-archive/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy hover:bg-burgundy-light text-ivory font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-md"
            >
              <span>{isNepali ? "कथा बुझाउनुहोस्" : "Share Your Story"}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
