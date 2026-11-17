"use client";

/**
 * src/components/archive/StoryCard.js
 *
 * Editorial card representing a single community heritage story.
 */

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { ARCHIVE_CATEGORIES } from "@/data/communityArchiveData";

export default function StoryCard({ story }) {
  const { t, isNepali } = useLanguage();

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

  const firstPhoto = story.photographs && story.photographs.length > 0 ? story.photographs[0] : null;

  return (
    <article className="group bg-ivory border border-beige hover:border-gold/60 rounded-sm shadow-xs hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden">
      {/* Optional Photo Header */}
      {firstPhoto && (
        <div className="relative aspect-[16/9] w-full bg-charcoal overflow-hidden">
          <Image
            src={firstPhoto.url}
            alt={firstPhoto.caption ? (isNepali ? firstPhoto.caption.ne : firstPhoto.caption.en) : title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-ivory/80">
            <span className="font-mono truncate max-w-[70%]">
              📷 {firstPhoto.credit || "Archival Contributor"}
            </span>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-beige text-charcoal/80 rounded-xs font-mono">
            {categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-charcoal/50">
            {story.publicationDate}
          </span>
        </div>

        {/* Story Title */}
        <h3 className="font-display font-semibold text-charcoal text-xl leading-snug group-hover:text-burgundy transition-colors duration-200">
          <Link href={`/community-archive/${story.slug}`} className="focus:outline-none">
            {title}
          </Link>
        </h3>

        {/* Location Tag */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gold-dark font-medium">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>{locationName}</span>
        </div>

        {/* Summary */}
        <p className="mt-3.5 text-sm text-charcoal/70 leading-relaxed font-body line-clamp-3">
          {summary}
        </p>

        {/* Footer Meta & Action */}
        <div className="mt-auto pt-5 border-t border-beige/60 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-charcoal">
              {t("communityArchive.contributedBy", "Shared by")}: {contributorName}
            </p>
            {role && (
              <p className="text-[11px] text-charcoal/50 italic">
                {role}
              </p>
            )}
          </div>

          <Link
            href={`/community-archive/${story.slug}`}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-burgundy hover:text-gold transition-colors duration-200"
            aria-label={`${t("communityArchive.readStory", "Read Full Story")}: ${title}`}
          >
            <span>{t("communityArchive.readStory", "Read Full Story")}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
