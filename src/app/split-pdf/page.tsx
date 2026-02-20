import type { Metadata } from 'next';
import { PDFSplitWorkspace } from '@/components/layout/pdf-split-workspace';
import { JsonLdSchemas } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Split PDF Online - Extract Pages from PDF Free | PdfPixels',
  description: 'Split PDF files online for free. Extract specific pages, separate by page ranges. No file size limits, no registration required.',
  keywords: ['split pdf', 'split pdf online', 'extract pdf pages', 'separate pdf', 'pdf splitter', 'pdf page extractor'],
  openGraph: {
    title: 'Split PDF Online - Extract Pages from PDF Free | PdfPixels',
    description: 'Split PDF files online for free. Extract specific pages from any PDF.',
    url: 'https://www.pdfpixels.com/split-pdf',
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: '/split-pdf',
  },
};

export default function SplitPdfPage() {
  return (
    <>
      <JsonLdSchemas />
      <PDFSplitWorkspace />
    </>
  );
}
