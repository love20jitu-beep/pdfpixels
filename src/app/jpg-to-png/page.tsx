import type { Metadata } from 'next';
import { ToolWorkspace } from '@/components/layout/tool-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'JPG to PNG Converter - Convert JPEG to PNG Online | PdfPixels',
  description: 'Convert JPG to PNG online for free. Preserve transparency, fast conversion, no quality loss. Batch conversion supported.',
  keywords: ['jpg to png', 'jpg to png converter', 'convert jpg to png', 'jpeg to png', 'image converter', 'format conversion'],
  openGraph: {
    title: 'JPG to PNG Converter - Convert JPEG to PNG Online | PdfPixels',
    description: 'Convert JPG to PNG online for free. Preserve transparency, no quality loss.',
    url: 'https://www.pdfpixels.com/jpg-to-png',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/jpg-to-png',
  },
};

export default function JpgToPngPage() {
  return (
    <>
      <JsonLdSchemas />
      <ToolWorkspace />
    </>
  );
}
