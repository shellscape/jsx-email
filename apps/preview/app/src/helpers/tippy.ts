import type { Props } from 'tippy.js';

export const previewTippyProps: Partial<Props> = {
  arrow: false,
  hideOnClick: true,
  offset: [0, 8],
  placement: 'bottom',
  theme: 'jsx-email',
  trigger: 'mouseenter focus'
};
