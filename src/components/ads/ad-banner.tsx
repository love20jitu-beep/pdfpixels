'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { adsConfig, hasAdvertisingConsent } from '@/lib/ads-config';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className,
  style 
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);
  const [hasConsent, setHasConsent] = useState(() => {
    if (typeof window === 'undefined') return false;
    return hasAdvertisingConsent();
  });

  useEffect(() => {
    // Listen for consent updates
    const handleConsentUpdate = () => {
      setHasConsent(hasAdvertisingConsent());
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    // Only load ads if enabled, has consent, and not already loaded
    if (!adsConfig.enabled || !hasConsent || isLoaded.current) return;
    
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle as unknown[]).push({});
        isLoaded.current = true;
      }
    } catch {
      // Silently handle ad errors
    }
  }, [hasConsent]);

  // Development placeholder or disabled
  if (adsConfig.testMode || !adsConfig.enabled) {
    return (
      <div 
        className={cn(
          "bg-muted/50 border border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm",
          className
        )}
        style={{ minHeight: '90px', ...style }}
      >
        <span className="opacity-50">Ad Space ({format})</span>
      </div>
    );
  }

  // No consent placeholder
  if (!hasConsent) {
    return (
      <div 
        className={cn(
          "bg-muted/30 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground text-xs",
          className
        )}
        style={{ minHeight: '90px', ...style }}
      >
        <span className="opacity-50">Ads disabled (no consent)</span>
      </div>
    );
  }

  return (
    <div className={cn("ad-container overflow-hidden", className)}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client={adsConfig.publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Pre-configured ad components for common placements

export function HeaderAd() {
  return (
    <div className="w-full flex justify-center py-2">
      <AdBanner 
        slot={adsConfig.slots.header} 
        format="horizontal"
        className="w-full max-w-[728px] min-h-[90px]"
      />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="w-full">
      <AdBanner 
        slot={adsConfig.slots.sidebar} 
        format="vertical"
        className="w-[300px] min-h-[250px]"
      />
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="w-full flex justify-center py-4">
      <AdBanner 
        slot={adsConfig.slots.inContent} 
        format="rectangle"
        className="w-[336px] min-h-[280px]"
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full flex justify-center py-4">
      <AdBanner 
        slot={adsConfig.slots.footer} 
        format="horizontal"
        className="w-full max-w-[728px] min-h-[90px]"
      />
    </div>
  );
}

// Native Ad for better integration
export function NativeAd({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <AdBanner 
        slot={adsConfig.slots.native} 
        format="auto"
        responsive
      />
    </div>
  );
}

// Multiplex Ad (display multiple ads)
export function MultiplexAd({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client={adsConfig.publisherId}
        data-ad-slot={adsConfig.slots.native}
      />
    </div>
  );
}
