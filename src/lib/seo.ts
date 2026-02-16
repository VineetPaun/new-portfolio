import { about } from '@/config/About';
import { heroConfig, socialLinks } from '@/config/Hero';
import { seoConfig } from '@/config/Seo';
import { Metadata, Viewport } from 'next';

type MetadataType = 'website' | 'article' | 'profile';

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  type?: MetadataType;
  noIndex?: boolean;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

const clean = (value?: string) => value?.trim() ?? '';

const normalizeSiteUrl = (url: string) => {
  if (!url) return '';
  return url.replace(/\/$/, '');
};

const xHandle = clean(seoConfig.xHandle).replace(/^@/, '');
const siteUrl = normalizeSiteUrl(clean(seoConfig.siteUrl));
const siteName = clean(seoConfig.siteName) || about.name;
const locale = clean(seoConfig.locale) || 'en_US';

const defaultTitle = clean(seoConfig.defaultTitle) || `${about.name} | Portfolio`;
const defaultDescription =
  clean(seoConfig.defaultDescription) ||
  about.description ||
  'Personal portfolio website.';

const defaultImagePath = clean(seoConfig.defaultOgImagePath);
const defaultImageAlt = clean(seoConfig.defaultOgImageAlt) || defaultTitle;
const sameAsLinks = socialLinks
  .map((link) => clean(link.href))
  .filter((href) => href.startsWith('http'));

const uniqueKeywords = (...sets: Array<readonly string[] | undefined>) => {
  const values = sets
    .flatMap((set) => set ?? [])
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return Array.from(new Set(values));
};

export const getSiteUrl = () => siteUrl;

export const toAbsoluteUrl = (pathOrUrl?: string) => {
  const value = clean(pathOrUrl);
  if (!value) return undefined;

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (!siteUrl) return undefined;

  const path = value.startsWith('/') ? value : `/${value}`;
  return `${siteUrl}${path}`;
};

const withSiteSuffix = (title?: string) => {
  const cleanTitle = clean(title);
  if (!cleanTitle) return defaultTitle;
  if (cleanTitle.toLowerCase() === siteName.toLowerCase()) return cleanTitle;
  return `${cleanTitle} | ${siteName}`;
};

const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

const verification = {
  google: clean(seoConfig.googleSiteVerification) || undefined,
  yandex: clean(seoConfig.yandexVerification) || undefined,
  yahoo: undefined,
  other: {
    ...(clean(seoConfig.bingSiteVerification)
      ? { 'msvalidate.01': clean(seoConfig.bingSiteVerification) }
      : {}),
    ...(clean(seoConfig.baiduVerification)
      ? { baidu: clean(seoConfig.baiduVerification) }
      : {}),
  },
};

const hasVerification =
  verification.google ||
  verification.yandex ||
  verification.yahoo ||
  Object.keys(verification.other).length > 0;

export const createPageMetadata = ({
  title,
  description,
  path,
  keywords,
  type = 'website',
  noIndex = false,
}: PageMetadataOptions = {}): Metadata => {
  const resolvedTitle = withSiteSuffix(title);
  const resolvedDescription = clean(description) || defaultDescription;
  const canonical = toAbsoluteUrl(path || '/');
  const defaultImage = toAbsoluteUrl(defaultImagePath || '/opengraph-image');
  const twitterImage = toAbsoluteUrl('/twitter-image') || defaultImage;

  const mergedKeywords = uniqueKeywords(seoConfig.keywords, keywords);

  return {
    metadataBase,
    applicationName: siteName,
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: mergedKeywords,
    alternates: canonical ? { canonical } : undefined,
    category: clean(seoConfig.category) || undefined,
    authors: [{ name: about.name, url: toAbsoluteUrl('/') }],
    creator: about.name,
    publisher: clean(seoConfig.organizationName) || about.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      type,
      locale,
      siteName,
      url: canonical,
      images: defaultImage
        ? [
            {
              url: defaultImage,
              width: 1200,
              height: 630,
              alt: defaultImageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      creator: xHandle ? `@${xHandle}` : undefined,
      images: twitterImage ? [twitterImage] : undefined,
    },
    verification: hasVerification ? verification : undefined,
  };
};

export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const getWebsiteSchema = () => {
  const rootUrl = toAbsoluteUrl('/');
  if (!rootUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: rootUrl,
    inLanguage: 'en',
    description: defaultDescription,
    publisher: {
      '@type': 'Person',
      name: about.name,
      url: rootUrl,
    },
    potentialAction: clean(seoConfig.searchActionTarget)
      ? {
          '@type': 'SearchAction',
          target: clean(seoConfig.searchActionTarget),
          'query-input': 'required name=search_term_string',
        }
      : undefined,
  };
};

export const getPersonSchema = () => {
  const rootUrl = toAbsoluteUrl('/');
  if (!rootUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.name,
    url: rootUrl,
    image: toAbsoluteUrl(heroConfig.avatar),
    jobTitle: heroConfig.title,
    description: about.description,
    email: clean(seoConfig.contactEmail) || undefined,
    telephone: clean(seoConfig.phone) || undefined,
    sameAs: sameAsLinks.length > 0 ? sameAsLinks : undefined,
    knowsAbout: uniqueKeywords(seoConfig.keywords),
    address:
      clean(seoConfig.addressLocality) ||
      clean(seoConfig.addressRegion) ||
      clean(seoConfig.postalCode) ||
      clean(seoConfig.addressCountry)
        ? {
            '@type': 'PostalAddress',
            addressLocality: clean(seoConfig.addressLocality),
            addressRegion: clean(seoConfig.addressRegion),
            postalCode: clean(seoConfig.postalCode),
            addressCountry: clean(seoConfig.addressCountry),
          }
        : undefined,
  };
};

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const listItems = items
    .map((item, index) => {
      const absoluteUrl = toAbsoluteUrl(item.path);
      if (!absoluteUrl) return null;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl,
      };
    })
    .filter(Boolean);

  if (listItems.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  };
};

export const buildJsonLd = (payload: Record<string, unknown> | null) => {
  if (!payload) return null;
  return JSON.stringify(payload);
};
