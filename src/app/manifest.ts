import { seoConfig } from '@/config/Seo';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.siteName,
    short_name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/assets/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
