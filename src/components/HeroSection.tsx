'use client';

import Link from 'next/link';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import type { Translations } from '@/lib/i18n/translations';

type Props = { lang: string; t: Translations };

export function HeroSection({ lang, t }: Props) {
  const { openQuoteModal } = useQuoteModal();
  const base = `/${lang}`;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-export.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary/70" aria-hidden />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 drop-shadow-lg leading-tight">
          {t.home.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto mb-10 drop-shadow-md leading-relaxed">
          {t.home.heroSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href={`${base}/products`}
            className="px-8 py-3.5 bg-white text-brand-black font-semibold rounded-lg hover:bg-gray-light border border-white/50 transition"
          >
            {t.home.viewProducts}
          </Link>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-accent-red transition shadow-lg"
          >
            {t.home.requestQuote}
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white/95 text-sm font-medium">
          {t.home.trustBadges.map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
