/**
 * frontend/src/app/api/community-archive/submit/route.js
 *
 * Forwards community story submission to the backend Express server.
 */

import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/apiConfig";
import { validateSubmission, submitStory } from "@/lib/communityArchive";

export async function POST(request) {
  try {
    const body = await request.json();
    const locale = body.locale === "ne" ? "ne" : "en";

    // 1. Validate payload
    const validation = validateSubmission(body, locale);
    if (!validation.valid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    // 2. Try forwarding to backend Express server
    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/community-archive/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": request.headers.get("x-forwarded-for") || "127.0.0.1",
        },
        body: JSON.stringify(body),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data, { status: 201 });
      }
    } catch (backendErr) {
      // Backend temporarily offline; fallback to local session
    }

    // 3. Fallback to local session
    const result = await submitStory(body);
    return NextResponse.json(
      {
        success: true,
        referenceId: result.referenceId,
        message:
          locale === "ne"
            ? "तपाईँको संस्मरण दर्ता भएको छ। समीक्षापछि प्रकाशित हुनेछ।"
            : "Your story has been submitted for community moderation.",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Internal submission error" }, { status: 500 });
  }
}
