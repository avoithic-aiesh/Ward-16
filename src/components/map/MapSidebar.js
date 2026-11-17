'use client';

/**
 * MapSidebar.js
 *
 * The left panel of the heritage map interface.
 * Contains:
 *   - Page title and introduction
 *   - Search input (filters the landmark list in real time)
 *   - Category filter buttons
 *   - LandmarkList (scrollable)
 *   - LandmarkInfo (selected location detail)
 *
 * On mobile, the sidebar is toggled via a floating button (handled in MapPageClient).
 */

import { useState, useMemo } from 'react';
import { CATEGORY_FILTERS } from '@/lib/mapConfig';
import LandmarkList from './LandmarkList';
import LandmarkInfo from './LandmarkInfo';
import { useLanguage } from '@/i18n/LanguageContext';

// ── Search icon ────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-charcoal/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function MapSidebar({
  locations,           // full HERITAGE_LOCATIONS array
  selectedId,          // currently selected location id
  onSelectLocation,    // fn(id) → called when user picks a location
}) {
  const { t, isNepali } = useLanguage();
  // ── State ────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Translated category labels
  const categoryLabels = {
    all: t("map.categories.all", "All Locations"),
    "water-heritage": t("map.categories.waterHeritage", "Water Heritage"),
    temple: t("map.categories.temple", "Temples"),
    cultural: t("map.categories.cultural", "Cultural Heritage"),
    architecture: t("map.categories.architecture", "Architecture"),
    community: t("map.categories.community", "Community Heritage"),
  };

  // ── Filtered list ────────────────────────────────────────────────────────
  // useMemo so we don't recompute on every render.
  const filteredLocations = useMemo(() => {
    let result = locations;

    // Category filter
    if (activeFilter !== 'all') {
      result = result.filter((loc) => loc.categoryId === activeFilter);
    }

    // Text search — matches name, Nepali name, alternate name, or tags
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          (loc.nameNepali && loc.nameNepali.includes(q)) ||
          (loc.nameAlternate && loc.nameAlternate.toLowerCase().includes(q)) ||
          (loc.tags && loc.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [locations, searchQuery, activeFilter]);

  // Find the selected location object for the info panel
  const selectedLocation = useMemo(
    () => locations.find((loc) => loc.id === selectedId) || null,
    [locations, selectedId]
  );

  return (
    <aside
      className="flex flex-col h-full bg-ivory border-r border-beige overflow-hidden"
      aria-label="Heritage locations sidebar"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-4 border-b border-beige shrink-0">
        {/* Eyebrow */}
        <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-1">
          {t("map.eyebrow", "Ward 16 · Kathmandu")}
        </p>
        {/* Title */}
        <h2 className="font-display text-xl font-bold text-charcoal leading-tight">
          {t("map.sidebar.title", "Heritage Locations")}
        </h2>
        {/* Count */}
        <p className="text-xs text-charcoal/50 mt-1">
          {locations.length} {t("map.sidebar.documentedCount", "locations documented")}
        </p>
      </div>

      {/* ── Search + Filter ─────────────────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-beige space-y-3 shrink-0">
        {/* Search input */}
        <label className="sr-only" htmlFor="landmark-search">{t("map.sidebar.searchPlaceholder", "Search heritage locations")}</label>
        <div className="flex items-center gap-2 bg-white border border-beige rounded-sm px-3 py-2 focus-within:border-gold transition-colors">
          <SearchIcon />
          <input
            id="landmark-search"
            type="search"
            placeholder={t("map.sidebar.searchPlaceholder", "Search locations…")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm text-charcoal bg-transparent outline-none placeholder:text-charcoal/35"
          />
          {/* Clear button — only shown when there's a query */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label={t("map.sidebar.clearSearch", "Clear search")}
              className="text-charcoal/40 hover:text-charcoal transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
              className={[
                "text-xs px-2.5 py-1 rounded-sm border transition-all duration-150 font-medium",
                activeFilter === filter.id
                  ? "bg-burgundy text-ivory border-burgundy"
                  : "bg-transparent text-charcoal/60 border-beige hover:border-gold hover:text-charcoal",
              ].join(" ")}
            >
              {categoryLabels[filter.id] || filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable body ──────────────────────────────────────────────────── */}
      {/* This area scrolls independently; the sidebar header stays fixed. */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Results count when searching/filtering */}
        {(searchQuery || activeFilter !== 'all') && (
          <p className="text-xs text-charcoal/40">
            {filteredLocations.length} result{filteredLocations.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Landmark list */}
        <LandmarkList
          locations={filteredLocations}
          selectedId={selectedId}
          onSelectLocation={onSelectLocation}
        />

        {/* Divider before info panel */}
        {selectedLocation && (
          <div className="border-t border-beige" aria-hidden="true" />
        )}

        {/* Selected landmark detail */}
        <LandmarkInfo location={selectedLocation} />
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="px-4 py-3 border-t border-beige bg-beige/40 shrink-0">
        <p className="text-xs text-charcoal/40 leading-relaxed text-center">
          Map data © OpenStreetMap contributors
        </p>
      </div>
    </aside>
  );
}
