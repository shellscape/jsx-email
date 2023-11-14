// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Section } from '../src';

describe('<Section> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Section>Lorem ipsum</Section>);
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Section>{testMessage}</Section>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Section style={style} data-testid="section-test">
        Test
      </Section>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="section-test"');
  });

  it('renders with <td> wrapper if no <Column> is provided', async () => {
    const actualOutput = await jsxToString(
      <Section>
        <div>Lorem ipsum</div>
      </Section>
    );
    expect(actualOutput).toContain('<td>');
  });

  it('renders with <td> wrapper if <Column> is provided', async () => {
    const actualOutput = await jsxToString(
      <Section>
        <td>Lorem ipsum</td>
      </Section>
    );
    expect(actualOutput).toContain('<td>');
  });

  it('renders wrapping any child provided in a <td> tag', async () => {
    const actualOutput = await jsxToString(
      <Section>
        <div>Lorem ipsum</div>
        <p>Lorem ipsum</p>
        <img src="lorem.ipsum" alt="Lorem" />
      </Section>
    );
    const tdChildrenArr = actualOutput.match(/<td\s*.*?>.*?<\/td>/g);
    expect(tdChildrenArr).toHaveLength(1);
  });
});
