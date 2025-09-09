import { Document } from '@contentful/rich-text-types';
import { BlogPost, PostFields, Asset } from '../types/blog';
import { getEnvConfig } from '../utils/env';

// Helper to format dates
const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// Define type for Contentful entry item
interface RawContentfulPost {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: PostFields;
}

// Fetch a single blog post by slug
export const fetchBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { VITE_SPACE_ID, VITE_ACCESS_TOKEN, VITE_CONTENT_TYPE } = getEnvConfig();

  const url = `https://cdn.contentful.com/spaces/${VITE_SPACE_ID}/environments/master/entries?access_token=${VITE_ACCESS_TOKEN}&content_type=${VITE_CONTENT_TYPE}&fields.slug=${slug}&include=10`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items || data.items.length === 0) return null;

  const post: RawContentfulPost = data.items[0];
  const assets: Asset[] = data.includes?.Asset || [];
  const fields = post.fields;

  let imageUrl: string | undefined;
  if (fields.coverImage?.[0]) {
    const imageID = fields.coverImage[0].sys.id;
    const asset = assets.find((a) => a.sys.id === imageID);
    imageUrl = asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : undefined;
  }

  return {
    id: post.sys.id,
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt || '',
    category: fields.category || '',
    date: formatDate(post.sys.createdAt),
    readtime: fields.readtime || '',
    tags: fields.tags || [],
    body: fields.body,
    imageUrl,
    description: fields.metaDescription,
  };
};

// Fetch all blog posts
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const { VITE_SPACE_ID, VITE_ACCESS_TOKEN, VITE_CONTENT_TYPE } = getEnvConfig();

  if (!VITE_SPACE_ID || !VITE_ACCESS_TOKEN || !VITE_CONTENT_TYPE) {
    throw new Error('Contentful API credentials are missing.');
  }

  const url = `https://cdn.contentful.com/spaces/${VITE_SPACE_ID}/environments/master/entries?access_token=${VITE_ACCESS_TOKEN}&content_type=${VITE_CONTENT_TYPE}&include=2`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const fetchedPosts: RawContentfulPost[] = data.items || [];
  const assets: Asset[] = data.includes?.Asset || [];

  return fetchedPosts.map((post) => {
    const fields = post.fields;

    let coverImageUrl: string | undefined;
    if (fields.coverImage?.length) {
      const imageID = fields.coverImage[0].sys.id;
      const asset = assets.find((a) => a.sys.id === imageID);
      coverImageUrl = asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : undefined;
    }

    return {
      id: post.sys.id,
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt || '',
      category: fields.category || 'General',
      date: formatDate(post.sys.createdAt),
      readtime: fields.readtime || '',
      tags: fields.tags || [],
      body: fields.body,
      imageUrl: coverImageUrl,
      description: fields.metaDescription,
    };
  });
};
