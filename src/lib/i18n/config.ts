export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const localeNames: Record<Locale, string> = {
  ru: 'Русский (ru)',
  en: 'English (en)',
};

export const rtlLocales: Locale[] = [];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const browserLocaleMap: Record<string, Locale> = {
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',
  ru: 'ru',
  'ru-RU': 'ru',
};

export function getLocaleFromBrowser(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const parts = acceptLanguage.split(',').map((s) => s.trim().split(';')[0]);
  for (const part of parts) {
    const lang = part.split('-')[0].toLowerCase();
    if (locales.includes(lang as Locale)) return lang as Locale;
    const mapped = browserLocaleMap[part];
    if (mapped) return mapped;
  }
  return defaultLocale;
}
