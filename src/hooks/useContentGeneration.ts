import { useState } from 'react';
import { generateContent } from '../services/gemini';
import type { GeneratedContent, GeneratedLandingPage, LandingPage } from '../types';
import { slugify } from '../utils/helpers';

export function useContentGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePost = async (keyword: string): Promise<{ content: GeneratedContent }> => {
    setIsLoading(true);
    setError(null);

    try {
      const content = await generateContent(keyword, 'blog') as GeneratedContent;
      
      if (!content || !content.title || !content.content) {
        throw new Error('Invalid content generated');
      }

      return { content };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate post';
      setError(errorMessage);
      console.error('Content Generation Error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateLandingPage = async (keyword: string): Promise<LandingPage> => {
    setIsLoading(true);
    setError(null);

    try {
      const content = await generateContent(keyword, 'landing') as GeneratedLandingPage;
      
      if (!content || !content.title || !content.content) {
        throw new Error('Invalid landing page content generated');
      }

      const landingPage: LandingPage = {
        slug: slugify(content.title),
        title: content.title,
        description: content.description,
        content: {
          hero: content.content.hero,
          features: content.content.features,
          benefits: content.content.benefits,
          testimonials: content.content.testimonials,
          cta: content.content.cta
        },
        seo: content.seo,
        lastUpdated: new Date().toISOString(),
        status: 'published'
      };

      return landingPage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate landing page';
      setError(errorMessage);
      console.error('Landing Page Generation Error:', err);
      
      // Return fallback landing page
      const fallbackPage: LandingPage = {
        slug: slugify(keyword),
        title: `${keyword} Solutions`,
        description: `Professional ${keyword} services and solutions`,
        content: {
          hero: {
            heading: `Transform Your Business with ${keyword}`,
            subheading: 'Professional solutions for modern businesses',
            cta: 'Get Started Today'
          },
          features: [
            {
              title: 'Professional Expertise',
              description: `Expert ${keyword} solutions for your business`
            },
            {
              title: 'Proven Results',
              description: 'Track record of successful implementations'
            },
            {
              title: '24/7 Support',
              description: 'Round-the-clock assistance when you need it'
            }
          ],
          benefits: [
            {
              title: 'Increased Efficiency',
              description: 'Streamline your operations and save time'
            },
            {
              title: 'Cost Effective',
              description: 'Maximize ROI with our solutions'
            }
          ],
          testimonials: [
            {
              quote: `The ${keyword} solution exceeded our expectations`,
              author: 'John Smith',
              role: 'CEO, Tech Corp'
            }
          ],
          cta: {
            heading: 'Ready to Get Started?',
            subheading: 'Transform your business today',
            buttonText: 'Contact Us Now'
          }
        },
        seo: {
          title: `${keyword} - Professional Solutions & Services`,
          description: `Professional ${keyword} services and solutions for modern businesses. Get started today!`,
          keywords: [keyword, 'professional', 'services', 'solutions']
        },
        lastUpdated: new Date().toISOString(),
        status: 'published'
      };

      return fallbackPage;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePost,
    generateLandingPage,
    isLoading,
    error
  };
}