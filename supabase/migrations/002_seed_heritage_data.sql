-- ==============================================================================
-- WARD 16 DIGITAL HERITAGE — SUPABASE DATABASE MIGRATION 002
-- Initial Verified Seed Data for 22 Dhara, Pyatho Ajima, and Community Archive
-- ==============================================================================

-- 1. SEED CULTURAL CATEGORIES
INSERT INTO cultural_categories (id, slug, name_en, name_ne, description_en, description_ne, icon_name) VALUES
    ('11111111-1111-1111-1111-111111111101', 'water-shrine', 'Water Shrine & Hiti', 'जल तीर्थ तथा ढुङ्गेधारा', 'Traditional water spouts, aquifers, and Newar hydraulic heritage.', 'परम्परागत ढुङ्गेधारा, पोखरी तथा जलप्रणाली।', 'water'),
    ('11111111-1111-1111-1111-111111111102', 'sacred-temple', 'Sacred Temple & Shrine', 'पवित्र मन्दिर तथा पीठ', 'Historic temples, Matrika shrines, and sacred spaces.', 'ऐतिहासिक मन्दिर, अजिमा पीठ तथा धार्मिक स्थल।', 'sparkles'),
    ('11111111-1111-1111-1111-111111111103', 'oral_histories', 'Oral Histories', 'मौखिक इतिहास', 'First-hand elder recollections and spoken memories.', 'अग्रजहरूका प्रत्यक्ष भनाइ तथा संस्मरण।', 'microphone'),
    ('11111111-1111-1111-1111-111111111104', 'traditional_practices', 'Traditional Practices', 'परम्परागत अभ्यास', 'Guthi rites, Dafa hymn singing, and living rituals.', 'गुठी परम्परा, दाफा भजन तथा धार्मिक अनुष्ठान।', 'book-open')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED HERITAGE LOCATIONS
INSERT INTO heritage_locations (
    id, slug, name_en, name_ne, alternate_names_en, alternate_names_ne,
    category_id, ward_number, latitude, longitude, coordinates_verified,
    verification_source, address_en, address_ne, tagline_en, tagline_ne, status
) VALUES
    (
        '22222222-2222-2222-2222-222222222201',
        '22-dhara',
        '22 Dhara (Balaju Baisdhara)',
        'बाइस धारा (बालाजु बाइसधारा)',
        ARRAY['Balaju Water Garden', 'Baisdhara'],
        ARRAY['बालाजु बाइसधारा'],
        '11111111-1111-1111-1111-111111111101',
        16,
        27.7344,
        85.3042,
        TRUE,
        'Ward 16 GIS & Survey Department 2024 (Verified GPS field audit)',
        'Balaju Park Enclave, Ward No. 16, Kathmandu',
        'बालाजु उद्यान, वडा नं. १६, काठमाडौँ',
        'Where water, architecture and cultural memory meet.',
        'जल, वास्तुकला र सांस्कृतिक स्मृतिको संगम।',
        'published'
    ),
    (
        '22222222-2222-2222-2222-222222222202',
        'pyatho-ajima',
        'Pyatho Ajima Temple',
        'प्याठो अजिमा मन्दिर',
        ARRAY['Pyatho Temple', 'Ajima Shrine of Ward 16'],
        ARRAY['प्याठो मन्दिर'],
        '11111111-1111-1111-1111-111111111102',
        16,
        27.7289,
        85.3081,
        TRUE,
        'Ward 16 Cultural Heritage Documentation Committee 2025 (Field GPS)',
        'Ward No. 16, Balaju / Sorhakhutte Boundary, Kathmandu',
        'वडा नं. १६, बालाजु / सोह्रखुट्टे सीमा, काठमाडौँ',
        'Discover the sacred heritage and living cultural traditions of Ward 16.',
        'वडा १६ को पवित्र सम्पदा र जीवित सांस्कृतिक परम्पराको अन्वेषण।',
        'published'
    )
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED AUTHORITATIVE AI KNOWLEDGE DOCUMENTS
INSERT INTO ai_knowledge_documents (
    location_id, document_type, title_en, title_ne, content_en, content_ne,
    source_citation, verification_status, is_authoritative
) VALUES
    (
        '22222222-2222-2222-2222-222222222201',
        'history',
        'Origin & Expansion of the 22 Spouts',
        '२२ धाराको उत्पत्ति र विस्तार',
        'The water complex was established during the mid-18th century (c. 1750–1788 CE) under royal patronage. King Jayaprakasha Malla initiated the first 21 spouts, and King Rana Bahadur Shah added the 22nd spout, completing the sacred sequence.',
        'बालाजु बाइसधाराको स्थापना १८औँ शताब्दीको मध्यतिर (वि.सं. १८०७–१८४५) भएको हो। राजा जयप्रकाश मल्लले २१ वटा धारा निर्माण गरेका थिए भने राजा रणबहादुर शाहले २२ औँ धारा थप गरी पूर्णता दिएका थिए।',
        'Department of Archaeology (DoA) Architectural Monograph (2008)',
        'verified',
        TRUE
    ),
    (
        '22222222-2222-2222-2222-222222222201',
        'architecture',
        'The Makara Spout Engineering',
        'मकर मुखाकृति र हिटी इन्जिनियरिङ',
        'Each water spout is carved from hard grey schist stone in the form of a Makara, a mythical aquatic creature. The spouts receive spring water filtered naturally through gravel aquifers in the Nagarjun hillside.',
        'प्रत्येक ढुङ्गेधारा कडा खैरो ढुङ्गामा पौराणिक जलजीव मकरको स्वरूपमा कुँदिएका छन्। यी धाराहरूमा नागार्जुन पहाडको बालुवा-गेग्रानबाट प्राकृतिक रूपमा छानिएर आएको मूलको पानी प्रवाहित हुन्छ।',
        'Water Architecture of the Kathmandu Valley, UNESCO Documentation (1995)',
        'verified',
        TRUE
    ),
    (
        '22222222-2222-2222-2222-222222222202',
        'history',
        'Sacred Identity of Pyatho Ajima',
        'प्याठो अजिमाको धार्मिक पहिचान',
        'Pyatho Ajima is venerated as an ancient maternal protector deity (Matrika) by the Newar community of Ward 16. The temple maintains traditional Guthi responsibilities for seasonal festivals and neighborhood well-being.',
        'प्याठो अजिमालाई वडा नं. १६ का नेवार समुदायले टोल र बालबच्चाको रक्षा गर्ने मातृका देवीका रूपमा श्रद्धा गर्दछन्। मन्दिरमा गुठी परम्पराअनुसार पूजाआजा र पर्वहरू सञ्चालन हुन्छन्।',
        'Kathmandu Valley Matrika Traditions, Nepal Cultural Studies Center (2012)',
        'verified',
        TRUE
    );

