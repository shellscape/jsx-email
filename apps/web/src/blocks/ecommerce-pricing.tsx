import { Button, Column, Container, Row, Section, Tailwind, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Product Price Card
const ProductPriceCard = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <Text className="m-0 text-xs font-semibold uppercase tracking-wide text-green-600">
          Limited Time Offer
        </Text>
        <Text className="m-0 mt-4 text-4xl font-bold text-gray-900">$79</Text>
        <Text className="m-0 text-sm text-gray-500">
          <span style={{ textDecoration: 'line-through' }}>$99</span> — Save 20%
        </Text>
        <Text className="m-0 mt-4 text-sm text-gray-600">
          Includes lifetime access and free updates
        </Text>
        <Section className="mt-6">
          <Button
            href="https://example.com/buy"
            width={200}
            height={48}
            align="center"
            backgroundColor="#16a34a"
            borderRadius={8}
            textColor="#ffffff"
            fontSize={16}
          >
            Buy Now
          </Button>
        </Section>
        <Text className="m-0 mt-4 text-xs text-gray-400">30-day money-back guarantee</Text>
      </Section>
    </Container>
  </Tailwind>
);

const productPriceCardCode = `import { Button, Container, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="rounded-lg border border-gray-200 bg-white p-6 text-center">
      <Text className="m-0 text-xs font-semibold uppercase tracking-wide text-green-600">
        Limited Time Offer
      </Text>
      <Text className="m-0 mt-4 text-4xl font-bold text-gray-900">$79</Text>
      <Text className="m-0 text-sm text-gray-500">
        <span style={{ textDecoration: 'line-through' }}>$99</span> — Save 20%
      </Text>
      <Text className="m-0 mt-4 text-sm text-gray-600">
        Includes lifetime access and free updates
      </Text>
      <Section className="mt-6">
        <Button
          href="https://example.com/buy"
          width={200}
          height={48}
          align="center"
          backgroundColor="#16a34a"
          borderRadius={8}
          textColor="#ffffff"
          fontSize={16}
        >
          Buy Now
        </Button>
      </Section>
      <Text className="m-0 mt-4 text-xs text-gray-400">30-day money-back guarantee</Text>
    </Section>
  </Container>
</Tailwind>`;

// Block 2: Pricing Comparison
const PricingComparison = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Row className="w-full">
        {/* Basic Plan */}
        <Column className="w-1/2 p-2 align-top">
          <Section className="rounded-lg border border-gray-200 bg-white p-5">
            <Text className="m-0 text-lg font-semibold text-gray-900">Starter</Text>
            <Text className="m-0 mt-1 text-sm text-gray-500">For individuals</Text>
            <Text className="m-0 mt-4">
              <span className="text-3xl font-bold text-gray-900">$9</span>
              <span className="text-sm text-gray-500">/month</span>
            </Text>
            <Section className="mt-4">
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">5 projects</Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">10GB storage</Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">Email support</Text>
                </Column>
              </Row>
            </Section>
            <Section className="mt-5">
              <Button
                href="https://example.com/starter"
                width={140}
                height={40}
                align="center"
                backgroundColor="#ffffff"
                borderRadius={6}
                textColor="#374151"
                fontSize={14}
              >
                Get Started
              </Button>
            </Section>
          </Section>
        </Column>
        {/* Pro Plan */}
        <Column className="w-1/2 p-2 align-top">
          <Section className="rounded-lg border-2 border-blue-600 bg-blue-50 p-5">
            <Row>
              <Column>
                <Text className="m-0 text-lg font-semibold text-gray-900">Pro</Text>
              </Column>
              <Column className="text-right">
                <Text className="m-0 rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                  Popular
                </Text>
              </Column>
            </Row>
            <Text className="m-0 mt-1 text-sm text-gray-500">For teams</Text>
            <Text className="m-0 mt-4">
              <span className="text-3xl font-bold text-gray-900">$29</span>
              <span className="text-sm text-gray-500">/month</span>
            </Text>
            <Section className="mt-4">
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">Unlimited projects</Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">100GB storage</Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">Priority support</Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-5 align-top">
                  <Text className="m-0 text-green-500">✓</Text>
                </Column>
                <Column className="align-top">
                  <Text className="m-0 text-sm text-gray-600">Advanced analytics</Text>
                </Column>
              </Row>
            </Section>
            <Section className="mt-5">
              <Button
                href="https://example.com/pro"
                width={140}
                height={40}
                align="center"
                backgroundColor="#2563eb"
                borderRadius={6}
                textColor="#ffffff"
                fontSize={14}
              >
                Upgrade to Pro
              </Button>
            </Section>
          </Section>
        </Column>
      </Row>
    </Container>
  </Tailwind>
);

const pricingComparisonCode = `import { Button, Column, Container, Row, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Row className="w-full">
    {/* Basic Plan */}
    <Column className="w-1/2 p-2 align-top">
      <Section className="rounded-lg border border-gray-200 bg-white p-5">
        <Text className="m-0 text-lg font-semibold text-gray-900">Starter</Text>
        <Text className="m-0 mt-1 text-sm text-gray-500">For individuals</Text>
        <Text className="m-0 mt-4">
          <span className="text-3xl font-bold text-gray-900">$9</span>
          <span className="text-sm text-gray-500">/month</span>
        </Text>
        <Section className="mt-4">
          <Row>
            <Column className="w-5 align-top">
              <Text className="m-0 text-green-500">✓</Text>
            </Column>
            <Column className="align-top">
              <Text className="m-0 text-sm text-gray-600">5 projects</Text>
            </Column>
          </Row>
          {/* More features... */}
        </Section>
        <Section className="mt-5">
          <Button
            href="https://example.com/starter"
            width={140}
            height={40}
            align="center"
            backgroundColor="#ffffff"
            borderRadius={6}
            textColor="#374151"
            fontSize={14}
          >
            Get Started
          </Button>
        </Section>
      </Section>
    </Column>
    {/* Pro Plan - highlighted */}
    <Column className="w-1/2 p-2 align-top">
      <Section className="rounded-lg border-2 border-blue-600 bg-blue-50 p-5">
        <Row>
          <Column>
            <Text className="m-0 text-lg font-semibold text-gray-900">Pro</Text>
          </Column>
          <Column className="text-right">
            <Text className="m-0 rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
              Popular
            </Text>
          </Column>
        </Row>
        {/* Plan details... */}
        <Section className="mt-5">
          <Button
            href="https://example.com/pro"
            width={140}
            height={40}
            align="center"
            backgroundColor="#2563eb"
            borderRadius={6}
            textColor="#ffffff"
            fontSize={14}
          >
            Upgrade to Pro
          </Button>
        </Section>
      </Section>
    </Column>
    </Row>
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
      name: 'Product Price Card',
      code: productPriceCardCode,
      codeHtml: await highlightCode(productPriceCardCode),
      renderedHtml: await renderBlock(ProductPriceCard)
    },
    {
      name: 'Pricing Comparison',
      code: pricingComparisonCode,
      codeHtml: await highlightCode(pricingComparisonCode),
      renderedHtml: await renderBlock(PricingComparison)
    }
  ];
}
