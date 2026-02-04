import Bun from '@/components/technologies/Bun';
import Clerk from '@/components/technologies/Clerk';
import ConvexDB from '@/components/technologies/ConvexDB';
import ExpressJs from '@/components/technologies/ExpressJs';
import Github from '@/components/technologies/Github';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Docsy',
    description:
      'Docsy is a RAG-powered AI app that lets you chat with your own documents. Upload PDFs or text files and get accurate, source-grounded answers using semantic search and large language models.',
    image: '/project/docsy.png',
    link: 'https://docsy-ten.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Clerk', icon: <Clerk key="clerk" /> },
      { name: 'ConvexDB', icon: <ConvexDB key="convex" /> },
    ],
    github: 'https://github.com/VineetPaun/docsy',
    live: 'https://docsy-ten.vercel.app/',
    details: true,
    isWorking: true,
  },
];
