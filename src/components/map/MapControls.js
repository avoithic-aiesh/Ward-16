'use client';

/**
 * MapControls.js
 *
 * Custom zoom and reset controls rendered inside the Leaflet map.
 * Uses the useMap() hook from react-leaflet, which must be called
 * inside a component that is a *child* of <MapContainer>.
 *
 * We hide Leaflet's default zoom controls (zoomControl={false} on MapContainer)
 * and replace them with these heritage-styled buttons.
 */

import { useMap } from 'react-leaflet';
import { MAP_CONFIG } from '@/lib/mapConfig';

export default function MapControls() {
  // useMap() gives us the Leaflet map instance.
  // This hook ONLY works when this component is rendered inside <MapContainer>.
  const map = useMap();

  function zoomIn() {
    map.zoomIn();
  }

  function zoomOut() {
    map.zoomOut();
  }

  function resetView() {
    // Return to the default Kathmandu city-centre view
    map.setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom, {
      animate: true,
    });
  }

  return (
    /*
     * Leaflet renders its own overlay pane for controls.
     * We use `leaflet-top leaflet-right` classes to position inside Leaflet's
     * control corner — this keeps us out of the DOM flow of the React page.
     * The z-index (z-[1000]) ensures we appear above the tile layer.
     */
    <div className="leaflet-top leaflet-right" style={{ pointerEvents: 'auto' }}>
      <div className="leaflet-control m-3 flex flex-col gap-1 shadow-md">
        {/* Zoom In */}
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          title="Zoom in"
          className="
            w-9 h-9 flex items-center justify-center
            bg-ivory border border-beige
            text-charcoal hover:bg-burgundy hover:text-ivory hover:border-burgundy
            transition-colors duration-150 rounded-t-sm
            text-lg font-light leading-none
          "
        >
          +
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          title="Zoom out"
          className="
            w-9 h-9 flex items-center justify-center
            bg-ivory border border-beige border-t-0
            text-charcoal hover:bg-burgundy hover:text-ivory hover:border-burgundy
            transition-colors duration-150
            text-lg font-light leading-none
          "
        >
          −
        </button>

        {/* Reset view */}
        <button
          type="button"
          onClick={resetView}
          aria-label="Reset map view to Kathmandu"
          title="Reset view"
          className="
            w-9 h-9 flex items-center justify-center
            bg-ivory border border-beige border-t-0
            text-charcoal hover:bg-gold hover:text-ivory hover:border-gold
            transition-colors duration-150 rounded-b-sm
          "
        >
          {/* Home / reset icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 12L12 3l9 9" />
            <path d="M9 21V12h6v9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
