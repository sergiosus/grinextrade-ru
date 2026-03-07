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

      {/* Product Categories */}
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

      {/* Geography of supply */}
      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-6">{t.home.geographyTitle}</h2>
          <p className="text-gray-medium mb-6">{t.home.geographyIntro}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {t.home.geographyCountries.map((country: string) => (
              <span
                key={country}
                className="px-4 py-2 bg-white rounded-lg font-medium text-brand-black border border-gray-light shadow-sm"
              >
                {country}
              </span>
            ))}
          </div>
          {'geographyNote' in t.home && t.home.geographyNote && (
            <p className="text-gray-medium text-sm">{t.home.geographyNote}</p>
          )}
        </div>
      </section>

      {/* Delivery terms — once */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-black mb-6">{t.home.exportTerms}</h2>
          <p className="text-gray-medium mb-4">{t.home.exportTermsIntro}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {t.home.terms.map((term) => (
              <span
                key={term}
                className="inline-flex items-center gap-2 px-5 py-3 bg-gray-light text-primary font-semibold rounded-lg border border-primary/30"
              >
                {term}
              </span>
            ))}
          </div>
          {'exportTermsEXW' in t.home && t.home.exportTermsEXW && (
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-medium text-sm mt-6">
              <li>{t.home.exportTermsEXW}</li>
              <li>{t.home.exportTermsFCA}</li>
              <li>{t.home.exportTermsDAP}</li>
            </ul>
          )}
          <p className="text-gray-medium text-sm mt-4">{t.home.exportTermsNote}</p>
        </div>
      </section>

      {/* How we work */}
      {'howWeWorkTitle' in t.home && t.home.howWeWorkTitle && (
        <section className="py-16 md:py-20 bg-gray-light">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black text-center mb-10">
              {t.home.howWeWorkTitle}
            </h2>
            <ol className="space-y-4 list-decimal list-inside text-gray-medium">
              {t.home.howWeWorkSteps.map((step: string, i: number) => (
                <li key={i} className="text-brand-black font-medium">{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Why clients trust us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.whyChooseUs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.home.whyItems.map((item) => (
              <div
                key={item}
                className="bg-gray-light rounded-xl p-6 text-center border border-gray-light"
              >
                <p className="font-medium text-brand-black">• {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier profile */}
      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-10">
            {t.home.supplierProfileTitle}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-light shadow-sm overflow-hidden">
            <dl className="divide-y divide-gray-light">
              <div className="px-6 py-4 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-gray-medium">{t.home.supplierProfileCompany}</dt>
                <dd className="mt-1 text-brand-black sm:mt-0">{t.home.supplierProfileCompanyValue || 'Grinex Trade LLC'}</dd>
              </div>
              <div className="px-6 py-4 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-gray-medium">{t.home.supplierProfileBusinessType}</dt>
                <dd className="mt-1 text-brand-black sm:mt-0">{t.home.supplierProfileBusinessTypeValue || 'Export trading company'}</dd>
              </div>
              <div className="px-6 py-4 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-gray-medium">{t.home.supplierProfileProducts}</dt>
                <dd className="mt-1 text-brand-black sm:mt-0">
                  {'supplierProfileProductsList' in t.home && Array.isArray(t.home.supplierProfileProductsList) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {t.home.supplierProfileProductsList.map((p: string) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  ) : (
                    t.home.supplierProfileProductsValue || 'Textile products and industrial sealing components'
                  )}
                </dd>
              </div>
              <div className="px-6 py-4 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-gray-medium">{t.home.supplierProfileExportFormat}</dt>
                <dd className="mt-1 text-brand-black sm:mt-0">{t.home.supplierProfileExportFormatValue || 'B2B contract supply'}</dd>
              </div>
              <div className="px-6 py-4 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-gray-medium">{t.home.supplierProfileDeliveryTerms}</dt>
                <dd className="mt-1 text-brand-black sm:mt-0">{t.home.supplierProfileDeliveryTermsValue || 'EXW / FCA / DAP'}</dd>
              </div>
              <div className="px-6 py-4 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-gray-medium">{t.home.supplierProfileDocumentation}</dt>
                <dd className="mt-1 text-brand-black sm:mt-0">
                  <ul className="list-disc list-inside space-y-1">
                    {t.home.supplierProfileDocList.map((doc: string) => (
                      <li key={doc}>{doc}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.industriesServed}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {(t.home.industriesHome || t.home.industries).map((ind: string) => (
              <div
                key={ind}
                className="bg-gray-light rounded-xl p-6 text-center border border-gray-light"
              >
                <p className="font-medium text-brand-black">{ind}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
