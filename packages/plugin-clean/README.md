[npm]: https://img.shields.io/npm/v/@jsx-email/plugin-clean
[npm-url]: https://www.npmjs.com/package/@jsx-email/plugin-clean

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"/><br/><br/>
</div>

# JSX&thinsp;email Clean Plugin

`@jsx-email/plugin-clean` is a JSX email plugin that removes unused CSS selectors and class names from rendered email HTML.

This plugin is configured directly through a JSX email config file:

```js
import { clean } from '@jsx-email/plugin-clean';
import { defineConfig } from 'jsx-email/config';

export const config = defineConfig({
  plugins: [
    clean({
      whitelist: ['.External*', '.ReadMsgBody', '#*']
    })
  ]
});
```

Please see the [documentation for this plugin](https://jsx.email/docs/plugins/clean) for more information.

## License

[MIT License](./LICENSE.md)
