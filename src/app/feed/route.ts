import { NextResponse } from 'next/server';

// RSS Feed for PdfPixels - Updates and New Tools
export async function GET() {
  const baseUrl = 'https://www.pdfpixels.com';
  const currentDate = new Date().toUTCString();

  // Recent updates and news
  const updates = [
    {
      title: 'New AI Background Remover - Now Faster and More Accurate',
      description: 'Our AI-powered background removal tool has been upgraded with a new model that handles complex edges like hair and fur with 30% better accuracy.',
      link: `${baseUrl}/?tool=background-remover`,
      pubDate: new Date('2025-01-15').toUTCString(),
      category: 'AI Tools',
    },
    {
      title: 'HEIC to JPG Converter - Batch Processing Now Available',
      description: 'Convert multiple iPhone HEIC photos to JPG at once. Upload up to 50 images and download them all as JPG files.',
      link: `${baseUrl}/?tool=heic-to-jpg`,
      pubDate: new Date('2025-01-10').toUTCString(),
      category: 'Format Conversion',
    },
    {
      title: 'Passport Photo Maker - New Country Presets Added',
      description: 'Added support for 20+ new country passport photo sizes including China, Brazil, Australia, and more.',
      link: `${baseUrl}/?tool=passport-photo`,
      pubDate: new Date('2025-01-05').toUTCString(),
      category: 'Document Tools',
    },
    {
      title: 'PDF Merge - Now Supports Up to 500MB Total',
      description: 'Increased the total file size limit for PDF merging from 100MB to 500MB. Merge larger documents with ease.',
      link: `${baseUrl}/?tool=pdf-merge`,
      pubDate: new Date('2024-12-28').toUTCString(),
      category: 'PDF Tools',
    },
    {
      title: 'AI Image Upscaler - 4x Upscaling Now Available',
      description: 'New 4x upscaling option for AI image upscaler. Turn small images into high-resolution prints.',
      link: `${baseUrl}/?tool=upscale`,
      pubDate: new Date('2024-12-20').toUTCString(),
      category: 'AI Tools',
    },
    {
      title: 'WebP Support - All Tools Now Support WebP Format',
      description: 'Every image tool on PdfPixels now fully supports WebP format for both input and output.',
      link: baseUrl,
      pubDate: new Date('2024-12-15').toUTCString(),
      category: 'Platform Update',
    },
    {
      title: 'API Rate Limits Increased - 1000 Requests Per Day',
      description: 'Free API now supports 1000 requests per day, up from 500. Build more powerful integrations.',
      link: `${baseUrl}/api-docs`,
      pubDate: new Date('2024-12-10').toUTCString(),
      category: 'API',
    },
    {
      title: 'New Tool: Compress to Exact File Size',
      description: 'New compression tools that target exact file sizes: 10KB, 20KB, 50KB, 100KB, 200KB.',
      link: `${baseUrl}/?tool=compress`,
      pubDate: new Date('2024-12-05').toUTCString(),
      category: 'Image Compression',
    },
    {
      title: 'Social Media Presets - Instagram, YouTube, Twitter Sizes',
      description: 'One-click resize for all major social media platforms. Perfect dimensions for posts, stories, and thumbnails.',
      link: `${baseUrl}/?tool=resize-instagram`,
      pubDate: new Date('2024-11-28').toUTCString(),
      category: 'Social Media',
    },
    {
      title: 'PdfPixels Reaches 2 Million Users',
      description: 'Thank you to our amazing community! PdfPixels has now processed over 50 million images.',
      link: baseUrl,
      pubDate: new Date('2024-11-20').toUTCString(),
      category: 'Milestone',
    },
  ];

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>PdfPixels - Updates and New Features</title>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml"/>
    <description>Latest updates, new tools, and features from PdfPixels - Free Online Image &amp; PDF Tools</description>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} PdfPixels. All rights reserved.</copyright>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <generator>PdfPixels RSS Generator</generator>
    <webMaster>support@pdfpixels.com</webMaster>
    <managingEditor>team@pdfpixels.com</managingEditor>
    <category>Image Processing</category>
    <category>PDF Tools</category>
    <category>Web Applications</category>
    <ttl>60</ttl>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>PdfPixels</title>
      <link>${baseUrl}</link>
      <width>200</width>
      <height>200</height>
    </image>
    
    ${updates.map((item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <category>${item.category}</category>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
      <dc:creator>PdfPixels Team</dc:creator>
      <content:encoded><![CDATA[
        <p>${item.description}</p>
        <p><a href="${item.link}">Try it now at PdfPixels</a></p>
      ]]></content:encoded>
    </item>`).join('')}
    
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
