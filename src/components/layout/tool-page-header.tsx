'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { type LucideIcon } from 'lucide-react';

interface ToolPageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon | React.ReactNode;
    onReset: () => void;
    /** Show the "AI Powered" gradient badge */
    isAI?: boolean;
    /** Optional emoji icon (used when icon is not a LucideIcon) */
    emoji?: string;
    /** Optional children rendered on the right side (e.g. download buttons) */
    children?: React.ReactNode;
}

export function ToolPageHeader({
    title,
    description,
    icon,
    onReset,
    isAI = false,
    emoji,
    children,
}: ToolPageHeaderProps) {
    const isLucideIcon = typeof icon === 'function';

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-card/40 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-border/50 shadow-sm">
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    onClick={onReset}
                    className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors hover:bg-white/60 dark:hover:bg-white/10 h-11 w-11 shadow-sm border border-border/40 flex-shrink-0"
                    aria-label="Back to home"
                >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20 flex-shrink-0">
                        {emoji ? (
                            <span className="text-2xl">{emoji}</span>
                        ) : isLucideIcon ? (
                            (() => {
                                const IconComponent = icon as LucideIcon;
                                return <IconComponent className="w-7 h-7 text-white" />;
                            })()
                        ) : (
                            icon
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                {title}
                            </h1>
                            {isAI && (
                                <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 text-xs">
                                    AI Powered
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mt-0.5">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
            {children && (
                <div className="flex items-center gap-2 flex-shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}
