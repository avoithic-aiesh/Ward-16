/**
 * mapConfig.js
 *
 * Central configuration for the heritage map (Module 3).
 *
 * MAP CENTER NOTE:
 * The defaultCenter below is the publicly known Kathmandu city-centre coordinate.
 * It is used only as a neutral starting view for the map — it does NOT claim to
 * represent the precise centre of Ward 16, which has not been verified.
 *
 * When verified Ward 16 boundary data is available, update wardCenter
 * and use it to set the initial map view.
 */

export const MAP_CONFIG = {
  /** Kathmandu city centre — neutral starting view (public knowledge). */
  defaultCenter: [27.7172, 85.324],

  defaultZoom: 14,
  minZoom: 10,
  maxZoom: 19,

  /** OpenStreetMap tile layer — free, open-source, no API key required. */
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

  /**
   * OSM attribution is required by the OpenStreetMap tile usage policy.
   * Never remove this.
   */
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',

  wardLabel: "Ward No. 16, Kathmandu Metropolitan City",
};

/**
 * Category filters for the sidebar.
 * "all" is always the first entry and matches every location.
 * Additional entries must match the categoryId values in heritageLocations.js.
 */
export const CATEGORY_FILTERS = [
  { id: "all", label: "All Locations" },
  { id: "water-heritage", label: "Water Heritage" },
  { id: "temple", label: "Temples" },
  { id: "cultural", label: "Cultural Heritage" },
  { id: "architecture", label: "Architecture" },
  { id: "community", label: "Community Heritage" },
];

/**
 * Marker colours — used by the custom SVG divIcon factory in HeritageMap.js.
 */
export const MARKER_COLORS = {
  default: "#702C38",   // Deep Burgundy
  selected: "#B89555",  // Antique Gold
  unverified: "#A65F45", // Terracotta (not placed on map, kept for reference)
};
