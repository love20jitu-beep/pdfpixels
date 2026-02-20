import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const orderJson = formData.get('order') as string; // JSON array of 1-indexed page numbers e.g. [3,1,2]

        if (!file) {
            return NextResponse.json({ error: 'No PDF file provided' }, { status: 400, headers: CACHE_HEADERS });
        }

        if (!orderJson) {
            return NextResponse.json({ error: 'Page order not provided' }, { status: 400, headers: CACHE_HEADERS });
        }

        const newOrder: number[] = JSON.parse(orderJson); // 1-indexed

        const arrayBuffer = await file.arrayBuffer();
        const pdfBytes = new Uint8Array(arrayBuffer);
        const sourcePdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

        const totalPages = sourcePdf.getPageCount();

        // Validate order
        if (newOrder.length !== totalPages) {
            return NextResponse.json(
                { error: `Order must include all ${totalPages} page numbers` },
                { status: 400, headers: CACHE_HEADERS }
            );
        }

        // Convert 1-indexed to 0-indexed
        const zeroIndexed = newOrder.map(p => p - 1);

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(sourcePdf, zeroIndexed);
        for (const page of copiedPages) {
            newPdf.addPage(page);
        }

        const savedPdfBytes = await newPdf.save();
        const base64 = Buffer.from(savedPdfBytes).toString('base64');
        const dataUrl = `data:application/pdf;base64,${base64}`;

        return NextResponse.json({
            success: true,
            pdfUrl: dataUrl,
            fileName: `reordered-${Date.now()}.pdf`,
            pageCount: totalPages,
            newOrder,
        }, { headers: CACHE_HEADERS });
    } catch (error) {
        console.error('PDF reorder error:', error);
        return NextResponse.json(
            { error: 'Failed to reorder PDF pages', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
