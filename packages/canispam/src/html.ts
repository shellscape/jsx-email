export const stripHtml = (html: string) =>
  html
    .replaceAll(/<style[\s\S]*?<\/style>/gi, ' ')
    .replaceAll(/<script[\s\S]*?<\/script>/gi, ' ')
    .replaceAll(/<[^>]+>/g, ' ')
    .replaceAll(/&nbsp;/gi, ' ')
    .replaceAll(/&amp;/gi, '&')
    .replaceAll(/&lt;/gi, '<')
    .replaceAll(/&gt;/gi, '>')
    .replaceAll(/\s+/g, ' ')
    .trim();

export const extractUrls = (html: string, text: string) => {
  const urls = new Set<string>();
  const combined = `${html} ${text}`;

  for (const match of combined.matchAll(/\bhttps?:\/\/[^\s"'<>]+/gi)) {
    urls.add(match[0].replace(/[),.;!?]+$/, ''));
  }

  return [...urls];
};

export const extractLinks = (html: string) => {
  const links: Array<{ href: string; text: string }> = [];
  const pattern = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(pattern)) {
    links.push({
      href: match[1],
      text: stripHtml(match[2])
    });
  }

  return links;
};

export const countPattern = (value: string, pattern: RegExp) => [...value.matchAll(pattern)].length;
