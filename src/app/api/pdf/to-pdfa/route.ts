import { apiError } from '@/lib/api-response';
import { runGhostscriptWithFallback } from '@/lib/ghostscript';
import { openEditablePdf, pdfBinaryResponse, sanitizeDownloadFileName } from '@/lib/pdf-api';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let tempInputPath = '';
  let tempOutputPath = '';

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const conformance = (formData.get('conformance') as string) || '2b'; // 1b or 2b

    const opened = await openEditablePdf(file);
    if (!opened.ok) return opened.response;
    const { pdf, buffer } = opened;

    const randId = crypto.randomBytes(8).toString('hex');
    tempInputPath = path.join(os.tmpdir(), `pdfa-in-${randId}.pdf`);
    tempOutputPath = path.join(os.tmpdir(), `pdfa-out-${randId}.pdf`);

    await fs.promises.writeFile(tempInputPath, buffer);

    const pdfaLevel = conformance === '1b' ? '1' : '2';

    const gsArgs = [
      '-sDEVICE=pdfwrite',
      `-dPDFA=${pdfaLevel}`,
      '-dPDFACompatibilityPolicy=1',
      '-sColorConversionStrategy=RGB',
      '-dProcessColorModel=/DeviceRGB',
      '-dCompatibilityLevel=1.4',
      '-dNOPAUSE',
      '-dBATCH',
      '-dQUIET',
      '-dSAFER',
      `-sOutputFile=${tempOutputPath}`,
      tempInputPath,
    ];

    let processedBytes: Buffer | Uint8Array | null = null;

    try {
      await runGhostscriptWithFallback(gsArgs, {
        timeoutMs: 45_000,
        timeoutMessage: 'PDF/A conversion timed out.',
      });

      if (fs.existsSync(tempOutputPath)) {
        processedBytes = await fs.promises.readFile(tempOutputPath);
      }
    } catch (gsError) {
      console.warn('Ghostscript PDF/A conversion failed, falling back to pdf-lib metadata tagging:', gsError);
    }

    if (!processedBytes || processedBytes.length === 0) {
      return apiError(
        'PDF/A conversion requires Ghostscript which is not available on this server. Please try again later.',
        503
      );
    }

    const baseName = file?.name ? file.name.replace(/\.pdf$/i, '') : 'document';
    const fileName = `${baseName}-pdfa.pdf`;

    return pdfBinaryResponse(processedBytes, sanitizeDownloadFileName(fileName), {
      'x-pdfa-conformance': `PDF/A-${pdfaLevel}b`,
    });
  } catch (error) {
    console.error('PDF to PDF/A error:', error);
    return apiError(error instanceof Error ? error.message : 'Failed to convert PDF to PDF/A', 500);
  } finally {
    if (tempInputPath && fs.existsSync(tempInputPath)) {
      try { await fs.promises.unlink(tempInputPath); } catch {}
    }
    if (tempOutputPath && fs.existsSync(tempOutputPath)) {
      try { await fs.promises.unlink(tempOutputPath); } catch {}
    }
  }
}
