import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';

const WHATSAPP_URL = COMPANY.contacts.whatsappUrl;
const TELEGRAM_URL = COMPANY.contacts.telegramUrl;
const EMAIL = COMPANY.contacts.email;
// Phone shown as plain text (not clickable), per UI requirement.

const EMAIL_ICON = (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
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

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.contact.title,
    description: t.contact.subtitle + ' - Grinex Trade',
    path: '/contact',
    locale: lang,
  });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1) Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black">{t.contact.title}</h1>
          <p className="mt-3 text-sm text-gray-medium md:text-base">{t.contact.heroSubtitle}</p>

          <div className="mt-8 mx-auto w-full max-w-md rounded-2xl border border-gray-medium/20 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-medium/20 bg-white text-brand-black shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                aria-label={t.contact.emailBtn}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center">{EMAIL_ICON}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="WhatsApp"
              >
                {WHATSAPP_ICON}
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0088cc] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Telegram"
              >
                {TELEGRAM_ICON}
              </a>
            </div>

            <div className="mt-4 text-center text-sm font-semibold text-brand-black">
              {lang === 'ru' ? 'МАКС' : 'MAX'}: {COMPANY.contacts.phoneDisplay}
            </div>
          </div>

          {/* CTA removed by request */}
        </section>

        {/* 2) Quick actions */}
        <section className="mt-14 md:mt-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl md:text-2xl font-bold text-brand-black text-center">{t.contact.quickActionsTitle}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {t.contact.quickActions.map((c) => {
                const href =
                  c.key === 'orders'
                    ? `/${lang}/admin`
                    : c.key === 'suppliers'
                      ? `mailto:${EMAIL}?subject=${encodeURIComponent('Supplier onboarding')}`
                      : TELEGRAM_URL;
                const external = href.startsWith('http') || href.startsWith('mailto:');
                const Card = (
                  <div className="group rounded-2xl border border-gray-medium/20 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <p className="text-base font-semibold text-brand-black group-hover:text-primary transition">{c.title}</p>
                    <p className="mt-2 text-sm text-gray-medium">{c.text}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      <span className="underline decoration-primary/30 decoration-2 underline-offset-2 group-hover:text-accent-red group-hover:decoration-accent-red transition">
                        {c.action}
                      </span>
                    </p>
                  </div>
                );
                return external ? (
                  <a
                    key={c.key}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    {Card}
                  </a>
                ) : (
                  <Link key={c.key} href={href} className="block">
                    {Card}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3) Legal / company info */}
        <section className="mt-14 md:mt-16">
          <div className="mx-auto max-w-5xl rounded-2xl border border-gray-medium/20 bg-slate-50/80 p-6 md:p-8">
            <h2 className="text-sm font-semibold text-brand-black">{t.contact.legalTitle}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {t.contact.legalSections.map((s) => (
                <div key={s.key} className="text-sm">
                  <p className="font-semibold text-brand-black">{s.title}</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-gray-medium">
                    {s.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="text-sm">
                <p className="font-semibold text-brand-black">{t.contact.infoTitle}</p>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-gray-medium">
                  {t.contact.infoBullets.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
