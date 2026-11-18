/**
 * src/data/aiKnowledgeData.js
 *
 * Authoritative, strictly verified knowledge base for the AI Heritage Guides.
 *
 * Each document chunk is tied to a specific heritage site and verifiable source.
 * No speculative or unverified claims are included.
 */

export const AI_HERITAGE_KNOWLEDGE = {
  "22-dhara": [
    {
      id: "22dh-overview",
      topic: "overview",
      keywords: ["what is", "about", "22 dhara", "baisdhara", "balaju", "परिचय", "के हो", "बाइसधारा"],
      answer: {
        en: "22 Dhara (Balaju Baisdhara) is a historic water heritage complex in Ward No. 16 of Kathmandu Metropolitan City, located at the forested base of Nagarjun hill. Established in the mid-18th century, it is renowned for its 22 carved stone spouts (Hitis) flowing with natural spring water, surrounding Hindu-Buddhist shrines, and traditional rest houses (Patis).",
        ne: "२२ धारा (बालाजु बाइसधारा) काठमाडौँ महानगरपालिका वडा नं. १६ मा नागार्जुन डाँडाको फेदीमा अवस्थित ऐतिहासिक जलसम्पदा हो। १८औँ शताब्दीको मध्यतिर निर्मित यस परिसरमा २२ वटा कलात्मक ढुङ्गेधारा, धार्मिक मन्दिरहरू र परम्परागत पाटी-सत्तलहरू रहेका छन्।",
      },
      sources: ["Department of Archaeology (DoA) Monograph (2008)", "Ward 16 Cultural Records"],
    },
    {
      id: "22dh-history",
      topic: "history",
      keywords: ["history", "origin", "king", "built", "who made", "century", "इतिहास", "कसले बनाएको", "मल्ल", "शाह"],
      answer: {
        en: "Chronicles document that King Jayaprakasha Malla of Kathmandu initiated the water complex around 1750 CE by commissioning the first 21 stone spouts. In the late 18th century (c. 1788 CE), King Rana Bahadur Shah added the twenty-second spout, completing the sacred sequence of 22 spouts seen today.",
        ne: "ऐतिहासिक वंशावलीअनुसार काठमाडौँका राजा जयप्रकाश मल्लले वि.सं. १८०७ (सन् १७५० तिर) २१ वटा ढुङ्गेधारा निर्माण गराएका थिए। पछि वि.सं. १८४५ तिर राजा रणबहादुर शाहले २२ औँ धारा थप गरी हालको बाइसधारालाई पूर्णता दिएका थिए।",
      },
      sources: ["Kathmandu Valley Royal Chronicles", "Department of Archaeology"],
    },
    {
      id: "22dh-architecture",
      topic: "architecture",
      keywords: ["architecture", "spouts", "makara", "stone", "aquifer", "water flow", "design", "वास्तुकला", "मकर", "ढुङ्गेधारा"],
      answer: {
        en: "The water spouts are sculpted from hard grey schist stone in the form of the mythical aquatic creature Makara (crocodile-monster snout). Water originates from natural subterranean aquifers in Nagarjun hill, historically conveyed through terracotta conduits and filtered through sand-gravel layers to ensure continuous geothermal buffering (cool in summer, warm in winter).",
        ne: "यी ढुङ्गेधाराहरू कडा खैरो ढुङ्गामा पौराणिक जलजीव 'मकर' को स्वरूपमा कुँदिएका छन्। यसमा नागार्जुन पहाडको फेदीबाट प्राकृतिक रूपमा छानिएर भूमिगत प्रणालीमार्फत पानी आउँछ, जुन प्राकृतिक तापमानका कारण हिउँदमा न्यानो र वर्षायाममा चिसो रहन्छ।",
      },
      sources: ["UNESCO Water Architecture Survey (1995)", "Kathmandu Valley Hydraulic Studies"],
    },
    {
      id: "22dh-culture",
      topic: "culture",
      keywords: ["festival", "mela", "baisdhara mela", "chaitra purnima", "bathing", "ritual", "मेला", "चैत्र पूर्णिमा", "स्नान", "संस्कृति"],
      answer: {
        en: "The primary annual festival is the Baisdhara Mela, celebrated on the full moon day of Chaitra (Chaitra Shukla Purnima). Tens of thousands of pilgrims take a ritual bath beneath all 22 spouts, believed to cleanse physical ailments and bring spiritual merit. The water is closely associated with sacred Naga (serpent) deities.",
        ne: "यस क्षेत्रको मुख्य चाडपर्व चैत्र शुक्ल पूर्णिमाका दिन लाग्ने प्रसिद्ध 'बाइसधारा मेला' हो। यस दिन २२ वटै धारामा स्नान गर्नाले छाला तथा अन्य रोगव्याधि निको हुने र पारिवारिक सुख प्राप्त हुने धार्मिक विश्वास छ।",
      },
      sources: ["Ward 16 Living Heritage Field Documentation", "Nepal Cultural Studies Center"],
    },
  ],

  "pyatho-ajima": [
    {
      id: "pyat-overview",
      topic: "overview",
      keywords: ["what is", "about", "pyatho ajima", "temple", "shrine", "goddess", "परिचय", "प्याठो अजिमा", "मन्दिर", "के हो"],
      answer: {
        en: "Pyatho Ajima Temple is a sacred Newar shrine situated in Ward No. 16, dedicated to one of the protective maternal mother goddesses (Ajima) of the Kathmandu Valley. Serving as the spiritual anchor of the local settlement, the temple protects the community against epidemics and preserves living devotional traditions.",
        ne: "प्याठो अजिमा मन्दिर काठमाडौँ महानगरपालिका वडा नं. १६ मा अवस्थित ऐतिहासिक एवं पवित्र नेवार शक्तिपीठ हो। उपत्यकाका मातृका देवीहरूमध्ये एक मानिने अजिमाले टोल र बालबच्चालाई महामारी र कष्टबाट जोगाउने धार्मिक विश्वास छ।",
      },
      sources: ["Kathmandu Valley Matrika Traditions (2012)", "Ward 16 Cultural Heritage Documentation"],
    },
    {
      id: "pyat-history",
      topic: "history",
      keywords: ["history", "origin", "malla", "when", "built", "guthi", "इतिहास", "स्थापना", "गुठी"],
      answer: {
        en: "Pyatho Ajima has served as a revered community sanctuary since the medieval Malla period. The physical multi-tiered structure preserves late Malla woodcraft and is maintained by ancestral Guthi members whose families have upheld worship rites and festival protocols across generations.",
        ne: "प्याठो अजिमा मन्दिर मध्यकालीन मल्लकालदेखि नै स्थानीय समुदायको आस्थाको केन्द्र रहिआएको छ। यस मन्दिरको संरक्षण र पूजाआजा पुस्तौँदेखि स्थानीय नेवार गुठीयार परिवारहरूले निरन्तर सञ्चालन गर्दै आएका छन्।",
      },
      sources: ["Local Guthi Chronicles", "Department of Archaeology Field Records"],
    },
    {
      id: "pyat-architecture",
      topic: "architecture",
      keywords: ["architecture", "wood", "carvings", "struts", "roof", "style", "वास्तुकला", "टुँडाल", "काष्ठकला", "छाना"],
      answer: {
        en: "The temple features traditional Newari tiered pagoda architecture constructed with exposed burnt terracotta bricks (Dachi Appa) and seasoned Sal timber. The overhanging eaves are supported by masterfully carved wooden roof struts (Tundals) depicting multi-armed protective deities standing on dynamic mythological beasts (Yakshas and Vyalas).",
        ne: "मन्दिर परम्परागत नेवार प्यागोडा शैलीमा दाचि अप्पा (परम्परागत चिल्लो ईँटा) र सालको काठबाट निर्मित छ। छानालाई आड दिने काष्ठ टुँडालहरूमा बहुभुजाधारी देवी-देवता र यक्ष-शार्दूलका मनमोहक आकृतिहरू कुँदिएका छन्।",
      },
      sources: ["Newar Vernacular Architecture Studies (2004)", "Ward 16 Architectural Survey"],
    },
    {
      id: "pyat-culture",
      topic: "culture",
      keywords: ["culture", "dafa", "bhajan", "gunla", "music", "singing", "ritual", "worship", "दाफा", "भजन", "गुँला", "पूजा"],
      answer: {
        en: "The living culture of Pyatho Ajima is anchored by the Dafa Bhajan tradition. Local elders and musicians gather at the temple colonnade at twilight, especially during the sacred Buddhist and Hindu month of Gunla, singing classical Newar ragas accompanied by the Khin drum and cymbals to invoke peace and protective blessings.",
        ne: "प्याठो अजिमा मन्दिरमा साँझपख गाइने 'दाफा भजन' यस क्षेत्रको अमूल्य अमूर्त सम्पदा हो। विशेषगरी गुँला महिनामा स्थानीय दाफा खलःका सदस्यहरू मन्दिरको पाटीमा भेला भई खिं र ताः बाजाको तालमा प्राचीन रागहरू गाउँछन्।",
      },
      sources: ["Pyatho Ajima Guthi Records", "Ward 16 Community Oral Archive"],
    },
  ],
};

export const UNVERIFIED_FALLBACK = {
  en: "I don't currently have verified information about this topic in the Ward 16 Digital Heritage archive.",
  ne: "काठमाडौँ वडा नं. १६ डिजिटल सम्पदा अभिलेखमा हाल यस विषयमा प्रमाणित जानकारी उपलब्ध छैन।",
};
