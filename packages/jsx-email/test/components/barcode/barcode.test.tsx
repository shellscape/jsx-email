import {
  AztecCode,
  Barcode,
  type BarcodeProps,
  Code39Barcode,
  Code128Barcode,
  DataMatrix,
  type DataMatrixProps,
  EanBarcode,
  QrCode,
  UpcBarcode
} from '../../../src/index.js';
import { log } from '../../../src/log.js';
import { jsxToString } from '../../../src/renderer/jsx-to-string.js';

const matrixText = 'https://jsx.email/components/barcode';
const code128Text = 'CODE128-2026-HELLO';
const code39Text = 'CODE39-2026';
const ean13Text = '590123412345';
const upcaText = '01234567890';

const barcodeCases: Array<[string, BarcodeProps]> = [
  ['qrcode', { text: matrixText }],
  ['azteccode', { type: 'azteccode', text: 'AZTEC-2026', ecLevel: 'Q' }],
  ['datamatrix', { type: 'datamatrix', text: 'DATAMATRIX-2026' }],
  ['code128', { type: 'code128', text: code128Text }],
  ['code39', { type: 'code39', text: code39Text }],
  ['ean13', { type: 'ean13', text: ean13Text }],
  ['upca', { type: 'upca', text: upcaText }]
];

const snapshotCases = [
  ['barcode:qrcode:default', <Barcode text={matrixText} />],
  ['barcode:azteccode:ec-level', <Barcode type="azteccode" text="AZTEC-2026" ecLevel="H" />],
  ['barcode:datamatrix', <Barcode type="datamatrix" text="DATAMATRIX-2026" />],
  ['barcode:code128', <Barcode type="code128" text={code128Text} />],
  ['barcode:code39', <Barcode type="code39" text={code39Text} />],
  ['barcode:ean13', <Barcode type="ean13" text={ean13Text} />],
  ['barcode:upca', <Barcode type="upca" text={upcaText} />],
  ['barcode:quiet-zone-off', <Barcode text={matrixText} quietZone={false} />],
  [
    'barcode:color-and-size',
    <Barcode text={matrixText} cellSize={5} fgColor="#14213d" bgColor="#f3f7ff" />
  ],
  ['barcode:lossy-enabled', <Barcode text={matrixText} lossyEnabled lossyBudget={0.5} />],
  ['wrapper:QrCode', <QrCode text={matrixText} ecLevel="Q" />],
  ['wrapper:AztecCode', <AztecCode text="AZTEC-2026" ecLevel="Q" />],
  ['wrapper:DataMatrix', <DataMatrix text="DATAMATRIX-2026" />],
  ['wrapper:Code128Barcode', <Code128Barcode text={code128Text} />],
  ['wrapper:Code39Barcode', <Code39Barcode text={code39Text} />],
  ['wrapper:EanBarcode', <EanBarcode text={ean13Text} />],
  ['wrapper:UpcBarcode', <UpcBarcode text={upcaText} />]
] as const;

const parityCases = [
  {
    name: 'QrCode',
    alias: <QrCode text={matrixText} ecLevel="Q" cellSize={3} />,
    barcode: <Barcode type="qrcode" text={matrixText} ecLevel="Q" cellSize={3} />
  },
  {
    name: 'AztecCode',
    alias: <AztecCode text="AZTEC-2026" ecLevel="H" cellSize={3} />,
    barcode: <Barcode type="azteccode" text="AZTEC-2026" ecLevel="H" cellSize={3} />
  },
  {
    name: 'DataMatrix',
    alias: <DataMatrix text="DATAMATRIX-2026" cellSize={2} />,
    barcode: <Barcode type="datamatrix" text="DATAMATRIX-2026" cellSize={2} />
  },
  {
    name: 'Code128Barcode',
    alias: <Code128Barcode text={code128Text} />,
    barcode: <Barcode type="code128" text={code128Text} />
  },
  {
    name: 'Code39Barcode',
    alias: <Code39Barcode text={code39Text} />,
    barcode: <Barcode type="code39" text={code39Text} />
  },
  {
    name: 'EanBarcode',
    alias: <EanBarcode text={ean13Text} />,
    barcode: <Barcode type="ean13" text={ean13Text} />
  },
  {
    name: 'UpcBarcode',
    alias: <UpcBarcode text={upcaText} />,
    barcode: <Barcode type="upca" text={upcaText} />
  }
] as const;

const acceptsBarcodeProps = (props: BarcodeProps): BarcodeProps => props;
const acceptsDataMatrixProps = (props: DataMatrixProps): DataMatrixProps => props;

function getDarkRowCount(html: string): number {
  const rows = html.match(/<tr>.*?<\/tr>/gs) ?? [];

  return rows.filter((row) => row.includes('background-color:#000000')).length;
}

