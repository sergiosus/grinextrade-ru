'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import {
  buildWheelParamLine,
  getSortedBrandNames,
  getSortedModels,
  getYearOptionsDescending,
  isOtherBrand,
  isOtherModel,
  resolveFitmentForDisplay,
} from '@/data/wheelsetVehicles';

const SEASON_OPTIONS = ['Лето', 'Зима', 'Всесезон'] as const;
const STYLE_OPTIONS = ['OEM (штатный)', 'Спорт', 'Премиум', 'Бюджет', 'Off-road'] as const;

const SEASON_OPTIONS_SORTED = [...SEASON_OPTIONS].sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));
const STYLE_OPTIONS_SORTED = [...STYLE_OPTIONS].sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));

const BUDGET_PRESETS: { value: string; label: string }[] = [
  { value: '', label: 'Выберите вариант' },
  { value: 'до40', label: 'До 40 000 ₽' },
  { value: '40_60', label: '40–60 тыс ₽' },
  { value: '60_90', label: '60–90 тыс ₽' },
  { value: '90_130', label: '90–130 тыс ₽' },
  { value: '130p', label: '130+ тыс ₽' },
  { value: 'custom', label: 'Свой бюджет' },
];

const ACCESSORY_OPTIONS = [
  'TPMS датчики',
  'Секретки',
  'Гайки / болты',
  'Центровочные кольца',
  'Колпачки',
  'Не нужны',
] as const;

const ACCESSORY_OPTIONS_SORTED = [...ACCESSORY_OPTIONS].sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));

const FITMENT_DISCLAIMER =
  'Параметры предварительные. Перед заказом мы проверим совместимость по VIN и комплектации.';

const FITMENT_UNKNOWN_MSG = 'Параметры уточним по VIN и комплектации.';

const FITMENT_GENERIC_FALLBACK_MSG =
  'Предварительно: уточним по VIN. Можно указать текущий размер шин вручную.';

function vehicleTypeLabelRu(v: 'sedan' | 'crossover' | 'suv' | 'pickup'): string {
  switch (v) {
    case 'sedan':
      return 'Седан / легковой';
    case 'crossover':
      return 'Кроссовер';
    case 'suv':
      return 'SUV / внедорожник';
    case 'pickup':
      return 'Пикап';
  }
}

const YEAR_FITMENT_INLINE_HINT =
  'Выберите год выпуска, чтобы увидеть возможные параметры шин и дисков.';

function d(v: string) {
  const t = v.trim();
  return t || '—';
}

function resolveMake(brand: string, brandOther: string): string {
  if (isOtherBrand(brand)) {
    const o = brandOther.trim();
    return o ? `Другое: ${o}` : 'Другое';
  }
  return brand.trim();
}

function resolveBudget(key: string, custom: string): string {
  if (key === 'custom') return d(custom);
  const row = BUDGET_PRESETS.find((x) => x.value === key);
  if (!key || !row) return '—';
  return row.label;
}

function buildMessage(input: {
  make: string;
  model: string;
  year: string;
  appliedCatalogSuggestions: boolean;
  vin: string;
  tireSize: string;
  wheelParams: string;
  budget: string;
  season: string;
  style: string;
  accessories: string;
  city: string;
  phone: string;
  comment: string;
}): string {
  const pre =
    input.appliedCatalogSuggestions
      ? 'Да — в поля «шины/дисков» внесены примеры из подсказки; параметры остаются предварительными.'
      : 'Нет (заполнение вручную или подсказка не использовалась).';
  return [
    'Направление: WheelSet',
    `Марка: ${d(input.make)}`,
    `Модель: ${d(input.model)}`,
    `Год выпуска: ${d(input.year)}`,
    `VIN: ${d(input.vin)}`,
    `Предв. подсказки по каталогу (шины/диски) применены: ${pre}`,
    `Размер шин: ${d(input.tireSize)}`,
    `Параметры дисков: ${d(input.wheelParams)}`,
    `Бюджет: ${d(input.budget)}`,
    `Сезон: ${d(input.season)}`,
    `Стиль: ${d(input.style)}`,
    `Аксессуары: ${d(input.accessories)}`,
    `Город доставки: ${d(input.city)}`,
    `Телефон: ${d(input.phone)}`,
    '',
    'Комментарий:',
    d(input.comment),
  ].join('\n');
}

