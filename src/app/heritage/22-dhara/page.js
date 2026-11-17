/**
 * src/app/heritage/22-dhara/page.js
 *
 * Module 4: Dedicated Heritage Detail Page for 22 Dhara (Balaju Baisdhara).
 *
 * Functions as a digital heritage archive documenting its history,
 * architecture, cultural significance, and community connections.
 */

import { TWENTY_TWO_DHARA_DATA } from "@/data/twentyTwoDharaData";
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
  title: "22 Dhara (Balaju Baisdhara) | Ward 16 Digital Heritage",
  description:
    "Comprehensive digital archive documenting the history, Newari water architecture, royal chronicles, and living traditions of 22 Dhara (Balaju Baisdhara) in Kathmandu.",
  openGraph: {
    title: "22 Dhara — Balaju Baisdhara | Ward 16 Digital Heritage",
    description: "Where water, architecture and cultural memory meet in Kathmandu Ward No. 16.",
    url: "/heritage/22-dhara",
    siteName: "Ward 16 Digital Heritage",
    locale: "en_US",
    type: "article",
  },
};

export default function TwentyTwoDharaPage() {
  const data = TWENTY_TWO_DHARA_DATA;

  // JSON-LD Structured Data for Cultural Heritage Site
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandmarksOrHistoricalBuildings",
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
          title={`${data.name.en} — ${data.alternateNames.en[0]}`}
          titleNepali={data.name.ne}
          subtitle={data.tagline.en}
          category={data.category.en}
          location={data.location.locality.en}
          coordinatesVerified={data.location.coordinates !== null}
          coverImage={data.hero.coverImage}
          imageCaption={data.hero.imageCaption?.en}
        />

        {/* 2. Historical Overview & Development */}
        <HistorySection historyData={data.history} />

        {/* 3. Architecture & Hydraulic Design */}
        <ArchitectureSection architectureData={data.architecture} />

        {/* 4. Chronological Timeline */}
        <HistoricalTimeline timelineData={data.timeline} />

        {/* 5. Photographic Documentation Archive */}
        <HeritageGallery galleryItems={data.gallery} folderPath="public/images/22-dhara/" />

        {/* 6. Module 6: Interactive Heritage Experiences (Hotspots, Slider, Audio, Quiz, 360) */}
        <InteractiveSection
          data={INTERACTIVE_DATA["22-dhara"]}
          heritageName={data.name.en}
        />

        {/* AI Heritage Assistant: 22 Dhara Guide */}
        <div className="px-4 sm:px-6 lg:px-8">
          <HeritageGuideChat siteSlug="22-dhara" siteName={data.name.en} />
        </div>

        {/* 7. Living Cultural & Spiritual Significance */}
        <CulturalSignificance significanceItems={data.culturalSignificance} />

        {/* 8. Community Stories & Lived Memories */}
        <StorytellingSection stories={data.stories} />

        {/* 9. Sources, References & Archival Citations */}
        <SourcesAndReferences references={data.references} />

        {/* 10. Related Heritage Experiences */}
        <RelatedHeritage currentSlug="22-dhara" />
      </article>
    </>
  );
}
