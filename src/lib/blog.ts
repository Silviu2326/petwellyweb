import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';

/**
 * Carga posts del blog desde `content/blog/{locale}/<slug>.mdx`.
 *
 * Cada post tiene frontmatter:
 *   ---
 *   title: "..."
 *   description: "..."
 *   date: 2026-01-15
 *   updated: 2026-02-01      (opcional)
 *   author: "Sara M."
 *   tags: [salud, vacunas]
 *   cover: /blog/...svg
 *   draft: false             (opcional)
 *   ---
 *
 * `getAllPosts(locale)` devuelve los frontmatters ordenados por fecha
 * descendente, sin el contenido. `getPost(locale, slug)` lee el MDX
 * crudo + frontmatter para renderizar.
 */

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  cover: string;
  draft?: boolean;
  /** Tiempo de lectura en minutos (calculado, no se pone en frontmatter). */
  readingMinutes: number;
}

export interface Post {
  slug: string;
  locale: Locale;
  frontmatter: PostFrontmatter;
  /** Contenido MDX crudo (string). */
  content: string;
}

function readingMinutesFor(content: string) {
  const wpm = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / wpm));
}

function listFiles(locale: Locale): string[] {
  const dir = path.join(BLOG_ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

export function getAllPostSlugs(locale: Locale): string[] {
  return listFiles(locale).map((f) => f.replace(/\.mdx?$/, ''));
}

export function getAllPosts(locale: Locale): Omit<Post, 'content'>[] {
  return listFiles(locale)
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(BLOG_ROOT, locale, file), 'utf8');
      const { data, content } = matter(raw);
      const fm: PostFrontmatter = {
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        date: String(data.date ?? new Date().toISOString().slice(0, 10)),
        updated: data.updated ? String(data.updated) : undefined,
        author: String(data.author ?? 'Equipo Petwellly'),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: String(data.cover ?? '/blog/default.svg'),
        draft: Boolean(data.draft),
        readingMinutes: readingMinutesFor(content),
      };
      return { slug, locale, frontmatter: fm };
    })
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  const files = listFiles(locale);
  const match = files.find((f) => f.replace(/\.mdx?$/, '') === slug);
  if (!match) return undefined;
  const raw = fs.readFileSync(path.join(BLOG_ROOT, locale, match), 'utf8');
  const { data, content } = matter(raw);
  if (data.draft) return undefined;
  const fm: PostFrontmatter = {
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? 'Equipo Petwellly'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? '/blog/default.svg'),
    draft: false,
    readingMinutes: readingMinutesFor(content),
  };
  return { slug, locale, frontmatter: fm, content };
}

export function getRelatedPosts(locale: Locale, slug: string, limit = 3) {
  const all = getAllPosts(locale);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const tagSet = new Set(current.frontmatter.tags);
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = p.frontmatter.tags.filter((t) => tagSet.has(t)).length;
      return { post: p, overlap };
    })
    .sort((a, b) => (b.overlap !== a.overlap ? b.overlap - a.overlap : 0))
    .slice(0, limit)
    .map((x) => x.post);
}
