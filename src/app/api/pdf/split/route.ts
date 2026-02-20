import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const mode = formData.get('mode') as string || 'all'; // 'all', 'range', 'single'
    const pageRange = formData.get('pageRange') as string; // e.g., '1-3,5,7-9'
    const singlePage = formData.get('singlePage') as string; // e.g., '1'

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfBytes = new Uint8Array(arrayBuffer);
    const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

    const totalPages = pdf.getPageCount();
    let pagesToExtract: number[] = [];

    if (mode === 'single' && singlePage) {
      pagesToExtract = [parseInt(singlePage) - 1];
    } else if (mode === 'range' && pageRange) {
      // Parse page range like '1-3,5,7-9'
      const parts = pageRange.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
          for (let i = start - 1; i < end; i++) {
            if (i >= 0 && i < totalPages) {
              pagesToExtract.push(i);
            }
          }
        } else {
          const pageNum = parseInt(trimmed) - 1;
          if (pageNum >= 0 && pageNum < totalPages) {
            pagesToExtract.push(pageNum);
          }
        }
      }
    } else {
      // Extract all pages individually
      const results: { pageNumber: number; pdfUrl: string; fileName: string }[] = [];
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        const newPdfBytes = await newPdf.save();
        const base64 = Buffer.from(newPdfBytes).toString('base64');
        results.push({
          pageNumber: i + 1,
          pdfUrl: `data:application/pdf;base64,${base64}`,
          fileName: `page-${i + 1}.pdf`,
        });
      }

      return NextResponse.json({
        success: true,
        mode: 'split-all',
        totalPages,
        pages: results,
      });
    }

    // Create PDF with selected pages
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);

    for (const page of copiedPages) {
      newPdf.addPage(page);
    }

    const newPdfBytes = await newPdf.save();
    const base64 = Buffer.from(newPdfBytes).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;

    return NextResponse.json({
      success: true,
      mode: 'extract',
      totalPages,
      extractedPages: pagesToExtract.map(p => p + 1),
      pdfUrl: dataUrl,
      fileName: `extracted-pages-${Date.now()}.pdf`,
    });
  } catch (error) {
    console.error('PDF split error:', error);
    return NextResponse.json(
      { error: 'Failed to split PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
