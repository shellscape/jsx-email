const roundToThousand = (num: number): string => {
  if (num < 1000) {
    return num.toFixed();
  }
  if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return `${(num / 1000000).toFixed(2)}M`;
};

export default roundToThousand;
