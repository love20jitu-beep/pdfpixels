import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? { r: parseInt(result[1], 16) / 255, g: parseInt(result[2], 16) / 255, b: parseInt(result[3], 16) / 255 }
        : { r: 0.5, g: 0.5, b: 0.5 };
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const text = (formData.get('text') as string) || 'CONFIDENTIAL';
        const opacity = parseFloat(formData.get('opacity') as string) || 0.3;
        const fontSize = parseInt(formData.get('fontSize') as string) || 48;
        const colorHex = (formData.get('color') as string) || '#808080';
        const rotation = parseInt(formData.get('rotation') as string) || 45;
        const position = (formData.get('position') as string) || 'center'; // center, diagonal

        if (!file) {
            return NextResponse.json({ error: 'No PDF file provided' }, { status: 400, headers: CACHE_HEADERS });
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdfBytes = new Uint8Array(arrayBuffer);
        const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

        const font = await pdf.embedFont(StandardFonts.HelveticaBold);
        const color = hexToRgb(colorHex);
        const totalPages = pdf.getPageCount();

        for (let i = 0; i < totalPages; i++) {
            const page = pdf.getPage(i);
            const { width, height } = page.getSize();
            const textWidth = font.widthOfTextAtSize(text, fontSize);
            const textHeight = font.heightAtSize(fontSize);

            let x = (width - textWidth) / 2;
            let y = (height - textHeight) / 2;

            if (position === 'top-left') { x = 50; y = height - 100; }
            else if (position === 'top-right') { x = width - textWidth - 50; y = height - 100; }
            else if (position === 'bottom-left') { x = 50; y = 50; }
            else if (position === 'bottom-right') { x = width - textWidth - 50; y = 50; }

            page.drawText(text, {
                x,
                y,
                size: fontSize,
                font,
                color: rgb(color.r, color.g, color.b),
                opacity,
                rotate: degrees(position === 'diagonal' || position === 'center' ? rotation : 0),
            });
        }

        const savedPdfBytes = await pdf.save();
        const base64 = Buffer.from(savedPdfBytes).toString('base64');
        const dataUrl = `data:application/pdf;base64,${base64}`;

        return NextResponse.json({
            success: true,
            pdfUrl: dataUrl,
            fileName: `watermarked-${Date.now()}.pdf`,
            pageCount: totalPages,
        }, { headers: CACHE_HEADERS });
    } catch (error) {
        console.error('PDF watermark error:', error);
        return NextResponse.json(
            { error: 'Failed to add watermark', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