type FieldErrors = Partial<Record<'make' | 'model' | 'phone' | 'city' | 'consent' | 'brandOther' | 'year' | 'modelOther', string>>;

type Props = { locale: Locale; translations: Translations };

const labelCls = 'block text-sm font-medium text-brand-black mb-1';
const textAreaClass =
  'w-full min-h-[100px] rounded-lg border border-gray-medium/30 bg-white px-3 py-2 text-base resize-y focus:ring-2 focus:ring-primary focus:border-primary';
const gridForm = 'grid grid-cols-1 md:grid-cols-2 gap-4';

const YEAR_CHOICES = getYearOptionsDescending();

function FieldPairSpacer() {
  return (
    <div className="hidden min-h-0 flex-col md:flex" aria-hidden="true">
      <span className="mb-1 block text-sm select-none text-transparent">.</span>
      <div className="h-11 w-full rounded-lg border border-transparent" />
    </div>
  );
}

export function WheelSetForm({ locale, translations: t }: Props) {
  const common = t.common;
  const brandNames = useMemo(() => getSortedBrandNames(), []);

  const [brand, setBrand] = useState('');
  const [brandOther, setBrandOther] = useState('');
  const [model, setModel] = useState('');
  const [modelOther, setModelOther] = useState('');
  const [year, setYear] = useState('');

  const [appliedCatalogSuggestions, setAppliedCatalogSuggestions] = useState(false);

  /** Опционально, без API и без client-side VIN-decode; попадает в `message` как строка. */
  const [vin, setVin] = useState('');
  const [tireSize, setTireSize] = useState('');
  const [wheelParams, setWheelParams] = useState('');
  const [budgetKey, setBudgetKey] = useState('');
  const [budgetCustom, setBudgetCustom] = useState('');
  const [season, setSeason] = useState('');
  const [style, setStyle] = useState('');
  const [accessorySelection, setAccessorySelection] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const otherBrand = isOtherBrand(brand);
  const models = useMemo(() => (brand && !otherBrand ? getSortedModels(brand) : []), [brand, otherBrand]);

  const canPickYear = useMemo(() => {
    if (!brand) return false;
    if (otherBrand) {
      return !!brandOther.trim() && !!modelOther.trim();
    }
    if (!model) return false;
    if (isOtherModel(model)) {
      return !!modelOther.trim();
    }
    return true;
  }, [brand, otherBrand, model, brandOther, modelOther]);

  const yearNum = useMemo(() => {
    const n = parseInt(year, 10);
    if (Number.isNaN(n) || n < 2000 || n > 2026) return null;
    return n;
  }, [year]);

  const catalogModelName = useMemo(() => {
    if (otherBrand) return null;
    if (!model) return null;
    if (isOtherModel(model)) return null;
    return model;
  }, [otherBrand, model]);

  const fitmentDisplay = useMemo(() => {
    if (!canPickYear || !yearNum || !brand || !catalogModelName) return null;
    return resolveFitmentForDisplay(brand, catalogModelName, yearNum);
  }, [canPickYear, yearNum, brand, catalogModelName]);

  const makeResolved = useMemo(() => resolveMake(brand, brandOther), [brand, brandOther]);
  const budgetLine = useMemo(() => resolveBudget(budgetKey, budgetCustom), [budgetKey, budgetCustom]);

  const modelResolved = useMemo(() => {
    if (otherBrand) return modelOther.trim();
    if (isOtherModel(model)) return modelOther.trim();
    return model.trim();
  }, [otherBrand, model, modelOther]);

  const showYearInlineHint = !otherBrand && Boolean(catalogModelName) && canPickYear && !year;
  const showPostYearFitmentCard = !otherBrand && Boolean(catalogModelName) && canPickYear && Boolean(year);

  const accessoriesText = useMemo(() => {
    if (accessorySelection.length === 0) return '—';
    return accessorySelection.join(', ');
  }, [accessorySelection]);

  const message = useMemo(
    () =>
      buildMessage({
        make: makeResolved,
        model: modelResolved,
        year,
        appliedCatalogSuggestions,
        vin,
        tireSize,
        wheelParams,
        budget: budgetLine,
        season: season || '—',
        style: style || '—',
        accessories: accessoriesText,
        city,
        phone,
        comment,
      }),
    [
      makeResolved,
      modelResolved,
      year,
      appliedCatalogSuggestions,
      vin,
      tireSize,
      wheelParams,
      budgetLine,
      season,
      style,
      accessoriesText,
      city,
      phone,
      comment,
    ]
  );

  const companyNameLine = useMemo(() => `${makeResolved} ${modelResolved}`.trim(), [makeResolved, modelResolved]);

  const toggleAccessory = useCallback((label: (typeof ACCESSORY_OPTIONS)[number]) => {
    setAccessorySelection((prev) => {
      if (label === 'Не нужны') {
        return prev.includes('Не нужны') ? [] : ['Не нужны'];
      }
      const withoutNone = prev.filter((x) => x !== 'Не нужны');
      if (withoutNone.includes(label)) {
        return withoutNone.filter((x) => x !== label);
      }
      return [...withoutNone, label];
    });
  }, []);

  const controlClass = (field: keyof FieldErrors) =>
    `h-11 w-full rounded-lg border px-3 text-base bg-white ${
      errors[field]
        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary'
    }`;

  const applyCatalogFitment = useCallback(() => {
    const f = fitmentDisplay;
    if (!f || f.kind === 'none' || f.kind === 'generic' || !('sample' in f) || !f.sample) return;
    setTireSize(f.sample.tires[0] ?? '');
    setWheelParams(buildWheelParamLine(f.sample));
    setAppliedCatalogSuggestions(true);
  }, [fitmentDisplay]);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!brand.trim()) next.make = 'Укажите марку';
    if (isOtherBrand(brand) && !brandOther.trim()) {
      next.brandOther = 'Укажите марку';
    }
    if (isOtherBrand(brand)) {
      if (!modelOther.trim()) next.model = 'Укажите модель';
    } else {
      if (!model.trim()) next.model = 'Укажите модель';
      if (isOtherModel(model) && !modelOther.trim()) {
        next.modelOther = 'Укажите модель';
      }
    }
    if (!year) next.year = 'Укажите год выпуска';
    if (!phone.trim()) next.phone = 'Укажите телефон';
    if (!city.trim()) next.city = 'Укажите город';
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
          source: 'wheelset_request',
          companyName: companyNameLine,
          contactPerson: phone.trim(),
          email: '',
          phone: phone.trim(),
          country: city.trim(),
          productName: 'WheelSet: подбор комплекта колёс',
          message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setBrand('');
        setBrandOther('');
        setModel('');
        setModelOther('');
        setYear('');
        setAppliedCatalogSuggestions(false);
        setVin('');
        setTireSize('');
        setWheelParams('');
        setBudgetKey('');
        setBudgetCustom('');
        setSeason('');
        setStyle('');
        setAccessorySelection([]);
        setCity('');
        setPhone('');
        setComment('');
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

  function onBrandChange(v: string) {
    setBrand(v);
    setModel('');
    setModelOther('');
    setYear('');
    setAppliedCatalogSuggestions(false);
    setTireSize('');
    setWheelParams('');
    setErrors((prev) => ({ ...prev, make: undefined, brandOther: undefined, model: undefined, year: undefined, modelOther: undefined }));
  }

  function onModelChange(v: string) {
    setModel(v);
    setModelOther('');
    setYear('');
    setAppliedCatalogSuggestions(false);
    setTireSize('');
    setWheelParams('');
    setErrors((prev) => ({ ...prev, model: undefined, year: undefined, modelOther: undefined }));
  }

  const disabledPick = 'disabled:cursor-not-allowed disabled:bg-gray-light/50 disabled:opacity-80';
  const neutralNoErr =
    'h-11 w-full rounded-lg border border-gray-medium/30 bg-white px-3 text-base focus:ring-2 focus:ring-primary focus:border-primary';

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      {status === 'success' && (
        <p className="rounded-lg bg-green-100 p-2 text-sm text-green-800">{t.quoteModal.successMessage}</p>
      )}
      {status === 'error' && (
        <p className="rounded-lg bg-red-100 p-2 text-sm text-red-800">{t.quoteModal.errorMessage}</p>
      )}

      <div className={gridForm}>
        <div>
          <label className={labelCls} htmlFor="ws-brand">
            Марка
          </label>
          <select
            id="ws-brand"
            value={brand}
            onChange={(e) => onBrandChange(e.target.value)}
            className={controlClass('make')}
            aria-label="Марка"
            aria-invalid={!!errors.make}
          >
            <option value="">Выберите марку</option>
            {brandNames.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.make ? <p className="mt-1 text-xs text-red-600">{errors.make}</p> : null}
        </div>

        {otherBrand ? (
          <FieldPairSpacer />
        ) : (
          <div>
            <label className={labelCls} htmlFor="ws-model">
              Модель
            </label>
            <select
              id="ws-model"
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
              disabled={!brand}
              className={`${controlClass('model')} ${!brand ? disabledPick : ''}`}
              aria-label="Модель"
            >
              <option value="">{!brand ? 'Сначала выберите марку' : 'Выберите модель'}</option>
              {models.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {!isOtherModel(model) && errors.model ? <p className="mt-1 text-xs text-red-600">{errors.model}</p> : null}
          </div>
        )}

        {otherBrand && (
          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="ws-brand-other">
              Марка (текст)
            </label>
            <input
              id="ws-brand-other"
              type="text"
              value={brandOther}
              onChange={(e) => {
                setBrandOther(e.target.value);
                setErrors((prev) => ({ ...prev, brandOther: undefined }));
              }}
              placeholder="Введите марку"
              className={controlClass('brandOther')}
              aria-invalid={!!errors.brandOther}
            />
            {errors.brandOther ? <p className="mt-1 text-xs text-red-600">{errors.brandOther}</p> : null}
          </div>
        )}

        {otherBrand && (
          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="ws-model-free">
              Модель (текст)
            </label>
            <input
              id="ws-model-free"
              type="text"
              value={modelOther}
              onChange={(e) => {
                setModelOther(e.target.value);
                setErrors((prev) => ({ ...prev, model: undefined }));
              }}
              placeholder="например: Sorento, Passat"
              className={`${controlClass('model')} placeholder:text-gray-medium/60`}
              aria-invalid={!!errors.model}
            />
            {errors.model ? <p className="mt-1 text-xs text-red-600">{errors.model}</p> : null}
          </div>
        )}

        {!otherBrand && isOtherModel(model) && (
          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="ws-model-other">
              Модель (текст)
            </label>
            <input
              id="ws-model-other"
              type="text"
              value={modelOther}
              onChange={(e) => {
                setModelOther(e.target.value);
                setErrors((prev) => ({ ...prev, modelOther: undefined, model: undefined }));
              }}
              placeholder="Введите модель"
              className={`${controlClass('modelOther')} placeholder:text-gray-medium/60`}
              aria-invalid={!!errors.modelOther}
            />
            {errors.modelOther ? <p className="mt-1 text-xs text-red-600">{errors.modelOther}</p> : null}
          </div>
        )}

        <div>
          <label className={labelCls} htmlFor="ws-year">
            Год выпуска
          </label>
          <select
            id="ws-year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setAppliedCatalogSuggestions(false);
              setTireSize('');
              setWheelParams('');
              setErrors((prev) => ({ ...prev, year: undefined }));
            }}
            disabled={!canPickYear}
            className={`${controlClass('year')} ${!canPickYear ? disabledPick : ''}`}
            aria-label="Год выпуска"
            aria-describedby={showYearInlineHint ? 'ws-year-fitment-hint' : undefined}
          >
            <option value="">{!canPickYear ? 'Сначала выберите марку и модель' : 'Выберите год'}</option>
            {YEAR_CHOICES.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
          {showYearInlineHint ? (
            <p id="ws-year-fitment-hint" className="mt-1.5 text-xs text-gray-600">
              {YEAR_FITMENT_INLINE_HINT}
            </p>
          ) : null}
          {errors.year ? <p className="mt-1 text-xs text-red-600">{errors.year}</p> : null}
        </div>

        <div>
          <label className={labelCls} htmlFor="ws-vin">
            VIN (необязательно)
          </label>
          <input
            id="ws-vin"
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className={neutralNoErr}
            maxLength={17}
            autoComplete="off"
            inputMode="text"
            placeholder="17 знаков, если удобно указать"
            aria-describedby="ws-vin-hint"
          />
          <p id="ws-vin-hint" className="mt-1 text-xs text-gray-500">
            Поле по желанию. Марка, модель и год выбираются вручную. Указанный VIN передаётся в заявке для
            уточнения комплектации менеджером; автоматического разбора VIN на сайте нет.
          </p>
        </div>

        {showPostYearFitmentCard && fitmentDisplay && (
          <div className="md:col-span-2">
            {fitmentDisplay.kind === 'none' ? (
              <div className="rounded-lg border border-gray-medium/30 bg-white p-3 text-sm text-gray-800 shadow-sm">
                {FITMENT_UNKNOWN_MSG}
              </div>
            ) : fitmentDisplay.kind === 'generic' ? (
              <div className="rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm text-brand-black">
                <p className="text-base font-semibold text-primary">Предварительные диапазоны</p>
                <div className="mt-3 flex flex-col gap-3">
                  <p className="text-sm text-gray-800">{FITMENT_GENERIC_FALLBACK_MSG}</p>
                  <p className="text-xs text-gray-600">Тип авто: {vehicleTypeLabelRu(fitmentDisplay.hint.vehicleType)}</p>
                  <p className="text-xs text-gray-600">Диаметр дисков (обычно): {fitmentDisplay.hint.rimDiameters}</p>
                  <p className="text-xs text-gray-600">Шины (примеры):</p>
                  <div className="flex flex-wrap gap-1.5">
                    {fitmentDisplay.hint.tiresExamples.map((tt) => (
                      <span
                        key={tt}
                        className="inline-flex items-center rounded-full border border-gray-medium/30 bg-white px-2.5 py-0.5 text-sm text-brand-black"
                      >
                        {tt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm text-brand-black">
                <p className="text-base font-semibold text-primary">
                  {fitmentDisplay.kind === 'model' ? 'Предварительные параметры по модели' : 'Возможные параметры'}
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  <p className="text-xs text-gray-600">Период в каталоге: {fitmentDisplay.sample.yearRange}</p>
                  <p className="text-xs text-gray-600">Шины (примеры):</p>
                  <div className="flex flex-wrap gap-1.5">
                    {fitmentDisplay.sample.tires.map((tt) => (
                      <span
                        key={tt}
                        className="inline-flex items-center rounded-full border border-gray-medium/30 bg-white px-2.5 py-0.5 text-sm text-brand-black"
                      >
                        {tt}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">Диски:</p>
                  <ul className="list-disc pl-4 text-sm text-brand-black">
                    <li>PCD: {fitmentDisplay.sample.wheels[0]}</li>
                    <li>ET: {fitmentDisplay.sample.wheels[1]}</li>
                    <li>DIA: {fitmentDisplay.sample.wheels[2]}</li>
                  </ul>
                  <button
                    type="button"
                    onClick={applyCatalogFitment}
                    className="h-11 w-full rounded-lg border border-primary bg-white px-3 text-sm font-medium text-primary hover:bg-primary/10 sm:w-auto"
                  >
                    Заполнить из подсказки
                  </button>
                  <p className="border-t border-primary/15 pt-3 text-xs text-gray-600">{FITMENT_DISCLAIMER}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <label className={labelCls} htmlFor="ws-tire">
            Размер шин (можно изменить вручную)
          </label>
          <input
            id="ws-tire"
            type="text"
            value={tireSize}
            onChange={(e) => {
              setTireSize(e.target.value);
              setAppliedCatalogSuggestions(false);
            }}
            placeholder="например: 225/45 R18"
            className={`${neutralNoErr} placeholder:text-gray-medium/60`}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="ws-wheel">
            Параметры дисков (можно изменить вручную)
          </label>
          <input
            id="ws-wheel"
            type="text"
            value={wheelParams}
            onChange={(e) => {
              setWheelParams(e.target.value);
              setAppliedCatalogSuggestions(false);
            }}
            placeholder="например: 5x114.3, ET 40, DIA 60.1"
            className={`${neutralNoErr} placeholder:text-gray-medium/60`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="ws-budget">
            Бюджет
          </label>
          <select
            id="ws-budget"
            value={budgetKey}
            onChange={(e) => {
              setBudgetKey(e.target.value);
              if (e.target.value !== 'custom') setBudgetCustom('');
            }}
            className={neutralNoErr}
            aria-label="Бюджет"
          >
            {BUDGET_PRESETS.map((o) => (
              <option key={o.value || 'empty'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="ws-season">
            Сезон
          </label>
          <select
            id="ws-season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className={neutralNoErr}
            aria-label="Сезон"
          >
            <option value="">Выберите сезон</option>
            {SEASON_OPTIONS_SORTED.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {budgetKey === 'custom' && (
          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="ws-budget-custom">
              Свой бюджет
            </label>
            <input
              id="ws-budget-custom"
              type="text"
              value={budgetCustom}
              onChange={(e) => setBudgetCustom(e.target.value)}
              placeholder="например: до 80 000 ₽"
              className={`${neutralNoErr} placeholder:text-gray-medium/60`}
            />
          </div>
        )}

        <div>
          <label className={labelCls} htmlFor="ws-style">
            Стиль
          </label>
          <select
            id="ws-style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className={neutralNoErr}
            aria-label="Стиль"
          >
            <option value="">Выберите стиль</option>
            {STYLE_OPTIONS_SORTED.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <FieldPairSpacer />

        <div className="md:col-span-2">
          <p className={labelCls}>Аксессуары</p>
          <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-medium/30 bg-white p-3 md:grid-cols-3">
            {ACCESSORY_OPTIONS_SORTED.map((opt) => {
              const checked =
                opt === 'Не нужны'
                  ? accessorySelection.includes('Не нужны')
                  : accessorySelection.includes(opt) && !accessorySelection.includes('Не нужны');
              return (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-2 text-sm text-brand-black"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAccessory(opt)}
                    className="h-4 w-4 shrink-0 rounded border-gray-medium/30 text-primary focus:ring-primary"
                  />
                  <span className="leading-tight">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="ws-city">
            Город доставки
          </label>
          <input
            id="ws-city"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setErrors((prev) => ({ ...prev, city: undefined }));
            }}
            placeholder="город доставки"
            className={`${controlClass('city')} placeholder:text-gray-medium/60`}
            aria-invalid={!!errors.city}
          />
          {errors.city ? <p className="mt-1 text-xs text-red-600">{errors.city}</p> : null}
        </div>
        <div>
          <label className={labelCls} htmlFor="ws-phone">
            Телефон
          </label>
          <input
            id="ws-phone"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            className={controlClass('phone')}
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="ws-comment">
            Комментарий
          </label>
          <textarea
            id="ws-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className={textAreaClass}
          />
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-2 text-sm text-brand-black">
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
            <Link href={`/${locale}/privacy`} className="text-primary underline hover:text-accent-red">
              {common.consentLabelLink}
            </Link>
            {common.consentLabelEnd}
          </span>
        </label>
        {errors.consent ? <p className="mt-1 text-xs text-red-600">{errors.consent}</p> : null}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-accent-red disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? common.submitting : 'Отправить'}
        </button>
      </div>
    </form>
  );
}
