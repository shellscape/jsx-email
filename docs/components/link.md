---
title: 'Link'
sidebarTitle: 'Link'
description: 'A hyperlink to web pages, email addresses, or anything else a URL can address.'
'og:image': 'https://react.email/static/covers/link.png'
icon: 'link'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/link
```

```console [npm]
npm add @jsx-email/link
```

```console [yarn]
yarn add @jsx-email/link
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Link } from '@jsx-email/link';

const Email = () => {
  return <Link href="https://example.com">Example</Link>;
};
```

## Component Props

```ts
href?: string;
```

required>
Link to be triggered when the button is clicked

```ts
target?: string;
```

default="\_blank">
Specify the target attribute for the button link
