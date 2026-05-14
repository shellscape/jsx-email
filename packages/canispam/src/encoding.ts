const defaultCharset = 'utf-8';

export const decodeBytes = (bytes: Uint8Array, charset = defaultCharset) => {
  try {
    return new TextDecoder(charset).decode(bytes);
  } catch {
    return new TextDecoder(defaultCharset).decode(bytes);
  }
};

export const decodeBase64Bytes = (value: string) => {
  const compact = value.replaceAll(/\s/g, '');
  const binary = globalThis.atob(compact);

  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

export const hexToByte = (hex: string) => Number.parseInt(hex, 16);

export const isHexByte = (value: string) =>
  value.length === 2 && [...value].every((char) => Number.isInteger(Number.parseInt(char, 16)));
