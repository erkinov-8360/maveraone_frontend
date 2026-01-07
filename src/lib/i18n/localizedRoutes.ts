import { locales } from '@/i18n/config';

/**
 * Get the locale from a pathname
 * @param pathname - The current pathname (e.g., /en/dashboard)
 * @returns The locale (e.g., 'en') or 'en' as default
 */
export function getLocaleFromPathname(pathname: string): string {
  if (!pathname) return 'en';

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (locales.includes(firstSegment as any)) {
    return firstSegment;
  }

  return 'en';
}

/**
 * Add locale prefix to a path
 * @param path - The path to localize (e.g., '/dashboard')
 * @param locale - The locale to use (e.g., 'en')
 * @returns The localized path (e.g., '/en/dashboard')
 */
export function getLocalizedPath(path: string, locale: string = 'en'): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Check if path already has a locale
  const segments = cleanPath.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as any)) {
    return cleanPath;
  }

  return `/${locale}${cleanPath}`;
}
