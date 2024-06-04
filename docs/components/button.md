---
title: 'Button'
description: A JSX email component which styles an anchor element to appear as a button
slug: button
type: component
---

<!--@include: @/include/header.md-->

::: tip
Semantics: Quite often in the email world we talk about buttons when we actually mean links. Behind the scenes this component is a `<a>` element which is styled like a `<button>` element.
:::

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from 'jsx-email';

const Email = () => {
  return (
    <Button width={160} height={60} href="https://jsx.email" target="_blank">
      JOIN US
    </Button>
  );
};
```

## Component Props

```ts
export interface ButtonProps extends BaseProps<'a'> {
  width: number;
  height: number;
  href?: string;
  align?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderSize?: number;
  fontSize?: number;
  textColor?: string;
  withBackground?: boolean;
}
```

:::tip
It is **highly reccommended** to use the component props to set these values rather than css for **optimal email client compatibility** especially in Outlook clients
:::

```ts
href?: string;
```

The url to navigate to when the button is clicked.

```ts
width: number;
```

Specifies the `width` of the Button in pixels

```ts
height: number;
```

Specifies the `height` of the Button in pixels

```ts
align?: 'left' | 'center' | 'right';
```

Specifies the horizontal alignment of the Button in the container. Default value is `left`

```ts
target?: string;
```

Specifies the value of the `"target"` attribute for the button `target`.

```ts
backgroundColor?: string;
```

Specifies the hex value for the `background-color` of the button

```ts
borderColor?: string;
```

Specifies the hex value `border-color` for the button

```ts
borderRadius?: number;
```

Specifies the `border-radius` value for the button in pixels

```ts
borderSize?: number;
```

Specifies the `border-width` value in pixels

```ts
fontSize?: number;
```

Specifies the `font-size` value in pixels

```ts
textColor?: string;
```

Specifies the hex value for the `color` of the text

```ts
withBackground?: boolean;
```

Set to `true` if `Button` is nested in a `Background` component. Neccessary for good Outlook compatibility.

:::tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'a'>`.
:::
