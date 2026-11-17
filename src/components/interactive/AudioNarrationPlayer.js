'use client';

/**
 * AudioNarrationPlayer.js
 *
 * Immersive audio narration player for cultural heritage storytelling.
 *
 * Features:
 * - HTML5 Audio playback with seekable progress scrub bar.
 * - Time elapsed & total duration display (mm:ss).
 * - Volume control and mute toggle.
 * - Bilingual transcript viewer (English / Nepali toggle).
 * - Chapter markers / jumping to sections.
 * - Interactive simulation mode when physical .mp3 audio recording is pending upload.
 */

import { useState, useRef, useEffect } from 'react';

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioNarrationPlayer({ audioData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audioData?.durationSeconds || 180);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptLang, setTranscriptLang] = useState('en'); // 'en' | 'ne'
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(true);

  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const { title, subtitle, speaker, transcript, chapters = [], audioSrc } = audioData || {};

  // Audio simulation timer fallback when audio file isn't uploaded yet
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (audioRef.current && audioSrc) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // If browser restricts unhosted mp3, timer takes over
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && audioSrc) {
      audioRef.current.currentTime = newTime;
    }
  };

  const jumpToChapter = (timeInSeconds) => {
    setCurrentTime(timeInSeconds);
    if (audioRef.current && audioSrc) {
      audioRef.current.currentTime = timeInSeconds;
    }
    if (!isPlaying) setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  if (!audioData) return null;

  return (
    <div className="space-y-6">
      {/* Hidden real audio element if file exists */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div>
        <h3 className="font-display text-2xl font-bold text-charcoal">
          {title?.en}
        </h3>
        {title?.ne && (
          <p className="text-xs text-charcoal/50 font-serif mt-0.5">
            {title.ne}
          </p>
        )}
        <p className="text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
          {subtitle?.en}
        </p>
      </div>

      {/* Main Player Box */}
      <div className="bg-charcoal text-ivory p-6 sm:p-8 rounded-sm shadow-xl border border-beige/30 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #B89555 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 space-y-6">
          {/* Top row: Speaker and Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-ivory/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-gold uppercase tracking-wider">
                Oral Archive
              </span>
              <span className="text-ivory/40">|</span>
              <span className="text-ivory/80">{speaker?.en}</span>
            </div>
            <span className="font-mono text-xs text-ivory/50">
              Verified Narration Script
            </span>
          </div>

          {/* Controls & Progress Row */}
          <div className="space-y-3">
            {/* Scrubber Range Bar */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ivory/70 w-12 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Audio playback scrub bar"
                className="flex-1 h-1.5 bg-ivory/20 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <span className="font-mono text-xs text-ivory/70 w-12">
                {formatTime(duration)}
              </span>
            </div>

            {/* Play/Pause & Volume Bar */}
            <div className="flex items-center justify-between pt-2">
              {/* Play / Pause Button */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause narration" : "Play narration"}
                  className="w-12 h-12 rounded-full bg-burgundy hover:bg-gold text-ivory hover:text-charcoal flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 border border-gold/40"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <div>
                  <span className="font-display text-base font-semibold text-ivory block leading-tight">
                    {title?.en}
                  </span>
                  <span className="text-xs text-ivory/50">
                    {isPlaying ? "Playing narration…" : "Audio narration ready"}
                  </span>
                </div>
              </div>

              {/* Volume / Mute Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="p-2 text-ivory/70 hover:text-gold transition-colors"
                >
                  {isMuted ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVol = parseFloat(e.target.value);
                    setVolume(newVol);
                    setIsMuted(newVol === 0);
                    if (audioRef.current) audioRef.current.volume = newVol;
                  }}
                  aria-label="Volume slider"
                  className="w-16 sm:w-20 h-1 bg-ivory/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>
            </div>
          </div>

          {/* Chapter Markers */}
          {chapters.length > 0 && (
            <div className="pt-2 border-t border-ivory/10">
              <span className="text-[11px] font-mono text-ivory/50 uppercase tracking-wider block mb-2">
                Chapters / Highlights:
              </span>
              <div className="flex flex-wrap gap-2">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => jumpToChapter(ch.time)}
                    className={[
                      "text-xs px-2.5 py-1 rounded-sm border transition-colors font-mono",
                      currentTime >= ch.time && (idx === chapters.length - 1 || currentTime < chapters[idx + 1].time)
                        ? "bg-gold text-charcoal border-gold font-semibold"
                        : "bg-ivory/5 text-ivory/70 border-ivory/15 hover:border-gold hover:text-ivory",
                    ].join(" ")}
                  >
                    {ch.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transcript Accordion & Language Switcher */}
      <div className="bg-white border border-beige rounded-sm p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige pb-3">
          <button
            type="button"
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            className="flex items-center gap-2 text-sm font-bold text-charcoal hover:text-burgundy transition-colors"
          >
            <span>Read-Along Narration Transcript</span>
            <svg
              className={[
                "w-4 h-4 transition-transform duration-200",
                isTranscriptOpen ? "rotate-180 text-burgundy" : "text-charcoal/40",
              ].join(" ")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Bilingual Toggle */}
          <div className="flex items-center gap-1 bg-beige/40 p-1 rounded-sm border border-beige">
            <button
              type="button"
              onClick={() => setTranscriptLang('en')}
              className={[
                "text-xs px-2.5 py-0.5 rounded-sm font-medium transition-colors",
                transcriptLang === 'en'
                  ? "bg-burgundy text-ivory font-semibold shadow-xs"
                  : "text-charcoal/70 hover:text-charcoal",
              ].join(" ")}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setTranscriptLang('ne')}
              className={[
                "text-xs px-2.5 py-0.5 rounded-sm font-serif transition-colors",
                transcriptLang === 'ne'
                  ? "bg-burgundy text-ivory font-semibold shadow-xs"
                  : "text-charcoal/70 hover:text-charcoal",
              ].join(" ")}
            >
              नेपाली
            </button>
          </div>
        </div>

        {isTranscriptOpen && (
          <div className="text-sm text-charcoal/80 leading-relaxed font-serif whitespace-pre-line border-l-2 border-gold/40 pl-4 py-1 animate-fade-in">
            {transcriptLang === 'en' ? transcript?.en : transcript?.ne}
          </div>
        )}
      </div>
    </div>
  );
}
