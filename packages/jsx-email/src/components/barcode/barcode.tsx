import * as config from '../../config.js';
import { debug } from '../../debug.js';
import type { JsxEmailComponent } from '../../types.js';

import {
  applyLossy,
  applyQuietZone,
  generateMatrix,
  normalizeCellSize,
  packRow,
  resolveEcLevel
} from './helpers/index.js';
import type {
  AztecCodeProps,
  BarcodeProps,
  Code39BarcodeProps,
  Code128BarcodeProps,
  DataMatrixProps,
  EanBarcodeProps,
  QrCodeProps,
  UpcBarcodeProps
} from './types.js';

export type {
  AztecCodeProps,
  AztecCodeTypeProps,
  BarcodeEcLevel,
  BarcodeProps,
  BarcodeType,
  Code128BarcodeProps,
  Code128TypeProps,
  Code39BarcodeProps,
  Code39TypeProps,
  DataMatrixProps,
  DataMatrixTypeProps,
  Ean13TypeProps,
  EanBarcodeProps,
  QrCodeProps,
  QrCodeTypeProps,
  UpcaTypeProps,
  UpcBarcodeProps
} from './types.js';

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/barcode' } : {};

export const Barcode: JsxEmailComponent<BarcodeProps> = (props) => {
  const {
    type = 'qrcode',
    text,
    ecLevel,
    fgColor = '#000000',
    bgColor = '#ffffff',
    cellSize = 4,
    quietZone = true,
    lossyEnabled = false,
    lossyBudget = 0.2,
    disableDefaultStyle,
    style,
    ...tableProps
  } = props;

  const resolvedEcLevel = resolveEcLevel(type, ecLevel);
  const configDisableDefaultStyle = config.current().render.disableDefaultStyle;

  const matrix = generateMatrix(type, text, resolvedEcLevel);
  const paddedMatrix = applyQuietZone(matrix, quietZone ? 4 : 0);
  const lossyMatrix = applyLossy(paddedMatrix, {
    ecLevel: resolvedEcLevel,
    lossyBudget,
    lossyEnabled,
    type
  });
  const packedRows = lossyMatrix.map(packRow);
  const normalizedCellSize = normalizeCellSize(cellSize);

  return (
    <table
      {...tableProps}
      {...debugProps}
      role="presentation"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      style={{
        ...(configDisableDefaultStyle || disableDefaultStyle
          ? {}
          : { borderCollapse: 'collapse', borderSpacing: 0 }),
        ...style
      }}
    >
      <tbody>
        {packedRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={`${rowIndex}-${cellIndex}`}
                colSpan={cell.span}
                style={{
                  backgroundColor: cell.dark ? fgColor : bgColor,
                  fontSize: 0,
                  height: `${normalizedCellSize}px`,
                  lineHeight: 0,
                  margin: 0,
                  minWidth: `${cell.span * normalizedCellSize}px`,
                  padding: 0,
                  width: `${cell.span * normalizedCellSize}px`
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Barcode.displayName = 'Barcode';

export const QrCode: JsxEmailComponent<QrCodeProps> = (props) => (
  <Barcode {...props} type="qrcode" />
);

QrCode.displayName = 'QrCode';

export const AztecCode: JsxEmailComponent<AztecCodeProps> = (props) => (
  <Barcode {...props} type="azteccode" />
);

AztecCode.displayName = 'AztecCode';

export const DataMatrix: JsxEmailComponent<DataMatrixProps> = (props) => (
  <Barcode {...props} type="datamatrix" />
);

DataMatrix.displayName = 'DataMatrix';

export const Code128Barcode: JsxEmailComponent<Code128BarcodeProps> = (props) => (
  <Barcode {...props} type="code128" />
);

Code128Barcode.displayName = 'Code128Barcode';

export const Code39Barcode: JsxEmailComponent<Code39BarcodeProps> = (props) => (
  <Barcode {...props} type="code39" />
);

Code39Barcode.displayName = 'Code39Barcode';

export const EanBarcode: JsxEmailComponent<EanBarcodeProps> = (props) => (
  <Barcode {...props} type="ean13" />
);

EanBarcode.displayName = 'EanBarcode';

export const UpcBarcode: JsxEmailComponent<UpcBarcodeProps> = (props) => (
  <Barcode {...props} type="upca" />
);

UpcBarcode.displayName = 'UpcBarcode';
