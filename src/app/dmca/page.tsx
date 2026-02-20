import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'DMCA Policy - PdfPixels',
    description: 'DMCA Copyright Policy for PdfPixels. Learn how to report copyright infringement and our takedown procedures.',
    alternates: {
        canonical: '/dmca',
    },
};

export default function DMCAPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-1">
                <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
                    <article className="prose prose-neutral dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-6">DMCA Copyright Policy</h1>

                        <p className="text-muted-foreground mb-8">
                            <strong>Last Updated:</strong> February 20, 2026
                        </p>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Overview</h2>
                            <p className="text-muted-foreground">
                                PdfPixels (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects the intellectual property rights of others
                                and expects our users to do the same. In accordance with the Digital Millennium Copyright Act
                                of 1998 (&quot;DMCA&quot;), we will respond expeditiously to claims of copyright infringement committed
                                using our Service that are reported to our designated Copyright Agent.
                            </p>
                            <p className="text-muted-foreground">
                                PdfPixels is an image and PDF processing platform. Users upload files for processing
                                (compression, resizing, conversion, etc.), and all files are automatically deleted from
                                our servers within 1 hour of processing. We do not host, store, or distribute user-uploaded
                                content beyond the processing period.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Reporting Copyright Infringement</h2>
                            <p className="text-muted-foreground">
                                If you believe that your copyrighted work has been copied in a way that constitutes
                                copyright infringement and is accessible on our Service, please notify our Copyright Agent
                                with a DMCA takedown notice containing the following information:
                            </p>
                            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                                <li>
                                    <strong>Physical or electronic signature</strong> of the copyright owner or a person
                                    authorized to act on behalf of the copyright owner.
                                </li>
                                <li>
                                    <strong>Identification</strong> of the copyrighted work claimed to have been infringed,
                                    or if multiple copyrighted works are covered by a single notification, a representative
                                    list of such works.
                                </li>
                                <li>
                                    <strong>Identification of the material</strong> that is claimed to be infringing or to be
                                    the subject of infringing activity and that is to be removed or access to which is to be
                                    disabled, and information reasonably sufficient to permit us to locate the material.
                                </li>
                                <li>
                                    <strong>Contact information</strong> for the notifying party, such as an address,
                                    telephone number, and email address.
                                </li>
                                <li>
                                    A <strong>statement</strong> that the notifying party has a good faith belief that use of
                                    the material in the manner complained of is not authorized by the copyright owner, its
                                    agent, or the law.
                                </li>
                                <li>
                                    A <strong>statement</strong> made under penalty of perjury that the information in the
                                    notification is accurate, and that the notifying party is authorized to act on behalf of
                                    the copyright owner.
                                </li>
                            </ol>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Counter-Notification</h2>
                            <p className="text-muted-foreground">
                                If you believe that content you posted was removed or access to it was disabled by mistake
                                or misidentification, you may file a counter-notification with us. A counter-notification
                                must include the following:
                            </p>
                            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                                <li>Your physical or electronic signature.</li>
                                <li>
                                    Identification of the material that has been removed or to which access has been disabled
                                    and the location at which the material appeared before it was removed or disabled.
                                </li>
                                <li>
                                    A statement under penalty of perjury that you have a good faith belief that the material
                                    was removed or disabled as a result of mistake or misidentification.
                                </li>
                                <li>
                                    Your name, address, and telephone number, and a statement that you consent to the
                                    jurisdiction of the federal district court for the judicial district in which your address
                                    is located, and that you will accept service of process from the person who provided the
                                    original DMCA notification.
                                </li>
                            </ol>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Repeat Infringers</h2>
                            <p className="text-muted-foreground">
                                In accordance with the DMCA, we have adopted a policy of terminating, in appropriate
                                circumstances, users who are deemed to be repeat infringers. We may also limit access
                                to our Service and/or update, transfer, or terminate the accounts of users who infringe
                                on the intellectual property rights of others, whether or not there is any repeat infringement.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">5. File Processing & Deletion</h2>
                            <p className="text-muted-foreground">
                                It is important to note that PdfPixels operates as a file processing service. Files uploaded
                                to our platform are:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Processed in real-time for the requested operation (compression, resizing, conversion, etc.)</li>
                                <li>Automatically deleted from our servers within 1 hour of processing</li>
                                <li>Not stored, indexed, or made publicly accessible</li>
                                <li>Not shared with any third parties</li>
                            </ul>
                            <p className="text-muted-foreground">
                                Due to the automatic deletion policy, infringing material is typically no longer available
                                on our servers within a very short timeframe. Nonetheless, we take all DMCA notices seriously
                                and will act promptly to address any valid complaints.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Responsibility</h2>
                            <p className="text-muted-foreground">
                                Users of PdfPixels are solely responsible for ensuring they have the legal right to upload
                                and process files using our Service. By using our Service, you represent and warrant that:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>You own the copyright to the files you upload, or have obtained proper authorization from the copyright owner</li>
                                <li>Your use of our Service does not infringe upon any third party&apos;s intellectual property rights</li>
                                <li>You will not use our Service to process copyrighted material without proper authorization</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
                            <p className="text-muted-foreground">
                                To submit a DMCA takedown notice or counter-notification, please contact our designated
                                Copyright Agent:
                            </p>
                            <div className="bg-muted/50 p-6 rounded-xl mt-4">
                                <p className="text-muted-foreground">
                                    <strong>Email:</strong> dmca@pdfpixels.com<br />
                                    <strong>Subject Line:</strong> DMCA Takedown Notice<br />
                                    <strong>Website:</strong> <Link href="/contact" className="text-primary hover:underline">https://www.pdfpixels.com/contact</Link>
                                </p>
                            </div>
                            <p className="text-muted-foreground mt-4">
                                Please note that under Section 512(f) of the DMCA, any person who knowingly materially
                                misrepresents that material or activity is infringing may be subject to liability for damages.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this DMCA Copyright Policy from time to time. Any changes will be posted on
                                this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy
                                periodically.
                            </p>
                        </section>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
