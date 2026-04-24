export default (num: number) => {
  if (!num) {
    return "0";
  }
  if (num < 1000) {
    return num.toString();
  }
  if (num < 1000000) {
    return (num / 1000).toFixed(1).endsWith(".0")
      ? `${Math.round(num / 1000)}k`
      : `${(num / 1000).toFixed(1)}k`;
  }
  return (num / 1000000).toFixed(1).endsWith(".0")
    ? `${Math.round(num / 1000000)}kk`
    : `${(num / 1000000).toFixed(1)}kk`;
};
