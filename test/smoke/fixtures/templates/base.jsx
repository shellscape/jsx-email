import {
  Body,
  Button,
  ColorScheme,
  Column,
  Conditional,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Preview,
  Row,
  Section,
  Text
} from 'jsx-email';

export const Template = () => (
  <Html>
    <ColorScheme />
    <Head>
      <Conditional mso={true}>
        <meta content="batman" />
      </Conditional>
    </Head>
    <Preview>Preview Content</Preview>
    <Body>
      <Container>
        <Section>
          <Button
            width={200}
            height={40}
            backgroundColor="#FFFFFF"
            textColor="#000000"
            href="https://jsx.email"
          >
            Button Content
          </Button>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              format: 'woff2',
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2'
            }}
            fontWeight={400}
            fontStyle="normal"
          />
          <Heading>Heading Content</Heading>
          <Hr />
          <Img src="https://about.google/assets-main/img/glue-google-solid-logo.svg" />
          <Link href="https://jsx.email"></Link>
          <Markdown
            markdownCustomStyles={{
              codeInline: { background: 'grey' },
              h1: { color: 'red' },
              h2: { color: 'blue' }
            }}
            markdownContainerStyles={{
              border: 'solid 1px black',
              padding: '12px'
            }}
          >{`# Hello, World!`}</Markdown>
          <Row>
            <Column>Column</Column>
          </Row>
          <Text>Text Content</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
