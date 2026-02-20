'use client';

import { motion } from 'framer-motion';
import type { ToolCategory } from '@/lib/tools-data';
import { ToolCard } from './tool-card';
import { ArrowRight } from 'lucide-react';

type CategorySectionProps = {
  category: ToolCategory;
};

export function CategorySection({ category }: CategorySectionProps) {
  const CategoryIcon = category.tools[0]?.icon;

  return (
    <section className="category-wrapper">
      {/* Gradient header band */}
      <div className="category-header-band flex items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start sm:items-center gap-4">
          {/* Icon */}
          {CategoryIcon && (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 shadow-sm border border-primary/20">
              <CategoryIcon className="w-6 h-6 text-primary" />
            </div>
          )}

          {/* Title + count */}
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 id={`${category.id}-heading`} className="text-2xl font-bold tracking-tight text-foreground/90">{category.name}</h2>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shadow-sm">
                {category.tools.length} Tools
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* View all link */}
        <button
          onClick={() => {
            const el = document.getElementById(category.id);
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex-shrink-0 group"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {category.tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
}
