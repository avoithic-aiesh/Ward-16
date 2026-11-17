/**
 * src/app/heritage/pyatho-ajima/page.js
 *
 * Module 5: Dedicated Heritage Detail Page for Pyatho Ajima Temple.
 *
 * Documents the history, traditional Newar temple architecture,
 * mother goddess worship, and living community traditions of Ward 16.
 */

import { PYATHO_AJIMA_DATA } from "@/data/pyathoAjimaData";
import { INTERACTIVE_DATA } from "@/data/interactiveHeritageData";
import HeritageHero from "@/components/heritage/HeritageHero";
import HistorySection from "@/components/heritage/HistorySection";
import ArchitectureSection from "@/components/heritage/ArchitectureSection";
import HistoricalTimeline from "@/components/heritage/HistoricalTimeline";
import HeritageGallery from "@/components/heritage/HeritageGallery";
import CulturalSignificance from "@/components/heritage/CulturalSignificance";
import StorytellingSection from "@/components/heritage/StorytellingSection";
import SourcesAndReferences from "@/components/heritage/SourcesAndReferences";
import RelatedHeritage from "@/components/heritage/RelatedHeritage";
import InteractiveSection from "@/components/interactive/InteractiveSection";
import HeritageGuideChat from "@/components/ai/HeritageGuideChat";

export const metadata = {
  title: "Pyatho Ajima Temple | Ward 16 Digital Heritage",
  description:
    "Explore the sacred heritage, traditional Newar architecture, maternal protector veneration, and living community traditions of Pyatho Ajima Temple in Ward 16, Kathmandu.",
  openGraph: {
    title: "Pyatho Ajima Temple | Ward 16 Digital Heritage",
    description: "Discover the sacred heritage and living cultural traditions of Ward 16.",
    url: "/heritage/pyatho-ajima",
    siteName: "Ward 16 Digital Heritage",
    locale: "en_US",
    type: "article",
  },
};

export default function PyathoAjimaPage() {
  const data = PYATHO_AJIMA_DATA;

  // JSON-LD Structured Data for Sacred Temple Site
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    name: data.name.en,
    alternateName: [data.name.ne, ...data.alternateNames.en],
    description: data.history.summary.en,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.location.address.en,
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Ward No. 16, Kathmandu Metropolitan City",
    },
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-ivory">
        {/* 1. Immersive Editorial Hero */}
        <HeritageHero
          title={data.name.en}
          titleNepali={data.name.ne}
          subtitle={data.tagline.en}
          category={data.category.en}
          location={data.location.locality.en}
          coordinatesVerified={data.location.coordinates !== null}
          coverImage={data.hero.coverImage}
          imageCaption={data.hero.imageCaption?.en}
        />

        {/* 2. Temple History & Origins */}
        <HistorySection historyData={data.history} />

        {/* 3. Vernacular Architecture & Sacred Space */}
        <ArchitectureSection architectureData={data.architecture} />

        {/* 4. Chronological Timeline */}
        <HistoricalTimeline timelineData={data.timeline} />

        {/* 5. Photographic Documentation Archive */}
        <HeritageGallery
          galleryItems={data.gallery}
          folderPath="public/images/pyatho-ajima/"
        />

        {/* 6. Module 6: Interactive Heritage Experiences (Hotspots, Slider, Audio, Quiz, 360) */}
        <InteractiveSection
          data={INTERACTIVE_DATA["pyatho-ajima"]}
          heritageName={data.name.en}
        />

        {/* AI Heritage Assistant: Pyatho Ajima Guide */}
        <div className="px-4 sm:px-6 lg:px-8">
          <HeritageGuideChat siteSlug="pyatho-ajima" siteName={data.name.en} />
        </div>

        {/* 7. Religious & Cultural Significance */}
        <CulturalSignificance significanceItems={data.culturalSignificance} />

        {/* 8. Community Stories & Living Traditions */}
        <StorytellingSection stories={data.stories} />

        {/* 9. Sources, References & Archival Citations */}
        <SourcesAndReferences references={data.references} />

        {/* 10. Related Heritage Experiences */}
        <RelatedHeritage currentSlug="pyatho-ajima" />
      </article>
    </>
  );
}
