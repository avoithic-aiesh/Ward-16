'use client';

/**
 * ArchitectureSection.js
 *
 * Detailed architectural exploration of heritage sites with full bilingual support.
 */

import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ArchitectureSection({ architectureData }) {
  const { isNepali } = useLanguage();

  if (!architectureData) return null;

  return (
    <section id="architecture" className="py-20 bg-beige/30 text-charcoal border-t border-b border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "परम्परागत वास्तुकला र शिल्पकला" : "Hydraulic Engineering & Stone Craft"}
          title={isNepali ? "वास्तुकला तथा भौतिक संरचना" : "Architecture & Spatial Design"}
          subtitle={
            isNepali
              ? "नेवारी काष्ठकला, ढुङ्गे शिल्पी, प्राकृतिक जलप्रणाली र पवित्र धार्मिक संरचनाको उत्कृष्ट नमुना।"
              : "An enduring masterpiece of Newari masonry, gravity-fed aquifer management, and sacred space."
          }
          align="center"
        />

        {/* Intro */}
        <p className="mt-8 text-center text-charcoal/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {isNepali
            ? (architectureData.introduction.ne || architectureData.introduction.en)
            : architectureData.introduction.en}
        </p>

        {/* Architectural Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {architectureData.features.map((feature, idx) => (
            <div
              key={feature.id}
              className="bg-white border border-beige p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">
                    {isNepali ? `विशेषता ०${idx + 1}` : `Feature 0${idx + 1}`}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-burgundy bg-burgundy/10 px-2 py-0.5 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                    {isNepali ? "प्रमाणित परम्परागत स्वरूप" : "Verified Architectural Form"}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-charcoal mb-1">
                  {isNepali ? (feature.title.ne || feature.title.en) : feature.title.en}
                </h3>
                {feature.title.ne && !isNepali && (
                  <p className="text-xs text-charcoal/50 font-serif mb-3">
                    {feature.title.ne}
                  </p>
                )}
                {feature.title.en && isNepali && (
                  <p className="text-xs text-charcoal/50 font-sans mb-3">
                    {feature.title.en}
                  </p>
                )}

                <p className="text-sm text-charcoal/75 leading-relaxed">
                  {isNepali
                    ? (feature.description.ne || feature.description.en)
                    : feature.description.en}
                </p>
              </div>

              {/* Technical / Material Specification Bar */}
              <div className="mt-6 pt-4 border-t border-beige/60 grid grid-cols-2 gap-2 text-[11px] text-charcoal/60 font-mono">
                <div>
                  <span className="text-charcoal/40 block">{isNepali ? "निर्माण सामग्री:" : "Medium:"}</span>
                  {isNepali ? "परम्परागत ढुङ्गा, काठ तथा ईँटा" : "Traditional Carved Stone & Brick"}
                </div>
                <div>
                  <span className="text-charcoal/40 block">{isNepali ? "स्थान:" : "Location:"}</span>
                  {isNepali ? "वडा नं. १६, काठमाडौँ" : "Ward 16, Kathmandu"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on traditional Newar water engineering */}
        <div className="mt-12 p-6 bg-ivory border border-gold/40 rounded-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-semibold text-charcoal text-sm">
                {isNepali ? "परम्परागत नेवार हिटी (ढुङ्गेधारा) इन्जिनियरिङ" : "The Newari Hiti Engineering Tradition"}
              </h4>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                {isNepali
                  ? "काठमाडौँका परम्परागत ढुङ्गेधारा प्राकृतिक बालुवा/गेग्रानको जलस्तर छनौट, पोलेको माटोका जलप्रणाली र भूमिगत जलाशयको अनुपम प्राविधिक संयोजनमा आधारित छन्। जमिनमुनिको तापमानका कारण यी धारामा हिउँदमा न्यानो र वर्षायाममा चिसो पानी प्राप्त हुन्छ।"
                  : "Traditional Kathmandu water spouts rely on an intricate combination of natural sand/gravel aquifer filtration, burnt terracotta clay conduits, and subterranean masonry cisterns. The water remains cool in summer and warm in winter through geothermal buffering."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
