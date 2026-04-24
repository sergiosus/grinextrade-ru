'use client';

import Link from 'next/link';
import type { Translations } from '@/lib/i18n/translations';

type Props = { lang: string; t: Translations };

export function HeroSection({ lang, t }: Props) {
  const base = `/${lang}`;

  return (
    <section className="border-b border-gray-200/90 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6 md:py-9 lg:px-8">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-brand-black sm:text-3xl">
          {t.home.heroTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-medium">
          {t.home.heroSubtitle}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href={`${base}#directions`}
            className="inline-flex h-11 min-w-[10rem] items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-red"
          >
            {t.home.heroCtaPrimary}
          </Link>
          <Link
            href={`${base}/contact`}
            className="inline-flex h-11 min-w-[10rem] items-center justify-center rounded-lg border border-gray-medium/40 bg-white px-5 text-sm font-semibold text-brand-black transition hover:border-primary/40 hover:bg-gray-light/50"
          >
            {t.home.heroCtaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
