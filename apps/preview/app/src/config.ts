interface AppConfig {
  relativePath: string;
}

export const config: AppConfig = {
  relativePath: import.meta.env.VITE_JSXEMAIL_RELATIVE_PATH
};
