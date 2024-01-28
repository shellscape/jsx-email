import titleize from 'titleize';

export const addSpacesForCamelCaseName = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2');

export const parseName = (path: string) => {
  const chunks = path.replace('\\', '/').split('/');
  const segment = chunks.at(-1);
  const [basename] = segment!.split(/\.[^.]+$/);

  return titleize(addSpacesForCamelCaseName(basename));
};

export const { warn } = console;
