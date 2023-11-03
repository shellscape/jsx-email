import { render } from '@jsx-email/render';

import { getCode } from '../src';

describe('<Code> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const Code = await getCode({ language: 'js' });
    const html = render(
      <Code style={style} data-testid="code-test">
        Test
      </Code>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="code-test"');
  });

  it('renders correctly, with literal', async () => {
    const Code = await getCode({ language: 'js' });
    const actualOutput = render(
      <Code>
        {`
        import { batman } from 'superheros';
        import { joker } from 'villains';

        const henchmen = joker.help();

        batman.fight(henchmen);
        batman.arrest(joker);
        `}
      </Code>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders correctly, plain text', async () => {
    const Code = await getCode({ language: 'js' });
    const actualOutput = render(<Code>import batman from 'superheros';</Code>);
    expect(actualOutput).toMatchSnapshot();
  });
});
