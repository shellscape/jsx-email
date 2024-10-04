---
title: 'Pretty Plugin'
description: 'The Pretty Plugin'
---

## Inline Plugin

The `@jsx-email/plugin-pretty` package provides a plugin to format an email's HTML output in an easy-to-read format. This plugin is a `peerDependency` of `jsx-email` and is loaded automatically if the [`pretty` render option](https://jsx.email/docs/core/render#method-options) is set.

Browse this plugin's [soure code](https://github.com/shellscape/jsx-email/blob/main/packages/plugin-pretty)

### Why

Mostly useful for debugging, and in preview environments, prettifying code in general makes it easy to read, nagivate, and look for problems. We don't recommend using this for production, but it's very handy for development.
