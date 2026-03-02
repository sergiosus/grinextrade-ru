import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.government.title,
    description: t.government.intro + ' - Grinex Trade LLC',
    path: '/government',
    locale: lang,
  });
}

export default async function GovernmentPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
          {t.government.title}
        </h1>
        <p className="text-lg text-gray-medium mb-10">{t.government.intro}</p>

        <div className="bg-white border border-gray-light rounded-2xl shadow-sm p-6 md:p-8">
          <section>
            <h2 className="text-xl font-semibold text-brand-black mb-4">{t.government.documentsAvailable}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-medium">
              {t.government.documents.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </section>

          <section className="pt-6 mt-6 border-t border-gray-light">
            <h2 className="text-xl font-semibold text-brand-black mb-4">{t.home.industriesServed}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-medium">
              {t.government.industries.map((ind) => (
                <li key={ind}>{ind}</li>
              ))}
            </ul>
          </section>

          <section className="pt-6 mt-6 border-t border-gray-light">
            <h2 className="text-xl font-semibold text-brand-black mb-4">{t.government.tenderContact}</h2>
            <p className="text-gray-medium">
              <a
                href="mailto:tender@grinextrade.com"
                className="text-primary hover:text-accent-red hover:underline font-medium"
              >
                tender@grinextrade.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
