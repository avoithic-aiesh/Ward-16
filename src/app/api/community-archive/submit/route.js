/**
 * src/app/api/community-archive/submit/route.js
 *
 * Secure server-side endpoint for community story submissions.
 *
 * Security & Archival Policies:
 * - Validates input fields and character lengths.
 * - Enforces explicit consent & copyright declarations.
 * - Simple IP-based sliding window rate-limiting.
 * - Sets status to PENDING_REVIEW; NEVER publishes automatically.
 * - Strips sensitive metadata before returning response.
 */

import { NextResponse } from "next/server";
import { validateSubmission, submitStory } from "@/lib/communityArchive";

// Simple in-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(request) {
  try {
    // 1. IP determination for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Too many submission attempts. Please wait a few minutes before submitting again.",
          errorNepali: "धेरै पटक प्रयास गरियो। कृपया केही मिनेटपछि पुनः प्रयास गर्नुहोस्।",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const locale = body.locale === "ne" ? "ne" : "en";

    // 3. Validate submission payload
    const validation = validateSubmission(body, locale);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 4. Save to moderation queue
    const result = await submitStory(body);

    return NextResponse.json(
      {
        success: true,
        referenceId: result.referenceId,
        status: result.status,
        message: result.message[locale] || result.message.en,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Community submission error:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your submission. Please try again.",
        errorNepali: "कथा दर्ता गर्दा प्राविधिक समस्या आयो। कृपया पुनः प्रयास गर्नुहोस्।",
      },
      { status: 500 }
    );
  }
}
