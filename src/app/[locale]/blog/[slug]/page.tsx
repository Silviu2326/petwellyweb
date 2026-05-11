import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Calendar, Clock, User } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Link, locales } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { BlogCard } from '@/components/BlogCard';
import { articleJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getAllPostSlugs, getPost, getRelatedPosts } from '@/lib/blog';

interface Params { locale: Locale; slug: string }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: Params;
}): Promise<Metadata> {
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    path: '/blog/[slug]',
    params: { slug },
    locale,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.cover,
    ogType: 'article',
    publishedTime: post.frontmatter.date,
    modifiedTime: post.frontmatter.updated,
    authors: [post.frontmatter.author],
    keywords: post.frontmatter.tags,
  });
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: Params;
}) {
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const related = getRelatedPosts(locale, slug, 3);

  const dateText = new Date(post.frontmatter.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const articleUrl = `${siteConfig.url}/${locale}/blog/${slug}`;
  const coverAbs = post.frontmatter.cover.startsWith('http')
    ? post.frontmatter.cover
    : `${siteConfig.url}${post.frontmatter.cover}`;

  return (
    <>
      <Section spacing="md">
        <Container size="narrow">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('blog'), href: '/blog' },
              { label: post.frontmatter.title },
            ]}
          />
          <div className="mt-8 mb-2 flex flex-wrap items-center gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="info">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-balance">{post.frontmatter.title}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 max-w-3xl text-pretty">
            {post.frontmatter.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <User size={14} aria-hidden /> {t('by')} {post.frontmatter.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} aria-hidden /> {dateText}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden /> {post.frontmatter.readingMinutes} {t('minRead')}
            </span>
          </div>
        </Container>
      </Section>

      {/* Cover */}
      <Container size="narrow" className="mb-10">
        <div className="aspect-[16/8] rounded-3xl bg-primary-lighter overflow-hidden shadow-card">
          <img
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Container>

      {/* Content */}
      <Container size="narrow" className="mb-16">
        <article className="prose-petwelly">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
              },
            }}
          />
        </article>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Section background="secondary" spacing="md">
          <div className="text-center mb-10">
            <h2>{t('related')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <BlogCard
                key={p.slug}
                slug={p.slug}
                locale={locale}
                title={p.frontmatter.title}
                description={p.frontmatter.description}
                cover={p.frontmatter.cover}
                date={p.frontmatter.date}
                readingMinutes={p.frontmatter.readingMinutes}
                tags={p.frontmatter.tags}
                readMoreLabel={t('readMore')}
                minReadLabel={t('minRead')}
              />
            ))}
          </div>
        </Section>
      )}

      <Section size="narrow" spacing="sm">
        <CTASection
          title={
            locale === 'es'
              ? '¿Te ha sido útil? Pruébalo en tu criadero.'
              : 'Useful? Try it in your kennel.'
          }
          body={
            locale === 'es'
              ? '14 días gratis. Sin tarjeta. Migramos tus datos por ti.'
              : '14 days free. No card. We migrate your data for you.'
          }
          primary={{
            label: locale === 'es' ? 'Empezar gratis' : 'Start for free',
            external: `${siteConfig.appUrl}/register`,
          }}
          secondary={{
            label: t('back'),
            href: '/blog',
          }}
        />
      </Section>

      <JsonLd
        data={articleJsonLd({
          url: articleUrl,
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          image: coverAbs,
          datePublished: post.frontmatter.date,
          dateModified: post.frontmatter.updated,
          authorName: post.frontmatter.author,
          locale,
        })}
        id="article-jsonld"
      />
      {/* Linterna anti-tree-shaking: nada que hacer */}
      <span hidden>{tNav('blog')}</span>
      <Link href="/blog" className="hidden">.</Link>
    </>
  );
}
