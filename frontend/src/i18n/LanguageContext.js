'use client';

/**
 * src/i18n/LanguageContext.js
 *
 * Central React Context and Hook providing bilingual state across the application.
 *
 * Features:
 * - Powered by React's useSyncExternalStore for tear-free, concurrent-safe synchronization.
 * - Persists language in localStorage and cookie (NEXT_LOCALE).
 * - Multi-tab synchronization via window 'storage' listener.
 * - Updates document.documentElement.lang dynamically ('en' / 'ne').
 * - Provides dictionary lookup: t(path, fallback).
 * - Exposes easy toggle/set functions.
 */

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { en } from './dictionaries/en';
import { ne } from './dictionaries/ne';
import { DEFAULT_LOCALE, STORAGE_KEY, COOKIE_KEY } from './config';

const dictionaries = { en, ne };

let currentLanguage = DEFAULT_LOCALE;

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ne' || saved === 'en') {
      currentLanguage = saved;
      document.documentElement.lang = saved;
    }
  } catch {
    // LocalStorage restricted (incognito/sandboxed)
  }
}

const listeners = new Set();

function notifyListeners() {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch {
      // ignore listener error
    }
  });
}

function subscribe(callback) {
  listeners.add(callback);

  const handleStorage = (event) => {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === 'en' || event.newValue === 'ne') &&
      event.newValue !== currentLanguage
    ) {
      currentLanguage = event.newValue;
      document.documentElement.lang = currentLanguage;
      notifyListeners();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

function getSnapshot() {
  return currentLanguage;
}

function getServerSnapshot() {
  return DEFAULT_LOCALE;
}

const LanguageContext = createContext({
  language: DEFAULT_LOCALE,
  setLanguage: () => {},
  t: (path, fallback) => fallback || path,
  dict: en,
  isNepali: false,
  isHydrated: true,
});

export function LanguageProvider({ children }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang) => {
    if (lang !== 'en' && lang !== 'ne') return;
    currentLanguage = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // LocalStorage access restricted
    }

    notifyListeners();
  }, []);

  const dict = useMemo(() => {
    return dictionaries[language] || en;
  }, [language]);

  /**
   * Helper function to look up nested dictionary keys.
   * Example: t('nav.home', 'Home')
   */
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    let current = dict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  }, [dict]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    dict,
    isNepali: language === 'ne',
    isHydrated: true,
  }), [language, setLanguage, t, dict]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
