import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const pagesToDelete = formData.get('pages') as string; // e.g., '1,3,5' (1-indexed)

        if (!file) {
            return NextResponse.json({ error: 'No PDF file provided' }, { status: 400, headers: CACHE_HEADERS });
        }

        if (!pagesToDelete) {
            return NextResponse.json({ error: 'No pages specified for deletion' }, { status: 400, headers: CACHE_HEADERS });
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdfBytes = new Uint8Array(arrayBuffer);
        const sourcePdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

        const totalPages = sourcePdf.getPageCount();

        // Parse pages to delete (1-indexed)
        const deleteSet = new Set(
            pagesToDelete.split(',')
                .map(p => parseInt(p.trim()) - 1) // convert to 0-indexed
                .filter(i => i >= 0 && i < totalPages)
        );

        if (deleteSet.size >= totalPages) {
            return NextResponse.json({ error: 'Cannot delete all pages from a PDF' }, { status: 400, headers: CACHE_HEADERS });
        }

        // Build list of pages to KEEP
        const keepIndices = Array.from({ length: totalPages }, (_, i) => i).filter(i => !deleteSet.has(i));

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(sourcePdf, keepIndices);
        for (const page of copiedPages) {
            newPdf.addPage(page);
        }

        const savedPdfBytes = await newPdf.save();
        const base64 = Buffer.from(savedPdfBytes).toString('base64');
        const dataUrl = `data:application/pdf;base64,${base64}`;

        return NextResponse.json({
            success: true,
            pdfUrl: dataUrl,
            fileName: `edited-${Date.now()}.pdf`,
            originalPageCount: totalPages,
            deletedPages: Array.from(deleteSet).map(i => i + 1),
            remainingPageCount: keepIndices.length,
        }, { headers: CACHE_HEADERS });
    } catch (error) {
        console.error('PDF delete pages error:', error);
        return NextResponse.json(
            { error: 'Failed to delete pages', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
