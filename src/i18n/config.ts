export const locales = ['en', 'uz', 'ru', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  uz: 'O\'zbekcha',
  ru: 'Русский',
  zh: '中文',
};