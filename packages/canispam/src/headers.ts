import { decodeBase64Bytes, decodeBytes, hexToByte, isHexByte } from './encoding.js';

const encodedWordPattern = /=\?([^?]+)\?([bqBQ])\?([^?]*)\?=/g;

export const normalizeLineEndings = (value: string) => value.replaceAll(/\r\n|\r/g, '\n');

export const parseHeaders = (headerText: string) => {
  const headers = new Map<string, string>();
  const lines = normalizeLineEndings(headerText).split('\n');
  let currentKey = '';
  let currentValue = '';

  const commit = () => {
    if (currentKey) headers.set(currentKey.toLowerCase(), currentValue.trim());
  };

  for (const line of lines) {
    if (/^[\t ]/.test(line) && currentKey) {
      currentValue += ` ${line.trim()}`;
    } else {
      commit();
      const separator = line.indexOf(':');
      currentKey = separator === -1 ? '' : line.slice(0, separator).trim();
      currentValue = separator === -1 ? '' : line.slice(separator + 1).trim();
    }
  }

  commit();
  return headers;
};

const decodeBase64 = (value: string, charset: string) => {
  const bytes = decodeBase64Bytes(value);
  return decodeBytes(bytes, charset);
};

const decodeQuotedPrintableWord = (value: string, charset: string) => {
  const bytes: number[] = [];
  const input = value.replaceAll('_', ' ');
  let index = 0;

  while (index < input.length) {
    const hex = input.slice(index + 1, index + 3);
    if (input[index] === '=' && isHexByte(hex)) {
      bytes.push(hexToByte(hex));
      index += 3;
    } else {
      bytes.push(input.charCodeAt(index));
      index += 1;
    }
  }

  return decodeBytes(new Uint8Array(bytes), charset);
};

export const decodeHeaderValue = (value: string) =>
  value.replaceAll(
    encodedWordPattern,
    (_match, charset: string, encoding: string, encoded: string) => {
      if (!/^utf-?8$/i.test(charset)) return encoded;
      if (encoding.toLowerCase() === 'b') return decodeBase64(encoded, charset);

      return decodeQuotedPrintableWord(encoded, charset);
    }
  );

export const getHeader = (headers: Map<string, string>, name: string) =>
  headers.get(name.toLowerCase()) || '';

export const parseContentType = (value: string) => {
  const [type = '', ...params] = value.split(';');
  const parameters = new Map<string, string>();

  for (const param of params) {
    const separator = param.indexOf('=');
    if (separator !== -1) {
      const key = param.slice(0, separator).trim().toLowerCase();
      const rawValue = param.slice(separator + 1).trim();
      parameters.set(key, rawValue.replace(/^"|"$/g, ''));
    }
  }

  return {
    parameters,
    type: type.trim().toLowerCase()
  };
};
