import { Button, Container, Heading, Section, Tailwind, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Hero Section
const HeroSection = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="bg-gray-900 px-6 py-12 text-center">
        <Heading as="h1" className="m-0 text-3xl font-bold text-white text-center">
          Welcome to Our Platform
        </Heading>
        <Text className="mx-auto mt-4 text-base text-gray-300 text-center">
          Build beautiful emails with ease. <br /> Our platform helps you create stunning email
          templates in minutes.
        </Text>
        <Button
          href="https://example.com/get-started"
          width={160}
          height={44}
          align="center"
          backgroundColor="#2563eb"
          borderRadius={8}
          textColor="#ffffff"
          fontSize={14}
        >
          Get Started
        </Button>
      </Section>
    </Container>
  </Tailwind>
);

const heroSectionCode = `import { Button, Container, Heading, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="bg-gray-900 px-6 py-12 text-center">
      <Heading as="h1" className="m-0 text-3xl font-bold text-white text-center">
        Welcome to Our Platform
      </Heading>
      <Text className="mx-auto mt-4 max-w-md text-base text-gray-300 text-center">
        Build beautiful emails with ease. Our platform helps you create stunning email templates in minutes.
      </Text>
      <Button
        href="https://example.com/get-started"
        width={160}
        height={44}
        align="center"
        backgroundColor="#2563eb"
        borderRadius={8}
        textColor="#ffffff"
        fontSize={14}
      >
        Get Started
      </Button>
    </Section>
  </Container>
</Tailwind>`;

// Block 2: Announcement Banner
const AnnouncementBanner = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="bg-blue-600 px-4 py-3 text-center">
        <Text className="m-0 text-sm font-medium text-white">
          New feature available! Check out our latest update.{' '}
          <a href="https://example.com/learn-more" className="text-white underline">
            Learn more &rarr;
          </a>
        </Text>
      </Section>
    </Container>
  </Tailwind>
);

const announcementBannerCode = `import { Container, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="bg-blue-600 px-4 py-3 text-center">
      <Text className="m-0 text-sm font-medium text-white">
        New feature available! Check out our latest update.{' '}
        <a href="https://example.com/learn-more" className="text-white underline">
          Learn more &rarr;
        </a>
      </Text>
    </Section>
  </Container>
</Tailwind>`;

// Block 3: Newsletter CTA
const NewsletterCta = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="bg-gray-100 px-6 py-8 text-center">
        <Heading as="h2" className="m-0 text-xl font-bold text-gray-900">
          Stay in the loop
        </Heading>
        <Text className="mt-2 text-sm text-gray-600">
          Subscribe to our newsletter for the latest updates and tips.
        </Text>
        <Button
          href="https://example.com/subscribe"
          width={150}
          height={40}
          align="center"
          backgroundColor="#111827"
          borderRadius={6}
          textColor="#ffffff"
          fontSize={14}
        >
          Subscribe Now
        </Button>
      </Section>
    </Container>
  </Tailwind>
);

const newsletterCtaCode = `import { Button, Container, Heading, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="bg-gray-100 px-6 py-8 text-center">
      <Heading as="h2" className="m-0 text-xl font-bold text-gray-900">
        Stay in the loop
      </Heading>
      <Text className="mt-2 text-sm text-gray-600">
        Subscribe to our newsletter for the latest updates and tips.
      </Text>
      <Button
        href="https://example.com/subscribe"
        width={150}
        height={40}
        align="center"
        backgroundColor="#111827"
        borderRadius={6}
        textColor="#ffffff"
        fontSize={14}
      >
        Subscribe Now
      </Button>
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
      name: 'Hero Section',
      code: heroSectionCode,
      codeHtml: await highlightCode(heroSectionCode),
      renderedHtml: await renderBlock(HeroSection)
    },
    {
      name: 'Announcement Banner',
      code: announcementBannerCode,
      codeHtml: await highlightCode(announcementBannerCode),
      renderedHtml: await renderBlock(AnnouncementBanner)
    },
    {
      name: 'Newsletter CTA',
      code: newsletterCtaCode,
      codeHtml: await highlightCode(newsletterCtaCode),
      renderedHtml: await renderBlock(NewsletterCta)
    }
  ];
}
