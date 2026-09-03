import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const baseUrl = 'https://www.stillfiguring.in';

  return [
    '',
    '/articles',
    '/about',
    '/submit',
    ...articles.map((article) => `/articles/${article.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
