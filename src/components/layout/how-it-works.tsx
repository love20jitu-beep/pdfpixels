'use client';

import { motion } from 'framer-motion';
import { Upload, Settings2, Download, ArrowRight, Sparkles, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Image',
    description: 'Drag and drop your image or click to browse. We support JPG, PNG, WebP, HEIC, and more.',
    time: '~5 seconds',
    color: 'from-blue-500/20 to-indigo-500/5',
  },
  {
    number: '02',
    icon: Settings2,
    title: 'Choose Your Settings',
    description: 'Select compression level, output size, format, or apply effects. Customize everything to your needs.',
    time: '~10 seconds',
    color: 'from-violet-500/20 to-purple-500/5',
  },
  {
    number: '03',
    icon: Download,
    title: 'Download Instantly',
    description: 'Get your processed image in seconds. No watermarks, no registration, no waiting.',
    time: 'Instant',
    color: 'from-emerald-500/20 to-teal-500/5',
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-6 shadow-soft">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Simple Process</span>
          </div>
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold mb-5">
            How PdfPixels Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Edit your images in three simple steps. No software to install, no account required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Flowing animated connector line */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-[2px]">
              <div className="h-full connector-flow rounded-full" />
            </div>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="card-shine bg-card/90 backdrop-blur-sm border border-border/40 rounded-3xl p-8 shadow-soft hover:shadow-premium transition-all duration-400 hover:-translate-y-2.5 hover:border-primary/20 group overflow-hidden">
                  {/* Large decorative watermark number */}
                  <div className="step-watermark">{step.number}</div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-8">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-bold shadow-primary">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`icon-glow w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mt-4 transition-all duration-300`}>
                    <step.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Time Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-muted/60 border border-border/30 text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-medium">{step.time}</span>
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border/50 items-center justify-center z-10 shadow-soft">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The entire process takes less than 30 seconds. Your files are processed securely
            and automatically deleted after 1 hour for your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
