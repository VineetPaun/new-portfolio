import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  buildJsonLd,
  createPageMetadata,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { getAllTags, getPublishedBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { BlogPageClient } from './BlogPageClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Blogs',
  description:
    'Read engineering blogs by Vineet Paun on AI, full stack development, and practical software architecture.',
  path: '/blog',
  keywords: ['engineering blog', 'AI blog', 'Next.js tutorials', 'TypeScript'],
});

function BlogPageLoading() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-32" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        <Separator />

        {/* Tags Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
          </div>
        </div>

        {/* Blog Posts Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default async function BlogPage() {
  const allPosts = await getPublishedBlogPosts();
  const allTags = await getAllTags();
  const breadcrumbSchema = buildJsonLd(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blogs', path: '/blog' },
    ]),
  );

  return (
    <Suspense fallback={<BlogPageLoading />}>
      {breadcrumbSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
      ) : null}
      <BlogPageClient initialPosts={allPosts} initialTags={allTags} />
    </Suspense>
  );
}
