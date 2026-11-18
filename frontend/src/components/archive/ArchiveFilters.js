"use client";

/**
 * src/components/archive/ArchiveFilters.js
 *
 * Filter and search toolbar for the Community Archive.
 */

import { ARCHIVE_CATEGORIES } from "@/data/communityArchiveData";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ArchiveFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  totalResults,
  onClearFilters,
}) {
  const { t, isNepali } = useLanguage();

  const isFiltered = searchQuery || selectedCategory !== "all" || selectedLocation !== "all";

  return (
    <div className="bg-ivory border border-beige p-5 sm:p-6 rounded-sm shadow-xs space-y-5">
      {/* Search Input & Location Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <label htmlFor="archive-search" className="sr-only">
            {t("communityArchive.searchPlaceholder", "Search stories…")}
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal/40">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="archive-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("communityArchive.searchPlaceholder", "Search stories, contributors, topics…")}
            className="w-full pl-10 pr-4 py-2.5 bg-ivory text-charcoal placeholder-charcoal/40 text-sm border border-beige focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold rounded-sm transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal/40 hover:text-charcoal"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Heritage Location Filter */}
        <div>
          <label htmlFor="archive-location" className="sr-only">
            {t("communityArchive.allLocations", "All Locations")}
          </label>
          <select
            id="archive-location"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-ivory text-charcoal text-sm border border-beige focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold rounded-sm transition-colors"
          >
            <option value="all">{t("communityArchive.allLocations", "All Locations")}</option>
            <option value="22-dhara">
              {isNepali ? "२२ धारा (बालाजु बाइसधारा)" : "22 Dhara (Balaju Baisdhara)"}
            </option>
            <option value="pyatho-ajima">
              {isNepali ? "प्याठो अजिमा मन्दिर" : "Pyatho Ajima Temple"}
            </option>
            <option value="ward-16-general">
              {isNepali ? "काठमाडौँ वडा १६ समग्र" : "General Ward 16 Heritage"}
            </option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="pt-2 border-t border-beige/60 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-3 py-1.5 text-xs font-body font-medium rounded-sm transition-all duration-150 ${
            selectedCategory === "all"
              ? "bg-burgundy text-ivory shadow-xs"
              : "bg-beige/50 text-charcoal/70 hover:bg-beige hover:text-charcoal"
          }`}
        >
          {t("communityArchive.allCategories", "All Categories")}
        </button>
        {ARCHIVE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const label = isNepali ? cat.label.ne : cat.label.en;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 text-xs font-body font-medium rounded-sm transition-all duration-150 ${
                isSelected
                  ? "bg-burgundy text-ivory shadow-xs"
                  : "bg-beige/50 text-charcoal/70 hover:bg-beige hover:text-charcoal"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Active Filter Summary Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-charcoal/60 pt-1">
        <span>
          {isNepali ? `कुल परिणाम: ${totalResults} संस्मरण` : `Showing ${totalResults} documented stories`}
        </span>
        {isFiltered && (
          <button
            onClick={onClearFilters}
            className="text-burgundy hover:text-burgundy-light font-medium underline underline-offset-2 transition-colors"
          >
            {t("communityArchive.clearFilters", "Clear all filters")}
          </button>
        )}
      </div>
    </div>
  );
}
