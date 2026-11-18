'use client';

/**
 * HeritageMap.js
 *
 * Interactive Leaflet atlas component styled after the user's Ward 16 map mockup:
 * - Rounded container with OpenStreetMap tiles
 * - Dashed burgundy polygon defining Ward 16 boundary
 * - Distinctive pill badge markers:
 *     - [ 22 Dhara ] (Deep teal badge #1E3A4C with coordinate dot)
 *     - [ Pyah Thwam Ajima ] (Burgundy badge #702C38 with coordinate dot)
 * - Click interaction navigating to the respective landmark's detailed page
 * - Animated camera transitions for [ Zoom to landmarks ] vs [ Whole ward ]
 */

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG, WARD_16_BOUNDARY } from '@/lib/mapConfig';

// ── Landmark custom pill badges matching the user mockup ───────────────────
function createLandmarkBadgeIcon({ name, color, isRightDot = false }) {
  const dotHtml = `<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${color}; border:2.5px solid #ffffff; box-shadow:0 1px 4px rgba(0,0,0,0.5); flex-shrink:0;"></span>`;
  const badgeHtml = `<span style="background:${color}; color:#ffffff; font-family:var(--font-noto-sans), sans-serif; font-size:12px; font-weight:700; padding:4.5px 12px; border-radius:9999px; border:1.5px solid rgba(255,255,255,0.85); box-shadow:0 3px 10px rgba(0,0,0,0.35); white-space:nowrap; letter-spacing:0.01em;">${name}</span>`;

  const innerHtml = isRightDot
    ? `<div style="display:flex; align-items:center; gap:6px; cursor:pointer; transform:translate(-82%, -50%); transition:transform 0.15s ease;">${badgeHtml}${dotHtml}</div>`
    : `<div style="display:flex; align-items:center; gap:6px; cursor:pointer; transform:translate(-18%, -50%); transition:transform 0.15s ease;">${dotHtml}${badgeHtml}</div>`;

  return L.divIcon({
    html: innerHtml,
    className: 'heritage-landmark-pill-marker',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -18],
  });
}

// ── Camera controller for view switching (Landmarks vs Whole Ward) ─────────
function MapViewController({ viewMode }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (viewMode === 'landmarks') {
      map.flyTo(MAP_CONFIG.landmarksCenter, MAP_CONFIG.landmarksZoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    } else if (viewMode === 'ward') {
      map.flyTo(MAP_CONFIG.wardCenter, MAP_CONFIG.wardZoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [viewMode, map]);

  return null;
}

export default function HeritageMap({
  locations = [],
  viewMode = 'landmarks',
  onSelectLocation,
}) {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={viewMode === 'ward' ? MAP_CONFIG.wardCenter : MAP_CONFIG.landmarksCenter}
        zoom={viewMode === 'ward' ? MAP_CONFIG.wardZoom : MAP_CONFIG.landmarksZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        zoomControl={true}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: '#E9DFCF' }}
      >
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url={MAP_CONFIG.tileUrl}
          attribution={MAP_CONFIG.attribution}
        />

        {/* Dynamic camera view controller */}
        <MapViewController viewMode={viewMode} />

        {/* Ward 16 Boundary Dashed Polygon */}
        <Polygon
          positions={WARD_16_BOUNDARY}
          pathOptions={{
            color: '#702C38',
            weight: 2.5,
            dashArray: '6, 8',
            fillColor: '#702C38',
            fillOpacity: 0.05,
          }}
        />

        {/* Landmark 1: 22 Dhara (Teal badge) */}
        <Marker
          position={[27.7372, 85.3025]}
          icon={createLandmarkBadgeIcon({
            name: '22 Dhara',
            color: '#1E3A4C',
            isRightDot: true,
          })}
          eventHandlers={{
            click: () => {
              if (onSelectLocation) onSelectLocation('22-dhara');
              window.location.href = '/heritage/22-dhara';
            },
          }}
        >
          <Popup className="heritage-popup">
            <div className="text-xs">
              <strong className="block text-sm text-[#1E3A4C] font-display">22 Dhara</strong>
              <span className="text-gray-500 font-serif">बाइस धारा (बालाजु)</span>
              <p className="mt-1 text-charcoal/80">Traditional 22 stone water spouts.</p>
              <a
                href="/heritage/22-dhara"
                className="inline-block mt-2 font-semibold text-burgundy underline"
              >
                Open landmark page →
              </a>
            </div>
          </Popup>
        </Marker>

        {/* Landmark 2: Pyah Thwam Ajima (Burgundy badge) */}
        <Marker
          position={[27.7355, 85.3090]}
          icon={createLandmarkBadgeIcon({
            name: 'Pyah Thwam Ajima',
            color: '#702C38',
            isRightDot: false,
          })}
          eventHandlers={{
            click: () => {
              if (onSelectLocation) onSelectLocation('pyatho-ajima');
              window.location.href = '/heritage/pyatho-ajima';
            },
          }}
        >
          <Popup className="heritage-popup">
            <div className="text-xs">
              <strong className="block text-sm text-[#702C38] font-display">Pyah Thwam Ajima</strong>
              <span className="text-gray-500 font-serif">प्याः थ्वं अजिमा मन्दिर</span>
              <p className="mt-1 text-charcoal/80">Protective mother-goddess sacred shrine.</p>
              <a
                href="/heritage/pyatho-ajima"
                className="inline-block mt-2 font-semibold text-burgundy underline"
              >
                Open landmark page →
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
