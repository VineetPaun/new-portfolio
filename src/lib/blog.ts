import { BlogPostPreview } from '@/types/blog';

const HASHNODE_API = 'https://gql.hashnode.com';
const HASHNODE_HOST = 'generativeaiblogs.hashnode.dev';

/** Default placeholder image when a Hashnode post has no cover image */
const DEFAULT_COVER_IMAGE = '/blog/default-cover.png';

interface HashnodeTag {
  name: string;
  slug: string;
}

interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: { url: string } | null;
  publishedAt: string;
  tags: HashnodeTag[];
  url: string;
}

interface HashnodeResponse {
  data: {
    publication: {
      posts: {
        edges: { node: HashnodePost }[];
      };
    } | null;
  };
}

/**
 * Fetch posts from Hashnode GraphQL API
 */
async function fetchHashnodePosts(first = 20): Promise<HashnodePost[]> {
  try {
    const response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetPosts($host: String!, $first: Int!) {
            publication(host: $host) {
              posts(first: $first) {
                edges {
                  node {
                    id
                    title
                    brief
                    slug
                    coverImage { url }
                    publishedAt
                    tags { name slug }
                    url
                  }
                }
              }
            }
          }
        `,
        variables: { host: HASHNODE_HOST, first },
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error('Hashnode API error:', response.statusText);
      return [];
    }

    const json = (await response.json()) as HashnodeResponse;

    if (!json.data.publication) {
      console.error('Hashnode publication not found for host:', HASHNODE_HOST);
      return [];
    }

    return json.data.publication.posts.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Failed to fetch from Hashnode:', error);
    return [];
  }
}

/**
 * Transform a Hashnode post into a BlogPostPreview
 */
function transformPost(post: HashnodePost): BlogPostPreview {
  return {
    slug: post.slug,
    url: post.url,
    frontmatter: {
      title: post.title,
      description: post.brief,
      image: post.coverImage?.url || DEFAULT_COVER_IMAGE,
      tags: post.tags.map((tag) => tag.name),
      date: post.publishedAt,
      isPublished: true,
    },
  };
}

/**
 * Get all published blog posts from Hashnode (sorted newest first)
 */
export async function getPublishedBlogPosts(): Promise<BlogPostPreview[]> {
  const posts = await fetchHashnodePosts();
  return posts.map(transformPost);
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedBlogPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagsSet.add(tag.toLowerCase());
    });
  });

  return Array.from(tagsSet).sort();
}
