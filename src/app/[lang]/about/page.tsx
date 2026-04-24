import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import Link from 'next/link';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.about.title,
    description: t.about.intro,
    path: '/about',
    locale: lang,
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black">{t.about.title}</h1>
        <p className="mt-3 max-w-3xl text-gray-medium">{t.about.intro}</p>

        <div className="mt-10 grid grid-cols-1 gap-10">
          <section>
            <h2 className="text-xl font-semibold text-brand-black">{t.about.directionsTitle}</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.about.directions.map((d) => (
                <Link
                  key={d.href}
                  href={`/${lang}${d.href}`}
                  className="group rounded-xl border border-gray-medium/20 bg-white p-4 shadow-sm hover:border-primary/40 hover:shadow-md transition"
                >
                  <p className="text-base font-semibold text-brand-black group-hover:text-primary transition">{d.title}</p>
                  <p className="mt-1 text-sm text-gray-medium">{d.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-black">{t.about.howWeWorkTitle}</h2>
            <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.about.howWeWorkSteps.map((s, idx) => (
                <li key={s} className="rounded-xl border border-gray-medium/20 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-primary">{String(idx + 1).padStart(2, '0')}</p>
                  <p className="mt-1 text-sm text-brand-black">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-black">{t.about.geographyTitle}</h2>
            <p className="mt-3 text-gray-medium">{t.about.geographyText}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
