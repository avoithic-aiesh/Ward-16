'use client';

/**
 * HeritageMap.js
 *
 * The Leaflet interactive map, rendered entirely on the client.
 *
 * WHY CLIENT ONLY?
 * Leaflet depends on browser APIs (window, document, DOM).
 * These don't exist during Next.js server-side rendering.
 * This component is loaded via dynamic(() => import(...), { ssr: false })
 * in MapPageClient.js, which prevents any server-side execution.
 *
 * LEAFLET CSS:
 * Imported here (not in layout.js) so it only loads with this client chunk.
 *
 * CUSTOM MARKERS:
 * We use L.divIcon with an inline SVG string.
 * Leaflet's default L.Icon uses image files whose paths break with
 * modern bundlers (webpack, Turbopack). divIcon avoids that problem
 * entirely and lets us style markers with the heritage colour palette.
 *
 * COORDINATE POLICY:
 * Only locations with locationStatus === "verified" and non-null lat/lng
 * have markers placed on the map.
 */

// Leaflet CSS must be imported in the client component that uses it.
import 'leaflet/dist/leaflet.css';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG } from '@/lib/mapConfig';
import MapControls from './MapControls';

// ── Custom SVG marker factory ──────────────────────────────────────────────
/**
 * Creates a Leaflet divIcon using an inline SVG.
 * This avoids the broken-image-path issue with L.Icon.Default.
 *
 * @param {boolean} isSelected - If true, renders in antique gold; otherwise deep burgundy.
 * @returns {L.DivIcon}
 */
function createHeritageIcon(isSelected = false) {
  const fill = isSelected ? '#B89555' : '#702C38'; // gold : burgundy
  const innerFill = '#F7F2E8'; // ivory centre dot

  return L.divIcon({
    // The HTML string rendered as the marker DOM element.
    html: `
      <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Teardrop pin shape -->
        <path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 12 24 14 26 2-2 14-16.5 14-26 0-7.73-6.27-14-14-14z" fill="${fill}"/>
        <!-- Inner decorative circle -->
        <circle cx="14" cy="14" r="6" fill="${innerFill}" opacity="0.9"/>
        <!-- Small central dot -->
        <circle cx="14" cy="14" r="2.5" fill="${fill}"/>
      </svg>
    `,
    // Empty string removes Leaflet's default white box around divIcons
    className: '',
    iconSize: [28, 40],
    iconAnchor: [14, 40], // tip of the pin sits at the coordinate
    popupAnchor: [0, -42], // popup appears above the pin
  });
}

// ── Empty state shown when there are no verified locations ─────────────────
function MapEmptyState() {
  return (
    <div
      className="
        absolute inset-0 z-[500] flex items-center justify-center
        pointer-events-none
      "
    >
      <div
        className="
          bg-ivory/95 border border-beige rounded-sm shadow-lg
          px-6 py-5 max-w-xs text-center pointer-events-auto
        "
      >
        <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-charcoal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <p className="font-display text-charcoal font-semibold text-sm mb-1">
          Locations Pending Verification
        </p>
        <p className="text-xs text-charcoal/55 leading-relaxed">
          Heritage site coordinates are being verified from authoritative sources.
          Markers will appear here once confirmed.
        </p>
        <div className="mt-3 w-8 h-px bg-gold mx-auto" />
        <p className="text-xs text-gold mt-2 font-medium">Coming Soon</p>
      </div>
    </div>
  );
}

// ── Scroll/click handler: fly to a marker when it's selected ──────────────
// This sub-component lives inside <MapContainer> so it can use useMap().
function MapFlyTo({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location && location.lat !== null && location.lng !== null) {
      map.flyTo([location.lat, location.lng], Math.max(map.getZoom(), 16), {
        duration: 1.2,
      });
    }
  }, [location, map]);
  return null; // renders nothing — just a side-effect component
}

// ── Main exported component ────────────────────────────────────────────────
export default function HeritageMap({ locations, selectedId, onSelectLocation }) {
  // Only render markers for locations with verified, non-null coordinates.
  const verifiedLocations = locations.filter(
    (loc) =>
      loc.locationStatus === 'verified' &&
      loc.lat !== null &&
      loc.lng !== null
  );

  const hasVerifiedLocations = verifiedLocations.length > 0;

  // Find the selected verified location (for fly-to animation)
  const selectedVerified = verifiedLocations.find((loc) => loc.id === selectedId) || null;

  return (
    <div className="relative w-full h-full">
      {/*
       * MapContainer: the root Leaflet element.
       *
       * zoomControl={false} — we disable Leaflet's default zoom buttons
       *   because we render our own heritage-styled MapControls.
       *
       * scrollWheelZoom={true} — standard map UX.
       *
       * style must be explicit because Leaflet requires a fixed height.
       * The parent container in MapPageClient already sets the height.
       */}
      <MapContainer
        center={MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: '#E9DFCF' }} /* beige fallback while tiles load */
      >
        {/* ── OpenStreetMap tiles ──────────────────────────────────────────── */}
        <TileLayer
          url={MAP_CONFIG.tileUrl}
          attribution={MAP_CONFIG.attribution}
        />

        {/* ── Heritage-styled zoom + reset controls ───────────────────────── */}
        <MapControls />

        {/* ── Fly-to animation when selection changes ──────────────────────── */}
        <MapFlyTo location={selectedVerified} />

        {/* ── Markers — only for verified locations ───────────────────────── */}
        {verifiedLocations.map((location) => {
          const isSelected = location.id === selectedId;

          return (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createHeritageIcon(isSelected)}
              eventHandlers={{
                // Clicking a marker selects it in the sidebar too
                click: () => onSelectLocation(location.id),
              }}
              aria-label={location.name}
            >
              {/* Minimal popup — full details are in the sidebar */}
              <Popup
                closeButton={false}
                className="heritage-popup"
                offset={[0, -38]}
              >
                <div className="text-xs font-sans">
                  <p className="font-semibold text-charcoal text-sm leading-tight">
                    {location.name}
                  </p>
                  {location.nameNepali && (
                    <p className="text-charcoal/50 mt-0.5">{location.nameNepali}</p>
                  )}
                  <p className="text-gold text-xs mt-1 font-medium uppercase tracking-wide">
                    {location.category}
                  </p>
                  {location.teaser && (
                    <p className="text-charcoal/65 mt-1.5 leading-relaxed max-w-[200px]">
                      {location.teaser}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* ── Empty state overlay (no verified locations yet) ──────────────── */}
      {!hasVerifiedLocations && <MapEmptyState />}
    </div>
  );
}
