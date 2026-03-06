import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import Link from 'next/link';

const EMAIL = 'info@grinextrade.ru';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: (t as { legal?: { pageTitle?: string } }).legal?.pageTitle ?? t.legal.title,
    description: t.legal.intro ?? t.legal.statement,
    path: '/legal',
    locale: lang,
  });
}

export default async function LegalPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  const legal = t.legal as typeof t.legal & {
    pageTitle?: string;
    intro?: string;
    companySectionTitle?: string;
    registeredInLabel?: string;
    contactLabel?: string;
    directorNameShort?: string;
    exportComplianceSectionTitle?: string;
    exportComplianceP1?: string;
    exportComplianceP2?: string;
    exportComplianceP3?: string;
    exportComplianceP4?: string;
    sanctionsSectionTitle?: string;
    sanctionsP1?: string;
    sanctionsP2?: string;
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-3">
          {legal.pageTitle ?? legal.title}
        </h1>
        {legal.intro && (
          <p className="text-gray-medium mb-6">{legal.intro}</p>
        )}

        <div className="bg-white border border-gray-light rounded-2xl shadow-sm p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-brand-black mb-4">
              {legal.companySectionTitle}
            </h2>
            <ul className="space-y-2 text-sm text-gray-medium">
              <li><span className="font-semibold text-brand-black">{legal.companyLegalNameLabel}:</span> {legal.companyLegalName}</li>
              <li><span className="font-semibold text-brand-black">{legal.registrationNumberLabel}:</span> {legal.ogrn}</li>
              <li><span className="font-semibold text-brand-black">{legal.taxNumberLabel}:</span> {legal.inn}</li>
              <li><span className="font-semibold text-brand-black">{legal.kppLabel}:</span> {legal.kpp}</li>
              <li><span className="font-semibold text-brand-black">{legal.directorLabel}:</span> <span dir={lang === 'ru' ? undefined : 'ltr'}>{legal.directorName}</span></li>
            </ul>
          </section>

          <section className="pt-6 border-t border-gray-light">
            <h2 className="text-xl font-semibold text-brand-black mb-4">
              {legal.exportComplianceSectionTitle}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-medium">
              {legal.exportComplianceP1 && <li>{legal.exportComplianceP1}</li>}
              {legal.exportComplianceP2 && <li>{legal.exportComplianceP2}</li>}
              {legal.exportComplianceP3 && <li>{legal.exportComplianceP3}</li>}
              {legal.exportComplianceP4 && <li>{legal.exportComplianceP4}</li>}
            </ul>
            {!(legal.exportComplianceP1 || legal.exportComplianceP2) && (
              <>
                <p className="text-gray-medium">{t.compliance.p1}</p>
                <p className="mt-2 text-gray-medium">{t.compliance.p2}</p>
                <p className="mt-2 text-gray-medium">{t.compliance.p3}</p>
              </>
            )}
          </section>

          <section className="pt-6 border-t border-gray-light">
            <h2 className="text-xl font-semibold text-brand-black mb-4">
              {legal.sanctionsSectionTitle}
            </h2>
            {legal.sanctionsP1 && <p className="text-gray-medium">{legal.sanctionsP1}</p>}
            {legal.sanctionsP2 && <p className="mt-2 text-gray-medium">{legal.sanctionsP2}</p>}
            {!legal.sanctionsP1 && <p className="text-gray-medium">{t.compliance.p2}</p>}
          </section>

          <div className="pt-6 border-t border-gray-light text-sm">
            <Link href={`/${lang}/compliance`} className="text-primary hover:text-accent-red hover:underline">
              {legal.viewComplianceLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
