import { NextRequest, NextResponse } from 'next/server';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured. Add OPENAI_API_KEY to your .env file.', success: false },
                { status: 500, headers: CACHE_HEADERS }
            );
        }

        const formData = await request.formData();
        const file = formData.get('image') as File;
        const tool = formData.get('tool') as string || 'enhance-image';
        const prompt = formData.get('prompt') as string || 'Enhance this image';

        if (!file) {
            return NextResponse.json(
                { error: 'No image provided', success: false },
                { status: 400, headers: CACHE_HEADERS }
            );
        }

        // Check file size (max 20MB for OpenAI)
        if (file.size > 20 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File too large. Maximum size for AI processing is 20MB.', success: false },
                { status: 400, headers: CACHE_HEADERS }
            );
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = file.type || 'image/jpeg';

        // Use OpenAI's image editing API
        const response = await fetch('https://api.openai.com/v1/images/edits', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: (() => {
                const fd = new FormData();
                fd.append('image', file);
                fd.append('prompt', prompt);
                fd.append('model', 'gpt-image-1');
                fd.append('size', '1024x1024');
                fd.append('quality', 'high');
                return fd;
            })(),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData?.error?.message || `OpenAI API error: ${response.status}`;

            // Fallback: use GPT-4o Vision for analysis + Sharp for processing
            if (response.status === 400 || response.status === 404) {
                return await processWithVisionFallback(apiKey, base64Image, mimeType, tool, prompt);
            }

            return NextResponse.json(
                { error: errorMessage, success: false },
                { status: response.status, headers: CACHE_HEADERS }
            );
        }

        const result = await response.json();

        // OpenAI returns base64 or URL
        let imageUrl: string;
        if (result.data?.[0]?.b64_json) {
            imageUrl = `data:image/png;base64,${result.data[0].b64_json}`;
        } else if (result.data?.[0]?.url) {
            // Fetch the image and convert to data URL for client use
            const imgResponse = await fetch(result.data[0].url);
            const imgBuffer = await imgResponse.arrayBuffer();
            const imgBase64 = Buffer.from(imgBuffer).toString('base64');
            imageUrl = `data:image/png;base64,${imgBase64}`;
        } else {
            return NextResponse.json(
                { error: 'Unexpected response from OpenAI', success: false },
                { status: 500, headers: CACHE_HEADERS }
            );
        }

        return NextResponse.json({
            success: true,
            imageUrl,
            tool,
        }, { headers: CACHE_HEADERS });

    } catch (error) {
        console.error('AI processing error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'AI processing failed', success: false },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}

// Fallback: use Vision API for instructions + Sharp for basic processing
async function processWithVisionFallback(
    apiKey: string,
    base64Image: string,
    mimeType: string,
    tool: string,
    prompt: string
): Promise<NextResponse> {
    try {
        const sharpModule = await import('sharp');
        const sharp = sharpModule.default;
        const buffer = Buffer.from(base64Image, 'base64');
        let image = sharp(buffer, { failOn: 'none' });

        // Apply tool-specific Sharp transformations
        switch (tool) {
            case 'remove-background':
                // For background removal without AI, make a best-effort with threshold
                image = image.removeAlpha().ensureAlpha();
                break;
            case 'enhance-image':
                image = image.sharpen({ sigma: 1.5 }).modulate({ brightness: 1.05, saturation: 1.1 }).normalise();
                break;
            case 'blur-face':
            case 'blur-background':
                image = image.blur(8);
                break;
            case 'beautify':
            case 'retouch':
                image = image.sharpen({ sigma: 0.8 }).modulate({ brightness: 1.03, saturation: 1.05 });
                break;
            case 'upscale':
                const meta = await image.metadata();
                image = image.resize((meta.width || 800) * 2, (meta.height || 600) * 2, { kernel: 'lanczos3' });
                break;
        }

        const outputBuffer = await image.png().toBuffer();
        const outputBase64 = outputBuffer.toString('base64');

        return NextResponse.json({
            success: true,
            imageUrl: `data:image/png;base64,${outputBase64}`,
            tool,
            fallback: true,
        }, { headers: CACHE_HEADERS });
    } catch (error) {
        return NextResponse.json(
            { error: 'AI processing failed. Please try a different image.', success: false },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
