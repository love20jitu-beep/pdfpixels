import { Metadata } from 'next';
import { ApiDocsPage } from './api-docs-page';

export const metadata: Metadata = {
  title: 'API Documentation - PdfPixels',
  description: 'Complete API documentation for PdfPixels image and PDF processing endpoints. Free to use, no authentication required.',
  alternates: {
    canonical: '/api-docs',
  },
};

export default function ApiDocs() {
  return <ApiDocsPage />;
}
