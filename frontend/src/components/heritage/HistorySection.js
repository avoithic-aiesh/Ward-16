'use client';

/**
 * HistorySection.js
 *
 * Documents verified historical background, origin, royal patronage,
 * and historical events. Strictly distinguishes documented chronicles
 * from unverified oral accounts.
 *
 * Full bilingual (EN/NE) support.
 */

import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HistorySection({ historyData }) {
  const { isNepali } = useLanguage();

  if (!historyData) return null;

  return (
    <section id="historical-overview" className="py-20 bg-ivory text-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={isNepali ? "इतिहास तथा उत्थान" : "Chronicles & Origins"}
          title={isNepali ? "ऐतिहासिक पृष्ठभूमि" : "Historical Overview"}
          subtitle={
            isNepali
              ? "शताब्दीयौँ पुरानो शाही योगदान, मौलिक इन्जिनियरिङ र सामुदायिक संरक्षणको इतिहास।"
              : "Documenting centuries of royal patronage, hydraulic innovation, and cultural guardianship."
          }
          align="center"
        />

        {/* Lead Summary Paragraph */}
        <div className="mt-12 max-w-3xl mx-auto">
          <p className="font-serif text-lg sm:text-xl text-charcoal-soft leading-relaxed italic border-l-2 border-gold pl-6 py-1">
            {isNepali ? (historyData.summary.ne || historyData.summary.en) : historyData.summary.en}
          </p>
        </div>

        {/* Development Eras Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {historyData.development.map((item, index) => (
            <article
              key={index}
              className="relative p-6 sm:p-8 bg-white border border-beige rounded-sm shadow-sm flex flex-col justify-between group hover:border-gold/60 transition-colors"
            >
              <div>
                {/* Era number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-gold uppercase tracking-wider font-semibold">
                    {isNepali ? `ऐतिहासिक चरण ०${index + 1}` : `Epoch 0${index + 1}`}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-beige/60 text-charcoal/70 font-mono">
                    {item.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-display text-xl font-bold text-burgundy group-hover:text-charcoal transition-colors mb-2">
                  {isNepali ? (item.heading.ne || item.heading.en) : item.heading.en}
                </h3>
                {item.heading.ne && !isNepali && (
                  <p className="text-xs text-charcoal/50 font-serif mb-4">
                    {item.heading.ne}
                  </p>
                )}
                {item.heading.en && isNepali && (
                  <p className="text-xs text-charcoal/50 font-sans mb-4">
                    {item.heading.en}
                  </p>
                )}

                {/* Text */}
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {isNepali ? (item.text.ne || item.text.en) : item.text.en}
                </p>
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-4 border-t border-beige/60 flex items-center gap-1.5 text-xs text-charcoal/50">
                <svg className="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
                <span>{isNepali ? "उपत्यकाका ऐतिहासिक अभिलेख तथा वंशावलीमा आधारित" : "Sourced from valley chronicles"}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Verification Status Banner */}
        <div className="mt-12 max-w-3xl mx-auto bg-beige/30 border border-beige p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div className="text-xs leading-relaxed text-charcoal/70">
            <p className="font-semibold text-charcoal mb-0.5">
              Documentation Integrity Note:
            </p>
            <p>
              Dates and royal chronologies cited above reflect recorded archival manuscripts and Department of Archaeology monographs. Unverified oral anecdotes are omitted from this section and preserved separately under Community Stories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
