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

const decodeBase64 = (value: string) => {
  const binary = globalThis.atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const decodeQuotedPrintableWord = (value: string) =>
  value
    .replaceAll('_', ' ')
    .replaceAll(/=([a-fA-F\d]{2})/g, (_, hex: string) =>
      String.fromCharCode(Number.parseInt(hex, 16))
    );

export const decodeHeaderValue = (value: string) =>
  value.replaceAll(
    encodedWordPattern,
    (_match, charset: string, encoding: string, encoded: string) => {
      if (!/^utf-?8$/i.test(charset)) return encoded;
      if (encoding.toLowerCase() === 'b') return decodeBase64(encoded);

      return decodeQuotedPrintableWord(encoded);
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
