export const setup = () => {
  // Note: Disables annoying key errors. We're static so we don't need to worry about this.
  /* eslint-disable no-console */
  const og = console.error;
  const re =
    /^Warning: Each child in an array or iterator should have a unique "key" prop|^Warning: Each child in a list should have a unique "key" prop/;
  console.error = (...args) => {
    const [line] = args;
    if (!re.test(line)) og(...args);
  };
};
