import { Container, Heading, Link, Section, Tailwind, Text, render } from 'jsx-email';
import React from 'react';
import { codeToHtml } from 'shiki';

export interface Block {
  name: string;
  code: string;
  codeHtml: string;
  renderedHtml: string;
}

// Block 1: Satisfaction Survey - Filled indigo buttons
const SatisfactionSurvey = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="rounded-2xl bg-white px-10 py-10">
        <Heading as="h2" className="m-0 text-xl font-bold text-gray-900">
          How satisfied were you overall with the initial conversation about your claim?
        </Heading>
        <Text className="m-0 mt-3 text-sm text-gray-500">
          Your feedback is important to us and it will be used to better serve our customers.
        </Text>
        <Section className="mt-10">
          <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
            <tr>
              <td style={{ paddingRight: '60px' }}>
                <Text className="m-0 text-xs text-gray-400">Dissatisfied</Text>
              </td>
              <td style={{ paddingLeft: '60px', textAlign: 'right' }}>
                <Text className="m-0 text-xs text-gray-400">Satisfied</Text>
              </td>
            </tr>
          </table>
          <table cellPadding="0" cellSpacing="0" style={{ margin: '8px auto 0' }}>
            <tr>
              <td style={{ padding: '0 3px' }}>
                <Link
                  href="https://example.com/rate?score=1"
                  style={{
                    display: 'inline-block',
                    width: '44px',
                    height: '44px',
                    lineHeight: '44px',
                    backgroundColor: '#6366f1',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  1
                </Link>
              </td>
              <td style={{ padding: '0 3px' }}>
                <Link
                  href="https://example.com/rate?score=2"
                  style={{
                    display: 'inline-block',
                    width: '44px',
                    height: '44px',
                    lineHeight: '44px',
                    backgroundColor: '#6366f1',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  2
                </Link>
              </td>
              <td style={{ padding: '0 3px' }}>
                <Link
                  href="https://example.com/rate?score=3"
                  style={{
                    display: 'inline-block',
                    width: '44px',
                    height: '44px',
                    lineHeight: '44px',
                    backgroundColor: '#6366f1',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  3
                </Link>
              </td>
              <td style={{ padding: '0 3px' }}>
                <Link
                  href="https://example.com/rate?score=4"
                  style={{
                    display: 'inline-block',
                    width: '44px',
                    height: '44px',
                    lineHeight: '44px',
                    backgroundColor: '#6366f1',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  4
                </Link>
              </td>
              <td style={{ padding: '0 3px' }}>
                <Link
                  href="https://example.com/rate?score=5"
                  style={{
                    display: 'inline-block',
                    width: '44px',
                    height: '44px',
                    lineHeight: '44px',
                    backgroundColor: '#6366f1',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}
                >
                  5
                </Link>
              </td>
            </tr>
          </table>
        </Section>
        <Section className="mt-10 border-t border-gray-200 pt-5">
          <Text className="m-0 text-center text-xs text-gray-400">
            Customer Experience Research Team
          </Text>
        </Section>
      </Section>
    </Container>
  </Tailwind>
);

const satisfactionSurveyCode = `import { Container, Link, Heading, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
  <Section className="rounded-2xl bg-white px-10 py-10">
    <Heading as="h2" className="m-0 text-xl font-bold text-gray-900">
      How satisfied were you overall with the initial conversation about your claim?
    </Heading>
    <Text className="m-0 mt-3 text-sm text-gray-500">
      Your feedback is important to us and it will be used to better serve our customers.
    </Text>
    <Section className="mt-10">
      <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
        <tr>
          <td style={{ paddingRight: '60px' }}>
            <Text className="m-0 text-xs text-gray-400">Dissatisfied</Text>
          </td>
          <td style={{ paddingLeft: '60px', textAlign: 'right' }}>
            <Text className="m-0 text-xs text-gray-400">Satisfied</Text>
          </td>
        </tr>
      </table>
      <table cellPadding="0" cellSpacing="0" style={{ margin: '8px auto 0' }}>
        <tr>
          <td style={{ padding: '0 3px' }}>
            <Link href="https://example.com/rate?score=1" style={{
              display: 'inline-block',
              width: '44px',
              height: '44px',
              lineHeight: '44px',
              backgroundColor: '#6366f1',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'none'
            }}>1</Link>
          </td>
          {/* Repeat for 2, 3, 4, 5 */}
        </tr>
      </table>
    </Section>
    <Section className="mt-10 border-t border-gray-200 pt-5">
      <Text className="m-0 text-center text-xs text-gray-400">
        Customer Experience Research Team
      </Text>
    </Section>
  </Section>
  </Container>
</Tailwind>`;

// Block 2: Survey Section - Outlined buttons with indigo border
const SurveySection = () => (
  <Tailwind>
    <Container className="mx-auto max-w-[600px]">
      <Section className="rounded-2xl bg-white px-10 py-10 text-center">
        <Text className="m-0 text-sm font-semibold text-indigo-500">Your opinion matters</Text>
        <Heading as="h2" className="m-0 mt-2 text-2xl font-bold text-gray-900">
          We want to hear you
        </Heading>
        <Text className="m-0 mt-3 text-sm text-gray-500">
          How would you rate your experience using our product in a scale from 1 to 5?
        </Text>
        <table cellPadding="0" cellSpacing="0" style={{ margin: '24px auto 0' }}>
          <tr>
            <td style={{ padding: '0 4px' }}>
              <Link
                href="https://example.com/rate?score=1"
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  lineHeight: '38px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #6366f1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#6366f1',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                1
              </Link>
            </td>
            <td style={{ padding: '0 4px' }}>
              <Link
                href="https://example.com/rate?score=2"
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  lineHeight: '38px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #6366f1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#6366f1',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                2
              </Link>
            </td>
            <td style={{ padding: '0 4px' }}>
              <Link
                href="https://example.com/rate?score=3"
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  lineHeight: '38px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #6366f1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#6366f1',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                3
              </Link>
            </td>
            <td style={{ padding: '0 4px' }}>
              <Link
                href="https://example.com/rate?score=4"
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  lineHeight: '38px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #6366f1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#6366f1',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                4
              </Link>
            </td>
            <td style={{ padding: '0 4px' }}>
              <Link
                href="https://example.com/rate?score=5"
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  lineHeight: '38px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #6366f1',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#6366f1',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
              >
                5
              </Link>
            </td>
          </tr>
        </table>
      </Section>
    </Container>
  </Tailwind>
);

const surveySectionCode = `import { Container, Link, Heading, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Container className="mx-auto max-w-[600px]">
  <Section className="rounded-2xl bg-white px-10 py-10 text-center">
    <Text className="m-0 text-sm font-semibold text-indigo-500">Your opinion matters</Text>
    <Heading as="h2" className="m-0 mt-2 text-2xl font-bold text-gray-900">
      We want to hear you
    </Heading>
    <Text className="m-0 mt-3 text-sm text-gray-500">
      How would you rate your experience using our product in a scale from 1 to 5?
    </Text>
    <table cellPadding="0" cellSpacing="0" style={{ margin: '24px auto 0' }}>
      <tr>
        <td style={{ padding: '0 4px' }}>
          <Link href="https://example.com/rate?score=1" style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            lineHeight: '38px',
            backgroundColor: '#ffffff',
            border: '1px solid #6366f1',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#6366f1',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none'
          }}>1</Link>
        </td>
        {/* Repeat for 2, 3, 4, 5 */}
      </tr>
    </table>
  </Section>
  </Container>
</Tailwind>`;

// Block 3: Customer Reviews - Progress bars
const CustomerReviews = () => (
  <Tailwind>
    <Section className="mx-auto max-w-[320px] rounded-2xl bg-white px-6 py-8">
      <Heading as="h2" className="m-0 text-xl font-bold text-gray-900">
        Customer Reviews
      </Heading>
      <Section className="mt-8">
        {/* 5 stars - 63% */}
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%', marginBottom: '12px' }}>
          <tr>
            <td style={{ width: '24px', verticalAlign: 'middle' }}>
              <Text className="m-0 text-sm text-gray-600">5</Text>
            </td>
            <td style={{ verticalAlign: 'middle', padding: '0 12px' }}>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '63%',
                    height: '10px',
                    backgroundColor: '#6366f1',
                    borderRadius: '999px'
                  }}
                />
              </div>
            </td>
            <td style={{ width: '40px', verticalAlign: 'middle', textAlign: 'right' }}>
              <Text className="m-0 text-sm text-gray-500">63%</Text>
            </td>
          </tr>
        </table>
        {/* 4 stars - 10% */}
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%', marginBottom: '12px' }}>
          <tr>
            <td style={{ width: '24px', verticalAlign: 'middle' }}>
              <Text className="m-0 text-sm text-gray-600">4</Text>
            </td>
            <td style={{ verticalAlign: 'middle', padding: '0 12px' }}>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '10%',
                    height: '10px',
                    backgroundColor: '#6366f1',
                    borderRadius: '999px'
                  }}
                />
              </div>
            </td>
            <td style={{ width: '40px', verticalAlign: 'middle', textAlign: 'right' }}>
              <Text className="m-0 text-sm text-gray-500">10%</Text>
            </td>
          </tr>
        </table>
        {/* 3 stars - 6% */}
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%', marginBottom: '12px' }}>
          <tr>
            <td style={{ width: '24px', verticalAlign: 'middle' }}>
              <Text className="m-0 text-sm text-gray-600">3</Text>
            </td>
            <td style={{ verticalAlign: 'middle', padding: '0 12px' }}>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '6%',
                    height: '10px',
                    backgroundColor: '#6366f1',
                    borderRadius: '999px'
                  }}
                />
              </div>
            </td>
            <td style={{ width: '40px', verticalAlign: 'middle', textAlign: 'right' }}>
              <Text className="m-0 text-sm text-gray-500">6%</Text>
            </td>
          </tr>
        </table>
        {/* 2 stars - 12% */}
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%', marginBottom: '12px' }}>
          <tr>
            <td style={{ width: '24px', verticalAlign: 'middle' }}>
              <Text className="m-0 text-sm text-gray-600">2</Text>
            </td>
            <td style={{ verticalAlign: 'middle', padding: '0 12px' }}>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '12%',
                    height: '10px',
                    backgroundColor: '#6366f1',
                    borderRadius: '999px'
                  }}
                />
              </div>
            </td>
            <td style={{ width: '40px', verticalAlign: 'middle', textAlign: 'right' }}>
              <Text className="m-0 text-sm text-gray-500">12%</Text>
            </td>
          </tr>
        </table>
        {/* 1 star - 9% */}
        <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
          <tr>
            <td style={{ width: '24px', verticalAlign: 'middle' }}>
              <Text className="m-0 text-sm text-gray-600">1</Text>
            </td>
            <td style={{ verticalAlign: 'middle', padding: '0 12px' }}>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '9%',
                    height: '10px',
                    backgroundColor: '#6366f1',
                    borderRadius: '999px'
                  }}
                />
              </div>
            </td>
            <td style={{ width: '40px', verticalAlign: 'middle', textAlign: 'right' }}>
              <Text className="m-0 text-sm text-gray-500">9%</Text>
            </td>
          </tr>
        </table>
      </Section>
      <Text className="m-0 mt-8 text-center text-xs text-gray-400">
        Based on <strong>1624</strong> Reviews
      </Text>
    </Section>
  </Tailwind>
);

