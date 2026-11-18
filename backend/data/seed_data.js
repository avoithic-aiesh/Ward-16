/**
 * backend/data/seed_data.js
 *
 * Seed records for PostgreSQL initialization and in-memory development fallback.
 */

const SEED_LOCATIONS = [
  {
    slug: '22-dhara',
    name_en: '22 Dhara (Balaju Baisdhara)',
    name_ne: '२२ धारा (बालाजु बाइसधारा)',
    category: 'Water Shrine',
    address_en: 'Balaju Baisdhara Park, Ward No. 16, Kathmandu, Nepal',
    address_ne: 'बालाजु बाइसधारा उद्यान, वडा नं. १६, काठमाडौँ, नेपाल',
    latitude: 27.7372,
    longitude: 85.3025,
    verification_status: 'verified',
    verification_note_en: 'Historical landmark verified by Department of Archaeology and KMC Ward 16 records.',
    verification_note_ne: 'पुरातत्व विभाग तथा काठमाडौँ महानगरपालिका वडा १६ द्वारा प्रमाणित ऐतिहासिक स्थल।',
  },
  {
    slug: 'pyatho-ajima',
    name_en: 'Pyatho Ajima Temple',
    name_ne: 'प्याठो अजिमा मन्दिर',
    category: 'Temple',
    address_en: 'Pyatho Tole, Ward No. 16, Kathmandu, Nepal',
    address_ne: 'प्याठो टोल, वडा नं. १६, काठमाडौँ, नेपाल',
    latitude: 27.7285,
    longitude: 85.3068,
    verification_status: 'verified',
    verification_note_en: 'Sacred community sanctuary verified by local Guthi and Ward 16 documentation.',
    verification_note_ne: 'स्थानीय गुठी तथा वडा १६ अभिलेखालयद्वारा प्रमाणित पवित्र शक्तिपीठ।',
  },
];

const SEED_STORIES = [
  {
    slug: 'memories-of-balaju-baisdhara-waters',
    title_en: 'Memories of Balaju Baisdhara Waters in the 1950s',
    title_ne: 'वि.सं. २०१५ सालतिरको बालाजु बाइसधाराको संस्मरण',
    contributor_name_en: 'Ram Bahadur Shrestha',
    contributor_name_ne: 'रामबहादुर श्रेष्ठ',
    contributor_role_en: 'Lifelong resident of Balaju, Elder',
    contributor_role_ne: 'बालाजुका स्थानीय जेष्ठ नागरिक',
    attribution_preference: 'real_name',
    heritage_location_slug: '22-dhara',
    category_id: 'oral_history',
    era_label_en: 'Late 1950s',
    era_label_ne: 'वि.सं. २०१० को दशक',
    approximate_year: 1958,
    summary_en:
      'An elder recalls the crystal-clear springs feeding the 22 spouts before rapid urbanization altered subterranean water channels.',
    summary_ne:
      'तीव्र सहरीकरण हुनुअघि नागार्जुन डाँडाको फेदीबाट बाइसै धारामा निरन्तर बग्ने कञ्चन पानीका प्राकृतिक मूलहरूबारे एक ज्येष्ठ नागरिकको सम्झना।',
    content_en:
      'When I was a boy in the late 1950s, the water of Balaju Baisdhara was so clear you could count the pebbles in the water channels. The entire hillside above the 22 spouts was dense with chilaune and uttis trees, and you could hear water gurgling underground beneath your feet. On the morning of Chaitra Shukla Purnima, we would wake up at four in the morning to the sound of temple bells and flute music from visiting devotees.',
    content_ne:
      'विसं २०१५ तिर जब म बालक थिएँ, बालाजु बाइसधाराको पानी यति कञ्चन हुन्थ्यो कि कुलोभित्रका साना ढुङ्गा पनि स्पष्ट देखिन्थे। बाइसधाराभन्दा माथिको नागार्जुन डाँडा उत्तिस र चिलाउनेको बाक्लो जंगलले ढाकिएको थियो। चैत्र शुक्ल पूर्णिमाको दिन बिहान चारै बजे शङ्ख-घण्टको ध्वनि र बाँसुरीको धुनले हामी ब्युँझन्थ्यौँ।',
    photographs: [
      {
        url: '/images/22-dhara/spouts-detail.jpg',
        caption: {
          en: 'The carved Makara water spouts flowing during early spring.',
          ne: 'वसन्त ऋतुमा ढुङ्गेधाराबाट जल प्रवाह भइरहेको मनमोहक दृश्य।',
        },
      },
    ],
    publication_date: '2026-03-12',
    language: 'bilingual',
    source: 'Recorded during Ward 16 Oral Heritage Project',
    verification_status: 'community_testimony',
    status: 'approved',
    tags: ['Balaju', 'Water Spouts', 'Nagarjun', 'Living Heritage'],
  },
  {
    slug: 'pyatho-ajima-dafa-tradition',
    title_en: 'The Living Dafa Bhajan Tradition of Pyatho Ajima',
    title_ne: 'प्याठो अजिमाको जीवन्त दाफा भजन परम्परा',
    contributor_name_en: 'Babu Raja Maharjan',
    contributor_name_ne: 'बाबुराजा महर्जन',
    contributor_role_en: 'Dafa Khala Leader & Traditional Drummer',
    contributor_role_ne: 'दाफा खलःका गुरु तथा खिं बाधक',
    attribution_preference: 'real_name',
    heritage_location_slug: 'pyatho-ajima',
    category_id: 'cultural_practice',
    era_label_en: '1970s to Present',
    era_label_ne: 'वि.सं. २०३० देखि हालसम्म',
    approximate_year: 1974,
    summary_en:
      'A master drummer describes how evening Dafa hymns maintain communal ties and ancestral Newar musical heritage at Pyatho Ajima.',
    summary_ne:
      'प्याठो अजिमाको पाटीमा साँझ गाइने परम्परागत दाफा भजन र खिं बाजाले समुदायलाई कसरी एकाकार राखेको छ भन्नेबारे एक गुरुको अनुभव।',
    content_en:
      'Every evening after dusk, our fathers and grandfathers gathered at the temple pati to sing devotional ragas. Our Dafa group still plays the Khin drum and Ta cymbals during the sacred month of Gunla. The melodies we sing are centuries old, preserving ancient texts that would otherwise be lost.',
    content_ne:
      'हरेक साँझ झिसमिसेपछि हाम्रा बुबा र बाजेहरू मन्दिरको पाटीमा भेला भएर भजन गाउनुहुन्थ्यो। हाम्रो दाफा समूहले अझै पनि गुँला महिनामा खिं बाजा र ताः बजाउँदै राग गाउने गर्छ। यी शास्त्रीय भजनहरू हाम्रा पुर्खाहरूको अमूल्य सम्पत्ति हुन्।',
    photographs: [
      {
        url: '/images/culture/stories.jpg',
        caption: {
          en: 'Devotional Dafa musicians during evening prayers.',
          ne: 'साँझको भजनमा सहभागी दाफा गुरु तथा संगीतकारहरू।',
        },
      },
    ],
    publication_date: '2026-03-14',
    language: 'bilingual',
    source: 'Guthi archives & community recording',
    verification_status: 'community_testimony',
    status: 'approved',
    tags: ['Pyatho Ajima', 'Dafa Bhajan', 'Music', 'Guthi'],
  },
];

module.exports = {
  SEED_LOCATIONS,
  SEED_STORIES,
};
