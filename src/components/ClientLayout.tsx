'use client';

import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { QuoteModalProvider } from '@/contexts/QuoteModalContext';
import { CookieConsentProvider } from '@/components/CookieConsent';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  locale: Locale;
  translations: Translations;
};

export function ClientLayout({ children, locale, translations }: Props) {
  return (
    <CookieConsentProvider locale={locale} translations={translations}>
      <QuoteModalProvider locale={locale} translations={translations}>
        <Header locale={locale} translations={translations} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} translations={translations} />
      </QuoteModalProvider>
    </CookieConsentProvider>
  );
}
