---
title: 'Heading'
sidebarTitle: 'Heading'
description: 'A block of heading text.'
'og:image': 'https://react.email/static/covers/heading.png'
icon: 'h1'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/heading
```

```console [npm]
npm add @jsx-email/heading
```

```console [yarn]
yarn add @jsx-email/heading
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Heading } from '@jsx-email/heading';

const Email = () => {
  return <Heading as="h2">Lorem ipsum</Heading>;
};
```

## Component Props

```ts
export type HeadingAs = As<'h1', 'h2', 'h3', 'h4', 'h5', 'h6'>;
export type HeadingProps = HeadingAs & HeadingOwnProps & Margin;
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
