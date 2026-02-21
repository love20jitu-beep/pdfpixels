'use client';

import { motion } from 'framer-motion';
import type { Tool } from '@/lib/tools-data';
import { useAppStore } from '@/store/app-store';
import { SpotlightCard } from '../ui/spotlight-card';

type ToolCardProps = {
  tool: Tool;
  index?: number;
};

// Map tool categories to color classes
function getIconColorClass(toolId: string): string {
  const id = toolId.toLowerCase();
  if (id.includes('pdf-merge') || id.includes('pdf-split') || id.includes('pdf-compress') || id.includes('pdf-to') || id.includes('image-to-pdf')) {
    return 'icon-violet';
  }
  if (id.includes('compress') || id.includes('reduce') || id.includes('kb')) {
    return 'icon-emerald';
  }
  if (id.includes('resize') || id.includes('pixel') || id.includes('cm') || id.includes('inch')) {
    return 'icon-blue';
  }
  if (id.includes('to-') || id.includes('convert') || id.includes('png') || id.includes('jpg') || id.includes('webp')) {
    return 'icon-cyan';
  }
  if (id.includes('filter') || id.includes('brightness') || id.includes('contrast') || id.includes('saturation')) {
    return 'icon-amber';
  }
  if (id.includes('blur') || id.includes('pixelate') || id.includes('grayscale') || id.includes('beautify')) {
    return 'icon-rose';
  }
  return 'icon-blue';
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const setActiveTool = useAppStore((state) => state.setActiveTool);
  const Icon = tool.icon;
  const iconColorClass = getIconColorClass(tool.id);

  const handleClick = () => {
    setActiveTool({
      id: tool.id,
      name: tool.name,
      description: tool.description,
    });
    window.location.href = `/tools/${tool.slug}`;
  };

  const getBadgeClasses = (badge?: string) => {
    switch (badge) {
      case 'AI':
        return 'badge-ai';
      case 'Popular':
        return 'badge-popular';
      case 'Secure':
        return 'badge-secure';
      case 'New':
        return 'bg-sky-500/12 text-sky-600 dark:text-sky-400 border-sky-500/18';
      default:
        return 'bg-primary/10 text-primary border-primary/15';
    }
  };

  return (
    <SpotlightCard className="h-full">
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className="group relative flex items-center gap-4 px-5 py-5 rounded-2xl bg-transparent text-left w-full h-full transition-all duration-300"
      >
        {/* Color-coded icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${iconColorClass} bg-secondary/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm glow-ring`}>
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 tracking-tight">
              {tool.name}
            </h3>
            {tool.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getBadgeClasses(tool.badge)}`}>
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed font-medium">
            {tool.description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.button>
    </SpotlightCard>
  );
}
