/**
 * backend/routes/admin.js
 *
 * Moderation API routes for the administrative dashboard.
 */

const express = require('express');
const router = express.Router();
const archiveService = require('../services/archiveService');

/**
 * GET /api/admin/moderation
 * List pending / all community submissions.
 */
router.get('/moderation', async (req, res) => {
  try {
    const { status } = req.query;
    const submissions = await archiveService.getSubmissions({ status });
    return res.json({ success: true, count: submissions.length, submissions });
  } catch (err) {
    console.error('[AdminModeration GET Error]', err);
    return res.status(500).json({ error: 'Failed to retrieve moderation queue' });
  }
});

/**
 * PATCH /api/admin/moderation
 * Update a submission status (approve or reject).
 */
router.patch('/moderation', async (req, res) => {
  try {
    const { submissionId, action, notes } = req.body;
    if (!submissionId || !action || !['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid moderation payload' });
    }

    const result = await archiveService.moderateSubmission(submissionId, action, notes);
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    return res.json({
      success: true,
      message: `Submission ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      submission: result.submission,
    });
  } catch (err) {
    console.error('[AdminModeration PATCH Error]', err);
    return res.status(500).json({ error: 'Failed to update moderation state' });
  }
});

module.exports = router;
