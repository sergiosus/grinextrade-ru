export const locales = ['ru', 'en', 'kz', 'uz', 'kg', 'tj'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  kz: 'Қазақша',
  uz: 'Oʻzbekcha',
  kg: 'Кыргызча',
  tj: 'Тоҷикӣ',
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
  kz: 'kz',
  'kk-KZ': 'kz',
  'kk': 'kz',
  uz: 'uz',
  'uz-UZ': 'uz',
  kg: 'kg',
  'ky-KG': 'kg',
  'ky': 'kg',
  tj: 'tj',
  'tg-TJ': 'tj',
  'tg': 'tj',
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
