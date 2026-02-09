export interface BlogFrontmatter {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  isPublished: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  /** External URL to read the full post (e.g. Hashnode) */
  url: string;
}

export interface BlogPostPreview {
  slug: string;
  frontmatter: BlogFrontmatter;
  /** External URL to read the full post (e.g. Hashnode) */
  url: string;
}
