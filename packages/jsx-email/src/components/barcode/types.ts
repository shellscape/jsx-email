import type { BaseProps } from '../../types.js';

/** Barcode symbology supported by the generic `Barcode` component. */
export type BarcodeType =
  | 'qrcode'
  | 'azteccode'
  | 'datamatrix'
  | 'code128'
  | 'code39'
  | 'ean13'
  | 'upca';

/** Error-correction level for `qrcode` and `azteccode` symbols. */
export type BarcodeEcLevel = 'L' | 'M' | 'Q' | 'H';

/** Controls how aggressively barcode table geometry is protected from inherited email styles. */
export type BarcodeCssIsolation = 'strict' | 'balanced' | 'none';

/** Props applied to the root barcode table. */
export type BarcodeTableProps = Omit<BaseProps<'table'>, 'children'>;

/** Props applied to each generated barcode cell. */
export type BarcodeCellProps = Omit<BaseProps<'td'>, 'children'>;

type BarcodeBaseProps = BarcodeTableProps & {
  /** Background color for light modules. Defaults to `#ffffff`. */
  bgColor?: string;
  /** Size in pixels for each rendered module. Defaults to `4`. */
  cellSize?: number;
  /** Props applied to each generated barcode cell. */
  cellProps?: BarcodeCellProps;
  /** Controls barcode table isolation from inherited email styles. Defaults to `strict`. */
  cssIsolation?: BarcodeCssIsolation;
  /** Foreground color for dark modules. Defaults to `#000000`. */
  fgColor?: string;
  /** Compression budget between `0` and `1`, clamped at runtime. Defaults to `0.2`. */
  lossyBudget?: number;
  /** Enables optional lossy compression for supported 2D barcodes. */
  lossyEnabled?: boolean;
  /** Adds a 4-module border when `true`. Defaults to `true`. */
  quietZone?: boolean;
  /** Props applied to the root barcode table. */
  tableProps?: BarcodeTableProps;
  /** Barcode payload. */
  text: string;
};

export type QrCodeTypeProps = BarcodeBaseProps & {
  /** Error-correction level for QR Code. Defaults to `M`. */
  ecLevel?: BarcodeEcLevel;
  /** Barcode symbology. Defaults to `qrcode`. */
  type?: 'qrcode';
};

export type AztecCodeTypeProps = BarcodeBaseProps & {
  /** Error-correction level for Aztec Code. Defaults to `M`. */
  ecLevel?: BarcodeEcLevel;
  /** Barcode symbology. */
  type: 'azteccode';
};

export type DataMatrixTypeProps = BarcodeBaseProps & {
  /** Error-correction level is not configurable for Data Matrix. */
  ecLevel?: never;
  /** Barcode symbology. */
  type: 'datamatrix';
};

export type Code128TypeProps = BarcodeBaseProps & {
  /** Error-correction level is not valid for Code 128. */
  ecLevel?: never;
  /** Barcode symbology. */
  type: 'code128';
};

export type Code39TypeProps = BarcodeBaseProps & {
  /** Error-correction level is not valid for Code 39. */
  ecLevel?: never;
  /** Barcode symbology. */
  type: 'code39';
};

export type Ean13TypeProps = BarcodeBaseProps & {
  /** Error-correction level is not valid for EAN-13. */
  ecLevel?: never;
  /** Barcode symbology. */
  type: 'ean13';
};

export type UpcaTypeProps = BarcodeBaseProps & {
  /** Error-correction level is not valid for UPC-A. */
  ecLevel?: never;
  /** Barcode symbology. */
  type: 'upca';
};

export type BarcodeProps =
  | QrCodeTypeProps
  | AztecCodeTypeProps
  | DataMatrixTypeProps
  | Code128TypeProps
  | Code39TypeProps
  | Ean13TypeProps
  | UpcaTypeProps;

/** Props for the QR Code wrapper. */
export type QrCodeProps = Omit<QrCodeTypeProps, 'type'>;

/** Props for the Aztec Code wrapper. */
export type AztecCodeProps = Omit<AztecCodeTypeProps, 'type'>;

/** Props for the Data Matrix wrapper. */
export type DataMatrixProps = Omit<DataMatrixTypeProps, 'type'>;

/** Props for the Code 128 barcode wrapper. */
export type Code128BarcodeProps = Omit<Code128TypeProps, 'type'>;

/** Props for the Code 39 barcode wrapper. */
export type Code39BarcodeProps = Omit<Code39TypeProps, 'type'>;

/** Props for the EAN-13 barcode wrapper. */
export type EanBarcodeProps = Omit<Ean13TypeProps, 'type'>;

/** Props for the UPC-A barcode wrapper. */
export type UpcBarcodeProps = Omit<UpcaTypeProps, 'type'>;

export type Matrix = number[][];

export type PackedCell = {
  dark: boolean;
  span: number;
};

export type LinearBarcodeCell = {
  dark: boolean;
  height: number;
  offset: number;
  span: number;
};

export type LinearBarcodeData = {
  cells: LinearBarcodeCell[];
  height: number;
};

export type BarcodeFamily = '1d' | '2d';

export type BarcodeTypeConfig = {
  ecRate: number;
  family: BarcodeFamily;
  hasEc: boolean;
};

export type LossyOptions = {
  budget: number;
  ecRate: number;
  protectAlignmentPatterns: boolean;
  protectPositionPatterns: boolean;
  protectTimingPatterns: boolean;
};

export type BwipPixelMatrix = {
  pixs: number[];
  pixx: number;
  pixy: number;
};

export type BwipBarMatrix = {
  bbs: number[];
  bhs: number[];
  sbs: number[];
};
