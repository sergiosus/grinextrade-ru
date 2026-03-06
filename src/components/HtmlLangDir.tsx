'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { isRtl } from '@/lib/i18n/config';

const localeToHtmlLang: Record<Locale, string> = {
  ru: 'ru',
  en: 'en',
  kz: 'kk',
  uz: 'uz',
  kg: 'ky',
  tj: 'tg',
};

type Props = { locale: Locale };

export function HtmlLangDir({ locale }: Props) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = localeToHtmlLang[locale];
    html.dir = isRtl(locale) ? 'rtl' : 'ltr';
  }, [locale]);
  return null;
}
