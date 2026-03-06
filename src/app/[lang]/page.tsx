import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata, OrganizationJsonLd } from '@/components/Seo';
import { HeroSection } from '@/components/HeroSection';
import Link from 'next/link';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: '',
    description: t.home.metaDescription,
    path: '',
    locale: lang,
  });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <>
      <OrganizationJsonLd />
      <HeroSection lang={lang} t={t} />

      <section className="py-8 bg-white border-b border-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-medium text-lg">
            {t.home.cisRegionBlurb}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.productCategories}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href={`/${lang}/products?category=textile`}
              className="block rounded-2xl border border-gray-light overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="aspect-[4/3] bg-gray-light">
                <img src="/images/waffle-towels.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">{t.home.textileProducts}</h3>
                <ul className="space-y-2 text-gray-medium">
                  {t.home.textileItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </Link>
            <Link
              href={`/${lang}/products?category=oilgas`}
              className="block rounded-2xl border border-gray-light overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="aspect-[4/3] bg-gray-light">
                <img src="/images/orings.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">{t.home.oilGasProducts}</h3>
                <ul className="space-y-2 text-gray-medium">
                  {t.home.oilGasItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12 tracking-wide">
            {t.home.globalExportTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {t.home.globalExportItems.map((item, i) => (
              <div
                key={item}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-light flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {i === 0 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </span>
                <p className="font-medium text-brand-black">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {t.home.terms.map((term) => (
              <span
                key={term}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-primary font-semibold rounded-lg border border-primary/30 shadow-sm"
              >
                <svg className="w-5 h-5 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.whyChooseUs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.home.whyItems.map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-light"
              >
                <p className="font-medium text-brand-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.b2bSectorsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.home.b2bSectorsItems.map((ind) => (
              <div
                key={ind}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-light hover:shadow-md transition"
              >
                <p className="font-medium text-brand-black">{ind}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.logisticsTitle}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            {t.home.logisticsItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-medium">
                <span className="text-primary">•</span> {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4">
            {t.home.terms.map((term) => (
              <span
                key={term}
                className="inline-flex items-center gap-2 px-5 py-3 bg-gray-light text-primary font-semibold rounded-lg border border-primary/30"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.geographyTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {t.home.geographyCountries.map((country) => (
              <span
                key={country}
                className="px-5 py-3 bg-white rounded-xl font-medium text-brand-black border border-gray-light shadow-sm"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-6">
            {t.home.trustedPartnerTitle}
          </h2>
          <p className="text-gray-medium text-lg leading-relaxed mb-4">
            {t.home.trustedPartnerP1}
          </p>
          <p className="text-gray-medium text-lg leading-relaxed">
            {t.home.trustedPartnerP2}
          </p>
        </div>
      </section>

    </>
  );
}
