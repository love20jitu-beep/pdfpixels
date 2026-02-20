import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const popularTools = [
        { name: 'Compress Image', href: '/compress-image' },
        { name: 'Resize Image', href: '/resize-image' },
        { name: 'PNG to JPG', href: '/png-to-jpg' },
        { name: 'JPG to PNG', href: '/jpg-to-png' },
        { name: 'Merge PDF', href: '/merge-pdf' },
        { name: 'Split PDF', href: '/split-pdf' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-1 flex items-center justify-center py-20">
                <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
                    <div className="text-8xl font-bold gradient-text mb-4">404</div>
                    <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Try one of our popular tools below or go back to the homepage.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        <Link href="/">
                            <Button size="lg" className="gap-2">
                                <Home className="w-4 h-4" />
                                Go to Homepage
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button size="lg" variant="outline" className="gap-2">
                                <Search className="w-4 h-4" />
                                Search Tools
                            </Button>
                        </Link>
                    </div>

                    <div className="border-t border-border pt-8">
                        <h2 className="text-lg font-semibold mb-4">Popular Tools</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {popularTools.map((tool) => (
                                <Link
                                    key={tool.name}
                                    href={tool.href}
                                    className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm font-medium text-muted-foreground hover:text-primary"
                                >
                                    {tool.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
