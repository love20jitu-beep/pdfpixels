import { apiError } from '@/lib/api-response';
import { openEditablePdf, parsePageSelection, pdfBinaryResponse } from '@/lib/pdf-api';
import { NextRequest } from 'next/server';

export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const pagesInput = (formData.get('pages') as string) || 'all';

    // Either margins: { top, right, bottom, left } (in points) or absolute box { x, y, width, height }
    const topMargin = parseFloat(String(formData.get('top') || '0'));
    const rightMargin = parseFloat(String(formData.get('right') || '0'));
    const bottomMargin = parseFloat(String(formData.get('bottom') || '0'));
    const leftMargin = parseFloat(String(formData.get('left') || '0'));

    const customX = formData.get('x') !== null ? parseFloat(String(formData.get('x'))) : null;
    const customY = formData.get('y') !== null ? parseFloat(String(formData.get('y'))) : null;
    const customW = formData.get('width') !== null ? parseFloat(String(formData.get('width'))) : null;
    const customH = formData.get('height') !== null ? parseFloat(String(formData.get('height'))) : null;

    const opened = await openEditablePdf(file);
    if (!opened.ok) return opened.response;
    const { pdf } = opened;

    const totalPages = pdf.getPageCount();
    let targetPages: number[] = [];

    if (pagesInput.toLowerCase() === 'all') {
      targetPages = Array.from({ length: totalPages }, (_, i) => i);
    } else if (pagesInput.toLowerCase() === 'odd') {
      targetPages = Array.from({ length: totalPages }, (_, i) => i).filter(i => (i + 1) % 2 !== 0);
    } else if (pagesInput.toLowerCase() === 'even') {
      targetPages = Array.from({ length: totalPages }, (_, i) => i).filter(i => (i + 1) % 2 === 0);
    } else {
      targetPages = parsePageSelection(pagesInput, totalPages);
    }

    if (targetPages.length === 0) {
      targetPages = Array.from({ length: totalPages }, (_, i) => i);
    }

    for (const pageIdx of targetPages) {
      const page = pdf.getPage(pageIdx);
      const { width, height } = page.getSize();

      let cropX = 0;
      let cropY = 0;
      let cropWidth = width;
      let cropHeight = height;

      if (customX !== null && customY !== null && customW !== null && customH !== null) {
        // Absolute box supplied
        cropX = Math.max(0, customX);
        cropY = Math.max(0, customY);
        cropWidth = Math.min(width - cropX, customW);
        cropHeight = Math.min(height - cropY, customH);
      } else {
        // Margins supplied
        cropX = Math.max(0, leftMargin);
        cropY = Math.max(0, bottomMargin);
        cropWidth = Math.max(10, width - leftMargin - rightMargin);
        cropHeight = Math.max(10, height - topMargin - bottomMargin);
      }

      if (cropWidth > 0 && cropHeight > 0) {
        page.setCropBox(cropX, cropY, cropWidth, cropHeight);
        page.setMediaBox(cropX, cropY, cropWidth, cropHeight);
      }
    }

    const outBytes = await pdf.save();
    const fileName = file!.name ? file!.name.replace(/\.pdf$/i, '-cropped.pdf') : `cropped-${Date.now()}.pdf`;

    return pdfBinaryResponse(outBytes, fileName);
  } catch (error) {
    console.error('PDF crop error:', error);
    return apiError(error instanceof Error ? error.message : 'Failed to crop PDF', 500);
  }
}
