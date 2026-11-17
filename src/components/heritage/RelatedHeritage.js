'use client';

/**
 * RelatedHeritage.js
 *
 * Navigation to related experiences across the Ward 16 Digital Heritage archive
 * with full bilingual support.
 */

import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageContext';

export default function RelatedHeritage({ currentSlug = "22-dhara" }) {
  const { t, isNepali } = useLanguage();
  const is22Dhara = currentSlug === "22-dhara";

  return (
    <section className="py-20 bg-beige/30 text-charcoal border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "यात्रा जारी राख्नुहोस्" : "Continue Journey"}
          title={isNepali ? "सम्बन्धित सांस्कृतिक स्थलहरू" : "Related Heritage Experiences"}
          subtitle={
            isNepali
              ? "वडा नं. १६ का अन्य पवित्र स्थलहरू र सांस्कृतिक भू-दृश्यको अन्वेषण गर्नुहोस्।"
              : "Discover more sacred sites and cultural landscapes across Ward No. 16."
          }
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Interactive Heritage Map */}
          <div className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between hover:border-gold transition-colors">
            <div>
              <div className="w-10 h-10 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                {isNepali ? "वडा १६ सम्पदा नक्सा" : "Explore Ward 16 Map"}
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                {isNepali
                  ? "डिजिटल एटलसमार्फत वडाका ऐतिहासिक स्मारक, सार्वजनिक चोक र परम्परागत बाटाहरू खोज्नुहोस्।"
                  : "Locate historical landmarks, public squares, and traditional pathways across the ward with our digital atlas."}
              </p>
            </div>
            <Button href="/explore-map" variant="secondary" size="sm" className="w-full">
              {isNepali ? "सम्पदा नक्सा खोल्नुहोस् →" : "Open Interactive Map →"}
            </Button>
          </div>

          {/* Card 2: Alternate Heritage Site (22 Dhara or Pyatho Ajima) */}
          {is22Dhara ? (
            <div className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between hover:border-gold transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2L2 7h20L12 2z" />
                    <rect x="4" y="7" width="16" height="13" />
                    <rect x="9" y="12" width="6" height="8" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                  {isNepali ? "प्याठो अजिमा मन्दिर" : "Pyatho Ajima Temple"}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                  {isNepali
                    ? "वडा १६ का नेवार समुदायको आध्यात्मिक जीवन र चाडपर्वसँग जोडिएको आदरणीय संरक्षक मातृका मन्दिर।"
                    : "Revered guardian mother goddess temple deeply rooted in the Newari spiritual life and community festivals of Ward 16."}
                </p>
              </div>
              <Button href="/heritage/pyatho-ajima" variant="primary" size="sm" className="w-full">
                {isNepali ? "प्याठो अजिमा अन्वेषण गर्नुहोस् →" : "Explore Pyatho Ajima →"}
              </Button>
            </div>
          ) : (
            <div className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between hover:border-gold transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                  {isNepali ? "२२ धारा (बालाजु बाइसधारा)" : "22 Dhara (Balaju Baisdhara)"}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                  {isNepali
                    ? "नेवारी परम्परागत जलप्रणाली, ढुङ्गे मूर्तिकला र पवित्र प्राकृतिक मुहानको अनुपम संगम।"
                    : "Historic row of twenty-two stone water spouts combining Newari hydraulic engineering, sculpture, and sacred springs."}
                </p>
              </div>
              <Button href="/heritage/22-dhara" variant="primary" size="sm" className="w-full">
                {isNepali ? "२२ धारा अन्वेषण गर्नुहोस् →" : "Explore 22 Dhara →"}
              </Button>
            </div>
          )}

          {/* Card 3: Cultural Traditions & Highlights */}
          <div className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between hover:border-gold transition-colors">
            <div>
              <div className="w-10 h-10 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                {isNepali ? "सांस्कृतिक परम्पराहरू" : "Cultural Traditions"}
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                {isNepali
                  ? "काठमाडौँका ऐतिहासिक टोलहरूलाई जीवन्त राख्ने चाडपर्व, बाजागाजा र सामूहिक चलनहरूको अन्वेषण गर्नुहोस्।"
                  : "Explore the festivals, living arts, and communal customs that animate Kathmandu's historic neighbourhoods."}
              </p>
            </div>
            <Link
              href="/#cultural-highlights"
              className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2.5 rounded-sm bg-burgundy text-ivory hover:bg-burgundy-dark transition-colors"
            >
              {isNepali ? "सांस्कृतिक झलकहरू हेर्नुहोस् →" : "View Cultural Highlights →"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
