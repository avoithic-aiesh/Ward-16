/**
 * heritageLocations.js
 *
 * Landmark data specifically for the interactive heritage map (Module 3).
 * This is separate from /data/heritage.js (which powers the homepage cards).
 *
 * COORDINATE POLICY (strict):
 * - lat / lng remain null until coordinates are verified from an authoritative source.
 * - locationStatus: "unverified" → no map pin is placed.
 * - locationStatus: "verified"   → map pin is placed at lat/lng.
 * - locationStatus: "approximate"→ pin placed but clearly labelled as approximate.
 *
 * To add a verified location: set lat, lng, locationStatus: "verified",
 * locationSource (describe the source), and locationVerifiedDate.
 */

export const HERITAGE_LOCATIONS = [
  {
    // ── Identity ──────────────────────────────────────────────────────────────
    id: "22-dhara",
    name: "22 Dhara",
    nameNepali: "बाइस धारा",
    nameAlternate: "Balaju Baisdhara",
    slug: "22-dhara",

    // ── Classification ────────────────────────────────────────────────────────
    category: "Water Heritage",
    categoryId: "water-heritage",
    tags: ["dhara", "water spout", "balaju", "traditional", "public infrastructure"],

    // ── Description ───────────────────────────────────────────────────────────
    teaser: "A celebrated row of traditional stone water spouts representing centuries of Newari water engineering.",
    description:
      "22 Dhara, also known as Balaju Baisdhara, is a historic row of twenty-two stone water spouts (dhara) in the Balaju area. These stone-carved water spouts are an enduring example of the Newari tradition of public water infrastructure, blending functional design with cultural and religious significance. The site continues to be used by local communities.",

    // ── Location ──────────────────────────────────────────────────────────────
    // Coordinates are NOT set here. They will be added once verified from
    // an authoritative source such as a government survey or official map.
    lat: null,
    lng: null,
    locationStatus: "unverified", // "verified" | "unverified" | "approximate"
    locationSource: null,         // e.g. "Survey of Nepal, 2024"
    locationVerifiedDate: null,   // ISO date string when verified

    address: "Balaju, Ward No. 16, Kathmandu Metropolitan City",
    ward: 16,

    // ── Media ─────────────────────────────────────────────────────────────────
    // Set image path once an authentic, rights-cleared photograph is available.
    image: null,
    imageCaption: null,
    imageCredit: null,

    // ── Status ────────────────────────────────────────────────────────────────
    featured: true,
    conservationStatus: null, // e.g. "Protected", "At Risk"
  },

  {
    // ── Identity ──────────────────────────────────────────────────────────────
    id: "pyatho-ajima",
    name: "Pyatho Ajima Temple",
    nameNepali: "प्याठो अजिमा मन्दिर",
    nameAlternate: "Pyatho Ajima",
    slug: "pyatho-ajima",

    // ── Classification ────────────────────────────────────────────────────────
    category: "Temple",
    categoryId: "temple",
    tags: ["ajima", "temple", "goddess", "newari", "religious", "community"],

    // ── Description ───────────────────────────────────────────────────────────
    teaser: "A revered community temple dedicated to Ajima, the protective goddess central to Newari religious life.",
    description:
      "Pyatho Ajima Temple is a significant place of worship within Ward 16, dedicated to Ajima — a protective mother goddess revered in the Newari tradition. The temple serves as a living centre of community religious practice, with regular festivals and rituals that connect residents to their cultural heritage. The site reflects the deep integration of sacred space and neighbourhood life that characterises Kathmandu's historic urban fabric.",

    // ── Location ──────────────────────────────────────────────────────────────
    lat: null,
    lng: null,
    locationStatus: "unverified",
    locationSource: null,
    locationVerifiedDate: null,

    address: "Ward No. 16, Kathmandu Metropolitan City",
    ward: 16,

    // ── Media ─────────────────────────────────────────────────────────────────
    image: null,
    imageCaption: null,
    imageCredit: null,

    // ── Status ────────────────────────────────────────────────────────────────
    featured: true,
    conservationStatus: null,
  },
];

/**
 * Returns only locations that have verified coordinates and can be shown on the map.
 */
export function getVerifiedLocations() {
  return HERITAGE_LOCATIONS.filter(
    (loc) => loc.locationStatus === "verified" && loc.lat !== null && loc.lng !== null
  );
}

/**
 * Returns a single location by its id, or undefined if not found.
 */
export function getLocationById(id) {
  return HERITAGE_LOCATIONS.find((loc) => loc.id === id);
}

/**
 * Returns all unique category ids present in the data.
 * Useful for dynamically building filter buttons.
 */
export function getCategories() {
  const seen = new Set();
  return HERITAGE_LOCATIONS.filter((loc) => {
    if (seen.has(loc.categoryId)) return false;
    seen.add(loc.categoryId);
    return true;
  }).map((loc) => ({ id: loc.categoryId, label: loc.category }));
}
