/**
 * src/app/community-archive/page.js
 *
 * Module 9: Community Heritage Archive Homepage.
 *
 * Displays community-contributed oral histories, personal memories,
 * historical photographs, and local traditions for Ward 16.
 */

import { getApprovedStories } from "@/lib/communityArchive";
import ArchivePageClient from "@/components/archive/ArchivePageClient";

export const metadata = {
  title: "Community Heritage Archive | Ward 16 Digital Heritage",
  description:
    "Explore community memories, oral histories, elder recollections, and historical photographs documenting the living cultural fabric of Ward No. 16, Kathmandu.",
  openGraph: {
    title: "Community Heritage Archive | Ward 16 Digital Heritage",
    description: "Living memories and oral histories from the people of Ward 16, Kathmandu.",
    url: "/community-archive",
    siteName: "Ward 16 Digital Heritage",
    locale: "en_US",
    type: "website",
  },
};

export default async function CommunityArchivePage() {
  const initialStories = await getApprovedStories();

  return <ArchivePageClient initialStories={initialStories} />;
}
