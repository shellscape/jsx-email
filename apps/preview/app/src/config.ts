interface AppConfig {
  excludeGlob: string | undefined;
  relativePath: string;
}

export const config: AppConfig = {
  excludeGlob: import.meta.env.VITE_JSXE_EXCLUDE_GLOB,
  // FIXME: with v2, remove the `define` replacement. use envars for better back compat and
  // assymetric updates
  // @ts-expect-error
  relativePath: import.meta.env.VITE_JSXE_RELATIVE_PATH || `${__JSX_EMAIL_RELATIVE_PATH__}`
};
