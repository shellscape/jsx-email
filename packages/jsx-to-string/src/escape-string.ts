const matchHtmlRegExp = /["'&<>]/;

const enum ASCII {
  DOUBLE_QUOTE = 34,
  AMPERSAND = 38,
  SINGLE_QUOTE = 39,
  LESS_THAN = 60,
  GREATER_THAN = 62
}

/**
 * Escapes special characters and HTML entities in a given html string.
 *
 * @param string HTML string to escape for later insertion
 */
export function escapeString(string: string) {
  const str = String(string);
  const match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = '';
  let index;
  let lastIndex = 0;

  for ({ index } = match; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case ASCII.DOUBLE_QUOTE:
        escape = '&quot;';
        break;
      case ASCII.AMPERSAND:
        escape = '&amp;';
        break;
      case ASCII.SINGLE_QUOTE:
        escape = '&#x27;';
        break;
      case ASCII.LESS_THAN:
        escape = '&lt;';
        break;
      case ASCII.GREATER_THAN:
        escape = '&gt;';
        break;
      default:
        // eslint-disable-next-line no-continue
        continue;
    }

    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
