interface AppConfig {
  buildPath: string;
  relativePath: string;
}

export const config: AppConfig = {
  buildPath: import.meta.env.VITE_JSXEMAIL_BUILD_PATH,
  relativePath: import.meta.env.VITE_JSXEMAIL_RELATIVE_PATH
};
