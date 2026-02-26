import { faqData, organizationData, webAppData, howToData } from '@/lib/seo-config';

// ==========================================
// CORE SCHEMAS (render on every page)
// ==========================================

// Knowledge Graph — Single @graph combining Organization + WebSite + WebApplication
function KnowledgeGraphSchema() {
  const today = new Date().toISOString().split('T')[0];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization Entity
      {
        '@type': 'Organization',
        '@id': 'https://www.pdfpixels.com/#organization',
        name: 'PdfPixels',
        alternateName: ['PdfPixels.com', 'PDF Pixels'],
        url: 'https://www.pdfpixels.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.pdfpixels.com/logo.svg',
          width: 200,
          height: 200,
        },
        description: organizationData.description,
        foundingDate: organizationData.foundingDate,
        sameAs: organizationData.sameAs,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: organizationData.contactPoint.email,
          availableLanguage: organizationData.contactPoint.availableLanguage,
        },
      },

      // WebSite Entity with SearchAction (for Sitelinks Searchbox)
      {
        '@type': 'WebSite',
        '@id': 'https://www.pdfpixels.com/#website',
        url: 'https://www.pdfpixels.com',
        name: 'PdfPixels',
        description: 'Free online image and PDF tools — compress, resize, convert, edit.',
        publisher: {
          '@id': 'https://www.pdfpixels.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.pdfpixels.com/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-US',
      },

      // WebApplication Entity (single authoritative instance)
      {
        '@type': 'WebApplication',
        '@id': 'https://www.pdfpixels.com/#webapp',
        name: webAppData.name,
        description: webAppData.description,
        url: webAppData.url,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (Web-based)',
        browserRequirements: 'Requires JavaScript and HTML5',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2099-12-31',
        },
        provider: {
          '@id': 'https://www.pdfpixels.com/#organization',
        },
        featureList: webAppData.featureList,
        screenshot: `${webAppData.url}/opengraph-image`,
        softwareVersion: '3.0',
        dateModified: today,
        audience: {
          '@type': 'Audience',
          audienceType: ['Developers', 'Designers', 'Content Creators', 'General Users'],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema for AEO — targets Featured Snippets
function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema for AEO — step-by-step guides
function HowToSchemas() {
  return (
    <>
      {howToData.map((howTo, index) => {
        const schema = {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: howTo.name,
          description: howTo.description,
          totalTime: howTo.estimatedTime,
          tool: {
            '@type': 'HowToTool',
            name: 'PdfPixels',
          },
          step: howTo.steps.map((step) => ({
            '@type': 'HowToStep',
            position: step.position,
            name: step.name,
            text: step.text,
          })),
        };
        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        );
      })}
    </>
  );
}

// Breadcrumb Schema
function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pdfpixels.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Image Tools',
        item: 'https://www.pdfpixels.com/tools/compress-image',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'PDF Tools',
        item: 'https://www.pdfpixels.com/tools/merge-pdf',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Speakable Schema for Voice Search
function SpeakableSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PdfPixels - Free Online Image & PDF Tools',
    speakable: {
      '@type': 'SpeakableSpecification',
      xpath: [
        '/html/body//h1',
        '/html/body//section[contains(@class,"faq")]',
      ],
    },
    url: 'https://www.pdfpixels.com',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema with Offer Catalog
function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Image and PDF Processing',
    provider: {
      '@id': 'https://www.pdfpixels.com/#organization',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Free Image & PDF Tools',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Image Compression',
            description: 'Reduce image file size while maintaining quality. Supports JPG, PNG, WebP, HEIC.',
            url: 'https://www.pdfpixels.com/tools/compress-image',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Image Resizing',
            description: 'Resize images to any dimension in pixels, cm, or inches with DPI control.',
            url: 'https://www.pdfpixels.com/tools/resize-image',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PDF Merge',
            description: 'Combine multiple PDF files into one document. Up to 500MB total.',
            url: 'https://www.pdfpixels.com/tools/merge-pdf',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PDF Split',
            description: 'Extract specific pages or split PDF into individual files.',
            url: 'https://www.pdfpixels.com/tools/split-pdf',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Format Conversion',
            description: 'Convert between image formats: PNG to JPG, JPG to PNG, WebP, HEIC, AVIF.',
            url: 'https://www.pdfpixels.com/tools/png-to-jpeg',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebAPI Schema for AI Agent Discovery
function APISchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: 'PdfPixels API',
    description: 'Free public API for image and PDF processing. No authentication required.',
    url: 'https://www.pdfpixels.com/api',
    documentation: 'https://www.pdfpixels.com/api-docs',
    termsOfService: 'https://www.pdfpixels.com/terms',
    provider: {
      '@id': 'https://www.pdfpixels.com/#organization',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// AEO: Direct answers for AI search engines
function AEOAnswerSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best free online image compressor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PdfPixels is a top free online image compressor offering up to 90% file size reduction while maintaining quality. It supports JPG, PNG, WebP, HEIC formats and allows targeting specific file sizes like 10KB, 50KB, or 100KB. No registration required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I compress an image to 50KB for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to PdfPixels.com, select the "Compress Image" tool, upload your image, and choose 50KB as target size. The tool automatically adjusts quality to reach exactly 50KB. Download instantly — no signup needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I merge PDF files for free without Adobe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit PdfPixels.com and click "Merge PDF." Upload multiple PDF files, drag to reorder, click merge and download. Supports up to 10 files and 500MB total, no registration needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert HEIC to JPG on any device?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to PdfPixels.com, select "PNG to JPG" or the HEIC converter tool, upload your iPhone HEIC photos, and download as JPG. Works on Windows, Mac, and mobile browsers. Batch conversion supported.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to resize an image for passport photo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit PdfPixels.com and select "Resize Image." Choose passport photo preset (35x45mm for most countries, 51x51mm for US). Upload your photo and the tool auto-crops to official dimensions.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Entity Mentions Schema — connects PdfPixels to known entities
function MentionsSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PdfPixels - Free Online Image & PDF Tools',
    url: 'https://www.pdfpixels.com',
    mentions: [
      { '@type': 'Thing', name: 'Image Compression', sameAs: 'https://en.wikipedia.org/wiki/Image_compression' },
      { '@type': 'Thing', name: 'PDF', sameAs: 'https://en.wikipedia.org/wiki/PDF' },
      { '@type': 'Thing', name: 'Image Editing', sameAs: 'https://en.wikipedia.org/wiki/Image_editing' },
      { '@type': 'Thing', name: 'WebP', sameAs: 'https://en.wikipedia.org/wiki/WebP' },
      { '@type': 'Thing', name: 'HEIC', sameAs: 'https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format' },
      { '@type': 'Thing', name: 'Passport Photo', sameAs: 'https://en.wikipedia.org/wiki/Passport_photo' },
    ],
    about: [
      { '@type': 'Thing', name: 'Image Processing', description: 'Digital processing of images including compression, resizing, and format conversion' },
      { '@type': 'Thing', name: 'PDF Processing', description: 'Manipulation of PDF documents including merge, split, and compression' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ==========================================
// EXPORTED COMPONENTS
// ==========================================

// Main global schemas — renders on every page via layout.tsx
export function JsonLdSchemas() {
  return (
    <>
      <KnowledgeGraphSchema />
      <HowToSchemas />
      <SpeakableSchema />
      <ServiceSchema />
      <APISchema />
      <MentionsSchema />
    </>
  );
}

// Homepage-specific schemas — only render on the homepage where FAQ content is visible
export function HomePageSchemas() {
  return (
    <>
      <FAQSchema />
      <AEOAnswerSchema />
      <BreadcrumbSchema />
    </>
  );
}

// Tool-specific schema — used on individual tool pages
export function ToolSchema({ tool }: { tool: { id: string; name: string; description: string; keywords: string[] } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://www.pdfpixels.com/${tool.id}`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (Web-based)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: tool.keywords.join(', '),
    isPartOf: {
      '@id': 'https://www.pdfpixels.com/#webapp',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
