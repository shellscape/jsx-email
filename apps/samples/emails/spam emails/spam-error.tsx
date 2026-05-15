import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Link,
  Preview,
  Row,
  Section,
  Text
} from 'jsx-email';

const main = {
  backgroundColor: '#f2f5f9',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  margin: 0
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  margin: '40px auto',
  width: '600px'
};

const header = {
  backgroundColor: '#0f243d',
  padding: '32px'
};

const brandRow = {
  margin: '0 0 24px'
};

const mark = {
  backgroundColor: '#dbeafe',
  borderRadius: '12px',
  color: '#1d4ed8',
  display: 'inline-block',
  fontSize: '17px',
  fontWeight: 900,
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center' as const,
  width: '40px'
};

const brand = {
  color: '#bfdbfe',
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '0.12em',
  margin: '11px 0 0',
  textTransform: 'uppercase' as const
};

const badge = {
  backgroundColor: '#fff7ed',
  color: '#9a3412',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  margin: '0 0 12px',
  padding: '6px 10px',
  textTransform: 'uppercase' as const
};

const heading = {
  color: '#ffffff',
  fontSize: '30px',
  lineHeight: '36px',
  margin: '0'
};

const subhead = {
  color: '#cbd5e1',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '14px 0 0'
};

const content = {
  padding: '32px'
};

const text = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px'
};

const note = {
  color: '#64748b',
  fontSize: '13px',
  fontStyle: 'italic',
  lineHeight: '20px',
  margin: '0 0 22px'
};

const alert = {
  backgroundColor: '#fff7ed',
  border: '1px solid #fed7aa',
  margin: '24px 0',
  padding: '18px 20px'
};

const alertTitle = {
  color: '#9a3412',
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '0.04em',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const
};

const button = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 800,
  padding: '13px 20px',
  textDecoration: 'none'
};

const rewardPanel = {
  backgroundColor: '#132238',
  margin: '24px 0',
  padding: '20px'
};

const rewardLabel = {
  color: '#fca5a5',
  fontSize: '11px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  margin: '0 0 6px',
  textTransform: 'uppercase' as const
};

const rewardValue = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 800,
  lineHeight: '34px',
  margin: '0'
};

const rewardMeta = {
  color: '#d1d5db',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '8px 0 0'
};

const hidden = {
  color: '#ffffff',
  fontSize: '1px',
  lineHeight: '1px'
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '28px 0 18px'
};

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0'
};

export const templateName = 'Atlas Spam';

export const Template = () => (
  <Html>
    <Head />
    <Preview>Urgent account bulletin for the Atlas operations portal.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Row style={brandRow}>
            <Column style={{ width: '48px' }}>
              <Text style={mark}>A</Text>
            </Column>
            <Column>
              <Text style={brand}>Atlas operations</Text>
            </Column>
          </Row>
          <Text style={badge}>Immediate review</Text>
          <Heading style={heading}>Account reward expires today</Heading>
          <Text style={subhead}>
            Time-sensitive member notification for the current rewards cycle.
          </Text>
        </Section>
        <Section style={content}>
          <Text style={note}>
            This email is designed specifically to trigger a certain spam score to demonstrate the
            capability.
          </Text>
          <Text style={text}>
            Congratulations, your member profile has won a guaranteed prize from the Atlas
            operations desk. Act now to keep the account from being suspended.
          </Text>
          <Section style={rewardPanel}>
            <Text style={rewardLabel}>Available credit</Text>
            <Text style={rewardValue}>Priority reward pending</Text>
            <Text style={rewardMeta}>Release requires identity confirmation before midnight.</Text>
          </Section>
          <Section style={alert}>
            <Text style={alertTitle}>Verification required</Text>
            <Text style={{ ...text, margin: 0 }}>
              Update your account and confirm your identity before midnight. This risk free account
              review includes a free bonus credit for eligible users.
            </Text>
          </Section>
          <Button
            height={44}
            href="https://203.0.113.44/claim?redirect=https%3A%2F%2Fexample.top%2Fbonus"
            style={button}
            width={156}
          >
            Confirm reward
          </Button>
          <Text style={hidden}>wire transfer western union bitcoin lottery viagra cialis</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Reference link:{' '}
            <Link href="https://203.0.113.44/claim?redirect=https%3A%2F%2Fexample.top%2Fbonus">
              https://atlas.example.com/reward
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