const customerReviewsCode = `import { Heading, Section, Text, Tailwind } from 'jsx-email';

<Tailwind>
  <Section className="mx-auto max-w-[320px] rounded-2xl bg-white px-6 py-8">
    <Heading as="h2" className="m-0 text-xl font-bold text-gray-900">Customer Reviews</Heading>
    <Section className="mt-8">
      {/* Rating row with progress bar */}
      <table cellPadding="0" cellSpacing="0" style={{ width: '100%', marginBottom: '12px' }}>
        <tr>
          <td style={{ width: '24px', verticalAlign: 'middle' }}>
            <Text className="m-0 text-sm text-gray-600">5</Text>
          </td>
          <td style={{ verticalAlign: 'middle', padding: '0 12px' }}>
            <div style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#e5e7eb',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '63%',
                height: '10px',
                backgroundColor: '#6366f1',
                borderRadius: '999px'
              }} />
            </div>
          </td>
          <td style={{ width: '40px', verticalAlign: 'middle', textAlign: 'right' }}>
            <Text className="m-0 text-sm text-gray-500">63%</Text>
          </td>
        </tr>
      </table>
      {/* Repeat for 4, 3, 2, 1 stars */}
    </Section>
    <Text className="m-0 mt-8 text-center text-xs text-gray-400">
      Based on <strong>1624</strong> Reviews
    </Text>
  </Section>
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
      name: 'Satisfaction Survey',
      code: satisfactionSurveyCode,
      codeHtml: await highlightCode(satisfactionSurveyCode),
      renderedHtml: await renderBlock(SatisfactionSurvey)
    },
    {
      name: 'Survey Section',
      code: surveySectionCode,
      codeHtml: await highlightCode(surveySectionCode),
      renderedHtml: await renderBlock(SurveySection)
    },
    {
      name: 'Customer Reviews',
      code: customerReviewsCode,
      codeHtml: await highlightCode(customerReviewsCode),
      renderedHtml: await renderBlock(CustomerReviews)
    }
  ];
}
