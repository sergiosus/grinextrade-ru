import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { ContactForm } from '@/components/ContactForm';

const WHATSAPP_URL = 'https://wa.me/79124475419';
const TELEGRAM_URL = 'https://t.me/grinextrade';
const EMAIL = 'info@grinextrade.ru';

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
    <div className="relative py-12 md:py-16 overflow-hidden min-h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/contact.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary/60" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {t.contact.title}
        </h1>
        <p className="text-white/90 mb-10 drop-shadow-md">{t.contact.subtitle}</p>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white text-brand-black font-medium rounded-2xl hover:bg-gray-light shadow-lg transition"
            aria-label={t.contact.emailBtn}
            title={t.contact.emailBtn}
          >
            {EMAIL_ICON}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white font-medium rounded-2xl hover:opacity-90 shadow-lg transition"
            aria-label={t.contact.whatsapp}
            title={t.contact.whatsapp}
          >
            {WHATSAPP_ICON}
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#0088cc] text-white font-medium rounded-2xl hover:opacity-90 shadow-lg transition"
            aria-label={t.contact.telegram}
            title={t.contact.telegram}
          >
            {TELEGRAM_ICON}
          </a>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-xl p-4 md:p-5 shadow-lg scroll-mt-24" id="contact-form">
          <h2 className="text-lg font-semibold text-brand-black mb-3">{t.contact.formTitle}</h2>
          <ContactForm translations={t} />
        </div>
      </div>
    </div>
  );
}
