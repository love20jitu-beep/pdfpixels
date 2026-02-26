import { NextRequest, NextResponse } from 'next/server';

const CACHE_HEADERS = {
    'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;
        const tool = formData.get('tool') as string || 'enhance-image';

        if (!file) {
            return NextResponse.json(
                { error: 'No image provided', success: false },
                { status: 400, headers: CACHE_HEADERS }
            );
        }

        // Check file size (max 20MB)
        if (file.size > 20 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File too large. Maximum size for processing is 20MB.', success: false },
                { status: 400, headers: CACHE_HEADERS }
            );
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = file.type || 'image/jpeg';

        return await processWithSharp(base64Image, mimeType, tool);

    } catch (error) {
        console.error('Image processing error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Image processing failed', success: false },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}

// Local processing with Sharp
async function processWithSharp(
    base64Image: string,
    mimeType: string,
    tool: string
): Promise<NextResponse> {
    try {
        const sharpModule = await import('sharp');
        const sharp = sharpModule.default;
        const buffer = Buffer.from(base64Image, 'base64');
        let image = sharp(buffer, { failOn: 'none' });

        // Advanced tool-specific Sharp transformations
        switch (tool) {
            case 'remove-background':
                // Basic thresholding attempts to isolate the subject. 
                // For real background removal, a model or API like rembg is needed.
                // We'll apply a high-contrast black/white mask representation here as an approximation.
                const metaBg = await image.metadata();

                // Extract alpha if it exists, otherwise create a pseudo-alpha based on lightness
                const hasAlpha = metaBg.hasAlpha;
                if (!hasAlpha) {
                    // This is a basic fallback to make the whitest parts transparent (assuming white background)
                    const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

                    // Simple white thresholding (white -> transparent)
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        // If color is very white, make it transparent
                        if (r > 240 && g > 240 && b > 240) {
                            data[i + 3] = 0; // Set alpha to 0
                        }
                    }

                    image = sharp(data, {
                        raw: {
                            width: info.width,
                            height: info.height,
                            channels: 4
                        }
                    });
                }
                break;

            case 'enhance-image':
                // Increase contrast, saturation, and sharpen the image
                image = image
                    .sharpen({ sigma: 1.5, m1: 1, m2: 2, x1: 2, y2: 10, y3: 20 })
                    .modulate({ brightness: 1.05, saturation: 1.25 })
                    .normalize();
                break;

            case 'blur-face':
            case 'blur-background':
                // Deep blur for privacy or bokeh effect
                image = image.blur(15);
                break;

            case 'beautify':
            case 'retouch':
                // Softening skin (blur) combined with brightening and slight sharpening of edges
                image = image
                    .blur(1.5) // Soften
                    .sharpen({ sigma: 0.8, m1: 0, m2: 1 }) // Edge detail recovery
                    .modulate({ brightness: 1.08, saturation: 1.1 })
                    .normalize();
                break;

            case 'upscale':
                const meta = await image.metadata();
                // 2x upscale with highest quality lanczos3 filter
                image = image.resize({
                    width: (meta.width || 800) * 2,
                    height: (meta.height || 600) * 2,
                    kernel: sharp.kernel.lanczos3,
                    fastShrinkOnLoad: false
                }).sharpen({ sigma: 1.2 }); // Light sharpen after upscale to reduce blur
                break;
        }

        // Always output as PNG to support transparency and maintain quality
        const outputBuffer = await image.png({ quality: 100 }).toBuffer();
        const outputBase64 = outputBuffer.toString('base64');

        return NextResponse.json({
            success: true,
            imageUrl: `data:image/png;base64,${outputBase64}`,
            tool,
            fallback: true,
        }, { headers: CACHE_HEADERS });

    } catch (error) {
        console.error('Sharp processing error:', error);
        return NextResponse.json(
            { error: 'Image processing failed. Please try a different image.', success: false },
            { status: 500, headers: CACHE_HEADERS }
        );
    }
}
