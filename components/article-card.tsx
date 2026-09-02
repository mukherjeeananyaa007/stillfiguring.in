import Link from 'next/link';
import type { Article } from '@/lib/articles';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group border-t border-[rgb(var(--line))] py-7 first:border-t-0">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[rgb(var(--ink-muted))]">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true">/</span>
        <span>{article.readingTime}</span>
      </div>
      <h2 className="max-w-3xl text-3xl leading-tight text-[rgb(var(--ink))] sm:text-4xl">
        <Link href={`/articles/${article.slug}`} className="transition-colors group-hover:text-accent">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[rgb(var(--ink-muted))]">{article.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.map((tag) => <span key={tag} className="bg-[rgb(var(--accent-soft))] px-2.5 py-1 text-xs text-[rgb(var(--ink))]">{tag}</span>)}
      </div>
    </article>
  );
}
