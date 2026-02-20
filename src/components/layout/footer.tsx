'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { toolCategories } from '@/lib/tools-data';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const setActiveTool = useAppStore((state) => state.setActiveTool);

  const toolLinks = [
    { name: 'Compress Image', id: 'compress' },
    { name: 'Resize Image', id: 'resize-pixel' },
    { name: 'Convert Format', id: 'png-to-jpg' },
    { name: 'Remove Background', id: 'background-remover' },
    { name: 'Merge PDF', id: 'pdf-merge' },
    { name: 'Split PDF', id: 'pdf-split' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'API Documentation', href: '/api-docs' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'DMCA Policy', href: '/dmca' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/pdfpixels', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/pdfpixels', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/pdfpixels', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:support@pdfpixels.com', label: 'Email' },
  ];

  const trustFeatures = [
    { icon: Shield, label: 'Secure' },
    { icon: Zap, label: 'Fast' },
    { icon: Globe, label: 'Free' },
  ];

  return (
    <footer className="relative mt-auto">
      {/* CTA Banner */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/15 p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Compress, resize, convert, and edit your images and PDFs with our suite of 38+ professional tools.
              Completely free, no signup required.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-primary hover:shadow-glow transition-all duration-300 btn-shimmer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Try Our Tools Free
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gradient top border */}
      <div className="gradient-divider" />

      <div className="bg-muted/15 border-t border-border/20">
        <div className="container mx-auto px-4 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group" onClick={() => setActiveTool(null)}>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/85 flex items-center justify-center shadow-primary group-hover:shadow-glow transition-all duration-300">
                  <ImageIcon className="w-5 h-5 text-primary-foreground" />
                  <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-amber-400 animate-pulse-soft" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">
                    <span className="gradient-text">Pdf</span>Pixels
                  </span>
                  <span className="text-[9px] text-muted-foreground tracking-widest uppercase font-semibold">Professional Toolset</span>
                </div>
              </Link>

              <p className="text-sm text-muted-foreground mb-6 max-w-[260px] leading-relaxed">
                Free online image and PDF tools for everyone. Fast, secure, and easy to use. No signup required.
              </p>

              {/* Trust features */}
              <div className="flex items-center gap-4 mb-6">
                {trustFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/12 to-primary/3 flex items-center justify-center">
                      <feature.icon className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2.5">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-card/80 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 hover:shadow-soft transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Tools</h4>
              <ul className="space-y-3">
                {toolLinks.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={`/?tool=${tool.id}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/20">
          <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground font-medium">
              © {currentYear} PdfPixels. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2.5 }}
              >
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              </motion.span>
              {' '}for everyone
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
