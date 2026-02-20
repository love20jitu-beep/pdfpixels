import type { Metadata } from 'next';
import { PDFMergeWorkspace } from '@/components/layout/pdf-merge-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Merge PDF Online - Combine Multiple PDF Files Free | PdfPixels',
  description: 'Merge PDF files online for free. Combine multiple PDFs into one document. No file size limits, no registration required. Secure and fast.',
  keywords: ['merge pdf', 'merge pdf online', 'combine pdf', 'join pdf', 'merge pdf files', 'combine pdf files', 'pdf merger'],
  openGraph: {
    title: 'Merge PDF Online - Combine Multiple PDF Files Free | PdfPixels',
    description: 'Merge PDF files online for free. Combine multiple PDFs into one document.',
    url: 'https://www.pdfpixels.com/merge-pdf',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/merge-pdf',
  },
};

export default function MergePdfPage() {
  return (
    <>
      <JsonLdSchemas />
      <PDFMergeWorkspace />
    </>
  );
}
