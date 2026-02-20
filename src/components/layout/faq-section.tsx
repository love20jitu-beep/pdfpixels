'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';
import { faqData } from '@/lib/seo-config';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq-section"
      className="py-24 relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-muted/25" />
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-6 shadow-soft">
            <MessageCircleQuestion className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Frequently Asked Questions</span>
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-5">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about PdfPixels&apos;s features, security, and capabilities.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
          role="region"
          aria-label="Frequently Asked Questions"
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={cn(
                  "bg-card/90 backdrop-blur-sm border rounded-2xl overflow-hidden shadow-soft transition-all duration-400",
                  isOpen
                    ? "border-l-[3px] border-l-primary border-border/40 shadow-premium"
                    : "border-border/40 hover:shadow-elevated hover:-translate-y-0.5"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-start gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                    isOpen
                      ? "bg-gradient-to-br from-primary/20 to-primary/8"
                      : "bg-primary/8"
                  )}>
                    <HelpCircle className={cn(
                      "w-5 h-5 transition-colors duration-300",
                      isOpen ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "text-[16px] font-semibold pr-8 transition-colors duration-300",
                      isOpen && "text-primary"
                    )}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-all duration-400 flex-shrink-0 mt-0.5",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-5 pl-20"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.keywords && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {faq.keywords.slice(0, 3).map((keyword, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-full bg-muted/60 border border-border/30 text-muted-foreground font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Schema Markup Note for AI */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="#contact" className="text-primary hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
