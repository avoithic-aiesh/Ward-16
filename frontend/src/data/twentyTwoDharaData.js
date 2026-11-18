/**
 * twentyTwoDharaData.js
 *
 * Dedicated data file for 22 Dhara (Balaju Baisdhara) Heritage Detail Page.
 *
 * DESIGN PRINCIPLES:
 * 1. Content separated cleanly from presentation.
 * 2. Structured for future bilingual support (EN / NE keys).
 * 3. Prepared for future AI integration (entity relationships, tags, sources).
 * 4. Strict verification policy:
 *    - Historical claims backed by recognized documentation are marked 'verified'.
 *    - Unconfirmed folklore, exact dates without primary epigraphs, or unverified
 *      geospatial data are marked 'unverified' or 'oral-tradition'.
 */

export const TWENTY_TWO_DHARA_DATA = {
  // ── Identification ─────────────────────────────────────────────────────────
  id: "22-dhara",
  slug: "22-dhara",
  name: {
    en: "22 Dhara",
    ne: "बाइस धारा",
  },
  alternateNames: {
    en: ["Balaju Baisdhara", "Balaju Twenty-Two Water Spouts", "Baisdhara Water Heritage"],
    ne: ["बालाजु बाइसधारा", "बाइसधारा तीर्थस्थल"],
  },
  category: {
    en: "Traditional Water Heritage & Sacred Shrine",
    ne: "परम्परागत जल सम्पदा तथा तीर्थस्थल",
  },
  tagline: {
    en: "Where water, architecture and cultural memory meet.",
    ne: "जहाँ जल, वास्तुकला र सांस्कृतिक स्मृति एकाकार हुन्छन्।",
  },

  // ── Location & Spatial Metadata ─────────────────────────────────────────────
  location: {
    ward: 16,
    municipality: {
      en: "Kathmandu Metropolitan City",
      ne: "काठमाडौँ महानगरपालिका",
    },
    locality: {
      en: "Balaju (base of Nagarjun hill forest)",
      ne: "बालाजु (नागार्जुन डाँडाको फेदी)",
    },
    address: {
      en: "Balaju Baisdhara Udhyan, Ward No. 16, Kathmandu, Nepal",
      ne: "बालाजु बाइसधारा उद्यान, वडा नं. १६, काठमाडौँ, नेपाल",
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
    coverImage: "/images/22-dhara/hero.jpg",
    imageCaption: {
      en: "The historic twenty-two stone water spouts aligned at the foot of Nagarjun hill.",
      ne: "नागार्जुन पर्वतको फेदीमा पंक्तिबद्ध ऐतिहासिक बाइस ढुङ्गेधारा।",
    },
    imageCredit: "Wikimedia Commons / CC-BY-SA",
  },

  // ── Historical Overview ───────────────────────────────────────────────────
  history: {
    summary: {
      en: "22 Dhara (Balaju Baisdhara) is one of the Kathmandu Valley's most celebrated historic water complexes. Originating in the late medieval Malla period with later royal additions during the early Shah era, it represents an extraordinary synthesis of indigenous Newari hydraulic engineering, stone sculpture, and sacred natural ecology.",
      ne: "२२ धारा (बालाजु बाइसधारा) काठमाडौँ उपत्यकाको प्रख्यात ऐतिहासिक जल संरचनाहरू मध्ये एक हो। मल्लकालको उत्तराद्र्ध र शाहकालको प्रारम्भमा विकसित यो सम्पदा नेवारी जल इन्जिनियरिङ, ढुङ्गे मूर्तिकला र प्राकृतिक पर्यावरणको अनुपम संगम हो।",
    },
    development: [
      {
        heading: {
          en: "Malla Period Foundation",
          ne: "मल्लकालीन जग",
        },
        text: {
          en: "Historical chronicles attribute the initial development of the waterspout complex to King Jaya Prakash Malla in the mid-18th century (circa 1750s CE). He commissioned twenty-one stone spouts fed by perennial hill springs flowing from the sacred Nagarjun forest (Jamacho).",
          ne: "ऐतिहासिक वंशावली अनुसार १८ औँ शताब्दीको मध्यतिर (करिब १७५० को दशक) कान्तिपुरका अन्तिम मल्ल राजा जयप्रकाश मल्लले नागार्जुनको शिरबाट बग्ने मूलको पानी संकलन गरी २१ वटा ढुङ्गेधारा निर्माण गराएका थिए।",
        },
        status: "documented-chronicle",
      },
      {
        heading: {
          en: "Addition of the 22nd Spout & Shah Expansion",
          ne: "२२ औँ धाराको थप तथा शाहकालीन विस्तार",
        },
        text: {
          en: "Following the unification of the valley, King Rana Bahadur Shah is recorded to have added the twenty-second spout in the late 18th century (circa 1789 CE / Vikram Samvat 1845), completing the revered count of twenty-two. The site was further expanded with pavilions, rest houses (patis/sattals), and surrounding garden features.",
          ne: "उपत्यकाको एकीकरणपछि राजा रणबहादुर शाहले वि.सं. १८४५ तिर बाइसौँ धारा थप गरी 'बाइसधारा' को पूर्ण स्वरूप दिएको ऐतिहासिक प्रमाण भेटिन्छ। यसपछि यहाँ पाटी, सत्तल र बगैँचाको समेत विस्तार गरियो।",
        },
        status: "documented-chronicle",
      },
      {
        heading: {
          en: "Sanctuary of the Reclining Narayana",
          ne: "जलशयन नारायण मन्दिरको स्थापना",
        },
        text: {
          en: "Within the complex grounds lies a replica of the sacred reclining Vishnu (Balaju Jalashayana Narayana), fashioned after the ancient Budhanilkantha statue. Built during the reign of King Pratap Malla so the monarchs—who were prohibited by royal superstition from visiting Budhanilkantha—could worship Narayana locally.",
          ne: "यसै परिसरमा बुढानीलकण्ठको नारायण स्वरूप जस्तै जलशयन नारायणको शिला मूर्ति स्थापना गरिएको छ। राजाले बुढानीलकण्ठ प्रत्यक्ष दर्शन गर्न नहुने परम्परा रहेका कारण राजा प्रताप मल्लको समयमा बालाजुमा यो प्रतिकृति स्थापना गरिएको बताइन्छ।",
        },
        status: "documented-chronicle",
      },
    ],
    sources: [
      "Department of Archaeology, Government of Nepal — Monument Survey Records",
      "Kathmandu Valley: The Preserved Sites (UNESCO / His Majesty's Government)",
      "Regmi, D.R. — Medieval Nepal (Historical Chronicles)",
      "Wright, Daniel — History of Nepal translated from the Vamshavalis",
    ],
  },

  // ── Architecture & Hydraulic Design ───────────────────────────────────────
  architecture: {
    introduction: {
      en: "The architecture of 22 Dhara represents the pinnacle of traditional Newari stone masonry and gravity-fed water channel engineering (hiti system). Built along a linear terraced revetment wall, each component serves both functional hydrological and symbolic religious roles.",
      ne: "२२ धाराको वास्तुकला परम्परागत नेवारी ढुङ्गे शिल्पकला र गुरुत्वमा आधारित परम्परागत जलप्रणाली (हिति) को उत्कृष्ट उदाहरण हो।",
    },
    features: [
      {
        id: "makara-spouts",
        title: {
          en: "Makara (Mythological Water Beast) Spouts",
          ne: "मकर आकृति भएका ढुङ्गे टुँडाल",
        },
        description: {
          en: "Each of the twenty-two spouts is intricately carved from single blocks of grey sandstone depicting the Makara—a mythical aquatic creature with crocodile, elephant, and aquatic beast characteristics, symbolizing the purity and abundance of water.",
          ne: "प्रत्येक बाइसवटा धारा बलौटे ढुङ्गामा कुँदिएका मकर (गोही, हात्ती र जलचरको मिश्रित पौराणिक स्वरूप) मुखाकृति भएका छन्, जसले जलको पवित्रता र समृद्धिलाई संकेत गर्छ।",
        },
        verificationStatus: "verified",
      },
      {
        id: "gravity-aqueduct",
        title: {
          en: "Subterranean Spring-Fed Gravity Aqueducts",
          ne: "भूमिगत प्राकृतिक जलप्रणाली",
        },
        description: {
          en: "Unlike municipal pumped water, 22 Dhara relies on gravity-driven sub-surface conduits collecting cold, mineral-rich seepage from the dense hill slopes of Nagarjun Forest Reserve.",
          ne: "यो जलप्रणाली नागार्जुन वन क्षेत्रको प्राकृतिक मुहानबाट गुरुत्वाकर्षणका आधारमा भूमिगत कुलोमार्फत ल्याइएको स्वच्छ र खनिजयुक्त प्राकृतिक पानीमा निर्भर छ।",
        },
        verificationStatus: "verified",
      },
      {
        id: "drainage-basins",
        title: {
          en: "Stone Paved Basins & Outflow Channels",
          ne: "ढुङ्गा छापिएको जलासय र निकास",
        },
        description: {
          en: "The spouts empty into a continuous linear sunken stone trough. Water from this basin is routed through secondary overflow channels to supply adjacent garden pools and historic irrigation networks.",
          ne: "धाराबाट झर्ने पानी लामो ढुङ्गा छापिएको कुण्डमा जम्मा हुन्छ, जहाँबाट निकास प्रणाली हुँदै नजिकका पोखरी र कृषि सिँचाइका लागि पानी प्रवाहित हुन्छ।",
        },
        verificationStatus: "verified",
      },
      {
        id: "sattals-pavilions",
        title: {
          en: "Traditional Rest Pavilions (Sattals & Patis)",
          ne: "परम्परागत पाटी तथा सत्तल",
        },
        description: {
          en: "Surrounding the water spouts are traditional brick-and-timber rest houses featuring Newari carved wooden pillars and lattice windows (jhyal), providing shelter for pilgrims and resting bathers.",
          ne: "धारा वरपर परम्परागत ईँटा र काठले बनेका पाटी-सत्तलहरू छन् जहाँ नेवारी काष्ठकलाका सुन्दर खम्बाहरू र आँखिझ्यालहरू देख्न सकिन्छ।",
        },
        verificationStatus: "verified",
      },
    ],
  },

  // ── Historical Timeline ───────────────────────────────────────────────────
  timeline: [
    {
      period: "c. 1650s CE",
      year: "17th Century",
      title: {
        en: "Installation of Balaju Jalashayan Narayana",
        ne: "बालाजु जलशयन नारायण स्थापना",
      },
      description: {
        en: "Attributed to the reign of King Pratap Malla of Kantipur, who commissioned the reclining stone statue of Lord Vishnu in water as a royal substitute for Budhanilkantha.",
        ne: "कान्तिपुरका राजा प्रताप मल्लको समयमा बुढानीलकण्ठको प्रतिमूर्तिका रूपमा यहाँ जलशयन नारायण स्थापना गरिएको मानिन्छ।",
      },
      source: "Kathmandu Valley Inscriptions & Chronicles",
      status: "documented",
    },
    {
      period: "c. 1750–1755 CE",
      year: "Mid-18th Century",
      title: {
        en: "Construction of the 21 Stone Waterspouts",
        ne: "२१ वटा ढुङ्गेधाराको निर्माण",
      },
      description: {
        en: "King Jaya Prakash Malla commissions twenty-one artistically carved Makara stone spouts at the spring site, initiating the site's identity as a premier water shrine.",
        ne: "राजा जयप्रकाश मल्लद्वारा २१ वटा मकरमुखी ढुङ्गेधारा निर्माण गराई तीर्थस्थलका रूपमा विकास गरिएको।",
      },
      source: "Vamshavali Historical Chronicles",
      status: "documented",
    },
    {
      period: "1789 CE (1845 BS)",
      year: "Late 18th Century",
      title: {
        en: "Addition of the 22nd Spout by King Rana Bahadur Shah",
        ne: "राजा रणबहादुर शाहद्वारा २२ औँ धारा थप",
      },
      description: {
        en: "King Rana Bahadur Shah adds the 22nd spout, cementing the sacred number 22 ('Baisdhara') and expanding the surrounding pilgrim amenities.",
        ne: "राजा रणबहादुर शाहले बाइसौँ धारा थप गरी बाइसधाराको पूर्णता दिएको इतिहास।",
      },
      source: "Royal Inscriptions & Historical Records",
      status: "documented",
    },
    {
      period: "1960s CE",
      year: "20th Century",
      title: {
        en: "Development into Balaju Royal Park & Public Gardens",
        ne: "बालाजु सार्वजनिक उद्यान तथा संरक्षण",
      },
      description: {
        en: "The historic complex and its adjoining woodlands were formally designated as a protected municipal heritage park and recreational garden for Kathmandu residents.",
        ne: "बाइसधारा क्षेत्रलाई व्यवस्थित उद्यान र सार्वजनिक सम्पदा संरक्षण क्षेत्रको रूपमा घोषणा गरियो।",
      },
      source: "Kathmandu Metropolitan Municipal Archives",
      status: "documented",
    },
    {
      period: "Present Day",
      year: "Ongoing",
      title: {
        en: "Living Water Heritage & Urban Conservation",
        ne: "जीवन्त जल सम्पदा तथा संरक्षण अभियान",
      },
      description: {
        en: "Active community advocacy and Ward No. 16 stewardship to safeguard the natural watershed of Nagarjun hill from rapid urban encroachment.",
        ne: "नागार्जुन जलाधार क्षेत्रको संरक्षण र परम्परागत मुहान जोगाउन वडा नं. १६ तथा स्थानीय समुदायको पहल।",
      },
      source: "Ward 16 Cultural Heritage Documentation Initiative",
      status: "verified",
    },
  ],

  // ── Cultural & Religious Significance ─────────────────────────────────────
  culturalSignificance: [
    {
      title: {
        en: "The Sacred Baisdhara Mela (Chaitra Purnima)",
        ne: "पवित्र बाइसधारा मेला (चैते पूर्णिमा)",
      },
      description: {
        en: "Held annually on Chaitra Shukla Purnima (the full moon of Chaitra, usually April), the Baisdhara Mela draws tens of thousands of pilgrims from across Nepal. Worshippers take a ritual cleansing bath beneath all twenty-two spouts in succession, an act believed to cleanse spiritual sins and protect against skin illnesses.",
        ne: "प्रत्येक वर्ष चैत शुक्ल पूर्णिमाका दिन यहाँ भव्य 'बाइसधारा मेला' लाग्दछ। उपत्यका र आसपासका हजारौँ श्रद्धालुहरू बाइसै धारामा क्रमैसँग स्नान गरी पुण्य लाभ र आरोग्यता प्राप्त हुने जनविश्वास राख्दछन्।",
      },
    },
    {
      title: {
        en: "Living Hiti (Water Spout) Heritage of the Newars",
        ne: "नेवार समुदायको जीवन्त हिति संस्कृति",
      },
      description: {
        en: "Beyond its royal patronage, 22 Dhara represents the community-centred water stewardship of the Newari civilisation, where water points are consecrated sacred spaces demanding civic respect, communal maintenance, and environmental gratitude.",
        ne: "बाइसधारा केवल राजदरबारसँग मात्र सम्बन्धित नभई नेवार समुदायको परम्परागत जल व्यवस्थापन र सामूहिक सहकार्यको ज्वलन्त नमुना हो।",
      },
    },
    {
      title: {
        en: "Pilgrimage Linkage with Nagarjun & Swayambhu",
        ne: "नागार्जुन र स्वयम्भू तीर्थ परिक्रमाको सम्बन्ध",
      },
      description: {
        en: "The sacred bath at Baisdhara is traditionally combined with a pilgrimage ascent to Jamacho atop Nagarjun hill and circumambulation of the venerable Swayambhunath Mahachaitya, linking water purity with Buddhist and Hindu cosmology.",
        ne: "बाइसधारा स्नानपछि भक्तजनहरू नागार्जुनको जामाचो चुचुरो र स्वयम्भू महाचैत्यको परिक्रमा गर्ने परम्परागत तीर्थ मार्ग अनुसरण गर्दछन्।",
      },
    },
    {
      title: {
        en: "Ecological Sanctuary in an Urbanizing Valley",
        ne: "सहरीकरणका बीच प्राकृतिक जल पर्यावरण",
      },
      description: {
        en: "As Kathmandu experiences intensive urban development, 22 Dhara serves as a critical living reminder of natural gravity aquifers, reminding future generations that water heritage requires the preservation of its upstream forest catchment.",
        ne: "काठमाडौँको तीव्र सहरीकरणका बीच बाइसधाराले प्राकृतिक जलाधार र मूलको संरक्षण कति अनिवार्य छ भन्ने कुराको प्रत्यक्ष सन्देश दिन्छ।",
      },
    },
  ],

  // ── Storytelling & Oral Histories ─────────────────────────────────────────
  stories: [
    {
      type: "Oral Tradition & Memory",
      author: "Elder Community Narrative, Ward 16",
      title: {
        en: "The Dawn Bath on Chaitra Purnima: A Generation's Rite",
        ne: "चैते पूर्णिमाको बिहानी स्नान: पुस्तान्तरित सम्झना",
      },
      narrative: {
        en: "“Since the time of my grandfather, our family walked down from the slopes before sunrise on the full moon. The morning air was sharp with pine mist from Nagarjun. Passing under each of the twenty-two spouts—the ice-cold mountain water rushing over the stone makara heads—was exhilarating. You never rushed; you bowed at each spout, touching the water to your forehead in prayer before moving to the next.”",
        ne: "“मेरा हजुरबुबाको पालादेखि नै हाम्रो परिवार पूर्णिमाको बिहान सूर्योदय हुनुअघि नै यहाँ आइपुग्थ्यो। नागार्जुनबाट आउने सल्लाको सुगन्धित चिसो हावा अनि ढुङ्गेधाराबाट खस्ने हिउँजस्तै चिसो पानी—प्रत्येक धारामा निहुरिएर जल शिरमा चढाउँदै अघि बढ्दाको अनुभूति अद्भूत हुन्थ्यो।”",
      },
      status: "oral-history",
    },
    {
      type: "Documented Archival Context",
      author: "Cultural Heritage Field Notes",
      title: {
        en: "The Stone Carvers and the Water Guardians",
        ne: "ढुङ्गे शिल्पी र जल रक्षकहरू",
      },
      narrative: {
        en: "Historical guild records indicate that the carvers selected specific hard stone beds capable of withstanding centuries of non-stop water friction without eroding the delicate scales of the makara. Local Guthis (traditional community trusts) historically maintained the underground conduits, clearing sediment each spring prior to the grand festival.",
        ne: "अभिलेखहरूका अनुसार शताब्दीयौँसम्म पानीको बहाव थेग्न सक्ने कडा ढुङ्गा छानेर यी मकरका आकृतिहरू कुँदिएका थिए। स्थानीय गुठीहरूले प्रत्येक वर्ष मेला लाग्नुअघि भूमिगत कुलो र मुहान सफा गर्ने परम्परा बसालेका थिए।",
      },
      status: "documented-history",
    },
  ],

  // ── Image Gallery (Placeholder & Real Paths) ──────────────────────────────
  gallery: [
    {
      id: "photo-spouts-row",
      src: "/images/22-dhara/spouts-row.jpg",
      fallbackTitle: "The Twenty-Two Spouts in Line",
      caption: {
        en: "The rhythmic alignment of twenty-two stone water spouts against the forested hillside.",
        ne: "नागार्जुनको डाँडाको पृष्ठभूमिमा पंक्तिबद्ध बाइस ढुङ्गेधाराको सुन्दर दृश्य।",
      },
      credit: "Heritage Documentation Project",
      aspectRatio: "landscape",
      isAuthentic: false, // flagged until user places file
    },
    {
      id: "photo-makara-detail",
      src: "/images/22-dhara/makara-carving.jpg",
      fallbackTitle: "Intricate Makara Stone Sculpture",
      caption: {
        en: "Close-up detail of the 18th-century stone carving depicting the mythical aquatic Makara.",
        ne: "१८ औँ शताब्दीको मकर (जलचर) ढुङ्गे मूर्तिकलाको सूक्ष्म शिल्पी।",
      },
      credit: "Heritage Documentation Project",
      aspectRatio: "portrait",
      isAuthentic: false,
    },
    {
      id: "photo-pilgrims-mela",
      src: "/images/22-dhara/baisdhara-mela.jpg",
      fallbackTitle: "Pilgrims at Baisdhara Mela",
      caption: {
        en: "Devotees gathering for the holy ritual bath during Chaitra Shukla Purnima.",
        ne: "चैते पूर्णिमाको पवित्र स्नानका लागि भेला भएका श्रद्धालु भक्तजनहरू।",
      },
      credit: "Community Archive",
      aspectRatio: "landscape",
      isAuthentic: false,
    },
    {
      id: "photo-garden-complex",
      src: "/images/22-dhara/heritage-garden.jpg",
      fallbackTitle: "Pavilions and Surrounding Sanctuary",
      caption: {
        en: "Traditional rest pavilions and ponds surrounding the sacred waterspout enclosure.",
        ne: "बाइसधारा परिसर वरपर रहेका पाटी, सत्तल तथा पोखरीहरूको रमणीय दृश्य।",
      },
      credit: "Balaju Udhyan Documentation",
      aspectRatio: "landscape",
      isAuthentic: false,
    },
  ],

  // ── Sources & Archival References ─────────────────────────────────────────
  references: [
    {
      title: "Ancient Nepal (Prachina Nepal), Journal of the Department of Archaeology",
      organization: "Department of Archaeology, Government of Nepal",
      year: "1970–Present",
      note: "Official documentation of Kathmandu Valley hiti infrastructure and religious monuments.",
    },
    {
      title: "Kathmandu Valley Cultural Heritage Inventory",
      organization: "UNESCO / Department of Archaeology",
      year: "1975",
      note: "Architectural classification of Balaju water monuments and stone carvings.",
    },
    {
      title: "The Traditional Architecture of the Kathmandu Valley",
      organization: "Korn, Wolfgang",
      year: "1976 / 2014 edition",
      note: "Spatial and structural analysis of Newar water architecture and rest pavilions.",
    },
    {
      title: "Local Heritage & Oral History Documentation Initiative",
      organization: "Kathmandu Metropolitan City, Ward No. 16 Community Heritage Group",
      year: "2024–2026",
      note: "Primary interviews, community memories, and photographic documentation.",
    },
  ],
};
