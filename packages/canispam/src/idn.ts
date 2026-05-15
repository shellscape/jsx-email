const confusables = new Map([
  ['а', 'a'],
  ['е', 'e'],
  ['о', 'o'],
  ['р', 'p'],
  ['с', 'c'],
  ['х', 'x'],
  ['у', 'y'],
  ['α', 'a'],
  ['ο', 'o'],
  ['ρ', 'p'],
  ['υ', 'u'],
  ['ν', 'v'],
  ['ι', 'i']
]);

const brands = ['google', 'facebook', 'amazon', 'apple', 'microsoft', 'paypal', 'bankofamerica'];
const collator = new Intl.Collator('en', { sensitivity: 'base', usage: 'search' });

const hasNonAscii = (value: string) => [...value].some((char) => char.charCodeAt(0) > 127);

const normalizeConfusables = (value: string) =>
  [...value.toLocaleLowerCase('en-US')].map((char) => confusables.get(char) || char).join('');

const similarity = (a: string, b: string) => {
  const left = [...a.normalize('NFKC')];
  const right = [...b.normalize('NFKC')];
  const matrix = Array.from({ length: right.length + 1 }, (_, index) => [index]);
  for (let index = 0; index <= left.length; index++) matrix[0][index] = index;

  for (let row = 1; row <= right.length; row++) {
    for (let column = 1; column <= left.length; column++) {
      matrix[row][column] =
        collator.compare(right[row - 1], left[column - 1]) === 0
          ? matrix[row - 1][column - 1]
          : Math.min(
              matrix[row - 1][column - 1] + 1,
              matrix[row][column - 1] + 1,
              matrix[row - 1][column] + 1
            );
    }
  }

  const length = Math.max(left.length, right.length);
  return length === 0 ? 1 : (length - matrix[right.length][left.length]) / length;
};

export const getIdnRisk = (hostname: string) => {
  const domain = hostname.toLocaleLowerCase('en-US');
  const isIdn = domain.includes('xn--') || hasNonAscii(domain);
  if (!isIdn) return 0;

  const root = normalizeConfusables(domain.split('.').at(-2) || domain);
  const brandRisk = brands.some((brand) => similarity(root, brand) > 0.8) ? 3 : 0;
  const confusableRisk = normalizeConfusables(domain) !== domain ? 2 : 0;

  return Math.max(1, brandRisk, confusableRisk);
};
