/**
 * backend/services/archiveService.js
 *
 * PostgreSQL Archive Service.
 * Implements CRUD operations for community stories and moderation submissions
 * using traditional PostgreSQL parameterized SQL queries with in-memory fallback.
 */

const { query, isDbConnected } = require('../config/db');
const { SEED_LOCATIONS, SEED_STORIES } = require('../data/seed_data');

// In-memory fallback stores
let memoryStories = [...SEED_STORIES];
let memorySubmissions = [];
let memoryLocations = [...SEED_LOCATIONS];

/**
 * Get all approved stories with optional filters.
 */
async function getStories({ category, location, searchQuery }) {
  if (isDbConnected()) {
    try {
      let sql = 'SELECT * FROM community_stories WHERE status = $1';
      const params = ['approved'];
      let paramIndex = 2;

      if (category && category !== 'all') {
        sql += ` AND category_id = $${paramIndex}`;
        params.push(category);
        paramIndex++;
      }

      if (location && location !== 'all') {
        sql += ` AND heritage_location_slug = $${paramIndex}`;
        params.push(location);
        paramIndex++;
      }

      if (searchQuery && searchQuery.trim()) {
        sql += ` AND (title_en ILIKE $${paramIndex} OR content_en ILIKE $${paramIndex} OR title_ne ILIKE $${paramIndex} OR content_ne ILIKE $${paramIndex})`;
        params.push(`%${searchQuery.trim()}%`);
        paramIndex++;
      }

      sql += ' ORDER BY created_at DESC';

      const res = await query(sql, params);
      return res.rows.map(formatStoryRow);
    } catch (err) {
      console.warn('[ArchiveService] PostgreSQL query failed, using fallback:', err.message);
    }
  }

  // Fallback to in-memory filter
  let results = memoryStories.filter((s) => s.status === 'approved');
  if (category && category !== 'all') {
    results = results.filter((s) => s.category_id === category);
  }
  if (location && location !== 'all') {
    results = results.filter((s) => s.heritage_location_slug === location);
  }
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    results = results.filter(
      (s) =>
        s.title_en.toLowerCase().includes(q) ||
        s.content_en.toLowerCase().includes(q) ||
        s.title_ne.toLowerCase().includes(q) ||
        s.content_ne.toLowerCase().includes(q)
    );
  }
  return results.map(formatMemoryStory);
}

/**
 * Get a single story by its slug.
 */
async function getStoryBySlug(slug) {
  if (isDbConnected()) {
    try {
      const res = await query('SELECT * FROM community_stories WHERE slug = $1 LIMIT 1', [slug]);
      if (res.rows.length > 0) {
        return formatStoryRow(res.rows[0]);
      }
    } catch (err) {
      console.warn('[ArchiveService] DB getStoryBySlug failed, checking fallback:', err.message);
    }
  }

  const found = memoryStories.find((s) => s.slug === slug);
  return found ? formatMemoryStory(found) : null;
}

/**
 * Submit a community story for moderation (status: pending_review).
 */
