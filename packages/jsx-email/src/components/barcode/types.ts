import type { BaseProps } from '../../types.js';

export type BarcodeType =
  | 'qrcode'
  | 'azteccode'
  | 'datamatrix'
  | 'code128'
  | 'code39'
  | 'ean13'
  | 'upca';

export type BarcodeEcLevel = 'L' | 'M' | 'Q' | 'H';

export type BarcodeCssIsolation = 'strict' | 'balanced' | 'none';

export type BarcodeTableProps = Omit<BaseProps<'table'>, 'children'>;
export type BarcodeCellProps = Omit<BaseProps<'td'>, 'children'>;

type BarcodeBaseProps = BarcodeTableProps & {
  bgColor?: string;
  cellSize?: number;
  cellProps?: BarcodeCellProps;
  cssIsolation?: BarcodeCssIsolation;
  fgColor?: string;
  lossyBudget?: number;
  lossyEnabled?: boolean;
  quietZone?: boolean;
  tableProps?: BarcodeTableProps;
  text: string;
};

export type QrCodeTypeProps = BarcodeBaseProps & {
  ecLevel?: BarcodeEcLevel;
  type?: 'qrcode';
};

export type AztecCodeTypeProps = BarcodeBaseProps & {
  ecLevel?: BarcodeEcLevel;
  type: 'azteccode';
};

export type DataMatrixTypeProps = BarcodeBaseProps & {
  ecLevel?: never;
  type: 'datamatrix';
};

export type Code128TypeProps = BarcodeBaseProps & {
  ecLevel?: never;
  type: 'code128';
};

export type Code39TypeProps = BarcodeBaseProps & {
  ecLevel?: never;
  type: 'code39';
};

export type Ean13TypeProps = BarcodeBaseProps & {
  ecLevel?: never;
  type: 'ean13';
};

export type UpcaTypeProps = BarcodeBaseProps & {
  ecLevel?: never;
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

export type QrCodeProps = Omit<QrCodeTypeProps, 'type'>;
export type AztecCodeProps = Omit<AztecCodeTypeProps, 'type'>;
export type DataMatrixProps = Omit<DataMatrixTypeProps, 'type'>;
export type Code128BarcodeProps = Omit<Code128TypeProps, 'type'>;
export type Code39BarcodeProps = Omit<Code39TypeProps, 'type'>;
export type EanBarcodeProps = Omit<Ean13TypeProps, 'type'>;
export type UpcBarcodeProps = Omit<UpcaTypeProps, 'type'>;

export type Matrix = number[][];

export type PackedCell = {
  dark: boolean;
  span: number;
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
