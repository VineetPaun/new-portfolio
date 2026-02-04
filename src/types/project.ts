export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: { name: string; icon: React.ReactNode }[];
  github?: string;
  live: string;
  details: boolean;
  isWorking: boolean;
}
