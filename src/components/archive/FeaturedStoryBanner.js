"use client";

/**
 * src/components/archive/FeaturedStoryBanner.js
 *
 * Prominent magazine-style card for featured community narratives.
 */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { ARCHIVE_CATEGORIES } from "@/data/communityArchiveData";

export default function FeaturedStoryBanner({ story }) {
  const { t, isNepali } = useLanguage();

  if (!story) return null;

  const title = isNepali ? (story.title.ne || story.title.en) : story.title.en;
  const summary = isNepali ? (story.summary.ne || story.summary.en) : story.summary.en;
  const contributorName = isNepali
    ? (story.contributor.nameNepali || story.contributor.name)
    : story.contributor.name;
  const role = isNepali ? (story.contributor.role?.ne || story.contributor.role?.en) : story.contributor.role?.en;
  const locationName = isNepali ? story.heritageLocation.name.ne : story.heritageLocation.name.en;

  const categoryObj = ARCHIVE_CATEGORIES.find((c) => c.id === story.category);
  const categoryLabel = categoryObj
    ? (isNepali ? categoryObj.label.ne : categoryObj.label.en)
    : story.category;

  const photo = story.photographs && story.photographs.length > 0 ? story.photographs[0] : null;

  return (
    <section className="bg-charcoal text-ivory rounded-sm border border-gold/40 shadow-card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left/Top Content */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-gold/20 text-gold text-[10px] uppercase font-mono tracking-widest font-semibold rounded-xs">
                ★ {isNepali ? "विशेष संस्मरण" : "Featured Narrative"}
              </span>
              <span className="px-2 py-0.5 bg-ivory/10 text-ivory/80 text-[11px] font-mono tracking-wide rounded-xs">
                {categoryLabel}
              </span>
              <span className="text-[11px] text-ivory/50 font-mono ml-auto">
                {story.publicationDate}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-ivory hover:text-gold transition-colors duration-200">
              <Link href={`/community-archive/${story.slug}`}>
                {title}
              </Link>
            </h2>

            {/* Location Tag */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gold font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{locationName}</span>
            </div>

            {/* Summary */}
            <p className="mt-4 text-sm sm:text-base text-ivory/70 leading-relaxed font-body">
              {summary}
            </p>
          </div>

          {/* Footer attribution & CTA */}
          <div className="mt-8 pt-6 border-t border-ivory/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-ivory">
                {t("communityArchive.contributedBy", "Shared by")}: {contributorName}
              </p>
              {role && <p className="text-[11px] text-ivory/60 italic">{role}</p>}
            </div>

            <Link
              href={`/community-archive/${story.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-xs"
            >
              <span>{t("communityArchive.readStory", "Read Full Story")}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right/Bottom Image or Decorative Art */}
        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-charcoal-soft overflow-hidden">
          {photo ? (
            <Image
              src={photo.url}
              alt={photo.caption ? (isNepali ? photo.caption.ne : photo.caption.en) : title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 50%, rgba(184,149,85,0.2) 0%, transparent 70%),
                  linear-gradient(135deg, #292521 0%, #3D3733 100%)
                `,
              }}
            >
              <span className="text-5xl text-gold/30 font-display mb-3">◈</span>
              <p className="text-xs text-ivory/50 uppercase tracking-widest font-mono">
                {isNepali ? "स्थानीय मौखिक इतिहास" : "Living Oral History"}
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent lg:hidden pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
