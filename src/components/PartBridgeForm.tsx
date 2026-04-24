'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { CountrySelect } from '@/components/CountrySelect';
import { PB_BRANDS, PB_MODELS, PB_YEARS, getEngineKeysForSelection, type VehicleBrand, type EngineKey } from '@/data/partbridgeVehicles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<
  Record<
    | 'company'
    | 'contactPerson'
    | 'email'
    | 'country'
    | 'partName'
    | 'comment'
    | 'consent',
    string
  >
>;

type Props = { locale: Locale; translations: Translations };

function buildMessage(input: {
  partName: string;
  vin?: string;
  oem?: string;
  brand?: string;
  model?: string;
  year?: string;
  engine?: string;
  condition?: string;
  quantity?: string;
  deliveryCountry?: string;
  city?: string;
  budget?: string;
  urgency?: string;
  comment?: string;
  photo?: { name: string; size: number; type: string } | null;
}): string {
  const lines: string[] = [];
  lines.push('Направление: PartBridge');
  lines.push('Запрос: Подбор запчастей');
  lines.push(`Деталь: ${input.partName}`);
  if (input.vin) lines.push(`VIN: ${input.vin}`);
  if (input.oem) lines.push(`OEM: ${input.oem}`);
  if (input.brand) lines.push(`Марка: ${input.brand}`);
  if (input.model) lines.push(`Модель: ${input.model}`);
  if (input.year) lines.push(`Год: ${input.year}`);
  if (input.engine) lines.push(`Двигатель: ${input.engine}`);
  if (input.condition) lines.push(`Состояние: ${input.condition}`);
  if (input.quantity) lines.push(`Количество: ${input.quantity}`);
  if (input.deliveryCountry) lines.push(`Страна доставки: ${input.deliveryCountry}`);
  if (input.city) lines.push(`Город: ${input.city}`);
  if (input.budget) lines.push(`Бюджет: ${input.budget}`);
  if (input.urgency) lines.push(`Срочность: ${input.urgency}`);
  if (input.photo) lines.push(`Фото: ${input.photo.name} (${Math.round(input.photo.size / 1024)} KB)`);
  lines.push('');
  lines.push('Комментарий:');
  lines.push(input.comment || '—');
  return lines.join('\n');
}

