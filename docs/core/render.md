---
title: 'Render'
description: 'Render JSX email components to HTML email'
slug: render
---

<!--@include: @/include/header.md-->

## Installation

```shell
pnpm add @jsx-email/render -D

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/render -D
# yarn add @jsx-email/render -D
```

## Usage

Convert React components into a HTML string.

```jsx
import { MyTemplate } from '../components/MyTemplate';
import { render } from '@jsx-email/render';

const html = render(<MyTemplate firstName="Bruce" lastName="Wayne" />);
```

## Options

### `pretty`

Type: `boolean`<br>
Default: ``<br/>
Required: `false`

Beautify HTML output

### `plainText`

Type: `boolean`<br>
Default: ``<br/>
Required: `false`

Generate plain text version

