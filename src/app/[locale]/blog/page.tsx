import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { BlogCard } from '@/components/BlogCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildMetadata({
    path: '/blog',
    locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const posts = getAllPosts(locale);

  return (
    <Section spacing="md">
      <Container>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
            { label: tNav('blog') },
          ]}
        />
        <div className="mt-8 mb-10 max-w-2xl">
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 text-pretty">
            {t('subtitle')}
          </p>
        </div>

        {posts.length === 0 ? (
          <Card padding="lg" className="text-center text-ink-secondary">
            {t('noPosts')}
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p, i) => (
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
                featured={i === 0}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
