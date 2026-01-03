'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale } from '@/i18n/config';
import enMessages from '../../messages/en.json';
import uzMessages from '../../messages/uz.json';
import ruMessages from '../../messages/ru.json';
import zhMessages from '../../messages/zh.json';

const messages = {
  en: enMessages,
  uz: uzMessages,
  ru: ruMessages,
  zh: zhMessages,
};

interface TranslationsContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [currentMessages, setCurrentMessages] = useState(messages[defaultLocale]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load saved locale from localStorage on mount
    const savedLocale = (localStorage.getItem('locale') || defaultLocale) as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'uz' || savedLocale === 'ru' || savedLocale === 'zh')) {
      setLocaleState(savedLocale);
      setCurrentMessages(messages[savedLocale]);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setCurrentMessages(messages[newLocale]);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = currentMessages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Show loading screen until we've loaded the locale from localStorage
  // This prevents hydration mismatch and flash of wrong language
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <TranslationsContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useTranslations must be used within TranslationsProvider');
  }
  return context;
}
