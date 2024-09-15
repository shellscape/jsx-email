---
title: Heading
description: A stylable heading (h1, h2, etc) element
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Heading } from 'jsx-email';

const Email = () => {
  return <Heading as="h2">Lorem ipsum</Heading>;
};
```

## Component Props

```ts
export interface Margin {
  m?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mt?: number | string;
  mx?: number | string;
  my?: number | string;
}

export type PresentAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = Margin & { as?: PresentAs };
```

```ts
as?: string;
```

Render component as `h1`, `h2`, `h3`, `h4`, `h5` or `h6`.

```ts
m?: number | string;
```

A shortcut for `margin` CSS property.

```ts
mx?: number | string;
```

A shortcut for `margin-left` and `margin-right` CSS properties.

```ts
my?: number | string;
```

A shortcut for `margin-top` and `margin-bottom` CSS properties.

```ts
mt?: number | string;
```

A shortcut for `margin-top` CSS property.

```ts
mr?: number | string;
```

A shortcut for `margin-right` CSS property.

```ts
mb?: number | string;
```

A shortcut for `margin-bottom` CSS property.

```ts
ml?: number | string;
```

A shortcut for `margin-left` CSS property.

:::tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'h1'>`.
:::
