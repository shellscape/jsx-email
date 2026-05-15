// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { SpamPopover } from '../../../src/components/canvas/spam-popover';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

const renderSpamPopover = (state: Parameters<typeof SpamPopover>[0]['state']) => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);

  act(() => {
    root?.render(<SpamPopover state={state} />);
  });
};

afterEach(() => {
  if (root) {
    act(() => root?.unmount());
    root = undefined;
  }
  container?.remove();
  container = undefined;
});

describe('SpamPopover', () => {
  it('shows hidden text evidence behind the text toggle', () => {
    renderSpamPopover({
      classification: 'warn',
      findings: [
        {
          evidence: 'wire transfer western union bitcoin lottery viagra cialis',
          message: 'HTML contains hidden or tiny text.',
          rule: 'hidden-text',
          score: 3
        }
      ],
      score: 3,
      status: 'warn'
    });

    const toggle = container?.querySelector<HTMLButtonElement>('.spam-popover-evidence-toggle');
    expect(toggle?.textContent).toBe('Show text');
    expect(container?.textContent).not.toContain('wire transfer western union');

    act(() => toggle?.click());

    expect(toggle?.textContent).toBe('Hide text');
    expect(container?.textContent).toContain('wire transfer western union');
  });

  it('does not render a result row when there are no spam signals', () => {
    renderSpamPopover({
      classification: 'pass',
      findings: [],
      score: 0,
      status: 'pass'
    });

    expect(container?.textContent).toContain(
      'No meaningful spam signals were found in this template.'
    );
    expect(container?.textContent).not.toContain('No spam signals found');
    expect(container?.querySelector('.spam-popover-finding')).toBeNull();
  });
});
