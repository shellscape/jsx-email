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

```sh npm
npm install @react-email/heading -E
```

```sh yarn
yarn add @react-email/heading -E
```

```sh pnpm
pnpm add @react-email/heading -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Heading } from '@react-email/heading';

const Email = () => {
  return (
    <Heading as="h2">Lorem ipsum</Heading>
  );
};
```

## Props

<ResponseField name="as" type="string" default="h1">
  Render component as `h1`, `h2`, `h3`, `h4`, `h5` or `h6`.
</ResponseField>

<ResponseField name="m" type="string">
  A shortcut for `margin` CSS property.
</ResponseField>

<ResponseField name="mx" type="string">
  A shortcut for `margin-left` and `margin-right` CSS properties.
</ResponseField>

<ResponseField name="my" type="string">
  A shortcut for `margin-top` and `margin-bottom` CSS properties.
</ResponseField>

<ResponseField name="mt" type="string">
  A shortcut for `margin-top` CSS property.
</ResponseField>

<ResponseField name="mr" type="string">
  A shortcut for `margin-right` CSS property.
</ResponseField>

<ResponseField name="mb" type="string">
  A shortcut for `margin-bottom` CSS property.
</ResponseField>

<ResponseField name="ml" type="string">
  A shortcut for `margin-left` CSS property.
</ResponseField>

