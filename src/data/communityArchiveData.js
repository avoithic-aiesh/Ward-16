/**
 * src/data/communityArchiveData.js
 *
 * Seed database of approved community heritage contributions for Ward 16.
 *
 * Ethically collected, documented living memories, oral histories,
 * traditional practices, and personal reflections.
 *
 * Each story strictly follows the Module 9 metadata specification.
 */

export const ARCHIVE_CATEGORIES = [
  {
    id: "oral_histories",
    label: { en: "Oral Histories", ne: "मौखिक इतिहास" },
    description: {
      en: "First-hand spoken testimonies and elder recollections of past eras in Ward 16.",
      ne: "वडा नं. १६ का विगतका कालखण्डबारे अग्रजहरूका प्रत्यक्ष भनाइ तथा संस्मरण।",
    },
    icon: "microphone",
  },
  {
    id: "community_memories",
    label: { en: "Community Memories", ne: "सामुदायिक संस्मरण" },
    description: {
      en: "Shared experiences of neighbourhood gatherings, festivals, and changing landscapes.",
      ne: "स्थानीय बस्ती, सामूहिक चाडपर्व र फेरिँदो परिवेशका साझा अनुभूतिहरू।",
    },
    icon: "book-open",
  },
  {
    id: "traditional_practices",
    label: { en: "Traditional Practices", ne: "परम्परागत अभ्यास" },
    description: {
      en: "Documentation of Guthi rituals, Dafa devotional singing, and Newar crafts.",
      ne: "गुठी परम्परा, दाफा भजन, पूजाविधि र परम्परागत सीपको अभिलेखीकरण।",
    },
    icon: "sparkles",
  },
  {
    id: "historical_photographs",
    label: { en: "Historical Photographs", ne: "ऐतिहासिक तस्बिरहरू" },
    description: {
      en: "Family album snapshots and archival photos documenting monuments over the decades.",
      ne: "पारिवारिक एल्बम तथा पुराना संकलनबाट प्राप्त ऐतिहासिक सम्पदा तस्बिरहरू।",
    },
    icon: "camera",
  },
  {
    id: "personal_experiences",
    label: { en: "Personal Experiences", ne: "व्यक्तिगत अनुभव" },
    description: {
      en: "Reflections from pilgrims, residents, and visitors on their connection to sacred sites.",
      ne: "तीर्थालु, स्थानीय बासिन्दा र आगन्तुकहरूको व्यक्तिगत आध्यात्मिक तथा भावनात्मक सम्बन्ध।",
    },
    icon: "heart",
  },
  {
    id: "heritage_documentation",
    label: { en: "Local Heritage Documentation", ne: "स्थानीय सम्पदा अभिलेख" },
    description: {
      en: "Citizen-led field notes on stone spouts, inscriptions, and vernacular structures.",
      ne: "ढुङ्गेधारा, शिलालेख र स्थानीय वास्तुकलाबारे नागरिक स्तरबाट संकलित अध्ययन टिपोट।",
    },
    icon: "document-text",
  },
];

