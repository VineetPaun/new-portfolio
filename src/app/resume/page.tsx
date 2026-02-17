import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { resumeConfig } from '@/config/Resume';
import {
  buildJsonLd,
  createPageMetadata,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Software Engineer Resume and Technical Skills',
  description:
    'View the latest resume of Vineet Paun, including technical skills, project experience, and professional background.',
  path: '/resume',
  keywords: ['resume', 'CV', 'software engineer resume'],
});

export default function ResumePage() {
  const breadcrumbSchema = buildJsonLd(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/resume' },
    ]),
  );

  return (
    <Container className="py-16">
      {breadcrumbSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
      ) : null}
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Resume
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My resume.
          </p>
        </div>
        <Separator />
        <div className="mx-auto max-w-2xl">
          <iframe
            src={resumeConfig.url}
            className="min-h-screen w-full"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
