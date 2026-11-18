/**
 * src/app/sitemap.js
 *
 * Next.js Dynamic Sitemap Generator for SEO.
 * Automatically indexes all static pages and dynamic community archive stories.
 */

import { INITIAL_APPROVED_STORIES } from "@/data/communityArchiveData";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ward16heritage.kathmandu.gov.np";
  const now = new Date().toISOString();

  // Core static pages
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/explore-map`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/heritage/22-dhara`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/heritage/pyatho-ajima`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/ward`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/culture`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/community-archive`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/community-archive/submit`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic community stories
  const storyRoutes = INITIAL_APPROVED_STORIES.map((story) => ({
    url: `${baseUrl}/community-archive/${story.slug}`,
    lastModified: story.publicationDate ? new Date(story.publicationDate).toISOString() : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...storyRoutes];
}
