/**
 * Clean css selectors to replace all non-alphanumeric characters with underscores
 */
export function cleanCss(css: string) {
  const newCss = css
    .replace(/\\/g, '')
    // find all css selectors and look ahead for opening and closing curly braces
    .replace(/[.!#\w\d\\:\-[\]/.%())]+(?=\s*?{[^{]*?\})\s*?{/g, (m) =>
      m.replace(/(?<=.)[:#!\-[\\\]/.%]+/g, '_')
    )
    .replace(
      /font-family(?<value>[^;\r\n]+)/g,
      (_, value) => `font-family${value.replace(/['"]+/g, '')}`
    );
  return newCss;
}
