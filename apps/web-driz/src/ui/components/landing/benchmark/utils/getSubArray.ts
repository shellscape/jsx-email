import { type IData } from "../types";

const getSubArray = (arr: IData[], index: number, maxLength: number) => {
  if (index < 0 || index >= arr.length || maxLength <= 0) {
    return [];
  }
  const startIndex = Math.max(0, index - maxLength + 1);
  return arr.slice(startIndex, index + 1);
};

export default getSubArray;
