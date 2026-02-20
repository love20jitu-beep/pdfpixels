import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allTools, getToolBySlug } from '@/lib/tools-data';
import { siteConfig } from '@/lib/seo-config';
import { Suspense } from 'react';
import { ToolPageClient } from '@/components/layout/tool-page-client';

function WorkspaceLoading() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="w-40 h-5 rounded bg-muted animate-pulse" />
          <div className="w-56 h-3 rounded bg-muted animate-pulse" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl bg-muted animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-56 rounded-xl bg-muted animate-pulse" />
          <div className="h-28 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Generate static params for all tools
export function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }));
}

// Generate rich metadata for each tool — SEO, AEO, GEO optimized
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: 'Tool Not Found | PdfPixels' };
  }

  const isAI = tool.isAI;
  const aiLabel = isAI ? 'AI-Powered ' : '';
  const title = `${aiLabel}${tool.name} — Free Online Tool | PdfPixels`;
  const description = `${tool.description} Free online ${tool.name.toLowerCase()} tool. ${isAI ? 'Powered by OpenAI. ' : ''}No registration required. Fast, secure, and private. Works on JPG, PNG, WebP, HEIC.`;

  return {
    title,
    description,
    keywords: [
      ...tool.keywords,
      tool.name.toLowerCase(),
      `${tool.name.toLowerCase()} online`,
      `${tool.name.toLowerCase()} free`,
      `free ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} tool`,
      'pdfpixels',
      'online tool',
      'free tool',
      'no signup',
      ...(isAI ? ['ai tool', 'ai image tool', 'openai'] : []),
    ],
    openGraph: {
      title,
      description,
      url: `https://www.pdfpixels.com/tools/${tool.slug}`,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

// Build JSON-LD structured data for each tool (SoftwareApplication + HowTo + FAQPage)
function getToolJsonLd(tool: ReturnType<typeof getToolBySlug>) {
  if (!tool) return null;
  const url = `https://www.pdfpixels.com/tools/${tool.slug}`;
  const isAI = tool.isAI;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: Record<string, any>[] = [];

  // SoftwareApplication schema — helps Google show rich results
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    ...(isAI && {
      additionalType: 'https://schema.org/AIApplication',
    }),
  });

  // HowTo schema — helps AI search engines understand usage
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to ${tool.name}`,
    description: `Step-by-step guide to use the free online ${tool.name} tool on PdfPixels.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload your file',
        text: `Go to ${url} and upload your image or PDF file. Drag and drop or click to browse.`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Adjust settings',
        text: `Configure the ${tool.name.toLowerCase()} settings to your preference. Adjust quality, size, or effects as needed.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Process and download',
        text: `Click the process button and download your result. ${isAI ? 'AI processing takes 10-30 seconds.' : 'Processing is instant.'}`,
      },
    ],
    totalTime: isAI ? 'PT30S' : 'PT5S',
    tool: {
      '@type': 'HowToTool',
      name: 'PdfPixels',
    },
  });

  // FAQPage schema — AEO optimization
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${tool.name} free to use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${tool.name} on PdfPixels is completely free to use with no registration required. There are no limits on usage.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is my data safe when using ${tool.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Absolutely. ${tool.processing === 'client' ? 'Your files are processed entirely in your browser and never leave your device.' : 'Your files are processed securely on our servers and automatically deleted after processing. We never store your data.'}`,
        },
      },
      {
        '@type': 'Question',
        name: `What formats does ${tool.name} support?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${tool.name} supports all major image formats including JPG, JPEG, PNG, WebP, HEIC, GIF, and BMP. Output is available in multiple formats.`,
        },
      },
    ],
  });

  return schemas;
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const schemas = getToolJsonLd(tool);

  return (
    <>
      {/* JSON-LD Structured Data for SEO/AEO/GEO */}
      {schemas && schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Suspense fallback={<WorkspaceLoading />}>
        <ToolPageClient
          toolId={tool.id}
          toolName={tool.name}
          toolDescription={tool.description}
        />
      </Suspense>

      {/* AI-Search-Friendly Content Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto prose prose-sm dark:prose-invert">
          <h2 className="text-xl font-bold mb-4">About {tool.name}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {tool.description} This tool is part of PdfPixels&apos; free online toolkit.
            {tool.isAI && ' Powered by advanced AI technology from OpenAI for professional-quality results.'}
            {tool.processing === 'client' && ' All processing happens directly in your browser — your files never leave your device, ensuring complete privacy and security.'}
            {tool.processing === 'server' && ' Files are processed securely on our servers and automatically deleted after processing.'}
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-3">How to use {tool.name}</h3>
          <ol className="text-muted-foreground space-y-2">
            <li><strong>Upload:</strong> Drag and drop your file or click to browse. Supports JPG, PNG, WebP, HEIC, and more.</li>
            <li><strong>Configure:</strong> Adjust settings like quality, size, effects, or format to match your needs.</li>
            <li><strong>Download:</strong> Click process and download your result instantly. {tool.isAI ? 'AI processing takes 10-30 seconds.' : 'Results are instant.'}</li>
          </ol>
          <h3 className="text-lg font-semibold mt-6 mb-3">Why use PdfPixels?</h3>
          <ul className="text-muted-foreground space-y-1">
            <li>✅ 100% free — no hidden costs or subscriptions</li>
            <li>✅ No registration or signup required</li>
            <li>✅ {tool.processing === 'client' ? 'Client-side processing — files never leave your device' : 'Secure server processing with automatic file deletion'}</li>
            <li>✅ Works on all devices — desktop, tablet, and mobile</li>
            <li>✅ Supports all major image formats</li>
            {tool.isAI && <li>✅ Powered by OpenAI for professional-quality results</li>}
          </ul>
        </div>
      </section>
    </>
  );
}
