/**
 * frontend/src/lib/communityArchive.js
 *
 * Repository and moderation service for Ward 16 Community Heritage Archive.
 *
 * Uses the Repository Pattern connecting to the traditional PostgreSQL Backend API.
 * When backend is reached, operations sync with PostgreSQL;
 * otherwise, functions operate seamlessly against the verified local seed database.
 */

import {
  INITIAL_APPROVED_STORIES,
  ARCHIVE_CATEGORIES,
  SUBMISSION_STATUSES,
} from "@/data/communityArchiveData";
import { BACKEND_URL } from "@/lib/apiConfig";

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
  // Query backend PostgreSQL if in server-side context or fetch available
  try {
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);
    if (location && location !== "all") params.append("location", location);
    if (searchQuery) params.append("search", searchQuery);

    const res = await fetch(`${BACKEND_URL}/api/community-archive/stories?${params.toString()}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.stories && data.stories.length > 0) {
        return data.stories;
      }
    }
  } catch (err) {
    // Backend offline / development fallback
  }

  // Fallback to verified local archival seed database
  let stories = [...INITIAL_APPROVED_STORIES];

  if (category && category !== "all") {
    stories = stories.filter((story) => story.category === category);
  }

  if (location && location !== "all") {
    stories = stories.filter(
      (story) =>
        story.heritageLocation.id === location ||
        story.heritageLocation.slug === location
    );
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    stories = stories.filter((story) => {
      const titleMatch =
        story.title.en.toLowerCase().includes(q) ||
        (story.title.ne && story.title.ne.toLowerCase().includes(q));
      const contentMatch =
        story.content.en.toLowerCase().includes(q) ||
        (story.content.ne && story.content.ne.toLowerCase().includes(q));
      const tagMatch =
        story.tags &&
        story.tags.some((tag) => tag.toLowerCase().includes(q));
      const contributorMatch =
        story.contributor.name.toLowerCase().includes(q) ||
        (story.contributor.nameNepali &&
          story.contributor.nameNepali.toLowerCase().includes(q));

      return titleMatch || contentMatch || tagMatch || contributorMatch;
    });
  }

  return stories;
}

/**
 * Retrieve a single story by its unique slug.
 */
export async function getStoryBySlug(slug) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/community-archive/stories/${slug}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.story) return data.story;
    }
  } catch (err) {
    // Fallback
  }

  const localStory = INITIAL_APPROVED_STORIES.find((s) => s.slug === slug);
  return localStory || null;
}

/**
 * Validate a community story submission before submission.
 */
export function validateSubmission(data, locale = "en") {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title =
      locale === "ne"
        ? "कथाको शीर्षक कम्तिमा ५ अक्षरको हुनुपर्दछ।"
        : "Title must be at least 5 characters.";
  } else if (data.title.trim().length > 120) {
    errors.title =
      locale === "ne"
        ? "शीर्षक १२० अक्षरभन्दा बढी हुनुहुँदैन।"
        : "Title must not exceed 120 characters.";
  }

  if (!data.contributorName || data.contributorName.trim().length < 2) {
    errors.contributorName =
      locale === "ne"
        ? "कृपया योगदानकर्ताको नाम खुलाउनुहोस्।"
        : "Contributor name is required.";
  }

  if (data.contributorEmail && data.contributorEmail.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contributorEmail.trim())) {
      errors.contributorEmail =
        locale === "ne"
          ? "कृपया मान्य इमेल ठेगाना लेख्नुहोस्।"
          : "Please enter a valid email address.";
    }
  }

  if (!data.category || !ARCHIVE_CATEGORIES[data.category]) {
    errors.category =
      locale === "ne"
        ? "कृपया मान्य विधा छनोट गर्नुहोस्।"
        : "Please select a valid archive category.";
  }

  if (!data.content || data.content.trim().length < 50) {
    errors.content =
      locale === "ne"
        ? "संस्मरणको विवरण कम्तिमा ५० अक्षरको हुनुपर्दछ।"
        : "Story text must be at least 50 characters.";
  } else if (data.content.trim().length > 4000) {
    errors.content =
      locale === "ne"
        ? "विवरण ४००० अक्षरभन्दा बढी हुनुहुँदैन।"
        : "Story text must not exceed 4,000 characters.";
  }

  if (!data.consentGiven) {
    errors.consentGiven =
      locale === "ne"
        ? "डिजिटल अभिलेखीकरणका लागि सहमति अनिवार्य छ।"
        : "Consent for archival documentation is required.";
  }

  if (!data.copyrightDeclaration) {
    errors.copyrightDeclaration =
      locale === "ne"
        ? "प्रतिलिपि अधिकार घोषणा स्वीकार गर्न अनिवार्य छ।"
        : "Copyright declaration must be acknowledged.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submit a community story to the moderation queue (status: pending_review).
 */
export async function submitStory(rawSubmissionData) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/community-archive/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawSubmissionData),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        referenceId: data.trackingId,
        status: SUBMISSION_STATUSES.PENDING_REVIEW,
      };
    }
  } catch (err) {
    // Fallback to local session
  }

  const referenceId =
    "SUB-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);

  const submissionRecord = {
    referenceId,
    status: SUBMISSION_STATUSES.PENDING_REVIEW,
    title: rawSubmissionData.title.trim(),
    contributorName: rawSubmissionData.contributorName.trim(),
    submittedAt: new Date().toISOString(),
  };

  runtimeSubmissions.push(submissionRecord);

  return {
    success: true,
    referenceId,
    status: SUBMISSION_STATUSES.PENDING_REVIEW,
  };
}

/**
 * Retrieve pending submissions for moderation.
 */
export async function getPendingSubmissions() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/moderation?status=pending_review`);
    if (res.ok) {
      const data = await res.json();
      return data.submissions || [];
    }
  } catch (err) {}
  return runtimeSubmissions;
}

/**
 * Moderate a submission (approve or reject).
 */
export async function moderateSubmission(referenceId, action, reviewerNotes = "") {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/moderation`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId: referenceId, action, notes: reviewerNotes }),
    });
    if (res.ok) return await res.json();
  } catch (err) {}

  const sub = runtimeSubmissions.find((s) => s.referenceId === referenceId);
  if (sub) {
    sub.status = action === "approve" ? SUBMISSION_STATUSES.APPROVED : SUBMISSION_STATUSES.REJECTED;
    return { success: true, submission: sub };
  }
  return { success: false, error: "Submission not found" };
}
