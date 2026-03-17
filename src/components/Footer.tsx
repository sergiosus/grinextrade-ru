import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { FooterLang } from '@/components/FooterLang';
import { CookieSettingsLink } from '@/components/CookieConsent';

const WHATSAPP_URL = 'https://wa.me/79124475419';
const TELEGRAM_URL = 'https://t.me/grinextrade';
const EMAIL = 'info@grinextrade.ru';

const mainNavKeys: (keyof Translations['nav'])[] = ['home', 'products', 'government', 'about', 'contact'];
const mainNavPaths: Record<string, string> = {
  home: '',
  products: 'products',
  government: 'government',
  about: 'about',
  contact: 'contact',
};

const legalNavKeys: (keyof Translations['nav'])[] = ['legal', 'privacy', 'terms', 'cookies', 'compliance'];
const legalNavPaths: Record<string, string> = {
  legal: 'legal',
  privacy: 'privacy',
  terms: 'terms',
  cookies: 'cookies',
  compliance: 'compliance',
};

type Props = { locale: Locale; translations: Translations };

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

const ICON_BUTTON_CLASS =
  'inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/40';

export function Footer({ locale, translations }: Props) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;
  const f = translations.footer;

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1 — Company */}
          <div>
            <p className="font-semibold mb-3">{f.columnMain}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-white/90">
              {mainNavKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={mainNavPaths[key] ? `${base}/${mainNavPaths[key]}` : base}
                    className="hover:text-white transition"
                  >
                    {translations.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Export */}
          <div>
            <p className="font-semibold mb-3">{f.columnExport}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-white/90">
              <li>
                <Link href={`${base}/government`} className="hover:text-white transition">
                  {f.exportTermsLink}
                </Link>
              </li>
              <li>
                <Link href={`${base}/compliance`} className="hover:text-white transition">
                  {f.exportComplianceLink}
                </Link>
              </li>
              <li>
                <Link href={`${base}/government`} className="hover:text-white transition">
                  {f.tenderSupplyLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <p className="font-semibold mb-3">{f.columnLegal}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-white/90">
              {legalNavKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={`${base}/${legalNavPaths[key]}`}
                    className="hover:text-white transition"
                  >
                    {translations.nav[key]}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsLink label={translations.cookies.cookieSettings} />
              </li>
            </ul>
          </div>

          {/* Column 4 — Contacts: icons + language */}
          <div>
            <p className="font-semibold mb-3">{f.columnContacts}</p>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className={ICON_BUTTON_CLASS}
                aria-label={translations.contact.emailBtn}
                title={translations.contact.emailBtn}
              >
                {EMAIL_ICON}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ICON_BUTTON_CLASS}
                aria-label={translations.contact.whatsapp}
                title={translations.contact.whatsapp}
              >
                {WHATSAPP_ICON}
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ICON_BUTTON_CLASS}
                aria-label={translations.contact.telegram}
                title={translations.contact.telegram}
              >
                {TELEGRAM_ICON}
              </a>
            </div>
            <p className="font-semibold mt-6 mb-2">{f.language}</p>
            <FooterLang currentLocale={locale} />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 text-center text-sm text-white/70">
          {f.copyright.replace('{year}', String(year))}
        </div>
      </div>
    </footer>
  );
}
