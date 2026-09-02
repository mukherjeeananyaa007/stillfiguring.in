'use client';

import { useState } from 'react';
import type { Article } from '@/lib/articles';
import { ArticleCard } from './article-card';

export function ArticleArchive({ articles, tags }: { articles: Article[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState('All');
  const filteredArticles = activeTag === 'All' ? articles : articles.filter((article) => article.tags.includes(activeTag));

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" aria-label="Filter articles by tag">
        {['All', ...tags].map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`border px-3 py-1.5 text-sm transition-colors ${activeTag === tag ? 'border-accent bg-accent text-white' : 'border-[rgb(var(--line))] text-[rgb(var(--ink-muted))] hover:border-accent hover:text-accent'}`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div>
        {filteredArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
        {filteredArticles.length === 0 && <p className="border-t border-[rgb(var(--line))] pt-7 text-[rgb(var(--ink-muted))]">No articles with this tag yet.</p>}
      </div>
    </>
  );
}
