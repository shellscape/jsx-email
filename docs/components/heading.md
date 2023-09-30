---
title: 'Heading'
sidebarTitle: 'Heading'
description: 'A block of heading text.'
'og:image': 'https://react.email/static/covers/heading.png'
icon: 'h1'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/heading
```

```console [npm]
npm add @jsx-email/heading
```

```console [yarn]
yarn add @jsx-email/heading
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Heading } from '@jsx-email/heading';

const Email = () => {
  return (
    <Heading as="h2">Lorem ipsum</Heading>
  );
};
```

## Component Props

### `as`

Type: `string`<br>
Default: ``<br/>
Required: `false`

 default="h1">
  Render component as `h1`, `h2`, `h3`, `h4`, `h5` or `h6`.


### `m`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin` CSS property.


### `mx`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin-left` and `margin-right` CSS properties.


### `my`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin-top` and `margin-bottom` CSS properties.


### `mt`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin-top` CSS property.


### `mr`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin-right` CSS property.


### `mb`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin-bottom` CSS property.


### `ml`

Type: `string`<br>
Default: ``<br/>
Required: `false`

A shortcut for `margin-left` CSS property.


