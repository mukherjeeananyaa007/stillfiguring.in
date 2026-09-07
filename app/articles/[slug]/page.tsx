import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { ShareControls } from '@/components/share-controls';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  const title = article.metaTitle ?? article.title;
  const description = article.metaDescription ?? article.excerpt;
  const canonical = `/articles/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: [
        {
          url: article.image,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const { content } = await compileMDX({ source: article.content });
  const allArticles = await getAllArticles();

  const relatedArticles = allArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      sharedTags: candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort((first, second) => {
      if (second.sharedTags !== first.sharedTags) {
        return second.sharedTags - first.sharedTags;
      }
      return new Date(second.candidate.date).getTime() - new Date(first.candidate.date).getTime();
    })
    .slice(0, 3)
    .map(({ candidate }) => candidate);

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
      <article className="article-body prose prose-lg mt-12">{content}</article>
      <ShareControls title={article.title} url={`https://www.stillfiguring.in/articles/${article.slug}`} />

      {relatedArticles.length > 0 && (
        <aside className="mt-12 pt-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl">If this resonated, you might also like</h2>
            <a href="/articles" className="text-sm text-accent underline decoration-accent-soft underline-offset-4 hover:decoration-accent">See all</a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <article key={related.slug} className="rounded border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-[rgb(var(--ink-muted))]">{related.tags[0]}</p>
                <h3 className="mt-3 text-xl leading-snug text-[rgb(var(--ink))]">
                  <a href={`/articles/${related.slug}`} className="hover:text-accent">{related.title}</a>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[rgb(var(--ink-muted))]">{related.excerpt}</p>
              </article>
            ))}
          </div>
        </aside>
      )}
    </main>
  );
}
