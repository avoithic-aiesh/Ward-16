"use client";

/**
 * src/components/ward/WardPageClient.js
 *
 * Dedicated editorial page for "Our Ward" (Ward No. 16, Kathmandu Metropolitan City).
 * Documents geography, demographics, civic history, and living neighborhood heritage.
 */

import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function WardPageClient() {
  const { isNepali } = useLanguage();

  const wardStats = [
    { value: "16", label: isNepali ? "काठमाडौँ महानगरपालिका वडा नं." : "Kathmandu Metropolitan Ward" },
    { value: "02", label: isNepali ? "प्रमुख विश्वप्रसिद्ध सम्पदा क्षेत्रहरू" : "Featured Historic Landmarks" },
    { value: "300+", label: isNepali ? "वर्ष पुरानो जीवन्त संस्कृति" : "Years of Living Traditions" },
    { value: "100%", label: isNepali ? "नागरिक संरक्षण प्रतिबद्धता" : "Community Stewardship" },
  ];

  const neighborhoods = [
    {
      name: isNepali ? "बालाजु (बाइसधारा क्षेत्र)" : "Balaju (Baisdhara Enclave)",
      image: "/images/22-dhara/hero.jpg",
      desc: isNepali
        ? "प्राकृतिक पानीका मूल, ऐतिहासिक ढुङ्गेधारा, बाइसधारा उद्यान र नागार्जुन फेदीको हरियालीले घेरिएको पवित्र जलतीर्थ क्षेत्र।"
        : "Historic water heritage precinct nestled at the foot of Nagarjun forest, anchored by the iconic 22 stone spouts and natural springs.",
    },
    {
      name: isNepali ? "सोह्रखुट्टे र नयाँबजार" : "Sorhakhutte & Nayabazar",
      image: "/images/pyatho-ajima/wood-carving.jpg",
      desc: isNepali
        ? "काठमाडौँ उपत्यकाको पुरानो व्यापारिक मार्ग र परम्परागत नेवार बस्ती, जहाँ पाटी, सत्तल र आवासीय चोकहरू संरक्षित छन्।"
        : "Historic gateway neighborhood featuring traditional Newar courtyards (Nanani), historic rest houses (Patis), and bustling commerce.",
    },
    {
      name: isNepali ? "प्याठो अजिमा परिसर" : "Pyatho Ajima Sacred Precinct",
      image: "/images/pyatho-ajima/hero.jpg",
      desc: isNepali
        ? "स्थानीय नेवार समुदायको आध्यात्मिक र मातृका शक्तिको केन्द्र, जहाँ दैनिक पूजा, दाफा भजन र गुठी परम्परा अक्षुण्ण छ।"
        : "Vibrant spiritual sanctuary of the protective Matrika goddess, preserving ancient devotional hymns (Dafa) and Guthi kinship systems.",
    },
    {
      name: isNepali ? "वनस्थली र रानीवन फेदी" : "Banasthali & Raniban Slopes",
      image: "/images/22-dhara/heritage-garden.jpg",
      desc: isNepali
        ? "नागार्जुन राष्ट्रिय निकुञ्जको सीमासँग जोडिएको क्षेत्र, जहाँ हरियाली प्राकृतिक वातावरण र सहरी जनजीवनको संगम देखिन्छ।"
        : "Serene residential and ecological transition zone adjoining the protected Nagarjun Forest Reserve and western ridge.",
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
              radial-gradient(ellipse at 80% 25%, rgba(184,149,85,0.18) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(112,44,56,0.3) 0%, transparent 55%)
            `,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-[11px] uppercase tracking-widest text-gold mb-6 font-mono">
            <span>◈</span>
            <span>{isNepali ? "काठमाडौँ महानगरपालिका" : "Kathmandu Metropolitan City"}</span>
            <span>◈</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ivory max-w-4xl mx-auto leading-tight">
            {isNepali ? "हाम्रो वडा — वडा नं. १६" : "Our Ward — Ward No. 16"}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ivory/70 max-w-2xl mx-auto leading-relaxed font-body">
            {isNepali
              ? "नागार्जुन पर्वतको हरियाली फेदीदेखि बालाजु र सोह्रखुट्टेका ऐतिहासिक चोकसम्म फैलिएको इतिहास, संस्कृति र स्थानीय जीवनको संगम।"
              : "A dynamic urban territory where centuries of Newari water engineering, sacred Matrika shrines, and modern neighborhood life converge."}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/explore-map"
              className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-light text-ivory font-body font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md"
            >
              {isNepali ? "वडा नक्सा हेर्नुहोस् →" : "Explore Ward Map →"}
            </Link>
            <Link
              href="/community-archive"
              className="px-6 py-3.5 bg-charcoal/80 hover:bg-charcoal text-ivory/80 hover:text-ivory font-body font-medium text-xs rounded-sm border border-gold/30 transition-all duration-200"
            >
              {isNepali ? "सामुदायिक संस्मरणहरू" : "Community Archive"}
            </Link>
          </div>
        </div>
      </section>

      {/* Ward Statistics Strip */}
      <section className="bg-beige/40 border-y border-beige py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {wardStats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-burgundy block">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-charcoal/70 font-body block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal animation="fade-up">
              <SectionHeading
                eyebrow={isNepali ? "भौगोलिक तथा ऐतिहासिक परिचय" : "Geographic & Historical Identity"}
                title={
                  isNepali
                    ? "परम्परा र सहरी आधुनिकताको संगम"
                    : "Where Sacred Water Meets Ancient Pathways"
                }
                body={
                  isNepali
                    ? "काठमाडौँ महानगरपालिका वडा नं. १६ उपत्यकाको उत्तर-पश्चिमी रणनीतिक प्रवेशद्वार हो। यस क्षेत्रले उपत्यकाको मुख्य सहरी केन्द्रलाई नागार्जुन वन र त्रिशूलीतर्फ जाने प्राचीन पदमार्गसँग जोड्दछ।"
                    : "Ward 16 occupies the north-western flank of the Kathmandu Valley, bridging the urban heart of the capital with the forested slopes of Nagarjun and ancient trade passages to the north."
                }
              />
            </ScrollReveal>

            <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-body">
              {isNepali
                ? "यहाँका परम्परागत नेवार बस्तीहरूमा रहेका ढुङ्गेधारा (हिटी), इनार, पाटी, पोखरी र मन्दिरहरूले हाम्रा पुर्खाहरूको उच्च वातावरणीय चेतना र वास्तुकलालाई प्रमाणित गर्छन्। बाइसधाराको प्राकृतिक जलप्रणाली र प्याठो अजिमाको मातृका पीठ यस वडाका मुख्य सांस्कृतिक मुटु हुन्।"
                : "The ward preserves historic stone spouts (Hitis), subterranean water conduits, rest houses (Patis), and neighborhood courtyards that demonstrate the profound ecological ingenuity of early urban planners."}
            </p>

            <div className="pt-2">
              <Link
                href="/heritage/22-dhara"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-burgundy hover:text-gold transition-colors"
              >
                <span>{isNepali ? "२२ धाराको पूर्ण अभिलेख पढ्नुहोस्" : "Read 22 Dhara Archive"}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-charcoal text-ivory p-8 sm:p-10 rounded-sm border border-gold/40 shadow-card space-y-6">
            <span className="text-gold font-mono text-xs uppercase tracking-widest block">
              ◈ {isNepali ? "वडा तथ्य संकलन" : "Ward Fact Sheet"}
            </span>

            <h3 className="font-display font-semibold text-2xl text-ivory">
              {isNepali ? "वडा नं. १६ को संक्षिप्त विवरण" : "Key Administrative Profile"}
            </h3>

            <div className="space-y-4 text-sm font-body text-ivory/80">
              <div className="flex justify-between py-2 border-b border-ivory/15">
                <span className="text-ivory/50">{isNepali ? "नगरपालिका:" : "Municipality:"}</span>
                <span className="font-medium text-ivory">{isNepali ? "काठमाडौँ महानगरपालिका" : "Kathmandu Metropolitan City"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-ivory/15">
                <span className="text-ivory/50">{isNepali ? "मुख्य बस्तीहरू:" : "Key Settlements:"}</span>
                <span className="font-medium text-ivory">Balaju, Sorhakhutte, Banasthali, Nayabazar</span>
              </div>
              <div className="flex justify-between py-2 border-b border-ivory/15">
                <span className="text-ivory/50">{isNepali ? "प्राकृतिक सीमा:" : "Natural Border:"}</span>
                <span className="font-medium text-ivory">{isNepali ? "नागार्जुन राष्ट्रिय निकुञ्ज" : "Nagarjun National Park Forest"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-ivory/15">
                <span className="text-ivory/50">{isNepali ? "मुख्य चाडपर्व:" : "Major Festivals:"}</span>
                <span className="font-medium text-ivory">{isNepali ? "बाइसधारा मेला, चैत्र पूर्णिमा, गुँला" : "Baisdhara Mela, Gunla, Chaitra Purnima"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhood Enclaves Grid */}
        <div className="space-y-8 pt-8 border-t border-beige">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal">
              {isNepali ? "वडाका प्रमुख टोल तथा सांस्कृतिक बस्तीहरू" : "Historic Neighborhoods & Enclaves"}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/65">
              {isNepali
                ? "हरेक टोलको आफ्नै इतिहास, सामुदायिक परम्परा र जीवनशैली छ।"
                : "Each enclave within Ward 16 preserves distinct cultural traditions and architectural characteristics."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {neighborhoods.map((n, idx) => (
              <div
                key={idx}
                className="bg-ivory border border-beige hover:border-gold/60 rounded-sm transition-all duration-300 overflow-hidden shadow-xs hover:shadow-card group flex flex-col justify-between"
              >
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-beige/40">
                  <Image
                    src={n.image}
                    alt={n.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-charcoal/80 backdrop-blur-sm text-gold font-mono text-xs font-semibold rounded-xs">
                    0{idx + 1}
                  </span>
                </div>
                <div className="p-6 space-y-2 flex-1">
                  <h3 className="font-display font-semibold text-xl text-charcoal">
                    {n.name}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                    {n.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="p-8 sm:p-12 bg-charcoal text-ivory rounded-sm border border-gold/40 text-center space-y-4">
          <span className="text-gold text-2xl font-display">◈</span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            {isNepali ? "वडा १६ का सम्पदा स्थलहरू नक्सामा खोज्नुहोस्" : "Discover Ward 16 on the Interactive Map"}
          </h2>
          <p className="text-sm sm:text-base text-ivory/70 max-w-xl mx-auto leading-relaxed">
            {isNepali
              ? "सबै ऐतिहासिक ढुङ्गेधारा, मन्दिर, पाटी र तीर्थस्थलहरूलाई भौगोलिक नक्सामा हेर्नुहोस्।"
              : "Locate confirmed heritage sites, verified coordinates, and photo archives across Ward 16."}
          </p>
          <div className="pt-2">
            <Link
              href="/explore-map"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md"
            >
              <span>{isNepali ? "अन्तरक्रियात्मक नक्सा खोल्नुहोस्" : "Open Interactive Map"}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
