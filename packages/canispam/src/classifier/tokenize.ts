import { stripHtml } from '../html.js';

const genericTokenizer =
  /[^a-zá-úÁ-Úà-úÀ-Úñü\dа-яёæøåàáảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđäöëïîûœçążśźęćńł-]+/i;
const encoder = new TextEncoder();

const spamScannerStopwords = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'has',
  'in',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'to',
  'was',
  'were',
  'will',
  'with'
]);

const toHex = (bytes: ArrayBuffer) =>
  [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');

const hashToken = async (token: string) => {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', encoder.encode(token));
  return toHex(digest).slice(0, 16);
};

const preprocessText = (value: string) =>
  value
    .replaceAll(/\b(?:\d{1,2}[/-]){2}\d{2,4}\b/g, ' DATE_PATTERN ')
    .replaceAll(/\bhttps?:\/\/[^\s"'<>]+/gi, ' URL_LINK ')
    .replaceAll(/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/gi, ' EMAIL_ADDRESS ')
    .replaceAll(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, ' IP_ADDRESS ');

export const getClassifierTokens = async (params: {
  html: string;
  subject: string;
  text: string;
}) => {
  const content = preprocessText(`${params.text} ${stripHtml(params.html)} ${params.subject}`);
  const tokens = content
    .normalize('NFKC')
    .split(genericTokenizer)
    .map((token) => token.toLowerCase().trim())
    .filter((token) => token.length > 0 && token.length <= 50)
    .filter((token) => !spamScannerStopwords.has(token))
    .slice(0, 2000);

  return Promise.all(tokens.map(hashToken));
};
