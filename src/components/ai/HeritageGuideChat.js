"use client";

/**
 * src/components/ai/HeritageGuideChat.js
 *
 * Floating Side Concierge AI Heritage Assistant for 22 Dhara and Pyatho Ajima Temple.
 *
 * Appears as an elegant floating side button that opens into a side concierge drawer,
 * allowing visitors to query verified historical, architectural, and cultural
 * information while exploring any section of the heritage page.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeritageGuideChat({ siteSlug, siteName }) {
  const { isNepali, language } = useLanguage();
  const counterRef = useRef(1);
  const messagesEndRef = useRef(null);

  const [isOpen, setIsOpen] = useState(true);

  const suggestedQuestions =
    siteSlug === "22-dhara"
      ? [
          { en: "What is 22 Dhara?", ne: "२२ धारा के हो र यसको परिचय के छ?" },
          { en: "What makes its water spouts significant?", ne: "यी ढुङ्गेधाराको विशेषता के हो?" },
          { en: "What architectural features can I observe?", ne: "यसमा कुन वास्तुकला देख्न सकिन्छ?" },
          { en: "What historical information is documented?", ne: "२२ धाराबारे कुन राजाको इतिहास छ?" },
        ]
      : [
          { en: "What is Pyatho Ajima Temple?", ne: "प्याठो अजिमा मन्दिरको परिचय के हो?" },
          { en: "What is known about its history?", ne: "यस मन्दिरको ऐतिहासिक पृष्ठभूमि के छ?" },
          { en: "What architectural features can visitors observe?", ne: "मन्दिरको काष्ठकला र टुँडालमा के छ?" },
          { en: "What cultural information has been documented?", ne: "यहाँको दाफा भजन र गुठी के हो?" },
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

  // Scroll to bottom of message history when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = useCallback(
    async (textToSend) => {
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
    },
    [inputQuery, isLoading, isNepali, language, siteSlug]
  );

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
    <>
      {/* ── FLOATING SIDE BUTTON (When chat is closed) ── */}
      {!isOpen && (
        <aside
          className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center"
          aria-label="AI Heritage Guide Assistant"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 bg-charcoal hover:bg-charcoal-soft text-ivory rounded-full shadow-elevated border border-gold/60 transition-all duration-300 hover:scale-103 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-expanded={false}
            aria-controls="heritage-guide-drawer"
          >
            {/* Pulsing indicator icon */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
            </span>

            <span className="font-display font-semibold text-xs sm:text-sm text-gold tracking-wide">
              ◈ {isNepali ? "सम्पदा गाइड" : "AI Heritage Guide"}
            </span>

            <span className="hidden sm:inline-block text-[11px] font-body text-ivory/70 border-l border-gold/30 pl-2">
              {siteName}
            </span>
          </button>
        </aside>
      )}

      {/* ── FLOATING SIDE CHAT PANEL (When open) ── */}
      {isOpen && (
        <aside
          id="heritage-guide-drawer"
          className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] md:w-[430px] h-[580px] max-h-[85vh] bg-ivory border border-gold/50 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-labelledby="guide-title"
          aria-modal="false"
        >
          {/* Header */}
          <div className="bg-charcoal text-ivory px-4 py-3.5 flex items-center justify-between border-b border-gold/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-display font-bold text-base shrink-0">
                ◈
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="guide-title" className="font-display font-semibold text-sm sm:text-base text-ivory truncate max-w-[200px] sm:max-w-[230px]">
                    {siteName}
                  </h3>
                  <span className="px-1.5 py-0.2 bg-gold/20 text-gold text-[9px] font-mono uppercase tracking-wider rounded-xs">
                    RAG
                  </span>
                </div>
                <p className="text-[10px] text-ivory/60 font-body">
                  {isNepali ? "प्रमाणित डिजिटल सम्पदा सहायक" : "Verified Archival Guide"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="text-[11px] font-mono text-ivory/50 hover:text-gold transition-colors underline mr-1"
                title="Reset conversation"
              >
                {isNepali ? "खाली" : "Clear"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-ivory/10 hover:bg-ivory/20 text-ivory flex items-center justify-center text-xs transition-colors"
                aria-label="Minimize AI Guide"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="p-2.5 bg-beige/30 border-b border-beige overflow-x-auto flex items-center gap-1.5 text-xs scrollbar-none">
            <span className="text-[10px] font-mono text-charcoal/50 uppercase shrink-0">
              {isNepali ? "सुझाव:" : "Suggested:"}
            </span>
            {suggestedQuestions.map((q, idx) => {
              const qText = isNepali ? q.ne : q.en;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qText)}
                  disabled={isLoading}
                  className="px-2.5 py-1 bg-ivory hover:bg-beige border border-beige hover:border-gold/60 text-charcoal/80 rounded-sm whitespace-nowrap transition-colors shrink-0 text-left text-[11px]"
                >
                  {qText}
                </button>
              );
            })}
          </div>

          {/* Message History Container */}
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto bg-ivory/50">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-lg text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-burgundy text-ivory rounded-br-xs font-body shadow-xs"
                        : "bg-beige/40 text-charcoal border border-beige rounded-bl-xs font-body shadow-xs"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Sources pill on assistant answers */}
                    {!isUser && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-beige/60 text-[10px] font-mono text-charcoal/65 flex flex-wrap items-center gap-1">
                        <span className="font-semibold text-burgundy">
                          {isNepali ? "स्रोत:" : "Sources:"}
                        </span>
                        {msg.sources.map((src, i) => (
                          <span key={i} className="px-1 py-0.5 bg-ivory border border-beige rounded-xs italic">
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-charcoal/40 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-2.5 bg-beige/30 text-charcoal/60 text-xs rounded-sm w-fit">
                <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
                <span className="text-[11px] font-body">
                  {isNepali ? "अभिलेखालय खोजी गर्दै..." : "Consulting verified archives…"}
                </span>
              </div>
            )}

            {errorNotice && (
              <div className="p-2.5 bg-terracotta/10 border-l-2 border-terracotta text-xs text-terracotta">
                {errorNotice}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-beige/25 border-t border-beige flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                isNepali
                  ? `${siteName} बारे सोध्नुहोस्...`
                  : `Ask about ${siteName}…`
              }
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs bg-ivory text-charcoal border border-beige focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold rounded-sm transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2 bg-burgundy hover:bg-burgundy-light disabled:bg-charcoal/30 text-ivory font-body font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs"
            >
              {isNepali ? "सोध्नुहोस्" : "Ask"}
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
