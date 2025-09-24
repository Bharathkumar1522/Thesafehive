import { Document } from '@contentful/rich-text-types';

export const blogCategories = [
  'Natural Remedies',
  'Organic Foods',
  'Beauty',
  'Eco Living',
  'Wellness',
  'General',
] as const;

export type BlogCategory = typeof blogCategories[number];

// Interface for a single asset (e.g., cover image)
export interface Asset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
    };
    title?: string;
  };
}

// Contentful `fields` section for a post
export interface PostFields {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags?: string[];
  body: Document;
  readtime?: string;
  publishDate: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: {
    sys: { id: string };
  };
  coverImage?: { 
    fields: {
      file: { url: string }; 
    }; 
  }[]; // referencing assets
}

// Final structured blog post (after processing assets, etc.)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string; // formatted
  imageUrl?: string; // resolved from asset
  description?: string; // from metaDescription
  body: Document;
  readtime?: string;
  tags?: string[];
}

// Interface for simplified blog post used in Home component
export interface SimpleBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
  readtime?: string;
}

// Contentful entry interface
export interface ContentfulEntry {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title?: string;
    slug?: string;
    excerpt?: string;
    description?: string;
    category?: string;
    date?: string;
    coverImage?: Array<{
      fields: {
        file: {
          url: string;
        };
      };
    }>;
  };
}