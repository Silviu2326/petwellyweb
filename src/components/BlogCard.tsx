import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Card } from './Card';
import { Badge } from './Badge';
import type { Locale } from '@/i18n/routing';

interface BlogCardProps {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  cover: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  readMoreLabel: string;
  minReadLabel: string;
  featured?: boolean;
}

export function BlogCard({
  slug,
  title,
  description,
  cover,
  date,
  readingMinutes,
  tags,
  readMoreLabel,
  minReadLabel,
  featured = false,
}: BlogCardProps) {
  const dateText = new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card padding="none" className="overflow-hidden hover:shadow-cardHover transition-all group h-full flex flex-col">
      <Link
        href={{ pathname: '/blog/[slug]', params: { slug } }}
        className="block"
      >
        <div className="aspect-[16/9] bg-primary-lighter overflow-hidden">
          {/* Imagen de portada (SVG/JPG en /public/blog) */}
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="info" className="text-2xs">
              {tag}
            </Badge>
          ))}
          {featured && <Badge variant="warning" className="text-2xs">★</Badge>}
        </div>
        <Link
          href={{ pathname: '/blog/[slug]', params: { slug } }}
          className="block"
        >
          <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-ink-secondary mt-2 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>
        <div className="mt-5 pt-4 border-t border-line-light flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} aria-hidden /> {dateText}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden /> {readingMinutes} {minReadLabel}
            </span>
          </div>
          <Link
            href={{ pathname: '/blog/[slug]', params: { slug } }}
            className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-1.5 transition-all"
            aria-label={`${readMoreLabel}: ${title}`}
          >
            {readMoreLabel} <ArrowRight size={12} aria-hidden />
          </Link>
        </div>
      </div>
    </Card>
  );
}
