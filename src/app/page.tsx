import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import { createPageMetadata } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Full Stack AI Developer Portfolio and Engineering Blog',
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
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Work />
      <About />
      <Github />
      <Blog />
    </Container>
  );
}
