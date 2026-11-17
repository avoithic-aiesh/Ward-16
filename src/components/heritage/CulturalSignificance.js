'use client';

/**
 * CulturalSignificance.js
 *
 * Details the living cultural traditions, festivals, and communal values with full bilingual support.
 */

import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function CulturalSignificance({ significanceItems = [] }) {
  const { isNepali } = useLanguage();

  return (
    <section id="cultural-significance" className="py-20 bg-ivory text-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "जीवन्त परम्पराहरू" : "Living Traditions"}
          title={isNepali ? "सांस्कृतिक तथा धार्मिक महत्त्व" : "Cultural & Spiritual Significance"}
          subtitle={
            isNepali
              ? "इँटा र ढुङ्गाभन्दा पर: यस सम्पदालाई जीवन्त राख्ने सामाजिक रीतिरिवाज, मेला-पर्व र सामूहिक आस्था।"
              : "Beyond stone and masonry: the rituals, communal gatherings, and environmental values that sustain our heritage."
          }
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {significanceItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between hover:border-gold/50 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-4 font-display font-bold text-lg">
                  {index + 1}
                </div>

                <h3 className="font-display text-xl font-bold text-burgundy mb-1">
                  {isNepali ? (item.title.ne || item.title.en) : item.title.en}
                </h3>
                {item.title.ne && !isNepali && (
                  <p className="text-xs text-charcoal/50 font-serif mb-4">
                    {item.title.ne}
                  </p>
                )}
                {item.title.en && isNepali && (
                  <p className="text-xs text-charcoal/50 font-sans mb-4">
                    {item.title.en}
                  </p>
                )}

                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {isNepali ? (item.description.ne || item.description.en) : item.description.en}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-beige/60 flex items-center justify-between text-xs text-charcoal/50 font-mono">
                <span>{isNepali ? `सांस्कृतिक आधार ०${index + 1}` : `Tradition Pillar 0${index + 1}`}</span>
                <span className="text-gold font-semibold">{isNepali ? "वडा १६ जीवन्त सम्पदा" : "Ward 16 Living Heritage"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
