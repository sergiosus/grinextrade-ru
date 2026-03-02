import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.terms.title,
    description: t.terms.p1,
    path: '/terms',
    locale: lang,
  });
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
          {t.terms.title}
        </h1>
        <div className="bg-white border border-gray-light rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
          <p className="text-gray-medium">{t.terms.p1}</p>
          <p className="text-gray-medium">{t.terms.p2}</p>
          {t.terms.p3 && <p className="text-gray-medium">{t.terms.p3}</p>}
          {t.terms.p4 && <p className="text-gray-medium">{t.terms.p4}</p>}
        </div>
      </div>
    </div>
  );
}
