import { Body, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from 'jsx-email';

import * as React from 'react';

export const TemplateName = 'local-assets';

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginBottom: '64px',
  padding: '20px 0 48px'
};

const box = {
  padding: '0 48px'
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0'
};

const paragraph = {
  color: '#777',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const
};

const anchor: React.CSSProperties = {
  color: '#3869d4',
  textDecoration: 'underline'
};

const baseUrl = import.meta.env.DEV
  ? import.meta.resolve('./static/')
  : 'https://assets.example.com/';

export const Template = () => {
  const catUrl = `${baseUrl}cat.jpeg`;
  return (
    <Html>
      <Head />
      <Preview>This is our email preview text for </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img src={catUrl} alt="Cat" width="200" height="200" />
            <Hr style={hr} />
            <Text style={paragraph}>
              URL:
              <br />
              <Link style={anchor} href={catUrl}>
                {catUrl}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
