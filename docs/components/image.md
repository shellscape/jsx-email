---
title: 'Image'
sidebarTitle: 'Image'
description: 'Display an image in your email.'
'og:image': 'https://react.email/static/covers/img.png'
icon: 'image'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/img
```

```console [npm]
npm add @jsx-email/img
```

```console [yarn]
yarn add @jsx-email/img
```

:::

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
