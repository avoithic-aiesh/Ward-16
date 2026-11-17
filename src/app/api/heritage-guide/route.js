/**
 * src/app/api/heritage-guide/route.js
 *
 * Secure server-side endpoint for Contextual AI Heritage Assistants.
 *
 * Features:
 * - Scoped to the specific heritage site (22 Dhara or Pyatho Ajima).
 * - Grounded strictly on verified archival documents.
 * - Enforces the required exact fallback if information is not documented.
 * - In-memory rate limiting and input sanitization.
 */

import { NextResponse } from "next/server";
import { AI_HERITAGE_KNOWLEDGE, UNVERIFIED_FALLBACK } from "@/data/aiKnowledgeData";

// Simple in-memory rate limiting (max 20 requests / 10 minutes per IP)
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) return false;
  valid.push(now);
  rateLimitMap.set(ip, valid);
  return true;
}

export async function POST(request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit reached. Please wait a few moments before asking another question.",
          errorNepali: "कृपया केही समय पर्खेर पुनः प्रश्न सोध्नुहोस्।",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const query = (body.query || "").trim();
    const siteSlug = body.siteSlug; // '22-dhara' or 'pyatho-ajima'
    const locale = body.locale === "ne" ? "ne" : "en";

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid question." },
        { status: 400 }
      );
    }

    if (!["22-dhara", "pyatho-ajima"].includes(siteSlug)) {
      return NextResponse.json(
        { error: "Invalid heritage site specified." },
        { status: 400 }
      );
    }

    const lowerQuery = query.toLowerCase();

    // 1. Cross-site check: detect if asking about the other site
    if (siteSlug === "22-dhara" && (lowerQuery.includes("pyatho") || lowerQuery.includes("प्याठो"))) {
      const redirectMsg =
        locale === "ne"
          ? "म २२ धाराको समर्पित डिजिटल सहायक हुँ। प्याठो अजिमा मन्दिरबारे जान्न कृपया प्याठो अजिमा पृष्ठको सहायकलाई सोध्नुहोस्।"
          : "I am the dedicated guide for 22 Dhara (Balaju). For inquiries about Pyatho Ajima Temple, please visit the Pyatho Ajima Heritage Guide.";
      return NextResponse.json({
        answer: redirectMsg,
        sources: ["Ward 16 Digital Heritage Directory"],
        isCrossSiteRedirect: true,
      });
    }

    if (siteSlug === "pyatho-ajima" && (lowerQuery.includes("22 dhara") || lowerQuery.includes("baisdhara") || lowerQuery.includes("बाइसधारा") || lowerQuery.includes("बालाजु"))) {
      const redirectMsg =
        locale === "ne"
          ? "म प्याठो अजिमा मन्दिरको समर्पित सहायक हुँ। २२ धाराबारे जान्न कृपया २२ धारा पृष्ठको सहायकसँग परामर्श गर्नुहोस्।"
          : "I am the dedicated guide for Pyatho Ajima Temple. For inquiries regarding 22 Dhara, please explore the 22 Dhara Heritage Guide.";
      return NextResponse.json({
        answer: redirectMsg,
        sources: ["Ward 16 Digital Heritage Directory"],
        isCrossSiteRedirect: true,
      });
    }

    // 2. Search verified knowledge chunks for the active site
    const siteKnowledge = AI_HERITAGE_KNOWLEDGE[siteSlug] || [];
    let bestMatch = null;
    let highestScore = 0;

    for (const chunk of siteKnowledge) {
      let score = 0;
      for (const kw of chunk.keywords) {
        if (lowerQuery.includes(kw.toLowerCase())) {
          score += 2;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = chunk;
      }
    }

    // 3. If match score is sufficient, return verified answer
    if (bestMatch && highestScore >= 2) {
      const answerText = locale === "ne" ? bestMatch.answer.ne : bestMatch.answer.en;
      return NextResponse.json({
        answer: answerText,
        sources: bestMatch.sources,
        verified: true,
        topic: bestMatch.topic,
      });
    }

    // 4. Strict grounding policy: Return exact required unverified fallback
    const fallbackText = locale === "ne" ? UNVERIFIED_FALLBACK.ne : UNVERIFIED_FALLBACK.en;
    return NextResponse.json({
      answer: fallbackText,
      sources: ["Ward 16 Digital Heritage Archive Policy"],
      verified: false,
      isFallback: true,
    });
  } catch (error) {
    console.error("AI Heritage Guide Error:", error);
    return NextResponse.json(
      { error: "Internal processing error. Please try again." },
      { status: 500 }
    );
  }
}
