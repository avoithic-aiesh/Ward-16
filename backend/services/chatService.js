/**
 * backend/services/chatService.js
 *
 * Text-Document Grounded AI Heritage Chatbot Service.
 *
 * This service reads, indexes, and searches the official text document:
 * backend/data/knowledge_base.txt.
 *
 * Grounding Rule: The chatbot answers strictly according to the text document.
 * If an answer is not documented in the text, it returns the verified fallback.
 */

const fs = require('fs');
const path = require('path');

const KNOWLEDGE_FILE_PATH = path.join(__dirname, '..', 'data', 'knowledge_base.txt');

let documentSections = [];
let fallbackPolicy = {
  en: "This information is currently unverified in our archival records. We document only substantiated community history.",
  ne: "यो विवरण हाल हाम्रो अभिलेखमा अप्रमाणित छ। हामी केवल तथ्यगत र प्रमाणित समुदायिक इतिहास मात्र प्रस्तुत गर्दछौँ।",
};

/**
 * Parse the knowledge_base.txt file into structured searchable entries.
 */
function loadAndParseDocument() {
  try {
    if (!fs.existsSync(KNOWLEDGE_FILE_PATH)) {
      console.error('[ChatService] Knowledge base document not found at:', KNOWLEDGE_FILE_PATH);
      return;
    }

    const rawText = fs.readFileSync(KNOWLEDGE_FILE_PATH, 'utf8');
    const sectionBlocks = rawText.split(/--------------------------------------------------------------------------------/);

    const parsed = [];

    for (const block of sectionBlocks) {
      if (!block.includes('Topic:') || !block.includes('English:') || !block.includes('Nepali:')) {
        continue;
      }

      const topicMatch = block.match(/Topic:\s*(.+)/i);
      const keywordsMatch = block.match(/Keywords:\s*(.+)/i);
      const englishMatch = block.match(/English:\s*([\s\S]*?)(?=Nepali:|$)/i);
      const nepaliMatch = block.match(/Nepali:\s*([\s\S]*?)(?=Sources:|$)/i);
      const sourcesMatch = block.match(/Sources:\s*(.+)/i);

      if (topicMatch && englishMatch && nepaliMatch) {
        const topic = topicMatch[1].trim();
        const keywords = keywordsMatch
          ? keywordsMatch[1].split(',').map((k) => k.trim().toLowerCase())
          : [];
        const english = englishMatch[1].trim();
        const nepali = nepaliMatch[1].trim();
        const sources = sourcesMatch
          ? sourcesMatch[1].split(',').map((s) => s.trim())
          : ['Ward 16 Heritage Documentation Archive'];

        parsed.push({
          topic,
          keywords,
          content: {
            en: english,
            ne: nepali,
          },
          sources,
        });
      }
    }

    documentSections = parsed;
    console.log(`[ChatService] Successfully loaded and indexed ${documentSections.length} sections from knowledge_base.txt`);
  } catch (err) {
    console.error('[ChatService] Error parsing knowledge_base.txt:', err.message);
  }
}

// Initial load
loadAndParseDocument();

/**
 * Answer visitor inquiries grounded strictly on the text document.
 */
function answerQuery({ query, siteSlug, locale = 'en' }) {
  if (!query || query.trim().length < 2) {
    return {
      error: 'Please enter a valid question.',
      status: 400,
    };
  }

  const cleanQuery = query.trim().toLowerCase();
  const lang = locale === 'ne' ? 'ne' : 'en';

  // 1. Cross-site assistance redirection check
  if (siteSlug === '22-dhara' && (cleanQuery.includes('pyatho') || cleanQuery.includes('प्याठो'))) {
    return {
      answer:
        lang === 'ne'
          ? 'म २२ धाराको समर्पित डिजिटल सहायक हुँ। प्याठो अजिमा मन्दिरबारे जान्न कृपया प्याठो अजिमा पृष्ठको सहायकलाई सोध्नुहोस्।'
          : 'I am the dedicated guide for 22 Dhara (Balaju). For inquiries about Pyatho Ajima Temple, please visit the Pyatho Ajima Heritage Guide.',
      sources: ['Ward 16 Digital Heritage Directory'],
      isCrossSiteRedirect: true,
      verified: true,
    };
  }

  if (
    siteSlug === 'pyatho-ajima' &&
    (cleanQuery.includes('22 dhara') ||
      cleanQuery.includes('baisdhara') ||
      cleanQuery.includes('बाइसधारा') ||
      cleanQuery.includes('बालाजु'))
  ) {
    return {
      answer:
        lang === 'ne'
          ? 'म प्याठो अजिमा मन्दिरको समर्पित सहायक हुँ। २२ धाराबारे जान्न कृपया २२ धारा पृष्ठको सहायकसँग परामर्श गर्नुहोस्।'
          : 'I am the dedicated guide for Pyatho Ajima Temple. For inquiries regarding 22 Dhara, please explore the 22 Dhara Heritage Guide.',
      sources: ['Ward 16 Digital Heritage Directory'],
      isCrossSiteRedirect: true,
      verified: true,
    };
  }

  // 2. Score sections from the text document
  let bestMatch = null;
  let highestScore = 0;

  for (const section of documentSections) {
    // Site-scoping heuristic
    const isSectionFor22Dhara =
      section.topic.toLowerCase().includes('22 dhara') || section.topic.toLowerCase().includes('ward 16');
    const isSectionForPyatho =
      section.topic.toLowerCase().includes('pyatho') || section.topic.toLowerCase().includes('ward 16');

    if (siteSlug === '22-dhara' && !isSectionFor22Dhara) continue;
    if (siteSlug === 'pyatho-ajima' && !isSectionForPyatho) continue;

    let score = 0;

    // Check keyword matches
    for (const kw of section.keywords) {
      if (cleanQuery.includes(kw)) {
        score += 3;
      }
    }

    // Check query tokens in English content
    const englishWords = section.content.en.toLowerCase().split(/\s+/);
    const queryWords = cleanQuery.split(/\s+/).filter((w) => w.length > 3);
    for (const qw of queryWords) {
      if (englishWords.includes(qw)) {
        score += 1;
      }
      if (section.content.ne.includes(qw)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = section;
    }
  }

  // 3. Grounding threshold: if match found in text document, return verified content
  if (bestMatch && highestScore >= 3) {
    return {
      answer: bestMatch.content[lang] || bestMatch.content.en,
      sources: bestMatch.sources,
      verified: true,
      topic: bestMatch.topic,
    };
  }

  // 4. Strict Grounding Fallback: Return exact verified fallback from Section 12
  return {
    answer: fallbackPolicy[lang] || fallbackPolicy.en,
    sources: ['Ward 16 Digital Heritage Archive Policy'],
    verified: false,
    isFallback: true,
  };
}

module.exports = {
  answerQuery,
  reloadDocument: loadAndParseDocument,
  getSectionCount: () => documentSections.length,
};
