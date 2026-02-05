import Bun from '@/components/technologies/Bun';
import Clerk from '@/components/technologies/Clerk';
import ConvexDB from '@/components/technologies/ConvexDB';
import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
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
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Clerk', icon: <Clerk key="clerk" /> },
      { name: 'ConvexDB', icon: <ConvexDB key="convex" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
    ],
    github: 'https://github.com/VineetPaun/docsy',
    live: 'https://docsy-ten.vercel.app/',
    details: true,
    isWorking: true,
  },
  {
    title: 'BlinkBuy',
    description:
      'BlinkBuy is an AI-powered quick commerce web app that converts natural language user prompts into structured cart actions (add, remove, update), enabling intent-driven shopping instead of manual browsing.',
    image: '/project/blinkbuy.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
    ],
    github: 'https://github.com/VineetPaun/blinkbuy',
    live: 'https://blinkbuy.vercel.app/',
    details: true,
    isWorking: true,
  },
  {
    title: 'PersonaChat',
    description:
      'PersonaChat is an interactive AI chat platform where you can talk to predefined personas or create your own with custom tone, style, and personality',
    image: '/project/personachat.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
    ],
    github: 'https://github.com/VineetPaun/persona-chat',
    live: 'https://persona-chat-beryl.vercel.app/',
    details: true,
    isWorking: true,
  },
  {
    title: 'JobKyuNahiLagRahi',
    description:
      'JobKyuNahiLagRahi is an resume & job application AI reviewer with PDF parsing, OAuth authentication, and chat interface ',
    image: '/project/jobkyunahilagrahi.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
    ],
    github: 'https://github.com/VineetPaun/jobkyunahilagrahi',
    live: 'https://jobkyunahilagrahi.vercel.app/',
    details: true,
    isWorking: true,
  },
];
