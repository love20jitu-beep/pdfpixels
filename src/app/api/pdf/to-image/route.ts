import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const CACHE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = (formData.get('format') as string) || 'jpg'; // 'jpg', 'png', 'webp'
    const quality = parseInt(formData.get('quality') as string) || 90;
    const dpi = parseInt(formData.get('dpi') as string) || 150; // Output DPI
    const pagesParam = (formData.get('pages') as string) || 'all'; // 'all' or '1-3,5'

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400, headers: CACHE_HEADERS });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfBytes = new Uint8Array(arrayBuffer);
    const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    const totalPages = pdf.getPageCount();

    // Parse page indices
    let pageIndices: number[] = [];
    if (pagesParam === 'all') {
      pageIndices = Array.from({ length: totalPages }, (_, i) => i);
    } else {
      const parts = pagesParam.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
          for (let i = start - 1; i < end && i < totalPages; i++) {
            if (i >= 0) pageIndices.push(i);
          }
        } else {
          const idx = parseInt(trimmed) - 1;
          if (idx >= 0 && idx < totalPages) pageIndices.push(idx);
        }
      }
    }

    // Limit to 20 pages max for performance
    pageIndices = pageIndices.slice(0, 20);

    const images: { pageNumber: number; imageUrl: string; width: number; height: number; size: number }[] = [];
    const scale = dpi / 72;

    for (const idx of pageIndices) {
      try {
        // Attempt to render the page directly via sharp (if libvips was compiled with PDF support)
        // We use the page index as the 'page' option in sharp
        const imageBuffer = await sharp(pdfBytes, {
          page: idx,
          density: dpi,
          failOn: 'none'
        })
          .flatten({ background: { r: 255, g: 255, b: 255 } }) // Ensure white background for PDF
          .toFormat(format as any, { quality })
          .toBuffer();

        const metadata = await sharp(imageBuffer).metadata();
        const mimeType = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';

        images.push({
          pageNumber: idx + 1,
          imageUrl: `data:${mimeType};base64,${imageBuffer.toString('base64')}`,
          width: metadata.width || 0,
          height: metadata.height || 0,
          size: imageBuffer.length
        });
      } catch (renderError) {
        console.warn(`Direct sharp render failed for page ${idx + 1}, falling back to placeholder:`, renderError);

        // Placeholder fallback if sharp doesn't support PDF on this system
        const page = pdf.getPage(idx);
        const { width: pdfWidth, height: pdfHeight } = page.getSize();
        const outputWidth = Math.round(pdfWidth * scale);
        const outputHeight = Math.round(pdfHeight * scale);

        const svgPage = `
          <svg width="${outputWidth}" height="${outputHeight}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${outputWidth}" height="${outputHeight}" fill="#f8fafc"/>
            <rect x="20" y="20" width="${outputWidth - 40}" height="${outputHeight - 40}" fill="none" stroke="#e2e8f0" stroke-width="2"/>
            <text x="${outputWidth / 2}" y="${outputHeight / 2 - 20}" font-family="system-ui" font-size="24" font-weight="bold" fill="#64748b" text-anchor="middle">Page ${idx + 1}</text>
            <text x="${outputWidth / 2}" y="${outputHeight / 2 + 20}" font-family="system-ui" font-size="14" fill="#94a3b8" text-anchor="middle">Render Engine Unavailable</text>
            <text x="${outputWidth / 2}" y="${outputHeight / 2 + 50}" font-family="system-ui" font-size="12" fill="#cbd5e1" text-anchor="middle">${Math.round(pdfWidth)}×${Math.round(pdfHeight)} pts</text>
          </svg>`;

        const svgBuffer = Buffer.from(svgPage);
        const placeholderBuffer = await sharp(svgBuffer).toFormat(format as any).toBuffer();
        const mimeType = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';

        images.push({
          pageNumber: idx + 1,
          imageUrl: `data:${mimeType};base64,${placeholderBuffer.toString('base64')}`,
          width: outputWidth,
          height: outputHeight,
          size: placeholderBuffer.length
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalPages,
      convertedPages: images.length,
      format,
      dpi,
      images,
    }, { headers: CACHE_HEADERS });

  } catch (error) {
    console.error('PDF to image error:', error);
    return NextResponse.json(
      { error: 'Failed to convert PDF to images', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: CACHE_HEADERS }
    );
  }
}
