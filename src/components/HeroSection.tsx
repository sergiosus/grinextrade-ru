'use client';
import type { Translations } from '@/lib/i18n/translations';

type Props = { lang: string; t: Translations };

export function HeroSection({ lang, t }: Props) {
  return (
    <section className="border-b border-gray-200/90 bg-gradient-to-b from-slate-50 to-white">
      <div className="px-4 py-8 sm:px-6 md:py-9 lg:px-8">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-brand-black sm:text-4xl">
            {t.home.heroTitle}
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-gray-medium md:text-lg">
            {t.home.heroSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
