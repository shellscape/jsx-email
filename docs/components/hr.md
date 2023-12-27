---
title: Hr
description: Creates divider (horizontal rule) that separates content
slug: hr
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Hr } from 'jsx-email';

const Email = () => {
  return <Hr />;
};
```

## Component Props

```ts
disableDefaultStyle?: boolean;
```

If `false`, instructs the component not to add default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'hr'>`.
:::
