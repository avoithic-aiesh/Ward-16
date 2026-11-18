"use client";

/**
 * src/components/archive/ArchivePageClient.js
 *
 * Client interactive controller for the Community Archive homepage.
 * Handles client-side searching, category filtering, and location selection.
 */

import { useState, useMemo } from "react";
import ArchiveHero from "./ArchiveHero";
import ArchivalDisclaimer from "./ArchivalDisclaimer";
import ArchiveFilters from "./ArchiveFilters";
import StoryCard from "./StoryCard";
import FeaturedStoryBanner from "./FeaturedStoryBanner";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ArchivePageClient({ initialStories = [] }) {
  const { t, isNepali } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Find the featured story (or fallback to the first)
  const featuredStory = useMemo(() => {
    return initialStories.find((s) => s.featured) || initialStories[0] || null;
  }, [initialStories]);

  // Filtered stories list
  const filteredStories = useMemo(() => {
    return initialStories.filter((story) => {
      // 1. Category
      if (selectedCategory !== "all" && story.category !== selectedCategory) {
        return false;
      }

      // 2. Location
      if (selectedLocation !== "all" && story.heritageLocation.id !== selectedLocation) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleEn = story.title?.en?.toLowerCase() || "";
        const titleNe = story.title?.ne?.toLowerCase() || "";
        const summaryEn = story.summary?.en?.toLowerCase() || "";
        const summaryNe = story.summary?.ne?.toLowerCase() || "";
        const author = story.contributor?.name?.toLowerCase() || "";
        const authorNe = story.contributor?.nameNepali?.toLowerCase() || "";
        const tags = (story.tags || []).join(" ").toLowerCase();

        const matches =
          titleEn.includes(q) ||
          titleNe.includes(q) ||
          summaryEn.includes(q) ||
          summaryNe.includes(q) ||
          author.includes(q) ||
          authorNe.includes(q) ||
          tags.includes(q);

        if (!matches) return false;
      }

      return true;
    });
  }, [initialStories, selectedCategory, selectedLocation, searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* 1. Archive Hero */}
      <ArchiveHero />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {/* 2. Distinction & Ethics Disclaimer */}
        <ArchivalDisclaimer />

        {/* 3. Featured Story Highlight (shows when no search filter active) */}
        {!searchQuery && selectedCategory === "all" && selectedLocation === "all" && featuredStory && (
          <div className="space-y-4">
            <h2 className="font-display font-semibold text-charcoal text-2xl">
              {t("communityArchive.featuredHeading", "Featured Community Stories")}
            </h2>
            <FeaturedStoryBanner story={featuredStory} />
          </div>
        )}

        {/* 4. Filter Toolbar & Search Bar */}
        <section id="explore-stories" className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-semibold text-charcoal text-2xl sm:text-3xl">
                {t("communityArchive.recentHeading", "Recent Contributions & Testimonies")}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/60 mt-1">
                {isNepali
                  ? "स्थानीय बासिन्दा र अध्येताहरूद्वारा साझा गरिएका कथाहरू"
                  : "Stories, memories, and personal field notes preserved by the community"}
              </p>
            </div>
            <Link
              href="/community-archive/submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              <span>+</span>
              <span>{t("communityArchive.shareStoryCta", "Contribute Your Story")}</span>
            </Link>
          </div>

          <ArchiveFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            totalResults={filteredStories.length}
            onClearFilters={handleClearFilters}
          />

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-beige/30 border border-beige rounded-sm">
              <span className="text-4xl text-charcoal/30 block mb-3 font-display">◈</span>
              <h3 className="font-display text-lg font-semibold text-charcoal">
                {t("communityArchive.noStoriesFound", "No community stories matched your search filters.")}
              </h3>
              <p className="text-sm text-charcoal/60 mt-2 max-w-md mx-auto">
                {isNepali
                  ? "कृपया खोजी शब्द वा फिल्टर परिवर्तन गर्नुहोस् वा सबै फिल्टर हटाउनुहोस्।"
                  : "Try adjusting your search terms or clearing the selected category and location filters."}
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-5 px-4 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-charcoal/80 transition-colors"
              >
                {t("communityArchive.clearFilters", "Clear all filters")}
              </button>
            </div>
          )}
        </section>

        {/* 5. Closing Contribution Prompt */}
        <div className="p-8 sm:p-12 bg-charcoal text-ivory rounded-sm border border-gold/40 text-center space-y-4">
          <span className="text-gold text-2xl font-display">◈</span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            {isNepali
              ? "तपाईंसँग पनि वडा नं. १६ को पुरानो सम्झना वा तस्बिर छ?"
              : "Do you have an elder's memory, family photo, or personal reflection?"}
          </h2>
          <p className="text-sm sm:text-base text-ivory/70 max-w-xl mx-auto leading-relaxed">
            {isNepali
              ? "भावी पुस्ताका लागि वडा १६ को जीवित सम्पदा जोगाउन सहयोग गर्नुहोस्। तपाईंको कथा समीक्षापछि अभिलेखालयमा सुरक्षित गरिनेछ।"
              : "Every story matters. Help us document the human tapestry of Ward 16. All contributions are preserved with respectful attribution and care."}
          </p>
          <div className="pt-2">
            <Link
              href="/community-archive/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md"
            >
              <span>{t("communityArchive.shareStoryCta", "Contribute Your Story")}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
