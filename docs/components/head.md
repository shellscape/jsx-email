---
title: 'Head'
description: |
  A JSX email component which creates an HTML head element
slug: head
type: component
---

<!--@include: @/include/header.md-->

::: tip
This component is required VML in outlook compatibility for adding elements such as `<style>` and `meta` directly to the document
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

```tsx
export interface HeadProps extends BaseProps<'head'> {
  enableFormatDetection?: boolean;
}
```

```tsx
enableFormatDetection?: boolean;
```

This is used to disable the `format-detection` meta (will be useful for some very specific use-cases)
Default value is `false`

:::tip
This component expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'head'>`.
:::
