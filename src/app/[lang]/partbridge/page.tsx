import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { PartBridgeForm } from '@/components/PartBridgeForm';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: 'PartBridge',
    description: t.partbridge.pageIntro,
    path: '/partbridge',
    locale: lang,
  });
}

export default async function PartBridgePage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black">{t.partbridge.requestPageTitle}</h1>
          <p className="mt-3 text-sm text-gray-medium md:text-base">{t.partbridge.requestPageSubtitle}</p>
        </div>

        {/* 2-column layout */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PartBridgeForm locale={lang} translations={t} />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl border border-gray-light bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-brand-black">{t.partbridge.howItWorksTitle}</h2>
                <ol className="mt-3 space-y-2 text-sm text-gray-medium list-decimal pl-5">
                  {t.partbridge.howItWorksSteps.map((s) => (
                    <li key={s} className="pl-1 text-brand-black marker:font-medium">
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-gray-light bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-brand-black">{t.partbridge.whyUsTitle}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-medium list-disc pl-5">
                  {t.partbridge.whyUsBullets.map((s) => (
                    <li key={s} className="pl-1 text-brand-black marker:text-primary">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
