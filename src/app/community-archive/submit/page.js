/**
 * src/app/community-archive/submit/page.js
 *
 * Community Story Contribution Page.
 *
 * Allows visitors, elders, and community members to submit memories,
 * oral history transcripts, and historical photographs for moderation review.
 */

import ContributionForm from "@/components/archive/ContributionForm";

export const metadata = {
  title: "Contribute to the Community Archive | Ward 16 Digital Heritage",
  description:
    "Share personal memories, elder oral histories, family photographs, and cultural reflections to preserve the living heritage of Ward 16, Kathmandu.",
};

export default function SubmitStoryPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold font-semibold">
            Ward 16 Living Heritage
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal">
            Share Your Heritage Memory
          </h1>
          <p className="text-sm sm:text-base text-charcoal/70 max-w-xl mx-auto leading-relaxed">
            Every memory, photograph, and spoken recollection adds to our collective tapestry.
            All contributions undergo careful review by our archive moderation team before publication.
          </p>
        </div>

        {/* Form Component */}
        <ContributionForm />
      </div>
    </div>
  );
}
