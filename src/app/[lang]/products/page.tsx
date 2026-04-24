import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductsCTA } from '@/components/ProductsCTA';
import { ContactForm } from '@/components/ContactForm';
import type { Translations } from '@/lib/i18n/translations';

function getCategoryText(t: Translations, category: string): string {
  if (category.includes('Textile')) return t.products.categoryTextile;
  if (category.includes('Oil') || category.includes('Gas')) return t.products.categoryOilGas;
  return t.products.categoryIndustrial;
}

type Props = { params: Promise<{ lang: Locale }>; searchParams: Promise<{ category?: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.products.title,
    description: t.products.subtitle + ' - Grinex Trade',
    path: '/products',
    locale: lang,
  });
}

function filterByCategory(products: Awaited<ReturnType<typeof getProducts>>, category: string | undefined) {
  if (!category) return products;
  if (category === 'textile') return products.filter((p) => p.category.includes('Textile'));
  if (category === 'oilgas') return products.filter((p) => p.category.includes('Oil') || p.category.includes('Gas'));
  return products;
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { category } = await searchParams;
  const t = getTranslations(lang);
  const allProducts = await getProducts();
  const products = filterByCategory(allProducts, category);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-2">
          {t.products.title}
        </h1>
        <p className="text-gray-medium mb-10">{t.products.subtitle}</p>

        {products.length === 0 ? (
          <p className="text-gray-medium py-12 text-center">{t.products.noProducts}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={lang}
                  categoryText={getCategoryText(t, product.category)}
                />
              ))}
            </div>
            <ProductsCTA label={t.products.requestQuote} />
          </>
        )}

        <div className="mt-14 md:mt-16">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-lg font-bold text-brand-black">{t.products.requestFormTitle}</h2>
              <p className="mt-2 text-sm text-gray-medium">{t.products.requestFormHelper}</p>
            </div>
            <div className="rounded-2xl border border-gray-light p-4 sm:p-5 shadow-sm">
              <ContactForm translations={t} locale={lang} initialProductName="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
