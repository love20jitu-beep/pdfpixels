'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Code, FileJson, Image as ImageIcon, FileText, Zap, Shield, Copy, Check, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/image/process',
      description: 'Process images with compression, resizing, conversion, and effects',
      category: 'Image',
    },
    {
      method: 'POST',
      path: '/api/pdf/merge',
      description: 'Merge multiple PDF files into one',
      category: 'PDF',
    },
    {
      method: 'POST',
      path: '/api/pdf/split',
      description: 'Split PDF into individual pages or extract specific pages',
      category: 'PDF',
    },
    {
      method: 'POST',
      path: '/api/pdf/compress',
      description: 'Compress PDF to reduce file size',
      category: 'PDF',
    },
    {
      method: 'POST',
      path: '/api/pdf/to-image',
      description: 'Convert PDF pages to images',
      category: 'PDF',
    },
    {
      method: 'POST',
      path: '/api/pdf/from-image',
      description: 'Create PDF from images',
      category: 'PDF',
    },
  ];

  const codeExamples = {
    compress: `// Compress an image
const formData = new FormData();
formData.append('image', imageFile);
formData.append('quality', '85');
formData.append('format', 'webp');

const response = await fetch('https://www.pdfpixels.com/api/image/process', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Compressed image:', result.imageUrl);
console.log('Saved:', result.savedPercent + '%');`,

    resize: `// Resize an image
const formData = new FormData();
formData.append('image', imageFile);
formData.append('width', '800');
formData.append('height', '600');
formData.append('fit', 'inside');

const response = await fetch('https://www.pdfpixels.com/api/image/process', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Resized dimensions:', result.originalDimensions);`,

    convert: `// Convert image format
const formData = new FormData();
formData.append('image', imageFile);
formData.append('format', 'webp');
formData.append('quality', '90');

const response = await fetch('https://www.pdfpixels.com/api/image/process', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// result.format: "webp"
// result.mimeType: "image/webp"`,

    pdfMerge: `// Merge PDFs
const formData = new FormData();
formData.append('files', pdfFile1);
formData.append('files', pdfFile2);
formData.append('files', pdfFile3);

const response = await fetch('https://www.pdfpixels.com/api/pdf/merge', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Merged PDF:', result.pdfUrl);
console.log('Total pages:', result.pageCount);`,

    pdfSplit: `// Split PDF
const formData = new FormData();
formData.append('file', pdfFile);
formData.append('mode', 'range');
formData.append('pageRange', '1-3,5,7-9');

const response = await fetch('https://www.pdfpixels.com/api/pdf/split', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Extracted pages:', result.extractedPages);`,
  };

  const parameters = [
    { name: 'image', type: 'File', required: true, description: 'Image file to process (max 100MB)' },
    { name: 'quality', type: 'Integer', required: false, description: 'Output quality 1-100 (default: 85)' },
    { name: 'format', type: 'String', required: false, description: 'Output format: jpg, png, webp, avif, gif, tiff' },
    { name: 'width', type: 'Integer', required: false, description: 'Target width in pixels' },
    { name: 'height', type: 'Integer', required: false, description: 'Target height in pixels' },
    { name: 'targetSize', type: 'Integer', required: false, description: 'Target file size in KB' },
    { name: 'rotate', type: 'Integer', required: false, description: 'Rotation angle -360 to 360' },
    { name: 'brightness', type: 'Float', required: false, description: 'Brightness 0.5-2.0 (1.0 = normal)' },
    { name: 'contrast', type: 'Float', required: false, description: 'Contrast 0.5-2.0 (1.0 = normal)' },
    { name: 'saturation', type: 'Float', required: false, description: 'Saturation 0.5-2.0 (1.0 = normal)' },
    { name: 'blur', type: 'Float', required: false, description: 'Blur radius 0-20' },
    { name: 'grayscale', type: 'Boolean', required: false, description: 'Convert to grayscale' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">API Documentation</h1>
                <p className="text-sm text-muted-foreground">PdfPixels Public API</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Zap className="w-3 h-3" />
                Free to Use
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Shield className="w-3 h-3" />
                No Auth Required
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-lg text-muted-foreground mb-6">
              PdfPixels provides a free public API for image and PDF processing.
              No authentication required. Just make HTTP requests to our endpoints.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-primary mb-1">60/min</div>
                <div className="text-sm text-muted-foreground">Rate Limit</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-primary mb-1">100MB</div>
                <div className="text-sm text-muted-foreground">Max Image Size</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-primary mb-1">500MB</div>
                <div className="text-sm text-muted-foreground">Max PDF Size</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Endpoints */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            API Endpoints
          </h2>

          <div className="space-y-4">
            {endpoints.map((endpoint, i) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <Badge
                  className={`${endpoint.method === 'POST' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-blue-500/10 text-blue-600'} font-mono`}
                >
                  {endpoint.method}
                </Badge>
                <code className="text-sm font-mono flex-1">{endpoint.path}</code>
                <span className="text-sm text-muted-foreground hidden md:block">{endpoint.description}</span>
                <Badge variant="outline">{endpoint.category}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Code Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            Code Examples
          </h2>

          <div className="space-y-6">
            {/* Compress Example */}
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">Compress Image</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(codeExamples.compress, 'compress')}
                >
                  {copiedCode === 'compress' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code>{codeExamples.compress}</code>
              </pre>
            </div>

            {/* Resize Example */}
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">Resize Image</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(codeExamples.resize, 'resize')}
                >
                  {copiedCode === 'resize' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code>{codeExamples.resize}</code>
              </pre>
            </div>

            {/* PDF Merge Example */}
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">Merge PDFs</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(codeExamples.pdfMerge, 'pdfMerge')}
                >
                  {copiedCode === 'pdfMerge' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code>{codeExamples.pdfMerge}</code>
              </pre>
            </div>

            {/* PDF Split Example */}
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">Split PDF</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(codeExamples.pdfSplit, 'pdfSplit')}
                >
                  {copiedCode === 'pdfSplit' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code>{codeExamples.pdfSplit}</code>
              </pre>
            </div>
          </div>
        </motion.section>

        {/* Parameters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileJson className="w-6 h-6 text-primary" />
            Image Processing Parameters
          </h2>

          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-4 font-medium">Parameter</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Required</th>
                    <th className="text-left p-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((param, i) => (
                    <tr key={param.name} className={i < parameters.length - 1 ? 'border-b border-border' : ''}>
                      <td className="p-4"><code className="text-sm font-mono text-primary">{param.name}</code></td>
                      <td className="p-4"><span className="text-sm text-muted-foreground">{param.type}</span></td>
                      <td className="p-4">
                        {param.required ? (
                          <Badge className="bg-red-500/10 text-red-600">Yes</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </td>
                      <td className="p-4"><span className="text-sm text-muted-foreground">{param.description}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Response Format */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Response Format</h2>

          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <span className="font-medium">Success Response</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code>{`{
  "success": true,
  "imageUrl": "data:image/webp;base64,...",
  "originalSize": 1048576,
  "processedSize": 524288,
  "savedBytes": 524288,
  "savedPercent": 50,
  "originalDimensions": {
    "width": 1920,
    "height": 1080
  },
  "format": "webp",
  "mimeType": "image/webp",
  "quality": 85
}`}</code>
            </pre>
          </div>
        </motion.section>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="flex flex-wrap gap-4">
            <a
              href="/openapi.yaml"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <FileJson className="w-4 h-4" />
              OpenAPI Specification
            </a>
            <a
              href="/.well-known/ai-plugin.json"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Code className="w-4 h-4" />
              AI Plugin Manifest
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
