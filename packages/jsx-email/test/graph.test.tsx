// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Graph } from '../src';

describe('<Hr> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes styles and other props correctly', async () => {
    const html = await jsxToString(
      <Graph
        width={300}
        height={300}
        title="Basic graph demo"
        config={{
          data: {
            datasets: [
              {
                data: [50, 60, 70, 180],
                label: 'Users'
              }
            ],
            labels: ['Q1', 'Q2', 'Q3', 'Q4']
          },
          type: 'bar'
        }}
      />
    );
    expect(html).toContain('width="300"');
    expect(html).toContain('height="300"');
    expect(html).toContain('src="https://quickchart.io/chart?');
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(
      <Graph
        title="Basic graph demo"
        config={{
          data: {
            datasets: [
              {
                data: [50, 60, 70, 180],
                label: 'Users'
              }
            ],
            labels: ['Q1', 'Q2', 'Q3', 'Q4']
          },
          type: 'bar'
        }}
      />
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
