import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const quality = formData.get('quality') as string || 'medium'; // 'low', 'medium', 'high'
    const targetSize = formData.get('targetSize') ? parseInt(formData.get('targetSize') as string) : null; // in KB
    
    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfBytes = new Uint8Array(arrayBuffer);
    const originalSize = arrayBuffer.byteLength;
    
    // Load the PDF
    const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    
    // Create a new PDF with optimized settings
    const newPdf = await PDFDocument.create();
    
    // Copy all pages
    const copiedPages = await newPdf.copyPages(pdf, pdf.getPageIndices());
    for (const page of copiedPages) {
      newPdf.addPage(page);
    }
    
    // Save with compression options
    // pdf-lib doesn't have built-in image compression, but we can optimize the PDF structure
    const saveOptions = {
      useObjectStreams: true, // Better compression
    };
    
    let compressedPdfBytes = await newPdf.save(saveOptions);
    
    // Note: For actual PDF compression with image downsampling, 
    // you would need additional tools like Ghostscript or Sharp for images inside PDF
    
    const compressedSize = compressedPdfBytes.length;
    const savedPercent = Math.round((1 - compressedSize / originalSize) * 100);
    
    // Convert to base64
    const base64 = Buffer.from(compressedPdfBytes).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;

    return NextResponse.json({
      success: true,
      pdfUrl: dataUrl,
      fileName: `compressed-${Date.now()}.pdf`,
      originalSize,
      compressedSize,
      savedPercent: Math.max(0, savedPercent),
      pageCount: pdf.getPageCount(),
    });
  } catch (error) {
    console.error('PDF compress error:', error);
    return NextResponse.json(
      { error: 'Failed to compress PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
