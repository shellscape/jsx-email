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

```sh npm
npm install @react-email/img -E
```

```sh yarn
yarn add @react-email/img -E
```

```sh pnpm
pnpm add @react-email/img -E
```
:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Img } from '@react-email/img';

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

## Props

<ResponseField name="alt" type="string">
  Alternate description for an image
</ResponseField>

<ResponseField name="src" type="string">
  The path to the image
</ResponseField>

<ResponseField name="width" type="string">
  The width of an image in pixels
</ResponseField>

<ResponseField name="height" type="string">
  The height of an image in pixels
</ResponseField>

