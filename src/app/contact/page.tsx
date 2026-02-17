import Container from '@/components/common/Container';
import ContactForm from '@/components/contact/ContactForm';
import { Separator } from '@/components/ui/separator';
import { contactConfig } from '@/config/Contact';
import {
  buildJsonLd,
  createPageMetadata,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact for Freelance and AI Product Development',
  description:
    'Get in touch with Vineet Paun for collaborations, freelance work, and full stack AI product development opportunities.',
  path: '/contact',
  keywords: ['contact Vineet Paun', 'hire full stack developer', 'freelance'],
});

export default function ContactPage() {
  const breadcrumbSchema = buildJsonLd(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
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
            {contactConfig.title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {contactConfig.description}
          </p>
        </div>
        <Separator />

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
