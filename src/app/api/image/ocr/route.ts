import { NextRequest, NextResponse } from 'next/server';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

// Simple OCR using base64 image analysis
// For production, integrate Tesseract.js or a cloud OCR API
async function performOCR(imageBuffer: Buffer, mimeType: string): Promise<string> {
    // Use canvas-based approach for basic text extraction
    // Since we can't run Tesseract.js easily in Next.js App Router server components,
    // we return a helpful message and use client-side Tesseract
    return '';
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;
        const language = (formData.get('language') as string) || 'eng';

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400, headers: CACHE_HEADERS });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'File must be an image' }, { status: 400, headers: CACHE_HEADERS });
        }

        // Validate file size (max 10MB for OCR)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'Image too large. Maximum 10MB for OCR.' }, { status: 400, headers: CACHE_HEADERS });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert to base64 for client-side processing
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Return the processed image URL for client-side Tesseract.js
        return NextResponse.json({
            success: true,
            imageUrl: dataUrl,
            language,
            processingMode: 'client', // Signal to client to run Tesseract
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
        }, { headers: CACHE_HEADERS });

    } catch (error) {
        console.error('OCR error:', error);
        return NextResponse.json(
            { error: 'Failed to process image for OCR', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
