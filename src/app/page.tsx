'use client';

/* eslint-disable react/no-unescaped-entities */

import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { CategorySection } from '@/components/layout/category-section';
import { Footer } from '@/components/layout/footer';
import { toolCategories } from '@/lib/tools-data';
import { faqData } from '@/lib/seo-config';
import {
  ArrowUp, Search, X, ChevronDown, Upload, Sliders,
  Download, Shield, Zap, Globe, Lock, FileImage,
  Sparkles, ArrowRight, CheckCircle2, Star
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Animated Counter ───
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

// ─── Hero Section ───
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-400/[0.03] rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide">38+ Free Professional Tools</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 !leading-[1.1]"
          >
            All-in-One{' '}
            <span className="text-shimmer">Image & PDF</span>
            <br />
            Processing Platform
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Compress, resize, convert images and manage PDFs with professional-grade tools.
            <span className="hidden md:inline"> Powered by AI. Completely free, no signup required.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            <Link
              href="/compress-image"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-primary hover:shadow-lg transition-all hover:brightness-110"
            >
              <FileImage className="w-4 h-4" />
              Start Compressing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/merge-pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-card font-semibold text-sm hover:border-primary/30 hover:bg-primary/[0.03] transition-all"
            >
              Merge PDF Files
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              256-bit Encrypted
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              GDPR Compliant
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              No Registration
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Search + Tools Section ───
function ToolsSection() {
  const [search, setSearch] = useState('');
  const filteredCategories = search.trim()
    ? toolCategories.map(cat => ({
      ...cat,
      tools: cat.tools.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.keywords.some(k => k.includes(search.toLowerCase()))
      ),
    })).filter(cat => cat.tools.length > 0)
    : toolCategories;

  return (
    <section className="border-t border-border">
      {/* Search Bar */}
      <div className="bg-muted/40 py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools — compress, resize, merge, convert..."
              className="block w-full pl-12 pr-12 py-3.5 border border-border rounded-xl leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-12 space-y-6">
        {search && (
          <p className="text-sm font-medium text-muted-foreground">
            {filteredCategories.reduce((acc, c) => acc + c.tools.length, 0)} tools match "{search}"
          </p>
        )}

        {/* AI Tools Highlight */}
        {!search && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-50/80 to-indigo-50/50 dark:from-violet-500/[0.08] dark:to-indigo-500/[0.05] border border-violet-100 dark:border-violet-500/15"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold text-violet-700 dark:text-violet-300">AI-Powered Tools</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-violet-200/80 dark:border-violet-500/25 text-violet-600 dark:text-violet-400 bg-white/60 dark:bg-transparent">
                  OpenAI
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Remove backgrounds, enhance photos, upscale images, blur faces — all powered by advanced AI.</p>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        {filteredCategories.map((category, idx) => (
          <div key={category.id}>
            {idx > 0 && <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-10" />}
            <motion.section
              id={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              aria-labelledby={`${category.id}-heading`}
            >
              <CategorySection category={category} />
            </motion.section>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-muted-foreground">No tools found for "{search}"</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Stats Banner ───
function StatsBanner() {
  const stats = [
    { value: 38, suffix: '+', label: 'Free Tools' },
    { value: 99, suffix: '.9%', label: 'Uptime' },
    { value: 8, suffix: '+', label: 'File Formats' },
    { value: 0, suffix: '₹', label: 'Cost', display: 'Free' },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-primary/[0.04] via-primary/[0.02] to-primary/[0.04] border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.display ? stat.display : <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ───
function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your File',
      description: 'Drag & drop or browse. Supports JPG, PNG, WebP, HEIC, PDF and more.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sliders,
      title: 'Adjust Settings',
      description: 'Configure quality, dimensions, format, or effects to match your needs.',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: Download,
      title: 'Download Result',
      description: 'Click process and download instantly. Most results in under 5 seconds.',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps. No accounts, no installations, no hassle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px bg-gradient-to-r from-border via-primary/20 to-border" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative text-center group"
            >
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                <step.icon className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-primary">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ───
function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: '256-bit SSL encryption protects your files. All uploads auto-deleted within 1 hour.',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized processing engine delivers results in seconds. No waiting around.',
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: Globe,
      title: '100% Free Forever',
      description: 'No hidden fees, no premium tiers, no watermarks. Every tool is free, always.',
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced AI for background removal, enhancement, upscaling and more.',
      gradient: 'from-violet-500/10 to-purple-500/10',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      icon: Lock,
      title: 'No Registration',
      description: 'Jump straight in. No accounts, no email verification, no personal data collected.',
      gradient: 'from-rose-500/10 to-pink-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      icon: Star,
      title: 'Professional Quality',
      description: 'Same results as expensive desktop software, right in your browser.',
      gradient: 'from-cyan-500/10 to-sky-500/10',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
  ];

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Why PdfPixels</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Built for Everyone</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Professional tools without the professional price tag. Trusted by students, developers, and businesses.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-base font-bold mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ───
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visibleFaqs = faqData.slice(0, 10);

  return (
    <section id="faq-section" className="py-20 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Quick answers about our free image and PDF processing tools.
          </p>
        </motion.div>

        <div className="space-y-3">
          {visibleFaqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/15 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold text-sm pr-4">{faq.question}</span>
                <div className={`w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 transition-all duration-200 ${openIndex === idx ? 'bg-primary/10 rotate-180' : ''}`}>
                  <ChevronDown className={`w-4 h-4 ${openIndex === idx ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ───
function CTASection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-violet-500/[0.06] border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              No signup. No installation. Just upload your file and go.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/compress-image"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-primary hover:shadow-lg transition-all hover:brightness-110"
              >
                Try Compress Image
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/resize-image"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-card font-semibold text-sm hover:border-primary/30 transition-all"
              >
                Resize Image
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page ───
export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" role="main">
        <HeroSection />
        <ToolsSection />
        <StatsBanner />
        <HowItWorks />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-primary flex items-center justify-center hover:brightness-110 transition-all z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
