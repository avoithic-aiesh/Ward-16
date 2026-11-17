"use client";

/**
 * src/components/ai/HeritageGuideChat.js
 *
 * Contextual AI Heritage Assistant for 22 Dhara and Pyatho Ajima Temple.
 * Grounded strictly on verified historical documentation with bilingual support.
 */

import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeritageGuideChat({ siteSlug, siteName }) {
  const { isNepali, language } = useLanguage();
  const counterRef = useRef(1);

  const suggestedQuestions =
    siteSlug === "22-dhara"
      ? [
          { en: "What is 22 Dhara?", ne: "२२ धारा के हो र यसको परिचय के छ?" },
          { en: "What makes its water spouts significant?", ne: "यी ढुङ्गेधाराको महत्त्व र विशेषता के हो?" },
          { en: "What architectural features can I observe?", ne: "यसमा कुन वास्तुकला र मकर आकृति देख्न सकिन्छ?" },
          { en: "What historical information is documented?", ne: "२२ धाराको स्थापनाबारे कुन राजाको इतिहास छ?" },
        ]
      : [
          { en: "What is Pyatho Ajima Temple?", ne: "प्याठो अजिमा मन्दिरको धार्मिक परिचय के हो?" },
          { en: "What is known about its history?", ne: "यस मन्दिरको ऐतिहासिक पृष्ठभूमि के छ?" },
          { en: "What architectural features can visitors observe?", ne: "मन्दिरको काष्ठकला र टुँडालमा के कुँदिएको छ?" },
          { en: "What cultural information has been documented?", ne: "यहाँको दाफा भजन र गुठी परम्परा के हो?" },
        ];

  const defaultGreeting = isNepali
    ? `नमस्कार! म ${siteName} को समर्पित डिजिटल सम्पदा सहायक हुँ। तपाईं यस सम्पदाको इतिहास, वास्तुकला वा चाडपर्वबारे प्रमाणित जानकारी सोध्न सक्नुहुन्छ।`
    : `Greetings! I am the verified digital guide for ${siteName}. Ask me anything about this site's documented history, Newari architecture, or living traditions.`;

  const [messages, setMessages] = useState([
    {
      id: "init-0",
      sender: "assistant",
      text: defaultGreeting,
      sources: ["Ward 16 Digital Heritage Archive"],
      verified: true,
      time: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");

  const handleSendMessage = useCallback(async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    setErrorNotice("");
    counterRef.current += 1;
    const userMsgId = `user-msg-${counterRef.current}`;

    const userMsg = {
      id: userMsgId,
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/heritage-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          siteSlug,
          locale: language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reach AI assistant");
      }

      counterRef.current += 1;
      const assistantMsg = {
        id: `assistant-msg-${counterRef.current}`,
        sender: "assistant",
        text: data.answer,
        sources: data.sources || [],
        verified: Boolean(data.verified),
        time: "Just now",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    } catch {
      setErrorNotice(
        isNepali
          ? "सहायकसँग सम्पर्क हुन सकेन। कृपया पुनः प्रयास गर्नुहोस्।"
          : "Could not reach the assistant. Please try again."
      );
      setIsLoading(false);
    }
  }, [inputQuery, isLoading, isNepali, language, siteSlug]);

  const handleClearChat = useCallback(() => {
    counterRef.current += 1;
    setMessages([
      {
        id: `init-${counterRef.current}`,
        sender: "assistant",
        text: defaultGreeting,
        sources: ["Ward 16 Digital Heritage Archive"],
        verified: true,
        time: "Just now",
      },
    ]);
    setErrorNotice("");
  }, [defaultGreeting]);

  return (
    <section
      id="ai-guide"
      className="max-w-4xl mx-auto my-16 bg-ivory border border-gold/40 rounded-sm shadow-card overflow-hidden"
      aria-label={`${siteName} AI Heritage Guide`}
    >
      {/* Header */}
      <div className="bg-charcoal text-ivory p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-display text-xl font-bold">
            ◈
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-lg sm:text-xl text-ivory">
                {isNepali ? `${siteName} — डिजिटल सम्पदा सहायक` : `${siteName} — Heritage Guide`}
              </h3>
              <span className="px-2 py-0.5 bg-gold/20 text-gold text-[10px] font-mono uppercase tracking-wider rounded-xs">
                {isNepali ? "प्रमाणित RAG" : "Verified RAG"}
              </span>
            </div>
            <p className="text-xs text-ivory/60 font-body">
              {isNepali
                ? "केवल प्रमाणित ऐतिहासिक तथा सांस्कृतिक अभिलेखमा आधारित"
                : "Grounded strictly in verified architectural & historical archives"}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="text-xs font-mono text-ivory/60 hover:text-gold transition-colors underline"
          title="Reset conversation"
        >
          {isNepali ? "कुराकानी खाली गर्नुहोस्" : "Clear Chat"}
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-4 bg-beige/30 border-b border-beige overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-[11px] font-mono text-charcoal/60 uppercase shrink-0">
          {isNepali ? "सुझाव:" : "Suggested:"}
        </span>
        {suggestedQuestions.map((q, idx) => {
          const qText = isNepali ? q.ne : q.en;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(qText)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-ivory hover:bg-beige border border-beige hover:border-gold/60 text-charcoal/80 rounded-sm whitespace-nowrap transition-colors shrink-0 text-left"
            >
              {qText}
            </button>
          );
        })}
      </div>

      {/* Message History Container */}
      <div className="p-6 sm:p-8 space-y-5 max-h-[460px] overflow-y-auto bg-ivory/50">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] p-4 rounded-sm text-sm sm:text-base leading-relaxed ${
                  isUser
                    ? "bg-burgundy text-ivory rounded-br-xs font-body"
                    : "bg-beige/40 text-charcoal border border-beige rounded-bl-xs font-body"
                }`}
              >
                <p>{msg.text}</p>

                {/* Sources pill on assistant answers */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-beige/60 text-[11px] font-mono text-charcoal/65 flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-burgundy">
                      {isNepali ? "प्रमाणित स्रोत:" : "Verified Sources:"}
                    </span>
                    {msg.sources.map((src, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-ivory border border-beige rounded-xs italic">
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-charcoal/40 px-1">
                {msg.time}
              </span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-beige/30 text-charcoal/60 text-xs rounded-sm w-fit">
            <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span>{isNepali ? "अभिलेखालय खोजी गर्दै..." : "Consulting verified heritage records…"}</span>
          </div>
        )}

        {errorNotice && (
          <div className="p-3 bg-terracotta/10 border-l-3 border-terracotta text-xs text-terracotta">
            {errorNotice}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 bg-beige/25 border-t border-beige flex gap-3"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={
            isNepali
              ? `${siteName} बारे प्रश्न सोध्नुहोस्...`
              : `Ask a question about ${siteName}…`
          }
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 text-sm bg-ivory text-charcoal border border-beige focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold rounded-sm transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="px-5 py-2.5 bg-burgundy hover:bg-burgundy-light disabled:bg-charcoal/30 text-ivory font-body font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs"
        >
          {isNepali ? "सोध्नुहोस्" : "Ask"}
        </button>
      </form>
    </section>
  );
}
