import {
  Avatar,
  AvatarGroup,
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from 'jsx-email';

interface AvatarComponentsEmailProps {
  adaAvatarSrc: string;
  alanAvatarSrc: string;
  graceAvatarSrc: string;
  margaretAvatarSrc: string;
}

const baseUrl = 'https://jsx.email/assets/demo/';

export const previewProps = {
  adaAvatarSrc: `${baseUrl}airbnb-review-user.jpg`,
  alanAvatarSrc: `${baseUrl}cat.jpeg`,
  graceAvatarSrc: `${baseUrl}vercel-user.png`,
  margaretAvatarSrc: `${baseUrl}batman-twilight.jpg`
} as AvatarComponentsEmailProps;

export const templateName = 'Avatar Components';

export const Template = ({
  adaAvatarSrc,
  alanAvatarSrc,
  graceAvatarSrc,
  margaretAvatarSrc
}: AvatarComponentsEmailProps = previewProps) => (
  <Html>
    <Head />
    <Preview>Examples of avatar and avatar group components</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Avatar Component Examples</Heading>
        <Text style={introText}>
          This page demonstrates <code>{'<Avatar />'}</code> and <code>{'<AvatarGroup />'}</code>{' '}
          usage patterns.
        </Text>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Avatar</Text>
          <Text style={exampleDescription}>Image avatar with explicit dimensions.</Text>
          <Avatar src={adaAvatarSrc} name="Ada Lovelace" width={56} height={56} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Avatar (fallback initials)</Text>
          <Text style={exampleDescription}>
            Fallback initials from the `name` prop when no image is set.
          </Text>
          <Avatar name="Grace Hopper" width={56} height={56} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>Avatar (custom fallback)</Text>
          <Text style={exampleDescription}>Custom fallback token when no image is available.</Text>
          <Avatar name="TBD User" fallback="TU" width={56} height={56} />
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>AvatarGroup</Text>
          <Text style={exampleDescription}>Standard spacing for a small team roster.</Text>
          <AvatarGroup>
            <Avatar src={adaAvatarSrc} name="Ada Lovelace" width={44} height={44} />
            <Avatar src={graceAvatarSrc} name="Grace Hopper" width={44} height={44} />
            <Avatar src={alanAvatarSrc} name="Alan Turing" width={44} height={44} />
          </AvatarGroup>
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>AvatarGroup (overlap + max)</Text>
          <Text style={exampleDescription}>
            Overlap mode with overflow token for larger groups.
          </Text>
          <AvatarGroup overlap spacing={10} max={3}>
            <Avatar src={adaAvatarSrc} name="Ada Lovelace" width={44} height={44} />
            <Avatar src={graceAvatarSrc} name="Grace Hopper" width={44} height={44} />
            <Avatar src={alanAvatarSrc} name="Alan Turing" width={44} height={44} />
            <Avatar src={margaretAvatarSrc} name="Margaret Hamilton" width={44} height={44} />
          </AvatarGroup>
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>AvatarGroup (rtl)</Text>
          <Text style={exampleDescription}>Right-to-left ordering for localized layouts.</Text>
          <AvatarGroup direction="rtl" spacing={10}>
            <Avatar src={adaAvatarSrc} name="Ada Lovelace" width={44} height={44} />
            <Avatar src={graceAvatarSrc} name="Grace Hopper" width={44} height={44} />
            <Avatar src={alanAvatarSrc} name="Alan Turing" width={44} height={44} />
          </AvatarGroup>
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
