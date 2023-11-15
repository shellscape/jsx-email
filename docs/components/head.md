---
title: 'Head'
description: |
  A JSX email component which creates an HTML head element
slug: head
type: component
---

<!--@include: @/include/header.md-->

::: tip
This component is required for adding elements such as `<style>` and `meta` directly to the document
:::

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include children tags where needed.

```jsx
import { Head } from 'jsx-email';

const Email = () => {
  return (
    <Head>
      <title>My email title</title>
    </Head>
  );
};
```

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'head'>`.
