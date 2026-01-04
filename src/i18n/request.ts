import { getRequestConfig } from 'next-intl/server';
import { Locale, defaultLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = (locale as Locale) || defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}.json`)).default,
  };
});