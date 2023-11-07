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
import { Text } from '@jsx-email/text';

const Email = () => {
  return <Text>Lorem ipsum</Text>;
};
```

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'p'>`.
