import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import {
  buildJsonLd,
  createPageMetadata,
  getPersonSchema,
  getWebsiteSchema,
} from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Home',
  description:
    'Vineet Paun is a full stack AI-ready developer building scalable backend-driven web apps and AI products with Next.js, React, TypeScript, and Bun.',
  path: '/',
  keywords: [
    'Vineet Paun portfolio',
    'full stack AI-ready developer',
    'Next.js portfolio',
  ],
  type: 'profile',
});

export default function page() {
  const websiteSchema = buildJsonLd(getWebsiteSchema());
  const personSchema = buildJsonLd(getPersonSchema());

  return (
    <Container className="min-h-screen py-16">
      {websiteSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteSchema }}
        />
      ) : null}
      {personSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personSchema }}
        />
      ) : null}
      <Hero />
      <Experience />
      <Work />
      <About />
      <Github />
      <Blog />
    </Container>
  );
}
