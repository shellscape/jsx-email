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
import { render } from '@jsx-email/render';

import { BatmanTemplate } from './emails/Batman';

const html = render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);
```

## Method Options

```ts
export interface Options {
  plainText?: boolean;
  pretty?: boolean;
}
```

### Options

```ts
plainText?: boolean;
```

Beautify HTML output

```ts
pretty?: boolean;
```

Generate plain text version
