import bwipjs from 'bwip-js';
import qrcode from 'qrcode-generator';

import { barcodeTypes, bwipEcLevels } from './barcode-config.js';
import type {
  BarcodeEcLevel,
  BarcodeType,
  BwipBarMatrix,
  BwipPixelMatrix,
  Matrix
} from '../types.js';

export function generateMatrix(type: BarcodeType, text: string, ecLevel: BarcodeEcLevel): Matrix {
  if (type === 'qrcode') {
    return generateQrMatrix(text, ecLevel);
  }

  return generateBwipMatrix(type, text, barcodeTypes[type].hasEc ? ecLevel : null);
}

function generateQrMatrix(text: string, ecLevel: BarcodeEcLevel): Matrix {
  const payload = text.trim();
  const qr = qrcode(0, ecLevel);

  qr.addData(payload, 'Byte');
  qr.make();

  const size = qr.getModuleCount();

  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => (qr.isDark(row, col) ? 1 : 0))
  );
}

function generateBwipMatrix(
  type: Exclude<BarcodeType, 'qrcode'>,
  text: string,
  ecLevel: BarcodeEcLevel | null
): Matrix {
  const payload = text.trim();

  const rawOptions = {
    bcid: type,
    text: payload,
    scale: 1,
    includetext: false,
    padding: 0,
    ...(ecLevel ? { eclevel: bwipEcLevels[ecLevel] } : {})
  } as unknown as Parameters<typeof bwipjs.raw>[0];

  const [raw] = bwipjs.raw(rawOptions) as Array<BwipPixelMatrix | BwipBarMatrix>;

  if (!raw) {
    return [[0]];
  }

  if ('pixs' in raw) {
    return fromBwipPixels(raw);
  }

  return fromBwipBars(raw);
}

function fromBwipPixels(raw: BwipPixelMatrix): Matrix {
  const width = Math.max(1, Math.round(raw.pixx));
  const height = Math.max(1, Math.round(raw.pixy));
  const matrix: Matrix = [];

  for (let row = 0; row < height; row += 1) {
    const rowCells: number[] = [];

    for (let col = 0; col < width; col += 1) {
      const index = row * width + col;
      rowCells.push(raw.pixs[index] ? 1 : 0);
    }

    matrix.push(rowCells);
  }

  return matrix;
}

function fromBwipBars(raw: BwipBarMatrix): Matrix {
  const widths = raw.sbs.map((value) => Math.max(0, Math.round(value)));
  const totalWidth = Math.max(
    1,
    widths.reduce((sum, value) => sum + value, 0)
  );
  const barHeights = raw.bhs.length ? raw.bhs.map((value) => Math.max(1, Math.round(value))) : [1];
  const barOffsets = raw.bbs.length ? raw.bbs.map((value) => Math.max(0, Math.round(value))) : [0];

  const totalHeight = Math.max(
    1,
    ...barHeights.map((height, index) => height + (barOffsets[index] ?? 0))
  );

  const matrix = createEmptyMatrix(totalHeight, totalWidth);

  let cursor = 0;
  let barIndex = 0;

  for (let index = 0; index < widths.length; index += 1) {
    const span = widths[index] ?? 0;
    const isBar = index % 2 === 0;

    if (isBar && span > 0) {
      const height = barHeights[barIndex] ?? totalHeight;
      const offset = barOffsets[barIndex] ?? 0;
      const yStart = Math.max(0, totalHeight - height - offset);
      const yEnd = Math.min(totalHeight, yStart + height);

      for (let row = yStart; row < yEnd; row += 1) {
        for (let col = cursor; col < cursor + span; col += 1) {
          matrix[row][col] = 1;
        }
      }

      barIndex += 1;
    } else if (isBar) {
      barIndex += 1;
    }

    cursor += span;
  }

  return matrix;
}

function createEmptyMatrix(height: number, width: number): Matrix {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
}
