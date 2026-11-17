'use client';

/**
 * LandmarkList.js
 *
 * Renders the scrollable list of heritage locations in the map sidebar.
 * Each item shows the location name, Nepali name, category, and verification status.
 * Clicking an item calls onSelectLocation(id) to sync with the map.
 */

import { useLanguage } from '@/i18n/LanguageContext';

// ── Badge component ────────────────────────────────────────────────────────
function StatusBadge({ status, isNepali }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-sm bg-gold/15 text-gold border border-gold/30 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
        {isNepali ? "प्रमाणित" : "Verified"}
      </span>
    );
  }
  if (status === "approximate") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-sm bg-terracotta/15 text-terracotta border border-terracotta/30 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta inline-block" />
        {isNepali ? "अनुमानित" : "Approximate"}
      </span>
    );
  }
  // "unverified" — default
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-sm bg-beige text-charcoal/60 border border-charcoal/15 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 inline-block" />
      {isNepali ? "प्रमाणीकरण बाँकी" : "Pending Verification"}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function LandmarkList({ locations, selectedId, onSelectLocation }) {
  const { t, isNepali } = useLanguage();

  if (!locations || locations.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-charcoal/50 italic">{t("map.sidebar.noResults", "No locations match your search.")}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {locations.map((location) => {
        const isSelected = location.id === selectedId;

        return (
          <li key={location.id}>
            <button
              type="button"
              onClick={() => onSelectLocation(location.id)}
              aria-pressed={isSelected}
              aria-label={`Select ${location.name}`}
              className={[
                // Base styles
                "w-full text-left px-3 py-3 rounded-sm border transition-all duration-200 group",
                // Selected state
                isSelected
                  ? "border-burgundy bg-burgundy/5 shadow-sm"
                  : "border-transparent hover:border-beige hover:bg-ivory/60 bg-transparent",
              ].join(" ")}
            >
              {/* Location name */}
              <p
                className={[
                  "text-sm font-semibold leading-snug transition-colors",
                  isSelected ? "text-burgundy" : "text-charcoal group-hover:text-burgundy",
                ].join(" ")}
              >
                {isNepali ? (location.nameNepali || location.name) : location.name}
              </p>

              {/* Sub-name */}
              <p className="text-xs text-charcoal/50 mt-0.5 font-serif">
                {isNepali ? location.name : location.nameNepali}
              </p>

              {/* Category + status row */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs text-gold font-medium uppercase tracking-wide">
                  {location.category}
                </span>
                <span className="text-charcoal/20 text-xs" aria-hidden="true">·</span>
                <StatusBadge status={location.locationStatus} isNepali={isNepali} />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
