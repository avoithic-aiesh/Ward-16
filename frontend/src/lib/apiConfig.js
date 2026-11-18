/**
 * frontend/src/lib/apiConfig.js
 *
 * Backend connection settings with CORS support.
 * The backend runs as a standalone Express server (default port 5000).
 */

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

/**
 * Returns full API URL for cross-origin CORS requests.
 */
export function getApiUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Use direct CORS URL if specified or in dev
  if (process.env.NEXT_PUBLIC_DIRECT_CORS === 'true') {
    return `${BACKEND_URL}${cleanEndpoint}`;
  }

  // Next.js rewrites in next.config.mjs proxy /api/... directly to the backend
  return cleanEndpoint;
}
