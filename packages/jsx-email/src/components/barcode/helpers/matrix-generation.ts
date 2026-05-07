import bwipjs from 'bwip-js';
import qrcode from 'qrcode-generator';

import { barcodeTypes, bwipEcLevels } from './barcode-config.js';
import type {
  BarcodeEcLevel,
  BarcodeType,
  BwipBarMatrix,
  BwipPixelMatrix,
  LinearBarcodeData,
  Matrix
} from '../types.js';

const BWIP_ROW_UNITS_PER_INCH = 72;

export function generateMatrix(type: BarcodeType, text: string, ecLevel: BarcodeEcLevel): Matrix {
  if (type === 'qrcode') {
    return generateQrMatrix(text, ecLevel);
  }

  return generateBwipMatrix(type, text, barcodeTypes[type].hasEc ? ecLevel : null);
}

export function generateLinearBarcode(type: BarcodeType, text: string): LinearBarcodeData {
  const raw = getBwipRaw(type as Exclude<BarcodeType, 'qrcode'>, text, null);

  if (!raw || 'pixs' in raw) {
    return { cells: [{ dark: false, height: 1, offset: 0, span: 1 }], height: 1 };
  }

  return fromBwipLinearBars(raw);
}

function generateQrMatrix(text: string, ecLevel: BarcodeEcLevel): Matrix {
  const qr = qrcode(0, ecLevel);

  qr.addData(text, 'Byte');
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
  const raw = getBwipRaw(type, text, ecLevel);

  if (!raw) {
    return [[0]];
  }

  if ('pixs' in raw) {
    return fromBwipPixels(raw);
  }

  return fromBwipBars(raw);
}

function getBwipRaw(
  type: Exclude<BarcodeType, 'qrcode'>,
  text: string,
  ecLevel: BarcodeEcLevel | null
): BwipPixelMatrix | BwipBarMatrix | undefined {
  const rawOptions = {
    bcid: type,
    text,
    scale: 1,
    includetext: false,
    padding: 0,
    ...(ecLevel ? { eclevel: bwipEcLevels[ecLevel] } : {})
  } as unknown as Parameters<typeof bwipjs.raw>[0];

  const [raw] = bwipjs.raw(rawOptions) as Array<BwipPixelMatrix | BwipBarMatrix>;

  return raw;
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
  const linear = fromBwipLinearBars(raw);
  const matrix = createEmptyMatrix(linear.height, getLinearBarcodeWidth(linear));

  let cursor = 0;

  for (const cell of linear.cells) {
    if (cell.dark && cell.span > 0) {
      const yStart = Math.max(0, linear.height - cell.height - cell.offset);
      const yEnd = Math.min(linear.height, yStart + cell.height);

      for (let row = yStart; row < yEnd; row += 1) {
        for (let col = cursor; col < cursor + cell.span; col += 1) {
          matrix[row][col] = 1;
        }
      }
    }

    cursor += cell.span;
  }

  return matrix;
}

function fromBwipLinearBars(raw: BwipBarMatrix): LinearBarcodeData {
  const widths = raw.sbs.map((value) => Math.max(0, Math.round(value)));
  const barHeights = raw.bhs.length
    ? raw.bhs.map((value) => Math.max(1, Math.round(value * BWIP_ROW_UNITS_PER_INCH)))
    : [1];
  const barOffsets = raw.bbs.length
    ? raw.bbs.map((value) => Math.max(0, Math.round(value * BWIP_ROW_UNITS_PER_INCH)))
    : [0];

  const totalHeight = Math.max(
    1,
    ...barHeights.map((height, index) => height + (barOffsets[index] ?? 0))
  );
  const cells = [];
  let barIndex = 0;

  for (let index = 0; index < widths.length; index += 1) {
    const span = widths[index] ?? 0;
    const isBar = index % 2 === 0;

    if (isBar && span > 0) {
      cells.push({
        dark: true,
        height: barHeights[barIndex] ?? totalHeight,
        offset: barOffsets[barIndex] ?? 0,
        span
      });
      barIndex += 1;
    } else if (isBar) {
      barIndex += 1;
    } else if (span > 0) {
      cells.push({ dark: false, height: totalHeight, offset: 0, span });
    }
  }

  return { cells, height: totalHeight };
}

function getLinearBarcodeWidth(barcode: LinearBarcodeData): number {
  return Math.max(
    1,
    barcode.cells.reduce((sum, cell) => sum + cell.span, 0)
  );
}

function createEmptyMatrix(height: number, width: number): Matrix {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
}
