/**
 * backend/routes/stories.js
 *
 * Community Archive Stories & Submissions endpoints.
 */

const express = require('express');
const router = express.Router();
const archiveService = require('../services/archiveService');

// Rate limiting for story submission
const submitRateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 10;

function checkSubmitLimit(ip) {
  const now = Date.now();
  const timestamps = submitRateLimit.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (valid.length >= MAX_SUBMISSIONS) return false;
  valid.push(now);
  submitRateLimit.set(ip, valid);
  return true;
}

/**
 * GET /api/community-archive/stories
 * Retrieve approved community stories.
 */
router.get('/stories', async (req, res) => {
  try {
    const { category, location, search } = req.query;
    const stories = await archiveService.getStories({
      category,
      location,
      searchQuery: search,
    });
    return res.json({ success: true, count: stories.length, stories });
  } catch (err) {
    console.error('[StoriesRoute Error]', err);
    return res.status(500).json({ error: 'Failed to retrieve stories' });
  }
});

/**
 * GET /api/community-archive/stories/:slug
 * Retrieve single story by slug.
 */
router.get('/stories/:slug', async (req, res) => {
  try {
    const story = await archiveService.getStoryBySlug(req.params.slug);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    return res.json({ success: true, story });
  } catch (err) {
    console.error('[StorySlugRoute Error]', err);
    return res.status(500).json({ error: 'Failed to retrieve story' });
  }
});

/**
 * POST /api/community-archive/submit
 * Public endpoint to submit a community story (status: pending_review).
 */
router.post('/submit', async (req, res) => {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '127.0.0.1';

    if (!checkSubmitLimit(ip)) {
      return res.status(429).json({
        error: 'Too many submissions. Please wait before submitting again.',
        errorNepali: 'कृपया केही समय पर्खेर पुनः प्रयास गर्नुहोस्।',
      });
    }

    const body = req.body || {};
    const locale = body.locale === 'ne' ? 'ne' : 'en';

    // Validation
    if (!body.title || body.title.trim().length < 5) {
      return res.status(400).json({
        error: locale === 'ne' ? 'कृपया कम्तिमा ५ अक्षरको शीर्षक लेख्नुहोस्।' : 'Title must be at least 5 characters.',
      });
    }

    if (!body.contributorName || body.contributorName.trim().length < 2) {
      return res.status(400).json({
        error: locale === 'ne' ? 'कृपया योगदानकर्ताको नाम खुलाउनुहोस्।' : 'Contributor name is required.',
      });
    }

    if (!body.content || body.content.trim().length < 50) {
      return res.status(400).json({
        error:
          locale === 'ne'
            ? 'संस्मरण वा कथा कम्तिमा ५० अक्षरको हुनुपर्छ।'
            : 'Story narrative must be at least 50 characters.',
      });
    }

    if (!body.consentGiven || !body.copyrightDeclaration) {
      return res.status(400).json({
        error:
          locale === 'ne'
            ? 'कृपया सर्तहरू र प्रतिलिपि अधिकार घोषणा स्वीकार गर्नुहोस्।'
            : 'Consent and copyright declarations are mandatory.',
      });
    }

    const result = await archiveService.submitStory(body);

    return res.status(201).json({
      success: true,
      trackingId: result.trackingId,
      message:
        locale === 'ne'
          ? 'तपाईँको संस्मरण सफलतापूर्वक दर्ता भएको छ। समीक्षापछि यो प्रकाशित हुनेछ।'
          : 'Thank you! Your story has been submitted for community moderation.',
    });
  } catch (err) {
    console.error('[SubmitRoute Error]', err);
    return res.status(500).json({ error: 'Failed to process submission' });
  }
});

module.exports = router;
