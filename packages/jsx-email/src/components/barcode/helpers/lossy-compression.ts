import { barcodeTypes, bwipEcRates, qrEcRates } from './barcode-config.js';
import { buildProtectedCells } from './protected-cells.js';
import type {
  BarcodeEcLevel,
  BarcodeType,
  BarcodeTypeConfig,
  LossyOptions,
  Matrix
} from '../types.js';

export function applyLossy(
  sourceMatrix: Matrix,
  options: {
    ecLevel: BarcodeEcLevel;
    lossyBudget: number;
    lossyEnabled: boolean;
    type: BarcodeType;
  }
): Matrix {
  const { type, ecLevel, lossyEnabled, lossyBudget } = options;

  if (!lossyEnabled) {
    return sourceMatrix;
  }

  const barcodeType = barcodeTypes[type];
  const budget = normalizeLossyBudget(lossyBudget);

  if (!budget) {
    return sourceMatrix;
  }

  const ecRate = resolveEcRate(type, ecLevel, barcodeType);
  const { changed, matrix } = applyLossyCompression(sourceMatrix, {
    budget,
    ecRate,
    protectAlignmentPatterns: type === 'qrcode',
    protectPositionPatterns: type === 'qrcode',
    protectTimingPatterns: type === 'qrcode'
  });

  if (barcodeType.family === '1d' && changed > 0) {
    return enforceColumnUniformity(matrix);
  }

  return matrix;
}

function normalizeLossyBudget(lossyBudget: number): number {
  if (!Number.isFinite(lossyBudget)) {
    return 0.2;
  }

  if (lossyBudget <= 0) {
    return 0;
  }

  if (lossyBudget >= 1) {
    return 1;
  }

  return lossyBudget;
}

function resolveEcRate(
  type: BarcodeType,
  ecLevel: BarcodeEcLevel,
  barcodeType: BarcodeTypeConfig
): number {
  if (type === 'qrcode') {
    return qrEcRates[ecLevel];
  }

  if (type === 'azteccode') {
    return bwipEcRates[ecLevel];
  }

  return barcodeType.ecRate;
}

function applyLossyCompression(
  sourceMatrix: Matrix,
  options: LossyOptions
): { changed: number; matrix: Matrix } {
  const matrix = cloneMatrix(sourceMatrix);

  if (!matrix.length || !matrix[0]?.length) {
    return { changed: 0, matrix };
  }

  const darkCells = matrix.flat().filter(Boolean).length;

  if (!darkCells) {
    return { changed: 0, matrix };
  }

  const maxChanges = Math.min(darkCells, Math.floor(darkCells * options.ecRate * options.budget));

  if (!maxChanges) {
    return { changed: 0, matrix };
  }

  const protectedCells = buildProtectedCells(matrix, options);
  const candidates: Array<{ col: number; neighbors: number; row: number }> = [];

  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {
      const isDarkCell = !!matrix[row][col];
      const key = toCellKey(row, col);

      if (isDarkCell && !protectedCells.has(key)) {
        candidates.push({
          neighbors: countDarkNeighbors(matrix, row, col),
          row,
          col
        });
      }
    }
  }

  candidates.sort((left, right) => {
    if (left.neighbors !== right.neighbors) {
      return left.neighbors - right.neighbors;
    }

    if (left.row !== right.row) {
      return left.row - right.row;
    }

    return left.col - right.col;
  });

  const changeCount = Math.min(maxChanges, candidates.length);

  for (let index = 0; index < changeCount; index += 1) {
    const candidate = candidates[index];
    matrix[candidate.row][candidate.col] = 0;
  }

  return {
    changed: changeCount,
    matrix
  };
}

function enforceColumnUniformity(matrix: Matrix): Matrix {
  if (!matrix.length || !matrix[0]?.length) {
    return matrix;
  }

  const normalized = cloneMatrix(matrix);
  const height = normalized.length;
  const width = normalized[0].length;

  for (let col = 0; col < width; col += 1) {
    let dark = 0;

    for (let row = 0; row < height; row += 1) {
      dark += normalized[row][col];
    }

    const value = dark * 2 >= height ? 1 : 0;

    for (let row = 0; row < height; row += 1) {
      normalized[row][col] = value;
    }
  }

  return normalized;
}

function countDarkNeighbors(matrix: Matrix, row: number, col: number): number {
  let neighbors = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      const isCurrentCell = !rowOffset && !colOffset;
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;
      const inBounds =
        nextRow >= 0 && nextCol >= 0 && nextRow < matrix.length && nextCol < matrix[nextRow].length;

      if (!isCurrentCell && inBounds) {
        neighbors += matrix[nextRow][nextCol] ? 1 : 0;
      }
    }
  }

  return neighbors;
}

function cloneMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => [...row]);
}

function toCellKey(row: number, col: number): string {
  return `${row}:${col}`;
}
