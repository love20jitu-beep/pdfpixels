import type { Metadata } from 'next';
import { ImageToPDFWorkspace } from '@/components/layout/image-to-pdf-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Image to PDF Converter - Convert Images to PDF Online | PdfPixels',
  description: 'Convert images to PDF online for free. Convert JPG, PNG, WebP to PDF. Batch conversion supported. No registration required.',
  keywords: ['image to pdf', 'convert image to pdf', 'jpg to pdf', 'png to pdf', 'webp to pdf', 'image to pdf converter'],
  openGraph: {
    title: 'Image to PDF Converter - Convert Images to PDF Online | PdfPixels',
    description: 'Convert images to PDF online for free. Batch conversion supported.',
    url: 'https://www.pdfpixels.com/image-to-pdf',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/image-to-pdf',
  },
};

export default function ImageToPdfPage() {
  return (
    <>
      <JsonLdSchemas />
      <ImageToPDFWorkspace />
    </>
  );
}
