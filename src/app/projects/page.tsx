import Container from '@/components/common/Container';
import { ProjectList } from '@/components/projects/ProjectList';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/config/Projects';
import {
  buildJsonLd,
  createPageMetadata,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Browse full stack and AI-focused projects by Vineet Paun, including production-ready web applications and experiments.',
  path: '/projects',
  keywords: ['software projects', 'AI projects', 'full stack projects'],
});

export default function ProjectsPage() {
  const breadcrumbSchema = buildJsonLd(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
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
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A collection of projects I&apos;ve built, from AI-powered apps to
            full-stack web applications.
          </p>
        </div>

        <Separator />

        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              All Projects
              {projects.length > 0 && (
                <span className="text-muted-foreground ml-2 text-sm font-normal">
                  ({projects.length}{' '}
                  {projects.length === 1 ? 'project' : 'projects'})
                </span>
              )}
            </h2>
          </div>

          <ProjectList projects={projects} />
        </div>
      </div>
    </Container>
  );
}
