---
title: Image
description: Displays an image
slug: img
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Img } from '@jsx-email/img';

const Email = () => {
  return <Img src="cat.jpg" alt="Cat" width="300" height="300" />;
};
```

<Tip>
  All email clients can display `.png`, `.gif`, and `.jpg` images.
  Unfortunately, `.svg` images are not well supported, regardless of how they're
  referenced, so avoid using these. See [Can I
  Email](https://www.caniemail.com/features/image-svg/) for more information.
</Tip>

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'img'>`. Additionally, the props listed below should be considered.

### Props

```ts
alt?: string;
```

Alternate description for an image

```ts
src?: string;
```

The path to the image

```ts
width?: string;
```

The width of an image in pixels

```ts
height?: string;
```

The height of an image in pixels
