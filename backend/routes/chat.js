/**
 * backend/routes/chat.js
 *
 * Chatbot endpoint grounded strictly on backend/data/knowledge_base.txt.
 */

const express = require('express');
const router = express.Router();
const chatService = require('../services/chatService');

// In-memory rate limiting map (IP -> timestamps[])
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (valid.length >= MAX_REQUESTS) return false;
  valid.push(now);
  rateLimitMap.set(ip, valid);
  return true;
}

/**
 * POST /api/heritage-guide
 * Accepts: { query, siteSlug, locale }
 * Returns verified answers from knowledge_base.txt
 */
router.post('/', (req, res) => {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Rate limit reached. Please wait a few moments before asking another question.',
        errorNepali: 'कृपया केही समय पर्खेर पुनः प्रश्न सोध्नुहोस्।',
      });
    }

    const { query, siteSlug, locale } = req.body;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a valid question.' });
    }

    if (!siteSlug || !['22-dhara', 'pyatho-ajima'].includes(siteSlug)) {
      return res.status(400).json({ error: 'Invalid heritage site specified.' });
    }

    const result = chatService.answerQuery({
      query,
      siteSlug,
      locale: locale === 'ne' ? 'ne' : 'en',
    });

    if (result.error) {
      return res.status(result.status || 400).json({ error: result.error });
    }

    return res.json(result);
  } catch (err) {
    console.error('[ChatRoute Error]', err);
    return res.status(500).json({ error: 'Internal processing error in heritage guide.' });
  }
});

module.exports = router;
