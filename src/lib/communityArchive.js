/**
 * src/lib/communityArchive.js
 *
 * Repository and moderation service for Ward 16 Community Heritage Archive.
 *
 * Uses the Repository Pattern with hybrid Supabase + in-memory fallback.
 * When Supabase environment variables are present, operations sync with PostgreSQL;
 * otherwise, functions operate seamlessly against the verified local seed database.
 */

import {
  INITIAL_APPROVED_STORIES,
  ARCHIVE_CATEGORIES,
  SUBMISSION_STATUSES,
} from "@/data/communityArchiveData";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { isSupabaseAdminConfigured, supabaseAdmin } from "@/lib/supabase/admin";

// In-memory submissions store for the runtime session
const runtimeSubmissions = [];

/**
 * Retrieve all publicly approved stories.
 * Supports optional filters: category, location, and search text.
 */
export async function getApprovedStories({
  category = null,
  location = null,
  searchQuery = "",
  locale = "en",
} = {}) {
  // If Supabase is active, try querying the community_stories table
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from("community_stories")
        .select("*")
        .eq("status", "approved");

      if (category && category !== "all") {
        query = query.eq("category_id", category);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        // Map Supabase rows to uniform frontend schema
        return data.map((row) => ({
          id: row.id,
          slug: row.slug,
          title: { en: row.title_en, ne: row.title_ne },
          contributor: {
            name: row.contributor_name_en,
            nameNepali: row.contributor_name_ne,
            role: { en: row.contributor_role_en, ne: row.contributor_role_ne },
            attributionPreference: row.attribution_preference,
          },
          heritageLocation: {
            id: row.location_id || "ward-16-general",
            name: { en: "Ward 16 Landmark", ne: "वडा १६ सम्पदा" },
            slug: row.location_id || "ward-16-general",
          },
          category: row.category_id || "community_memories",
          summary: { en: row.summary_en, ne: row.summary_ne },
          content: { en: row.content_en, ne: row.content_ne },
          photographs: [],
          publicationDate: (row.published_at || "").split("T")[0],
          source: row.source || "Ward 16 Archive",
          consentStatus: "verified_consent",
          status: "approved",
          verificationStatus: "community_testimony",
          tags: ["Living Heritage"],
          featured: row.featured,
        }));
      }
    } catch {
      // Fallback to static seed data if network or credentials fail
    }
  }

  // Combine seed stories with any newly approved runtime submissions
  const allStories = [
    ...INITIAL_APPROVED_STORIES,
    ...runtimeSubmissions.filter((s) => s.status === SUBMISSION_STATUSES.APPROVED),
  ];

  return allStories.filter((story) => {
    if (story.status !== SUBMISSION_STATUSES.APPROVED) return false;

    if (category && category !== "all" && story.category !== category) {
      return false;
    }

    if (location && location !== "all" && story.heritageLocation.id !== location) {
      return false;
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const titleEn = story.title?.en?.toLowerCase() || "";
      const titleNe = story.title?.ne?.toLowerCase() || "";
      const summaryEn = story.summary?.en?.toLowerCase() || "";
      const summaryNe = story.summary?.ne?.toLowerCase() || "";
      const author = story.contributor?.name?.toLowerCase() || "";
      const authorNe = story.contributor?.nameNepali?.toLowerCase() || "";
      const tags = (story.tags || []).join(" ").toLowerCase();

      const match =
        titleEn.includes(q) ||
        titleNe.includes(q) ||
        summaryEn.includes(q) ||
        summaryNe.includes(q) ||
        author.includes(q) ||
        authorNe.includes(q) ||
        tags.includes(q);

      if (!match) return false;
    }

    return true;
  });
}

/**
 * Retrieve a single story by its unique slug.
 */
export async function getStoryBySlug(slug) {
  if (!slug) return null;
  const allStories = [...INITIAL_APPROVED_STORIES, ...runtimeSubmissions];
  const story = allStories.find((s) => s.slug === slug);
  return story || null;
}

/**
 * Validate a community submission.
 */
