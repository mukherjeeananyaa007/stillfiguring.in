import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const { content } = await compileMDX({ source: article.content });

  return (
    <main className="reading-width px-4 py-16 sm:py-24">
      <header className="border-b border-[rgb(var(--line))] pb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[rgb(var(--ink-muted))]">
          <span>{article.author}</span><span aria-hidden="true">/</span><time dateTime={article.date}>{formatDate(article.date)}</time><span aria-hidden="true">/</span><span>{article.readingTime}</span>
        </div>
        <h1 className="mt-6 text-5xl leading-[1.02] sm:text-7xl">{article.title}</h1>
        <p className="mt-6 text-xl leading-8 text-[rgb(var(--ink-muted))]">{article.excerpt}</p>
      </header>
        <figure className="mt-10 overflow-hidden bg-[rgb(var(--paper-raised))]">
          <img src={article.image} alt={article.imageAlt} className="aspect-[16/9] h-auto w-full object-cover" width={1200} height={675} />
        </figure>
      <article className="prose prose-lg mt-12">{content}</article>
    </main>
  );
}
