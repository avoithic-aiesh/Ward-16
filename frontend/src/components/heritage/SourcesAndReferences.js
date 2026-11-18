'use client';

/**
 * SourcesAndReferences.js
 *
 * Formal bibliography and citations section with full bilingual support.
 */

import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function SourcesAndReferences({ references = [] }) {
  const { t, isNepali } = useLanguage();

  return (
    <section id="references" className="py-16 bg-ivory text-charcoal border-t border-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "सन्दर्भ तथा ऐतिहासिक स्रोतहरू" : "Bibliography & Archival Citations"}
          title={isNepali ? "स्रोत तथा सन्दर्भहरू" : "References & Sources"}
          subtitle={
            isNepali
              ? "प्रमाणित अनुसन्धान र स्थानीय गुठी अभिलेखमा आधारित डिजिटल दस्तावेज।"
              : "Grounding our digital documentation in verified scholarship and community stewardship."
          }
          align="center"
        />

        {/* References List */}
        <div className="mt-12 space-y-4">
          {references.map((ref, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-white border border-beige rounded-sm flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs"
            >
              <div>
                <p className="font-semibold text-charcoal text-sm leading-snug">
                  {ref.title}
                </p>
                <p className="text-charcoal/60 mt-0.5">
                  {ref.organization} — <span className="font-mono text-gold">{ref.year}</span>
                </p>
                {ref.note && (
                  <p className="text-charcoal/50 italic mt-1 font-serif">
                    {ref.note}
                  </p>
                )}
              </div>
              <span className="font-mono text-[10px] text-charcoal/40 shrink-0">
                {isNepali ? `सन्दर्भ [०${idx + 1}]` : `Ref [0${idx + 1}]`}
              </span>
            </div>
          ))}
        </div>

        {/* Community Archival Contribution Callout */}
        <div className="mt-12 p-6 bg-beige/40 border border-gold/30 rounded-sm text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h4 className="font-display text-base font-bold text-charcoal">
            {t("heritageDetail.contributeTitle", "Contribute to the Ward 16 Digital Archive")}
          </h4>
          <p className="text-xs text-charcoal/70 max-w-xl mx-auto leading-relaxed">
            {t(
              "heritageDetail.contributeDescription",
              "Do you hold historical family photographs, inscriptions, or verified historical records? Help us enrich and authenticate this open cultural repository."
            )}
          </p>
          <div className="pt-1">
            <span className="inline-block text-xs font-semibold text-burgundy bg-burgundy/10 px-3 py-1 rounded-sm">
              {t("heritageDetail.contributeBadge", "Community Submission Portal (Coming in future phase)")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
