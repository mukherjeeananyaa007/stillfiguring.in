import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import { getAllArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <main>
      <section className="page-shell border-b border-[rgb(var(--line))] py-20 sm:py-28">
        <p className="eyebrow">A publication for the unfinished</p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-[0.98] sm:text-7xl">A calm place to think about the life you&apos;re still figuring out.</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[rgb(var(--ink-muted))]">Essays, opinions, and observations for the years when the map keeps changing.</p>
      </section>
      <section className="page-shell py-14 sm:py-20" aria-labelledby="latest-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="latest-heading" className="text-3xl sm:text-4xl">Latest thinking</h2>
          <Link href="/articles" className="text-sm text-accent underline decoration-accent-soft underline-offset-4 hover:decoration-accent">View archive</Link>
        </div>
        <div>{articles.slice(0, 5).map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
      </section>
    </main>
  );
}
