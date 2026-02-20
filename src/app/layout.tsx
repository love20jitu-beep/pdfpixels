import type { Metadata, Viewport } from "next";
import { Inter, Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { JsonLdSchemas } from "@/components/seo/json-ld";
import { seoConfig, siteConfig } from "@/lib/seo-config";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { CookieConsentBanner } from "@/components/ads/cookie-consent";

// Inter - Modern, highly readable sans-serif font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: `${siteConfig.name} - Free Online Image & PDF Tools | Compress, Resize, Convert`,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoConfig.longDescription,
  keywords: [
    ...seoConfig.primaryKeywords,
    ...seoConfig.secondaryKeywords,
    ...seoConfig.longTailKeywords,
  ],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,

  // URL and canonical
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed',
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Free Online Image & PDF Tools`,
    description: seoConfig.longDescription,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'PdfPixels - Free Online Image and PDF Editing Tools',
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@pdfpixels',
    creator: '@pdfpixels',
    title: `${siteConfig.name} - Free Online Image & PDF Tools`,
    description: seoConfig.longDescription,
    images: [`${siteConfig.url}/opengraph-image`],
  },

  // AI Bots & Crawlers - Allow AI companies for indexing (AEO/GEO Optimization)
  other: {
    // LLM.txt location for AI crawlers
    'llms-txt': 'https://www.pdfpixels.com/llms.txt',

    // Content quality signals
    'rating': 'general',
    'distribution': 'global',

    // GEO signals
    'geo.region': 'US',
    'geo.placename': 'Worldwide',
    'ICBM': '0, 0',
  },

  // Verification tags for all major search engines
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-code',
    other: {
      // Bing Webmaster verification
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || 'bing-verification-code',
      // Yandex Webmaster verification
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'yandex-verification-code',
      // Baidu verification
      'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || 'baidu-verification-code',
      // Naver verification
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || 'naver-verification-code',
      // Pinterest verification
      'p:domain_verify': process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION || 'pinterest-verification-code',
    },
  },

  // Additional meta tags for search engines
  category: 'Image Processing, PDF Tools, Online Utilities',
  classification: 'Web Application, Productivity Tool',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Apple web app capabilities
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PdfPixels',
  },

};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preconnect for Google AdSense */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://adservice.google.com" />

        {/* Preload critical resources */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

      </head>
      <body className={`${inter.variable} ${dmSans.variable} ${outfit.variable} antialiased bg-background text-foreground`}>
        <JsonLdSchemas />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <AdSenseScript />
        </ThemeProvider>
      </body>
    </html>
  );
}
