/* eslint-disable no-var, vars-on-top */

export interface JsxEmailMeta {
  jsxEmail: {
    isPreview: boolean;
  };
}

declare global {
  namespace globalThis {
    var jsxEmail: JsxEmailMeta['jsxEmail'];
  }

  interface ImportMeta extends JsxEmailMeta {}
}

export {};
