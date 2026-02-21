'use client';

import Link from 'next/link';
import { ChevronDown, CheckCircle2, Users, Sparkles, Shield, FileType, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toolContentMap, type ToolContent } from '@/lib/tool-content-data';
import { getToolBySlug, type Tool } from '@/lib/tools-data';

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-border/40 rounded-xl overflow-hidden transition-all">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                aria-expanded={open}
            >
                <span className="font-medium text-sm pr-4">{question}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                    {answer}
                </div>
            )}
        </div>
    );
}

function RelatedToolCard({ tool }: { tool: Tool }) {
    const Icon = tool.icon;
    return (
        <Link
            href={`/tools/${tool.slug}`}
            className="group flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-muted/30 transition-all duration-200"
        >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{tool.name}</p>
                <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );
}

export function ToolContentSection({ toolSlug, toolName, isAI, processing }: {
    toolSlug: string;
    toolName: string;
    isAI?: boolean;
    processing: 'client' | 'server' | 'ai';
}) {
    const content = toolContentMap[toolSlug];

    // Fallback for tools without content data
    if (!content) {
        return (
            <section className="container mx-auto px-4 lg:px-8 py-12 border-t border-border/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-3">About {toolName}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {toolName} is a free online tool by PdfPixels.
                        {processing === 'client' ? ' All processing happens in your browser — your files never leave your device.' : ' Files are processed securely on our servers and automatically deleted.'}
                        {isAI && ' Powered by advanced AI technology for professional-quality results.'}
                        {' '}No registration, no watermarks, completely free.
                    </p>
                </div>
            </section>
        );
    }

    const relatedTools = content.relatedTools
        .map(slug => getToolBySlug(slug))
        .filter((t): t is Tool => !!t);

    return (
        <section className="container mx-auto px-4 lg:px-8 py-12 border-t border-border/30">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        About {toolName}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {content.about}
                    </p>
                </div>

                {/* Key Features */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                        Key Features
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                        {content.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Use Cases */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-4.5 h-4.5 text-blue-500" />
                        Who Uses This Tool?
                    </h3>
                    <ul className="space-y-2">
                        {content.useCases.map((useCase, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <span className="text-primary font-medium shrink-0">→</span>
                                {useCase}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* How It Works */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">How to Use {toolName}</h3>
                    <ol className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">1</span>
                            <span><strong className="text-foreground">Upload:</strong> Drag and drop your file or click to browse. Supports {content.supportedFormats}.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">2</span>
                            <span><strong className="text-foreground">Configure:</strong> Adjust settings like quality, size, effects, or format to match your needs.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">3</span>
                            <span><strong className="text-foreground">Download:</strong> Click process and download your result. {processing === 'ai' ? 'AI processing takes 10-30 seconds.' : 'Results are instant.'}</span>
                        </li>
                    </ol>
                </div>

                {/* FAQ Accordion */}
                {content.faqs.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-2">
                            {content.faqs.map((faq, i) => (
                                <FAQItem key={i} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Trust Signals */}
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full">
                        <Shield className="w-3.5 h-3.5" /> 100% Free — No Signup
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full">
                        <Shield className="w-3.5 h-3.5" /> {processing === 'client' ? 'Client-Side — Files Never Uploaded' : 'Secure Server — Auto-Deleted'}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full">
                        <FileType className="w-3.5 h-3.5" /> {content.supportedFormats}
                    </div>
                    {isAI && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full">
                            <Sparkles className="w-3.5 h-3.5" /> AI-Powered
                        </div>
                    )}
                </div>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Related Tools</h3>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                            {relatedTools.map(rt => (
                                <RelatedToolCard key={rt.id} tool={rt} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
