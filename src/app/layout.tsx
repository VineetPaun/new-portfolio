import LazyChatBubble from '@/components/common/LazyChatBubble';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import {
  buildJsonLd,
  createPageMetadata,
  defaultViewport,
  getPersonSchema,
  getWebsiteSchema,
} from '@/lib/seo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ReactLenis from 'lenis/react';
import { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Full Stack AI Developer Portfolio and Engineering Projects',
    description:
      'Explore the portfolio of Vineet Paun, featuring full stack AI projects, technical blogs, work experience, and contact details.',
    path: '/',
    keywords: ['software engineer', 'AI projects', 'developer portfolio'],
    type: 'profile',
  }),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/favicon.ico' }],
  },
};

export const viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = buildJsonLd(getWebsiteSchema());
  const personSchema = buildJsonLd(getPersonSchema());

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-hanken-grotesk antialiased`}>
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactLenis root>
              <Navbar />
              <main>{children}</main>
              <Quote />
              <LazyChatBubble />
            </ReactLenis>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
