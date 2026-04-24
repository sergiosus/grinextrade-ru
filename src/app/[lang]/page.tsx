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

      <section id="services" className="scroll-mt-4 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-brand-black md:text-3xl">{t.home.directionSectionTitle}</h2>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {t.home.directionCards.map((card) => (
              <Link
                key={card.key}
                href={`${base}/${card.path}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-medium/20 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent-red to-primary opacity-80" aria-hidden />
                <div className="mt-2 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-black group-hover:text-primary transition">
                      {card.title}
                    </h3>
                    {'subtitle' in card && card.subtitle ? (
                      <p className="mt-0.5 text-sm font-medium text-gray-medium">{card.subtitle}</p>
                    ) : null}
                  </div>
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15"
                    aria-hidden
                  >
                    →
                  </span>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-medium">{card.text}</p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <span className="underline decoration-primary/30 decoration-2 underline-offset-2 group-hover:text-accent-red group-hover:decoration-accent-red transition">
                    {card.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
