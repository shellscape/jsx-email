/**
 * Note: Parts of this file are derived from [Hyperons](https://github.com/i-like-robots/hyperons).
 * @license MIT
 */

import type { FC, ReactNode } from 'react';

import { jsxToString } from '../src/helpers/jsx-to-string';

const Template: FC<{
  firstName: string;
}> = ({ firstName }) => (
  <>
    <h1>Welcome, {firstName}!</h1>
    <img src="img/test.png" alt="test" />
    <p>Thanks for trying our product. We're thrilled to have you on board!</p>
  </>
);

describe('jsx-to-string', () => {
  it('converts a React component into HTML', () => {
    const actualOutput = jsxToString(<Template firstName="Jim" />);
    expect(actualOutput).toMatchSnapshot();
  });

  describe('elements', () => {
    it('renders simple elements', () => {
      const result = jsxToString(<div></div>);
      expect(result).toBe('<div></div>');
    });

    it('renders void elements', () => {
      const result = jsxToString(<br />);
      expect(result).toBe('<br/>');
    });

    it('does not render fragments', () => {
      const result = jsxToString(<></>);
      expect(result).toBe('');
    });

    it('invokes functional components', () => {
      const Component = (props: { text: string }) => <span className="c">{props.text}</span>;
      const result = jsxToString(<Component text="Hello World" />);
      expect(result).toBe('<span class="c">Hello World</span>');
    });

    it('does not render null', () => {
      expect(jsxToString(null)).toBe('');
    });

    it('does not render booleans', () => {
      expect(jsxToString(true)).toBe('');
      expect(jsxToString(false)).toBe('');
    });
  });

  describe('properties', () => {
    it('renders HTML attribute names and values', () => {
      const result = jsxToString(<form action="/submit" method="post" />);
      expect(result).toBe('<form action="/submit" method="post"></form>');
    });

    it('does not render null or undefined HTML attributes', () => {
      const result = jsxToString(
        // @ts-expect-error because null is not a valid value for the `itemType` attribute
        // eslint-disable-next-line no-undefined
        <div itemType={null} itemProp={undefined} className={undefined} />
      );
      expect(result).toBe('<div></div>');
    });

    it('ignores framework specific properties', () => {
      const result = jsxToString(<div key="item" children={[]} />);
      expect(result).toBe('<div></div>');
    });

    it('aliases conflicting JS keywords', () => {
      const result = jsxToString(<label className="label" htmlFor="id" />);
      expect(result).toBe('<label class="label" for="id"></label>');
    });

    it('lowercases camelCase attribute names', () => {
      const result = jsxToString(<input tabIndex={-1} defaultValue="Hello" />);
      expect(result).toBe('<input tabindex="-1" value="Hello"/>');
    });

    it('escapes HTML attribute values', () => {
      const result = jsxToString(<img alt='"Mac & Cheese"' />);
      expect(result).toBe('<img alt="&quot;Mac &amp; Cheese&quot;"/>');
    });

    describe('boolean attributes', () => {
      it('does not append boolean attributes with a falsy value', () => {
        // @ts-expect-error because `open` is a boolean attribute.
        const result = jsxToString(<details hidden={false} open={0} />);
        expect(result).toBe('<details></details>');
      });

      it('appends boolean attributes with a truthy value', () => {
        // @ts-expect-error because `open` is a boolean attribute.
        const result = jsxToString(<details hidden={true} open={1} />);
        expect(result).toBe('<details hidden open></details>');
      });

      it('renders boolean values for enumerable attributes', () => {
        const result = jsxToString(<div contentEditable={true} spellCheck={false} />);
        expect(result).toBe('<div contenteditable="true" spellcheck="false"></div>');
      });
    });

    describe('styles', () => {
      it('stringifies style attributes', () => {
        const result = jsxToString(<div style={{ margin: '1em 0', padding: '0.5em 1em' }} />);
        expect(result).toBe('<div style="margin:1em 0;padding:0.5em 1em"></div>');
      });

      it('hyphenates style properties', () => {
        const result = jsxToString(<div style={{ marginBottom: '1em', paddingTop: '0.5em' }} />);
        expect(result).toBe('<div style="margin-bottom:1em;padding-top:0.5em"></div>');
      });

      it('hyphenates vendor prefixed properties', () => {
        const result = jsxToString(<div style={{ MozHyphens: 'auto', msHyphens: 'auto' }} />);
        expect(result).toBe('<div style="-moz-hyphens:auto;-ms-hyphens:auto"></div>');
      });

      it('applies pixel units to number values', () => {
        const result = jsxToString(<div style={{ margin: 20, padding: 10 }} />);
        expect(result).toBe('<div style="margin:20px;padding:10px"></div>');
      });

      it('does not apply pixel values to unitless properties', () => {
        const result = jsxToString(<div style={{ flexShrink: 1, order: 2 }} />);
        expect(result).toBe('<div style="flex-shrink:1;order:2"></div>');
      });

      it('ignores null or undefined properties', () => {
        // @ts-expect-error because `width`, height` and `border` are not valid style properties.
        // eslint-disable-next-line no-undefined
        const result = jsxToString(<div style={{ border: 0, height: undefined, width: null }} />);
        expect(result).toBe('<div style="border:0"></div>');
      });
    });
  });

  describe('children', () => {
    it('ignores empty children', () => {
      const result = jsxToString(
        <div>
          {/* eslint-disable-next-line no-undefined */}
          {undefined}
          {null}
        </div>
      );
      expect(result).toBe('<div></div>');
    });

    it('renders text children', () => {
      const result = jsxToString(<div>Hello World</div>);
      expect(result).toBe('<div>Hello World</div>');
    });

    it('renders numeric children', () => {
      const result = jsxToString(<div>{123}</div>);
      expect(result).toBe('<div>123</div>');
    });

    it('renders numeric children even if they are zero', () => {
      const result = jsxToString(<div>{0}</div>);
      expect(result).toBe('<div>0</div>');
    });

    it('does not render boolean children', () => {
      const a = jsxToString(<div>{true}</div>);
      expect(a).toBe('<div></div>');

      const b = jsxToString(<div>{false}</div>);
      expect(b).toBe('<div></div>');
    });

    it('escapes text children', () => {
      const result = jsxToString(<div>{'"Mac & Cheese"'}</div>);
      expect(result).toBe('<div>&quot;Mac &amp; Cheese&quot;</div>');
    });

    it('renders multiple children', () => {
      const result = jsxToString(
        <div>
          <i>Hello</i> <i>World</i>!
        </div>
      );
      expect(result).toBe('<div><i>Hello</i> <i>World</i>!</div>');
    });

    it('renders nested children', () => {
      const result = jsxToString(
        <div>{[<i key={1}>Hello</i>, [' ', [<i key={2}>World</i>, '!']]]}</div>
      );
      expect(result).toBe('<div><i>Hello</i> <i>World</i>!</div>');
    });

    it('passes children to compositional components', () => {
      const Parent = (props: { children: ReactNode }) => <ul>{props.children}</ul>;
      const result = jsxToString(
        <Parent>
          <li>one</li>
          <li>two</li>
        </Parent>
      );

      expect(result).toBe('<ul><li>one</li><li>two</li></ul>');
    });

    it('it allows children provided as props', () => {
      const Parent = (props: { children: ReactNode }) => <ul>{props.children}</ul>;
      const result = jsxToString(
        <Parent children={[<li key={1}>one</li>, <li key={2}>two</li>]} />
      );

      expect(result).toBe('<ul><li>one</li><li>two</li></ul>');
    });

    it('favours children provided as arguments over props', () => {
      const Parent = (props: { children: ReactNode }) => <ul>{props.children}</ul>;
      const result = jsxToString(
        // @ts-expect-error because `children` is specified twice
        <Parent children={[<li>one</li>, <li>two</li>]}>
          <li>three</li>
        </Parent>
      );

      expect(result).toBe('<ul><li>three</li></ul>');
    });

    it('supports setting inner HTML', () => {
      const result = jsxToString(<div dangerouslySetInnerHTML={{ __html: '<i>Hello</i>' }} />);
      expect(result).toBe('<div><i>Hello</i></div>');
    });

    it('renders the children of fragments', () => {
      const result = jsxToString(
        <dl>
          <>
            <dt>Title</dt>
            <dd>Description</dd>
          </>
        </dl>
      );
      expect(result).toBe('<dl><dt>Title</dt><dd>Description</dd></dl>');
    });
  });
});
