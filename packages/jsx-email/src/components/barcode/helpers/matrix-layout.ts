import type { BarcodeEcLevel, BarcodeType, Matrix, PackedCell } from '../types.js';

export function resolveEcLevel(
  type: BarcodeType,
  ecLevel: BarcodeEcLevel | undefined
): BarcodeEcLevel {
  if ((type === 'qrcode' || type === 'azteccode') && ecLevel) {
    return ecLevel;
  }

  return 'M';
}

export function normalizeCellSize(cellSize: number): number {
  if (!Number.isFinite(cellSize) || cellSize <= 0) {
    return 4;
  }

  return Math.max(1, Math.round(cellSize));
}

export function applyQuietZone(matrix: Matrix, padding: number): Matrix {
  if (!padding) {
    return matrix;
  }

  const width = matrix[0]?.length ?? 0;
  const paddedWidth = width + padding * 2;
  const emptyRow = Array.from({ length: paddedWidth }, () => 0);

  return [
    ...Array.from({ length: padding }, () => [...emptyRow]),
    ...matrix.map((row) => [
      ...Array.from({ length: padding }, () => 0),
      ...row,
      ...Array.from({ length: padding }, () => 0)
    ]),
    ...Array.from({ length: padding }, () => [...emptyRow])
  ];
}

export function packRow(row: number[]): PackedCell[] {
  if (!row.length) {
    return [];
  }

  const packed: PackedCell[] = [];
  let current = row[0];
  let span = 1;

  for (let index = 1; index < row.length; index += 1) {
    if (row[index] === current) {
      span += 1;
    } else {
      packed.push({ dark: !!current, span });
      current = row[index];
      span = 1;
    }
  }

  packed.push({ dark: !!current, span });

  return packed;
}
