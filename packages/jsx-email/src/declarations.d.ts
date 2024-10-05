/* eslint-disable no-var, vars-on-top */

declare global {
  namespace globalThis {
    var isJsxEmailPreview: boolean;
  }

  interface ImportMeta {
    isJsxEmailPreview: boolean;
  }
}

export {};
