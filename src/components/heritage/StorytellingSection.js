'use client';

/**
 * StorytellingSection.js
 *
 * Editorial storytelling section presenting documented archival records
 * alongside community oral narratives, clearly distinguishing verified
 * documentary evidence from living oral memory.
 *
 * Full bilingual (EN/NE) support.
 */

import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function StorytellingSection({ stories = [] }) {
  const { isNepali } = useLanguage();

  return (
    <section id="stories" className="py-20 bg-beige/30 text-charcoal border-t border-beige">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "वडा १६ का स्वरहरू" : "Voices of Ward 16"}
          title={isNepali ? "सामुदायिक कथा तथा संस्मरणहरू" : "Community Stories & Memories"}
          subtitle={
            isNepali
              ? "पुस्तान्तरित मौखिक इतिहास, अनुभव तथा स्थानीय समुदायका आत्मीय सम्झनाहरू।"
              : "Documented oral histories, lived memories, and traditional narratives passed down through generations."
          }
          align="center"
        />

        <div className="mt-14 space-y-8">
          {stories.map((story, index) => {
            const isOral = story.status === 'oral-history';

            return (
              <article
                key={index}
                className={[
                  "p-8 sm:p-10 rounded-sm border shadow-sm transition-all",
                  isOral
                    ? "bg-white border-gold/40 border-l-4 border-l-gold"
                    : "bg-white border-burgundy/40 border-l-4 border-l-burgundy",
                ].join(" ")}
              >
                {/* Header Tag and Type */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={[
                      "font-mono text-xs px-2.5 py-0.5 rounded-sm font-semibold uppercase tracking-wider",
                      isOral
                        ? "bg-gold/15 text-gold"
                        : "bg-burgundy/15 text-burgundy",
                    ].join(" ")}
                  >
                    {isOral ? (isNepali ? "मौखिक इतिहास तथा सम्झना" : story.type) : (isNepali ? "प्रमाणित ऐतिहासिक अभिलेख" : story.type)}
                  </span>

                  <span className="text-xs text-charcoal/50 italic font-serif">
                    {isNepali ? "स्रोत:" : "Source:"} {story.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-charcoal mb-1">
                  {isNepali ? (story.title.ne || story.title.en) : story.title.en}
                </h3>
                {story.title.ne && !isNepali && (
                  <p className="text-xs text-charcoal/50 font-serif mb-4">
                    {story.title.ne}
                  </p>
                )}
                {story.title.en && isNepali && (
                  <p className="text-xs text-charcoal/50 font-sans mb-4">
                    {story.title.en}
                  </p>
                )}

                {/* Narrative Quote */}
                <blockquote className="font-serif text-base sm:text-lg text-charcoal-soft leading-relaxed italic border-t border-beige/60 pt-4 mt-2">
                  {isNepali ? (story.narrative.ne || story.narrative.en) : story.narrative.en}
                </blockquote>

                {/* Audio Narration Feature Support */}
                <div className="mt-5 flex items-center gap-2 text-xs text-charcoal/65 bg-beige/40 border border-beige/80 px-3 py-1.5 rounded-sm w-fit">
                  <svg className="w-4 h-4 text-burgundy shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>
                    {story.audioNarrationUrl
                      ? (isNepali ? "अडियो रेकर्डिङ उपलब्ध छ" : "Audio recording available")
                      : (isNepali ? "अडियो वृत्तान्त सुन्न सकिने व्यवस्था (मौखिक रेकर्डिङ थपिने क्रममा)" : "Audio narration archive prepared (community voice recording pending)")}
                  </span>
                </div>

                {/* Footnote distinguishing memory vs record */}
                <div className="mt-5 pt-3 flex items-center gap-1.5 text-[11px] text-charcoal/40 font-mono">
                  <svg className="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>
                    {isOral
                      ? (isNepali
                          ? "वडा १६ का स्थानीय ज्येष्ठ नागरिकहरूबाट संकलित मौखिक सम्झना — प्रशासनिक अभिलेखभन्दा अलग जीवित अनुभव।"
                          : "Oral testimony recorded from Ward 16 community elders — distinct from administrative archival manuscripts.")
                      : (isNepali
                          ? "पुरातत्व विभाग तथा सांस्कृतिक संरक्षण अध्ययनबाट प्रमाणित ऐतिहासिक अभिलेख।"
                          : "Archival record verified against cultural heritage preservation surveys.")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
