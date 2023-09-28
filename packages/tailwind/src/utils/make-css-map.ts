/**
 * Make a map of all class names and their css styles
 */
export function makeCssMap(css: string) {
  const cssNoMedia = css.replace(/@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm, '');

  const cssMap = cssNoMedia.split('}').reduce((acc, cur) => {
    const [key, value] = cur.split('{');
    if (key && value) {
      // eslint-disable-next-line no-param-reassign
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
  return cssMap;
}
