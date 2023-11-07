---
title: 'Render'
description: 'Render JSX email components to HTML email'
slug: render
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Convert JSX components to an HTML string

```jsx
import { render } from '@jsx-email/render';

import { BatmanTemplate } from './emails/Batman';

const html = await render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);
```

## Method Options

```ts
export interface Options {
  minify?: boolean;
  plainText?: boolean;
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
plainText?: boolean;
```

Render the target email(s) to plain text

```ts
pretty?: boolean;
```

Beautify the HTML output for each target email

```ts
strip?: boolean;
```

Strip data-id attributes from output for each target email
