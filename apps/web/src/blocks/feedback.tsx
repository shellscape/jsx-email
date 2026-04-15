import { Column, Container, Link, Row, Section, Tailwind, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Star Rating
const StarRating = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="px-4 py-6 text-center">
        <Text className="m-0 mb-2 text-sm text-gray-600">How would you rate your experience?</Text>
        <Row className="mx-auto w-auto">
          <Column className="px-1">
            <Link href="https://example.com/rate?stars=1" className="text-2xl no-underline">
              ⭐
            </Link>
          </Column>
          <Column className="px-1">
            <Link href="https://example.com/rate?stars=2" className="text-2xl no-underline">
              ⭐
            </Link>
          </Column>
          <Column className="px-1">
            <Link href="https://example.com/rate?stars=3" className="text-2xl no-underline">
              ⭐
            </Link>
          </Column>
          <Column className="px-1">
            <Link href="https://example.com/rate?stars=4" className="text-2xl no-underline">
              ⭐
            </Link>
          </Column>
          <Column className="px-1">
            <Link href="https://example.com/rate?stars=5" className="text-2xl no-underline">
              ⭐
            </Link>
          </Column>
        </Row>
      </Section>
    </Container>
  </Tailwind>
);

const starRatingCode = `import { Column, Container, Link, Row, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="px-4 py-6 text-center">
      <Text className="m-0 mb-2 text-sm text-gray-600">How would you rate your experience?</Text>
      <Row className="mx-auto w-auto">
        <Column className="px-1">
          <Link href="https://example.com/rate?stars=1" className="text-2xl no-underline">
            ⭐
          </Link>
        </Column>
        <Column className="px-1">
          <Link href="https://example.com/rate?stars=2" className="text-2xl no-underline">
            ⭐
          </Link>
        </Column>
        <Column className="px-1">
          <Link href="https://example.com/rate?stars=3" className="text-2xl no-underline">
            ⭐
          </Link>
        </Column>
        <Column className="px-1">
          <Link href="https://example.com/rate?stars=4" className="text-2xl no-underline">
            ⭐
          </Link>
        </Column>
        <Column className="px-1">
          <Link href="https://example.com/rate?stars=5" className="text-2xl no-underline">
            ⭐
          </Link>
        </Column>
      </Row>
    </Section>
  </Container>
</Tailwind>`;

// Block 2: Emoji Feedback
const EmojiFeedback = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="bg-gray-50 px-4 py-6 text-center">
        <Text className="m-0 mb-4 text-sm font-medium text-gray-700">
          How was your experience today?
        </Text>
        <Row className="mx-auto w-auto">
          <Column className="px-3">
            <Link href="https://example.com/feedback?rating=bad" className="text-3xl no-underline">
              😞
            </Link>
            <Text className="m-0 mt-1 text-xs text-gray-500">Bad</Text>
          </Column>
          <Column className="px-3">
            <Link href="https://example.com/feedback?rating=okay" className="text-3xl no-underline">
              😐
            </Link>
            <Text className="m-0 mt-1 text-xs text-gray-500">Okay</Text>
          </Column>
          <Column className="px-3">
            <Link href="https://example.com/feedback?rating=good" className="text-3xl no-underline">
              😊
            </Link>
            <Text className="m-0 mt-1 text-xs text-gray-500">Good</Text>
          </Column>
          <Column className="px-3">
            <Link
              href="https://example.com/feedback?rating=great"
              className="text-3xl no-underline"
            >
              😍
            </Link>
            <Text className="m-0 mt-1 text-xs text-gray-500">Great</Text>
          </Column>
        </Row>
      </Section>
    </Container>
  </Tailwind>
);

const emojiFeedbackCode = `import { Column, Container, Link, Row, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="bg-gray-50 px-4 py-6 text-center">
      <Text className="m-0 mb-4 text-sm font-medium text-gray-700">
        How was your experience today?
      </Text>
      <Row className="mx-auto w-auto">
        <Column className="px-3">
          <Link
            href="https://example.com/feedback?rating=bad"
            className="text-3xl no-underline"
          >
            😞
          </Link>
          <Text className="m-0 mt-1 text-xs text-gray-500">Bad</Text>
        </Column>
        <Column className="px-3">
          <Link
            href="https://example.com/feedback?rating=okay"
            className="text-3xl no-underline"
          >
            😐
          </Link>
          <Text className="m-0 mt-1 text-xs text-gray-500">Okay</Text>
        </Column>
        <Column className="px-3">
          <Link
            href="https://example.com/feedback?rating=good"
            className="text-3xl no-underline"
          >
            😊
          </Link>
          <Text className="m-0 mt-1 text-xs text-gray-500">Good</Text>
        </Column>
        <Column className="px-3">
          <Link
            href="https://example.com/feedback?rating=great"
            className="text-3xl no-underline"
          >
            😍
          </Link>
          <Text className="m-0 mt-1 text-xs text-gray-500">Great</Text>
        </Column>
      </Row>
    </Section>
  </Container>
</Tailwind>`;

// Helper to render a component to HTML
async function renderBlock(Component: React.FC): Promise<string> {
  return await render(<Component />);
}

// Helper to highlight code with Shiki
async function highlightCode(code: string): Promise<string> {
  return await codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-dark'
  });
}

// Export function to get all rendered blocks
export async function getRenderedBlocks(): Promise<Block[]> {
  return [
    {
      name: 'Star Rating',
      code: starRatingCode,
      codeHtml: await highlightCode(starRatingCode),
      renderedHtml: await renderBlock(StarRating)
    },
    {
      name: 'Emoji Feedback',
      code: emojiFeedbackCode,
      codeHtml: await highlightCode(emojiFeedbackCode),
      renderedHtml: await renderBlock(EmojiFeedback)
    }
  ];
}
