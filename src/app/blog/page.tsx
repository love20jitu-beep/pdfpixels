import { Metadata } from "next";
import Link from "next/link";
import NextImage from "next/image";
import Script from "next/script";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/lib/seo-config";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Clock, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog - Image & PDF Tips, Guides & Tutorials",
    description:
        "Expert guides on image editing, PDF tools, AI photo enhancement, background removal, and more. Free tutorials to help you master image and document processing in 2026.",
    keywords: [
        "image editing tips",
        "pdf tools guide",
        "ai background removal tutorial",
        "image compression guide",
        "photo editing blog",
        "pdf merge split guide",
        "free image tools blog",
    ],
    alternates: {
        canonical: "/blog",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    openGraph: {
        title: "PdfPixels Blog - Image & PDF Tips, Guides & Tutorials",
        description:
            "Expert guides on image editing, PDF tools, AI photo enhancement, and more. Free tutorials for 2026.",
        type: "website",
        url: `${siteConfig.url}/blog`,
        images: [
            {
                url: `${siteConfig.url}/opengraph-image`,
                width: 1200,
                height: 630,
                alt: "PdfPixels Blog – Image & PDF Tips and Guides",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "PdfPixels Blog - Image & PDF Tips & Tutorials",
        description:
            "Expert guides on image editing, PDF tools, AI photo enhancement, and more.",
        images: [`${siteConfig.url}/opengraph-image`],
    },
};

export default function BlogPage() {
    const blogPosts = getAllBlogPosts();
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    // CollectionPage JSON-LD schema
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "PdfPixels Blog",
        description: "Expert guides on image editing, PDF tools, AI photo enhancement, and more.",
        url: `${siteConfig.url}/blog`,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: blogPosts.map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${siteConfig.url}/blog/${post.slug}`,
                name: post.title,
            })),
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        ],
    };

    return (
        <>
            <Script
                id="collection-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(collectionSchema),
                }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <Navigation />

            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 blur-[100px] rounded-full -z-10" />

                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-lg">
                                <BookOpen className="w-3 h-3" />
                                Knowledge Hub
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">
                                The{" "}
                                <span className="gradient-text">
                                    PdfPixels
                                </span>{" "}
                                Blog
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Practical guides, expert tips, and in-depth tutorials to help you get the most from your images and PDFs. No fluff — just actionable knowledge.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                {featuredPost && (
                    <section className="pb-20">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="mb-10 flex items-center gap-6">
                                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    Latest Article
                                </h2>
                                <div className="h-px flex-1 bg-border hidden md:block" />
                            </div>

                            <Link href={`/blog/${featuredPost.slug}`} className="block group">
                                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 md:p-10 bg-card border border-border rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                                    {/* Cover Image */}
                                    {featuredPost.coverImage && (
                                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                                            <NextImage
                                                src={featuredPost.coverImage}
                                                alt={featuredPost.imageAlt || featuredPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                priority
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div>
                                        <span className="inline-block px-3 py-1 text-xs font-bold bg-primary/10 text-primary rounded-full mb-6 uppercase tracking-wide">
                                            {featuredPost.category}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-muted-foreground mb-8 text-base leading-relaxed line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-primary" />
                                                {featuredPost.author}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" />
                                                {featuredPost.readTime}
                                            </span>
                                            <span>{featuredPost.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Other Posts Grid */}
                {otherPosts.length > 0 && (
                    <section className="py-20 bg-muted/30">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                                <div>
                                    <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">
                                        More Articles
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                        Latest Guides
                                    </h2>
                                </div>
                                <p className="text-muted-foreground max-w-md text-sm">
                                    Deep dives into image optimization, PDF workflows, and AI-powered editing.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherPosts.map((post) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                        <article className="h-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                            {post.coverImage && (
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <NextImage
                                                        src={post.coverImage}
                                                        alt={post.imageAlt || post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-wide">
                                                    {post.category}
                                                </span>
                                                <h3 className="text-lg font-bold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors leading-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    <span>{post.date}</span>
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10" />
                    <div className="container mx-auto px-4 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                            Ready to{" "}
                            <span className="gradient-text">Get Started</span>?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                            Put these tips into action with our free suite of 40+ image and PDF tools. No sign-up required.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                            >
                                Explore All Tools
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
