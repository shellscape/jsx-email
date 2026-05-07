import type { TemplateData } from '../types/templates';

export type RoutedTemplateData = TemplateData & {
  slug: string;
};

export function getTemplateSlug(fileName: string) {
  return fileName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function addTemplateSlugs(templates: TemplateData[]): RoutedTemplateData[] {
  return templates.map((template) => ({
    ...template,
    slug: getTemplateSlug(template.fileName)
  }));
}

export function getHashRouteSlug(hash = typeof window === 'undefined' ? '' : window.location.hash) {
  const match = hash.match(/^#\/([^/?#]+)/);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

export function updateTemplateHash(slug: string) {
  if (!slug || typeof window === 'undefined') return;
  if (getHashRouteSlug(window.location.hash) === slug) return;

  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}#/${encodeURIComponent(slug)}`
  );
}

export function clearTemplateHash() {
  if (typeof window === 'undefined' || !getHashRouteSlug(window.location.hash)) return;

  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}`
  );
}
