import { apiError } from '@/lib/api-response';
import { openEditablePdf, pdfBinaryResponse } from '@/lib/pdf-api';
import { NextRequest } from 'next/server';
import { rgb, StandardFonts } from 'pdf-lib';

export const maxDuration = 60;
export const runtime = 'nodejs';

interface TextEntry {
  pageNumber: number; // 1-based
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  color?: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16) / 255, g: parseInt(result[2], 16) / 255, b: parseInt(result[3], 16) / 255 }
    : { r: 0, g: 0, b: 0 };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const formFieldsJson = formData.get('fields') as string | null;
    const textEntriesJson = formData.get('textEntries') as string | null;

    const opened = await openEditablePdf(file);
    if (!opened.ok) return opened.response;
    const { pdf } = opened;

    let filledCount = 0;

    // 1. Fill AcroForm fields if present
    if (formFieldsJson) {
      try {
        const fields = JSON.parse(formFieldsJson) as Record<string, string | boolean>;
        const form = pdf.getForm();
        if (form) {
          for (const [name, val] of Object.entries(fields)) {
            try {
              if (typeof val === 'boolean') {
                const checkBox = form.getCheckBox(name);
                if (checkBox) {
                  if (val) checkBox.check();
                  else checkBox.uncheck();
                  filledCount++;
                }
              } else if (typeof val === 'string') {
                const textField = form.getTextField(name);
                if (textField) {
                  textField.setText(val);
                  filledCount++;
                }
              }
            } catch {
              // Field might be of different type or not found
            }
          }
        }
      } catch (e) {
        console.warn('Error parsing AcroForm fields:', e);
      }
    }

    // 2. Draw freeform text entries (for non-interactive PDFs / flat forms)
    if (textEntriesJson) {
      try {
        const textEntries = JSON.parse(textEntriesJson) as TextEntry[];
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        const totalPages = pdf.getPageCount();

        for (const entry of textEntries) {
          const pageIdx = entry.pageNumber - 1;
          if (pageIdx < 0 || pageIdx >= totalPages) continue;

          const page = pdf.getPage(pageIdx);
          const { height: pageHeight } = page.getSize();
          const size = entry.fontSize || 12;
          const colorObj = entry.color ? hexToRgb(entry.color) : { r: 0, g: 0, b: 0 };

          const yPos = entry.y > 0 && entry.y < pageHeight
            ? pageHeight - entry.y - size
            : entry.y;

          page.drawText(entry.text || '', {
            x: Math.max(0, entry.x),
            y: Math.max(0, yPos),
            size,
            font,
            color: rgb(colorObj.r, colorObj.g, colorObj.b),
          });
          filledCount++;
        }
      } catch (e) {
        console.warn('Error drawing freeform text entries:', e);
      }
    }

    const outBytes = await pdf.save();
    const fileName = file!.name ? file!.name.replace(/\.pdf$/i, '-filled.pdf') : `filled-${Date.now()}.pdf`;

    return pdfBinaryResponse(outBytes, fileName, {
      'x-filled-count': String(filledCount),
    });
  } catch (error) {
    console.error('PDF form fill error:', error);
    return apiError(error instanceof Error ? error.message : 'Failed to fill PDF form', 500);
  }
}
