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
  mikeAvatarSrc: string;
  zorgAvatarSrc: string;
}

export const previewProps = {
  adaAvatarSrc:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2lazm4zXHY4Oz9m_T7CBnhVPTukZCj9M18Q&s',
  alanAvatarSrc:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE_-in-mMPGc3wHs2xuO4IdjZDG2UQje7enw&s',
  graceAvatarSrc: 'https://i.pinimg.com/564x/63/8f/cc/638fcc11e752676aa3967274e643fa74.jpg',
  margaretAvatarSrc:
    'https://i.pinimg.com/474x/31/93/64/319364c3d37856f1fbfcf8bc4f88bc33.jpg',
  mikeAvatarSrc: 'https://variety.com/wp-content/uploads/2017/02/mike-myers-1.jpg?w=700',
  zorgAvatarSrc:
    'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/zorg-the-fifth-element-joseph-oland.jpg'
} as AvatarComponentsEmailProps;

export const templateName = 'Avatar Components';

export const Template = ({
  adaAvatarSrc,
  alanAvatarSrc,
  graceAvatarSrc,
  margaretAvatarSrc,
  mikeAvatarSrc,
  zorgAvatarSrc
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
          <Text style={exampleTitle}>Avatar (default / no picture examples)</Text>
          <Text style={exampleDescription}>
            Explicit no-picture avatars with initials and fallback text.
          </Text>
          <AvatarGroup spacing={10}>
            <Avatar name="No Photo" width={44} height={44} />
            <Avatar name="Guest User" fallback="GU" width={44} height={44} />
            <Avatar fallback="?" width={44} height={44} />
          </AvatarGroup>
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
          <AvatarGroup overlap spacing={10} max={4}>
            <Avatar src={adaAvatarSrc} name="Ada Lovelace" width={44} height={44} />
            <Avatar src={graceAvatarSrc} name="Grace Hopper" width={44} height={44} />
            <Avatar src={alanAvatarSrc} name="Alan Turing" width={44} height={44} />
            <Avatar src={margaretAvatarSrc} name="Margaret Hamilton" width={44} height={44} />
            <Avatar src={zorgAvatarSrc} name="Jean-Baptiste Zorg" width={44} height={44} />
            <Avatar src={mikeAvatarSrc} name="Dr. Evil" width={44} height={44} />
          </AvatarGroup>
        </Section>

        <Section style={exampleSection}>
          <Text style={exampleTitle}>AvatarGroup (rtl)</Text>
          <Text style={exampleDescription}>Right-to-left ordering for localized layouts.</Text>
          <AvatarGroup direction="rtl" spacing={10}>
            <Avatar src={zorgAvatarSrc} name="Jean-Baptiste Zorg" width={44} height={44} />
            <Avatar src={margaretAvatarSrc} name="Margaret Hamilton" width={44} height={44} />
            <Avatar src={mikeAvatarSrc} name="Dr. Evil" width={44} height={44} />
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
