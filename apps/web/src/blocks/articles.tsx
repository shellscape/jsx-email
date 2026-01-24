import { Column, Container, Img, Link, Row, Section, Tailwind, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Article Card
const ArticleCard = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="rounded-lg border border-gray-200 overflow-hidden">
        <Img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=300&fit=crop"
          alt="Article thumbnail"
          width={600}
          height={300}
          className="w-full"
        />
        <Section className="p-4">
          <Text className="m-0 text-xs text-gray-500">TECHNOLOGY • 5 MIN READ</Text>
          <Link href="https://example.com/article" className="no-underline">
            <Text className="m-0 mt-2 text-lg font-semibold text-gray-900">
              10 Tips for Building Better Email Templates
            </Text>
          </Link>
          <Text className="m-0 mt-2 text-sm text-gray-600">
            Learn the best practices for creating responsive, accessible email templates that look
            great in every inbox.
          </Text>
          <Link
            href="https://example.com/article"
            className="mt-3 inline-block text-sm font-medium text-blue-600 no-underline"
          >
            Read more →
          </Link>
        </Section>
      </Section>
    </Container>
  </Tailwind>
);

const articleCardCode = `import { Container, Img, Link, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
  <Section className="rounded-lg border border-gray-200 overflow-hidden">
    <Img
      src="https://example.com/thumbnail.jpg"
      alt="Article thumbnail"
      width={600}
      height={300}
      className="w-full"
    />
    <Section className="p-4">
      <Text className="m-0 text-xs text-gray-500">TECHNOLOGY • 5 MIN READ</Text>
      <Link href="https://example.com/article" className="no-underline">
        <Text className="m-0 mt-2 text-lg font-semibold text-gray-900">
          10 Tips for Building Better Email Templates
        </Text>
      </Link>
      <Text className="m-0 mt-2 text-sm text-gray-600">
        Learn the best practices for creating responsive, accessible email templates.
      </Text>
      <Link
        href="https://example.com/article"
        className="mt-3 inline-block text-sm font-medium text-blue-600 no-underline"
      >
        Read more →
      </Link>
    </Section>
  </Section>
  </Container>
</Tailwind>`;

// Block 2: Article List
const ArticleList = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section>
        {/* Article 1 */}
        <Row className="border-b border-gray-200 py-4">
          <Column className="w-24 align-middle">
            <Img
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=100&h=100&fit=crop"
              alt="Article 1"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Column>
          <Column className="pl-4 align-middle">
            <Text className="m-0 text-xs text-gray-500">Mar 15, 2024</Text>
            <Link href="https://example.com/article-1" className="no-underline">
              <Text className="m-0 text-sm font-semibold text-gray-900">
                Getting Started with Email Design
              </Text>
            </Link>
            <Text className="m-0 text-xs text-gray-600">
              A beginner's guide to creating beautiful email templates.
            </Text>
          </Column>
        </Row>
        {/* Article 2 */}
        <Row className="border-b border-gray-200 py-4">
          <Column className="w-24 align-middle">
            <Img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop"
              alt="Article 2"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Column>
          <Column className="pl-4 align-middle">
            <Text className="m-0 text-xs text-gray-500">Mar 12, 2024</Text>
            <Link href="https://example.com/article-2" className="no-underline">
              <Text className="m-0 text-sm font-semibold text-gray-900">
                Advanced Layout Techniques
              </Text>
            </Link>
            <Text className="m-0 text-xs text-gray-600">
              Master complex email layouts with these pro tips.
            </Text>
          </Column>
        </Row>
        {/* Article 3 */}
        <Row className="py-4">
          <Column className="w-24 align-middle">
            <Img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop"
              alt="Article 3"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Column>
          <Column className="pl-4 align-middle">
            <Text className="m-0 text-xs text-gray-500">Mar 10, 2024</Text>
            <Link href="https://example.com/article-3" className="no-underline">
              <Text className="m-0 text-sm font-semibold text-gray-900">
                Responsive Email Best Practices
              </Text>
            </Link>
            <Text className="m-0 text-xs text-gray-600">
              Ensure your emails look great on any device.
            </Text>
          </Column>
        </Row>
      </Section>
    </Container>
  </Tailwind>
);

const articleListCode = `import { Column, Container, Img, Link, Row, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
  <Section>
    <Row className="border-b border-gray-200 py-4">
      <Column className="w-24 align-middle">
        <Img
          src="https://example.com/thumb.jpg"
          alt="Article"
          width={80}
          height={80}
          className="rounded-lg"
        />
      </Column>
      <Column className="pl-4 align-middle">
        <Text className="m-0 text-xs text-gray-500">Mar 15, 2024</Text>
        <Link href="https://example.com/article" className="no-underline">
          <Text className="m-0 text-sm font-semibold text-gray-900">
            Getting Started with Email Design
          </Text>
        </Link>
        <Text className="m-0 mt-1 text-xs text-gray-600">
          A beginner's guide to creating beautiful email templates.
        </Text>
      </Column>
    </Row>
    {/* Repeat for more articles */}
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
      name: 'Article Card',
      code: articleCardCode,
      codeHtml: await highlightCode(articleCardCode),
      renderedHtml: await renderBlock(ArticleCard)
    },
    {
      name: 'Article List',
      code: articleListCode,
      codeHtml: await highlightCode(articleListCode),
      renderedHtml: await renderBlock(ArticleList)
    }
  ];
}
