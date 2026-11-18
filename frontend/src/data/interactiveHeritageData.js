/**
 * interactiveHeritageData.js
 *
 * Single source of truth for all Module 6 Interactive Heritage Experiences:
 * 1. Image Hotspots (clickable architectural elements)
 * 2. Then-and-Now Comparison Sliders
 * 3. Audio Narration Transcripts and metadata
 * 4. Heritage Quizzes (verified questions, options, explanations)
 * 5. 360-Degree Virtual Tour scenes and panorama hotspots
 *
 * All data structured for future bilingual integration (EN / NE).
 */

export const INTERACTIVE_DATA = {
  // =========================================================================
  // 1. 22 DHARA (BALAJU BAISDHARA)
  // =========================================================================
  "22-dhara": {
    // ── 1. Image Hotspots ──────────────────────────────────────────────────
    hotspots: {
      title: {
        en: "Architectural & Hydraulic Hotspots",
        ne: "वास्तुकला तथा जलप्रणालीका मुख्य अङ्गहरू",
      },
      subtitle: {
        en: "Click any numbered marker on the architectural diagram below to explore its craftsmanship, engineering and cultural role.",
        ne: "वास्तुकला, इन्जिनियरिङ र सांस्कृतिक महत्त्व बुझ्न तलका नम्बरहरूमा क्लिक गर्नुहोस्।",
      },
      image: {
        src: "/images/22-dhara/architecture-overview.jpg",
        alt: "22 Dhara architectural and hydraulic layout",
        fallbackTitle: "22 Dhara Stone Spouts & Aqueduct Elevation",
        isAuthentic: false,
      },
      items: [
        {
          id: "spout-makara",
          x: 28, // Percentage from left
          y: 46, // Percentage from top
          number: "01",
          title: {
            en: "Carved Stone Makara Spout",
            ne: "मकर आकृति भएको ढुङ्गेधारा",
          },
          element: {
            en: "Architectural Feature: Carved Spout (Hiti-Manga)",
            ne: "वास्तुकला: कुँदिएको ढुङ्गे टुँडाल (हितिमङ्ग)",
          },
          description: {
            en: "Each of the twenty-two spouts is carved from dense grey sandstone depicting the Makara, a composite mythological water creature combining the snout of a crocodile, trunk of an elephant, and tail of a fish.",
            ne: "प्रत्येक बाइसवटा ढुङ्गेधारा बलौटे ढुङ्गाबाट कुँदिएका छन्। मकरको मुखाकृतिले जलको पवित्रता र निरन्तर प्रवाहलाई संकेत गर्दछ।",
          },
          significance: {
            en: "In Hindu and Buddhist iconography, the Makara is the vehicle of Varuna (god of water) and Ganga (river goddess), blessing the mountain spring water as sacred nectar.",
            ne: "हिन्दू तथा बौद्ध परम्परामा मकरलाई वरुण र गङ्गाको वाहन मानिन्छ, जसले यहाँको पानीलाई पवित्र जलको रूपमा शुद्ध गर्छ।",
          },
          reference: "Department of Archaeology, Government of Nepal — Stone Monument Survey Records",
        },
        {
          id: "aqueduct-inlet",
          x: 52,
          y: 20,
          number: "02",
          title: {
            en: "Subterranean Mountain Aqueduct",
            ne: "भूमिगत प्राकृतिक जलप्रणाली",
          },
          element: {
            en: "Hydraulic Engineering: Gravity Conduit",
            ne: "जल इन्जिनियरिङ: गुरुत्व कुलो",
          },
          description: {
            en: "Natural subterranean clay conduits channel perennial seepage from the high aquifers of Nagarjun hill (Jamacho) directly into the distribution chambers behind the revetment wall without mechanical pumps.",
            ne: "नागार्जुन पर्वतको शिरबाट आउने प्राकृतिक मुहानको पानीलाई कुनै मेसिन बिना नै गुरुत्वाकर्षणका आधारमा भूमिगत माटोको कुलोमार्फत यहाँ ल्याइएको छ।",
          },
          significance: {
            en: "Represents indigenous Malla-era hydrological understanding of geological pressure balances, delivering mineral-rich water at stable temperatures year-round.",
            ne: "मल्लकालीन इन्जिनियरिङको यो उत्कृष्ट नमुनाले वर्षैभरि स्थिर तापक्रममा खनिजयुक्त स्वच्छ पानी उपलब्ध गराउँछ।",
          },
          reference: "UNESCO Kathmandu Valley Cultural Heritage Inventory: Water Systems",
        },
        {
          id: "drainage-basin",
          x: 48,
          y: 78,
          number: "03",
          title: {
            en: "Sunken Stone Paved Basin (Hiti-Gah)",
            ne: "ढुङ्गा छापिएको जल कुण्ड (हितिगः)",
          },
          element: {
            en: "Spatial Design: Drainage & Sedimentation Trough",
            ne: "वास्तुकला: निकास तथा स्नान कुण्ड",
          },
          description: {
            en: "A continuous, linear sunken stone pavement allows thousands of bathers to stand comfortably beneath the cascading water while secondary channels continuously flush spent water outward.",
            ne: "लामो ढुङ्गे कुण्डले एकैपटक हजारौँ श्रद्धालुहरूलाई स्नान गर्न सहज बनाउँछ र बगेको पानीलाई निरन्तर बाहिर निकास गर्छ।",
          },
          significance: {
            en: "Designed for public sanitation and ritual cleanliness: running water prevents standing contamination and flows directly to nourish adjacent agricultural plots and park gardens.",
            ne: "पानी नजम्ने र निरन्तर बगिरहने गरी बनाइएको यो संरचनाले सरसफाइ र सार्वजनिक स्वास्थ्यलाई ध्यानमा राखेको छ।",
          },
          reference: "Korn, Wolfgang — The Traditional Architecture of the Kathmandu Valley",
        },
        {
          id: "rest-pavilion",
          x: 82,
          y: 34,
          number: "04",
          title: {
            en: "Pilgrim Rest Pavilion (Sattal)",
            ne: "परम्परागत सत्तल तथा विश्रामस्थल",
          },
          element: {
            en: "Vernacular Architecture: Timber & Brick Sattal",
            ne: "काष्ठकला तथा ईँटाले बनेको पाटी",
          },
          description: {
            en: "Tiered brick-and-timber rest houses with traditional Newari lattice windows (jhyal) and open colonnades provide shelter for pilgrims and festival participants.",
            ne: "नेवारी काष्ठकलाका सुन्दर आँखिझ्याल र खम्बाहरू भएका यी पाटी-सत्तलहरू मेलामा आउने तीर्थालुहरूका लागि विश्रामस्थल हुन्।",
          },
          significance: {
            en: "Civic community infrastructure that transforms the physical water source into a social living room for intergenerational dialogue and festival congregation.",
            ne: "तीर्थस्थललाई सामाजिक जमघट र सांस्कृतिक विमर्शको केन्द्र बनाउन यस्ता सत्तलहरूले महत्त्वपूर्ण भूमिका खेलेका छन्।",
          },
          reference: "Kathmandu Metropolitan Municipal Archives: Ward 16 Monument Register",
        },
      ],
    },

    // ── 2. Then-and-Now Slider ─────────────────────────────────────────────
    comparison: {
      title: {
        en: "Then & Now: Architectural Continuity",
        ne: "विगत र वर्तमान: बाइसधाराको निरन्तरता",
      },
      subtitle: {
        en: "Drag the divider to compare the historic mid-20th century layout with contemporary preservation in Ward 16.",
        ne: "विगतको स्वरूप र वर्तमान संरक्षण अवस्था तुलना गर्न बीचको रेखालाई दायाँ-बायाँ सार्नुहोस्।",
      },
      before: {
        label: "Historic Archive (c. 1960s)",
        date: "c. 1960s CE",
        source: "Department of Archaeology Archive",
        src: "/images/22-dhara/comparison-historic.jpg",
        caption: {
          en: "Balaju waterspouts following royal garden restoration in the 1960s.",
          ne: "वि.सं. २०२२ तिर बालाजु उद्यान विस्तारपछिको ऐतिहासिक तस्बिर।",
        },
        isAuthentic: false,
      },
      after: {
        label: "Present Day Stewardship",
        date: "Contemporary Archive",
        source: "Ward 16 Heritage Documentation Project",
        src: "/images/22-dhara/comparison-contemporary.jpg",
        caption: {
          en: "The living waterspouts maintained as an active cultural sanctuary by Ward 16 and local caretakers.",
          ne: "वडा नं. १६ र स्थानीय समुदायद्वारा संरक्षित वर्तमान बाइसधारा परिसर।",
        },
        isAuthentic: false,
      },
      historicalNotes: {
        en: "While the forested background of Nagarjun hill remains intact, urban development in the outer perimeter has heightened the importance of protecting the underground spring recharge zone.",
        ne: "नागार्जुनको वनक्षेत्र जोगाइए तापनि आसपासको तीव्र सहरीकरणका कारण पानीको मूल रिचार्ज हुने क्षेत्रको संरक्षण अझ संवेदनशील बनेको छ।",
      },
    },

    // ── 3. Audio Narration ─────────────────────────────────────────────────
    audio: {
      title: {
        en: "The Living Springs of Balaju",
        ne: "बालाजुको जीवन्त जल सम्पदा",
      },
      subtitle: {
        en: "A spoken audio tour detailing the engineering, royal history and annual Baisdhara Mela.",
        ne: "बाइसधाराको इतिहास, प्रविधि र चैते पूर्णिमा मेलाको मौखिक वृत्तान्त।",
      },
      duration: "03:15",
      durationSeconds: 195,
      audioSrc: "/audio/22-dhara-narration.mp3",
      speaker: {
        en: "Ward 16 Cultural Heritage Documentation Initiative",
        ne: "वडा नं. १६ सांस्कृतिक सम्पदा संरक्षण समिति",
      },
      transcript: {
        en: "Welcome to 22 Dhara, also known throughout Nepal as Balaju Baisdhara. Standing before these stone spouts, you are witnessing nearly three centuries of living water heritage.\n\nIn the mid-eighteenth century, King Jaya Prakash Malla brought water from the high forest springs of Nagarjun hill through underground clay pipes to feed twenty-one sculpted spouts. A few decades later, King Rana Bahadur Shah added the twenty-second spout, completing the sacred count of twenty-two.\n\nEvery year on the full moon of Chaitra, thousands of pilgrims descend here at dawn to bathe under each spout in succession. Listen carefully to the steady murmur of the water: it has never stopped flowing, reminding us that Kathmandu's true wealth lies in the harmony between human craftsmanship and sacred natural aquifers.",
        ne: "२२ धारा अर्थात् बालाजु बाइसधारामा यहाँलाई स्वागत छ। यी ढुङ्गेधारा अगाडि उभिँदा तपाईं झण्डै तीन शताब्दी पुरानो जीवन्त जल सभ्यताको प्रत्यक्ष साक्षी बन्नुहुन्छ।\n\n१८ औँ शताब्दीको मध्यतिर राजा जयप्रकाश मल्लले नागार्जुन डाँडाको शिरबाट भूमिगत माटोको कुलोमार्फत २१ वटा धारा निर्माण गराएका थिए। पछि राजा रणबहादुर शाहले बाइसौँ धारा थप गरी यसलाई पूर्णता दिए।\n\nहरेक वर्ष चैत शुक्ल पूर्णिमाको बिहानीमा हजारौँ भक्तजनहरू यहाँ बाइसै धारामा स्नान गर्न भेला हुन्छन्। यो पानीले हामीलाई सम्झाउँछ कि काठमाडौँको वास्तविक सम्पत्ति हाम्रा प्राकृतिक मुहान र पुर्खाको सीपमा छ।",
      },
      chapters: [
        { time: 0, title: "1. Introduction to Balaju Baisdhara" },
        { time: 55, title: "2. The Malla & Shah Royal Additions" },
        { time: 120, title: "3. The Chaitra Purnima Bathing Ritual" },
        { time: 165, title: "4. Protecting the Nagarjun Watershed" },
      ],
    },

    // ── 4. Heritage Quiz ───────────────────────────────────────────────────
    quiz: {
      title: {
        en: "Test Your Knowledge: 22 Dhara",
        ne: "ज्ञान परीक्षण: बाइसधारा सम्पदा",
      },
      description: {
        en: "Answer five questions grounded in verified historical chronicles and Newar architecture.",
        ne: "बाइसधाराको इतिहास र वास्तुकला सम्बन्धी ५ वटा प्रश्नहरूको सही उत्तर दिनुहोस्।",
      },
      questions: [
        {
          id: "q1",
          question: {
            en: "Which king originally commissioned the first twenty-one stone spouts in the mid-18th century?",
            ne: "१८ औँ शताब्दीको मध्यतिर सुरुमा २१ वटा ढुङ्गेधारा निर्माण गर्ने राजा को हुन्?",
          },
          options: [
            { id: "a", text: { en: "King Pratap Malla", ne: "राजा प्रताप मल्ल" } },
            { id: "b", text: { en: "King Jaya Prakash Malla", ne: "राजा जयप्रकाश मल्ल" } },
            { id: "c", text: { en: "King Prithvi Narayan Shah", ne: "राजा पृथ्वीनारायण शाह" } },
            { id: "d", text: { en: "King Bhupatindra Malla", ne: "राजा भूपतीन्द्र मल्ल" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Historical chronicles document that King Jaya Prakash Malla of Kantipur commissioned the original twenty-one water spouts around the 1750s CE.",
            ne: "ऐतिहासिक वंशावली अनुसार कान्तिपुरका राजा जयप्रकाश मल्लले वि.सं. १८१० को दशकमा सुरुमा २१ वटा धारा निर्माण गराएका थिए।",
          },
        },
        {
          id: "q2",
          question: {
            en: "Who added the twenty-second water spout to complete the revered count of 'Baisdhara'?",
            ne: "२२ औँ धारा थप गरी 'बाइसधारा' को पूर्ण स्वरूप दिने राजा को हुन्?",
          },
          options: [
            { id: "a", text: { en: "King Rana Bahadur Shah", ne: "राजा रणबहादुर शाह" } },
            { id: "b", text: { en: "King Tribhuvan", ne: "राजा त्रिभुवन" } },
            { id: "c", text: { en: "King Mahendra", ne: "राजा महेन्द्र" } },
            { id: "d", text: { en: "King Yaksha Malla", ne: "राजा यक्ष मल्ल" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "King Rana Bahadur Shah added the twenty-second spout in 1789 CE (1845 BS), cementing the historic name 'Baisdhara'.",
            ne: "राजा रणबहादुर शाहले वि.सं. १८४५ (सन् १७८९) मा बाइसौँ धारा थप गरी बाइसधारा बनाएका थिए।",
          },
        },
        {
          id: "q3",
          question: {
            en: "What mythical creature is sculpted on the stone spouts to symbolize water purity?",
            ne: "जलको पवित्रता दर्शाउन ढुङ्गेधारामा कुन पौराणिक जलचरको आकृति कुँदिएको छ?",
          },
          options: [
            { id: "a", text: { en: "Garuda", ne: "गरुड" } },
            { id: "b", text: { en: "Makara (Mythical Water Beast)", ne: "मकर" } },
            { id: "c", text: { en: "Airavata (Sacred Elephant)", ne: "ऐरावत हात्ती" } },
            { id: "d", text: { en: "Simha (Lion Guardian)", ne: "सिंह" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "The Makara—a mythical creature with crocodile and elephant features—is the sacred vehicle of water deities Ganga and Varuna in Hindu-Buddhist cosmology.",
            ne: "मकर जलकी देवी गङ्गा र वरुणको वाहन मानिने भएकाले ढुङ्गेधाराको मुखाकृतिमा मकर कुँद्ने प्राचीन परम्परा छ।",
          },
        },
        {
          id: "q4",
          question: {
            en: "During which annual festival do tens of thousands of pilgrims take a holy bath under all 22 spouts?",
            ne: "कुन पर्वका दिन हजारौँ भक्तजनहरूले बाइसै धारामा पवित्र स्नान गर्दछन्?",
          },
          options: [
            { id: "a", text: { en: "Indra Jatra", ne: "इन्द्रजात्रा" } },
            { id: "b", text: { en: "Baisdhara Mela (Chaitra Shukla Purnima)", ne: "बाइसधारा मेला (चैते पूर्णिमा)" } },
            { id: "c", text: { en: "Maha Shivaratri", ne: "महाशिवरात्रि" } },
            { id: "d", text: { en: "Janai Purnima", ne: "जनै पूर्णिमा" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Baisdhara Mela is held on Chaitra Shukla Purnima (the full moon of Chaitra, usually April), when devotees take a ritual cleansing bath believing it protects against skin illnesses and cleanses sins.",
            ne: "प्रत्येक वर्ष चैत शुक्ल पूर्णिमाको दिन लाग्ने बाइसधारा मेलामा स्नान गर्नाले छाला सम्बन्धी रोग निको हुने र पुण्य लाभ हुने जनविश्वास छ।",
          },
        },
        {
          id: "q5",
          question: {
            en: "From which natural forested hill does 22 Dhara derive its perennial mountain spring water?",
            ne: "बाइसधारामा आउने प्राकृतिक मूलको पानी कुन संरक्षित वन क्षेत्रबाट आउँछ?",
          },
          options: [
            { id: "a", text: { en: "Chandragiri Hill", ne: "चन्द्रागिरि डाँडा" } },
            { id: "b", text: { en: "Nagarjun Hill (Jamacho)", ne: "नागार्जुन पर्वत (जामाचो)" } },
            { id: "c", text: { en: "Phulchoki Hill", ne: "फूलचोकी डाँडा" } },
            { id: "d", text: { en: "Shivapuri Peak", ne: "शिवपुरी डाँडा" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "The water originates from the dense forest catchment of Nagarjun Hill (Jamacho), flowing naturally by gravity into the subterranean brick-and-clay conduits.",
            ne: "बाइसधाराको पानी नागार्जुन राष्ट्रिय निकुञ्ज (जामाचो) को प्राकृतिक जलाधारबाट भूमिगत कुलो हुँदै आउँछ।",
          },
        },
      ],
    },

    // ── 5. 360-Degree Virtual Tour ─────────────────────────────────────────
    virtualTour: {
      title: {
        en: "360° Virtual Panorama Exploration",
        ne: "३६०° भर्चुअल अवलोकन",
      },
      subtitle: {
        en: "Interact with panoramic scenes of the waterspout terrace and historic park grounds.",
        ne: "बाइसधारा परिसर र उद्यानको ३६० डिग्री भर्चुअल दृश्य अवलोकन गर्नुहोस्।",
      },
      scenes: [
        {
          id: "spouts-terrace",
          title: {
            en: "Waterspouts Promenade",
            ne: "बाइसधारा मुख्य स्नान स्थल",
          },
          description: {
            en: "Standing directly before the 22 stone spouts aligned beneath the forested hillside.",
            ne: "नागार्जुन डाँडाको फेदीमा पंक्तिबद्ध बाइस ढुङ्गेधारा अगाडिको दृश्य।",
          },
          panoramaUrl: "/images/22-dhara/360-spouts.jpg",
          isAuthentic: false,
          hotspots: [
            { yaw: -25, pitch: 0, text: "Makara Stone Spout 01" },
            { yaw: 0, pitch: -10, text: "Sunken Stone Drainage Trough" },
            { yaw: 35, pitch: 15, text: "Nagarjun Forest Hillside" },
          ],
        },
        {
          id: "garden-pavilion",
          title: {
            en: "Upper Garden & Pavilion Grounds",
            ne: "माथिल्लो बगैँचा तथा सत्तल परिसर",
          },
          description: {
            en: "Panoramic perspective of the traditional rest pavilions and reflection ponds.",
            ne: "परम्परागत सत्तल, विश्रामस्थल र नजिकका पोखरीहरूको रमणीय दृश्य।",
          },
          panoramaUrl: "/images/22-dhara/360-gardens.jpg",
          isAuthentic: false,
          hotspots: [
            { yaw: -45, pitch: -5, text: "Traditional Timber Pati" },
            { yaw: 20, pitch: -12, text: "Historic Reflection Pond" },
          ],
        },
      ],
    },
  },

  // =========================================================================
  // 2. PYATHO AJIMA TEMPLE
  // =========================================================================
  "pyatho-ajima": {
    // ── 1. Image Hotspots ──────────────────────────────────────────────────
    hotspots: {
      title: {
        en: "Vernacular Sacred Architecture Hotspots",
        ne: "मन्दिर वास्तुकलाका मुख्य अङ्गहरू",
      },
      subtitle: {
        en: "Click any numbered marker on the temple facade to explore Newar woodcarvings, masonry and courtyard sacred spaces.",
        ne: "मन्दिरको काष्ठकला, परम्परागत ईँटा र पवित्र गर्भगृह बुझ्न तलका नम्बरहरूमा क्लिक गर्नुहोस्।",
      },
      image: {
        src: "/images/pyatho-ajima/architecture-overview.jpg",
        alt: "Pyatho Ajima Temple architectural facade layout",
        fallbackTitle: "Pyatho Ajima Temple Vernacular Elevation",
        isAuthentic: false,
      },
      items: [
        {
          id: "sacred-sanctum",
          x: 48,
          y: 62,
          number: "01",
          title: {
            en: "Sacred Natural Stone Sanctum (Garbhagriha)",
            ne: "प्राकृतिक शिलायुक्त गर्भगृह",
          },
          element: {
            en: "Sacred Iconography: Aniconic River Stone",
            ne: "धार्मिक स्वरूप: प्राकृतिक शिला पीठ",
          },
          description: {
            en: "Unlike temples with humanized bronze idols, Pyatho Ajima's core sanctum houses an ancient aniconic river-stone embodying the primordial mother goddess.",
            ne: "यस मन्दिरको गर्भगृहमा कुनै मानवाकार मूर्ति नभई प्राचीन प्राकृतिक शिलालाई नै साक्षात् देवीका रूपमा पूजा गरिन्छ।",
          },
          significance: {
            en: "Reflects the oldest indigenous layer of Kathmandu Valley religion, where natural stones in intimate contact with the soil are recognized as loci of maternal protective energy.",
            ne: "यो परम्परा काठमाडौँ उपत्यकाको प्राचीन प्रकृति तथा मातृपूजाको ज्वलन्त नमुना हो।",
          },
          reference: "Slusser, Mary Shepherd — Nepal Mandala: A Cultural Study of the Kathmandu Valley",
        },
        {
          id: "timber-struts",
          x: 32,
          y: 28,
          number: "02",
          title: {
            en: "Carved Sal Timber Struts (Tundals)",
            ne: "काष्ठकलायुक्त टुँडालहरू",
          },
          element: {
            en: "Structural Woodcraft: Angled Roof Struts",
            ne: "काष्ठकला: छाना आड दिने टुँडाल",
          },
          description: {
            en: "Angled struts carved from dense Sal hardwood transfer the outward thrust of the pitched terracotta roof while displaying intricate figures of multi-armed protective deities.",
            ne: "सालको कडा काठबाट बनाइएका यी टुँडालहरूले छानालाई बलियोसँग धान्नुका साथै विभिन्न देवी-देवताका कलात्मक स्वरूप प्रस्तुत गर्छन्।",
          },
          significance: {
            en: "Harmonizes functional timber joinery with apotropaic (protective) religious iconography intended to ward off harmful forces from the neighborhood.",
            ne: "इन्जिनियरिङ र धार्मिक आस्थालाई सन्तुलित गर्दै टोलको सुरक्षाका लागि यस्ता टुँडालहरू कुँद्ने परम्परा छ।",
          },
          reference: "Department of Archaeology, Government of Nepal — Timber Monument Documentation",
        },
        {
          id: "dachi-appa",
          x: 68,
          y: 52,
          number: "03",
          title: {
            en: "Polished Fired Brickwork (Dachi Appa)",
            ne: "दाची अप्पा (परम्परागत चिल्लो ईँटा)",
          },
          element: {
            en: "Material Craft: Wedge-Profile High-Fired Bricks",
            ne: "निर्माण सामग्री: चिल्लो परम्परागत ईँटा",
          },
          description: {
            en: "Exterior walls feature glazed wedge-shaped Newar bricks (dachi appa) laid with paper-thin joints of traditional yellow mud mortar (chaah), preventing rain penetration.",
            ne: "मन्दिरको बाहिरी भागमा पानी नछिर्ने गरी मसिनो माटोको जोर्नीमा दाची अप्पा ईँटा कुशलतापूर्वक जडान गरिएको छ।",
          },
          significance: {
            en: "Traditional Newar masonry provides extraordinary thermal inertia and flexural resistance during earthquakes while producing a rich terracotta patina.",
            ne: "यस प्रकारको ईँटाको पर्खालले मन्दिरलाई भूकम्पीय कम्पन थेग्न मद्दत गर्नुका साथै न्यानो र आकर्षक स्वरूप दिन्छ।",
          },
          reference: "Korn, Wolfgang — The Traditional Architecture of the Kathmandu Valley",
        },
        {
          id: "courtyard-nanani",
          x: 20,
          y: 84,
          number: "04",
          title: {
            en: "Residential Courtyard (Nanani) & Pati",
            ne: "टोल चोक (नानानी) तथा भजन पाटी",
          },
          element: {
            en: "Urban Layout: Communal Sacred Quadrangle",
            ne: "सहरी संरचना: सामुदायिक चोक र पाटी",
          },
          description: {
            en: "The temple faces directly into the stone-paved residential quadrangle and connects to an adjoining open wooden rest pavilion (pati) where community elders sing evening bhajans.",
            ne: "मन्दिर खुला ढुङ्गे चोकमा अवस्थित छ र यससँगै जोडिएको पाटीमा स्थानीय बासिन्दाहरू साँझपख भजन गाउन भेला हुन्छन्।",
          },
          significance: {
            en: "Demonstrates that in Newar urban design, sacred temples are never isolated monuments but active centers of neighbourhood daily life and child play.",
            ne: "नेवारी बस्ती विकासमा मन्दिरहरू बस्तीभन्दा अलग नभई दैनिक जीवन र सामाजिक सम्बन्धको केन्द्रबिन्दु हुन्छन्।",
          },
          reference: "Gellner, David N. — Monk, Householder, and Tantric Priest",
        },
      ],
    },

    // ── 2. Then-and-Now Slider ─────────────────────────────────────────────
    comparison: {
      title: {
        en: "Then & Now: Post-Disaster Resiliency",
        ne: "विगत र वर्तमान: भूकम्पपछिको संरक्षण",
      },
      subtitle: {
        en: "Compare the historical temple setting with contemporary community-led structural conservation following the 2015 earthquake.",
        ne: "विगतको अवस्था र २०७२ को भूकम्पपछि समुदायको सहभागितामा गरिएको संरक्षण कार्य तुलना गर्नुहोस्।",
      },
      before: {
        label: "Pre-Restoration Setting",
        date: "Pre-2015 Documentation",
        source: "Community Heritage Archive",
        src: "/images/pyatho-ajima/comparison-historic.jpg",
        caption: {
          en: "Pyatho Ajima Temple before seismic stabilization and courtyard restoration.",
          ne: "२०७२ को भूकम्पअघिको मन्दिर तथा परिसरको दृश्य।",
        },
        isAuthentic: false,
      },
      after: {
        label: "Post-Restoration Stewardship",
        date: "Contemporary Archive",
        source: "Ward 16 Cultural Documentation",
        src: "/images/pyatho-ajima/comparison-contemporary.jpg",
        caption: {
          en: "The stabilized timber structure, renewed clay tile roof and restored courtyard paving.",
          ne: "काष्ठकला सुदृढीकरण र झिँगटीको छाना मर्मतपछिको वर्तमान मन्दिर।",
        },
        isAuthentic: false,
      },
      historicalNotes: {
        en: "Through local community fundraising and municipal guidance, the timber eaves were realigned without disturbing the centuries-old sanctum stone, preserving both architectural authenticity and sacred sanctity.",
        ne: "स्थानीय गुठी र वडाको पहलमा गर्भगृहको प्राचीन शिला यथावत् राखी छाना र काठका जोर्नीहरूको परम्परागत विधिबाट मर्मत गरियो।",
      },
    },

    // ── 3. Audio Narration ─────────────────────────────────────────────────
    audio: {
      title: {
        en: "The Grandmother's Guardian Sanctuary",
        ne: "हाम्रो टोलको ममतामयी छहारी",
      },
      subtitle: {
        en: "A spoken cultural audio tour exploring maternal deity worship, guthi stewardship and community music.",
        ne: "अजिमाको महत्त्व, गुठी परम्परा र साँझको भजन संस्कृतिको मौखिक वृत्तान्त।",
      },
      duration: "02:50",
      durationSeconds: 170,
      audioSrc: "/audio/pyatho-ajima-narration.mp3",
      speaker: {
        en: "Ward 16 Cultural Heritage Documentation Initiative",
        ne: "वडा नं. १६ सांस्कृतिक सम्पदा संरक्षण समिति",
      },
      transcript: {
        en: "Step into the courtyard of Pyatho Ajima Temple, where centuries of maternal devotion greet every visitor. In the Newar language, 'Ajima' literally translates to 'Grandmother'.\n\nUnlike formidable warrior deities, Ajima is an intimate maternal protector. For generations, whenever young children in this tole suffered from fevers, viral ailments, or sleepless nights, mothers brought them here at daybreak. An offering of vermilion, sweet water, and mustard-oil lamps was lit with faith that maternal warmth could heal all vulnerabilities.\n\nEvery evening, this quiet courtyard awakens with the rhythm of the Dafa bhajan—local elders gathering in the adjacent open pavilion to play cymbals and hand drums. This temple is not merely historic masonry: it is the living heart of neighbourly solidarity in Ward 16.",
        ne: "प्याठो अजिमा मन्दिरको यो शान्त चोकमा यहाँलाई स्वागत छ। नेपाल भाषामा 'अजिमा' को अर्थ 'हजुरआमा' हुन्छ।\n\nअजिमा कुनै टाढाको वा डरलाग्दो देवता हुनुहुन्न; उहाँ बालबालिकालाई माया गर्ने ममतामयी हजुरआमा हुनुहुन्छ। पुस्तौँदेखि यस टोलका बालबच्चा बिरामी पर्दा आमाहरू यहाँ आएर दियो बाल्ने र रक्षाको कामना गर्ने गर्दथे।\n\nसाँझ परेपछि मन्दिरसँगैको पाटीमा बज्ने भजनका धुनहरूले टोलवासीहरूलाई एकताबद्ध बनाउँछ। यो मन्दिर इँटा र काठको संरचना मात्र नभई वडा नं. १६ को आपसी सद्भाव र जीवन्त संस्कृतिको धरोहर हो।",
      },
      chapters: [
        { time: 0, title: "1. The Maternal Spirit of Ajima" },
        { time: 45, title: "2. The Aniconic Stone Sanctum" },
        { time: 105, title: "3. Evening Bhajan in the Pati" },
        { time: 145, title: "4. Intergenerational Community Care" },
      ],
    },

    // ── 4. Heritage Quiz ───────────────────────────────────────────────────
    quiz: {
      title: {
        en: "Test Your Knowledge: Pyatho Ajima Temple",
        ne: "ज्ञान परीक्षण: प्याठो अजिमा मन्दिर",
      },
      description: {
        en: "Answer five questions about Newar mother goddess veneration, vernacular architecture and guthi traditions.",
        ne: "नेवार मातृका परम्परा, मन्दिर वास्तुकला र गुठी संस्कृति सम्बन्धी ५ वटा प्रश्नहरू।",
      },
      questions: [
        {
          id: "pa-q1",
          question: {
            en: "What does the word 'Ajima' mean in the indigenous Newar language?",
            ne: "नेपाल भाषा (नेवारी) मा 'अजिमा' शब्दको वास्तविक अर्थ के हो?",
          },
          options: [
            { id: "a", text: { en: "Queen or Ruler", ne: "रानी वा शासक" } },
            { id: "b", text: { en: "Grandmother (Maternal Elder)", ne: "हजुरआमा (मातृ शक्ति)" } },
            { id: "c", text: { en: "Sacred River", ne: "पवित्र नदी" } },
            { id: "d", text: { en: "Golden Temple", ne: "सुनौलो मन्दिर" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "'Ajima' is the Newar term for Grandmother, embodying maternal care, ancestral protection and healing for community children.",
            ne: "नेपाल भाषामा 'अजिमा' को अर्थ हजुरआमा हुन्छ, जसले बालबालिकाको हेरचाह र संरक्षण गर्ने मातृ शक्तिको प्रतिनिधित्व गर्छ।",
          },
        },
        {
          id: "pa-q2",
          question: {
            en: "What form of sacred deity is enshrined inside the main sanctum of Pyatho Ajima?",
            ne: "प्याठो अजिमाको मूल गर्भगृहमा देवीको कुन स्वरूप स्थापित छ?",
          },
          options: [
            { id: "a", text: { en: "A multi-armed marble statue", ne: "सङ्गमरमरको मूर्ति" } },
            { id: "b", text: { en: "An aniconic natural river-stone", ne: "प्राकृतिक शिला (शिला पीठ)" } },
            { id: "c", text: { en: "A framed oil painting", ne: "चित्र कोरिएको तस्बिर" } },
            { id: "d", text: { en: "A golden pagoda spire", ne: "सुनौलो गजुर" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Indigenous Ajima shrines traditionally venerate aniconic consecrated natural stones representing the earth's maternal energy rather than carved anthropomorphic figures.",
            ne: "परम्परागत अजिमा पीठहरूमा कुनै मानवाकार मूर्ति नभई जमिनसँग जोडिएको प्राकृतिक पवित्र शिलालाई पुज्ने मौलिक परम्परा छ।",
          },
        },
        {
          id: "pa-q3",
          question: {
            en: "What traditional Newar institution historically maintained and funded the temple's upkeep?",
            ne: "परम्परागत रूपमा मन्दिरको नियमित पूजा र मर्मत सम्भार गर्ने नेवारी संस्था कुन हो?",
          },
          options: [
            { id: "a", text: { en: "Guthi (Social & Religious Trust)", ne: "गुठी" } },
            { id: "b", text: { en: "Commercial Merchant Guild", ne: "व्यापारिक संघ" } },
            { id: "c", text: { en: "Royal Army Regiments", ne: "शाही सेना" } },
            { id: "d", text: { en: "Municipal Police Bureau", ne: "नगर प्रहरी" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Newar Guthis are autonomous lineage and community trusts whose endowments of land and communal labor ensure the perpetual continuity of shrines and rituals.",
            ne: "गुठी नेवार समुदायको परम्परागत सामाजिक तथा धार्मिक संस्था हो, जसले मन्दिरको संरक्षण र पर्व सञ्चालनको जिम्मा लिन्छ।",
          },
        },
        {
          id: "pa-q4",
          question: {
            en: "What high-density polished brick is characteristically used in traditional Newar temple walls like Pyatho Ajima?",
            ne: "प्याठो अजिमा जस्ता परम्परागत मन्दिरको बाहिरी पर्खालमा प्रयोग गरिने प्रख्यात चिल्लो ईँटा कुन हो?",
          },
          options: [
            { id: "a", text: { en: "Concrete Breeze Blocks", ne: "सिमेन्ट ब्लक" } },
            { id: "b", text: { en: "Dachi Appa (Glazed Wedge Brick)", ne: "दाची अप्पा" } },
            { id: "c", text: { en: "Sun-dried Unburnt Adobe", ne: "काँचो ईँटा" } },
            { id: "d", text: { en: "Imported Granite Tiles", ne: "आयातित ग्रेनाइट" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Dachi Appa is the traditional wedge-profile Newari brick, fired to exceptional hardness and polished to create weather-tight, smooth terracotta facades.",
            ne: "दाची अप्पा नेवार वास्तुकलाको मौलिक चिल्लो ईँटा हो जसले पर्खाललाई बलियो, पानी नछिर्ने र कलात्मक बनाउँछ।",
          },
        },
        {
          id: "pa-q5",
          question: {
            en: "What community cultural activity takes place in the open pavilion (pati) facing the temple at dusk?",
            ne: "मन्दिर अगाडिको पाटीमा साँझपख स्थानीय समुदायद्वारा कुन सांस्कृतिक गतिविधि गरिन्छ?",
          },
          options: [
            { id: "a", text: { en: "Dafa / Bhajan Devotional Singing", ne: "दाफा / भजन कीर्तन" } },
            { id: "b", text: { en: "Commercial Produce Auction", ne: "तरकारी लिलामी" } },
            { id: "c", text: { en: "Formal Court Trial", ne: "अदालती सुनुवाइ" } },
            { id: "d", text: { en: "Pottery Firing", ne: "माटोका भाँडा पोल्ने" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Local elders gather at the temple pati to perform Dafa/Bhajan hymns accompanied by drums and cymbals, preserving traditional music and social solidarity.",
            ne: "स्थानीय वृद्धवृद्धाहरू पाटीमा भेला भएर मृदङ्ग र झ्यालीको तालमा परम्परागत भजन गाउँदै सामाजिक एकता बलियो बनाउँछन्।",
          },
        },
      ],
    },

    // ── 5. 360-Degree Virtual Tour ─────────────────────────────────────────
    virtualTour: {
      title: {
        en: "360° Virtual Panorama Exploration",
        ne: "३६०° भर्चुअल मन्दिर अवलोकन",
      },
      subtitle: {
        en: "Navigate interactive 360-degree scenes of the residential courtyard and temple threshold.",
        ne: "मन्दिरको चोक र परिसरको ३६० डिग्री भर्चुअल दृश्य अवलोकन गर्नुहोस्।",
      },
      scenes: [
        {
          id: "courtyard-square",
          title: {
            en: "Residential Courtyard (Nanani)",
            ne: "टोलको खुला चोक (नानानी)",
          },
          description: {
            en: "Standing in the central stone quadrangle surrounded by traditional Newar brick houses.",
            ne: "परम्परागत नेवारी घरहरूले घेरिएको मन्दिर परिसरको खुला चोक।",
          },
          panoramaUrl: "/images/pyatho-ajima/360-courtyard.jpg",
          isAuthentic: false,
          hotspots: [
            { yaw: -15, pitch: 10, text: "Pyatho Ajima Main Tiered Facade" },
            { yaw: 45, pitch: -8, text: "Traditional Community Pati" },
            { yaw: 110, pitch: 5, text: "Historic Courtyard Entrance Alley" },
          ],
        },
        {
          id: "temple-threshold",
          title: {
            en: "Temple Threshold & Struts",
            ne: "मन्दिरको दलिन र टुँडाल",
          },
          description: {
            en: "Close-up perspective of the carved Sal wood struts and the oil lamp gallery.",
            ne: "काष्ठकलाका टुँडालहरू र दीप प्रज्वलन गर्ने पालाहरूको नजिकको दृश्य।",
          },
          panoramaUrl: "/images/pyatho-ajima/360-threshold.jpg",
          isAuthentic: false,
          hotspots: [
            { yaw: -20, pitch: 22, text: "Carved Sal Wood Tundal" },
            { yaw: 0, pitch: -15, text: "Threshold Oil Lamp Gallery" },
            { yaw: 30, pitch: 0, text: "Dachi Appa Brick Bonding" },
          ],
        },
      ],
    },
  },
};
