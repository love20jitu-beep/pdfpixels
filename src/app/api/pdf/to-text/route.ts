import { apiError } from '@/lib/api-response';
import { openEditablePdf } from '@/lib/pdf-api';
import { NextRequest, NextResponse } from 'next/server';
import { inflateSync } from 'zlib';

export const maxDuration = 60;
export const runtime = 'nodejs';

/**
 * Extracts plain text from a raw PDF buffer by parsing content streams,
 * including FlateDecode compressed streams. Handles Tj, TJ, and ' / " operators.
 */
function extractTextFromPdfBuffer(buffer: Buffer): string {
  const content = buffer.toString('latin1');
  const textPieces: string[] = [];

  // 1. Extract and decompress all stream content
  const allStreams: string[] = [];
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let sMatch: RegExpExecArray | null;

  while ((sMatch = streamRegex.exec(content)) !== null) {
    const rawBytes = Buffer.from(sMatch[1], 'latin1');
    // Try to inflate (FlateDecode); if fails, use raw
    let decoded: string;
    try {
      decoded = inflateSync(rawBytes).toString('latin1');
    } catch {
      decoded = sMatch[1];
    }
    allStreams.push(decoded);
  }

  const fullContent = allStreams.join('\n');

  // 2. Parse BT...ET text blocks from all decoded streams
  const btEtRegex = /BT[\s\S]*?ET/g;
  let match: RegExpExecArray | null;

  while ((match = btEtRegex.exec(fullContent)) !== null) {
    const stream = match[0];

    // Matches (Text) Tj or (Text) ' or (Text) "
    const tjRegex = /\((.*?)\)\s*(?:Tj|'|")/g;
    let tjMatch: RegExpExecArray | null;
    while ((tjMatch = tjRegex.exec(stream)) !== null) {
      textPieces.push(decodePdfString(tjMatch[1]));
    }

    // Matches [(Text)-100(More)-50] TJ
    const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
    let arrayMatch: RegExpExecArray | null;
    while ((arrayMatch = tjArrayRegex.exec(stream)) !== null) {
      const inner = arrayMatch[1];
      const strRegex = /\((.*?)\)/g;
      let innerMatch: RegExpExecArray | null;
      let line = '';
      while ((innerMatch = strRegex.exec(inner)) !== null) {
        line += decodePdfString(innerMatch[1]);
      }
      if (line.trim()) textPieces.push(line);
    }
  }

  // Fallback: If no BT...ET blocks found
  if (textPieces.length === 0) {
    const rawParenRegex = /\(([A-Za-z0-9 .,;:!?'"/\-_#@$%&*+=<>()]{3,})\)/g;
    let rawMatch: RegExpExecArray | null;
    while ((rawMatch = rawParenRegex.exec(fullContent)) !== null) {
      const decoded = decodePdfString(rawMatch[1]);
      if (decoded.length > 2 && !/^Font|ColorSpace|Metadata|Encoding|ProcSet/i.test(decoded)) {
        textPieces.push(decoded);
      }
    }
  }

  return textPieces.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function decodePdfString(str: string): string {
  // Decode octal escapes \ddd
  let decoded = str.replace(/\\([0-7]{1,3})/g, (_, oct) => {
    return String.fromCharCode(parseInt(oct, 8));
  });

  // Decode standard escapes
  decoded = decoded
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\');

  // Handle UTF-16BE BOM if present
  if (decoded.startsWith('\xFE\xFF')) {
    let utf16 = '';
    for (let i = 2; i < decoded.length; i += 2) {
      const code = (decoded.charCodeAt(i) << 8) | decoded.charCodeAt(i + 1);
      utf16 += String.fromCharCode(code);
    }
    return utf16;
  }

  return decoded;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const format = (formData.get('format') as string) || 'json';

    const opened = await openEditablePdf(file);
    if (!opened.ok) return opened.response;
    const { pdf, buffer } = opened;

    const pageCount = pdf.getPageCount();
    const extractedText = extractTextFromPdfBuffer(buffer) || 'No selectable text found in this PDF document. The document may be an image scan.';

    const baseName = file?.name ? file.name.replace(/\.pdf$/i, '') : 'document';

    if (format === 'txt' || request.headers.get('accept')?.includes('text/plain')) {
      return new NextResponse(extractedText, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${baseName}.txt"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    return NextResponse.json({
      text: extractedText,
      pageCount,
      fileName: `${baseName}.txt`,
      charCount: extractedText.length,
      wordCount: extractedText.trim() ? extractedText.trim().split(/\s+/).length : 0,
    });
  } catch (error) {
    console.error('PDF to text error:', error);
    return apiError(error instanceof Error ? error.message : 'Failed to extract text from PDF', 500);
  }
}
