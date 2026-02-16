import { getSiteUrl, toAbsoluteUrl } from '@/lib/seo';
import { MetadataRoute } from 'next';

const ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/work-experience', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/resume', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const now = new Date();

  return ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path) || siteUrl,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
