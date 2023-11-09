---
title: Preview
description: Renders a preview viewable in recipient email clients
slug: preview
type: component
---

<!--@include: @/include/header.md-->

::: tip
Email clients have this concept of “preview text” which gives insight into
what's inside the email before you open. A good practice is to keep that text
under 90 characters.
:::

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Preview } from '@jsx-email/preview';

const Email = () => {
  return <Preview>Email preview text</Preview>;
};
```

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'div'>`.
