import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.privacy.title,
    description: t.privacy.p1,
    path: '/privacy',
    locale: lang,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
          {t.privacy.title}
        </h1>
        <div className="bg-white border border-gray-light rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
          <p className="text-gray-medium">{t.privacy.p1}</p>
          <p className="text-gray-medium">{t.privacy.p2}</p>
          {t.privacy.p3 && <p className="text-gray-medium">{t.privacy.p3}</p>}
          {t.privacy.p4 && <p className="text-gray-medium">{t.privacy.p4}</p>}
        </div>
      </div>
    </div>
  );
}
