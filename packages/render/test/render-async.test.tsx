import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

import { renderAsync } from '../src';

import { Preview } from './fixtures/preview';
import { Template } from './fixtures/template';

describe('renderAsync using renderToStaticMarkup', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('converts a React component into HTML', async () => {
    const actualOutput = await renderAsync(<Template firstName="Jim" />);

    expect(actualOutput).toMatchSnapshot();
  });

  it('converts a React component into PlainText', async () => {
    const actualOutput = await renderAsync(<Template firstName="Jim" />, {
      plainText: true
    });

    expect(actualOutput).toMatchSnapshot();
  });

  it('converts to plain text and removes reserved ID', async () => {
    const actualOutput = await renderAsync(<Preview />, {
      plainText: true
    });

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('renderAsync using renderToReadableStream', () => {
  const { renderToStaticMarkup } = ReactDOMServer;
  const { renderToReadableStream } = ReactDOMServer;

  const mockRenderToReadableStream = (
    component: React.ReactNode
  ): Promise<ReactDOMServer.ReactDOMServerReadableStream> => {
    const encoder = new TextEncoder();
    const markup = ReactDOMServer.renderToString(component as React.ReactElement);

    let done = false;

    return Promise.resolve({
      allReady: Promise.resolve(),
      [Symbol.asyncIterator]: () => {
        return {
          next: () => {
            if (done) {
              return Promise.resolve({ done: true, value: undefined });
            }

            done = true;

            return Promise.resolve({
              done: false,
              value: encoder.encode(markup)
            });
          }
        };
      }
    });
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();

    (ReactDOMServer.renderToStaticMarkup as unknown as undefined) = undefined;
    ReactDOMServer.renderToReadableStream = mockRenderToReadableStream;
  });

  afterEach(() => {
    ReactDOMServer.renderToStaticMarkup = renderToStaticMarkup;
    ReactDOMServer.renderToReadableStream = renderToReadableStream;
  });

  it('converts a React component into HTML', async () => {
    const actualOutput = await renderAsync(<Template firstName="Jim" />);

    expect(actualOutput).toMatchSnapshot();
  });

  it('converts a React component into PlainText', async () => {
    const actualOutput = await renderAsync(<Template firstName="Jim" />, {
      plainText: true
    });

    expect(actualOutput).toMatchSnapshot();
  });

  it('converts to plain text and removes reserved ID', async () => {
    const actualOutput = await renderAsync(<Preview />, {
      plainText: true
    });

    expect(actualOutput).toMatchSnapshot();
  });
});
