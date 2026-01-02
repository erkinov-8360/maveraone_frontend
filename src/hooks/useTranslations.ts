'use client';

import { useState, useEffect } from 'react';
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

export function useTranslations() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [currentMessages, setCurrentMessages] = useState(messages[defaultLocale]);

  useEffect(() => {
    // Load saved locale from localStorage
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

  return { t, locale, setLocale };
}