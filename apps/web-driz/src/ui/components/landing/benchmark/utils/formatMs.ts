import fixedHelper from "./fixedHelper";

const formatMs = (ms: number) => {
  if (ms < 100) return `${ms.toFixed(1)}ms`;
  if (ms < 1000) return `${fixedHelper(ms)}ms`;
  return `${fixedHelper(ms / 1000, 2)}s`;
};

export default formatMs;
