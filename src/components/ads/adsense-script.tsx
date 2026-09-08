'use client';

import { hasAdvertisingConsent } from '@/lib/ads-config';
import { useEffect } from 'react';

// Google AdSense Script Component
//
// The loader script MUST render unconditionally in production: AdSense verifies
// the code's presence when reviewing the site, and ads cannot serve without it.
// Personalization stays consent-controlled — without advertising consent we push
// requestNonPersonalizedAds: 1 (Google's documented fallback for consent-gated
// traffic), and personalization resumes once consent is granted.
export function AdSenseScript() {
  useEffect(() => {
    const handleConsentUpdate = () => {
      const consent = hasAdvertisingConsent();
      if (typeof window !== 'undefined') {
        const adsArr = ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []);
        (adsArr as unknown as { requestNonPersonalizedAds?: number }).requestNonPersonalizedAds = consent ? 0 : 1;
      }
    };
    handleConsentUpdate();
    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
    };
  }, []);

  return null;
}
