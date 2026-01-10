'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, defaultLocale, locales } from '@/i18n/config';
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
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname (e.g., /en/about -> en)
  const getLocaleFromPath = (): Locale => {
    if (!pathname) return defaultLocale;

    const segments = pathname.split('/').filter(Boolean);
    const pathLocale = segments[0] as Locale;

    if (locales.includes(pathLocale)) {
      return pathLocale;
    }

    return defaultLocale;
  };

  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [currentMessages, setCurrentMessages] = useState(messages[defaultLocale]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set initial locale from pathname after mount
    const pathLocale = getLocaleFromPath();
    if (pathLocale !== locale) {
      setLocaleState(pathLocale);
      setCurrentMessages(messages[pathLocale]);
    }
  }, []);

  // Update locale when pathname changes
  useEffect(() => {
    if (!isMounted) return;

    const pathLocale = getLocaleFromPath();
    if (pathLocale !== locale) {
      setLocaleState(pathLocale);
      setCurrentMessages(messages[pathLocale]);
    }
  }, [pathname]);

  const setLocale = (newLocale: Locale) => {
    if (!pathname) return;

    // Save to cookie for middleware
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    // Replace the locale in the current path
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = locales.includes(segments[0] as Locale) ? segments[0] : null;

    let newPath: string;
    if (currentLocale) {
      // Replace existing locale
      segments[0] = newLocale;
      newPath = '/' + segments.join('/');
    } else {
      // Add locale to path
      newPath = `/${newLocale}${pathname}`;
    }

    // Update state
    setLocaleState(newLocale);
    setCurrentMessages(messages[newLocale]);

    // Navigate to new path
    router.push(newPath);
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