export const SUBMISSION_STATUSES = {
  DRAFT: "draft",
  PENDING_REVIEW: "pending_review",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const INITIAL_APPROVED_STORIES = [
  {
    id: "balaju-springs-memory",
    slug: "balaju-springs-memory",
    title: {
      en: "The Vanishing Waters: Memories of the Nagarjun Aquifers",
      ne: "बिलाउँदै गएको मूल: नागार्जुन जलाधारका पुराना सम्झनाहरू",
    },
    contributor: {
      name: "Ram Krishna Manandhar",
      nameNepali: "रामकृष्ण मानन्धर",
      age: 74,
      role: { en: "Lifelong Balaju Resident", ne: "स्थानीय ज्येष्ठ नागरिक, बालाजु" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "22-dhara",
      name: { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
      slug: "22-dhara",
    },
    category: "oral_histories",
    summary: {
      en: "An elder recalls the crystal-clear springs feeding the 22 spouts before rapid urbanization altered the subterranean natural water channels in the late 20th century.",
      ne: "तीव्र सहरीकरण हुनुअघि नागार्जुन डाँडाको फेदीबाट बाइसै धारामा निरन्तर बग्ने कञ्चन पानीका प्राकृतिक मूलहरूबारे एक ज्येष्ठ नागरिकको सम्झना।",
    },
    content: {
      en: `When I was a boy in the late 1950s, the water of Balaju Baisdhara was so clear you could count the pebbles in the water channels. The entire hillside above the 22 spouts was dense with chilaune and uttis trees, and you could hear water gurgling underground beneath your feet.

My father used to say that the water had healing properties because it filtered through mountain herbs before emerging from the dragon (Makara) spouts. On the morning of Chaitra Shukla Purnima, we would wake up at four in the morning to the sound of temple bells and flute music from visiting devotees.

Over the last forty years, many paved roads and concrete homes have been built along the foothills. The water volume has decreased, and municipal pumps now support what nature once provided freely. It is essential that the young people of Ward 16 understand that these water spouts are living ecosystems, not merely decorative stonework.`,
      ne: `विसं २०१५ तिर जब म बालक थिएँ, बालाजु बाइसधाराको पानी यति कञ्चन हुन्थ्यो कि कुलोभित्रका साना ढुङ्गा पनि स्पष्ट देखिन्थे। बाइसधाराभन्दा माथिको नागार्जुन डाँडा उत्तिस र चिलाउनेको बाक्लो जंगलले ढाकिएको थियो, र हिँड्दा जमिनमुनिबाट पानी सुसाइरहेको आवाज स्पष्ट सुनिन्थ्यो।

मेरा बुबा भन्नुहुन्थ्यो कि यो पानी पहाडका जडीबुटी हुँदै छानिन्छ, त्यसैले यसमा रोग निको पार्ने शक्ति हुन्छ। चैत्र शुक्ल पूर्णिमाको दिन बिहान चारै बजे शङ्ख-घण्टको ध्वनि र बाँसुरीको धुनले हामी ब्युँझन्थ्यौँ।

विगत चार दशकमा फेदी वरिपरि पक्की सडक र घरहरू बने। प्राकृतिक पानीको बहाव घट्दै गयो। आजका युवा पुस्ताले के बुझ्न जरुरी छ भने, यी ढुङ्गेधारा केवल कलात्मक ढुङ्गा मात्र होइनन्, यो त प्रकृति र मानव जीवनलाई जोड्ने अमूल्य जीवित प्रणाली हो।`,
    },
    photographs: [
      {
        url: "/images/22-dhara/spouts-detail.jpg",
        caption: {
          en: "The carved Makara water spouts flowing into the stone basin during early spring.",
          ne: "वसन्त ऋतुमा ढुङ्गेधाराबाट जल प्रवाह भइरहेको मनमोहक दृश्य।",
        },
        credit: "Ward 16 Cultural Documentation Project (1998)",
        license: "Creative Commons Attribution-NonCommercial (CC BY-NC 4.0)",
      },
    ],
    publicationDate: "2026-03-12",
    language: "bilingual",
    source: "Recorded during Ward 16 Oral Heritage Project, Interviewer: S. Maharjan",
    consentStatus: "verified_consent",
    status: "approved",
    verificationStatus: "community_testimony",
    tags: ["Balaju", "Water Spouts", "Nagarjun", "Ecology", "Living Heritage"],
    featured: true,
  },
  {
    id: "pyatho-ajima-dafa-tradition",
    slug: "pyatho-ajima-dafa-tradition",
    title: {
      en: "Singing into the Twilight: The Dafa Bhajan of Pyatho Ajima",
      ne: "साँझको लय: प्याठो अजिमाको परम्परागत दाफा भजन",
    },
    contributor: {
      name: "Bikram Shakya & The Local Dafa Khalah",
      nameNepali: "विक्रम शाक्य तथा स्थानीय दाफा खलः",
      age: 58,
      role: { en: "Traditional Hymn Singer & Guthi Member", ne: "दाफा भजन गायक तथा गुठी सदस्य" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "pyatho-ajima",
      name: { en: "Pyatho Ajima Temple", ne: "प्याठो अजिमा मन्दिर" },
      slug: "pyatho-ajima",
    },
    category: "traditional_practices",
    summary: {
      en: "How local elders preserve ancient Newari devotional ragas sung at dusk inside the temple courtyard during Gunla and festive seasons.",
      ne: "गुँला पर्व र विशेष चाडपर्वमा मन्दिर परिसरको पाटीमा बसेर गाईने प्राचीन दाफा भजन र शास्त्रीय रागहरूको संरक्षण कथा।",
    },
    content: {
      en: `Every evening during the sacred month of Gunla, six to eight of us gather on the wooden colonnade beside Pyatho Ajima Temple. We carry the traditional Khin drum, the small cymbals (Tah and Babhu), and our worn handwritten hymn manuscripts written in Prachalit Nepal script.

The songs we sing were taught to us by our grandfathers without formal notation. Each raga corresponds to a specific hour of the evening. Singing in front of the mother deity Ajima brings an inexplicable peace to our neighborhood. When the oil lamps are lit and the bells resound, the entire street slows down.

Today, fewer young people join our Dafa Khalah because of school and modern screen distractions. We have begun recording the melodies digitally so that future generations of Ward 16 will still know how our ancestors prayed in song.`,
      ne: `पवित्र गुँला महिनाभरि हरेक साँझ हामी ६-८ जना प्याठो अजिमा मन्दिर छेउको पाटीमा जम्मा हुन्छौँ। हामीसँग खिं बाजा, ताः, बभु र हाम्रा पुर्खाले प्रचलित नेपाल लिपिमा लेखेका भजनका पुराना पाण्डुलिपि हुन्छन्।

यी रागहरू हाम्रा हजुरबुबाहरूले हामीलाई मौखिक रूपमा सिकाउनुभएको थियो। साँझको पहरअनुसार छुट्टाछुट्टै रागहरू गाइन्छन्। अजिमा माताको अगाडि दीप बालेर भजन गाउँदा टोलभरि एउटा अनौठो शान्ति छाउँछ।

आजभोलि आधुनिक व्यस्तताले गर्दा भजन सिक्न आउने युवाहरूको संख्या पातलिँदै गएको छ। त्यसैले हामीले यी परम्परागत धुनहरूलाई डिजिटल रूपमा रेकर्ड गर्न थालेका छौँ, ताकि वडा नं. १६ का भावी सन्ततिले आफ्ना पुर्खाको यो सांगीतिक आराधना कहिल्यै नबिर्सून्।`,
    },
    photographs: [
      {
        url: "/images/pyatho-ajima/temple-facade.jpg",
        caption: {
          en: "Pyatho Ajima open courtyard at dusk, where the community gathers for evening rituals.",
          ne: "प्याठो अजिमा मन्दिरको खुला प्राङ्गण, जहाँ साँझपख स्थानीय समुदाय धार्मिक अनुष्ठानमा भेला हुन्छन्।",
        },
        credit: "Pyatho Ajima Guthi Archives",
        license: "Public Cultural Domain",
      },
    ],
    publicationDate: "2026-04-05",
    language: "bilingual",
    source: "Fieldwork documentation conducted by Ward 16 Youth Heritage Club",
    consentStatus: "verified_consent",
    status: "approved",
    verificationStatus: "community_testimony",
    tags: ["Pyatho Ajima", "Dafa Bhajan", "Gunla", "Music", "Intangible Culture"],
    featured: true,
  },
  {
    id: "1970s-baisdhara-mela-photo",
    slug: "1970s-baisdhara-mela-photo",
    title: {
      en: "A Family Pilgrimage in 1974: The Historic Baisdhara Mela",
      ne: "विसं २०३१ को पारिवारिक तीर्थयात्रा: ऐतिहासिक बाइसधारा मेला",
    },
    contributor: {
      name: "Sabita Shrestha",
      nameNepali: "सविता श्रेष्ठ",
      age: 62,
      role: { en: "Ward 16 Heritage Enthusiast", ne: "स्थानीय बासिन्दा, सोह्रखुट्टे" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "22-dhara",
      name: { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
      slug: "22-dhara",
    },
    category: "historical_photographs",
    summary: {
      en: "A treasured photograph preserved from an old family album showing devotees in traditional Hakupatasi and Daura Suruwal at the festival fifty years ago.",
      ne: "५० वर्ष पुरानो पारिवारिक एल्बमबाट प्राप्त ऐतिहासिक तस्बिर, जसमा हाकुपटासी र दौरा सुरुवाल लगाएका श्रद्धालुहरू बाइसधारा मेलामा स्नान गर्दै गरेको देखिन्छ।",
    },
    content: {
      en: `This black-and-white photograph was taken by my late father with his Yashica twin-lens reflex camera on the full moon day of Chaitra in 1974. In the background, you can see the untouched forest of Nagarjun rising steeply behind the 22 spouts, without any tall modern brick buildings.

My mother and aunts had walked from Sorhakhutte in their traditional black and red Hakupatasi sarees. In those days, people carried brass vessels (kalash) on their shoulders to take holy water back home to purify their prayer rooms.

I am sharing this photograph with the Ward 16 Digital Archive so that everyone can see how deeply our families cherished this heritage site, long before it became a crowded commercial recreation park.`,
      ne: `यो श्याम-श्वेत तस्बिर मेरा स्वर्गीय बुबाले विसं २०३१ सालको चैत्र पूर्णिमाको दिन खिच्नुभएको थियो। तस्बिरको पृष्ठभूमिमा बाइसधारा पछाडि नागार्जुनको घना वनजङ्गल स्पष्ट देखिन्छ, जहाँ आजको जस्तो कुनै अग्ला कंक्रिटका घरहरू थिएनन्।

मेरी आमा र काकीहरू सोह्रखुट्टेबाट हाकुपटासी लगाएर पैदलै मेला भर्न बालाजु पुग्नुभएको थियो। त्यतिबेला घरमा पूजाकोठा पवित्र पार्न मानिसहरू पित्तलको कलशमा जल भरेर काँधमा बोकी ल्याउँथे।

मैले यो तस्बिर वडा नं. १६ को डिजिटल अभिलेखालयमा यसकारण बुझाएकी हुँ, ताकि आजका पुस्ताले ५० वर्षअघि हाम्रा परिवारले यस पवित्र सम्पदालाई कति गहिरो श्रद्धाका साथ जोगाएका थिए भनेर देख्न सकून्।`,
    },
    photographs: [
      {
        url: "/images/22-dhara/historic-archival.jpg",
        caption: {
          en: "Historic family snapshot at Balaju Baisdhara during the annual festival (c. 1974).",
          ne: "विसं २०३१ को बाइसधारा मेलामा खिचिएको ऐतिहासिक पारिवारिक तस्बिर।",
        },
        credit: "Contributed by the Shrestha Family, Ward 16",
        license: "Family Archival Permission granted for non-commercial educational use",
      },
    ],
    publicationDate: "2026-05-18",
    language: "bilingual",
    source: "Family collection of Sabita Shrestha; digitally scanned by archive team",
    consentStatus: "verified_consent",
    status: "approved",
    verificationStatus: "community_testimony",
    tags: ["Historical Photos", "1970s", "Baisdhara Mela", "Pilgrimage", "Sorhakhutte"],
    featured: false,
  },
  {
    id: "woodcarver-craft-pyatho",
    slug: "woodcarver-craft-pyatho",
    title: {
      en: "Carving Faith in Sal Wood: Notes on the Ajima Struts",
      ne: "सालको काठमा कुँदिएको आस्था: अजिमा मन्दिरका टुँडाल टिपोट",
    },
    contributor: {
      name: "Anonymous Silpakar",
      nameNepali: "अज्ञात शिल्पकार (स्थानीय काष्ठकला साधक)",
      age: 46,
      role: { en: "Traditional Woodcraft Artisan", ne: "परम्परागत काष्ठकला कालिगड" },
      attributionPreference: "pseudonym",
    },
    heritageLocation: {
      id: "pyatho-ajima",
      name: { en: "Pyatho Ajima Temple", ne: "प्याठो अजिमा मन्दिर" },
      slug: "pyatho-ajima",
    },
    category: "heritage_documentation",
    summary: {
      en: "Technical and spiritual reflections on the multi-tiered wooden roof struts, motifs of protective goddesses, and restoration ethics.",
      ne: "प्याठो अजिमा मन्दिरका काष्ठ टुँडालहरूमा कुँदिएका देवी-देवताका आकृतिहरू, काठको छनौट र जीर्णोद्धार गर्दा ध्यान दिनुपर्ने प्राविधिक पक्षहरू।",
    },
    content: {
      en: `The wooden struts supporting the eaves of Pyatho Ajima Temple are masterpieces of late Malla craftsmanship. Each strut depicts a guardian deity standing on an ornamental lotus pedestal, holding traditional attributes (ayudhas) in their multi-armed forms.

Traditional artisans used seasoned Shorea robusta (Sal wood) sourced from local valleys. Sal wood is resistant to termites and fungal decay if kept properly ventilated. When looking closely at the lower third of each strut, you can observe mythological beings (yakshas and vyalas) carved with dynamic curves.

During any future restoration, modern chemical sealants must not be coated over the historic wood. Traditional mustard seed oil and natural plant extracts allow the wood to breathe while repelling wood-boring insects. This wisdom must be preserved alongside the physical temple.`,
      ne: `प्याठो अजिमा मन्दिरका छानालाई आड दिने काष्ठ टुँडालहरू मल्लकालीन काष्ठकलाका अनुपम नमुना हुन्। प्रत्येक टुँडालमा कमलको आसनमाथि उभिएका बहुभुजाधारी मातृका तथा रक्षक देवीहरू कुँदिएका छन्।

हाम्रा पुर्खाहरूले टुँडाल निर्माणका लागि राम्रोसँग सुकाइएको सालको काठ प्रयोग गर्थे। यदि पर्याप्त हावा लाग्ने वातावरण भयो भने सालको काठ सयौँ वर्षसम्म धमिरा र ढुसीबाट सुरक्षित रहन्छ। टुँडालको तल्लो भागमा कुँदिएका यक्ष तथा शार्दूलका आकृतिहरूले तत्कालीन मूर्तिकलाको गतिशीलतालाई देखाउँछन्।

भावी दिनमा मन्दिरको जीर्णोद्धार गर्दा काठमा आधुनिक केमिकल रङ वा प्लास्टिक लेपन कहिल्यै लगाउनु हुँदैन। परम्परागत तोरीको तेल र वनस्पति अर्कले काठलाई सास फेर्न दिन्छ र किरा लाग्नबाट बचाउँछ।`,
    },
    photographs: [
      {
        url: "/images/pyatho-ajima/wood-carving.jpg",
        caption: {
          en: "Detailed relief of protective deities carved into the roof support struts of Pyatho Ajima.",
          ne: "प्याठो अजिमा मन्दिरको छाना अड्याउने काष्ठ टुँडालमा कुँदिएका देवीका आकृतिहरू।",
        },
        credit: "Ward 16 Heritage Architecture Field Survey",
        license: "Educational Documentation License",
      },
    ],
    publicationDate: "2026-06-02",
    language: "bilingual",
    source: "Submitted via citizen documentation portal; verified by architectural historian",
    consentStatus: "verified_consent",
    status: "approved",
    verificationStatus: "community_testimony",
    tags: ["Woodcraft", "Newar Architecture", "Struts", "Conservation", "Pyatho Ajima"],
    featured: false,
  },
  {
    id: "childhood-at-the-bathing-ghats",
    slug: "childhood-at-the-bathing-ghats",
    title: {
      en: "Splashing at the Stone Pools: A 1980s Childhood in Balaju",
      ne: "ढुङ्गे पोखरीका छालहरू: विसं २०४० को दशकमा बालाजुको बालापन",
    },
    contributor: {
      name: "Pradeep Joshi",
      nameNepali: "प्रदीप जोशी",
      age: 49,
      role: { en: "Community Member & Educator", ne: "स्थानीय शिक्षक, वडा १६" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "22-dhara",
      name: { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
      slug: "22-dhara",
    },
    category: "personal_experiences",
    summary: {
      en: "A lighthearted recollection of summer afternoons, learning to swim in the lower bathing tank, and the community camaraderie that defined growing up near the park.",
      ne: "गर्मीका दिनहरूमा बालाजुको बाइसधारा पोखरीमा पौडी खेल्न सिकेका र साथीहरूसँग रमाएका बाल्यकालका अविस्मरणीय क्षणहरू।",
    },
    content: {
      en: `In the 1980s, school holidays meant one thing for the kids of Balaju: running to the open park. We didn't have internet, video games, or television during the afternoon. The cold mountain water flowing out of the 22 spouts into the lower stone tank was our swimming pool and playground.

The elders would sit on the nearby stone resting platforms (Patis) playing cards or chatting, always keeping a watchful eye on us. If any kid dove too recklessly, an uncle from the neighbourhood would shout a friendly warning.

The bond we formed with the water was not just recreational; it taught us respect for community resources. Nobody dared to pollute the spouts because everyone drank from them and washed there. It was our collective home.`,
      ne: `विसं २०४० को दशकमा बालाजुका बालबालिकाका लागि विद्यालयको बिदा हुनु भनेको एउटै कुरा थियो: सिधै बालाजु उद्यान दौडिनु। त्यतिबेला इन्टरनेट वा कम्प्युटर थिएन। बाइसै धाराबाट बगेर तलको ढुङ्गे पोखरीमा भरिने चिसो पानी नै हाम्रो पौडी खेल्ने ठाउँ र खेलमैदान थियो।

टोलका अग्रजहरू नजिकैको पाटीमा बसेर तास खेल्थे वा गफिन्थे, र हामीमाथि नजर राखिरहन्थे। कसैले जथाभावी डुबुल्की मार्यो भने छिमेकी काकाहरूले तुरुन्तै मायालु चेतावनी दिनुहुन्थ्यो।

पानीसँगको हाम्रो त्यो सम्बन्ध केवल मनोरञ्जन मात्र थिएन, त्यसले हामीलाई सार्वजनिक सम्पदाको आदर गर्न सिकायो। धारामा फोहोर फाल्ने आँट कसैले गर्दैनथ्यो किनभने सबैले त्यहीँको पानी खान्थे र नुहाउँथे।`,
    },
    photographs: [],
    publicationDate: "2026-07-20",
    language: "bilingual",
    source: "Submitted via Ward 16 Community Heritage Portal",
    consentStatus: "verified_consent",
    status: "approved",
    verificationStatus: "community_testimony",
    tags: ["Balaju", "Childhood", "1980s", "Community Life", "Personal Memories"],
    featured: false,
  },
];
