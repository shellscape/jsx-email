---
title: 'Container'
description: Horizontally center child components and content
slug: container
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button, Container } from 'jsx-email';

const Email = () => {
  return (
    <Container>
      <Button href="https://example.com" style={{ color: '#61dafb' }}>
        Click me
      </Button>
    </Container>
  );
};
```

## Component Props

```ts
disableDefaultStyle?: boolean;
```

If `true`, instructs the component _not to add_ default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'table'>`.
:::
