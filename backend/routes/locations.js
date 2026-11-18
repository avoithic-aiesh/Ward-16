/**
 * backend/routes/locations.js
 *
 * Administrative route for managing heritage locations and survey coordinates.
 */

const express = require('express');
const router = express.Router();
const archiveService = require('../services/archiveService');

/**
 * GET /api/admin/locations
 * Retrieve heritage locations.
 */
router.get('/locations', async (req, res) => {
  try {
    const locations = await archiveService.getLocations();
    return res.json({ success: true, count: locations.length, locations });
  } catch (err) {
    console.error('[Locations GET Error]', err);
    return res.status(500).json({ error: 'Failed to retrieve locations' });
  }
});

/**
 * PATCH /api/admin/locations
 * Update coordinates or verification survey status for a location.
 */
router.patch('/locations', async (req, res) => {
  try {
    const { slug, latitude, longitude, verification_status, verification_note_en, verification_note_ne } = req.body;
    if (!slug) {
      return res.status(400).json({ error: 'Location slug is required' });
    }

    const result = await archiveService.updateLocation(slug, {
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      verification_status,
      verification_note_en,
      verification_note_ne,
    });

    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    return res.json({
      success: true,
      message: 'Location survey information updated',
      location: result.location,
    });
  } catch (err) {
    console.error('[Locations PATCH Error]', err);
    return res.status(500).json({ error: 'Failed to update location' });
  }
});

module.exports = router;
