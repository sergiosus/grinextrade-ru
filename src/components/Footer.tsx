import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { COMPANY } from '@/lib/company';

type Props = { locale: Locale; translations: Translations };

export function Footer({ locale, translations }: Props) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  const buyers = [
    { label: locale === 'ru' ? 'Запросить запчасть' : 'Request a part', href: `${base}/partbridge` },
    { label: locale === 'ru' ? 'Подобрать колёса' : 'Wheel selection', href: `${base}/wheelset` },
    { label: locale === 'ru' ? 'Запросить продукцию' : 'Product request', href: `${base}/products` },
    { label: locale === 'ru' ? 'Мои запросы' : 'My requests', href: `${base}/admin` },
    { label: locale === 'ru' ? 'Мои заказы' : 'My orders', href: `${base}/admin` },
    { label: locale === 'ru' ? 'Как это работает' : 'How it works', href: `${base}/about` },
  ];

  const suppliers = [
    { label: locale === 'ru' ? 'Кабинет поставщика' : 'Supplier dashboard', href: `${base}/admin` },
    { label: locale === 'ru' ? 'Отправить предложение' : 'Submit offer', href: `mailto:${COMPANY.contacts.supportEmail}?subject=Supplier%20offer` },
    { label: locale === 'ru' ? 'Вход для поставщиков' : 'Supplier login', href: `${base}/admin` },
    { label: locale === 'ru' ? 'Регистрация поставщика' : 'Supplier registration', href: `mailto:${COMPANY.contacts.supportEmail}?subject=Supplier%20registration` },
    { label: locale === 'ru' ? 'Условия для поставщиков' : 'Supplier terms', href: `${base}/terms` },
  ];

  const documents = [
    { label: locale === 'ru' ? 'Условия использования' : 'Terms of use', href: `${base}/terms` },
    { label: locale === 'ru' ? 'Политика конфиденциальности' : 'Privacy policy', href: `${base}/privacy` },
    { label: locale === 'ru' ? 'Политика cookies' : 'Cookie policy', href: `${base}/cookies` },
    { label: locale === 'ru' ? 'Публичная оферта' : 'Public offer', href: `${base}/terms` },
    { label: locale === 'ru' ? 'Доставка и оплата' : 'Delivery and payment', href: `${base}/government` },
    { label: locale === 'ru' ? 'Экспортный комплаенс' : 'Export compliance', href: `${base}/compliance` },
  ];

  const company = [
    { label: locale === 'ru' ? 'О компании' : 'About', href: `${base}/about` },
    { label: locale === 'ru' ? 'Реквизиты' : 'Legal details', href: `${base}/legal` },
    { label: locale === 'ru' ? 'Контакты' : 'Contacts', href: `${base}/contact` },
    { label: locale === 'ru' ? 'Тендеры и документы' : 'Government & Tender Supply', href: `${base}/government` },
  ];
  const WHATSAPP_URL = COMPANY.contacts.whatsappUrl || `https://wa.me/${COMPANY.contacts.phoneDigitsWa}`;
  const TELEGRAM_URL = COMPANY.contacts.telegramUrl || '#';

  void WHATSAPP_URL;
  void TELEGRAM_URL;

  return (
    <footer className="bg-white border-t border-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <p className="font-semibold mb-3 text-brand-black">{locale === 'ru' ? 'Покупателям' : 'Buyers'}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-gray-medium">
              {buyers.map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="hover:text-brand-black transition">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-brand-black">{locale === 'ru' ? 'Поставщикам' : 'Suppliers'}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-gray-medium">
              {suppliers.map((x) => (
                <li key={x.href}>
                  {x.href.startsWith('mailto:') ? (
                    <a href={x.href} className="hover:text-brand-black transition">
                      {x.label}
                    </a>
                  ) : (
                    <Link href={x.href} className="hover:text-brand-black transition">
                      {x.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-brand-black">{locale === 'ru' ? 'Документы' : 'Documents'}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-gray-medium">
              {documents.map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="hover:text-brand-black transition">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-brand-black">{locale === 'ru' ? 'Компания' : 'Company'}</p>
            <ul className="list-none m-0 p-0 space-y-2 text-sm text-gray-medium">
              {company.map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="hover:text-brand-black transition">
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3 text-brand-black">{locale === 'ru' ? 'Поддержка' : 'Support'}</p>
            <div className="text-sm text-gray-medium">
              <a
                href={`mailto:${COMPANY.contacts.supportEmail}`}
                className="inline-flex font-medium text-brand-black hover:text-primary transition"
              >
                {COMPANY.contacts.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-light flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-medium">
          <div>
            {translations.footer.copyright.replace('{year}', String(year))}
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            {locale === 'ru' ? (
              <>
                <span className="text-brand-black">Русский</span>
                <span className="text-gray-medium">|</span>
                <Link href="/en" className="hover:text-brand-black transition">
                  English
                </Link>
              </>
            ) : (
              <>
                <span className="text-brand-black">English</span>
                <span className="text-gray-medium">|</span>
                <Link href="/ru" className="hover:text-brand-black transition">
                  Russian
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
