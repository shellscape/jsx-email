---
title: 'Button'
description: A JSX email component which styles an anchor element to appear as a button
slug: button
---

<!--@include: @/include/header.md-->

::: tip
Semantics: Quite often in the email world we talk about buttons when we actually mean links. Behind the scenes this component is a `<a>` element which is styled like a `<button>` element.
:::

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@jsx-email/button';

const Email = () => {
  return (
    <Button href="https://example.com" style={{ color: '#61dafb' }}>
      Click me
    </Button>
  );
};
```

## Component Props

```ts
// extends primitive props from <a> tag
type RootProps = React.ComponentPropsWithoutRef<'a'>;

export interface ButtonProps extends RootProps {
  pX?: number;
  pY?: number;
}
```

```ts
href: string;
```

The url to navigate to when the button is clicked.

```ts
target?: string;
```

Specifies the value of the `"target"` attribute for the button `target`.

```ts
pX?: number;
```

The horizontal padding applied to the button.

```ts
pY?: number;
```

The vertical padding applied to the button.

In addition to the custom props above, this component expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'a'>`.