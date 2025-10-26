/**
 * Note: Parts of this file are derived from [React](https://github.com/facebook/react).
 * @license MIT
 */
const matchHtmlRegExp = /["'&<>]/;
var ASCII;
(function (ASCII) {
    ASCII[ASCII["DOUBLE_QUOTE"] = 34] = "DOUBLE_QUOTE";
    ASCII[ASCII["AMPERSAND"] = 38] = "AMPERSAND";
    ASCII[ASCII["SINGLE_QUOTE"] = 39] = "SINGLE_QUOTE";
    ASCII[ASCII["LESS_THAN"] = 60] = "LESS_THAN";
    ASCII[ASCII["GREATER_THAN"] = 62] = "GREATER_THAN";
})(ASCII || (ASCII = {}));
/**
 * Escapes special characters and HTML entities in a given html string.
 *
 * This is a slightly modified version of React's
 * [`escapeHtml`](https://github.com/facebook/react/blob/dddfe688206dafa5646550d351eb9a8e9c53654a/packages/react-dom-bindings/src/server/escapeTextForBrowser.js#L53)
 *
 * @param string HTML string to escape for later insertion
 */
export function escapeString(string) {
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
//# sourceMappingURL=escape-string.js.map