/**
 * src/i18n/config.js
 *
 * Central configuration for Ward 16 Digital Heritage bilingual system (Module 7).
 * Supported locales:
 *  - en: English
 *  - ne: नेपाली (Nepali Devanagari)
 */

export const SUPPORTED_LOCALES = ["en", "ne"];
export const DEFAULT_LOCALE = "en";

export const LOCALE_LABELS = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
  },
  ne: {
    code: "ne",
    label: "Nepali",
    nativeLabel: "नेपाली",
    dir: "ltr",
  },
};

export const STORAGE_KEY = "ward16_preferred_language";
export const COOKIE_KEY = "NEXT_LOCALE";
