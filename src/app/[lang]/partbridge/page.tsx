import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { PartBridgeForm } from '@/components/PartBridgeForm';
import Link from 'next/link';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: 'PartBridge',
    description: t.home.metaDescription,
    path: '/partbridge',
    locale: lang,
  });
}

export default async function PartBridgePage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-black">PartBridge — подбор автозапчастей</h1>
        <p className="mt-2 text-sm text-gray-medium">
          Подберём новые, OEM, aftermarket, контрактные и б/у детали по VIN, OEM или описанию.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-brand-black">Оставить заявку на подбор</h2>
        <div className="mt-3 rounded-2xl border border-gray-light p-4 sm:p-5 shadow-sm">
          <PartBridgeForm locale={lang} translations={t} />
        </div>
      </div>

      <div className="rounded-xl border border-gray-light bg-gray-light/50 p-4">
        <h2 className="text-sm font-semibold text-brand-black">Нужны шины и диски?</h2>
        <p className="mt-1 text-sm text-gray-medium">Для подбора комплекта колёс перейдите в WheelSet.</p>
        <Link
            href={`/${lang}/wheelset`}
            className="mt-3 inline-block rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-accent-red"
          >
            Перейти в WheelSet
          </Link>
      </div>
    </div>
  );
}
