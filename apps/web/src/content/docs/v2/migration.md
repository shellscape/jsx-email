---
title: 'Migrating to v2'
description: 'Migrating to Version 2.0.0'
---

## Migrating to Version 2.0.0

Version 2.0.0 of `jsx-email` brings a lot of changes to the package, specifically breaking changes. There are also a whole host of new features.

## New Features

Among the new features that our new version ships with are configuration file support, component updates, and plugins. Below you'll find links to the relevant documentation for each of the new features and component updates:

- [`Background`](/docs/components/background) ⭐️ New
- [`Button`](/docs/components/button) Updates
- [`Graph`](/docs/components/graph) ⭐️ New

### Configuration File Support

One request we recieved often was a way to disable the default styles for every component across a render. Many of those requests suggested using a config file or supporting a config file for other reasons. Well, we heard you and we've implemented support for that. Configuration files will allow setting properties for rendering in a single location, setting the log level for the rendering process, and specifying plugins.

Please see the [Configuration](/docs/core/config) documentation for more details.

### Plugins!

Setting `jsx-email` apart from any other available email templating tool is the availability of plugins. Plugins are meant to run before, during, or after the core rendering process at different stages, and provide functions like minifaction, inlining CSS, and prettifying the output. Plugins do this via new lifecycle hooks, which provide ultimate flexibility for creating a rendering pipeline for your solutions.

Additionally, the core functionality that was previously within `jsx-email` for minifying and prettifying have been moved to plugins which ship separately and can easily be excluded from bundles. This is especially useful if running in environments like Cloudflare that have restrictions on what code can execute.

Please see the [Plugins](/docs/core/plugins) documentation for more details.

## Breaking Changes

As with most major releases in the Node ecosystem, this one comes with a few bumps that need attending to when updating.

### Named Exports

`jsx-email` has moved to only supporting [named exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#description) from templates. This impacts the template component itself, the template name, and default props values for the preview.

Default exports (e.g. `export default Batman`) are extremely common in the React ecosystem. Not so much outside of React. Default exports [were a mistake](https://github.com/rollup/rollup/issues/1078#issuecomment-268286496) and negatively impact bundling in the way of tree-shaking, a critical part to modern application bundling.

If you previous had templates where the exports resembled:

```tsx
export default function MyTemplate({ ... }) {
  ...
};

MyTemplate.Name = 'MyTemplate';

MyTemplate.PreviewProps = { ... };
```

That would be refactored like so:

```tsx
export const previewProps = { ... };

// Displayed in the navigation of the Preview app
export const templateName = 'MyTemplate';

export const Template = ({ ... }) => {
  ...
};
```

For consistency, only the template is Capital-cased to indicate that it's a template. This ditches an odd design choice that we inherited from react-email when we forked, and gets us to a place with template exports that moreso match the ecosystem norms, and simplifies the process of asserting that a template has what we need to render it.

Importing templates would then resemble:

```tsx
import { Template } from './template';
```

And in the case where multiple templates are being imported in the same module, import aliases would need to be used:

```tsx
import { Template as BatmanTemplate } from './batman';
import { Template as JokerTemplate } from './joker';
```

### `Button` Updates

::: info
Please see the separate [migration guide for `Button`](/docs/v2/button) for additional usage and comparison to the v1 `Button`.
:::

The [`Button`](/docs/components/button) component received a mountain of updates thanks to [@lordelogos](https://github.com/lordelogos). Amoung the updates was a complete refactoring of the component source and the HTML that it generates. This was done to address nagging and persistent issues with rendering buttons effectively across many clients. No surprise, Outlook was the worst offender. While these updates provide a lot of new props, the `Button` component remains backwards compatible in most situations.

However, one big potentially breaking change is around the `style` property. If you're using the `style` or `class` properties to style your buttons, there may be some visual differences. The updates to `Button` provide direct props for most of the styles that we've seen people use on buttons, in an effort to get to maximum compatibility across email clients. _This is something you won't find in other email templating tools!_ Please see the [props](/docs/components/button#component-props) documentation for more info.

All that said, if the upgrade is too much heavy lifting, we're shipping the deprecated `Butan` and cheeky component which provides a fast find-and-replace path for continuing to use the original `Button` component. This component won't be documented beyond mentioning the legacy behavior and rendering, and will be removed in the next major version.

### Preview Updates

We've made a lot of changes to how the preview works, which should ultimately make it faster and more flexible. Rather than running the `render` within the preview's web app at runtime, we're pre-rendering and providing the output to the preview app. We're also running a watcher behind the scenes so if the preview app is running and a template is updated, those updates are immediately shown within the preview app. This works _faster and more reliably_, and removes dependency restrictions and optimization issues that Vite would frequently complain about.

One downside to these updates, which is a breaking change, is that local, relative imports of assets (like images) into the templates aren't working. This was something that was enabled by some behavior in Vite that we were leveraging to make that possible. Unfortunately, that mechanism no longer works with the new rendering pipeline. _We are actively working on restoring that capability!_

On the flip side, we've add the ability to exclude files from the preview app, which was often requested.

## ESM / CJS Exports

We've moved to [`tshy`](https://github.com/isaacs/tshy) for building the packages. We've done _a lot_ of testing to try and ensure the export changes don't cause any unintended side-effects. That said, if you run into any, please [open an issue](https://github.com/shellscape/jsx-email/issues/new/choose).
