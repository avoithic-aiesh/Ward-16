'use client';

/**
 * MapPageClient.js
 *
 * Client-side orchestrator for the Ward 16 Heritage Map page.
 *
 * Architecture:
 * - Dynamically imports HeritageMap with { ssr: false } to guarantee no Leaflet/window DOM access during SSR.
 * - Manages selection state between MapSidebar and HeritageMap.
 * - Provides responsive layout: desktop split-view and mobile toggleable drawer.
 */

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { HERITAGE_LOCATIONS } from '@/data/heritageLocations';
import MapSidebar from './MapSidebar';
import { useLanguage } from '@/i18n/LanguageContext';

// ── Dynamic import with SSR disabled ─────────────────────────────────────────
// Leaflet requires `window` and browser DOM APIs, so it must NEVER run on the server.
const HeritageMap = dynamic(() => import('./HeritageMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-beige/40 text-charcoal/50">
      <div className="w-8 h-8 border-2 border-burgundy border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs font-medium uppercase tracking-wider text-charcoal/60">
        Loading Heritage Map…
      </p>
    </div>
  ),
});

export default function MapPageClient() {
  const [selectedId, setSelectedId] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { t, isNepali } = useLanguage();

  const handleSelectLocation = (id) => {
    setSelectedId(id);
    // On mobile, if an item is selected, we can keep the panel or let them close it
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] pt-16 bg-ivory">
      {/* ── Page Header & Map Legend ────────────────────────────────────────── */}
      <header className="bg-ivory border-b border-beige px-4 sm:px-6 lg:px-8 py-6 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-1">
              {t("map.eyebrow", "WARD 16 · KATHMANDU")}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
              {t("map.heading", "Explore Our Living Heritage")}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
              {t(
                "map.subtitle",
                "Discover the historic places, sacred spaces and cultural landmarks that shape the identity of Ward 16."
              )}
            </p>
          </div>

          {/* Heritage Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/70 bg-beige/30 border border-beige px-3.5 py-2 rounded-sm self-start md:self-auto">
            <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px]">
              {t("map.legend.title", "Legend:")}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-burgundy inline-block" />
              <span>{t("map.legend.heritageSite", "Heritage Site")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
              <span>{t("map.legend.selectedSite", "Selected Site")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-dashed border-charcoal/40 bg-white inline-block" />
              <span>{t("map.legend.verificationPending", "Verification Pending")}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Sidebar Toggle Button ────────────────────────────────────── */}
      <div className="md:hidden bg-beige/40 border-b border-beige px-4 py-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-burgundy py-1 px-2.5 rounded border border-burgundy/30 bg-ivory"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {isMobileSidebarOpen
            ? t("map.sidebar.mobileToggleClose", "Hide Location List")
            : t("map.sidebar.mobileToggleOpen", "View Locations & Filters")}
        </button>
        <span className="text-[11px] text-charcoal/60">
          {HERITAGE_LOCATIONS.length} {isNepali ? "स्थानहरू" : "Locations"}
        </span>
      </div>

      {/* ── Main Interactive Split Area ─────────────────────────────────────── */}
      <main className="relative flex-1 flex flex-col md:flex-row h-[600px] md:h-[calc(100vh-12rem)] w-full overflow-hidden">
        {/* Desktop Sidebar (Left) */}
        <div className="hidden md:block w-80 lg:w-96 h-full shrink-0 z-10 shadow-sm">
          <MapSidebar
            locations={HERITAGE_LOCATIONS}
            selectedId={selectedId}
            onSelectLocation={handleSelectLocation}
          />
        </div>

        {/* Mobile Drawer / Collapsible Sidebar */}
        {isMobileSidebarOpen && (
          <div className="md:hidden absolute inset-0 z-30 bg-ivory flex flex-col">
            <div className="p-2 border-b border-beige flex justify-end">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-xs font-medium text-charcoal/70 px-3 py-1 bg-beige rounded"
              >
                Close List ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MapSidebar
                locations={HERITAGE_LOCATIONS}
                selectedId={selectedId}
                onSelectLocation={(id) => {
                  handleSelectLocation(id);
                  setIsMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Map View Area (Right / Full width) */}
        <div className="relative flex-1 h-full w-full bg-beige/30">
          <HeritageMap
            locations={HERITAGE_LOCATIONS}
            selectedId={selectedId}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      </main>
    </div>
  );
}
