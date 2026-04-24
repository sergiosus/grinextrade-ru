import type { Locale } from '@/lib/i18n/config';

export const COMPANY = {
  brand: 'Grinex Trade',
  legalNameByLocale: {
    ru: 'ООО «Гринекс Трейд»',
    en: 'Grinex Trade LLC',
  } satisfies Record<Locale, string>,
  directorNameByLocale: {
    ru: 'Гришина Марина Владимировна',
    en: 'Marina Grishina',
  } satisfies Record<Locale, string>,
  contacts: {
    email: 'info@grinextrade.ru',
    tenderEmail: 'tender@grinextrade.ru',
    supportEmail: 'support@grinextrade.ru',
    phoneE164: '+7-912-447-54-19',
    phoneDisplay: '+7 912 447 54 19',
    phoneDigitsWa: '79124475419',
    telegramUrl: 'https://t.me/grinextrade',
    whatsappUrl: 'https://wa.me/79124475419',
  },
} as const;

