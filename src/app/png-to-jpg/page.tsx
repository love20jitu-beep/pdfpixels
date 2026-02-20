import type { Metadata } from 'next';
import { ToolWorkspace } from '@/components/layout/tool-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter - Convert PNG to JPEG Online | PdfPixels',
  description: 'Convert PNG to JPG online for free. Fast, secure, no quality loss. Batch conversion supported. No registration required.',
  keywords: ['png to jpg', 'png to jpg converter', 'convert png to jpg', 'png to jpeg', 'image converter', 'format conversion'],
  openGraph: {
    title: 'PNG to JPG Converter - Convert PNG to JPEG Online | PdfPixels',
    description: 'Convert PNG to JPG online for free. Fast, secure, no quality loss.',
    url: 'https://www.pdfpixels.com/png-to-jpg',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/png-to-jpg',
  },
};

export default function PngToJpgPage() {
  return (
    <>
      <JsonLdSchemas />
      <ToolWorkspace />
    </>
  );
}
