---
title: 'Plugins'
description: 'Plugins'
---

## Plugins

`jsx-email` supports plugins to modify the rendering pipeline according to need. A plugin might provide custom minifcation after rendering, or replace tokens in a template before rendering, for example. For implementation examples, please see the Core Plugins below.

### Core Plugins

By default, `jsx-email` ships with `peerDependencies` on several plugins:

- [`plugin-inline`](/docs/plugins/inline)
- [`plugin-minify`](/docs/plugins/minify)
- [`plugin-pretty`](/docs/plugins/pretty)

### Authoring Plugins

Plugins are extremely flexible in how they're provided to `jsx-email`. They can be the result of a local function, a file export, or a package export. Regardless of how a plugin is provided, all plugins are defined by a straightforward interface:

```ts
export interface JsxEmailPlugin {
  afterRender?: RenderHookFn;
  beforeRender?: RenderHookFn;
  name: string;
  process?: ProcessHookFn;
  symbol: typeof pluginSymbol;
}
```

To instruct a render to use plugins, utilize a [Configuration File](/docs/core/config) and specify the `plugins` property:

```js
import { defineConfig } from 'jsx-email/config';
import { somePlugin } from './plugins/some-plugin';

export const config = defineConfig({
  plugins: [somePlugin]
});
```

### Lifecycle Hooks

Plugins can affect a template at several different stages throughout the rendering process. The following hooks are supported, and are executed in the following order:

- `afterRender`
- `process`
- `beforeRender`

Implemented hooks within plugins can be synchronous or asynchrounous and return a `Promise`. All hooks are exexcuted _after_ JSX is converted to HTML.

Function definitions for both `afterRender` and `beforeRender` should match:

```ts
(params: RenderHookParams) => string | Promise<string>;
```

The `params` argument provided to these two hooks match the following definition:

```ts
interface RenderHookParams {
  chalk: typeof chalk;
  html: string;
  log: any;
}
```

As a convenience, all hooks are provided a `chalk` instance and a `log` utility for providing user feedback in the console.

#### `afterRender`

As the name suggests, this hook is run after the other hooks and after `render` is considered to be complete, but before the resulting HTML is written to disk.

#### `beforeRender`

This hook is run just before the HTML processing step is begun. It can be handy for replacing tokens in the HTML that may have an effect in the processing step or `afterRender` hooks.

#### `process`

The `process` hook is unique in that the return result from the hook function should return a [`rehype` Plugin](https://unifiedjs.com/learn/guide/create-a-rehype-plugin/). `jsx-email` uses [`rehype`](https://github.com/rehypejs/rehype) for compliant and _fast_ HTML processing and modification. The [`plugin-minify` Core Plugin](https://github.com/shellscape/jsx-email/blob/main/packages/plugin-minify) provides an example of such a `rehype` plugin. This hook runs between `beforeRender` and `afterRender`. The function definition for this hook should match:

```ts
interface ProcessHookParams {
  chalk: typeof chalk;
  log: any;
}

(params: ProcessHookParams) =>
  RehypePlugin | RehypePreset | Promise<RehypePlugin> | Promise<RehypePreset>;
```
