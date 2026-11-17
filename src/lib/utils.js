/**
 * src/lib/utils.js
 *
 * General-purpose utility functions used across the project.
 *
 * Keep this file small and focused — only add helpers that are
 * genuinely reused in multiple places.
 */

/**
 * cn() — Merge class names, filtering out falsy values.
 *
 * A lightweight alternative to the `clsx` package.
 * Useful for conditionally applying Tailwind classes.
 *
 * Usage:
 *   cn("base-class", isActive && "active-class", className)
 *
 * @param {...(string|boolean|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * formatDate() — Format a date string for display.
 *
 * Returns a localised, human-readable date string.
 * Falls back gracefully if the input is invalid.
 *
 * Usage:
 *   formatDate("2024-04-14")  → "14 April 2024"
 *
 * @param {string|Date} date
 * @param {string} locale  — BCP 47 language tag, e.g. "en-NP"
 * @returns {string}
 */
export function formatDate(date, locale = "en-NP") {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return String(date);
  }
}

/**
 * truncate() — Shorten text to a maximum character count.
 *
 * Useful for card teasers and meta descriptions.
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 160) {
  if (!text || text.length <= maxLength) return text ?? "";
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * slugify() — Convert a display string into a URL-safe slug.
 *
 * Usage:
 *   slugify("22 Dhara (Balaju)")  → "22-dhara-balaju"
 *
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")   // Remove special chars
    .replace(/\s+/g, "-")       // Spaces → hyphens
    .replace(/-+/g, "-")        // Collapse multiple hyphens
    .trim();
}
