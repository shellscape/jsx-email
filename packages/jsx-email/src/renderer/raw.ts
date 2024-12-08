const START_TAG = '__COMMENT_START';
const END_TAG = '__COMMENT_END';
export function escapeForRawComponent(input: string): string {
  // escape comment sequences
  return input.replace(/<!--/g, START_TAG).replace(/-->/g, END_TAG);
}

export function unescapeForRawComponent(input: string): string {
  return input
    .replace(new RegExp(START_TAG, 'g'), '<!--')
    .replace(new RegExp(END_TAG, 'g'), '/-->');
}
