-- ==============================================================================
-- WARD 16 DIGITAL HERITAGE — SUPABASE DATABASE MIGRATION 001
-- Initial Normalized Schema, Constraints, Indexes, and Row Level Security (RLS)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
CREATE TYPE user_role AS ENUM ('super_admin', 'heritage_editor', 'content_reviewer');
CREATE TYPE location_status AS ENUM ('published', 'draft', 'archived');
CREATE TYPE verification_status AS ENUM ('verified', 'approximate', 'pending_verification', 'community_testimony');
CREATE TYPE submission_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected');
CREATE TYPE attribution_preference AS ENUM ('real_name', 'pseudonym', 'anonymous');

-- 3. USER ROLES & PROFILES
CREATE TABLE IF NOT EXISTS admin_roles (
    id SERIAL PRIMARY KEY,
    role_name user_role UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO admin_roles (role_name, description) VALUES
    ('super_admin', 'Full platform permissions, system configuration, user role assignments.'),
    ('heritage_editor', 'Can create and edit heritage content, upload media, update timelines.'),
    ('content_reviewer', 'Can moderate community submissions and review archive entries.')
ON CONFLICT (role_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'content_reviewer',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CULTURAL CATEGORIES
CREATE TABLE IF NOT EXISTS cultural_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_ne TEXT NOT NULL,
    description_en TEXT,
    description_ne TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. HERITAGE LOCATIONS (GEO & PRIMARY REGISTRY)
CREATE TABLE IF NOT EXISTS heritage_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_ne TEXT NOT NULL,
    alternate_names_en TEXT[] DEFAULT '{}',
    alternate_names_ne TEXT[] DEFAULT '{}',
    category_id UUID REFERENCES cultural_categories(id) ON DELETE SET NULL,
    ward_number INTEGER NOT NULL DEFAULT 16,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    coordinates_verified BOOLEAN DEFAULT FALSE,
    verification_source TEXT,
    address_en TEXT,
    address_ne TEXT,
    tagline_en TEXT,
    tagline_ne TEXT,
    cover_image_url TEXT,
    status location_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. HERITAGE CONTENT (DESCRIPTIONS, ARCHITECTURE, SECTIONS)
CREATE TABLE IF NOT EXISTS heritage_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID NOT NULL REFERENCES heritage_locations(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL, -- 'historical_overview', 'architecture', 'cultural_significance', 'storytelling'
    title_en TEXT NOT NULL,
    title_ne TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ne TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    verification_status verification_status DEFAULT 'verified',
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. HERITAGE TIMELINE
CREATE TABLE IF NOT EXISTS heritage_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID NOT NULL REFERENCES heritage_locations(id) ON DELETE CASCADE,
    year_display TEXT NOT NULL, -- e.g. "c. 1750 CE" / "वि.सं. १८०७"
    epoch_category TEXT NOT NULL, -- 'origin', 'royal_patronage', 'modern_era'
    title_en TEXT NOT NULL,
    title_ne TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ne TEXT NOT NULL,
    source_citation TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. HERITAGE IMAGES & STORAGE METADATA
CREATE TABLE IF NOT EXISTS heritage_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES heritage_locations(id) ON DELETE CASCADE,
    storage_bucket TEXT NOT NULL DEFAULT 'heritage-media',
    storage_path TEXT NOT NULL,
    caption_en TEXT,
    caption_ne TEXT,
    photographer_credit TEXT,
    license_type TEXT DEFAULT 'CC BY-NC 4.0',
    is_cover BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    verification_status verification_status DEFAULT 'verified',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. HERITAGE SOURCES & BIBLIOGRAPHY
CREATE TABLE IF NOT EXISTS heritage_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES heritage_locations(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_ne TEXT,
    author TEXT NOT NULL,
    publication_year TEXT,
    publisher_or_archive TEXT,
    reference_type TEXT DEFAULT 'book', -- 'book', 'chronicle', 'inscription', 'field_study'
    call_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AUDIO RESOURCES
CREATE TABLE IF NOT EXISTS audio_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES heritage_locations(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_ne TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL,
    audio_storage_path TEXT NOT NULL,
    narration_script_en TEXT,
    narration_script_ne TEXT,
    speaker_credit TEXT,
    status location_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES heritage_locations(id) ON DELETE CASCADE,
    question_en TEXT NOT NULL,
    question_ne TEXT NOT NULL,
    options_en JSONB NOT NULL, -- array of strings
    options_ne JSONB NOT NULL, -- array of strings
    correct_option_index INTEGER NOT NULL,
    explanation_en TEXT NOT NULL,
    explanation_ne TEXT NOT NULL,
    source_citation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AI KNOWLEDGE BASE (STRICTLY AUTHORITATIVE)
CREATE TABLE IF NOT EXISTS ai_knowledge_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_id UUID REFERENCES heritage_locations(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'history', 'architecture', 'ritual', 'ecology'
    title_en TEXT NOT NULL,
    title_ne TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ne TEXT NOT NULL,
    source_citation TEXT NOT NULL,
    verification_status verification_status DEFAULT 'verified',
    is_authoritative BOOLEAN DEFAULT TRUE,
    last_synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. COMMUNITY SUBMISSIONS (MODERATION PIPELINE)
CREATE TABLE IF NOT EXISTS community_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id TEXT UNIQUE NOT NULL,
    contributor_name TEXT NOT NULL,
    contributor_role TEXT,
    attribution_preference attribution_preference DEFAULT 'real_name',
    contact_email TEXT, -- Stored privately for moderation contact only
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    location_id UUID REFERENCES heritage_locations(id) ON DELETE SET NULL,
    category_id UUID REFERENCES cultural_categories(id) ON DELETE SET NULL,
    photo_url TEXT,
    photo_caption TEXT,
    photo_ownership_confirmed BOOLEAN DEFAULT FALSE,
    consent_agreed BOOLEAN DEFAULT FALSE,
    status submission_status DEFAULT 'pending_review',
    reviewed_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. COMMUNITY STORIES (PUBLICLY APPROVED LIVING MEMORIES)
CREATE TABLE IF NOT EXISTS community_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID UNIQUE REFERENCES community_submissions(id) ON DELETE SET NULL,
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_ne TEXT NOT NULL,
    contributor_name_en TEXT NOT NULL,
    contributor_name_ne TEXT NOT NULL,
    contributor_role_en TEXT,
    contributor_role_ne TEXT,
    attribution_preference attribution_preference DEFAULT 'real_name',
    location_id UUID REFERENCES heritage_locations(id) ON DELETE SET NULL,
    category_id UUID REFERENCES cultural_categories(id) ON DELETE SET NULL,
    summary_en TEXT NOT NULL,
    summary_ne TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ne TEXT NOT NULL,
    source TEXT,
    featured BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    status submission_status DEFAULT 'approved',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_heritage_locations_slug ON heritage_locations(slug);
CREATE INDEX IF NOT EXISTS idx_heritage_content_location ON heritage_content(location_id);
CREATE INDEX IF NOT EXISTS idx_heritage_timeline_location ON heritage_timeline(location_id);
CREATE INDEX IF NOT EXISTS idx_heritage_images_location ON heritage_images(location_id);
CREATE INDEX IF NOT EXISTS idx_community_submissions_status ON community_submissions(status);
CREATE INDEX IF NOT EXISTS idx_community_stories_slug ON community_stories(slug);
CREATE INDEX IF NOT EXISTS idx_community_stories_status ON community_stories(status);
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_location ON ai_knowledge_documents(location_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE heritage_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Anonymous and authenticated can view verified published data)
CREATE POLICY "Public can view published heritage locations"
    ON heritage_locations FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view heritage content"
    ON heritage_content FOR SELECT
    USING (TRUE);

CREATE POLICY "Public can view heritage timeline"
    ON heritage_timeline FOR SELECT
    USING (TRUE);

CREATE POLICY "Public can view heritage images"
    ON heritage_images FOR SELECT
    USING (TRUE);

CREATE POLICY "Public can view heritage sources"
    ON heritage_sources FOR SELECT
    USING (TRUE);

CREATE POLICY "Public can view audio resources"
    ON audio_resources FOR SELECT
    USING (status = 'published');

CREATE POLICY "Public can view quiz questions"
    ON quiz_questions FOR SELECT
    USING (TRUE);

CREATE POLICY "Public can view approved community stories"
    ON community_stories FOR SELECT
    USING (status = 'approved');

CREATE POLICY "Public can view authoritative AI documents"
    ON ai_knowledge_documents FOR SELECT
    USING (is_authoritative = TRUE);

-- 2. Public Community Submission Policy (Anyone can submit a memory for moderation)
CREATE POLICY "Public can insert community submissions"
    ON community_submissions FOR INSERT
    WITH CHECK (status = 'pending_review');

-- 3. Reviewer and Editor Policies (Requires authenticated user with appropriate role)
CREATE POLICY "Staff can view all submissions"
    ON community_submissions FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND is_active = TRUE
        )
    );

CREATE POLICY "Staff can update submissions during review"
    ON community_submissions FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND is_active = TRUE AND role IN ('super_admin', 'content_reviewer')
        )
    );

CREATE POLICY "Editors can modify heritage data"
    ON heritage_locations FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND is_active = TRUE AND role IN ('super_admin', 'heritage_editor')
        )
    );
