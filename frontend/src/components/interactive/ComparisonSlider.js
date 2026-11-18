'use client';

/**
 * ComparisonSlider.js
 *
 * Interactive Then-and-Now comparison slider.
 *
 * Features:
 * - Synchronized layered views with CSS clip-path / container widths.
 * - Draggable divider via Pointer Events (unifying mouse and touch).
 * - Keyboard navigation (ArrowLeft / ArrowRight to adjust slider position, Home/End for extremes).
 * - Documented dates and sources displayed.
 * - Graceful authentic comparison placeholder when historical archives are pending.
 */

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

export default function ComparisonSlider({ comparisonData }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const { title, subtitle, before, after, historicalNotes } = comparisonData || {};

  // Calculate percentage from pointer event
  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  if (!comparisonData) return null;

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

      {/* Main Slider Canvas */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-charcoal rounded-sm overflow-hidden select-none border border-beige shadow-md cursor-ew-resize touch-none"
      >
        {/* Layer 2: AFTER / Contemporary Image (Full width background) */}
        <div className="absolute inset-0 w-full h-full">
          {after?.isAuthentic ? (
            <Image
              src={after.src}
              alt={after.caption?.en || "Contemporary view"}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover object-center pointer-events-none"
            />
          ) : (
            /* Modern Stewardship Placeholder */
            <div className="w-full h-full bg-gradient-to-tr from-[#2C2724] to-[#3B3430] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="font-display font-bold text-ivory text-base">
                Present Day Stewardship
              </span>
              <span className="text-xs text-gold/80 font-mono mt-1">
                {after?.date} — {after?.source}
              </span>
              <p className="text-xs text-ivory/60 max-w-xs mt-2 italic">
                {after?.caption?.en}
              </p>
            </div>
          )}

          {/* Label Tag - After */}
          <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-charcoal/85 backdrop-blur-sm text-ivory text-xs font-mono font-medium rounded-sm border border-ivory/20 shadow-sm pointer-events-none">
            {after?.label}
          </span>
        </div>

        {/* Layer 1: BEFORE / Historic Image (Clipped by slider position using pure CSS clipPath) */}
        <div
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          className="absolute inset-0 w-full h-full z-10"
        >
          {before?.isAuthentic ? (
            <Image
              src={before.src}
              alt={before.caption?.en || "Historic archival view"}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover object-center filter sepia-[0.35] contrast-105 pointer-events-none"
            />
          ) : (
            /* Historic Archive Placeholder */
            <div className="w-full h-full bg-gradient-to-br from-[#1F1B18] via-[#2A231E] to-[#1C1815] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-burgundy/20 text-burgundy flex items-center justify-center mb-3 border border-burgundy/40">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <span className="font-display font-bold text-ivory text-base">
                Historic Archive Perspective
              </span>
              <span className="text-xs text-gold/80 font-mono mt-1">
                {before?.date} — {before?.source}
              </span>
              <p className="text-xs text-ivory/60 max-w-xs mt-2 italic">
                {before?.caption?.en}
              </p>
            </div>
          )}

          {/* Label Tag - Before */}
          <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-burgundy/90 backdrop-blur-sm text-ivory text-xs font-mono font-medium rounded-sm border border-gold/40 shadow-sm pointer-events-none">
            {before?.label}
          </span>
        </div>

        {/* Central Divider Line */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute inset-y-0 w-0.5 bg-gold z-20 pointer-events-none shadow-lg -translate-x-1/2"
        />

        {/* Central Divider Handle */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute inset-y-0 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none"
        >
          <button
            type="button"
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Image comparison slider handle. Use left and right arrow keys to adjust."
            onKeyDown={handleKeyDown}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-ivory border-2 border-gold shadow-2xl flex items-center justify-center text-charcoal hover:scale-110 active:scale-95 transition-transform pointer-events-auto focus:outline-none focus:ring-2 focus:ring-burgundy"
          >
            <svg className="w-5 h-5 text-burgundy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="8 7 3 12 8 17" />
              <polyline points="16 7 21 12 16 17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Historical Notes & Caption Footer */}
      <div className="bg-white border border-beige p-4 sm:p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <p className="font-semibold text-charcoal">
            Historical Context:
          </p>
          <p className="text-charcoal/70 leading-relaxed max-w-2xl">
            {historicalNotes?.en}
          </p>
        </div>
        <div className="text-[11px] text-charcoal/50 font-mono shrink-0">
          <span>Slider position: {Math.round(sliderPosition)}%</span>
        </div>
      </div>
    </div>
  );
}
