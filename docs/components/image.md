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

### `alt`

Type: `string`<br>
Default: ``<br/>
Required: `false`

Alternate description for an image


### `src`

Type: `string`<br>
Default: ``<br/>
Required: `false`

The path to the image


### `width`

Type: `string`<br>
Default: ``<br/>
Required: `false`

The width of an image in pixels


### `height`

Type: `string`<br>
Default: ``<br/>
Required: `false`

The height of an image in pixels


