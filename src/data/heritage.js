/**
 * src/data/heritage.js
 *
 * Heritage site data — the single source of truth for
 * information about the documented locations in Ward 16.
 *
 * IMPORTANT PROJECT RULE:
 * Do NOT invent or fabricate historical facts, coordinates,
 * or descriptions. Fields left as null or empty string mean
 * that verified content has not yet been added.
 *
 * Future modules will:
 *  - Add more content fields (gallery images, audio guides, etc.)
 *  - Connect to a CMS or database
 *  - Add Nepali-language translations (bilingual support)
 */

export const HERITAGE_SITES = [
  {
    // ---- Unique identifier used in URLs: /heritage/22-dhara ----
    id: "22-dhara",
    slug: "22-dhara",

    // ---- Display names ----
    name: "22 Dhara",
    nameNepali: "बाइस धारा",           // For future bilingual support
    alternateNames: ["Balaju Baisdhara", "Balaju Twenty-Two Waterspouts"],

    // ---- Categorisation ----
    category: "Water Shrine",
    tags: ["dhara", "water", "religious", "historic"],

    // ---- Location ----
    // Coordinates are intentionally left null until verified
    // from official sources. Do NOT estimate or guess.
    coordinates: null,     // { lat: null, lng: null }
    address: "Balaju, Ward No. 16, Kathmandu Metropolitan City",
    ward: 16,

    // ---- Short teaser (used in cards and meta descriptions) ----
    teaser:
      "A historic royal waterworks featuring 22 stone waterspouts " +
      "— one of Kathmandu's most revered traditional water management sites.",

    // ---- Full description placeholder ----
    // Replace null with verified, community-sourced content.
    description: null,

    // ---- Media placeholders ----
    coverImage: null,          // Path to cover image in /public
    gallery: [],               // Array of image paths
    audioGuideUrl: null,       // For future audio-tour feature

    // ---- Status ----
    featured: true,
    contentStatus: "placeholder",   // "placeholder" | "draft" | "published"
  },

  {
    id: "pyatho-ajima",
    slug: "pyatho-ajima",

    name: "Pyatho Ajima Temple",
    nameNepali: "प्याठो अजिमा मन्दिर",
    alternateNames: ["Pyatho Ajima", "Pyatho Devi"],

    category: "Temple",
    tags: ["temple", "ajima", "goddess", "religious", "cultural"],

    coordinates: null,
    address: "Ward No. 16, Kathmandu Metropolitan City",
    ward: 16,

    teaser:
      "A sacred Ajima temple dedicated to the protective mother goddess, " +
      "central to the religious and cultural life of the local Newar community.",

    description: null,

    coverImage: null,
    gallery: [],
    audioGuideUrl: null,

    featured: true,
    contentStatus: "placeholder",
  },
];

/**
 * Helper: get a single site by its slug.
 * Usage: const site = getHeritageSite("22-dhara");
 */
export function getHeritageSite(slug) {
  return HERITAGE_SITES.find((site) => site.slug === slug) ?? null;
}

/**
 * Helper: get all featured sites.
 */
export function getFeaturedSites() {
  return HERITAGE_SITES.filter((site) => site.featured);
}
