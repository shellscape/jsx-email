---
title: 'Butan'
description: Deprecated. The v1 Button component. Please upgrade to the new Button component.
slug: butan
type: component
---

<!--@include: @/include/header.md-->

::: warning
This component is DEPRECATED and serves as a fallback for folks still wanting to use the v1 Button component. Please upgrade your templates to use the v2 Button. `Butan` will be removed in a future release.
:::

::: tip
Semantics: Quite often in the email world we talk about buttons when we actually mean links. Behind the scenes this component is a `<a>` element which is styled like a `<button>` element.
:::

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Butan } from 'jsx-email';

const Email = () => {
  return (
    <Butan href="https://example.com" style={{ color: '#61dafb', padding: '10px 20px' }}>
      Click me
    </Butan>
  );
};
```

## Component Props

```ts
href: string;
```

The url to navigate to when the button is clicked.

```ts
target?: string;
```

Specifies the value of the `"target"` attribute for the button `target`.

:::tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'a'>`.
:::
