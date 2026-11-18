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
  defaultCenter: [27.7350, 85.3055],

  defaultZoom: 14.5,
  minZoom: 10,
  maxZoom: 19,

  /** Landmarks focused view */
  landmarksCenter: [27.7364, 85.3058],
  landmarksZoom: 15.5,

  /** Whole Ward 16 boundary view */
  wardCenter: [27.7305, 85.3050],
  wardZoom: 14,

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
 * Approximate Ward 16 Kathmandu Metropolitan City boundary polygon
 * for visual reference on the interactive heritage atlas.
 */
export const WARD_16_BOUNDARY = [
  [27.7425, 85.2975],
  [27.7435, 85.3030],
  [27.7415, 85.3090],
  [27.7395, 85.3135],
  [27.7330, 85.3120],
  [27.7245, 85.3105],
  [27.7170, 85.3080],
  [27.7180, 85.3015],
  [27.7240, 85.2965],
  [27.7325, 85.2975],
  [27.7390, 85.2970],
  [27.7425, 85.2975],
];

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
