---
title: 'Render'
sidebarTitle: 'Render'
description: 'Transform React components into HTML email templates.'
'og:image': 'https://react.email/static/covers/render.png'
---

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

