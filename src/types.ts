import type { ReactNode } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  tags: string[];
  image: string;
}

export interface LandingPage {
  slug: string;
  title: string;
  description: string;
  content: {
    hero: {
      heading: string;
      subheading: string;
      cta: string;
    };
    features: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
    }>;
    cta: {
      heading: string;
      subheading: string;
      buttonText: string;
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastUpdated: string;
  status: 'draft' | 'published';
}

export interface BlogState {
  posts: BlogPost[];
  landingPages: LandingPage[];
  loading: boolean;
  error: string | null;
}

export interface Website {
  url: string;
  type: 'competitor' | 'inspiration';
}

export interface Keyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  trend?: 'up' | 'down';
  competitors?: CompetitorResult[];
  type: 'blog' | 'landing';
}

export interface GeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  readingTime: number;
  tags: string[];
  image: string;
}

export interface GeneratedLandingPage {
  title: string;
  description: string;
  content: LandingPage['content'];
  seo: LandingPage['seo'];
}

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  results: CompetitorResult[];
}

export interface CompetitorResult {
  title: string;
  url: string;
  description: string;
  position: number;
}

export interface CompetitorMetrics {
  url: string;
  organicKeywords: number;
  traffic: number;
  topKeywords: string[];
  trend: 'up' | 'down';
}</content>