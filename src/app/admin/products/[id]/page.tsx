'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import type { Product, LocalizedString } from '@/types/product';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';

function toRecord(o: LocalizedString | undefined): Record<Locale, string> {
  const base = o ?? { en: '' };
  return Object.fromEntries(locales.map((l) => [l, base[l] ?? base.en ?? ''])) as Record<Locale, string>;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [image, setImage] = useState('');
  const [name, setName] = useState<Record<Locale, string>>({} as Record<Locale, string>);
  const [description, setDescription] = useState<Record<Locale, string>>({} as Record<Locale, string>);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((p: Product) => {
        setImage(p.image ?? '');
        setName(toRecord(p.name));
        setDescription(toRecord(p.description));
        setCategory(p.category ?? '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, name, description, category }),
      });
      if (res.ok) router.push('/admin');
      else alert('Error updating product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Link href="/admin" className="text-primary-600 hover:underline mb-4 inline-block">← Back</Link>
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!name || !category) {
    return (
      <div>
        <Link href="/admin" className="text-primary-600 hover:underline mb-4 inline-block">← Back</Link>
        <p className="text-slate-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin" className="text-primary-600 hover:underline mb-4 inline-block">
        ← Back to products
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 bg-white p-6 rounded-xl border border-slate-200">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image path</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          >
            <option value="Textile Products">Textile Products</option>
            <option value="Oil & Gas Products">Oil & Gas Products</option>
            <option value="Industrial Goods">Industrial Goods</option>
          </select>
        </div>
        {locales.map((loc) => (
          <fieldset key={loc} className="border border-slate-200 rounded-lg p-4">
            <legend className="text-sm font-medium text-slate-700 px-2">{loc.toUpperCase()}</legend>
            <div className="space-y-3 mt-2">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input
                  value={name[loc] ?? ''}
                  onChange={(e) => setName((p) => ({ ...p, [loc]: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  required={loc === 'en'}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Description</label>
                <textarea
                  value={description[loc] ?? ''}
                  onChange={(e) => setDescription((p) => ({ ...p, [loc]: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  required={loc === 'en'}
                />
              </div>
            </div>
          </fieldset>
        ))}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-70"
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
          <Link href="/admin" className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
