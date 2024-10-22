---
title: Inline CSS Plugin
description: The Inline CSS Plugin
---

## Inline Plugin

The `@jsx-email/plugin-inline` package provides a plugin to [Inline CSS](https://www.codecademy.com/article/html-inline-styles). That is to say, converting classes defined in the `class` attribute of an HTML element, to the appropriate CSS declarations appended to a `style` attribute. This plugin is a `peerDependency` of `jsx-email` and is loaded automatically if the [`inline` render option](https://jsx.email/docs/core/render#method-options) is set.

Browse this plugin's [source code](https://github.com/shellscape/jsx-email/blob/main/packages/plugin-inline)

## Why

This can be extremely useful when working with email clients like Gmail, which do not keep `<style>` elements when forwarding or replying to emails. Using inline CSS will assert that the style and visuals of the email remain the same in replies and forwards. For example, it will take HTML that looks like this:

```html
<style>
  .batman {
    border: 1px solid black;
  }
</style>
<div class="batman">batcave</div>
```

And transform it to this:

```html
<div style="border: 1px solid black">batcave</div>
```

There is one "gotcha" when using this plugin - it will significantly increase the size in bytes of the email HTML. Bear in mind that email clients (like Gmail) will clip an email if it surpases their size limits, forcing a recipient to click a "Show Full Message" button at the bottom of their email. Be sure to keep an eye on the console output when running [`render`](https://jsx.email/docs/core/render) as it will alert you if the size of the HTML is too large.
