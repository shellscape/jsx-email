---
title: 'Minify Plugin'
description: 'The Minify Plugin'
---

## Minify Plugin

The `@jsx-email/plugin-minify` package provides a plugin to [minify](<https://en.wikipedia.org/wiki/Minification_(programming)>) an email's HTML output. This plugin is a `peerDependency` of `jsx-email` and is loaded automatically if the [`minify` render option](https://jsx.email/docs/core/render#method-options) is set.

Browse this plugin's [source code](https://github.com/shellscape/jsx-email/blob/main/packages/plugin-minify)

## Why

Minifying the HTML for an email is very beneficial when working with emails that have a large amount of content. Email clients (like Gmail) will clip an email if it surpases their size limits, forcing a recipient to click a "Show Full Message" button at the bottom of their email. Be sure to keep an eye on the console output when running [`render`](https://jsx.email/docs/core/render) as it will alert you if the size of the HTML is too large.
