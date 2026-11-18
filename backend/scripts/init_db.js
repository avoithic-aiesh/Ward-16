/**
 * backend/scripts/init_db.js
 *
 * Script to initialize PostgreSQL tables and seed data.
 * Usage: npm run init-db
 */

const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');
const { SEED_LOCATIONS, SEED_STORIES } = require('../data/seed_data');

async function initDatabase() {
  console.log('[InitDB] Connecting to PostgreSQL to apply schema...');
  const client = await pool.connect();

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
    await client.query(schemaSql);
    console.log('[InitDB] Schema created/verified successfully.');

    // Seed locations
    for (const loc of SEED_LOCATIONS) {
      await client.query(
        `INSERT INTO heritage_locations (
          slug, name_en, name_ne, category, address_en, address_ne,
          latitude, longitude, verification_status, verification_note_en, verification_note_ne
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (slug) DO UPDATE SET
          name_en = EXCLUDED.name_en,
          latitude = EXCLUDED.latitude,
          longitude = EXCLUDED.longitude;`,
        [
          loc.slug,
          loc.name_en,
          loc.name_ne,
          loc.category,
          loc.address_en,
          loc.address_ne,
          loc.latitude,
          loc.longitude,
          loc.verification_status,
          loc.verification_note_en,
          loc.verification_note_ne,
        ]
      );
    }
    console.log(`[InitDB] Seeded ${SEED_LOCATIONS.length} heritage locations.`);

    // Seed stories
    for (const story of SEED_STORIES) {
      await client.query(
        `INSERT INTO community_stories (
          slug, title_en, title_ne, contributor_name_en, contributor_name_ne,
          contributor_role_en, contributor_role_ne, attribution_preference,
          heritage_location_slug, category_id, era_label_en, era_label_ne,
          approximate_year, content_en, content_ne, photographs,
          publication_date, language, source, verification_status, status, tags
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        ON CONFLICT (slug) DO NOTHING;`,
        [
          story.slug,
          story.title_en,
          story.title_ne,
          story.contributor_name_en,
          story.contributor_name_ne,
          story.contributor_role_en,
          story.contributor_role_ne,
          story.attribution_preference,
          story.heritage_location_slug,
          story.category_id,
          story.era_label_en,
          story.era_label_ne,
          story.approximate_year,
          story.content_en,
          story.content_ne,
          JSON.stringify(story.photographs || []),
          story.publication_date,
          story.language,
          story.source,
          story.verification_status,
          story.status,
          story.tags,
        ]
      );
    }
    console.log(`[InitDB] Seeded ${SEED_STORIES.length} approved community stories.`);
    console.log('[InitDB] Database initialization completed successfully.');
  } catch (err) {
    console.error('[InitDB Error]', err);
  } finally {
    client.release();
    await pool.end();
  }
}

initDatabase();
