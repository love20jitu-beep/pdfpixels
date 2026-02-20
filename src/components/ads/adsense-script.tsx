'use client';

import Script from 'next/script';
import { adsConfig, hasAdvertisingConsent } from '@/lib/ads-config';
import { useEffect, useState } from 'react';

// Google AdSense Script Component
// Add this to your layout.tsx to load AdSense
export function AdSenseScript() {
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

  // Don't load if ads are disabled or no consent
  if (!adsConfig.enabled || !hasConsent) {
    return null;
  }

  return (
    <>
      {/* Auto Ads Script */}
      <Script
        async
        src={adsConfig.scriptUrl}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* AdSense Auto Ads Configuration */}
      <Script
        id="adsense-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${adsConfig.publisherId}",
              enable_page_level_ads: true,
              overlays: {bottom: true}
            });
          `,
        }}
      />
    </>
  );
}

// Non-personalized ads version (for users without consent)
export function AdSenseScriptNonPersonalized() {
  if (!adsConfig.enabled) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={adsConfig.scriptUrl}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        id="adsense-config-np"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${adsConfig.publisherId}",
              enable_page_level_ads: true,
              requestNonPersonalizedAds: 1
            });
          `,
        }}
      />
    </>
  );
}

// Publisher ID: Replace ca-pub-XXXXXXXXXXXXXXXX with your actual AdSense Publisher ID
// You can find this in your AdSense dashboard under Account > Account information
// Or set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID environment variable
