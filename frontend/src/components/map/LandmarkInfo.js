'use client';

/**
 * LandmarkInfo.js
 *
 * Displays detailed information for the currently selected heritage location.
 * Shown below the landmark list in the sidebar.
 *
 * Content integrity rules enforced here:
 * - Coordinates are only shown when locationStatus === "verified".
 * - A clear "Location Verification Pending" notice is shown for unverified sites.
 * - No invented historical facts are displayed.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

// ── Category icon (simple SVG, inline) ────────────────────────────────────
function CategoryIcon({ categoryId }) {
  if (categoryId === 'temple') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2L2 7h20L12 2z" />
        <rect x="4" y="7" width="16" height="13" />
        <rect x="9" y="12" width="6" height="8" />
      </svg>
    );
  }
  if (categoryId === 'water-heritage') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z" />
      </svg>
    );
  }
  // Generic
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function LandmarkInfo({ location }) {
  const { t, isNepali } = useLanguage();

  // No location selected — show a prompt
  if (!location) {
    return (
      <div className="mt-4 p-4 border border-dashed border-charcoal/15 rounded-sm text-center">
        <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center mx-auto mb-2">
          <svg className="w-4 h-4 text-charcoal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <p className="text-xs text-charcoal/50 italic leading-relaxed">
          {t("map.sidebar.selectPrompt", "Select a location from the list above to view its details.")}
        </p>
      </div>
    );
  }

  const isUnverified = location.locationStatus === 'unverified';
  const isApproximate = location.locationStatus === 'approximate';

  return (
    <div className="mt-4 border border-beige rounded-sm overflow-hidden">
      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-32 bg-beige flex items-center justify-center">
        {location.image ? (
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover"
            sizes="320px"
          />
        ) : (
          /* Placeholder when no authenticated image is available */
          <div className="flex flex-col items-center gap-1 text-charcoal/30">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs">{t("map.sidebar.photoComingSoon", "Photo coming soon")}</span>
          </div>
        )}

        {/* Category badge overlaid on image */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-burgundy text-ivory text-xs px-2 py-1 rounded-sm">
          <CategoryIcon categoryId={location.categoryId} />
          <span>{location.category}</span>
        </div>
      </div>

      {/* ── Info body ──────────────────────────────────────────────────────── */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div>
          <h3 className="font-display font-semibold text-charcoal text-base leading-tight">
            {isNepali ? (location.nameNepali || location.name) : location.name}
          </h3>
          <p className="text-charcoal/50 text-sm font-serif mt-0.5">
            {isNepali ? location.name : location.nameNepali}
          </p>
          {location.nameAlternate && location.nameAlternate !== location.name && (
            <p className="text-charcoal/40 text-xs mt-0.5 italic">
              {isNepali ? "अर्को नाम:" : "Also known as:"} {location.nameAlternate}
            </p>
          )}
        </div>

        {/* Address */}
        {location.address && (
          <div className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <p className="text-xs text-charcoal/60 leading-relaxed">{location.address}</p>
          </div>
        )}

        {/* Description */}
        {location.description && (
          <p className="text-xs text-charcoal/70 leading-relaxed border-t border-beige pt-3">
            {location.description}
          </p>
        )}

        {/* ── Location verification status ───────────────────────────────── */}
        <div className={[
          "rounded-sm p-3 text-xs leading-relaxed",
          isUnverified
            ? "bg-terracotta/8 border border-terracotta/20 text-charcoal/70"
            : isApproximate
            ? "bg-gold/8 border border-gold/20 text-charcoal/70"
            : "bg-gold/10 border border-gold/25 text-charcoal/70",
        ].join(" ")}>
          {isUnverified && (
            <>
              <p className="font-semibold text-terracotta mb-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                Location Verification Pending
              </p>
              <p>
                Coordinates for this location have not yet been verified from an authoritative source.
                The site will appear on the map once its location is confirmed.
              </p>
            </>
          )}
          {isApproximate && (
            <>
              <p className="font-semibold text-gold mb-1">Approximate Location</p>
              <p>
                The coordinates shown are approximate.
                {location.locationSource && ` Source: ${location.locationSource}.`}
              </p>
            </>
          )}
          {!isUnverified && !isApproximate && (
            <>
              <p className="font-semibold text-gold mb-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Verified Location
              </p>
              {location.locationSource && <p>Source: {location.locationSource}</p>}
              {location.lat !== null && (
                <p className="mt-1 font-mono text-charcoal/50">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
            </>
          )}
        </div>

        {/* Detail page link */}
        <div className="pt-1">
          {location.id === '22-dhara' && (
            <Link
              href="/heritage/22-dhara"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
            >
              <span>{isNepali ? "२२ धारा सम्पदा अभिलेख हेर्नुहोस्" : "Explore 22 Dhara Heritage Archive"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
          {location.id === 'pyatho-ajima' && (
            <Link
              href="/heritage/pyatho-ajima"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
            >
              <span>{isNepali ? "प्याठो अजिमा सम्पदा अभिलेख हेर्नुहोस्" : "Explore Pyatho Ajima Heritage Archive"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
