'use client';

/**
 * ImageHotspots.js
 *
 * Clickable interactive image hotspots for exploring architectural and heritage details.
 *
 * Accessibility & UX:
 * - Keyboard navigable pins (Tab, Enter, Space).
 * - Proper ARIA attributes (role="dialog", aria-expanded, aria-controls).
 * - Responsive percentage coordinates.
 * - Touch-friendly minimum target size (44x44px).
 * - Smooth slide-over / popup with detailed architectural explanation, significance, and citations.
 */

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ImageHotspots({ hotspotData }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const detailPanelRef = useRef(null);

  const { title, subtitle, image, items = [] } = hotspotData || {};

  // Close hotspot modal on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSelectedHotspot(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus detail panel when opened for screen reader accessibility
  useEffect(() => {
    if (selectedHotspot && detailPanelRef.current) {
      detailPanelRef.current.focus();
    }
  }, [selectedHotspot]);

  if (!hotspotData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-display text-2xl font-bold text-charcoal">
          {title?.en}
        </h3>
        {title?.ne && (
          <p className="text-xs text-charcoal/50 font-serif mt-0.5">
            {title.ne}
          </p>
        )}
        <p className="text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
          {subtitle?.en}
        </p>
      </div>

      {/* Main Interactive Hotspot Frame */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-charcoal rounded-sm overflow-hidden border border-beige shadow-md">
        {image?.isAuthentic ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover object-center"
          />
        ) : (
          /* Architectural Blueprint / Elevation Illustration Fallback */
          <div className="w-full h-full relative bg-gradient-to-br from-[#2D2825] via-[#241F1C] to-[#1E1916] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
            {/* Architectural Grid lines */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #B89555 1px, transparent 1px), linear-gradient(to bottom, #B89555 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Subtle architectural elevation silhouette */}
            <div className="relative z-0 max-w-md w-full opacity-20 pointer-events-none">
              <svg viewBox="0 0 400 200" fill="none" stroke="#B89555" strokeWidth="1.5" className="w-full h-auto">
                <path d="M 50 180 L 350 180 M 80 180 L 80 80 L 320 80 L 320 180 M 50 80 L 200 20 L 350 80" />
                <path d="M 120 180 L 120 120 L 160 120 L 160 180 M 240 180 L 240 120 L 280 120 L 280 180" />
                <circle cx="200" cy="55" r="15" />
              </svg>
            </div>
            <div className="relative z-10 mt-2">
              <span className="font-display font-semibold text-ivory text-sm sm:text-base tracking-wide block">
                {image?.fallbackTitle || "Architectural Elevation Model"}
              </span>
              <span className="text-xs text-gold/80 font-mono mt-1 block">
                Interactive Architectural Elements (Click pins 01–0{items.length})
              </span>
            </div>
          </div>
        )}

        {/* Hotspot Pins Layer */}
        {items.map((item) => {
          const isSelected = selectedHotspot?.id === item.id;

          return (
            <div
              key={item.id}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => setSelectedHotspot(isSelected ? null : item)}
                aria-expanded={isSelected}
                aria-label={`Hotspot ${item.number}: ${item.title?.en}`}
                className="group relative flex items-center justify-center p-2 focus:outline-none"
              >
                {/* Outer animated pulsating radar ring */}
                <span className="absolute w-10 h-10 rounded-full bg-gold/30 animate-ping opacity-75 group-hover:bg-gold/50" />

                {/* Inner button marker */}
                <span
                  className={[
                    "relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-lg transition-transform duration-200 border-2",
                    isSelected
                      ? "bg-gold text-charcoal border-ivory scale-125"
                      : "bg-burgundy text-ivory border-gold group-hover:scale-110",
                  ].join(" ")}
                >
                  {item.number}
                </span>

                {/* Tooltip on hover (desktop) */}
                <span className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-charcoal/90 text-ivory text-[11px] font-sans rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-beige/20 z-30">
                  {item.title?.en}
                </span>
              </button>
            </div>
          );
        })}

        {/* Hotspot Detail Slide-over Panel */}
        {selectedHotspot && (
          <aside
            ref={detailPanelRef}
            tabIndex={-1}
            role="dialog"
            aria-label={selectedHotspot.title?.en}
            className="absolute inset-y-0 right-0 max-w-sm sm:max-w-md w-full bg-ivory/98 backdrop-blur-md border-l border-beige shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-y-auto z-30 animate-fade-left focus:outline-none"
          >
            <div className="space-y-4">
              {/* Close Button & Number */}
              <div className="flex items-center justify-between border-b border-beige pb-3">
                <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
                  Hotspot 0{selectedHotspot.number}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedHotspot(null)}
                  aria-label="Close hotspot detail"
                  className="p-1.5 text-charcoal/60 hover:text-charcoal hover:bg-beige/40 rounded transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Element Subtitle */}
              <p className="text-xs font-mono font-semibold text-burgundy uppercase tracking-wide">
                {selectedHotspot.element?.en}
              </p>

              {/* Title */}
              <div>
                <h4 className="font-display text-xl font-bold text-charcoal leading-snug">
                  {selectedHotspot.title?.en}
                </h4>
                {selectedHotspot.title?.ne && (
                  <p className="text-xs text-charcoal/50 font-serif mt-0.5">
                    {selectedHotspot.title.ne}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                <p>{selectedHotspot.description?.en}</p>
                {selectedHotspot.description?.ne && (
                  <p className="font-serif text-charcoal/65 text-xs border-l-2 border-gold pl-3 py-0.5 italic">
                    {selectedHotspot.description.ne}
                  </p>
                )}
              </div>

              {/* Cultural & Architectural Significance */}
              <div className="pt-3 border-t border-beige/60">
                <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Architectural & Cultural Significance:
                </h5>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {selectedHotspot.significance?.en}
                </p>
              </div>
            </div>

            {/* Reference Citation */}
            <div className="mt-6 pt-4 border-t border-beige text-[11px] text-charcoal/50 font-mono">
              <span className="text-gold font-bold block mb-0.5">Verified Reference:</span>
              <p className="italic">{selectedHotspot.reference}</p>
            </div>
          </aside>
        )}
      </div>

      {/* Quick Clickable Pill Bar below the image */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs text-charcoal/50 font-mono">Quick view:</span>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedHotspot(item)}
            className={[
              "text-xs px-2.5 py-1 rounded-sm border transition-colors font-medium flex items-center gap-1.5",
              selectedHotspot?.id === item.id
                ? "bg-burgundy text-ivory border-burgundy"
                : "bg-white text-charcoal/75 border-beige hover:border-gold",
            ].join(" ")}
          >
            <span className="font-mono text-[10px] text-gold">{item.number}</span>
            <span>{item.title?.en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
