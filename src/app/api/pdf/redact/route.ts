import { apiError } from '@/lib/api-response';
import { openEditablePdf, pdfBinaryResponse } from '@/lib/pdf-api';
import { NextRequest } from 'next/server';
import { rgb } from 'pdf-lib';

export const maxDuration = 60;
export const runtime = 'nodejs';

interface RedactionBox {
  pageNumber: number; // 1-based
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const redactionsJson = formData.get('redactions') as string | null;

    const opened = await openEditablePdf(file);
    if (!opened.ok) return opened.response;
    const { pdf } = opened;

    let redactions: RedactionBox[] = [];
    if (redactionsJson) {
      try {
        redactions = JSON.parse(redactionsJson);
      } catch {
        // ignore parse error
      }
    }

    if (redactions.length === 0) {
      const pageNumber = parseInt(String(formData.get('pageNumber') || '1'), 10);
      const x = parseFloat(String(formData.get('x') || '50'));
      const y = parseFloat(String(formData.get('y') || '50'));
      const width = parseFloat(String(formData.get('width') || '200'));
      const height = parseFloat(String(formData.get('height') || '30'));
      redactions.push({ pageNumber, x, y, width, height });
    }

    const totalPages = pdf.getPageCount();

    for (const box of redactions) {
      const pageIdx = box.pageNumber - 1;
      if (pageIdx < 0 || pageIdx >= totalPages) continue;

      const page = pdf.getPage(pageIdx);
      const { height: pageHeight } = page.getSize();

      // Convert coordinates if provided from top-left
      const yPos = box.y > 0 && box.y < pageHeight && box.y + box.height <= pageHeight
        ? pageHeight - box.y - box.height
        : box.y;

      page.drawRectangle({
        x: Math.max(0, box.x),
        y: Math.max(0, yPos),
        width: box.width,
        height: box.height,
        color: rgb(0, 0, 0),
        borderColor: rgb(0, 0, 0),
        borderWidth: 0,
        opacity: 1.0,
      });
    }

    // Flatten any interactive forms so redacted areas cannot have active field text
    try {
      const form = pdf.getForm();
      if (form) form.flatten();
    } catch {
      // ignore if no form exists
    }

    const outBytes = await pdf.save();
    const fileName = file!.name ? file!.name.replace(/\.pdf$/i, '-redacted.pdf') : `redacted-${Date.now()}.pdf`;

    return pdfBinaryResponse(outBytes, fileName);
  } catch (error) {
    console.error('PDF redact error:', error);
    return apiError(error instanceof Error ? error.message : 'Failed to redact PDF', 500);
  }
}
