import type { Metadata } from 'next';
import { CompressWorkspace } from '@/components/layout/compress-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Compress PDF Online - Reduce PDF File Size Free | PdfPixels',
  description: 'Compress PDF files online for free. Reduce PDF size while maintaining quality. No file size limits, no registration required. Secure compression.',
  keywords: ['compress pdf', 'compress pdf online', 'reduce pdf size', 'pdf compression', 'shrink pdf', 'pdf optimizer'],
  openGraph: {
    title: 'Compress PDF Online - Reduce PDF File Size Free | PdfPixels',
    description: 'Compress PDF files online for free. Reduce PDF size while maintaining quality.',
    url: 'https://www.pdfpixels.com/pdf-compress',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/pdf-compress',
  },
};

export default function PdfCompressPage() {
  return (
    <>
      <JsonLdSchemas />
      <CompressWorkspace />
    </>
  );
}
