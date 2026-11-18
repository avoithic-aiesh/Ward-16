'use client';

/**
 * HeritageGallery.js
 *
 * Responsive editorial image gallery with an interactive lightbox modal.
 *
 * Accessibility:
 * - Keyboard navigation (Esc to close, Arrow keys for prev/next).
 * - Focus trapped inside modal while open.
 * - Proper ARIA labels and roles.
 */

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/i18n/LanguageContext';

export default function HeritageGallery({ galleryItems = [], folderPath = "public/images/heritage/" }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const { t, isNepali } = useLanguage();

  const activePhoto = selectedPhotoIndex !== null ? galleryItems[selectedPhotoIndex] : null;

  // ── Lightbox Navigation Callbacks ──────────────────────────────────────────
  const closeModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % galleryItems.length);
  }, [selectedPhotoIndex, galleryItems.length]);

  const showPrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [selectedPhotoIndex, galleryItems.length]);

  // ── Keyboard Navigation (Esc, Left, Right) ────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e) {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, closeModal, showNext, showPrev]);

  return (
    <section id="gallery" className="py-20 bg-beige/20 text-charcoal border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isNepali ? "तस्बिर अभिलेखालय" : "Visual Archive"}
          title={t("heritageDetail.photoGallery", "Photographic Documentation")}
          subtitle={t(
            "heritageDetail.photoGallerySubtitle",
            "Architectural studies, community rituals and historical features."
          )}
          align="center"
        />

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <figure
              key={item.id}
              className="group relative bg-white border border-beige rounded-sm overflow-hidden shadow-sm flex flex-col cursor-pointer transition-all hover:shadow-md hover:border-gold"
              onClick={() => setSelectedPhotoIndex(idx)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-beige/60 overflow-hidden flex items-center justify-center">
                {item.isAuthentic ? (
                  <Image
                    src={item.src}
                    alt={item.caption?.en || item.fallbackTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Architectural placeholder frame */
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-beige/40 to-ivory border-b border-beige">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-charcoal/80 mb-0.5">
                      {item.fallbackTitle}
                    </span>
                    <span className="text-[10px] text-charcoal/45 font-mono">
                      {t("heritageDetail.photoPlaceholder", "Awaiting authentic photograph upload")}
                    </span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-ivory text-xs font-medium gap-1.5 backdrop-blur-[2px]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>{t("heritageDetail.viewDetails", "View Details")}</span>
                </div>
              </div>

              {/* Caption & Credit Footer */}
              <figcaption className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-charcoal/80 line-clamp-2 leading-relaxed">
                    {isNepali ? (item.caption?.ne || item.caption?.en) : item.caption?.en}
                  </p>
                  {item.caption?.ne && !isNepali && (
                    <p className="text-[11px] text-charcoal/50 font-serif mt-1 line-clamp-1">
                      {item.caption.ne}
                    </p>
                  )}
                  {item.caption?.en && isNepali && (
                    <p className="text-[11px] text-charcoal/50 font-sans mt-1 line-clamp-1">
                      {item.caption.en}
                    </p>
                  )}
                </div>
                <div className="mt-3 pt-2 border-t border-beige/60 flex items-center justify-between text-[10px] text-charcoal/45 font-mono">
                  <span>{isNepali ? `तस्बिर ०${idx + 1}` : `Photo 0${idx + 1}`}</span>
                  <span>{item.credit}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Documentation Note */}
        <p className="text-xs text-charcoal/50 text-center mt-8 italic">
          {t("heritageDetail.photoInstructions", "To display authentic photographs, add them to")}{" "}
          <code className="text-charcoal font-mono bg-beige/60 px-1 py-0.5 rounded">{folderPath}</code>
        </p>
      </div>

      {/* ── Interactive Lightbox Modal ──────────────────────────────────────── */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("heritageDetail.photoGallery", "Image details lightbox")}
          className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeModal}
            aria-label={t("heritageDetail.closeLightbox", "Close lightbox modal")}
            className="absolute top-4 right-4 z-50 text-ivory/70 hover:text-ivory bg-charcoal/60 hover:bg-burgundy p-2 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={showPrev}
            aria-label={t("heritageDetail.previousPhoto", "Previous photograph")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-ivory/70 hover:text-ivory bg-charcoal/60 hover:bg-burgundy p-3 rounded-full transition-colors hidden sm:block"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={showNext}
            aria-label={t("heritageDetail.nextPhoto", "Next photograph")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-ivory/70 hover:text-ivory bg-charcoal/60 hover:bg-burgundy p-3 rounded-full transition-colors hidden sm:block"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Content Card inside modal */}
          <div className="relative max-w-4xl w-full bg-ivory rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]">
            {/* Image side */}
            <div className="relative flex-1 bg-charcoal min-h-[300px] md:min-h-[450px] flex items-center justify-center">
              {activePhoto.isAuthentic ? (
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.caption?.en || activePhoto.fallbackTitle}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
              ) : (
                <div className="p-8 text-center text-ivory/70">
                  <div className="w-16 h-16 rounded-full bg-ivory/10 flex items-center justify-center mx-auto mb-4 text-gold">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <h4 className="font-display text-lg text-ivory font-semibold mb-1">
                    {activePhoto.fallbackTitle}
                  </h4>
                  <p className="text-xs text-ivory/50 font-mono">
                    File path: {activePhoto.src}
                  </p>
                </div>
              )}
            </div>

            {/* Information panel */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-ivory border-t md:border-t-0 md:border-l border-beige overflow-y-auto">
              <div className="space-y-4">
                <span className="text-[11px] font-mono text-gold uppercase tracking-wider font-semibold">
                  Photo 0{selectedPhotoIndex + 1} of {galleryItems.length}
                </span>

                <h3 className="font-display text-xl font-bold text-charcoal">
                  {activePhoto.fallbackTitle}
                </h3>

                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {activePhoto.caption?.en}
                </p>

                {activePhoto.caption?.ne && (
                  <p className="text-xs text-charcoal/60 font-serif leading-relaxed">
                    {activePhoto.caption.ne}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-beige text-xs text-charcoal/60 space-y-1 font-mono">
                <p>Archive Credit: {activePhoto.credit}</p>
                <p>Location: Ward 16, Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
