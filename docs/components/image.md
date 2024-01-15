---
title: Image
description: Displays an image
slug: img
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Img } from 'jsx-email';

const Email = () => {
  return <Img src="cat.jpg" alt="Cat" width="300" height="300" />;
};
```

::: tip
All email clients can display `.png`, `.gif`, and `.jpg` images.
Unfortunately, `.svg` images are not well supported, regardless of how they're
referenced, so avoid using these. See [Can I
Email](https://www.caniemail.com/features/image-svg/) for more information.
:::

::: tip
To use local images during development, you can resolve the path with node.
Just remember, for production, you'll need to host the images somewhere and
reference them with a URL.

```jsx
import { Img } from 'jsx-email';

const baseUrl = import.meta.env.DEV ? import.meta.resolve('../assets/') : 'https://assets.example.com/';

const Email = () => {
  return <Img src={`${baseUrl}cat.jpg`} alt="Cat" width="300" height="300" />;
};
```

:::

## Component Props

```ts
alt?: string;
```

Alternate description for an image

```ts
disableDefaultStyle?: boolean;
```

If `false`, instructs the component not to add default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

```ts
height?: string;
```

The height of an image in pixels

```ts
src?: string;
```

The path to the image

```ts
width?: string;
```

The width of an image in pixels

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'img'>`.
:::
