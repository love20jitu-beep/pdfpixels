import { Metadata } from 'next';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for PdfPixels - Read our terms and conditions for using our free image and PDF processing services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <p className="text-muted-foreground mb-8">
              <strong>Last Updated:</strong> February 20, 2026
            </p>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using PdfPixels ("Service"), available at pdfpixels.com,
                you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by these terms, please do not use this Service.
              </p>
              <p className="text-muted-foreground">
                These Terms of Service apply to all users of the Service, including without
                limitation users who are browsers, vendors, customers, merchants, and/or
                contributors of content.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground">
                PdfPixels provides free online image and PDF processing tools, including
                but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Image compression and optimization</li>
                <li>Image resizing and scaling</li>
                <li>Image format conversion (JPG, PNG, WebP, AVIF, etc.)</li>
                <li>Image editing (rotation, cropping, filters)</li>
                <li>PDF merging and splitting</li>
                <li>PDF compression and conversion</li>
                <li>Background removal and image enhancement</li>
              </ul>
              <p className="text-muted-foreground">
                Our Service is provided "as is" and we make no guarantees about the availability,
                reliability, or functionality of the Service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">3.1 Acceptable Use</h3>
              <p className="text-muted-foreground">You agree to use our Service only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Upload, process, or distribute illegal, harmful, or offensive content</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Attempt to hack, disrupt, or damage our systems</li>
                <li>Use automated systems or scripts to overload our servers</li>
                <li>Reverse engineer or attempt to extract source code from our Service</li>
                <li>Upload files containing viruses, malware, or other harmful code</li>
                <li>Use the Service to violate any local, state, national, or international law</li>
                <li>Process images containing child exploitation material</li>
                <li>Upload content that promotes violence, terrorism, or illegal activities</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">3.2 File Upload Guidelines</h3>
              <p className="text-muted-foreground">
                When uploading files to our Service, you confirm that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You have the legal right to upload and process the files</li>
                <li>The files do not contain any illegal or prohibited content</li>
                <li>The files do not exceed our maximum file size limits (100MB for images, 500MB for PDFs)</li>
                <li>You will not upload copyrighted material without proper authorization</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property Rights</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">4.1 Your Content</h3>
              <p className="text-muted-foreground">
                You retain all ownership rights to the files you upload to our Service. We do not
                claim any ownership over your content. Processed files remain your property, and
                we automatically delete all uploaded files within 1 hour of processing.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">4.2 Our Service</h3>
              <p className="text-muted-foreground">
                The Service, including its original content, features, and functionality, is owned
                by PdfPixels and is protected by international copyright, trademark, patent,
                trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">4.3 License Grant</h3>
              <p className="text-muted-foreground">
                We grant you a limited, non-exclusive, non-transferable, revocable license to use
                our Service for personal and commercial purposes, subject to these Terms.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimers</h2>

              <h3 className="text-xl font-medium mt-6 mb-3">5.1 No Warranties</h3>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-medium mt-6 mb-3">5.2 No Guarantee</h3>
              <p className="text-muted-foreground">
                We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The Service will be uninterrupted or error-free</li>
                <li>The results from using the Service will be accurate or reliable</li>
                <li>Any errors in the Service will be corrected</li>
                <li>The Service will meet your specific requirements</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">5.3 Quality Disclaimer</h3>
              <p className="text-muted-foreground">
                While we strive to provide high-quality image and PDF processing, the quality
                of the output may vary depending on the input file quality, format, and selected
                processing options. We are not responsible for any loss of quality or data
                resulting from the use of our Service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                IN NO EVENT SHALL PDFPIXELS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS,
                SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF
                PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-muted-foreground">
                Our total liability for any claim arising from the use of our Service shall
                not exceed the amount you paid to us (if any) for using the Service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless PdfPixels and its licensee
                and licensors, and their employees, contractors, agents, officers, and directors,
                from and against any and all claims, damages, obligations, losses, liabilities,
                costs or debt, and expenses arising from:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your use of and access to the Service</li>
                <li>Your violation of these Terms of Service</li>
                <li>Your violation of any third-party right, including without limitation any
                  copyright, property, or privacy right</li>
                <li>Any claim that your use of the Service caused damage to a third party</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Privacy Policy</h2>
              <p className="text-muted-foreground">
                Your use of our Service is also governed by our Privacy Policy. Please review
                our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> to
                understand our practices regarding the collection and use of your information.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our Service may contain links to third-party websites or services that are not
                owned or controlled by PdfPixels. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices of any third-party
                websites or services. You acknowledge and agree that PdfPixels shall not be
                responsible or liable, directly or indirectly, for any damage or loss caused or
                alleged to be caused by or in connection with the use of or reliance on any such
                content, goods, or services available on or through any such websites or services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Modifications to Service</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue, temporarily or permanently,
                the Service or any service to which it connects, with or without notice and without
                liability to you. We may also impose limits on certain features and services or
                restrict your access to parts or all of the Service without notice or liability.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed and construed in accordance with the laws of the
                United States, without regard to its conflict of law provisions. Our failure to
                enforce any right or provision of these Terms will not be considered a waiver of
                those rights. If any provision of these Terms is held to be invalid or unenforceable
                by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms
                at any time. If a revision is material, we will try to provide at least 30 days'
                notice prior to any new terms taking effect. What constitutes a material change
                will be determined at our sole discretion.
              </p>
              <p className="text-muted-foreground">
                By continuing to access or use our Service after those revisions become effective,
                you agree to be bound by the revised terms. If you do not agree to the new terms,
                please stop using the Service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us:
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
