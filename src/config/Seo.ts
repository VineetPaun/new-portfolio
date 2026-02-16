export const seoConfig = {
  // Core
  siteName: 'Vineet Paun',
  siteUrl: process.env.NEXT_PUBLIC_URL?.trim() ?? '',
  locale: 'en_US',

  // Defaults
  defaultTitle: 'Vineet Paun | Full Stack AI-Ready Developer',
  defaultDescription:
    'Portfolio of Vineet Paun, a full stack AI-ready developer building backend-driven web applications and AI-powered products.',
  defaultOgImagePath: '/opengraph-image',
  defaultOgImageAlt: 'Vineet Paun portfolio profile image',
  category: 'technology',

  // Keywords
  keywords: [
    'Vineet Paun',
    'full stack developer',
    'AI developer',
    'Next.js developer',
    'TypeScript developer',
    'React developer',
    'portfolio',
    'web development',
  ],

  // Social
  xHandle: 'Vineet_Paun',

  // Fill these when available
  organizationName: '',
  organizationLogoPath: '',
  contactEmail: 'vineetpaun@gmail.com',
  phone: '',
  addressLocality: '',
  addressRegion: '',
  postalCode: '',
  addressCountry: '',
  searchActionTarget: '',

  // Search engine verification (fill later)
  googleSiteVerification: '',
  bingSiteVerification: '',
  yandexVerification: '',
  baiduVerification: '',
} as const;
