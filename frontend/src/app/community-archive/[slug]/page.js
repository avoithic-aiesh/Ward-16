/**
 * src/app/community-archive/[slug]/page.js
 *
 * Story Detail Page for the Ward 16 Community Heritage Archive.
 */

import { notFound } from "next/navigation";
import { getStoryBySlug, getApprovedStories } from "@/lib/communityArchive";
import { INITIAL_APPROVED_STORIES } from "@/data/communityArchiveData";
import StoryDetailView from "@/components/archive/StoryDetailView";

export async function generateStaticParams() {
  return INITIAL_APPROVED_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found | Ward 16 Digital Heritage",
    };
  }

  const desc = story.summary?.en || story.summary?.ne || (story.content?.en ? story.content.en.slice(0, 160) + "..." : "Ward 16 Community Heritage Story");
  const storyTitle = story.title?.en || story.title?.ne || "Community Story";

  return {
    title: `${storyTitle} | Ward 16 Community Archive`,
    description: desc,
    openGraph: {
      title: storyTitle,
      description: desc,
      url: `/community-archive/${story.slug}`,
      siteName: "Ward 16 Digital Heritage",
      type: "article",
    },
  };
}

export default async function StoryDetailPage({ params }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  // Get related stories from the same category or location
  const allStories = await getApprovedStories();
  const relatedStories = allStories
    .filter((s) => s.slug !== story.slug && (s.category === story.category || s.heritageLocation.id === story.heritageLocation.id))
    .slice(0, 2);

  return <StoryDetailView story={story} relatedStories={relatedStories} />;
}
