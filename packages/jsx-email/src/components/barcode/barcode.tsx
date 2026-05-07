import type { CSSProperties } from 'react';

import * as config from '../../config.js';
import { debug } from '../../debug.js';
import { log } from '../../log.js';
import type { JsxEmailComponent } from '../../types.js';

import {
  applyLossy,
  applyQuietZone,
  generateLinearBarcode,
  generateMatrix,
  normalizeCellSize,
  packRow,
  resolveEcLevel
} from './helpers/index.js';
import { barcodeTypes } from './helpers/barcode-config.js';
import type {
  AztecCodeProps,
  BarcodeCellProps,
  BarcodeCssIsolation,
  BarcodeProps,
  BarcodeTableProps,
  Code39BarcodeProps,
  Code128BarcodeProps,
  DataMatrixProps,
  EanBarcodeProps,
  LinearBarcodeData,
  QrCodeProps,
  UpcBarcodeProps
} from './types.js';

export type {
  AztecCodeProps,
  AztecCodeTypeProps,
  BarcodeCellProps,
  BarcodeCssIsolation,
  BarcodeEcLevel,
  BarcodeProps,
  BarcodeTableProps,
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
const barcodeMarkerAttribute = { 'data-jsx-email-barcode': 'root' } as const;
const strictGeometryAttributeKeys = ['height', 'width'] as const;
const strictTableGeometryStyleKeys: Array<keyof CSSProperties> = [
  'height',
  'maxWidth',
  'minWidth',
  'width'
];
const strictCellGeometryStyleKeys: Array<keyof CSSProperties> = [
  'height',
  'maxWidth',
  'minWidth',
  'width'
];

function getIsolationTableStyle(cssIsolation: BarcodeCssIsolation): CSSProperties {
  if (cssIsolation === 'none') {
    return {};
  }

  if (cssIsolation === 'balanced') {
    return {
      borderCollapse: 'collapse',
      borderSpacing: 0
    };
  }

  return {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    maxWidth: 'none !important',
    tableLayout: 'fixed !important' as unknown as CSSProperties['tableLayout'],
    width: 'auto !important'
  };
}

function getStrictCellStyle(width: number): CSSProperties {
  return {
    maxWidth: `${width}px`,
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
}

function sanitizeStrictGeometryProps<TProps extends { style?: CSSProperties }>(
  props: TProps | undefined,
  propSourceName: string,
  styleKeys: Array<keyof CSSProperties>
): TProps | undefined {
  if (!props) {
    return props;
  }

  const nextProps = { ...props } as TProps & Record<string, unknown>;
  const conflictingKeys: string[] = [];

  for (const key of strictGeometryAttributeKeys) {
    if (nextProps[key] != null) {
      conflictingKeys.push(key);
      delete nextProps[key];
    }
  }

  if (nextProps.style) {
    const nextStyle = { ...nextProps.style };

    for (const key of styleKeys) {
      if (nextStyle[key] != null) {
        conflictingKeys.push(`style.${key}`);
        delete nextStyle[key];
      }
    }

    nextProps.style = nextStyle;
  }

  if (conflictingKeys.length > 0) {
    log.warn(
      `[Barcode] Ignoring geometry overrides on \`${propSourceName}\` in \`cssIsolation="strict"\`: ${conflictingKeys.join(', ')}`
    );
  }

  return nextProps;
}

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
    cssIsolation = 'strict',
    cellProps,
    tableProps,
    disableDefaultStyle,
    style,
    ...rootTableProps
  } = props;

  const resolvedEcLevel = resolveEcLevel(type, ecLevel);
  const configDisableDefaultStyle = config.current().render.disableDefaultStyle;
  const normalizedCellSize = normalizeCellSize(cellSize);
  const defaultStyleDisabled = configDisableDefaultStyle || disableDefaultStyle;
  const resolvedCssIsolation = defaultStyleDisabled ? 'none' : cssIsolation;

  const mergedTableProps: BarcodeTableProps = {
    ...rootTableProps,
    ...tableProps
  };

  const sanitizedTableProps =
    resolvedCssIsolation === 'strict'
      ? sanitizeStrictGeometryProps(mergedTableProps, 'tableProps', strictTableGeometryStyleKeys)
      : mergedTableProps;
  const sanitizedRootStyle =
    resolvedCssIsolation === 'strict'
      ? sanitizeStrictGeometryProps({ style }, 'style', strictTableGeometryStyleKeys)?.style
      : style;
  const sanitizedCellProps =
    resolvedCssIsolation === 'strict'
      ? sanitizeStrictGeometryProps(cellProps, 'cellProps', strictCellGeometryStyleKeys)
      : cellProps;

  const tableStyle = {
    ...getIsolationTableStyle(resolvedCssIsolation),
    ...sanitizedRootStyle,
    ...sanitizedTableProps?.style
  };

  if (barcodeTypes[type].family === '1d') {
    const barcode = generateLinearBarcode(type, text);
    const quietZoneUnits = quietZone ? 4 : 0;
    const totalHeight = (barcode.height + quietZoneUnits * 2) * normalizedCellSize;

    return (
      <table
        {...sanitizedTableProps}
        {...debugProps}
        {...barcodeMarkerAttribute}
        role="presentation"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        style={tableStyle}
      >
        <tbody>
          <tr>
            {quietZoneUnits > 0 ? (
              <td
                {...sanitizedCellProps}
                style={{
                  backgroundColor: bgColor,
                  fontSize: 0,
                  height: `${totalHeight}px`,
                  lineHeight: 0,
                  margin: 0,
                  minWidth: `${quietZoneUnits * normalizedCellSize}px`,
                  padding: 0,
                  width: `${quietZoneUnits * normalizedCellSize}px`,
                  ...(resolvedCssIsolation === 'strict'
                    ? getStrictCellStyle(quietZoneUnits * normalizedCellSize)
                    : {}),
                  ...sanitizedCellProps?.style
                }}
              />
            ) : null}
            {renderLinearCells({
              barcode,
              bgColor,
              cellProps: sanitizedCellProps,
              cssIsolation: resolvedCssIsolation,
              fgColor,
              quietZoneUnits,
              size: normalizedCellSize,
              totalHeight
            })}
            {quietZoneUnits > 0 ? (
              <td
                {...sanitizedCellProps}
                style={{
                  backgroundColor: bgColor,
                  fontSize: 0,
                  height: `${totalHeight}px`,
                  lineHeight: 0,
                  margin: 0,
                  minWidth: `${quietZoneUnits * normalizedCellSize}px`,
                  padding: 0,
                  width: `${quietZoneUnits * normalizedCellSize}px`,
                  ...(resolvedCssIsolation === 'strict'
                    ? getStrictCellStyle(quietZoneUnits * normalizedCellSize)
                    : {}),
                  ...sanitizedCellProps?.style
                }}
              />
            ) : null}
          </tr>
        </tbody>
      </table>
    );
  }

  const matrix = generateMatrix(type, text, resolvedEcLevel);
  const paddedMatrix = applyQuietZone(matrix, quietZone ? 4 : 0);
  const lossyMatrix = applyLossy(paddedMatrix, {
    ecLevel: resolvedEcLevel,
    lossyBudget,
    lossyEnabled,
    type
  });
  const packedRows = lossyMatrix.map(packRow);

  return (
    <table
      {...sanitizedTableProps}
      {...debugProps}
      {...barcodeMarkerAttribute}
      role="presentation"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      style={tableStyle}
    >
      <tbody>
        {packedRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                {...sanitizedCellProps}
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
                  width: `${cell.span * normalizedCellSize}px`,
                  ...(resolvedCssIsolation === 'strict'
                    ? getStrictCellStyle(cell.span * normalizedCellSize)
                    : {}),
                  ...sanitizedCellProps?.style
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function renderLinearCells({
  barcode,
  bgColor,
  cellProps,
  cssIsolation,
  fgColor,
  quietZoneUnits,
  size,
  totalHeight
}: {
  barcode: LinearBarcodeData;
  bgColor: string;
  cellProps: BarcodeCellProps | undefined;
  cssIsolation: BarcodeCssIsolation;
  fgColor: string;
  quietZoneUnits: number;
  size: number;
  totalHeight: number;
}) {
  return barcode.cells.map((cell, index) => {
    const width = cell.span * size;

    if (!cell.dark) {
      return (
        <td
          {...cellProps}
          key={index}
          style={{
            backgroundColor: bgColor,
            fontSize: 0,
            height: `${totalHeight}px`,
            lineHeight: 0,
            margin: 0,
            minWidth: `${width}px`,
            padding: 0,
            width: `${width}px`,
            ...(cssIsolation === 'strict' ? getStrictCellStyle(width) : {}),
            ...cellProps?.style
          }}
        />
      );
    }

    const barHeight = cell.height * size;
    const topPad = (quietZoneUnits + barcode.height - cell.height - cell.offset) * size;
    const bottomPad = (quietZoneUnits + cell.offset) * size;

    return (
      <td
        {...cellProps}
        key={index}
        style={{
          backgroundColor: fgColor,
          borderBottom: bottomPad > 0 ? `${bottomPad}px solid ${bgColor}` : undefined,
          borderTop: topPad > 0 ? `${topPad}px solid ${bgColor}` : undefined,
          fontSize: 0,
          height: `${barHeight}px`,
          lineHeight: 0,
          margin: 0,
          minWidth: `${width}px`,
          padding: 0,
          width: `${width}px`,
          ...(cssIsolation === 'strict' ? getStrictCellStyle(width) : {}),
          ...cellProps?.style
        }}
      />
    );
  });
}

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
