import { encodeQuotedPrintable } from './encoding.js';
import { formatHeaders, type EmlHeaders } from './headers.js';

export type ToEmlInput = {
  date?: Date;
  from?: string;
  headers?: EmlHeaders;
  html?: null | string;
  messageId?: string;
  plain?: null | string;
  subject?: string;
  to?: string | string[];
};

const defaultFrom = 'preview@jsx.email';
const defaultSubject = 'JSX Email Preview';
const defaultTo = 'recipient@example.com';

const assertBody = (input: ToEmlInput) => {
  if (!input.html && !input.plain) throw new TypeError('toEml requires html or plain content.');
};

const normalizeRecipients = (to: string | string[] | undefined) =>
  Array.isArray(to) ? to.join(', ') : to || defaultTo;

const normalizeBody = (value: string) => value.replaceAll(/\r\n|\r/g, '\n');

const createBoundary = (input: ToEmlInput) => {
  const source = `${input.subject || defaultSubject}:${input.html || ''}:${input.plain || ''}`;
  let hash = 0;

  for (const char of source) hash = (hash * 31 + char.charCodeAt(0)) % 0x1_0000_0000;

  return `jsx-email-${hash.toString(16).padStart(8, '0')}`;
};

const createMessageId = (input: ToEmlInput) => {
  if (input.messageId) return input.messageId;

  const boundary = createBoundary(input);
  return `<${boundary}@jsx.email>`;
};

const createBaseHeaders = (input: ToEmlInput): EmlHeaders => ({
  Date: input.date || new Date(),
  From: input.from || defaultFrom,
  'Message-ID': createMessageId(input),
  'MIME-Version': '1.0',
  Subject: input.subject || defaultSubject,
  To: normalizeRecipients(input.to),
  ...input.headers
});

const createPart = (contentType: string, value: string) =>
  [
    formatHeaders({
      'Content-Transfer-Encoding': 'quoted-printable',
      'Content-Type': `${contentType}; charset=utf-8`
    }),
    '',
    encodeQuotedPrintable(normalizeBody(value))
  ].join('\r\n');

const createSinglePart = (input: ToEmlInput, contentType: string, value: string) =>
  [
    formatHeaders({
      ...createBaseHeaders(input),
      'Content-Transfer-Encoding': 'quoted-printable',
      'Content-Type': `${contentType}; charset=utf-8`
    }),
    '',
    encodeQuotedPrintable(normalizeBody(value)),
    ''
  ].join('\r\n');

const createMultipart = (input: ToEmlInput) => {
  const boundary = createBoundary(input);

  return [
    formatHeaders({
      ...createBaseHeaders(input),
      'Content-Type': `multipart/alternative; boundary="${boundary}"`
    }),
    '',
    `--${boundary}`,
    createPart('text/plain', input.plain || ''),
    `--${boundary}`,
    createPart('text/html', input.html || ''),
    `--${boundary}--`,
    ''
  ].join('\r\n');
};

export const toEml = (input: ToEmlInput) => {
  assertBody(input);

  if (input.html && input.plain) return createMultipart(input);
  if (input.html) return createSinglePart(input, 'text/html', input.html);

  return createSinglePart(input, 'text/plain', input.plain || '');
};
