import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grinextrade.ru';
const baseTitleRu = 'Grinex Trade — поставщик промышленной и текстильной продукции | B2B';
const baseDescriptionRu =
  'Grinex Trade — поставщик текстильной и промышленной продукции для B2B клиентов в России и странах СНГ. Оптовые поставки и коммерческие предложения по запросу.';
const baseTitleEn = 'Grinex Trade – Supplier of industrial and textile products | B2B';
const baseDescriptionEn =
  'Grinex Trade supplies textile and industrial products for B2B clients in Russia and CIS. Wholesale delivery and quotations on request.';

type Props = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  noIndex?: boolean;
};

const localeAlternates: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  kz: 'kk_KZ',
  uz: 'uz_UZ',
  kg: 'ky_KG',
  tj: 'tg_TJ',
};

function getBaseTitle(locale: Locale): string {
  return locale === 'en' ? baseTitleEn : baseTitleRu;
}

function getBaseDescription(locale: Locale): string {
  return locale === 'en' ? baseDescriptionEn : baseDescriptionRu;
}

export function generateSeoMetadata({ title, description, path, locale, noIndex }: Props): Metadata {
  const url = `${siteUrl}/${locale}${path}`;
  const lang = localeAlternates[locale];
  const baseTitle = getBaseTitle(locale);
  const baseDescription = getBaseDescription(locale);
  const resolvedTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const resolvedDescription = description || baseDescription;
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: 'Grinex Trade',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Grinex Trade',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: baseDescriptionRu,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@grinextrade.ru',
      telephone: '+7-912-447-54-19',
      contactType: 'customer service',
      areaServed: ['RU', 'KZ', 'UZ', 'KG', 'TJ', 'BY'],
    },
    sameAs: ['https://t.me/grinextrade'],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
