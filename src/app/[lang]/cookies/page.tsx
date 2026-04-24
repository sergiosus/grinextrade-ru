import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { COMPANY } from '@/lib/company';

const EMAIL = COMPANY.contacts.email;

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.cookies.title,
    description: t.cookies.pageIntro,
    path: '/cookies',
    locale: lang,
  });
}

export default async function CookiesPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
          {t.cookies.title}
        </h1>
        <div className="bg-white border border-gray-light rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
          <p className="text-gray-medium">{t.cookies.pageIntro}</p>

          <section>
            <h2 className="text-xl font-semibold text-brand-black mb-2">
              {t.cookies.whatAreCookies}
            </h2>
            <p className="text-gray-medium">{t.cookies.whatAreCookiesP}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-black mb-2">
              {t.cookies.typesTitle}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-medium">
              <li>{t.cookies.typesNecessary}</li>
              <li>{t.cookies.typesAnalytics}</li>
              <li>{t.cookies.typesMarketing}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-black mb-2">
              {t.cookies.dataCollected}
            </h2>
            <p className="text-gray-medium">{t.cookies.dataCollectedP}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-black mb-2">
              {t.cookies.changeConsent}
            </h2>
            <p className="text-gray-medium">{t.cookies.changeConsentP}</p>
          </section>

          <section className="pt-4 border-t border-gray-light">
            <p className="text-gray-medium">
              {t.cookies.contactEmail}{' '}
              <a href={`mailto:${EMAIL}`} className="text-primary hover:text-accent-red hover:underline">
                {EMAIL}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