describe('<Barcode> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it.each(barcodeCases)('renders valid %s output', async (_type, props) => {
    const html = await jsxToString(<Barcode {...props} />);

    expect(html).toContain('<table');
    expect(html).toContain('role="presentation"');
  });

  it.each(parityCases)('maintains %s wrapper parity with Barcode', async ({ alias, barcode }) => {
    const aliasHtml = await jsxToString(alias);
    const barcodeHtml = await jsxToString(barcode);

    expect(aliasHtml).toBe(barcodeHtml);
  });

  it.each(snapshotCases)('matches deterministic snapshot: %s', async (_name, component) => {
    expect(await jsxToString(component)).toMatchSnapshot();
  });

  it('adds a stable barcode marker attribute to the root table', async () => {
    const html = await jsxToString(<Barcode text={matrixText} />);

    expect(html).toContain('data-jsx-email-barcode="root"');
  });

  it('protects barcode geometry in strict mode and warns on conflicting overrides', async () => {
    const warnSpy = vi.spyOn(log, 'warn').mockImplementation(() => {});

    const html = await jsxToString(
      <Barcode
        text={matrixText}
        style={{ width: '999px' }}
        tableProps={{ style: { width: '888px' }, width: '777' }}
        cellProps={{ style: { height: '13px', width: '11px' }, width: '333' }}
      />
    );

    expect(html).toContain('width:auto');
    expect(html).not.toContain('width:999px');
    expect(html).not.toContain('width:888px');
    expect(html).not.toContain('width:11px');
    expect(html).not.toContain('height:13px');
    expect(warnSpy).toHaveBeenCalled();
  });

  it('supports css isolation escape hatches for root and cell props', async () => {
    const html = await jsxToString(
      <Barcode
        text={matrixText}
        cssIsolation="none"
        tableProps={{ style: { width: '320px' } }}
        cellProps={{ style: { height: '7px', width: '7px' } }}
      />
    );

    expect(html).toContain('width:320px');
    expect(html).toContain('width:7px');
    expect(html).toContain('height:7px');
  });

  it('renders deterministic output for repeated input', async () => {
    const first = await jsxToString(
      <Barcode text={matrixText} type="qrcode" ecLevel="M" lossyEnabled lossyBudget={0.25} />
    );
    const second = await jsxToString(
      <Barcode text={matrixText} type="qrcode" ecLevel="M" lossyEnabled lossyBudget={0.25} />
    );

    expect(first).toBe(second);
  });

  it('preserves whitespace-sensitive payloads across encoders', async () => {
    const qrWithOuterWhitespace = await jsxToString(
      <Barcode type="qrcode" text="  QR-WHITESPACE  " />
    );
    const qrTrimmedPayload = await jsxToString(<Barcode type="qrcode" text="QR-WHITESPACE" />);

    expect(qrWithOuterWhitespace).not.toBe(qrTrimmedPayload);

    const code128WithOuterWhitespace = await jsxToString(
      <Barcode type="code128" text="  CODE128-WHITESPACE  " quietZone={false} />
    );
    const code128TrimmedPayload = await jsxToString(
      <Barcode type="code128" text="CODE128-WHITESPACE" quietZone={false} />
    );

    expect(code128WithOuterWhitespace).not.toBe(code128TrimmedPayload);
  });

  it('renders multi-row geometry for 1D barcodes', async () => {
    const html = await jsxToString(<Barcode type="code128" text={code128Text} quietZone={false} />);

    expect(getDarkRowCount(html)).toBeGreaterThan(10);
  });

  it('does not apply lossy mutation to 1D symbologies', async () => {
    const baseline = await jsxToString(
      <Barcode type="code39" text={code39Text} quietZone={false} />
    );
    const lossy = await jsxToString(
      <Barcode type="code39" text={code39Text} quietZone={false} lossyEnabled lossyBudget={1} />
    );

    expect(lossy).toBe(baseline);
  });

  it('enforces discriminated-union type guards', () => {
    expect(acceptsBarcodeProps({ text: matrixText }).type).toBeUndefined();
    expect(acceptsBarcodeProps({ type: 'azteccode', text: 'AZTEC-2026', ecLevel: 'H' }).type).toBe(
      'azteccode'
    );

    // @ts-expect-error `ecLevel` is not valid for code128.
    acceptsBarcodeProps({ type: 'code128', text: code128Text, ecLevel: 'H' });

    // @ts-expect-error DataMatrix wrapper props do not allow `ecLevel`.
    acceptsDataMatrixProps({ text: 'DATAMATRIX-2026', ecLevel: 'Q' });

    expect(true).toBe(true);
  });
});
