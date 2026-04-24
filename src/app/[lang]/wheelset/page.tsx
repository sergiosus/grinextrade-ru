import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { WheelSetForm } from '@/components/WheelSetForm';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: 'WheelSet',
    description: t.wheelset.pageIntro,
    path: '/wheelset',
    locale: lang,
  });
}

export default async function WheelSetPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-black">{t.wheelset.pageTitle}</h1>
        <p className="mt-2 text-sm text-gray-medium">{t.wheelset.pageIntro}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-brand-black">{t.wheelset.formTitle}</h2>
        <div className="mt-3 rounded-2xl border border-gray-light p-4 sm:p-5 shadow-sm">
          <WheelSetForm locale={lang} translations={t} />
        </div>
      </div>
    </div>
  );
}
