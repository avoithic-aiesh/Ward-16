/**
 * src/app/robots.js
 *
 * Next.js Dynamic Robots.txt Generator for Search Engine Crawlers.
 */

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ward16heritage.kathmandu.gov.np";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
