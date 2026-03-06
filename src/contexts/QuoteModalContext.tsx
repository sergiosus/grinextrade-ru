'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { CountrySelect } from '@/components/CountrySelect';

type QuoteModalContextValue = {
  openQuoteModal: (initialProduct?: string) => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used within QuoteModalProvider');
  return ctx;
}

type ProviderProps = {
  children: ReactNode;
  locale: Locale;
  translations: Translations;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<'company' | 'contactPerson' | 'email' | 'country' | 'message', string>>;

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

function isValid(
  data: { company: string; contactPerson: string; email: string; country: string; message: string },
  v: Translations['common']
): boolean {
  return Object.keys(validate(data, v)).length === 0;
}

export function QuoteModalProvider({ children, locale, translations }: ProviderProps) {
  const [open, setOpen] = useState(false);
  const [initialProduct, setInitialProduct] = useState('');

  const openQuoteModal = useCallback((product?: string) => {
    setInitialProduct(product ?? '');
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      {open && (
        <QuoteModal
          initialProduct={initialProduct}
          onClose={close}
          locale={locale}
          translations={translations}
        />
      )}
    </QuoteModalContext.Provider>
  );
}

type ModalProps = {
  initialProduct: string;
  onClose: () => void;
  locale: Locale;
  translations: Translations;
};

function QuoteModal({ initialProduct, onClose, locale, translations }: ModalProps) {
  const t = useMemo(() => (translations as Translations & { quoteModal?: Record<string, string> }).quoteModal ?? {
    title: 'Request Quote',
    companyName: 'Company name',
    contactPerson: 'Contact person',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    countryPlaceholder: 'Country',
    productLabel: 'Product',
    quantityLabel: 'Quantity',
    message: 'Message',
    close: 'Close',
    sendRequest: 'Send Request',
    successMessage: 'Thank you. Your request has been sent. We will contact you shortly.',
    errorMessage: 'Failed to send request. Please try again later.',
  }, [translations]);
  const common = translations.common;

  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState('');
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'form' | 'success' | 'error'>('form');

  const formData = useMemo(() => ({
    company: company.trim(),
    contactPerson: contactPerson.trim(),
    email: email.trim(),
    country: country.trim(),
    message: message.trim(),
  }), [company, contactPerson, email, country, message]);

  const valid = useMemo(() => isValid(formData, common), [formData, common]);

  const inputBorder = (field: keyof FieldErrors) =>
    errors[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary';

  const clearError = useCallback((field: keyof FieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const nextErrors = validate(formData, common);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setIsSubmitting(true);
    setStatus('form');
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'product',
          companyName: formData.company,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: phone.trim() || undefined,
          country: formData.country,
          productName: product.trim() || undefined,
          quantity: quantity.trim() || undefined,
          message: formData.message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(onClose, 2500);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, common, phone, product, quantity, onClose]);

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />
        <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-light p-8 text-center">
          <p className="text-green-600 font-medium mb-4">{t.successMessage}</p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-medium hover:text-brand-black"
          >
            {t.close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20 sm:pt-16">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-[720px] max-h-[85vh] rounded-2xl bg-white shadow-2xl border border-gray-light flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 px-6 pt-6 pb-2 flex items-center justify-between border-b border-gray-light">
          <h2 id="quote-modal-title" className="text-xl font-bold text-brand-black">
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg text-gray-medium hover:bg-gray-light transition"
            aria-label={t.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="flex flex-col flex-1 min-h-0" onSubmit={handleSubmit}>
          <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 pt-5 space-y-4">
            {status === 'error' && (
              <p className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                {t.errorMessage}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.companyName}</label>
            <input
              type="text"
              value={company}
              onChange={(e) => { setCompany(e.target.value); clearError('company'); }}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('company')}`}
              aria-invalid={!!errors.company}
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.contactPerson}</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => { setContactPerson(e.target.value); clearError('contactPerson'); }}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('contactPerson')}`}
              aria-invalid={!!errors.contactPerson}
            />
            {errors.contactPerson && <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('email')}`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.phone}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.country}</label>
            <CountrySelect
              value={country}
              onChange={(v) => { setCountry(v); clearError('country'); }}
              placeholder={t.countryPlaceholder}
              className="w-full"
              hasError={!!errors.country}
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.productLabel}</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.quantityLabel}</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 1000 pcs"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-1">{t.message}</label>
            <textarea
              value={message}
              onChange={(e) => { setMessage(e.target.value); clearError('message'); }}
              rows={3}
              className={`w-full px-4 py-2.5 rounded-lg border ${inputBorder('message')}`}
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 pb-2 flex-shrink-0 bg-white border-t border-gray-light px-6 py-4">
            <button
              type="submit"
              disabled={!valid || isSubmitting}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-accent-red transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? common.submitting : t.sendRequest}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-medium text-brand-black font-medium rounded-lg hover:bg-gray-light transition"
            >
              {t.close}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
