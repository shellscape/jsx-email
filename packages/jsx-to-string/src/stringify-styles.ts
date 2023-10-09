import type { CSSProperties } from 'react';

const UPPERCASE = /([A-Z])/g;

const MS = /^ms-/;

const UNITLESS_PROPS = new Set([
  'animationIterationCount',
  'columns',
  'columnCount',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom'
]);

const CACHE: Record<string, string> = {};

function hyphenateChar(char: string) {
  return `-${char.toLowerCase()}`;
}

function hyphenateString(prop: string) {
  return prop.replace(UPPERCASE, hyphenateChar).replace(MS, '-ms-');
}

export function stringifyStyles(styles: CSSProperties) {
  let out = '';
  for (const prop of Object.keys(styles) as ReadonlyArray<keyof typeof styles>) {
    const value = styles[prop];

    if (value != null) {
      const unit =
        typeof value === 'number' && value !== 0 && !UNITLESS_PROPS.has(prop) ? 'px' : '';

      const normalized = CACHE[prop] || (CACHE[prop] = hyphenateString(prop));

      out += `${normalized}:${value}${unit};`;
    }
  }

  return out;
}
