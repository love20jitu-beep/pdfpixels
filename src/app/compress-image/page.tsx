import type { Metadata } from 'next';
import { CompressWorkspace } from '@/components/layout/compress-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { seoConfig, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Compress Image Online Free - Reduce Image Size | PdfPixels',
  description: 'Compress images online for free. Reduce JPG, PNG, WebP, HEIC file size without losing quality. No registration required. Batch compression supported.',
  keywords: ['compress image', 'compress image online', 'reduce image size', 'image compression', 'compress jpg', 'compress png', 'compress webp', 'reduce file size', 'image optimizer'],
  openGraph: {
    title: 'Compress Image Online Free - Reduce Image Size | PdfPixels',
    description: 'Compress images online for free. Reduce JPG, PNG, WebP, HEIC file size without losing quality. No registration required.',
    url: 'https://www.pdfpixels.com/compress-image',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/compress-image',
  },
};

export default function CompressImagePage() {
  return (
    <>
      <JsonLdSchemas />
      <CompressWorkspace />
    </>
  );
}
