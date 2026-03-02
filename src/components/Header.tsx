'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales, localeNames, isRtl } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { useQuoteModal } from '@/contexts/QuoteModalContext';
import { useState, useRef, useEffect } from 'react';

const WHATSAPP_URL = 'https://wa.me/79124475419';
const TELEGRAM_URL = 'https://t.me/grinextrade';
const EMAIL = 'info@grinextrade.com';

const EMAIL_ICON = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M6.5 7.5 12 12l5.5-4.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WHATSAPP_ICON = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L4 20l.9-3.6A8.5 8.5 0 1 1 20.5 11.8Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M9.2 8.9c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.3l.8 2c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4 0 .6.6 1.1 1.5 1.9 2.6 2.6.2.1.4.1.6 0l.6-.5c.2-.2.4-.2.7-.1l2 .8c.2.1.3.3.3.5v.6c0 .3 0 .5-.5.7-.6.3-1.7.2-3.3-.4-1.5-.6-3-1.9-4-3.4-1.1-1.5-1.3-2.7-1-3.3Z"
      fill="currentColor"
    />
  </svg>
);

const TELEGRAM_ICON = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M20.7 4.8 3.9 11.4c-.9.4-.8 1.7.1 2l4.4 1.4 1.7 5.2c.3 1 1.6 1.2 2.2.3l2.5-3.5 4.6 3.4c.8.6 2 .2 2.2-.8l2.6-13.1c.2-1-.8-1.8-1.8-1.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M8.4 14.8 19.4 6.7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const TOP_ICON_CLASS =
  'inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40';

const navLinks: (keyof Translations['nav'])[] = ['home', 'products', 'government', 'about', 'contact'];
const pathByNav: Record<string, string> = {
  home: '',
  products: 'products',
  government: 'government',
  about: 'about',
  contact: 'contact',
};

type Props = { locale: Locale; translations: Translations };

export function Header({ locale, translations }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const base = `/${locale}`;
  const nav = navLinks.map((key) => ({
    label: translations.nav[key],
    href: `${base}/${pathByNav[key] || ''}`.replace(/\/$/, '') || base,
  }));

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-white/95 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center sm:justify-between h-9 gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className={TOP_ICON_CLASS}
                aria-label={translations.contact.emailBtn}
                title={translations.contact.emailBtn}
              >
                {EMAIL_ICON}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={TOP_ICON_CLASS}
                aria-label={translations.contact.whatsapp}
                title={translations.contact.whatsapp}
              >
                {WHATSAPP_ICON}
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={TOP_ICON_CLASS}
                aria-label={translations.contact.telegram}
                title={translations.contact.telegram}
              >
                {TELEGRAM_ICON}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-white border-b transition-all duration-200 ${scrolled ? 'shadow-md bg-white/95 backdrop-blur-sm border-gray-light' : 'border-gray-light shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Link href={base} className="text-xl font-bold text-primary hover:text-accent-red transition shrink-0 min-w-0">
              <span className="block max-w-[200px] sm:max-w-[260px] break-words">{translations.footer.company}</span>
            </Link>

            <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-6">
            {nav.map(({ label, href }) => {
              const active = pathname === href || (href !== base && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition ${active ? 'text-primary' : 'text-brand-black hover:text-accent-red'}`}
                >
                  {label}
                </Link>
              );
            })}
            </div>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-light bg-white text-sm font-medium text-brand-black hover:bg-gray-light"
                aria-expanded={langOpen}
                aria-haspopup="true"
              >
                {localeNames[locale]}
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 w-44 py-1 bg-white rounded-lg border border-gray-light shadow-lg rtl:right-auto rtl:left-0">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={pathname.replace(new RegExp(`^/(${locales.join('|')})`), `/${loc}`)}
                      className={`block px-4 py-2 text-sm ${locale === loc ? 'bg-primary/10 text-primary font-medium' : 'text-brand-black hover:bg-gray-light'}`}
                      onClick={() => setLangOpen(false)}
                    >
                      {localeNames[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="hidden sm:inline-flex px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-accent-red transition"
            >
              {translations.nav.requestQuote}
            </button>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-brand-black hover:bg-gray-light"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-light">
            <div className="flex flex-col gap-1">
              {nav.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-3 rounded-lg text-brand-black hover:bg-gray-light font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { openQuoteModal(); setMenuOpen(false); }}
                className="px-4 py-3 rounded-lg text-left font-medium bg-primary text-white hover:bg-accent-red w-full rtl:text-right"
              >
                {translations.nav.requestQuote}
              </button>
            </div>
          </nav>
        )}
        </div>
      </div>
    </header>
  );
}
