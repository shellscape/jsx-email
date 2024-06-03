// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Background, Button } from '../src';

describe('<Button> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(
      <Button width={200} height={40}>
        {testMessage}
      </Button>
    );
    expect(html).toContain(testMessage);
  });

  it('passes props correctly', async () => {
    const html = await jsxToString(
      <Button
        width={200}
        height={40}
        backgroundColor="#cccccc"
        borderColor="#cccccc"
        borderRadius={40}
        borderSize={2}
        fontSize={20}
        textColor="#000000"
        data-testid="button-test"
      >
        Test
      </Button>
    );
    expect(html).toContain('background-color:#cccccc');
    expect(html).toContain('border:2px solid #cccccc');
    expect(html).toContain('border-radius:40px');
    expect(html).toContain('font-size:20px');
    expect(html).toContain('color:#000000');
    expect(html).toContain('data-testid="button-test"');
  });

  it('renders correctly when nested in <Background>', async () => {
    const actualOutput = await jsxToString(
      <Background src="link-to-image">
        <Button
          width={200}
          height={40}
          backgroundColor="#cccccc"
          style={{ padding: '12px 20px' }}
          href="https://example.com"
          withBackground
        />
      </Background>
    );
    expect(actualOutput).toMatchSnapshot();
    expect(actualOutput).toContain('bgcolor="#cccccc"');
  });
});
