"use client";

/**
 * src/components/ui/ScrollReveal.js
 *
 * Lightweight scroll-triggered reveal animation.
 * Uses the browser's IntersectionObserver API — zero dependencies.
 *
 * HOW IT WORKS:
 * 1. The wrapped element starts invisible (opacity-0, translated).
 * 2. When it enters the viewport, we add a CSS class that triggers
 *    a CSS animation (defined in globals.css).
 * 3. The `once` prop (default true) means the animation only runs once.
 *
 * ACCESSIBILITY:
 * When prefers-reduced-motion is active, the CSS in globals.css
 * sets animation-duration to 0.01ms, so the element appears instantly.
 *
 * Usage:
 *   <ScrollReveal animation="fade-up" delay={200}>
 *     <MyContent />
 *   </ScrollReveal>
 *
 * animation: "fade-up" | "fade-in" | "fade-left" | "fade-right"
 * delay:     milliseconds before the animation starts (100–800)
 * threshold: how much of the element must be visible (0–1)
 */

import { useEffect, useRef, useState } from "react";

const ANIMATION_CLASSES = {
  "fade-up":    "animate-fade-up",
  "fade-in":    "animate-fade-in",
  "fade-left":  "animate-fade-left",
  "fade-right": "animate-fade-right",
};

const DELAY_CLASSES = {
  0:   "",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
  600: "delay-600",
  700: "delay-700",
  800: "delay-800",
};

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  className = "",
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing — animation runs once
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const animClass   = ANIMATION_CLASSES[animation] || ANIMATION_CLASSES["fade-up"];
  const delayClass  = DELAY_CLASSES[delay] || "";

  return (
    <div
      ref={ref}
      className={`
        ${isVisible ? `${animClass} ${delayClass}` : "opacity-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
