export function normalizePath(path: string) {
  return path.replaceAll('\\', '/');
}

export function stripExtension(path: string) {
  return path.replace(/\.[^/.]+$/, '');
}

export function fileName(path: string) {
  return normalizePath(path).split('/').at(-1) || path;
}

export function sortByName<T extends { name: string }>(items: T[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}
