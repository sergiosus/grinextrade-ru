'use client';

import { useState } from 'react';
import type { Translations } from '@/lib/i18n/translations';
import { CountrySelect } from '@/components/CountrySelect';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<'company' | 'contactPerson' | 'email' | 'country' | 'productName' | 'quantity' | 'message', string>>;

type Props = { translations: Translations; initialProductName?: string };

function validate(
  data: { company: string; contactPerson: string; email: string; country: string; message: string },
  v: Translations['common']
): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.company.trim()) errors.company = v.validationCompanyName;
  if (!data.contactPerson.trim()) errors.contactPerson = v.validationContactPerson;
  if (!data.email.trim()) errors.email = v.validationEmail;
  else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = v.validationEmail;
  if (!data.country.trim()) errors.country = v.validationCountry;
  if (!data.message.trim()) errors.message = v.validationMessage;
  return errors;
}

export function ContactForm({ translations: t, initialProductName = '' }: Props) {
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [productName, setProductName] = useState(initialProductName);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const common = t.common;
  const contactLabels = t.contact;
  const quoteModal = t.quoteModal;

  const inputBorder = (field: keyof FieldErrors) =>
    errors[field]
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const data = {
      company: company.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      country: country.trim(),
      message: message.trim(),
    };
    const nextErrors = validate(data, common);
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
          source: 'contact',
          companyName: data.company,
          contactPerson: data.contactPerson,
          email: data.email,
          phone: phone.trim() || undefined,
          country: data.country,
          productName: productName.trim() || undefined,
          quantity: quantity.trim() || undefined,
          message: data.message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setCompany('');
        setContactPerson('');
        setEmail('');
        setPhone('');
        setCountry('');
        setProductName('');
        setQuantity('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'success' && (
        <p className="p-3 rounded-lg bg-green-100 text-green-800 text-sm">
          {quoteModal.successMessage}
        </p>
      )}
      {status === 'error' && (
        <p className="p-3 rounded-lg bg-red-100 text-red-800 text-sm">{quoteModal.errorMessage}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.companyName}</label>
        <input
          type="text"
          value={company}
          onChange={(e) => { setCompany(e.target.value); setErrors((prev) => ({ ...prev, company: undefined })); }}
          className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('company')}`}
          aria-invalid={!!errors.company}
        />
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.contactPerson}</label>
        <input
          type="text"
          value={contactPerson}
          onChange={(e) => { setContactPerson(e.target.value); setErrors((prev) => ({ ...prev, contactPerson: undefined })); }}
          className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('contactPerson')}`}
          aria-invalid={!!errors.contactPerson}
        />
        {errors.contactPerson && <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
            className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('email')}`}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.phone}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.country}</label>
        <CountrySelect
          value={country}
          onChange={(v) => { setCountry(v); setErrors((prev) => ({ ...prev, country: undefined })); }}
          placeholder={t.quoteModal.countryPlaceholder}
          className="w-full"
          hasError={!!errors.country}
        />
        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.productName}</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => { setProductName(e.target.value); setErrors((prev) => ({ ...prev, productName: undefined })); }}
          placeholder={contactLabels.productName}
          className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('productName')}`}
          aria-invalid={!!errors.productName}
        />
        {errors.productName && <p className="mt-1 text-sm text-red-600">{errors.productName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.quantity}</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => { setQuantity(e.target.value); setErrors((prev) => ({ ...prev, quantity: undefined })); }}
          placeholder="e.g. 1000 pcs"
          className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('quantity')}`}
          aria-invalid={!!errors.quantity}
        />
        {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.message}</label>
        <textarea
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: undefined })); }}
          rows={3}
          className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('message')}`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-accent-red transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? common.submitting : quoteModal.sendRequest}
        </button>
      </div>
    </form>
  );
}
