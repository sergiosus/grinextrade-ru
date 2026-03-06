import { locales } from '@/lib/i18n/config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grinextrade.ru';

export default function sitemap() {
  const paths = ['', '/products', '/government', '/about', '/contact'];
  const entries = locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${baseUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' as const : ('monthly' as const),
      priority: path === '' ? 1 : 0.8,
    }))
  );
  return entries;
}
