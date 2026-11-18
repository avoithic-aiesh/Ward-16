"use client";

/**
 * src/components/archive/StoryDetailView.js
 *
 * Editorial reader for an individual community heritage story.
 * Includes photo viewer, ethical disclaimer, and correction/removal request modal.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { ARCHIVE_CATEGORIES } from "@/data/communityArchiveData";
import ArchivalDisclaimer from "./ArchivalDisclaimer";

export default function StoryDetailView({ story, relatedStories = [] }) {
  const { t, isNepali } = useLanguage();
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);
  const [correctionNote, setCorrectionNote] = useState("");
  const [correctionEmail, setCorrectionEmail] = useState("");

  if (!story) return null;

  const title = isNepali ? (story.title.ne || story.title.en) : story.title.en;
  const content = isNepali ? (story.content.ne || story.content.en) : story.content.en;
  const contributorName = isNepali
    ? (story.contributor.nameNepali || story.contributor.name)
    : story.contributor.name;
  const role = isNepali ? (story.contributor.role?.ne || story.contributor.role?.en) : story.contributor.role?.en;
  const locationName = isNepali ? story.heritageLocation.name.ne : story.heritageLocation.name.en;

  const categoryObj = ARCHIVE_CATEGORIES.find((c) => c.id === story.category);
  const categoryLabel = categoryObj
    ? (isNepali ? categoryObj.label.ne : categoryObj.label.en)
    : story.category;

  const paragraphs = content.split("\n\n").filter(Boolean);

  const handleCorrectionSubmit = (e) => {
    e.preventDefault();
    if (!correctionNote.trim()) return;
    setCorrectionSubmitted(true);
  };

  return (
    <article className="min-h-screen bg-ivory text-charcoal pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/community-archive"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-burgundy hover:text-gold transition-colors duration-200"
          >
            <span>{t("communityArchive.backToArchive", "← Back to Community Archive")}</span>
          </Link>
        </div>

        {/* Story Header */}
        <header className="space-y-4 pb-8 border-b border-beige">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-burgundy text-ivory uppercase tracking-wider rounded-xs font-semibold">
              {categoryLabel}
            </span>
            <span className="text-charcoal/50">·</span>
            <span className="text-charcoal/70">
              {story.publicationDate}
            </span>
            <span className="text-charcoal/50">·</span>
            <span className="px-2 py-0.5 bg-gold/15 text-gold-dark font-medium rounded-xs">
              {t("communityArchive.statusBadge", "Community Testimony")}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-charcoal">
            {title}
          </h1>

          {/* Contributor Byline */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-sm text-charcoal/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center font-display font-semibold text-lg">
                {contributorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-charcoal">
                  {t("communityArchive.contributedBy", "Shared by")}: {contributorName}
                </p>
                {role && <p className="text-xs text-charcoal/50 italic">{role}</p>}
              </div>
            </div>

            {/* Heritage Location Link */}
            {story.heritageLocation.slug !== "ward-16-general" && (
              <Link
                href={`/heritage/${story.heritageLocation.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-beige/50 hover:bg-beige text-charcoal text-xs font-medium rounded-sm border border-beige transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span>{locationName}</span>
                <span className="text-burgundy">→</span>
              </Link>
            )}
          </div>
        </header>

        {/* Archival & Living Memory Disclaimer */}
        <ArchivalDisclaimer />

        {/* Featured Photograph (if available) */}
        {story.photographs && story.photographs.length > 0 && (
          <figure className="space-y-2 bg-beige/30 p-2 sm:p-4 rounded-sm border border-beige">
            <div className="relative aspect-[16/10] w-full bg-charcoal overflow-hidden rounded-xs">
              <Image
                src={story.photographs[0].url}
                alt={
                  story.photographs[0].caption
                    ? isNepali
                      ? story.photographs[0].caption.ne
                      : story.photographs[0].caption.en
                    : title
                }
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
            {story.photographs[0].caption && (
              <figcaption className="pt-2 text-xs sm:text-sm text-charcoal/70 flex flex-wrap items-center justify-between gap-2 px-1">
                <span>
                  {isNepali ? story.photographs[0].caption.ne : story.photographs[0].caption.en}
                </span>
                {story.photographs[0].credit && (
                  <span className="font-mono text-[11px] text-charcoal/50">
                    © {story.photographs[0].credit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Story Narrative */}
        <section className="prose prose-stone max-w-none text-charcoal/85 leading-relaxed font-body text-base sm:text-lg space-y-6">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </section>

        {/* Additional Photographs Grid (if more than 1) */}
        {story.photographs && story.photographs.length > 1 && (
          <section className="space-y-4 pt-6 border-t border-beige">
            <h3 className="font-display font-semibold text-lg text-charcoal">
              {isNepali ? "थप ऐतिहासिक तस्बिरहरू" : "Archival Photographs"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story.photographs.slice(1).map((photo, i) => (
                <figure key={i} className="bg-beige/20 p-2 rounded-xs border border-beige space-y-1.5">
                  <div className="relative aspect-[4/3] w-full bg-charcoal overflow-hidden rounded-xs">
                    <Image
                      src={photo.url}
                      alt={isNepali ? photo.caption.ne : photo.caption.en}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="text-xs text-charcoal/60">
                    {isNepali ? photo.caption.ne : photo.caption.en}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Archival Provenance Box */}
        <div className="p-5 bg-beige/30 border border-beige rounded-sm text-xs font-mono space-y-2 text-charcoal/70">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>{t("communityArchive.sourceLabel", "Archival Source")}: {story.source}</span>
            <span>Consent: {story.consentStatus}</span>
          </div>
          <p className="text-[11px] text-charcoal/50">
            {isNepali
              ? "यो संस्मरण वडा नं. १६ को सामुदायिक सम्पदा संरक्षण तथा शैक्षिक अभिलेखीकरणका लागि सुरक्षित गरिएको हो।"
              : "Preserved for non-commercial educational, civic, and cultural heritage documentation in Kathmandu Ward 16."}
          </p>
        </div>

        {/* Ethical Rights: Correction or Removal Request */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-beige">
          <p className="text-xs text-charcoal/60 max-w-lg">
            {t(
              "communityArchive.requestCorrectionDesc",
              "If you are a community member, family descendant, or rights holder and believe any detail in this memory requires correction or removal, please contact the archive moderation team."
            )}
          </p>
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="text-xs font-semibold text-burgundy hover:text-burgundy-light underline underline-offset-2 transition-colors"
          >
            {t("communityArchive.requestCorrection", "Request Correction or Removal")}
          </button>
        </div>

        {/* Related Community Stories */}
        {relatedStories.length > 0 && (
          <section className="pt-12 border-t border-beige space-y-6">
            <h2 className="font-display font-semibold text-2xl text-charcoal">
              {isNepali ? "सम्बन्धित अन्य सामुदायिक संस्मरणहरू" : "More Stories from Ward 16"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedStories.map((rel) => {
                const relTitle = isNepali ? (rel.title.ne || rel.title.en) : rel.title.en;
                return (
                  <Link
                    key={rel.id}
                    href={`/community-archive/${rel.slug}`}
                    className="p-4 bg-beige/20 hover:bg-beige/40 border border-beige rounded-sm transition-colors group block"
                  >
                    <span className="text-[10px] font-mono uppercase text-burgundy font-semibold block mb-1">
                      {rel.category}
                    </span>
                    <h3 className="font-display font-medium text-charcoal group-hover:text-burgundy text-base leading-snug">
                      {relTitle}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Correction / Removal Modal */}
      {showCorrectionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="correction-modal-title"
        >
          <div className="bg-ivory border border-gold/40 rounded-sm shadow-elevated max-w-lg w-full p-6 sm:p-8 space-y-4 relative">
            <button
              onClick={() => {
                setShowCorrectionModal(false);
                setCorrectionSubmitted(false);
              }}
              className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal text-lg"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <h3 id="correction-modal-title" className="font-display font-semibold text-xl text-charcoal">
              {isNepali ? "सच्याउन वा हटाउन अनुरोध" : "Request Story Correction or Removal"}
            </h3>

            {correctionSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <p className="font-semibold text-charcoal text-sm">
                  {isNepali ? "अनुरोध प्राप्त भयो" : "Request Received"}
                </p>
                <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                  {isNepali
                    ? "तपाईंको अनुरोध अभिलेख सम्पादकीय टोलीलाई प्राप्त भएको छ। हामी २-३ दिनभित्र समीक्षा गर्नेछौँ।"
                    : "Your request has been submitted to the archive editorial team. We review community requests within 2-3 business days."}
                </p>
                <button
                  onClick={() => setShowCorrectionModal(false)}
                  className="mt-4 px-4 py-2 bg-charcoal text-ivory text-xs font-semibold rounded-sm"
                >
                  {isNepali ? "बन्द गर्नुहोस्" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCorrectionSubmit} className="space-y-4">
                <p className="text-xs text-charcoal/70">
                  {isNepali
                    ? `कथा: "${title}" सँग सम्बन्धित कुनै तथ्य सच्याउन वा हटाउन चाहनुहुन्छ भने कृपया तल विवरण लेख्नुहोस्:`
                    : `Please specify the details regarding "${title}" that need correction, additional context, or removal:`}
                </p>

                <div>
                  <label htmlFor="corr-email" className="block text-xs font-semibold text-charcoal mb-1">
                    {isNepali ? "तपाईंको इमेल ठेगाना" : "Your Contact Email"}
                  </label>
                  <input
                    id="corr-email"
                    type="email"
                    required
                    value={correctionEmail}
                    onChange={(e) => setCorrectionEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-ivory border border-beige text-xs rounded-sm focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="corr-note" className="block text-xs font-semibold text-charcoal mb-1">
                    {isNepali ? "अनुरोधको विवरण" : "Correction Details / Reason"}
                  </label>
                  <textarea
                    id="corr-note"
                    rows={4}
                    required
                    value={correctionNote}
                    onChange={(e) => setCorrectionNote(e.target.value)}
                    placeholder={
                      isNepali
                        ? "के कुरा सच्याउन आवश्यक छ स्पष्ट पार्नुहोस्..."
                        : "Explain what information requires correction or why removal is requested..."
                    }
                    className="w-full px-3 py-2 bg-ivory border border-beige text-xs rounded-sm focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCorrectionModal(false)}
                    className="px-4 py-2 bg-beige text-charcoal text-xs font-semibold rounded-sm hover:bg-beige/80"
                  >
                    {isNepali ? "रद्द गर्नुहोस्" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold rounded-sm"
                  >
                    {isNepali ? "अनुरोध पठाउनुहोस्" : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
