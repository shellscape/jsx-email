import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text } from 'jsx-email';

interface GithubAccessTokenEmailProps {
  username?: string;
}

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
};

const container = {
  width: '480px',
  margin: '0 auto',
  padding: '20px 0 48px'
};

const title = {
  fontSize: '24px',
  lineHeight: 1.25
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const
};

const links = {
  textAlign: 'center' as const
};

const link = {
  color: '#0366d6',
  fontSize: '12px'
};

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px'
};

const baseUrl = 'https://jsx.email/assets/demo/';

export const previewProps = {
  username: 'Batman'
} as GithubAccessTokenEmailProps;

export const templateName = 'Github Access Token';

export const Template = ({ username }: GithubAccessTokenEmailProps) => (
  <Html>
    <Head />
    <Preview>A fine-grained personal access token has been added to your account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={`${baseUrl}github.png`} width="32" height="32" alt="Github" />

        <Text style={title}>
          <strong>@{username}</strong>, a personal access was created on your account.
        </Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{username}</strong>!
          </Text>
          <Text style={text}>
            A fine-grained personal access token (<Link>resend</Link>) was recently added to your
            account.
          </Text>

          <Button
            width={152}
            height={42}
            fontSize={14}
            backgroundColor="#28a745"
            textColor="#fff"
            borderRadius={8}
          >
            View your token
          </Button>
        </Section>
        <Text style={links}>
          <Link style={link}>Your security audit log</Link> ・{' '}
          <Link style={link}>Contact support</Link>
        </Text>

        <Text style={footer}>
          GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
        </Text>
      </Container>
    </Body>
  </Html>
);
