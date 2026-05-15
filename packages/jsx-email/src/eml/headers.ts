import { encodeHeaderValue } from './encoding.js';

const lineLength = 78;

export type EmlHeaders = Record<string, string | number | Date | undefined>;

const normalizeHeaderName = (name: string) =>
  name
    .split('-')
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();
      if (lower === 'id' || lower === 'mime') return lower.toUpperCase();

      return `${part[0]?.toUpperCase() || ''}${part.slice(1).toLowerCase()}`;
    })
    .join('-');

const foldHeader = (name: string, value: string) => {
  const prefix = `${name}: `;
  if (prefix.length + value.length <= lineLength) return `${prefix}${value}`;

  const words = value.split(' ');
  const lines = [prefix.trimEnd()];
  let current = ' ';

  for (const word of words) {
    if (current.length + word.length + 1 > lineLength) {
      lines.push(current.trimEnd());
      current = ` ${word}`;
    } else {
      current += `${current === ' ' ? '' : ' '}${word}`;
    }
  }

  if (current.trim()) lines.push(current.trimEnd());

  return lines.join('\r\n');
};

export const formatHeader = (name: string, value: string | number | Date) =>
  foldHeader(
    normalizeHeaderName(name),
    encodeHeaderValue(value instanceof Date ? value.toUTCString() : String(value))
  );

export const formatHeaders = (headers: EmlHeaders) =>
  Object.entries(headers)
    .filter((entry): entry is [string, string | number | Date] => entry[1] !== undefined)
    .map(([name, value]) => formatHeader(name, value))
    .join('\r\n');
