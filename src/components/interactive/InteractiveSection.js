'use client';

/**
 * InteractiveSection.js
 *
 * Unified container uniting all five Module 6 Interactive Heritage Experiences:
 * 1. Clickable Image Hotspots
 * 2. Then-and-Now Comparison Slider
 * 3. Audio Narration Player & Transcript
 * 4. Educational Heritage Quiz
 * 5. 360-Degree Virtual Tour
 *
 * Tabbed navigation for smooth exploration on desktop and mobile.
 */

import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import ImageHotspots from './ImageHotspots';
import ComparisonSlider from './ComparisonSlider';
import AudioNarrationPlayer from './AudioNarrationPlayer';
import HeritageQuiz from './HeritageQuiz';
import VirtualTourViewer from './VirtualTourViewer';
import { useLanguage } from '@/i18n/LanguageContext';

export default function InteractiveSection({ data, heritageName = "Heritage Site" }) {
  const [activeTab, setActiveTab] = useState('hotspots');
  const { t, isNepali } = useLanguage();

  if (!data) return null;

  const tabs = [
    {
      id: 'hotspots',
      label: t('interactive.tabs.hotspots', 'Image Hotspots'),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      id: 'comparison',
      label: t('interactive.tabs.comparison', 'Then & Now Slider'),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="8 7 3 12 8 17" />
          <polyline points="16 7 21 12 16 17" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: 'audio',
      label: t('interactive.tabs.audio', 'Audio Narration'),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ),
    },
    {
      id: 'quiz',
      label: t('interactive.tabs.quiz', 'Heritage Quiz'),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      id: 'tour',
      label: t('interactive.tabs.tour', '360° Virtual Tour'),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="interactive-experiences" className="py-20 bg-ivory text-charcoal border-t border-beige">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("interactive.suiteEyebrow", "Interactive Heritage Suite")}
          title={isNepali ? "अन्तरक्रियात्मक सम्पदा अनुभव" : `Explore ${heritageName} Interactively`}
          subtitle={t(
            "interactive.suiteSubtitle",
            "Educational, engaging and immersive digital tools to discover architectural craft, historic transformations, and living culture."
          )}
          align="center"
        />

        {/* Tab Switcher Bar */}
        <div className="mt-12 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 bg-beige/40 rounded-sm border border-beige shadow-xs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={[
                    "flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-all duration-150",
                    isActive
                      ? "bg-burgundy text-ivory shadow-xs"
                      : "text-charcoal/70 hover:text-charcoal hover:bg-ivory/80",
                  ].join(" ")}
                >
                  <span className={isActive ? "text-gold" : "text-charcoal/50"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="mt-10 min-h-[500px]">
          {activeTab === 'hotspots' && (
            <div className="animate-fade-in">
              <ImageHotspots hotspotData={data.hotspots} />
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="animate-fade-in">
              <ComparisonSlider comparisonData={data.comparison} />
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="animate-fade-in">
              <AudioNarrationPlayer audioData={data.audio} />
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="animate-fade-in">
              <HeritageQuiz quizData={data.quiz} />
            </div>
          )}

          {activeTab === 'tour' && (
            <div className="animate-fade-in">
              <VirtualTourViewer tourData={data.virtualTour} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