export function validateSubmission(data, locale = "en") {
  const errors = {};
  const isNe = locale === "ne";

  if (!data.title || typeof data.title !== "string" || data.title.trim().length < 5) {
    errors.title = isNe
      ? "कथाको शीर्षक कम्तीमा ५ अक्षरको हुनुपर्छ।"
      : "Story title must be at least 5 characters long.";
  } else if (data.title.trim().length > 150) {
    errors.title = isNe
      ? "कथाको शीर्षक १५० अक्षरभन्दा बढी हुनुहुँदैन।"
      : "Story title must not exceed 150 characters.";
  }

  if (!data.content || typeof data.content !== "string" || data.content.trim().length < 40) {
    errors.content = isNe
      ? "कृपया आफ्नो संस्मरण वा कथा कम्तीमा ४० अक्षरमा विस्तृत रूपमा लेख्नुहोस्।"
      : "Story content must be at least 40 characters long.";
  } else if (data.content.trim().length > 5000) {
    errors.content = isNe
      ? "कथा ५,००० अक्षरभन्दा बढी हुन सक्दैन।"
      : "Story content must not exceed 5,000 characters.";
  }

  if (data.attributionPreference !== "anonymous") {
    if (!data.contributorName || data.contributorName.trim().length < 2) {
      errors.contributorName = isNe
        ? "कृपया आफ्नो नाम वा उपनाम प्रविष्ट गर्नुहोस् (वा 'गोप्य/अज्ञात' विकल्प रोज्नुहोस्)।"
        : "Please provide your name or pseudonym (or choose anonymous attribution).";
    }
  }

  if (data.email && data.email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = isNe
        ? "अमान्य इमेल ढाँचा। कृपया सही इमेल ठेगाना दिनुहोस्।"
        : "Invalid email format. Please provide a valid address.";
    }
  }

  const validCategoryIds = ARCHIVE_CATEGORIES.map((c) => c.id);
  if (!data.category || !validCategoryIds.includes(data.category)) {
    errors.category = isNe
      ? "कृपया एउटा मान्य विधा/श्रेणी छनौट गर्नुहोस्।"
      : "Please select a valid story category.";
  }

  const validLocations = ["22-dhara", "pyatho-ajima", "ward-16-general"];
  if (!data.heritageLocation || !validLocations.includes(data.heritageLocation)) {
    errors.heritageLocation = isNe
      ? "कृपया सम्बन्धित सम्पदा स्थल छनौट गर्नुहोस्।"
      : "Please select the associated heritage location.";
  }

  if (!data.consentAgreed) {
    errors.consentAgreed = isNe
      ? "अभिलेखमा समावेश गर्न तपाईंले सर्तहरू र गोपनीयता स्वीकृति दिनु आवश्यक छ।"
      : "You must agree to the archival terms and consent policy to submit.";
  }

  if (data.photoData && !data.photoOwnershipConfirmed) {
    errors.photoOwnershipConfirmed = isNe
      ? "तस्बिर तपाईंको आफ्नै वा प्रतिलिपि अधिकार अनुमति प्राप्त भएको पुष्टि गर्नुहोस्।"
      : "You must confirm you own or have permission to share this photograph.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submit a community story into the moderation queue.
 * Assigns SUBMISSION_STATUSES.PENDING_REVIEW.
 * Never publishes automatically.
 */
export async function submitStory(rawSubmissionData) {
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `W16-ARC-${new Date().getFullYear()}-${randomSuffix}`;
  const slug = `story-${Date.now()}-${randomSuffix}`;

  const sanitizedTitle = (rawSubmissionData.title || "").trim();
  const sanitizedContent = (rawSubmissionData.content || "").trim();
  const sanitizedContributor = (rawSubmissionData.contributorName || "").trim();
  const attribution = rawSubmissionData.attributionPreference || "real_name";

  const newSubmission = {
    id: referenceId,
    referenceId,
    slug,
    title: { en: sanitizedTitle, ne: sanitizedTitle },
    contributor: {
      name: attribution === "anonymous" ? "Anonymous Community Member" : sanitizedContributor,
      nameNepali: attribution === "anonymous" ? "अज्ञात स्थानीय बासिन्दा" : sanitizedContributor,
      role: {
        en: rawSubmissionData.contributorRole || "Community Contributor",
        ne: rawSubmissionData.contributorRole || "स्थानीय योगदानकर्ता",
      },
      attributionPreference: attribution,
      contactEmail: rawSubmissionData.email ? rawSubmissionData.email.trim() : null,
    },
    heritageLocation: {
      id: rawSubmissionData.heritageLocation,
      name:
        rawSubmissionData.heritageLocation === "22-dhara"
          ? { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" }
          : rawSubmissionData.heritageLocation === "pyatho-ajima"
          ? { en: "Pyatho Ajima Temple", ne: "प्याठो अजिमा मन्दिर" }
          : { en: "Ward 16 Living Heritage Area", ne: "काठमाडौँ वडा नं. १६ सम्पदा क्षेत्र" },
      slug: rawSubmissionData.heritageLocation,
    },
    category: rawSubmissionData.category,
    summary: {
      en: sanitizedContent.slice(0, 180) + (sanitizedContent.length > 180 ? "…" : ""),
      ne: sanitizedContent.slice(0, 180) + (sanitizedContent.length > 180 ? "…" : ""),
    },
    content: { en: sanitizedContent, ne: sanitizedContent },
    photographs: rawSubmissionData.photoData
      ? [
          {
            url: rawSubmissionData.photoData,
            caption: {
              en: rawSubmissionData.photoCaption || "Community submitted photograph",
              ne: rawSubmissionData.photoCaption || "सामुदायिक अभिलेख तस्बिर",
            },
            credit:
              attribution === "anonymous"
                ? "Anonymous Contributor"
                : `${sanitizedContributor} (Family Archives)`,
            license: "Creative Commons Attribution-NonCommercial (CC BY-NC)",
          },
        ]
      : [],
    publicationDate: timestamp.split("T")[0],
    submittedAt: timestamp,
    language: rawSubmissionData.language || "bilingual",
    source: "Submitted via Ward 16 Community Heritage Portal",
    consentStatus: "verified_consent",
    status: SUBMISSION_STATUSES.PENDING_REVIEW,
    verificationStatus: "community_testimony",
    tags: ["Community Contribution", "Living Heritage", rawSubmissionData.category],
    featured: false,
  };

  // Push to local session storage
  runtimeSubmissions.push(newSubmission);

  // If Supabase Admin client is available on the server, insert into PostgreSQL
  const dbClient = supabaseAdmin || supabase;
  if (dbClient) {
    try {
      await dbClient.from("community_submissions").insert({
        reference_id: referenceId,
        contributor_name: sanitizedContributor || "Anonymous",
        contributor_role: rawSubmissionData.contributorRole || null,
        attribution_preference: attribution,
        contact_email: rawSubmissionData.email ? rawSubmissionData.email.trim() : null,
        title: sanitizedTitle,
        content: sanitizedContent,
        photo_url: rawSubmissionData.photoData || null,
        photo_caption: rawSubmissionData.photoCaption || null,
        photo_ownership_confirmed: Boolean(rawSubmissionData.photoOwnershipConfirmed),
        consent_agreed: Boolean(rawSubmissionData.consentAgreed),
        status: "pending_review",
      });
    } catch {
      // Ignore database write error in mock/offline mode
    }
  }

  return {
    success: true,
    referenceId,
    status: SUBMISSION_STATUSES.PENDING_REVIEW,
    message: {
      en: "Thank you for contributing to the Ward 16 Digital Heritage Archive. Your story has been submitted for moderation review.",
      ne: "वडा नं. १६ डिजिटल सम्पदा अभिलेखालयमा आफ्नो संस्मरण उपलब्ध गराउनु भएकोमा धन्यवाद। तपाईंको कथा समीक्षाका लागि दर्ता भएको छ।",
    },
  };
}

/**
 * Administrative Moderation Functions
 */
export async function getPendingSubmissions() {
  return runtimeSubmissions.filter((s) => s.status === SUBMISSION_STATUSES.PENDING_REVIEW);
}

export async function moderateSubmission(referenceId, action, reviewerNotes = "") {
  const submission = runtimeSubmissions.find((s) => s.referenceId === referenceId || s.id === referenceId);
  if (!submission) {
    return { success: false, error: "Submission not found" };
  }

  if (action === "approve") {
    submission.status = SUBMISSION_STATUSES.APPROVED;
    submission.reviewedAt = new Date().toISOString();
    submission.reviewerNotes = reviewerNotes;
    return { success: true, status: SUBMISSION_STATUSES.APPROVED };
  } else if (action === "reject") {
    submission.status = SUBMISSION_STATUSES.REJECTED;
    submission.reviewedAt = new Date().toISOString();
    submission.reviewerNotes = reviewerNotes;
    return { success: true, status: SUBMISSION_STATUSES.REJECTED };
  }

  return { success: false, error: "Invalid action" };
}