export function PartBridgeForm({ locale, translations: t }: Props) {
  const common = t.common;
  const pb = t.partbridge;
  const ui = pb.form;

  function engineLabel(k: EngineKey): string {
    if (locale === 'en') {
      switch (k) {
        case '1.4_gas':
          return '1.4 petrol';
        case '1.6_gas':
          return '1.6 petrol';
        case '2.0_gas':
          return '2.0 petrol';
        case '2.0_diesel':
          return '2.0 diesel';
        case '2.5_gas':
          return '2.5 petrol';
        case '3.0_diesel':
          return '3.0 diesel';
        case '3.0_gas':
          return '3.0 petrol';
        case '3.5_gas':
          return '3.5 petrol';
        case '4.0_gas':
          return '4.0 petrol';
        case '4.4_gas':
          return '4.4 petrol';
        case '5.0_gas':
          return '5.0 petrol';
        case 'hybrid':
          return 'Hybrid';
        case 'electric':
          return 'Electric';
      }
    }
    switch (k) {
      case '1.4_gas':
        return '1.4 бензин';
      case '1.6_gas':
        return '1.6 бензин';
      case '2.0_gas':
        return '2.0 бензин';
      case '2.0_diesel':
        return '2.0 дизель';
      case '2.5_gas':
        return '2.5 бензин';
      case '3.0_diesel':
        return '3.0 дизель';
      case '3.0_gas':
        return '3.0 бензин';
      case '3.5_gas':
        return '3.5 бензин';
      case '4.0_gas':
        return '4.0 бензин';
      case '4.4_gas':
        return '4.4 бензин';
      case '5.0_gas':
        return '5.0 бензин';
      case 'hybrid':
        return 'Hybrid';
      case 'electric':
        return 'Electric';
    }
  }

  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  const [partName, setPartName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [engine, setEngine] = useState('');
  const [vin, setVin] = useState('');
  const [oem, setOem] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const [condition, setCondition] = useState<string>(ui.conditionOptions[0] ?? '');
  const [comment, setComment] = useState('');

  const [quantity, setQuantity] = useState('');
  const [deliveryCountry, setDeliveryCountry] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState<string>(ui.urgencyOptions[ui.urgencyOptions.length - 1] ?? '');

  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const message = useMemo(
    () =>
      buildMessage({
        partName: partName.trim(),
        brand: brand.trim() || undefined,
        model: model.trim() || undefined,
        year: year.trim() || undefined,
        engine: engine.trim() || undefined,
        vin: vin.trim() || undefined,
        oem: oem.trim() || undefined,
        condition,
        quantity: quantity.trim() || undefined,
        deliveryCountry: deliveryCountry.trim() || undefined,
        city: city.trim() || undefined,
        budget: budget.trim() || undefined,
        urgency,
        comment: comment.trim() || undefined,
        photo: photo ? { name: photo.name, size: photo.size, type: photo.type } : null,
      }),
    [partName, brand, model, year, engine, vin, oem, condition, quantity, deliveryCountry, city, budget, urgency, comment, photo]
  );

  const inputBorder = (field: keyof FieldErrors) =>
    errors[field]
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary';

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!company.trim()) next.company = common.validationCompanyName;
    if (!contactPerson.trim()) next.contactPerson = common.validationContactPerson;
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) next.email = common.validationEmail;
    if (!country.trim()) next.country = common.validationCountry;
    if (!partName.trim()) next.partName = pb.validationPartName;
    if (!comment.trim()) next.comment = common.validationMessage;
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
        setPartName('');
        setBrand('');
        setModel('');
        setYear('');
        setEngine('');
        setVin('');
        setOem('');
        setPhoto(null);
        setCondition(ui.conditionOptions[0] ?? '');
        setComment('');
        setQuantity('');
        setDeliveryCountry('');
        setCity('');
        setBudget('');
        setUrgency(ui.urgencyOptions[ui.urgencyOptions.length - 1] ?? '');
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
    <form onSubmit={handleSubmit} className={`w-full mx-auto ${ui.maxWidthClass} space-y-6 pb-10`}>
      {status === 'success' && (
        <p className="p-2.5 rounded-lg bg-green-100 text-green-800 text-sm">
          {t.quoteModal.successMessage}
        </p>
      )}
      {status === 'error' && (
        <p className="p-2.5 rounded-lg bg-red-100 text-red-800 text-sm">{t.quoteModal.errorMessage}</p>
      )}

      {/* SECTION 0 — SELECTED PARTS (reserved) */}
      <section className="rounded-2xl border border-gray-light bg-white p-6 md:p-7 shadow-sm">
        <h2 className="text-base font-semibold text-brand-black">{ui.sectionSelectedParts}</h2>
        <p className="mt-2 text-sm text-gray-medium">
          {locale === 'ru'
            ? 'Если у вас уже есть список — добавьте детали ниже. Мы подберём варианты и условия.'
            : 'If you already have a list — fill the details below. We will source offers and terms.'}
        </p>
      </section>

      {/* SECTION 1 — BASIC INFO */}
      <section className="rounded-2xl border border-gray-light bg-white p-6 md:p-7 shadow-sm">
        <h2 className="text-base font-semibold text-brand-black">{ui.basicInfoTitle}</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-brand-black mb-1">{t.contact.companyName}</label>
            <input
              type="text"
              value={company}
              onChange={(e) => { setCompany(e.target.value); setErrors((prev) => ({ ...prev, company: undefined })); }}
              className={`w-full h-11 px-3 rounded-lg border text-sm ${inputBorder('company')}`}
              aria-invalid={!!errors.company}
            />
            {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.contact.contactPerson}</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => { setContactPerson(e.target.value); setErrors((prev) => ({ ...prev, contactPerson: undefined })); }}
              className={`w-full h-11 px-3 rounded-lg border text-sm ${inputBorder('contactPerson')}`}
              aria-invalid={!!errors.contactPerson}
            />
            {errors.contactPerson && <p className="mt-1 text-xs text-red-600">{errors.contactPerson}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.contact.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
              className={`w-full h-11 px-3 rounded-lg border text-sm ${inputBorder('email')}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-brand-black mb-1">{t.contact.country}</label>
            <CountrySelect
              value={country}
              onChange={(v) => { setCountry(v); setErrors((prev) => ({ ...prev, country: undefined })); }}
              placeholder={t.quoteModal.countryPlaceholder}
              noMatchesLabel={t.quoteModal.countryNoMatches}
              className="w-full [&_input]:h-11 [&_input]:py-2.5 [&_input]:px-3 [&_input]:text-sm"
              hasError={!!errors.country}
            />
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
          </div>
        </div>
      </section>

      {/* SECTION 2 — PART DETAILS */}
      <section className="rounded-2xl border border-gray-light bg-white p-6 md:p-7 shadow-sm">
        <h2 className="text-base font-semibold text-brand-black">{ui.sectionIdentify}</h2>

        <div className="mt-4">
          <label className="block text-sm font-medium text-brand-black mb-1">{ui.partName}</label>
          <input
            type="text"
            value={partName}
            onChange={(e) => { setPartName(e.target.value); setErrors((prev) => ({ ...prev, partName: undefined })); }}
            placeholder={ui.partNamePlaceholder}
            className={`w-full h-12 px-3 rounded-xl border text-base ${inputBorder('partName')}`}
            aria-invalid={!!errors.partName}
          />
          {errors.partName && <p className="mt-1 text-xs text-red-600">{errors.partName}</p>}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.brand}</label>
            <select
              value={brand}
              onChange={(e) => {
                const v = e.target.value;
                setBrand(v);
                setModel('');
                setYear('');
                setEngine('');
              }}
              className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">{ui.brand}</option>
              {PB_BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
              <option value="__other__">{ui.otherOption}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.model}</label>
            <select
              value={model}
              onChange={(e) => {
                const v = e.target.value;
                setModel(v);
                setYear('');
                setEngine('');
              }}
              disabled={!brand || brand === '__other__'}
              className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 bg-white focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-light/50 disabled:opacity-80"
            >
              <option value="">{ui.model}</option>
              {(brand && brand !== '__other__' ? PB_MODELS[brand as VehicleBrand] ?? [] : []).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
              <option value="__other__">{ui.otherOption}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.year}</label>
            <select
              value={year}
              onChange={(e) => {
                const v = e.target.value;
                setYear(v);
                setEngine('');
              }}
              disabled={!brand || brand === '__other__' || !model || model === '__other__'}
              className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 bg-white focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-light/50 disabled:opacity-80"
            >
              <option value="">{ui.year}</option>
              {PB_YEARS.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.engine}</label>
            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              disabled={!brand || brand === '__other__' || !model || model === '__other__' || !year}
              className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 bg-white focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-light/50 disabled:opacity-80"
            >
              <option value="">{ui.engine}</option>
              {getEngineKeysForSelection(brand, model).map((k) => (
                <option key={k} value={engineLabel(k)}>
                  {engineLabel(k)}
                </option>
              ))}
              <option value={ui.otherOption}>{ui.otherOption}</option>
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <label className="block text-sm font-semibold text-brand-black mb-1">{ui.vinLabel}</label>
          <p className="text-xs text-gray-medium mb-2">
            {ui.vinHint}
          </p>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary bg-white"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.oemLabel}</label>
            <input value={oem} onChange={(e) => setOem(e.target.value)} className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.photoLabel}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              className="w-full h-11 rounded-lg border border-gray-medium/30 bg-white px-3 text-sm"
            />
            {photo ? <p className="mt-1 text-xs text-gray-medium">{photo.name}</p> : null}
          </div>
        </div>
      </section>

      {/* SECTION 3 — REQUIREMENTS */}
      <section className="rounded-2xl border border-gray-light bg-white p-6 md:p-7 shadow-sm">
        <h2 className="text-base font-semibold text-brand-black">{ui.sectionRequirements}</h2>
        <div className="mt-4">
          <p className="text-sm font-medium text-brand-black mb-2">{ui.conditionLabel}</p>
          <div className="flex flex-wrap gap-2">
            {ui.conditionOptions.map((label) => {
              const active = condition === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setCondition(label)}
                  className={`h-10 rounded-lg border px-3 text-sm transition ${
                    active
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-brand-black border-gray-medium/30 hover:bg-gray-light'
                  }`}
                >
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setCondition(ui.otherOption)}
              className={`h-10 rounded-lg border px-3 text-sm transition ${
                condition === ui.otherOption
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-brand-black border-gray-medium/30 hover:bg-gray-light'
              }`}
            >
              {ui.otherOption}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-brand-black mb-1">{ui.commentLabel}</label>
          <textarea
            value={comment}
            onChange={(e) => { setComment(e.target.value); setErrors((prev) => ({ ...prev, comment: undefined })); }}
            rows={4}
            className={`w-full min-h-[110px] px-3 py-2 rounded-lg border text-sm resize-y ${inputBorder('comment')}`}
            aria-invalid={!!errors.comment}
          />
          {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment}</p>}
        </div>
      </section>

      {/* SECTION 4 — DELIVERY */}
      <section className="rounded-2xl border border-gray-light bg-white p-6 md:p-7 shadow-sm">
        <h2 className="text-base font-semibold text-brand-black">{ui.sectionDeal}</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.quantityLabel}</label>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.cityLabel}</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.deliveryCountryLabel}</label>
            <CountrySelect
              value={deliveryCountry}
              onChange={setDeliveryCountry}
              placeholder={t.quoteModal.countryPlaceholder}
              noMatchesLabel={t.quoteModal.countryNoMatches}
              className="w-full [&_input]:h-11 [&_input]:py-2.5 [&_input]:px-3 [&_input]:text-sm"
              hasError={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.budgetLabel}</label>
            <input value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{ui.urgencyLabel}</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border text-sm border-gray-medium/30 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {ui.urgencyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
              <option value={ui.otherOption}>{ui.otherOption}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Bottom: consent + CTA */}
      <section className="rounded-2xl border border-gray-light bg-white p-6 md:p-7 shadow-sm">
        <label className="flex items-start gap-2.5 cursor-pointer text-sm text-brand-black">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); setErrors((prev) => ({ ...prev, consent: undefined })); }}
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
        {errors.consent && <p className="mt-1 text-xs text-red-600">{errors.consent}</p>}

        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-primary px-6 text-base font-semibold text-white shadow-sm transition hover:bg-accent-red disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? common.submitting : ui.submit}
          </button>
        </div>
      </section>
    </form>
  );
}

