import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, degrees } from 'pdf-lib';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const angle = parseInt(formData.get('angle') as string) || 90; // 90, 180, 270, -90
        const pages = formData.get('pages') as string || 'all'; // 'all' or '1,2,3'

        if (!file) {
            return NextResponse.json({ error: 'No PDF file provided' }, { status: 400, headers: CACHE_HEADERS });
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdfBytes = new Uint8Array(arrayBuffer);
        const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

        const totalPages = pdf.getPageCount();

        // Parse which pages to rotate
        let pageIndices: number[] = [];
        if (pages === 'all') {
            pageIndices = Array.from({ length: totalPages }, (_, i) => i);
        } else {
            pageIndices = pages.split(',').map(p => parseInt(p.trim()) - 1).filter(i => i >= 0 && i < totalPages);
        }

        // Apply rotation
        for (const idx of pageIndices) {
            const page = pdf.getPage(idx);
            const currentRotation = page.getRotation().angle;
            page.setRotation(degrees((currentRotation + angle + 360) % 360));
        }

        const savedPdfBytes = await pdf.save();
        const base64 = Buffer.from(savedPdfBytes).toString('base64');
        const dataUrl = `data:application/pdf;base64,${base64}`;

        return NextResponse.json({
            success: true,
            pdfUrl: dataUrl,
            fileName: `rotated-${Date.now()}.pdf`,
            pageCount: totalPages,
            rotatedPages: pageIndices.map(i => i + 1),
            angle,
        }, { headers: CACHE_HEADERS });
    } catch (error) {
        console.error('PDF rotate error:', error);
        return NextResponse.json(
            { error: 'Failed to rotate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
