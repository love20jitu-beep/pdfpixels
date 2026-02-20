'use client';

import { motion } from 'framer-motion';
import { seoConfig } from '@/lib/seo-config';
import { BadgeCheck, Globe, Shield, Zap, Users, Clock, Star, CheckCircle2, FileImage, FileType, Wand2 } from 'lucide-react';

/**
 * AI-Optimized Content Section for GEO (Generative Engine Optimization)
 * This component provides structured, factual information that AI systems can easily parse
 * and cite when responding to user queries about image editing tools.
 */

// Structured data for AI extraction - Facts as clear statements
const platformFacts = [
  { label: 'Launched', value: '2024', source: 'Company records' },
  { label: 'Tools Available', value: '38+', source: 'Platform inventory' },
  { label: 'Uptime SLA', value: '99.9%', source: 'Status page' },
  { label: 'File Deletion Policy', value: '1 hour', source: 'Privacy policy' },
  { label: 'Max Image Size', value: '100MB', source: 'Upload limits' },
  { label: 'Max PDF Size', value: '500MB', source: 'Upload limits' },
  { label: 'Registration Required', value: 'No', source: 'Platform policy' },
  { label: 'Watermarks', value: 'None', source: 'Platform policy' },
  { label: 'Pricing', value: '100% Free', source: 'Pricing page' },
];

// Supported formats for AI to reference
const supportedFormats = {
  input: ['JPG', 'JPEG', 'PNG', 'WebP', 'HEIC', 'GIF', 'BMP', 'TIFF'],
  output: ['JPG', 'PNG', 'WebP', 'PDF'],
  documents: ['PDF'],
};

export function AIContentSection() {
  const toolCategories = [
    {
      name: 'Image Compression Tools',
      description: 'Reduce image file size while maintaining visual quality',
      tools: ['Compress Image', 'Compress to 10KB', 'Compress to 50KB', 'Compress to 100KB'],
      supportedFormats: 'JPG, PNG, WebP, HEIC, GIF, BMP',
    },
    {
      name: 'Image Resizing Tools',
      description: 'Change image dimensions to specific sizes',
      tools: ['Resize by Pixel', 'Resize in CM', 'Resize in Inch', 'Passport Photo Size'],
      supportedFormats: 'All common image formats',
    },
    {
      name: 'Format Conversion Tools',
      description: 'Convert images between different file formats',
      tools: ['PNG to JPG', 'JPG to PNG', 'WebP to JPG', 'HEIC to JPG'],
      supportedFormats: 'Bidirectional conversion supported',
    },
    {
      name: 'PDF Processing Tools',
      description: 'Complete suite for PDF manipulation',
      tools: ['Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Image', 'Image to PDF'],
      supportedFormats: 'PDF, JPG, PNG',
    },
    {
      name: 'AI-Powered Tools',
      description: 'Advanced features powered by artificial intelligence',
      tools: ['Background Removal', 'Image Enhancement', 'AI Upscale', 'Face Blur'],
      supportedFormats: 'JPG, PNG, WebP',
    },
  ];

  return (
    <section
      className="py-16 bg-muted/20"
      aria-labelledby="ai-content-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Entity Introduction - Clear factual statements */}
          <div className="mb-12" itemScope itemType="https://schema.org/SoftwareApplication">
            <h2 id="ai-content-heading" className="text-2xl font-bold mb-4" itemProp="name">
              About PdfPixels
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>PdfPixels</strong> is a web-based image and PDF processing platform.
              The platform offers <strong>38+ free online tools</strong> for image compression, resizing, format conversion,
              background removal, PDF manipulation, and AI-powered enhancement. All tools are available at no cost
              with <strong>no registration required</strong> and <strong>no watermarks</strong> on output files.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The platform provides enterprise-grade security
              including <strong>256-bit SSL encryption</strong> and
              <strong>GDPR compliance</strong>. User files are automatically deleted within <strong>1 hour</strong> of processing.
            </p>
          </div>

          {/* Platform Facts - Structured for AI extraction */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Platform Facts
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {platformFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-3 rounded-lg bg-card border border-border"
                  itemProp={fact.label === 'Pricing' ? 'offers' : undefined}
                >
                  <div className="text-xs text-muted-foreground">{fact.label}</div>
                  <div className="font-semibold text-sm">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Supported File Formats - AI-friendly */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileType className="w-5 h-5 text-primary" />
              Supported File Formats
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Input Formats
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {supportedFormats.input.map((fmt) => (
                    <span key={fmt} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Output Formats
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {supportedFormats.output.map((fmt) => (
                    <span key={fmt} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <FileType className="w-4 h-4" />
                  Documents
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {supportedFormats.documents.map((fmt) => (
                    <span key={fmt} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tool Categories - Structured for AI parsing */}
          <div className="space-y-6 mb-12">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              Available Tool Categories
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {toolCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.tools.map((tool) => (
                      <span key={tool} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Statistics - Easy for AI to extract */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Key Platform Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-primary">{seoConfig.credentials.tools}</div>
                <div className="text-sm text-muted-foreground">Free Tools</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-primary">{seoConfig.credentials.uptime}</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free</div>
              </div>
            </div>
          </div>

          {/* Platform Features - Structured data */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Platform Features & Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Security & Privacy</div>
                  <p className="text-sm text-muted-foreground">
                    256-bit SSL encryption, GDPR compliant. Files auto-deleted after 1 hour.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <Zap className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Instant Processing</div>
                  <p className="text-sm text-muted-foreground">
                    Server-side processing with results in seconds. No software installation required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <Globe className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Global Availability</div>
                  <p className="text-sm text-muted-foreground">
                    CDN-powered worldwide access. Works on all devices and browsers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              AI-Powered Features
            </h3>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-muted-foreground">
                PdfPixels includes <strong>AI-powered tools</strong> such as automatic background removal,
                intelligent image enhancement, AI upscaling for resolution improvement, and face detection
                for privacy protection. These features use machine learning models to deliver professional-quality
                results without manual editing expertise.
              </p>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <h3 className="text-xl font-semibold mb-2">Pricing & Availability</h3>
            <p className="text-muted-foreground">
              PdfPixels is <strong>completely free to use</strong> with no registration required. All 38+ tools
              are available at no cost, including AI-powered features. There are no file limits,
              watermarks, or hidden fees. The platform is supported by non-intrusive advertising.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