async function submitStory(payload) {
  const trackingId = 'SUB-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);

  const submission = {
    tracking_id: trackingId,
    title: payload.title.trim(),
    contributor_name: payload.contributorName.trim(),
    contributor_email: (payload.contributorEmail || '').trim(),
    contributor_phone: (payload.contributorPhone || '').trim(),
    contributor_role: (payload.contributorRole || '').trim(),
    attribution_preference: payload.attributionPreference || 'real_name',
    heritage_location: payload.heritageLocation || 'ward-16-general',
    category_id: payload.category || 'oral_history',
    era_label: payload.era || '',
    approximate_year: payload.approximateYear ? parseInt(payload.approximateYear, 10) : null,
    content: payload.content.trim(),
    language: payload.language || 'bilingual',
    source: payload.sourceDeclaration || 'Community Submission',
    consent_given: Boolean(payload.consentGiven),
    copyright_declaration: Boolean(payload.copyrightDeclaration),
    status: 'pending_review',
    moderator_notes: '',
    submitted_at: new Date().toISOString(),
  };

  if (isDbConnected()) {
    try {
      const sql = `
        INSERT INTO community_submissions (
          tracking_id, title, contributor_name, contributor_email, contributor_phone,
          contributor_role, attribution_preference, heritage_location, category_id,
          era_label, approximate_year, content, language, source,
          consent_given, copyright_declaration, status, submitted_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *;
      `;
      const params = [
        submission.tracking_id,
        submission.title,
        submission.contributor_name,
        submission.contributor_email,
        submission.contributor_phone,
        submission.contributor_role,
        submission.attribution_preference,
        submission.heritage_location,
        submission.category_id,
        submission.era_label,
        submission.approximate_year,
        submission.content,
        submission.language,
        submission.source,
        submission.consent_given,
        submission.copyright_declaration,
        submission.status,
        submission.submitted_at,
      ];
      const res = await query(sql, params);
      return {
        success: true,
        trackingId: res.rows[0].tracking_id,
        status: res.rows[0].status,
      };
    } catch (err) {
      console.warn('[ArchiveService] DB submit failed, saving to fallback memory:', err.message);
    }
  }

  memorySubmissions.push(submission);
  return {
    success: true,
    trackingId,
    status: 'pending_review',
  };
}

/**
 * Get all submissions for the admin moderation queue.
 */
async function getSubmissions({ status = 'all' } = {}) {
  if (isDbConnected()) {
    try {
      let sql = 'SELECT * FROM community_submissions';
      const params = [];
      if (status && status !== 'all') {
        sql += ' WHERE status = $1';
        params.push(status);
      }
      sql += ' ORDER BY submitted_at DESC';
      const res = await query(sql, params);
      return res.rows;
    } catch (err) {
      console.warn('[ArchiveService] DB getSubmissions failed:', err.message);
    }
  }

  if (status && status !== 'all') {
    return memorySubmissions.filter((s) => s.status === status);
  }
  return memorySubmissions;
}

/**
 * Moderate a submission (approve / reject).
 */
async function moderateSubmission(idOrTrackingId, action, notes = '') {
  const newStatus = action === 'approve' ? 'approved' : 'rejected';
  const now = new Date().toISOString();

  if (isDbConnected()) {
    try {
      const res = await query(
        `UPDATE community_submissions SET status = $1, moderator_notes = $2, reviewed_at = $3
         WHERE id::text = $4 OR tracking_id = $4 RETURNING *;`,
        [newStatus, notes, now, String(idOrTrackingId)]
      );
      if (res.rows.length > 0) {
        return { success: true, submission: res.rows[0] };
      }
    } catch (err) {
      console.warn('[ArchiveService] DB moderateSubmission failed:', err.message);
    }
  }

  const sub = memorySubmissions.find(
    (s) => String(s.id) === String(idOrTrackingId) || s.tracking_id === String(idOrTrackingId)
  );
  if (sub) {
    sub.status = newStatus;
    sub.moderator_notes = notes;
    sub.reviewed_at = now;
    return { success: true, submission: sub };
  }
  return { success: false, error: 'Submission not found' };
}

/**
 * Get all heritage locations.
 */
async function getLocations() {
  if (isDbConnected()) {
    try {
      const res = await query('SELECT * FROM heritage_locations ORDER BY id ASC');
      if (res.rows.length > 0) return res.rows;
    } catch (err) {
      console.warn('[ArchiveService] DB getLocations failed:', err.message);
    }
  }
  return memoryLocations;
}

/**
 * Update location survey coordinates / verification status.
 */
async function updateLocation(slug, data) {
  if (isDbConnected()) {
    try {
      const res = await query(
        `UPDATE heritage_locations SET
          latitude = COALESCE($1, latitude),
          longitude = COALESCE($2, longitude),
          verification_status = COALESCE($3, verification_status),
          verification_note_en = COALESCE($4, verification_note_en),
          verification_note_ne = COALESCE($5, verification_note_ne),
          updated_at = NOW()
         WHERE slug = $6 RETURNING *;`,
        [data.latitude, data.longitude, data.verification_status, data.verification_note_en, data.verification_note_ne, slug]
      );
      if (res.rows.length > 0) return { success: true, location: res.rows[0] };
    } catch (err) {
      console.warn('[ArchiveService] DB updateLocation failed:', err.message);
    }
  }

  const loc = memoryLocations.find((l) => l.slug === slug);
  if (loc) {
    if (data.latitude !== undefined) loc.latitude = data.latitude;
    if (data.longitude !== undefined) loc.longitude = data.longitude;
    if (data.verification_status) loc.verification_status = data.verification_status;
    return { success: true, location: loc };
  }
  return { success: false, error: 'Location not found' };
}

