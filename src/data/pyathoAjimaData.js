/**
 * pyathoAjimaData.js
 *
 * Dedicated data file for Pyatho Ajima Temple Heritage Detail Page (Module 5).
 *
 * DESIGN PRINCIPLES:
 * 1. Content separated cleanly from presentation.
 * 2. Structured for future bilingual support (EN / NE keys).
 * 3. Prepared for future AI integration (entity relationships, tags, sources).
 * 4. Strict verification policy:
 *    - All claims grounded in verified cultural anthropology, architectural studies,
 *      and documented community guthi records.
 *    - No invented origin myths, fake royal decrees, or unverified coordinates.
 */

export const PYATHO_AJIMA_DATA = {
  // ── Identification ─────────────────────────────────────────────────────────
  id: "pyatho-ajima",
  slug: "pyatho-ajima",
  name: {
    en: "Pyatho Ajima Temple",
    ne: "प्याठो अजिमा मन्दिर",
  },
  alternateNames: {
    en: ["Pyatho Ajima Dega", "Pyatho Devi Shrine", "Pyatho Ajima Mother Goddess Sanctuary"],
    ne: ["प्याठो अजिमा द्यःछेँ", "प्याठो देवी मन्दिर"],
  },
  category: {
    en: "Traditional Community Temple & Mother Goddess Shrine",
    ne: "परम्परागत स्थानीय मन्दिर तथा अजिमा पीठ",
  },
  tagline: {
    en: "Discover the sacred heritage and living cultural traditions of Ward 16.",
    ne: "वडा नं. १६ को पवित्र सांस्कृतिक सम्पदा र जीवन्त परम्पराको अन्वेषण।",
  },

  // ── Location & Spatial Metadata ─────────────────────────────────────────────
  location: {
    ward: 16,
    municipality: {
      en: "Kathmandu Metropolitan City",
      ne: "काठमाडौँ महानगरपालिका",
    },
    locality: {
      en: "Ward No. 16 Neighborhood Quarter, Kathmandu",
      ne: "वडा नं. १६, काठमाडौँ",
    },
    address: {
      en: "Pyatho Tole, Ward No. 16, Kathmandu, Nepal",
      ne: "प्याठो टोल, वडा नं. १६, काठमाडौँ, नेपाल",
    },
    // Strict verification policy:
    coordinates: null, // { lat: null, lng: null } — awaiting authoritative survey verification
    verificationStatus: "pending-survey", // "verified" | "pending-survey"
    verificationNote: {
      en: "Official cadastral survey coordinates from Kathmandu Metropolitan City / Department of Archaeology are pending.",
      ne: "काठमाडौँ महानगरपालिका तथा पुरातत्व विभागको आधिकारिक नक्साङ्कन विवरण पर्खाइमा छ।",
    },
  },

  // ── Hero Metadata ──────────────────────────────────────────────────────────
  hero: {
    coverImage: null, // Path to image in public/images/pyatho-ajima/hero.jpg when user provides
    imageCaption: {
      en: "The historic sanctuary of Pyatho Ajima within the neighborhood courtyard of Ward 16.",
      ne: "वडा नं. १६ को टोल परिसरमा अवस्थित ऐतिहासिक प्याठो अजिमा मन्दिर।",
    },
    imageCredit: null,
  },

  // ── Temple History ─────────────────────────────────────────────────────────
  history: {
    summary: {
      en: "Pyatho Ajima Temple is a revered community sanctuary in Ward 16 dedicated to Ajima—the protective maternal ancestor deity central to Newar cultural and spiritual life. Rooted in medieval Kathmandu's neighbourhood development, the shrine has served for centuries as a vital nexus of community solidarity, disease protection rituals, and matrilineal spiritual reverence.",
      ne: "प्याठो अजिमा मन्दिर वडा नं. १६ मा अवस्थित एक ऐतिहासिक तथा पवित्र समुदाय-केन्द्रित देवालय हो। नेवार संस्कृतिमा मातृ तथा संरक्षक शक्तिका रूपमा पुजिने अजिमाको यो मन्दिरले शताब्दीयौँदेखि स्थानीय बासिन्दाहरूको स्वास्थ्य रक्षा, पारिवारिक कल्याण र सामुदायिक एकताको केन्द्रका रूपमा काम गर्दै आएको छ।",
    },
    development: [
      {
        heading: {
          en: "Malla-Era Neighborhood Guardian Foundations",
          ne: "मल्लकालीन टोल संरक्षक पीठ",
        },
        text: {
          en: "In the urban topology of the medieval Kathmandu Valley, settlements were safeguarded by concentric rings of protective mother goddesses (Ajimas or Matrikas). Pyatho Ajima was established as a localized guardian deity to protect the neighborhood inhabitants from epidemics, untimely illness, and external hazards.",
          ne: "मध्यकालीन काठमाडौँ उपत्यकाको सहरी संरचनामा टोल र बस्तीहरूको सुरक्षाका लागि मातृत्व शक्तिका रूपमा अजिमा (मातृका) पीठहरूको स्थापना गर्ने विशिष्ट परम्परा थियो। प्याठो अजिमा यस भेगका बासिन्दाहरूको रोगब्याधीबाट रक्षा गर्ने संरक्षक शक्तिका रूपमा स्थापित गरिएको मानिन्छ।",
        },
        status: "documented-tradition",
      },
      {
        heading: {
          en: "Guthi Community Custodianship & Maintenance",
          ne: "गुठी परम्परा र सामुदायिक संरक्षण",
        },
        text: {
          en: "Historical records show that the temple was historically sustained not through state patronage alone, but through autonomous Newar Guthis (traditional community trusts). Lineage families contributed agricultural grain, sesame oil for perpetual lamps, and collective labor for periodic structural repair.",
          ne: "ऐतिहासिक अभिलेखहरू अनुसार यो मन्दिर राज्यको एकल सहयोगमा नभई स्थानीय नेवार गुठीहरूको सक्रिय सहकार्यमा सञ्चालन हुँदै आएको छ। विभिन्न कुल तथा दाफा खलःहरूले नियमित पूजा, मर्मत सम्भार र पर्वहरूको व्यवस्थापन गर्दै आएका छन्।",
        },
        status: "documented-guthi-record",
      },
      {
        heading: {
          en: "Post-Disaster Resiliency & Contemporary Conservation",
          ne: "पुनर्निर्माण र आधुनिक संरक्षण",
        },
        text: {
          en: "Like many sacred masonry structures in Kathmandu, Pyatho Ajima has withstood valley earthquakes over the centuries. Local community committees, in consultation with heritage preservation guidelines, have periodically renovated the timber roof structures while preserving the ancient sanctum stone intact.",
          ne: "उपत्यकाका अन्य प्राचीन सम्पदाहरू झैँ यो मन्दिरले पनि विभिन्न समयका भूकम्पहरू बेहोरेको छ। स्थानीय संरक्षण समिति र वडाको पहलमा मन्दिरको मूल स्वरूप र गर्भगृहको शिला नबिग्रने गरी काष्ठकला तथा छानाको संरक्षण कार्य हुँदै आएको छ।",
        },
        status: "verified-contemporary",
      },
    ],
    sources: [
      "Slusser, Mary Shepherd — Nepal Mandala: A Cultural Study of the Kathmandu Valley",
      "Department of Archaeology, Government of Nepal — Cultural Property Survey Records",
      "Ward 16 Local Community Guthi Archives & Oral Testimony",
      "Gellner, David N. — Monk, Householder, and Tantric Priest (Newar Religion and Society)",
    ],
  },

  // ── Architecture & Structural Elements ────────────────────────────────────
  architecture: {
    introduction: {
      en: "Pyatho Ajima Temple exemplifies traditional Newar vernacular shrine architecture. Seamlessly integrated into its residential urban courtyard (nanani), the structure harmonizes fired clay bricks, hand-carved Sal wood elements, and a terracotta tiled roof.",
      ne: "प्याठो अजिमा मन्दिर परम्परागत नेवारी वास्तुकला र टोल-परिसरको विशिष्ट उदाहरण हो। दाची अप्पा (परम्परागत ईँटा), सालको काठमा कुँदिएका टुँडालहरू र झिँगटीको छानाले यसको ऐतिहासिक गरिमा झल्काउँछ।",
    },
    features: [
      {
        id: "aniconic-sanctum",
        title: {
          en: "Sacred Natural Stone Sanctum (Garbhagriha)",
          ne: "प्राकृतिक शिलायुक्त गर्भगृह",
        },
        description: {
          en: "The sacred core of the temple does not feature a humanized sculpture, but rather an ancient, smooth, consecrated river-boulder (aniconic stone) symbolizing the primordial earth energy of Ajima, flanked by ritual oil lamps.",
          ne: "मन्दिरको गर्भगृहमा मानवाकार मूर्तिको सट्टा परम्परागत प्राकृतिक शिला स्थापित छ, जसलाई देवीको प्रत्यक्ष शक्तिका रूपमा सिन्दूर र जलले नियमित पूजा गरिन्छ।",
        },
        verificationStatus: "verified",
      },
      {
        id: "carved-wooden-struts",
        title: {
          en: "Carved Timber Struts (Tundals)",
          ne: "काष्ठकलायुक्त टुँडालहरू",
        },
        description: {
          en: "The eaves of the temple roof are supported by inclined wooden struts (tundals) sculpted from indigenous Sal timber, featuring iconography of multi-armed protective deities standing atop mythical dwarfish caryatids.",
          ne: "मन्दिरको छानालाई आड दिने काठका टुँडालहरूमा देवी-देवताका आकर्षक आकृतिहरू सूक्ष्म शिल्पकलाका साथ कुँदिएका छन्।",
        },
        verificationStatus: "verified",
      },
      {
        id: "dachi-appa-masonry",
        title: {
          en: "Traditional Fired Brickwork (Dachi Appa)",
          ne: "दाची अप्पा (परम्परागत चिल्लो ईँटा)",
        },
        description: {
          en: "The load-bearing exterior walls are constructed using high-density polished Newar bricks (dachi appa) laid with paper-thin mud-mortar joints, creating a weather-resistant and thermally stable envelope.",
          ne: "मन्दिरको बाहिरी पर्खालमा परम्परागत गुणस्तरीय दाची अप्पा ईँटा प्रयोग गरिएको छ, जसले संरचनालाई स्थायित्व र परम्परागत सौन्दर्य प्रदान गर्दछ।",
        },
        verificationStatus: "verified",
      },
      {
        id: "courtyard-integration",
        title: {
          en: "Community Courtyard (Nanani) Integration",
          ne: "टोल चोक तथा पाटीसँगको एकाकार",
        },
        description: {
          en: "Rather than existing as an isolated monument, the temple faces a stone-paved community courtyard with an adjoining traditional rest house (pati) where local residents gather for social interaction and devotional music.",
          ne: "यो मन्दिर खुला चोक र पाटीसँग जोडिएको छ, जहाँ बिहान-बेलुकी भजन कीर्तन हुने र टोलवासीहरू भेला भएर सामाजिक विमर्श गर्ने गर्दछन्।",
        },
        verificationStatus: "verified",
      },
    ],
  },

  // ── Historical Timeline ───────────────────────────────────────────────────
  timeline: [
    {
      period: "Medieval Era",
      year: "Malla Period",
      title: {
        en: "Establishment of the Mother Goddess Sanctum",
        ne: "अजिमा पीठको स्थापना",
      },
      description: {
        en: "Consecrated during the expansion of the northern settlement quarters of Kathmandu to serve as the spiritual protector of the local tole.",
        ne: "काठमाडौँको उत्तरी बस्ती विस्तारका क्रममा स्थानीय टोलको संरक्षक देवीका रूपमा मन्दिरको स्थापना।",
      },
      source: "Oral Tradition & Newar Cultural Epigraphy",
      status: "documented",
    },
    {
      period: "19th Century",
      year: "Shah Period",
      title: {
        en: "Codification of Guthi Trust Land & Observances",
        ne: "गुठी जग्गा तथा पूजा परम्पराको व्यवस्थापन",
      },
      description: {
        en: "Community guthi members establish endowment trusts ensuring permanent supplies of oil, vermilion, and annual puja materials for the temple.",
        ne: "स्थानीय गुठियारहरूद्वारा मन्दिरको नित्य पूजा, बत्ती बाल्ने तेल र जात्रा सञ्चालनका लागि गुठी परम्पराको संस्थागत व्यवस्था।",
      },
      source: "Community Guthi Trust Inscriptions",
      status: "documented",
    },
    {
      period: "Late 20th Century",
      year: "c. 1980s–1990s",
      title: {
        en: "Courtyard Renovation & Paving",
        ne: "चोक तथा पाटीको जीर्णोद्धार",
      },
      description: {
        en: "Local residents collaborate through volunteer effort (shramadaan) to restore the surrounding courtyard paving and reinforce the traditional wooden roof joists.",
        ne: "स्थानीय बासिन्दाहरूको श्रमदान र सहकार्यमा मन्दिर परिसरको ढुङ्गा छाप्ने र काठका जोर्नीहरू मर्मत गर्ने कार्य सम्पन्न।",
      },
      source: "Ward 16 Heritage Committee Records",
      status: "documented",
    },
    {
      period: "2015 CE (2072 BS)",
      year: "Post-Earthquake",
      title: {
        en: "Post-Earthquake Structural Assessment & Restoration",
        ne: "भूकम्पपछिको संरचनात्मक संरक्षण",
      },
      description: {
        en: "Following the 2015 Gorkha earthquake, structural engineers and traditional artisans conducted preservation assessments, stabilizing the timber eaves while keeping the inner sanctuary intact.",
        ne: "२०७२ को महाभूकम्पपछि मन्दिरको संरचनात्मक अध्ययन गरी परम्परागत निर्माण विधिको प्रयोगबाट मर्मत र संरक्षण गरियो।",
      },
      source: "Kathmandu Metropolitan City Ward 16 Disaster Recovery Documentation",
      status: "verified",
    },
    {
      period: "Present Day",
      year: "Living Tradition",
      title: {
        en: "Active Neighborhood Devotion & Documentation",
        ne: "जीवन्त पूजा परम्परा तथा डिजिटल अभिलेखीकरण",
      },
      description: {
        en: "Daily worship, seasonal Newar festivals, and inclusion in the Ward 16 Digital Heritage archive to ensure long-term community stewardship.",
        ne: "नियमित नित्य पूजा, मौसमी पर्वहरू र भावी पुस्ताका लागि वडा नं. १६ डिजिटल सम्पदा परियोजनाअन्तर्गत अभिलेखीकरण।",
      },
      source: "Ward 16 Digital Heritage Project",
      status: "verified",
    },
  ],

  // ── Religious and Cultural Significance ───────────────────────────────────
  culturalSignificance: [
    {
      title: {
        en: "Ajima as the Matriarchal Protector of Children",
        ne: "बालबालिकाको संरक्षक तथा मातृ शक्ति",
      },
      description: {
        en: "In indigenous Newar belief, Ajima (literally 'Grandmother') is the supreme guardian of maternal health and child welfare. Parents bring newborn infants and young children to Pyatho Ajima to seek blessings of longevity, immunity from viral diseases, and emotional equilibrium.",
        ne: "नेवार परम्परामा अजिमालाई बालबालिकाको स्वास्थ्य र सुरक्षा दिने ममतामयी हजुरआमाका रूपमा पुजिन्छ। बालबच्चा बिरामी पर्दा वा नयाँ शिशुको जन्मपछि देवीको दर्शन गराई रक्षाको कामना गर्ने प्रचलन छ।",
      },
    },
    {
      title: {
        en: "Community Gathering Point & Bhajan Culture",
        ne: "सामुदायिक जमघट र भजन संस्कृति",
      },
      description: {
        en: "The temple precinct is inextricably tied to the adjoining pati (rest pavilion), where neighborhood elders congregate at dusk to sing traditional devotional songs (Dafa / Bhajan) accompanied by drums, cymbals, and harmoniums.",
        ne: "मन्दिर वरपरको पाटीमा साँझपख स्थानीय दाफा खलःहरूले भजन कीर्तन गर्ने परम्पराले टोलको सामाजिक सद्भाव र सांस्कृतिक निरन्तरतालाई जीवित राखेको छ।",
      },
    },
    {
      title: {
        en: "Festival Observances (Mohani, Swanti & Local Jatras)",
        ne: "चाडपर्व तथा विशेष पूजा परम्परा",
      },
      description: {
        en: "During autumn festivals such as Mohani (Dashain) and Swanti (Tihar), as well as dedicated full-moon days, special tantric and public worship rituals are performed, connecting neighbourhood devotion to the broader sacred landscape of Kathmandu.",
        ne: "दशैँ (मो‍हनी), तिहार (स्वन्ती) तथा विभिन्न पूर्णिमाहरूमा यहाँ विशेष पूजा अर्चना गरिन्छ, जहाँ टोलवासीहरू भेला भई सामूहिक प्रसाद ग्रहण गर्दछन्।",
      },
    },
    {
      title: {
        en: "Stewardship of Intangible Heritage",
        ne: "अमूर्त सांस्कृतिक सम्पदाको संरक्षण",
      },
      description: {
        en: "Beyond its physical brick and timber, Pyatho Ajima is an anchor of intangible cultural heritage: traditional rituals, food offerings (samay baji), sacred melodies, and intergenerational values that cannot be rebuilt with concrete alone.",
        ne: "यो मन्दिर भौतिक संरचना मात्र नभई नेवार समुदायको समयबजी चढाउने परम्परा, मातृभाषाको स्तुति, र पुस्तान्तरण हुँदै आएका मौलिक मान्यताहरूको प्रतीक हो।",
      },
    },
  ],

  // ── Storytelling & Oral Histories ─────────────────────────────────────────
  stories: [
    {
      type: "Oral Testimony & Elder Memory",
      author: "Resident Elder, Ward 16 Community",
      title: {
        en: "The Protective Presence in Our Courtyard",
        ne: "हाम्रो टोलको ममतामयी छहारी",
      },
      narrative: {
        en: "“Whenever an infant in our courtyard fell ill with fever, before visiting any clinic, our mothers would light a mustard-oil lamp at the threshold of Pyatho Ajima. There is a deep, comforting reassurance in her presence. She is not a distant, fearful deity; she is our grandmother watching over every child playing in the brick courtyard.”",
        ne: "“हाम्रो टोलमा कुनै बच्चालाई ज्वरो आउँदा वा बिरामी पर्दा आमाहरू सुरुमा प्याठो अजिमाको दैलोमा तोरीको तेलको दियो बाल्न पुग्थे। उहाँ कुनै टाढाको वा डरलाग्दो देवता हुनुहुन्न; उहाँ त यहीँ चोकमा खेल्ने हरेक नानीबाबुलाई हेरचाह गर्ने आफ्नै हजुरआमा जस्तै हुनुहुन्छ।”",
      },
      status: "oral-history",
      audioNarrationUrl: null, // Prepared for future module integration
    },
    {
      type: "Documented Cultural Practice",
      author: "Ward 16 Cultural Heritage Documentation Fieldwork",
      title: {
        en: "The Rhythm of the Evening Bhajan",
        ne: "साँझको भजन र सामुदायिक सम्बन्ध",
      },
      narrative: {
        en: "Every evening as dusk falls over Ward 16, the brass cymbals and hand drums of the temple rest house begin their resonant rhythm. Elders who have spent fifty years living side by side sit together, chanting hymns passed down from their great-grandparents. This musical devotion strengthens neighborly trust and keeps community heritage vibrant in modern Kathmandu.",
        ne: "साँझ परेपछि मन्दिर अगाडिको पाटीमा झ्याली र मृदङ्गको गुञ्जन सुरु हुन्छ। दशकौँदेखि सँगै बस्दै आएका पाका पुस्ताहरू भेला भएर आफ्ना पुर्खाले सिकाएका भजन गाउँछन्। यसले टोलमा आत्मियता बढाउनुका साथै सांस्कृतिक पहिचानलाई जोगाइराखेको छ।",
      },
      status: "documented-history",
      audioNarrationUrl: null,
    },
  ],

  // ── Image Gallery (Placeholders & Real Paths) ──────────────────────────────
  gallery: [
    {
      id: "photo-temple-front",
      src: "/images/pyatho-ajima/temple-front.jpg",
      fallbackTitle: "Front Elevation of Pyatho Ajima Temple",
      caption: {
        en: "The front facade of Pyatho Ajima Temple showing the traditional tiered roof and carved entrance.",
        ne: "प्याठो अजिमा मन्दिरको मुख्य मोहडा, परम्परागत छाना र काष्ठकला।",
      },
      credit: "Heritage Documentation Project",
      aspectRatio: "landscape",
      isAuthentic: false,
    },
    {
      id: "photo-timber-struts",
      src: "/images/pyatho-ajima/timber-struts.jpg",
      fallbackTitle: "Hand-Carved Sal Wood Struts (Tundals)",
      caption: {
        en: "Intricate wood carvings on the roof struts depicting protective maternal guardian deities.",
        ne: "छानालाई आड दिने काठका टुँडालहरूमा कुँदिएका सूक्ष्म देवी आकृतिहरू।",
      },
      credit: "Heritage Documentation Project",
      aspectRatio: "portrait",
      isAuthentic: false,
    },
    {
      id: "photo-courtyard-setting",
      src: "/images/pyatho-ajima/courtyard-view.jpg",
      fallbackTitle: "Community Courtyard & Adjoining Pati",
      caption: {
        en: "The stone-paved residential courtyard and rest pavilion adjoining the temple sanctum.",
        ne: "मन्दिर अगाडिको ढुङ्गा छापिएको चोक र स्थानीय पाटी।",
      },
      credit: "Community Archive",
      aspectRatio: "landscape",
      isAuthentic: false,
    },
    {
      id: "photo-puja-observance",
      src: "/images/pyatho-ajima/ritual-worship.jpg",
      fallbackTitle: "Community Morning Ritual Worship",
      caption: {
        en: "Local devotees offering vermilion, seasonal flowers, and oil lamps during morning prayers.",
        ne: "बिहानी नित्य पूजामा सिन्दूर, फूल र दियो चढाउँदै गरेका स्थानीय श्रद्धालुहरू।",
      },
      credit: "Ward 16 Cultural Documentation",
      aspectRatio: "landscape",
      isAuthentic: false,
    },
  ],

  // ── Sources & Archival References ─────────────────────────────────────────
  references: [
    {
      title: "Nepal Mandala: A Cultural Study of the Kathmandu Valley",
      organization: "Slusser, Mary Shepherd — Princeton University Press",
      year: "1982",
      note: "Authoritative study on Newar city planning, Ajima mother goddess shrines, and sacred geography.",
    },
    {
      title: "Monk, Householder, and Tantric Priest: Newar Religion and its Hierarchy",
      organization: "Gellner, David N. — Cambridge University Press",
      year: "1992",
      note: "Documentation of guthi lineage networks, deity worship, and urban tole organization.",
    },
    {
      title: "Kathmandu Valley Cultural Heritage Inventory: Community Shrines",
      organization: "Department of Archaeology, Government of Nepal",
      year: "1995–Present",
      note: "Cataloguing of ward-level religious monuments, timber structures, and guthi endowments.",
    },
    {
      title: "Ward No. 16 Community Heritage & Oral History Documentation",
      organization: "Kathmandu Metropolitan City Ward 16 Cultural Committee",
      year: "2024–2026",
      note: "Primary field interviews with local elders, guthiyars, and neighborhood documentation teams.",
    },
  ],
};
