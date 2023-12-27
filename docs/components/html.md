---
title: HTML
description: Wraps the email document with a root element
slug: html
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button, Html } from 'jsx-email';

const Email = () => {
  return (
    <Html lang="en" dir="ltr">
      <Button href="https://example.com" style={{ color: '#61dafb' }}>
        Click me
      </Button>
    </Html>
  );
};
```

## Component Props

```ts
lang?: string;
```

Identify the language of text content on the email

```ts
dir?: string;
```

Identify the direction of text content on the email

:::tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'html'>`.
:::
