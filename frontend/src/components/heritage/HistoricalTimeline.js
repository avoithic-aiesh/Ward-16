'use client';

/**
 * HistoricalTimeline.js
 *
 * Vertical editorial timeline of documented milestones with full bilingual support.
 */

import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HistoricalTimeline({ timelineData }) {
  const { isNepali } = useLanguage();
  const hasTimeline = timelineData && timelineData.length > 0;

  return (
    <section id="timeline" className="py-20 bg-ivory text-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "कालक्रम अभिलेख" : "Chronological Record"}
          title={isNepali ? "ऐतिहासिक कालक्रम" : "Historical Timeline"}
          subtitle={
            isNepali
              ? "यस सम्पदाको स्थापना, शाही विस्तार र संरक्षणका प्रमुख ऐतिहासिक कोसेढुङ्गाहरू।"
              : "Documented epochs in the creation, expansion and civic stewardship of our heritage."
          }
          align="center"
        />

        {!hasTimeline ? (
          <div className="mt-12 p-8 text-center bg-beige/30 border border-dashed border-charcoal/20 rounded-sm">
            <p className="text-sm text-charcoal/60 italic">
              {isNepali
                ? "पुरातत्व विभागबाट ऐतिहासिक कालक्रमको अध्ययन भइरहेको छ।"
                : "Verified chronological timeline data is currently undergoing archival review with the Department of Archaeology."}
            </p>
          </div>
        ) : (
          <div className="mt-16 relative">
            {/* Central spine line */}
            <div
              className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-burgundy via-gold to-burgundy transform sm:-translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {timelineData.map((event, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={[
                      "relative flex flex-col sm:flex-row items-start sm:items-center",
                      isEven ? "sm:flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    {/* Center Node / Dot */}
                    <div
                      className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-ivory border-2 border-gold transform -translate-x-1/2 z-10 shadow-sm"
                      aria-hidden="true"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-burgundy mx-auto mt-0.5" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={[
                        "ml-10 sm:ml-0 sm:w-1/2",
                        isEven ? "sm:pl-10" : "sm:pr-10 sm:text-right",
                      ].join(" ")}
                    >
                      <div className="bg-white border border-beige p-6 rounded-sm shadow-sm hover:border-gold/50 transition-colors">
                        {/* Period / Year Pill */}
                        <div
                          className={[
                            "flex items-center gap-2 mb-2",
                            isEven ? "sm:justify-start" : "sm:justify-end",
                          ].join(" ")}
                        >
                          <span className="font-mono text-xs font-semibold text-burgundy bg-burgundy/10 px-2.5 py-0.5 rounded-sm">
                            {event.period}
                          </span>
                          <span className="text-[11px] text-charcoal/40 font-mono">
                            {event.year}
                          </span>
                        </div>

                        {/* Event Title */}
                        <h3 className="font-display text-lg font-bold text-charcoal leading-snug">
                          {isNepali ? (event.title.ne || event.title.en) : event.title.en}
                        </h3>
                        {event.title.ne && !isNepali && (
                          <p className="text-xs text-charcoal/50 font-serif mt-0.5 mb-3">
                            {event.title.ne}
                          </p>
                        )}
                        {event.title.en && isNepali && (
                          <p className="text-xs text-charcoal/50 font-sans mt-0.5 mb-3">
                            {event.title.en}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                          {isNepali ? (event.description.ne || event.description.en) : event.description.en}
                        </p>

                        {/* Source Reference Tag */}
                        {event.source && (
                          <div
                            className={[
                              "mt-4 pt-3 border-t border-beige/60 flex items-center gap-1.5 text-[11px] text-charcoal/45 italic",
                              isEven ? "sm:justify-start" : "sm:justify-end",
                            ].join(" ")}
                          >
                            <svg className="w-3 h-3 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <span>{isNepali ? "स्रोत:" : "Source:"} {event.source}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
