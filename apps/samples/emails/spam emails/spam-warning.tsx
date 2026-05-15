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
  border: '1px solid #d7e0ea',
  margin: '40px auto',
  width: '600px'
};

const header = {
  backgroundColor: '#0f243d',
  padding: '32px'
};

const mark = {
  backgroundColor: '#dbeafe',
  borderRadius: '12px',
  color: '#1d4ed8',
  display: 'inline-block',
  fontSize: '18px',
  fontWeight: 800,
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center' as const,
  width: '40px'
};

const eyebrow = {
  color: '#bfdbfe',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  margin: '20px 0 8px',
  textTransform: 'uppercase' as const
};

const heading = {
  color: '#ffffff',
  fontSize: '32px',
  lineHeight: '38px',
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
  color: '#344256',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 18px'
};

const note = {
  color: '#64748b',
  fontSize: '13px',
  fontStyle: 'italic',
  lineHeight: '20px',
  margin: '0 0 22px'
};

const metaGrid = {
  margin: '24px 0'
};

const metaItem = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '16px'
};

const metaLabel = {
  color: '#64748b',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  margin: '0 0 6px',
  textTransform: 'uppercase' as const
};

const metaValue = {
  color: '#0f172a',
  fontSize: '14px',
  fontWeight: 700,
  margin: '0'
};

const callout = {
  backgroundColor: '#eff6ff',
  borderLeft: '4px solid #2563eb',
  margin: '24px 0',
  padding: '18px 20px'
};

const calloutTitle = {
  color: '#1d4ed8',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const
};

const button = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 700,
  padding: '12px 20px',
  textDecoration: 'none'
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '28px 0 18px'
};

const footer = {
  color: '#64748b',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0'
};

export const templateName = 'Atlas Spam Warning';

export const Template = () => (
  <Html>
    <Head />
    <Preview>Review the deployment checklist before the window closes.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={mark}>A</Text>
          <Text style={eyebrow}>Atlas operations</Text>
          <Heading style={heading}>Workspace migration review</Heading>
          <Text style={subhead}>
            A concise rollout note for teams preparing the next release window.
          </Text>
        </Section>
        <Section style={content}>
          <Text style={note}>
            This email is designed specifically to trigger a certain spam score to demonstrate the
            capability.
          </Text>
          <Text style={text}>
            The operations team prepared a short checklist for the Atlas Station rollout. Review the
            workspace notes before the maintenance window closes so the deployment can continue.
          </Text>
          <Row style={metaGrid}>
            <Column style={{ paddingRight: '8px' }}>
              <Section style={metaItem}>
                <Text style={metaLabel}>Environment</Text>
                <Text style={metaValue}>Production preview</Text>
              </Section>
            </Column>
            <Column style={{ paddingLeft: '8px' }}>
              <Section style={metaItem}>
                <Text style={metaLabel}>Window</Text>
                <Text style={metaValue}>Friday, 5:00 PM</Text>
              </Section>
            </Column>
          </Row>
          <Section style={callout}>
            <Text style={calloutTitle}>Pilot window</Text>
            <Text style={{ ...text, margin: 0 }}>
              This is a guaranteed, risk free, limited time offer for your pilot group. Please
              review the workspace before Friday at 5:00 PM.
            </Text>
          </Section>
          <Button
            height={42}
            href="https://example.com/jsx-email-sample-review"
            style={button}
            width={146}
          >
            Open checklist
          </Button>
          <Hr style={hr} />
          <Text style={footer}>
            If the button is unavailable, copy this link into your browser:{' '}
            <Link href="https://example.com/jsx-email-sample-review">
              https://example.com/jsx-email-sample-review
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
