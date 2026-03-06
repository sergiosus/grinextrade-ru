'use client';

import type { Product } from '@/types/product';
import type { Locale } from '@/lib/i18n/config';
import { ProductImage } from '@/components/ProductImage';

type Props = {
  product: Product;
  locale: Locale;
  categoryText: string;
};

export function ProductCard({ product, locale, categoryText }: Props) {
  const name = product.name[locale] ?? product.name.en;
  const description = product.description[locale] ?? product.description.en;

  return (
    <article className="group bg-white rounded-2xl border border-gray-light overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-light">
        <ProductImage
          src={product.image}
          alt={name}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col min-h-0">
        <h2 className="font-semibold text-brand-black text-lg mb-1 line-clamp-2">{name}</h2>
        <p className="text-sm text-primary font-medium mb-2 line-clamp-1">{categoryText}</p>
        <p className="text-gray-medium text-sm flex-1 line-clamp-3 md:line-clamp-4 leading-relaxed min-h-0">{description}</p>
      </div>
    </article>
  );
}
