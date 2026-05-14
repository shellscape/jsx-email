const trailingUrlPunctuation = new Set([')', ',', '.', ';', '!', '?']);
const urlBreakChars = new Set(['"', "'", '<', '>']);
const hiddenTextColors = new Set(['white', '#fff', '#ffffff', 'rgb(255, 255, 255)']);

const parseHtml = (html: string) => {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const lowered = html.toLowerCase();
  const isFragment = !lowered.includes('<html') && !lowered.includes('<body');

  if (isFragment) {
    const template = document.createElement('template');
    template.innerHTML = html;
    document.body.replaceChildren(template.content.cloneNode(true));
  }

  return document;
};

const isWhitespace = (char: string) => char.trim() === '';

export const normalizeText = (value: string) => {
  let normalized = '';
  let pendingSpace = false;

  for (const char of value) {
    if (isWhitespace(char)) {
      pendingSpace = true;
    } else {
      if (pendingSpace && normalized) normalized += ' ';
      normalized += char;
      pendingSpace = false;
    }
  }

  return normalized;
};

export const stripHtml = (html: string) => {
  const document = parseHtml(html);
  document.querySelectorAll('script, style, template').forEach((element) => element.remove());
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let text = '';
  let current = walker.nextNode();

  while (current) {
    text += ` ${current.textContent || ''}`;
    current = walker.nextNode();
  }

  return normalizeText(text);
};

const trimTrailingUrlPunctuation = (value: string) => {
  let end = value.length;

  while (end > 0 && trailingUrlPunctuation.has(value[end - 1])) end -= 1;

  return value.slice(0, end);
};

const scanTextUrls = (value: string) => {
  const urls = new Set<string>();
  let index = 0;

  while (index < value.length) {
    const rest = value.slice(index).toLowerCase();
    const prefix = rest.startsWith('https://')
      ? 'https://'
      : rest.startsWith('http://')
        ? 'http://'
        : '';

    if (!prefix) {
      index += 1;
    } else {
      let end = index + prefix.length;

      while (end < value.length && !isWhitespace(value[end]) && !urlBreakChars.has(value[end]))
        end += 1;

      const url = trimTrailingUrlPunctuation(value.slice(index, end));
      if (url) urls.add(url);

      index = end;
    }
  }

  return urls;
};

const extractElementUrls = (document: Document) => {
  const urls = new Set<string>();
  const attributes = ['href', 'src', 'poster', 'background', 'action'];

  for (const element of document.querySelectorAll('*')) {
    for (const attribute of attributes) {
      const value = element.getAttribute(attribute);
      if (value) urls.add(value);
    }
  }

  return urls;
};

export const extractUrls = (html: string, text: string) => {
  const document = parseHtml(html);
  const urls = extractElementUrls(document);
  const content = `${document.body.textContent || ''} ${text}`;

  for (const url of scanTextUrls(content)) urls.add(url);

  return [...urls];
};

export const extractLinks = (html: string) => {
  const document = parseHtml(html);
  const links: Array<{ href: string; text: string }> = [];

  for (const element of document.querySelectorAll('a[href]')) {
    links.push({
      href: element.getAttribute('href') || '',
      text: normalizeText(element.textContent || '')
    });
  }

  return links;
};

export const countImages = (html: string) => parseHtml(html).querySelectorAll('img').length;

export const hasBase64Image = (html: string) => {
  const document = parseHtml(html);

  for (const image of document.querySelectorAll('img')) {
    const source = image.getAttribute('src')?.toLowerCase() || '';
    if (source.startsWith('data:image/') && source.includes(';base64,')) return true;
  }

  return false;
};

export const hasHiddenOrTinyText = (html: string) => {
  const document = parseHtml(html);

  for (const element of document.querySelectorAll<HTMLElement>('[style]')) {
    const { style } = element;
    const color = style.color.toLowerCase();
    const fontSize = style.fontSize.toLowerCase();
    const hasSupportedFontSize =
      !fontSize || !globalThis.CSS || globalThis.CSS.supports('font-size', fontSize);

    if (hiddenTextColors.has(color)) return true;
    if (hasSupportedFontSize && (fontSize === '0px' || fontSize === '1px')) return true;
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0')
      return true;
  }

  return false;
};
