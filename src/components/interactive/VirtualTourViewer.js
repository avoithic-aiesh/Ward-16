'use client';

/**
 * VirtualTourViewer.js
 *
 * Lightweight 360-degree panorama virtual tour viewer.
 *
 * Features:
 * - Drag-to-look 360 controls (mouse drag & touch swipe).
 * - Zoom controls (+ and -).
 * - Fullscreen mode support via Fullscreen API.
 * - Scene switcher pills.
 * - Architectural information hotspots plotted within the panoramic view.
 * - Graceful and clearly identified empty state when 360 equirectangular photographs are pending.
 */

import { useState, useRef, useEffect, useCallback } from 'react';

export default function VirtualTourViewer({ tourData }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [yaw, setYaw] = useState(0); // horizontal degrees (-180 to 180)
  const [pitch, setPitch] = useState(0); // vertical degrees (-60 to 60)
  const [zoom, setZoom] = useState(1); // 1 to 2.5
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspotText, setSelectedHotspotText] = useState(null);

  const containerRef = useRef(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const { title, subtitle, scenes = [] } = tourData || {};
  const activeScene = scenes[activeSceneIndex];

  // Drag-to-look pointer handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPointerRef.current.x;
    const deltaY = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    // Adjust yaw (horizontal) and pitch (vertical)
    setYaw((prev) => (prev - deltaX * 0.35 + 360) % 360);
    setPitch((prev) => Math.max(-45, Math.min(45, prev + deltaY * 0.25)));
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerUp]);

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(2.5, prev + 0.25));
  const handleZoomOut = () => setZoom((prev) => Math.max(1, prev - 0.25));

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!tourData || scenes.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-display text-2xl font-bold text-charcoal">
          {title?.en}
        </h3>
        {title?.ne && (
          <p className="text-xs text-charcoal/50 font-serif mt-0.5">
            {title.ne}
          </p>
        )}
        <p className="text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
          {subtitle?.en}
        </p>
      </div>

      {/* Main 360 Viewer Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-charcoal rounded-sm overflow-hidden select-none border border-beige shadow-xl cursor-grab active:cursor-grabbing touch-none"
      >
        {activeScene?.isAuthentic ? (
          /* When 360 panorama image is loaded */
          <div
            style={{
              transform: `scale(${zoom}) translate(${yaw}px, ${pitch}px)`,
              backgroundImage: `url(${activeScene.panoramaUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: `${yaw * 2}px ${pitch * 2}px`,
            }}
            className="w-full h-full transition-transform duration-75"
          />
        ) : (
          /* Clearly identified 360 empty-state with interactive simulation grid */
          <div className="w-full h-full relative bg-gradient-to-br from-[#1C1816] via-[#2A231E] to-[#171412] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Cylindrical / Equirectangular grid lines that respond to drag */}
            <div
              style={{
                transform: `rotate(${yaw * 0.15}deg) translateY(${pitch * 0.5}px)`,
                backgroundImage: `radial-gradient(circle at center, rgba(184, 149, 85, 0.25) 2px, transparent 2px)`,
                backgroundSize: `${36 * zoom}px ${36 * zoom}px`,
              }}
              className="absolute inset-[-50%] pointer-events-none transition-transform duration-75 opacity-40"
            />

            {/* Virtual 360 Compass Ring */}
            <div
              style={{ transform: `rotate(${yaw}deg) scale(${zoom})` }}
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-dashed border-gold/40 flex items-center justify-center pointer-events-none mb-2"
            >
              <div className="w-32 h-32 rounded-full border border-burgundy/40 flex items-center justify-center">
                <span className="font-mono text-[10px] text-gold uppercase tracking-widest">
                  N · {Math.round(yaw)}°
                </span>
              </div>
            </div>

            {/* Information Label */}
            <div className="relative z-10 max-w-sm space-y-1">
              <span className="font-display font-bold text-ivory text-base sm:text-lg block">
                {activeScene.title?.en}
              </span>
              <p className="text-xs text-ivory/60 italic">
                {activeScene.description?.en}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-mono text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/30">
                  Drag to look · 360° Panorama Asset Pending Upload
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 360 In-scene Hotspots Overlay */}
        {activeScene.hotspots && (
          <div className="absolute inset-0 pointer-events-none">
            {activeScene.hotspots.map((h, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspotText(h.text);
                }}
                style={{
                  left: `${((h.yaw - yaw + 180 + 360) % 360) / 3.6}%`,
                  top: `${50 - (h.pitch - pitch) * 0.8}%`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-gold/90 text-charcoal px-2 py-0.5 rounded-sm text-[11px] font-mono font-bold shadow-md hover:scale-110 transition-transform"
              >
                ● {h.text}
              </button>
            ))}
          </div>
        )}

        {/* Hotspot Info Popup Banner */}
        {selectedHotspotText && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-ivory/95 border border-gold px-4 py-2 rounded-sm shadow-xl flex items-center gap-3 text-xs text-charcoal max-w-sm">
            <span>{selectedHotspotText}</span>
            <button
              type="button"
              onClick={() => setSelectedHotspotText(null)}
              className="text-charcoal/50 hover:text-charcoal font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Floating Top Controls (Scene & Orientation) */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="text-xs font-mono text-ivory bg-charcoal/80 px-2.5 py-1 rounded-sm border border-ivory/20 shadow-sm backdrop-blur-sm">
            Scene 0{activeSceneIndex + 1}: {activeScene.title?.en}
          </span>
          <span className="text-[11px] font-mono text-gold bg-charcoal/80 px-2 py-1 rounded-sm border border-ivory/20 shadow-sm backdrop-blur-sm">
            Yaw: {Math.round(yaw)}° | Zoom: {zoom.toFixed(1)}x
          </span>
        </div>

        {/* Floating Bottom-Right Controls (Zoom & Fullscreen) */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 shadow-lg">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="w-8 h-8 rounded-sm bg-charcoal/85 hover:bg-burgundy text-ivory flex items-center justify-center font-bold text-base transition-colors border border-ivory/20"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="w-8 h-8 rounded-sm bg-charcoal/85 hover:bg-burgundy text-ivory flex items-center justify-center font-bold text-base transition-colors border border-ivory/20"
          >
            −
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="w-8 h-8 rounded-sm bg-charcoal/85 hover:bg-gold hover:text-charcoal text-ivory flex items-center justify-center transition-colors border border-ivory/20"
          >
            {isFullscreen ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Scene Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-charcoal/50 font-mono">Panoramic Scenes:</span>
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                setActiveSceneIndex(idx);
                setYaw(0);
                setPitch(0);
                setSelectedHotspotText(null);
              }}
              className={[
                "text-xs px-3 py-1 rounded-sm border transition-colors font-medium",
                activeSceneIndex === idx
                  ? "bg-burgundy text-ivory border-burgundy shadow-xs"
                  : "bg-white text-charcoal/70 border-beige hover:border-gold",
              ].join(" ")}
            >
              0{idx + 1}. {scene.title?.en}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-charcoal/50 italic">
          To display authentic equirectangular 360° photos, place them in <code className="font-mono bg-beige/60 px-1 py-0.5 rounded">public/images/</code>.
        </p>
      </div>
    </div>
  );
}