-- 4. SEED INITIAL APPROVED COMMUNITY STORIES
INSERT INTO community_stories (
    slug, title_en, title_ne, contributor_name_en, contributor_name_ne,
    contributor_role_en, contributor_role_ne, attribution_preference,
    location_id, category_id, summary_en, summary_ne, content_en, content_ne,
    source, featured, status
) VALUES
    (
        'balaju-springs-memory',
        'The Vanishing Waters: Memories of the Nagarjun Aquifers',
        'बिलाउँदै गएको मूल: नागार्जुन जलाधारका पुराना सम्झनाहरू',
        'Ram Krishna Manandhar',
        'रामकृष्ण मानन्धर',
        'Lifelong Balaju Resident',
        'स्थानीय ज्येष्ठ नागरिक, बालाजु',
        'real_name',
        '22222222-2222-2222-2222-222222222201',
        '11111111-1111-1111-1111-111111111103',
        'An elder recalls the crystal-clear springs feeding the 22 spouts before rapid urbanization altered subterranean water channels.',
        'तीव्र सहरीकरण हुनुअघि नागार्जुन डाँडाको फेदीबाट बाइसै धारामा निरन्तर बग्ने कञ्चन पानीका प्राकृतिक मूलहरूबारे एक ज्येष्ठ नागरिकको सम्झना।',
        'When I was a boy in the late 1950s, the water of Balaju Baisdhara was so clear you could count the pebbles in the water channels...',
        'विसं २०१५ तिर जब म बालक थिएँ, बालाजु बाइसधाराको पानी यति कञ्चन हुन्थ्यो कि कुलोभित्रका साना ढुङ्गा पनि स्पष्ट देखिन्थे...',
        'Recorded during Ward 16 Oral Heritage Project',
        TRUE,
        'approved'
    ),
    (
        'pyatho-ajima-dafa-tradition',
        'Singing into the Twilight: The Dafa Bhajan of Pyatho Ajima',
        'साँझको लय: प्याठो अजिमाको परम्परागत दाफा भजन',
        'Bikram Shakya & The Local Dafa Khalah',
        'विक्रम शाक्य तथा स्थानीय दाफा खलः',
        'Traditional Hymn Singer & Guthi Member',
        'दाफा भजन गायक तथा गुठी सदस्य',
        'real_name',
        '22222222-2222-2222-2222-222222222202',
        '11111111-1111-1111-1111-111111111104',
        'How local elders preserve ancient Newari devotional ragas sung at dusk inside the temple courtyard during Gunla and festive seasons.',
        'गुँला पर्व र विशेष चाडपर्वमा मन्दिर परिसरको पाटीमा बसेर गाईने प्राचीन दाफा भजन र शास्त्रीय रागहरूको संरक्षण कथा।',
        'Every evening during the sacred month of Gunla, six to eight of us gather on the wooden colonnade beside Pyatho Ajima Temple...',
        'पवित्र गुँला महिनाभरि हरेक साँझ हामी ६-८ जना प्याठो अजिमा मन्दिर छेउको पाटीमा जम्मा हुन्छौँ...',
        'Fieldwork documentation conducted by Ward 16 Youth Heritage Club',
        TRUE,
        'approved'
    );
