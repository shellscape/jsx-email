import type { BarcodeEcLevel, BarcodeType, BarcodeTypeConfig } from '../types.js';

export const barcodeTypes: Record<BarcodeType, BarcodeTypeConfig> = {
  azteccode: { family: '2d', hasEc: true, ecRate: 0.23 },
  code128: { family: '1d', hasEc: false, ecRate: 0.02 },
  code39: { family: '1d', hasEc: false, ecRate: 0.02 },
  datamatrix: { family: '2d', hasEc: false, ecRate: 0.15 },
  ean13: { family: '1d', hasEc: false, ecRate: 0.02 },
  qrcode: { family: '2d', hasEc: true, ecRate: 0.15 },
  upca: { family: '1d', hasEc: false, ecRate: 0.02 }
};

export const bwipEcLevels: Record<BarcodeEcLevel, number> = {
  H: 50,
  L: 10,
  M: 23,
  Q: 36
};

export const qrEcRates: Record<BarcodeEcLevel, number> = {
  H: 0.3,
  L: 0.07,
  M: 0.15,
  Q: 0.25
};

export const bwipEcRates: Record<BarcodeEcLevel, number> = {
  H: 0.5,
  L: 0.1,
  M: 0.23,
  Q: 0.36
};

export const qrAlignmentPositions: Record<number, number[]> = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
  11: [6, 30, 54],
  12: [6, 32, 58],
  13: [6, 34, 62],
  14: [6, 26, 46, 66],
  15: [6, 26, 48, 70],
  16: [6, 26, 50, 74],
  17: [6, 30, 54, 78],
  18: [6, 30, 56, 82],
  19: [6, 30, 58, 86],
  20: [6, 34, 62, 90],
  21: [6, 28, 50, 72, 94],
  22: [6, 26, 50, 74, 98],
  23: [6, 30, 54, 78, 102],
  24: [6, 28, 54, 80, 106],
  25: [6, 32, 58, 84, 110],
  26: [6, 30, 58, 86, 114],
  27: [6, 34, 62, 90, 118],
  28: [6, 26, 50, 74, 98, 122],
  29: [6, 30, 54, 78, 102, 126],
  30: [6, 26, 52, 78, 104, 130],
  31: [6, 30, 56, 82, 108, 134],
  32: [6, 34, 60, 86, 112, 138],
  33: [6, 30, 58, 86, 114, 142],
  34: [6, 34, 62, 90, 118, 146],
  35: [6, 30, 54, 78, 102, 126, 150],
  36: [6, 24, 50, 76, 102, 128, 154],
  37: [6, 28, 54, 80, 106, 132, 158],
  38: [6, 32, 58, 84, 110, 136, 162],
  39: [6, 26, 54, 82, 110, 138, 166],
  40: [6, 30, 58, 86, 114, 142, 170]
};
