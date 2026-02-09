import AWS from '@/components/technologies/AWS';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  technologies: Technology[];
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'Zignuts Technolab',
    position: 'Full Stack Developer',
    location: 'Gandhinagar',
    image: '/company/zignuts.png',
    description: [
      'Contributed to production-level web apps using Next.js, TypeScript, Node.js, and PostgreSQL. ',
      'Designed and implemented REST APIs with proper error handling and validation.',
      'Improved frontend performance by optimizing component rendering and API calls.',
    ],
    startDate: 'January 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'Vercel',
        href: 'https://vercel.com/',
        icon: <Vercel />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      {
        name: 'Postman',
        href: 'https://www.postman.com/',
        icon: <Postman />,
      },
      {
        name: 'NodeJs',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
      {
        name: 'ExprssJs',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },
      {
        name: 'MongoDB',
        href: 'https://www.mongodb.com/',
        icon: <MongoDB />,
      },
      {
        name: 'PostgreSQL ',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'Prisma',
        href: 'https://www.prisma.io/',
        icon: <Prisma />,
      },
      {
        name: 'ShadCN',
        href: 'https://ui.shadcn.com/',
        icon: <Shadcn />,
      },
    ],
    website: 'https://www.zignuts.com',
    x: 'https://x.com/ZignutsTechno',
  }
];
