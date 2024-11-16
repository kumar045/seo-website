import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not configured, using fallback content generation');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-pro' });

export async function extractKeywordsFromContent(content: string): Promise<string[]> {
  try {
    if (!model) {
      return ['content marketing', 'digital strategy', 'online presence'];
    }

    const prompt = `Extract the top 3 most important keywords or key phrases from the following content. Return them as a comma-separated list:

${content.slice(0, 1000)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    return response
      .split(',')
      .map(keyword => keyword.trim())
      .filter(Boolean)
      .slice(0, 3);
  } catch (error) {
    console.error('Keyword extraction error:', error);
    // Return fallback keywords
    return ['content marketing', 'digital strategy', 'online presence'];
  }
}

function getFallbackLandingPage(keyword: string) {
  return {
    title: `${keyword} - Professional Solutions`,
    description: `Professional ${keyword} services tailored to your needs`,
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
    }
  };
}

function getFallbackBlogPost(keyword: string) {
  return {
    title: `Complete Guide to ${keyword} (${new Date().getFullYear()})`,
    content: `# Complete Guide to ${keyword}\n\nA comprehensive guide about ${keyword} and its applications...\n\n## Key Benefits\n\n1. Improved efficiency\n2. Cost savings\n3. Better results\n\n## Best Practices\n\n- Start with a clear strategy\n- Measure and optimize\n- Stay updated with trends`,
    excerpt: `A comprehensive guide about ${keyword} and its applications in modern business.`,
    readingTime: 5,
    tags: ['Guide', 'Strategy', keyword],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  };
}

export async function generateContent(
  keyword: string,
  type: 'blog' | 'landing' = 'blog'
) {
  try {
    if (!model) {
      console.warn('Using fallback content generation');
      return type === 'landing' ? getFallbackLandingPage(keyword) : getFallbackBlogPost(keyword);
    }

    if (type === 'landing') {
      const prompt = `Create a landing page for "${keyword}". Return a JSON object with the following structure:
{
  "title": "Main page title",
  "description": "Brief page description",
  "content": {
    "hero": {
      "heading": "Main headline",
      "subheading": "Supporting text",
      "cta": "Call to action button text"
    },
    "features": [
      {
        "title": "Feature name",
        "description": "Feature description"
      }
    ],
    "benefits": [
      {
        "title": "Benefit name",
        "description": "Benefit description"
      }
    ],
    "testimonials": [
      {
        "quote": "Customer testimonial",
        "author": "Customer name",
        "role": "Customer position"
      }
    ],
    "cta": {
      "heading": "Final call to action",
      "subheading": "Supporting text",
      "buttonText": "Button text"
    }
  },
  "seo": {
    "title": "SEO title",
    "description": "Meta description",
    "keywords": ["keyword1", "keyword2"]
  }
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      try {
        const parsedContent = JSON.parse(response);
        
        if (!parsedContent.title || !parsedContent.content || !parsedContent.seo) {
          console.warn('Invalid landing page structure, using fallback');
          return getFallbackLandingPage(keyword);
        }

        return parsedContent;
      } catch (parseError) {
        console.warn('Failed to parse landing page content:', parseError);
        return getFallbackLandingPage(keyword);
      }
    }

    // Blog post generation
    const prompt = `Write a detailed blog post about "${keyword}". Include:
1. A clear title
2. A brief excerpt
3. Well-structured markdown content with sections
4. Relevant tags

Keep the content informative and engaging.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const title = text.split('\n')[0].replace(/^#\s*/, '');
    const excerpt = text.split('\n')
      .find(line => line.trim() && !line.startsWith('#'))?.trim() || 
      `A comprehensive guide about ${keyword}`;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    const tags = ['Guide', 'Strategy', keyword];

    return {
      title,
      content: text,
      excerpt,
      readingTime,
      tags,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
    };
  } catch (error) {
    console.warn('Content Generation Error, using fallback:', error);
    return type === 'landing' ? getFallbackLandingPage(keyword) : getFallbackBlogPost(keyword);
  }
}