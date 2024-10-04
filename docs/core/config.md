---
title: 'Configuration'
description: 'Configuration'
---

## Configuring jsx-email

When running `email` from the command line or programmatically using the [`render`](/docs/core/render) function, jsx-email will attempt to find and use a `jsx-email.config` file. jsx-email will traverse a directory structure looking for config files until it reaches a git repository root directory, or the OS's home directory. This is quite fast, and allows for scoping your configuration file at the filesystem level you'd like to. By default, jsx-email looks for configuration files with the following file extensions and locations:

```
.config/jsx-emailrc.js
.config/jsx-emailrc.cjs
.config/jsx-emailrc.mjs
.config/jsx-email.config.js
.config/jsx-email.config.cjs
.config/jsx-email.config.mjs
.jsx-emailrc.js
.jsx-emailrc.cjs
.jsx-emailrc.mjs
jsx-email.config.js
jsx-email.config.cjs
jsx-email.config.mjs
```

::: info
jsx-email does not currently support TypeScript, YAML, or JSON files.
:::

### Config File

The most basic configuration file might look like this:

```ts
import { defineConfig } from 'jsx-email/config';

export const config = defineConfig({
  render: { minify: true }
});
```

The named export `config` is required regardless of how the file is constructed. Note the use of the `defineConfig` import and the `config` named export - while any plain object will be accepted and parsed, the use of `defineConfig` is encouraged for ensuring your config is compliant.

### Intellisense

Since jsx-email ships with TypeScript typings, you can leverage your IDE's intellisense with jsdoc type hints:

```ts
/** @type {import('jsx-email/config').JsxEmailConfig} */
export const config = { ... };
```

### Async Configuration

The `config` export inherently supports `Promise`. This is helpful when needing to perform other async operations before returning a value to the export. This can be done in a few ways:

```ts
export const config = (async () => { ... })();
```

Or

```ts
export const config = new Promise((resolve, reject) => { ... })
```

Alternatively, when using the `defineConfig` function, an async function may be passed to it as the first argument:

```ts
export const config = defineConfig(async () => {
  const data = await asyncFunction()
  return {
    ...
  }
});
```

### Available Properties

jsx-email configuration files support the following properties:

```ts
logLevel?: 'debug' | 'info' | 'warn' | 'error';
```

_Optional_. Default: `info`. The level at which logs for jsx-email will appear in the terminal / console.

```ts
plugins?: JsxEmailPlugin[];
```

_Optional_. An array of plugins; objects which contain a valid [`JsxEmailPlugin` definition](/docs/core/plugins).

```ts
render?: RenderOptions;
```

_Optional_. The value specified will be merged with the [`render` function options](https://jsx.email/docs/core/render#method-options) when a render takes place. Please see the [`render` documentation](https://jsx.email/docs/core/render#method-options) for more details.
