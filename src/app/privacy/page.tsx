import { Metadata } from 'next';
import { CookieSettingsButton } from '@/components/ads/cookie-consent';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for PdfPixels - Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="text-muted-foreground mb-8">
              <strong>Last Updated:</strong> February 20, 2026
            </p>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to PdfPixels ("we," "our," or "us"). We are committed to protecting your privacy
                and ensuring the security of your personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website
                pdfpixels.com (the "Service").
              </p>
              <p className="text-muted-foreground">
                By using our Service, you agree to the collection and use of information in accordance
                with this policy. If you do not agree with the terms of this Privacy Policy, please do
                not access the Service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">2.1 Files You Upload</h3>
              <p className="text-muted-foreground">
                When you use our image and PDF processing tools, you upload files to our servers for
                processing. We want to assure you that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All uploaded files are processed in real-time and automatically deleted within 1 hour of processing</li>
                <li>We do not store, view, or access your uploaded files</li>
                <li>Your files are never shared with third parties</li>
                <li>All processing occurs on secure, encrypted servers</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground">
                When you access our Service, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages</li>
                <li><strong>IP Address:</strong> Used for security and analytics purposes</li>
                <li><strong>Cookies and Tracking Technologies:</strong> As described in our Cookie Policy</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">2.3 Information from Third Parties</h3>
              <p className="text-muted-foreground">
                We may receive information about you from third parties, including analytics providers
                and advertising partners, to improve our services and show relevant advertisements.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide, maintain, and improve our image and PDF processing services</li>
                <li>To analyze usage patterns and improve user experience</li>
                <li>To detect and prevent fraud, abuse, and security threats</li>
                <li>To display relevant advertisements through Google AdSense</li>
                <li>To communicate with you about service updates and announcements</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Google AdSense and Advertising</h2>
              <p className="text-muted-foreground">
                We use Google AdSense to display advertisements on our Service. Google AdSense uses
                cookies to serve ads based on your prior visits to our website or other websites.
                You can opt out of personalized advertising by visiting:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Google Ads Settings</a></li>
                <li><a href="https://www.aboutads.info/choices/" className="text-primary hover:underline">Digital Advertising Alliance</a></li>
                <li><a href="https://www.networkadvertising.org/choices/" className="text-primary hover:underline">Network Advertising Initiative</a></li>
              </ul>
              <p className="text-muted-foreground">
                Third-party vendors, including Google, use cookies to serve ads based on your prior
                visits to this website or other websites. You can opt out of personalized advertising
                by visiting the links above.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our Service
                and hold certain information. Cookies are files with a small amount of data that
                are stored on your device.
              </p>
              <h3 className="text-xl font-medium mt-6 mb-3">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-muted-foreground">
                You can instruct your browser to refuse all cookies or to indicate when a cookie
                is being sent. However, if you do not accept cookies, some features of our Service
                may not function properly.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your
                personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>256-bit SSL encryption for all data transfers</li>
                <li>SOC 2 Type II certified infrastructure</li>
                <li>GDPR compliant data processing</li>
                <li>Regular security audits and assessments</li>
                <li>Automatic file deletion within 1 hour</li>
              </ul>
              <p className="text-muted-foreground">
                However, no method of transmission over the Internet or electronic storage is 100%
                secure. While we strive to use commercially acceptable means to protect your
                information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Services</h2>
              <p className="text-muted-foreground">
                Our Service may contain links to third-party websites or services. We are not
                responsible for the privacy practices of these third parties. We encourage you
                to review the privacy policies of any third-party sites you visit.
              </p>
              <h3 className="text-xl font-medium mt-6 mb-3">Third-Party Services We Use:</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                <li><strong>Google Analytics:</strong> For website analytics</li>
                <li><strong>CDN Providers:</strong> For content delivery</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our Service is not intended for children under the age of 13. We do not knowingly
                collect personal information from children under 13. If you are a parent or guardian
                and believe that your child has provided us with personal information, please
                contact us immediately. We will take steps to delete such information.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Your Rights (GDPR & CCPA)</h2>
              <p className="text-muted-foreground">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (CCPA)</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise any of these rights, please contact us at privacy@pdfpixels.com.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the
                "Last Updated" date at the top of this page.
              </p>
              <p className="text-muted-foreground">
                You are advised to review this Privacy Policy periodically for any changes.
                Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-xl mt-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> privacy@pdfpixels.com<br />
                  <strong>Website:</strong> https://www.pdfpixels.com/contact
                </p>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-3">Manage Your Cookie Preferences</h3>
              <CookieSettingsButton />
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
