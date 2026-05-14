const encoder = new TextEncoder();
const maxQuotedPrintableLineLength = 76;

const isPrintableAscii = (byte: number) => byte >= 33 && byte <= 126 && byte !== 61;
const isHeaderQPrintable = (byte: number) =>
  byte >= 33 && byte <= 126 && byte !== 61 && byte !== 63 && byte !== 95;

const toHex = (byte: number) => byte.toString(16).toUpperCase().padStart(2, '0');

const normalizeLineEndings = (value: string) => value.replaceAll(/\r\n|\r/g, '\n');

const encodeByte = (byte: number, isTrailingWhitespace: boolean) => {
  if ((byte === 9 || byte === 32) && !isTrailingWhitespace) return String.fromCharCode(byte);
  if (isPrintableAscii(byte)) return String.fromCharCode(byte);

  return `=${toHex(byte)}`;
};

const pushEncodedChunk = (lines: string[], line: string, chunk: string) => {
  if (line.length + chunk.length < maxQuotedPrintableLineLength)
    return { line: line + chunk, lines };

  lines.push(`${line}=`);
  return { line: chunk, lines };
};

export const encodeQuotedPrintable = (value: string) => {
  const encodedLines: string[] = [];

  for (const rawLine of normalizeLineEndings(value).split('\n')) {
    let line = '';
    const bytes = encoder.encode(rawLine);

    for (let index = 0; index < bytes.length; index++) {
      const byte = bytes[index];
      const chunk = encodeByte(byte, index === bytes.length - 1 && (byte === 9 || byte === 32));
      ({ line } = pushEncodedChunk(encodedLines, line, chunk));
    }

    encodedLines.push(line);
  }

  return encodedLines.join('\r\n');
};

export const encodeHeaderValue = (value: string) => {
  const normalized = normalizeLineEndings(value).replaceAll('\n', ' ');
  if (![...normalized].some((char) => char.charCodeAt(0) > 127)) return normalized;

  const encoded = [...encoder.encode(normalized)]
    .map((byte) => {
      if (byte === 32) return '_';
      if (isHeaderQPrintable(byte)) return String.fromCharCode(byte);

      return `=${toHex(byte)}`;
    })
    .join('');

  return `=?UTF-8?Q?${encoded}?=`;
};
