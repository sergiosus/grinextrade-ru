'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { CountrySelect } from '@/components/CountrySelect';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Узел / система (основные категории) */
const PART_AREA_OPTIONS = [
  'Двигатель',
  'Трансмиссия',
  'Подвеска',
  'Кузов',
  'Свет',
  'Электрика',
  'Салон',
] as const;
/** Тип поставки / состояние */
const PART_TYPE_OPTIONS = ['Новые', 'OEM', 'Aftermarket', 'Б/У', 'Контрактные'] as const;
type Category = (typeof PART_AREA_OPTIONS)[number] | (typeof PART_TYPE_OPTIONS)[number];

type FieldErrors = Partial<
  Record<
    | 'company'
    | 'contactPerson'
    | 'email'
    | 'country'
    | 'partName'
    | 'details'
    | 'consent',
    string
  >
>;

type Props = { locale: Locale; translations: Translations };

function buildMessage(input: {
  partName: string;
  vin?: string;
  oem?: string;
  categories: Category[];
  details: string;
}): string {
  const lines: string[] = [];
  lines.push('Направление: PartBridge');
  lines.push('Запрос: Подбор запчастей');
  lines.push(`Деталь: ${input.partName}`);
  if (input.vin) lines.push(`VIN: ${input.vin}`);
  if (input.oem) lines.push(`OEM: ${input.oem}`);
  if (input.categories.length) lines.push(`Категории: ${input.categories.join(', ')}`);
  lines.push('');
  lines.push('Комментарий:');
  lines.push(input.details);
  return lines.join('\n');
}

export function PartBridgeForm({ locale, translations: t }: Props) {
  const common = t.common;

  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  const [vin, setVin] = useState('');
  const [oem, setOem] = useState('');
  const [partName, setPartName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [details, setDetails] = useState('');

  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const message = useMemo(
    () =>
      buildMessage({
        partName: partName.trim(),
        vin: vin.trim() || undefined,
        oem: oem.trim() || undefined,
        categories,
        details: details.trim(),
      }),
    [partName, vin, oem, categories, details]
  );

  const inputBorder = (field: keyof FieldErrors) =>
    errors[field]
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary';

  function toggleCategory(c: Category) {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!company.trim()) next.company = common.validationCompanyName;
    if (!contactPerson.trim()) next.contactPerson = common.validationContactPerson;
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) next.email = common.validationEmail;
    if (!country.trim()) next.country = common.validationCountry;
    if (!partName.trim()) next.partName = 'Укажите название детали';
    if (!details.trim()) next.details = common.validationMessage;
    if (!consent) next.consent = common.validationConsent;
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'product',
          companyName: company.trim(),
          contactPerson: contactPerson.trim(),
          email: email.trim(),
          country: country.trim(),
          productName: `PartBridge: ${partName.trim()}`,
          message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setCompany('');
        setContactPerson('');
        setEmail('');
        setCountry('');
        setVin('');
        setOem('');
        setPartName('');
        setCategories([]);
        setDetails('');
        setConsent(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3 md:space-y-4">
      {status === 'success' && (
        <p className="p-2.5 rounded-lg bg-green-100 text-green-800 text-sm">
          {t.quoteModal.successMessage}
        </p>
      )}
      {status === 'error' && (
        <p className="p-2.5 rounded-lg bg-red-100 text-red-800 text-sm">{t.quoteModal.errorMessage}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-black mb-0.5">{t.contact.companyName}</label>
        <input
          type="text"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            setErrors((prev) => ({ ...prev, company: undefined }));
          }}
          className={`w-full h-10 px-3 py-2 rounded-lg border text-sm ${inputBorder('company')}`}
          aria-invalid={!!errors.company}
        />
        {errors.company && <p className="mt-0.5 text-xs text-red-600">{errors.company}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-0.5">{t.contact.contactPerson}</label>
        <input
          type="text"
          value={contactPerson}
          onChange={(e) => {
            setContactPerson(e.target.value);
            setErrors((prev) => ({ ...prev, contactPerson: undefined }));
          }}
          className={`w-full h-10 px-3 py-2 rounded-lg border text-sm ${inputBorder('contactPerson')}`}
          aria-invalid={!!errors.contactPerson}
        />
        {errors.contactPerson && <p className="mt-0.5 text-xs text-red-600">{errors.contactPerson}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-sm font-medium text-brand-black mb-0.5">{t.contact.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`w-full h-10 px-3 py-2 rounded-lg border text-sm ${inputBorder('email')}`}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-0.5 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black mb-0.5">{t.contact.country}</label>
          <CountrySelect
            value={country}
            onChange={(v) => {
              setCountry(v);
              setErrors((prev) => ({ ...prev, country: undefined }));
            }}
            placeholder={t.quoteModal.countryPlaceholder}
            className="w-full [&_input]:h-10 [&_input]:py-2 [&_input]:px-3 [&_input]:text-sm"
            hasError={!!errors.country}
          />
          {errors.country && <p className="mt-0.5 text-xs text-red-600">{errors.country}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-sm font-medium text-brand-black mb-0.5">VIN (необязательно)</label>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="w-full h-10 px-3 py-2 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black mb-0.5">OEM (необязательно)</label>
          <input
            type="text"
            value={oem}
            onChange={(e) => setOem(e.target.value)}
            className="w-full h-10 px-3 py-2 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-0.5">Название детали</label>
        <input
          type="text"
          value={partName}
          onChange={(e) => {
            setPartName(e.target.value);
            setErrors((prev) => ({ ...prev, partName: undefined }));
          }}
          className={`w-full h-10 px-3 py-2 rounded-lg border text-sm ${inputBorder('partName')}`}
          aria-invalid={!!errors.partName}
        />
        {errors.partName && <p className="mt-0.5 text-xs text-red-600">{errors.partName}</p>}
      </div>

      <div>
        <p className="block text-sm font-medium text-brand-black mb-1">Категория узла</p>
        <div className="flex flex-wrap gap-2">
          {PART_AREA_OPTIONS.map((c) => {
            const active = categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-brand-black border-gray-medium/30 hover:bg-gray-light'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <p className="block text-sm font-medium text-brand-black mb-1 mt-3">Тип поставки</p>
        <div className="flex flex-wrap gap-2">
          {PART_TYPE_OPTIONS.map((c) => {
            const active = categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={`px-3 py-2 rounded-lg text-sm border transition ${
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-brand-black border-gray-medium/30 hover:bg-gray-light'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-0.5">Комментарий / детали</label>
        <textarea
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            setErrors((prev) => ({ ...prev, details: undefined }));
          }}
          rows={3}
          className={`w-full min-h-[88px] px-3 py-2 rounded-lg border text-sm resize-y ${inputBorder('details')}`}
          aria-invalid={!!errors.details}
        />
        {errors.details && <p className="mt-0.5 text-xs text-red-600">{errors.details}</p>}
      </div>

      <div>
        <label className="flex items-start gap-2.5 cursor-pointer text-sm text-brand-black">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            className="mt-0.5 h-4 w-4 rounded border-gray-medium/30 text-primary focus:ring-primary"
            aria-invalid={!!errors.consent}
          />
          <span>
            {common.consentLabelStart}
            <Link href={`/${locale}/privacy`} className="text-primary hover:text-accent-red underline">
              {common.consentLabelLink}
            </Link>
            {common.consentLabelEnd}
          </span>
        </label>
        {errors.consent && <p className="mt-0.5 text-xs text-red-600">{errors.consent}</p>}
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-accent-red transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? common.submitting : 'Отправить запрос'}
        </button>
      </div>
    </form>
  );
}

