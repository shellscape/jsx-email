import { Column, Container, Img, Row, Section, Tailwind, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Testimonial Simple Centered
const TestimonialSimpleCentered = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="rounded-2xl bg-white px-10 py-12 text-center">
        <Text className="m-0 text-base leading-relaxed text-gray-700">
          Design is not just what it looks like and feels like. Design is how it works. The people
          who are crazy enough to think they can change the world are the ones who do. Innovation
          distinguishes between a leader and a follower.
        </Text>
        <Section className="mt-6">
          <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
            <tr>
              <td style={{ verticalAlign: 'middle', paddingRight: '12px' }}>
                <Img
                  src="https://i.pravatar.cc/96?u=ericawang"
                  alt="Erica Wang"
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
              </td>
              <td style={{ verticalAlign: 'middle' }}>
                <Text
                  className="m-0 text-sm font-semibold text-gray-900"
                  style={{ display: 'inline' }}
                >
                  Erica Wang
                </Text>
                <Text className="m-0 text-sm text-gray-500" style={{ display: 'inline' }}>
                  {' '}
                  &bull; Co-founder of Circle
                </Text>
              </td>
            </tr>
          </table>
        </Section>
      </Section>
    </Container>
  </Tailwind>
);

const testimonialSimpleCenteredCode = `import { Container, Img, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="rounded-2xl bg-white px-10 py-12 text-center">
      <Text className="m-0 text-base leading-relaxed text-gray-700">
        Design is not just what it looks like and feels like. Design is how it works. The people who are crazy enough to think they can change the world are the ones who do. Innovation distinguishes between a leader and a follower.
      </Text>
      <Section className="mt-6">
        <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
          <tr>
            <td style={{ verticalAlign: 'middle', paddingRight: '12px' }}>
              <Img
                src="https://example.com/avatar.jpg"
                alt="Erica Wang"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <Text className="m-0 text-sm font-semibold text-gray-900" style={{ display: 'inline' }}>
                Erica Wang
              </Text>
              <Text className="m-0 text-sm text-gray-500" style={{ display: 'inline' }}>
                {' '}&bull; Co-founder of Circle
              </Text>
            </td>
          </tr>
        </table>
      </Section>
    </Section>
  </Container>
</Tailwind>`;

// Block 2: Testimonial with Large Avatar
const TestimonialWithLargeAvatar = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="rounded-2xl bg-white px-10 py-12">
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
          <tr>
            <td style={{ width: '180px', verticalAlign: 'top', paddingRight: '24px' }}>
              <Img
                src="https://i.pravatar.cc/300?u=ericawang"
                alt="Erica Wang"
                width={180}
                height={220}
                style={{ objectFit: 'cover', display: 'block', borderRadius: '8px' }}
              />
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <Text className="m-0 text-base leading-relaxed text-gray-700">
                Design is not just what it looks like and feels like. Design is how it works. The
                people who are crazy enough to think they can change the world are the ones who do.
                Innovation distinguishes between a leader and a follower.
              </Text>
              <Text
                className="m-0 mt-6 text-sm font-semibold text-gray-900"
                style={{ marginBottom: '0' }}
              >
                Erica Wang
              </Text>
              <Text className="m-0 text-sm text-gray-500" style={{ marginTop: '2px' }}>
                Co-founder of Circle
              </Text>
            </td>
          </tr>
        </table>
      </Section>
    </Container>
  </Tailwind>
);

const testimonialWithLargeAvatarCode = `import { Container, Img, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
    <Section className="rounded-2xl bg-white px-10 py-12">
      <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
        <tr>
          <td style={{ width: '180px', verticalAlign: 'top', paddingRight: '24px' }}>
            <Img
              src="https://example.com/large-avatar.jpg"
              alt="Erica Wang"
              width={180}
              height={220}
              style={{ objectFit: 'cover', display: 'block', borderRadius: '8px' }}
            />
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            <Text className="m-0 text-base leading-relaxed text-gray-700">
              Design is not just what it looks like and feels like. Design is how it works. The people who are crazy enough to think they can change the world are the ones who do. Innovation distinguishes between a leader and a follower.
            </Text>
            <Text className="m-0 mt-6 text-sm font-semibold text-gray-900" style={{ marginBottom: '0' }}>
              Erica Wang
            </Text>
            <Text className="m-0 text-sm text-gray-500" style={{ marginTop: '2px' }}>
              Co-founder of Circle
            </Text>
          </td>
        </tr>
      </table>
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
      name: 'Testimonial simple centered',
      code: testimonialSimpleCenteredCode,
      codeHtml: await highlightCode(testimonialSimpleCenteredCode),
      renderedHtml: await renderBlock(TestimonialSimpleCentered)
    },
    {
      name: 'Testimonial with large avatar',
      code: testimonialWithLargeAvatarCode,
      codeHtml: await highlightCode(testimonialWithLargeAvatarCode),
      renderedHtml: await renderBlock(TestimonialWithLargeAvatar)
    }
  ];
}
