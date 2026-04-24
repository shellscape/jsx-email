const fixedHelper = (number: number, precision = 0) => {
  if (Number.isInteger(number)) {
    return number;
  }
  const multiplier = 10 ** precision;
  return Math.round(number * multiplier) / multiplier;
};

export default fixedHelper;
