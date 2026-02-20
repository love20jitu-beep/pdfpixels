import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_static/'],
      },

      // === SEARCH ENGINES ===
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },

      // === OPENAI ===
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === GOOGLE AI / GEMINI ===
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Google-CloudVertexBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === ANTHROPIC / CLAUDE ===
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/'],
      },

      // === PERPLEXITY ===
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === MICROSOFT / COPILOT ===
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === META AI ===
      {
        userAgent: 'meta-externalagent',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === APPLE AI ===
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/'],
      },

      // === AMAZON ===
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === YOU.COM ===
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === PHIND ===
      {
        userAgent: 'PhindBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === IASK ===
      {
        userAgent: 'iaskspider',
        allow: '/',
        disallow: ['/api/'],
      },

      // === COHERE ===
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/api/'],
      },

      // === COMMON CRAWL (AI training) ===
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/'],
      },

      // === BYTEDANCE ===
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.pdfpixels.com/sitemap.xml',
    host: 'https://www.pdfpixels.com',
  };
}
