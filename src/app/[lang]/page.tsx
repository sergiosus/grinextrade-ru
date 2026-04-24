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
  const base = `/${lang}`;

  return (
    <>
      <OrganizationJsonLd />
      <HeroSection lang={lang} t={t} />

      <section id="directions" className="scroll-mt-4 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-brand-black md:text-3xl">
            {t.home.directionSectionTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {t.home.directionCards.map((card) => (
              <div
                key={card.key}
                className="flex flex-col rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-primary">{card.title}</h3>
                {'subtitle' in card && card.subtitle ? (
                  <p className="mt-0.5 text-sm font-medium text-gray-medium">{card.subtitle}</p>
                ) : null}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-medium">{card.text}</p>
                <Link
                  href={`${base}/${card.path}`}
                  className="mt-4 inline-flex w-fit text-sm font-semibold text-primary underline decoration-primary/30 decoration-2 underline-offset-2 hover:text-accent-red hover:decoration-accent-red"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-brand-black md:text-3xl">
            {t.home.howWeWorkTitle}
          </h2>
          <ol className="mt-8 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-medium">
            {t.home.howWeWorkSteps.map((step: string, i: number) => (
              <li key={i} className="pl-1 text-brand-black marker:font-medium">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-black md:text-3xl">{t.home.geographyTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-medium md:text-base">
            {t.home.geographySourcingText}
          </p>
        </div>
      </section>

      <section className="border-t border-gray-200/80 bg-slate-50/80 py-12 md:py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold text-brand-black md:text-2xl">{t.home.finalCtaTitle}</h2>
          <p className="mt-3 text-sm text-gray-medium md:text-base">{t.home.finalCtaText}</p>
          <div className="mt-6">
            <Link
              href={`${base}/contact`}
              className="inline-flex h-11 min-w-[12rem] items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white transition hover:bg-accent-red"
            >
              {t.home.finalCtaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
