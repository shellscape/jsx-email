import type { Element, Root } from 'hast';
import { selectAll } from 'hast-util-select';
import { type JsxEmailPlugin, pluginSymbol } from 'jsx-email';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface AppendOptions {
  attributes?: string[];
  parameters: Record<string, boolean | null | number | string | undefined>;
  qs?: QueryStringOptions;
  strict?: boolean;
  tags?: string[];
}

export interface QueryStringOptions {
  encode?: boolean;
}

export interface UrlPluginOptions {
  /**
   * Appends URL parameters to matching URL attributes in the rendered email HTML.
   */
  append?: AppendOptions;
}

const defaultAppendOptions = {
  attributes: ['src', 'href', 'poster', 'srcset', 'background'],
  qs: {
    encode: false
  },
  strict: true,
  tags: ['a']
} satisfies Omit<Required<AppendOptions>, 'parameters'>;

const appendParameters = (
  value: string,
  parameters: AppendOptions['parameters'],
  qs: QueryStringOptions
) => {
  const entries = Object.entries(parameters).filter(([, entryValue]) => entryValue !== undefined);

  if (!entries.length) return value;

  const hashIndex = value.indexOf('#');
  const path = hashIndex === -1 ? value : value.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : value.slice(hashIndex);
  const separator = path.includes('?') ? (/[?&]$/.test(path) ? '' : '&') : '?';
  const query = entries
    .map(([key, entryValue]) => {
      const normalizedValue = entryValue === null ? '' : String(entryValue);
      if (qs.encode) return `${encodeURIComponent(key)}=${encodeURIComponent(normalizedValue)}`;

      return `${key}=${normalizedValue}`;
    })
    .join('&');

  return `${path}${separator}${query}${hash}`;
};

const isStrictUrl = (value: string) => {
  try {
    const UrlConstructor = (
      globalThis as unknown as {
        URL: new (url: string) => { protocol: string };
      }
    ).URL;

    return Boolean(new UrlConstructor(value).protocol);
  } catch {
    return false;
  }
};

const transformSrcset = (
  value: string,
  parameters: AppendOptions['parameters'],
  qs: QueryStringOptions,
  strict: boolean
) =>
  value
    .split(',')
    .map((candidate) => {
      const trimmed = candidate.trim();
      const [url = '', ...descriptors] = trimmed.split(/\s+/);

      if (!url || (strict && !isStrictUrl(url))) return candidate;

      return [appendParameters(url, parameters, qs), ...descriptors].join(' ');
    })
    .join(', ');

const transformValue = (
  attribute: string,
  value: string,
  parameters: AppendOptions['parameters'],
  qs: QueryStringOptions,
  strict: boolean
) => {
  if (attribute === 'srcset') return transformSrcset(value, parameters, qs, strict);
  if (strict && !isStrictUrl(value)) return value;

  return appendParameters(value, parameters, qs);
};

const getSelectedElements = (tree: Root, tags: string[]) => {
  const selected = new Set<Element>();

  for (const tag of tags) {
    for (const element of selectAll(tag, tree)) selected.add(element);
  }

  return selected;
};

const getPropertyKeys = (attribute: string) => {
  const propertyKeys = new Set([attribute]);

  propertyKeys.add(attribute.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase()));
  if (attribute === 'srcset') propertyKeys.add('srcSet');

  return propertyKeys;
};

export const urlPlugin = (options: UrlPluginOptions = {}): JsxEmailPlugin => ({
  name: 'root/url',
  process: async () => {
    return function appendUrlParametersPlugin() {
      return function appendUrlParameters(tree: Root) {
        if (!tree || !options.append) return null;

        const appendOptions = {
          ...defaultAppendOptions,
          ...options.append,
          qs: {
            ...defaultAppendOptions.qs,
            ...options.append.qs
          }
        };
        const selectedElements = getSelectedElements(tree, appendOptions.tags);

        return visit(tree, 'element', (node) => {
          if (!selectedElements.has(node)) return;

          for (const attribute of appendOptions.attributes) {
            const propertyKey = Array.from(getPropertyKeys(attribute)).find(
              (key) => typeof node.properties?.[key] === 'string'
            );
            const value = propertyKey ? node.properties?.[propertyKey] : null;

            if (propertyKey && typeof value === 'string') {
              node.properties[propertyKey] = transformValue(
                attribute,
                value,
                appendOptions.parameters,
                appendOptions.qs,
                appendOptions.strict
              );
            }
          }
        });
      };
    } as unknown as Plugin;
  },
  symbol: pluginSymbol
});

export const plugin = urlPlugin();