function formatStoryRow(row) {
  const is22Dhara = row.heritage_location_slug === '22-dhara';
  const isPyatho = row.heritage_location_slug === 'pyatho-ajima';

  return {
    id: row.id,
    slug: row.slug,
    title: { en: row.title_en, ne: row.title_ne },
    summary: {
      en: row.summary_en || (row.content_en ? row.content_en.slice(0, 160) + '...' : ''),
      ne: row.summary_ne || (row.content_ne ? row.content_ne.slice(0, 160) + '...' : ''),
    },
    contributor: {
      name: row.contributor_name_en,
      nameNepali: row.contributor_name_ne,
      role: { en: row.contributor_role_en, ne: row.contributor_role_ne },
      attributionPreference: row.attribution_preference,
    },
    heritageLocation: {
      id: row.heritage_location_slug || 'ward-16-general',
      slug: row.heritage_location_slug || 'ward-16-general',
      name: {
        en: is22Dhara ? '22 Dhara (Balaju Baisdhara)' : isPyatho ? 'Pyatho Ajima Temple' : 'Ward 16 Heritage',
        ne: is22Dhara ? 'बाइस धारा (बालाजु बाइसधारा)' : isPyatho ? 'प्याठो अजिमा मन्दिर' : 'वडा १६ सम्पदा',
      },
    },
    category: row.category_id,
    era: { en: row.era_label_en, ne: row.era_label_ne },
    approximateYear: row.approximate_year,
    content: { en: row.content_en, ne: row.content_ne },
    photographs: row.photographs || [],
    publicationDate: row.publication_date,
    language: row.language,
    source: row.source,
    verificationStatus: row.verification_status,
    status: row.status,
    tags: row.tags || [],
  };
}

function formatMemoryStory(s) {
  const is22Dhara = s.heritage_location_slug === '22-dhara';
  const isPyatho = s.heritage_location_slug === 'pyatho-ajima';

  return {
    id: s.slug,
    slug: s.slug,
    title: { en: s.title_en, ne: s.title_ne },
    summary: {
      en: s.summary_en || (s.content_en ? s.content_en.slice(0, 160) + '...' : ''),
      ne: s.summary_ne || (s.content_ne ? s.content_ne.slice(0, 160) + '...' : ''),
    },
    contributor: {
      name: s.contributor_name_en,
      nameNepali: s.contributor_name_ne,
      role: { en: s.contributor_role_en, ne: s.contributor_role_ne },
      attributionPreference: s.attribution_preference,
    },
    heritageLocation: {
      id: s.heritage_location_slug || 'ward-16-general',
      slug: s.heritage_location_slug || 'ward-16-general',
      name: {
        en: is22Dhara ? '22 Dhara (Balaju Baisdhara)' : isPyatho ? 'Pyatho Ajima Temple' : 'Ward 16 Heritage',
        ne: is22Dhara ? 'बाइस धारा (बालाजु बाइसधारा)' : isPyatho ? 'प्याठो अजिमा मन्दिर' : 'वडा १६ सम्पदा',
      },
    },
    category: s.category_id,
    era: { en: s.era_label_en, ne: s.era_label_ne },
    approximateYear: s.approximate_year,
    content: { en: s.content_en, ne: s.content_ne },
    photographs: s.photographs || [],
    publicationDate: s.publication_date,
    language: s.language,
    source: s.source,
    verificationStatus: s.verification_status,
    status: s.status,
    tags: s.tags || [],
  };
}

module.exports = {
  getStories,
  getStoryBySlug,
  submitStory,
  getSubmissions,
  moderateSubmission,
  getLocations,
  updateLocation,
};
