import { Metadata } from 'next';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for PdfPixels - Important information about our image and PDF processing services.',
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

            <p className="text-muted-foreground mb-8">
              <strong>Last Updated:</strong> February 20, 2026
            </p>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Disclaimer</h2>
              <p className="text-muted-foreground">
                The information and services provided by PdfPixels ("we," "us," or "our") on
                pdfpixels.com are for general informational and utility purposes only. All information
                and services on the Site are provided in good faith, however we make no representation
                or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
                reliability, availability, or completeness of any information on the Site.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use at Your Own Risk</h2>
              <p className="text-muted-foreground">
                Your use of the Site and its services is solely at your own risk. The Site and its
                services are provided on an "AS IS" and "AS AVAILABLE" basis. The Site and its services
                are provided without warranties of any kind, whether express or implied, including but
                not limited to implied warranties of merchantability, fitness for a particular purpose,
                and non-infringement.
              </p>
              <p className="text-muted-foreground">
                PdfPixels, its subsidiaries, affiliates, and its licensors do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The services will be secure or available at any particular time or location</li>
                <li>Any defects or errors will be corrected</li>
                <li>The services are free of viruses or other harmful components</li>
                <li>The results of using the services will meet your requirements</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. No Professional Advice</h2>
              <p className="text-muted-foreground">
                The Site cannot and does not contain professional advice. The information is provided
                for general informational and educational purposes only and is not a substitute for
                professional advice. Accordingly, before taking any actions based upon such information,
                we encourage you to consult with the appropriate professionals. We do not provide any
                kind of advice.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Image Processing Results</h2>
              <p className="text-muted-foreground">
                While we strive to provide high-quality image and PDF processing services, the results
                may vary based on several factors:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Quality and resolution of the original file</li>
                <li>File format and compression settings selected</li>
                <li>Content and complexity of the image</li>
                <li>Device and browser used to access our Service</li>
              </ul>
              <p className="text-muted-foreground">
                We are not responsible for any loss of data, quality, or information resulting from
                the use of our processing tools. Users should always keep backup copies of important
                files before using our Service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Content</h2>
              <p className="text-muted-foreground">
                Our Service may contain links to third-party websites or content. Such external links
                are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability,
                availability, or completeness by us. We do not warrant, endorse, guarantee, or assume
                responsibility for the accuracy or reliability of any information offered by third-party
                websites linked through the Site.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Responsibility</h2>
              <p className="text-muted-foreground">
                Users of our Service are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Ensuring they have the legal right to process and modify uploaded files</li>
                <li>Obtaining necessary permissions for copyrighted material</li>
                <li>Complying with all applicable local, state, national, and international laws</li>
                <li>Maintaining backups of important files</li>
                <li>Using the Service in accordance with our Terms of Service</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                IN NO EVENT WILL PDFPIXELS OR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS,
                OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from use or inability to use the Service</li>
                <li>Damages resulting from unauthorized access to or alteration of your data</li>
                <li>Any errors or omissions in any content</li>
                <li>Any loss or damage of any kind incurred as a result of your use of any content</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Accuracy of Information</h2>
              <p className="text-muted-foreground">
                We do not make any warranties about the completeness, reliability, and accuracy of this
                information. Any action you take upon the information on our website is strictly at your
                own risk, and we will not be liable for any losses and damages in connection with the use
                of our website.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Consent</h2>
              <p className="text-muted-foreground">
                By using our website, you hereby consent to our disclaimer and agree to its terms.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Updates</h2>
              <p className="text-muted-foreground">
                We may update this Disclaimer from time to time. We shall notify you of any changes by
                posting the new Disclaimer on this page and updating the "Last Updated" date. You are
                advised to review this Disclaimer periodically for any changes.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Disclaimer, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-xl mt-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> legal@pdfpixels.com<br />
                  <strong>Website:</strong> https://www.pdfpixels.com/contact
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
