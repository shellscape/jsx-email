---
title: 'Text'
description: 'A JSX email component which renders a paragraph element'
slug: text
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Text } from 'jsx-email';

const Email = () => {
  return <Text>Lorem ipsum</Text>;
};
```

## Component Props

```ts
disableDefaultStyle?: boolean;
```

If `false`, instructs the component not to add default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'p'>`.
:::