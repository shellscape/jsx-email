---
title: 'Render'
description: 'Render JSX email components to HTML email'
params: -D
slug: render
type: package
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

```jsx
import { render } from 'jsx-email';

import { BatmanTemplate } from './emails/Batman';

const html = await render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);
```

## Method Options

```ts
export interface Options {
  minify?: boolean;
  plainText?: boolean | PlainTextOptions;
  pretty?: boolean;
  strip?: boolean;
}
```

### Options

```ts
minify?: boolean;
```

Minify the HTML for rendered templates

```ts
plainText?: boolean  | PlainTextOptions;
```

If `true` or an `object`, renders the target email(s) to plain text. If the need to modify how the target is rendered to plain text, an `object` representing [`html-to-text` options](https://github.com/html-to-text/node-html-to-text/blob/master/packages/html-to-text/README.md#options) should be used.

```ts
pretty?: boolean;
```

Beautify the HTML output for each target email

```ts
strip?: boolean;
```

Strip data-id attributes from output for each target email
