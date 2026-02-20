import type { Metadata } from 'next';
import { ResizeWorkspace } from '@/components/layout/resize-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Resize Image Online - Change Image Dimensions | PdfPixels',
  description: 'Resize images online for free. Change dimensions in pixels, cm, or inches. Supports passport photo sizes, social media presets. No registration required.',
  keywords: ['resize image', 'resize image online', 'image resizer', 'change image size', 'resize photo', 'image dimensions', 'pixel resizer', 'passport photo size'],
  openGraph: {
    title: 'Resize Image Online - Change Image Dimensions | PdfPixels',
    description: 'Resize images online for free. Change dimensions in pixels, cm, or inches.',
    url: 'https://www.pdfpixels.com/resize-image',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/resize-image',
  },
};

export default function ResizeImagePage() {
  return (
    <>
      <JsonLdSchemas />
      <ResizeWorkspace />
    </>
  );
}
