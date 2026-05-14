import { decodeBase64Bytes, decodeBytes, hexToByte, isHexByte } from './encoding.js';
import { InvalidEmlError } from './errors.js';
import {
  decodeHeaderValue,
  getHeader,
  normalizeLineEndings,
  parseContentType,
  parseHeaders
} from './headers.js';
import type { ParsedEml } from './types.js';

const splitHeaderAndBody = (eml: string) => {
  const normalized = normalizeLineEndings(eml);
  const separator = normalized.indexOf('\n\n');
  if (separator === -1) throw new InvalidEmlError('EML is missing a header/body separator.');

  return {
    body: normalized.slice(separator + 2),
    headerText: normalized.slice(0, separator)
  };
};

const decodeQuotedPrintableBytes = (value: string) => {
  const bytes: number[] = [];
  const input = value.replaceAll(/=\n/g, '');
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

  return new Uint8Array(bytes);
};

const decodeBody = (body: string, encoding: string, charset: string) => {
  const normalizedEncoding = encoding.toLowerCase();
  if (normalizedEncoding === 'quoted-printable')
    return decodeBytes(decodeQuotedPrintableBytes(body), charset).trim();
  if (normalizedEncoding !== 'base64') return body.trim();

  try {
    return decodeBytes(decodeBase64Bytes(body), charset);
  } catch {
    return body.trim();
  }
};

const parseSinglePart = (headers: Map<string, string>, body: string) => {
  const { parameters, type } = parseContentType(getHeader(headers, 'content-type'));
  const content = decodeBody(
    body,
    getHeader(headers, 'content-transfer-encoding'),
    parameters.get('charset') || 'utf-8'
  );

  return {
    html: type === 'text/html' ? content : '',
    text: type === 'text/plain' || !type ? content : ''
  };
};

const parseMultipart = (headers: Map<string, string>, body: string) => {
  const { parameters } = parseContentType(getHeader(headers, 'content-type'));
  const boundary = parameters.get('boundary');
  if (!boundary) throw new InvalidEmlError('Multipart EML is missing a boundary.');

  const parsed = { html: '', text: '' };
  const marker = `--${boundary}`;
  const parts = body.split(marker).slice(1);

  for (const rawPart of parts) {
    const part = rawPart.replace(/^\n/, '').replace(/\n--\s*$/, '');
    if (part.trim() && part.trim() !== '--') {
      const { body: partBody, headerText } = splitHeaderAndBody(part);
      const partHeaders = parseHeaders(headerText);
      const partResult = parseSinglePart(partHeaders, partBody);
      parsed.html ||= partResult.html;
      parsed.text ||= partResult.text;
    }
  }

  return parsed;
};

export const parseEml = (eml: string): ParsedEml => {
  const { body, headerText } = splitHeaderAndBody(eml);
  const headers = parseHeaders(headerText);
  if (headers.size === 0) throw new InvalidEmlError('EML has no parseable headers.');

  const { type } = parseContentType(getHeader(headers, 'content-type'));
  const content = type.startsWith('multipart/')
    ? parseMultipart(headers, body)
    : parseSinglePart(headers, body);

  return {
    headers,
    html: content.html,
    subject: decodeHeaderValue(getHeader(headers, 'subject')),
    text: content.text
  };
};
