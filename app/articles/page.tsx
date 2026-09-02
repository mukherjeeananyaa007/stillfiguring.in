import { ArticleArchive } from '@/components/article-archive';
import { getAllArticles } from '@/lib/articles';

export const metadata = { title: 'Articles' };

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const tags = Array.from(new Set(articles.flatMap((article) => article.tags))).sort();

  return (
    <main className="page-shell py-16 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">The archive</p>
        <h1 className="mt-4 text-5xl leading-none sm:text-6xl">All the questions we&apos;re carrying.</h1>
        <p className="mt-6 text-lg leading-8 text-[rgb(var(--ink-muted))]">Long-form writing about work, identity, relationships, and the strange middle of things.</p>
      </header>
      <ArticleArchive articles={articles} tags={tags} />
    </main>
  );
}
