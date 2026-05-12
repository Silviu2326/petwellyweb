import { siteConfig } from './site';
import type { Locale } from '@/i18n/routing';

/**
 * Generadores de JSON-LD (Schema.org) para inyectar en `<script>`.
 * Cada función devuelve un objeto plano que se serializa a JSON.
 *
 * Usa el componente `JsonLd` (`src/components/JsonLd.tsx`) para
 * pintarlo en la página.
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    description:
      locale === 'en' ? siteConfig.descriptionEn : siteConfig.description,
    foundingDate: siteConfig.founded,
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteConfig.address.country,
      addressRegion: siteConfig.address.region,
      addressLocality: siteConfig.address.locality,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteConfig.email.sales,
        availableLanguage: ['Spanish', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.email.support,
        availableLanguage: ['Spanish', 'English'],
      },
    ],
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
    publisher: { '@id': `${siteConfig.url}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function softwareApplicationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM',
    operatingSystem: 'Web, iOS, Android',
    description:
      locale === 'en' ? siteConfig.descriptionEn : siteConfig.description,
    url: siteConfig.url,
    featureList: [
      'Dog records', 'Litter management', 'Vet calendar',
      'Client portal', 'Sales pipeline', 'Invoicing',
      'Inventory', 'Microsite generator',
    ],
  };
}

interface FaqItem { q: string; a: string }
export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ArticleJsonLdInput {
  url: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  locale: Locale;
}
export function articleJsonLd({
  url,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  locale,
}: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: title,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/favicon.svg` },
    },
  };
}

interface ProductPlanJsonLdInput {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
}
export function productPlansJsonLd(plans: ProductPlanJsonLdInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${siteConfig.name} — Plans`,
    brand: { '@type': 'Brand', name: siteConfig.name },
    offers: plans.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.description,
      price: p.yearly,
      priceCurrency: 'EUR',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      url: `${siteConfig.url}/precios`,
    })),
  };
}
