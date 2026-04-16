import { qrAlignmentPositions } from './barcode-config.js';
import type { LossyOptions, Matrix } from '../types.js';

export function buildProtectedCells(matrix: Matrix, options: LossyOptions): Set<string> {
  const protectedCells = new Set<string>();
  const width = matrix[0].length;
  const height = matrix.length;

  if (
    !options.protectPositionPatterns &&
    !options.protectTimingPatterns &&
    !options.protectAlignmentPatterns
  ) {
    return protectedCells;
  }

  if (options.protectPositionPatterns) {
    protectRect(protectedCells, 0, 0, 9, 9, width, height);
    protectRect(protectedCells, width - 8, 0, 8, 9, width, height);
    protectRect(protectedCells, 0, height - 8, 9, 8, width, height);
  }

  if (options.protectTimingPatterns) {
    for (let index = 0; index < width; index += 1) {
      protectedCells.add(toCellKey(6, index));
    }

    for (let index = 0; index < height; index += 1) {
      protectedCells.add(toCellKey(index, 6));
    }
  }

  if (options.protectAlignmentPatterns) {
    const version = Math.max(1, Math.round((width - 17) / 4));
    const positions = qrAlignmentPositions[version] ?? [];

    for (const row of positions) {
      for (const col of positions) {
        const inTopLeftFinder = row <= 7 && col <= 7;
        const inTopRightFinder = row <= 7 && col >= width - 8;
        const inBottomLeftFinder = row >= height - 8 && col <= 7;

        if (!inTopLeftFinder && !inTopRightFinder && !inBottomLeftFinder) {
          protectRect(protectedCells, col - 2, row - 2, 5, 5, width, height);
        }
      }
    }
  }

  return protectedCells;
}

function protectRect(
  protectedCells: Set<string>,
  x: number,
  y: number,
  width: number,
  height: number,
  matrixWidth: number,
  matrixHeight: number
): void {
  const maxX = x + width;
  const maxY = y + height;

  for (let row = y; row < maxY; row += 1) {
    for (let col = x; col < maxX; col += 1) {
      const inBounds = row >= 0 && col >= 0 && row < matrixHeight && col < matrixWidth;

      if (inBounds) {
        protectedCells.add(toCellKey(row, col));
      }
    }
  }
}

function toCellKey(row: number, col: number): string {
  return `${row}:${col}`;
}
