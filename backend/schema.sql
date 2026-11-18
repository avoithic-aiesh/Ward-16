-- ==============================================================================
-- WARD 16 DIGITAL HERITAGE — POSTGRESQL SCHEMA (TRADITIONAL METHOD)
-- No Supabase dependencies — pure standard PostgreSQL DDL
-- ==============================================================================

-- 1. HERITAGE LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS heritage_locations (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ne VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address_en TEXT,
    address_ne TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    verification_status VARCHAR(50) DEFAULT 'pending-survey',
    verification_note_en TEXT,
    verification_note_ne TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. COMMUNITY STORIES TABLE (APPROVED ARCHIVAL STORIES)
CREATE TABLE IF NOT EXISTS community_stories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(120) UNIQUE NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ne VARCHAR(255) NOT NULL,
    contributor_name_en VARCHAR(255) NOT NULL,
    contributor_name_ne VARCHAR(255),
    contributor_role_en VARCHAR(255),
    contributor_role_ne VARCHAR(255),
    attribution_preference VARCHAR(50) DEFAULT 'real_name',
    heritage_location_slug VARCHAR(100) REFERENCES heritage_locations(slug) ON DELETE SET NULL,
    category_id VARCHAR(50) NOT NULL,
    era_label_en VARCHAR(100),
    era_label_ne VARCHAR(100),
    approximate_year INTEGER,
    content_en TEXT NOT NULL,
    content_ne TEXT NOT NULL,
    photographs JSONB DEFAULT '[]'::jsonb,
    publication_date DATE DEFAULT CURRENT_DATE,
    language VARCHAR(20) DEFAULT 'bilingual',
    source TEXT,
    verification_status VARCHAR(50) DEFAULT 'community_testimony',
    status VARCHAR(50) DEFAULT 'approved',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. COMMUNITY SUBMISSIONS TABLE (INCOMING PENDING REVIEWS)
CREATE TABLE IF NOT EXISTS community_submissions (
    id SERIAL PRIMARY KEY,
    tracking_id VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    contributor_name VARCHAR(255) NOT NULL,
    contributor_email VARCHAR(255) NOT NULL,
    contributor_phone VARCHAR(50),
    contributor_role VARCHAR(255),
    attribution_preference VARCHAR(50) DEFAULT 'real_name',
    heritage_location VARCHAR(100),
    category_id VARCHAR(50) NOT NULL,
    era_label VARCHAR(100),
    approximate_year INTEGER,
    content TEXT NOT NULL,
    language VARCHAR(20) DEFAULT 'bilingual',
    source TEXT,
    consent_given BOOLEAN DEFAULT FALSE,
    copyright_declaration BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending_review',
    moderator_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- 4. MODERATION AUDIT LOGS
CREATE TABLE IF NOT EXISTS moderation_logs (
    id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES community_submissions(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL, -- 'approved', 'rejected', 'note_added'
    moderator_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS idx_community_stories_status ON community_stories(status);
CREATE INDEX IF NOT EXISTS idx_community_stories_category ON community_stories(category_id);
CREATE INDEX IF NOT EXISTS idx_community_submissions_status ON community_submissions(status);
CREATE INDEX IF NOT EXISTS idx_heritage_locations_slug ON heritage_locations(slug);
