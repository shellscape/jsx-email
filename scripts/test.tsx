import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from 'jsx-email';

export const TemplateName = 'Reproduction';

export const PreviewProps = {
  email: 'batman@example.com',
  name: 'Bruce Wayne'
};

export interface TemplateProps {
  email?: string;
  name?: string;
}

export const Template = ({ email, name }: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>
        This is our email preview text for {name} &lt;{email}&gt;
      </Preview>
      <Body className="m-0 bg-neutral-100 dark:bg-black">
        <Container>
          <Section>
            <Text>This is our email body text</Text>
            <Button href="https://example.com">Action Button</Button>
            <Hr />
            <Text>
              This is text content with a <Link href="mailto:{email}">link</Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
