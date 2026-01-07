'use client';

import { usePathname } from 'next/navigation';
import { locales } from '@/i18n/config';

export function useLocalizedPath() {
  const pathname = usePathname();

  const getLocalizedPath = (path: string): string => {
    if (!pathname) return path;

    // Extract current locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = locales.includes(segments[0] as any) ? segments[0] : 'en';

    // If path already has a locale prefix, return as is
    if (locales.some(locale => path.startsWith(`/${locale}/`) || path === `/${locale}`)) {
      return path;
    }

    // Add locale prefix to path
    return `/${currentLocale}${path}`;
  };

  return { getLocalizedPath };
}
