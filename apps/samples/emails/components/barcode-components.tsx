import {
  AztecCode,
  Barcode,
  Body,
  Code39Barcode,
  Code128Barcode,
  Container,
  DataMatrix,
  EanBarcode,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  QrCode,
  Section,
  Text,
  UpcBarcode
} from 'jsx-email';

interface BarcodeComponentsEmailProps {
  aztecCodeText: string;
  code128Text: string;
  code39Text: string;
  dataMatrixText: string;
  eanBarcodeText: string;
  qrCodeText: string;
  upcBarcodeText: string;
}

export const previewProps = {
  aztecCodeText: 'AZTEC',
  code128Text: 'CODE128',
  code39Text: 'CODE39',
  dataMatrixText: 'DM',
  eanBarcodeText: '590123412345',
  qrCodeText: 'jsx-email',
  upcBarcodeText: '01234567890'
} as BarcodeComponentsEmailProps;

export const templateName = 'Barcode Components';

export const Template = ({
  aztecCodeText,
  code128Text,
  code39Text,
  dataMatrixText,
  eanBarcodeText,
  qrCodeText,
  upcBarcodeText
}: BarcodeComponentsEmailProps = previewProps) => (
  <Html>
    <Head />
    <Preview>Examples of all barcode components</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Barcode Component Examples</Heading>
        <Text style={introText}>
          This page demonstrates the generic <code>{'<Barcode />'}</code> component and all approved
          named barcode wrappers.
        </Text>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Barcode</Text>
          <Text style={exampleDescription}>
            Generic component with <code>type="qrcode"</code>.
          </Text>
          <Barcode
            text={qrCodeText}
            type="qrcode"
            ecLevel="M"
            cellSize={3}
            fgColor="#0f172a"
            bgColor="#ffffff"
            quietZone={false}
            lossyEnabled
            lossyBudget={0.5}
          />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>QrCode</Text>
          <Text style={exampleDescription}>Named wrapper for QR Code.</Text>
          <QrCode text={qrCodeText} ecLevel="Q" cellSize={3} quietZone={false} lossyEnabled />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>AztecCode</Text>
          <Text style={exampleDescription}>Named wrapper for Aztec Code.</Text>
          <AztecCode text={aztecCodeText} ecLevel="M" cellSize={3} quietZone={false} lossyEnabled />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>DataMatrix</Text>
          <Text style={exampleDescription}>Named wrapper for Data Matrix.</Text>
          <DataMatrix text={dataMatrixText} cellSize={3} quietZone={false} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Code128Barcode</Text>
          <Text style={exampleDescription}>Named wrapper for Code 128.</Text>
          <Code128Barcode text={code128Text} cellSize={2} quietZone={false} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Code39Barcode</Text>
          <Text style={exampleDescription}>Named wrapper for Code 39.</Text>
          <Code39Barcode text={code39Text} cellSize={2} quietZone={false} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>EanBarcode</Text>
          <Text style={exampleDescription}>Named wrapper for EAN-13.</Text>
          <EanBarcode text={eanBarcodeText} cellSize={2} quietZone={false} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>UpcBarcode</Text>
          <Text style={exampleDescription}>Named wrapper for UPC-A.</Text>
          <UpcBarcode text={upcBarcodeText} cellSize={2} quietZone={false} />
        </Section>

        <Hr style={divider} />
        <Text style={footerText}>
          Tip: open this template in the preview app sidebar under <strong>Components</strong>.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f8fafc',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  margin: '0 auto'
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  margin: '40px auto',
  maxWidth: '640px',
  padding: '28px'
};

const heading = {
  color: '#0f172a',
  fontSize: '26px',
  lineHeight: '34px',
  margin: 0,
  marginBottom: '12px'
};

const introText = {
  color: '#334155',
  fontSize: '14px',
  lineHeight: '22px',
  margin: 0,
  marginBottom: '24px'
};

const exampleSection = {
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  marginBottom: '16px',
  padding: '14px'
};

const exampleTitle = {
  color: '#0f172a',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '22px',
  margin: 0,
  marginBottom: '6px'
};

const exampleDescription = {
  color: '#475569',
  fontSize: '13px',
  lineHeight: '20px',
  margin: 0,
  marginBottom: '12px'
};

const divider = {
  borderColor: '#e2e8f0',
  margin: '18px 0'
};

const footerText = {
  color: '#64748b',
  fontSize: '12px',
  lineHeight: '18px',
  margin: 0
};
