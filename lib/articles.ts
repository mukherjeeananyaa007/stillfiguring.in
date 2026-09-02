import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  image: string;
  imageAlt: string;
};

export type Article = ArticleFrontmatter & {
  content: string;
};

async function readArticle(filename: string): Promise<Article> {
  const source = await fs.readFile(path.join(articlesDirectory, filename), 'utf8');
  const { data, content } = matter(source);

  return {
    ...(data as ArticleFrontmatter),
    content,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const filenames = await fs.readdir(articlesDirectory);
  const articles = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map(readArticle),
  );

  return articles.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
