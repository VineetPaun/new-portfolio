import { getSiteUrl } from '@/lib/seo';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
    host: siteUrl || undefined,
  };
}
