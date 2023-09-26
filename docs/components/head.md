---
title: 'Head'
sidebarTitle: 'Head'
description: 'Contains head components, related to the document such as style and meta elements.'
'og:image': 'https://react.email/static/covers/head.png'
icon: 'head-side'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/head
```

```console [npm]
npm add @jsx-email/head
```

```console [yarn]
yarn add @jsx-email/head
```

:::

## Getting started

Add the component to your email template. Include children tags where needed.

```jsx
import { Head } from '@jsx-email/head';

const Email = () => {
  return (
    <Head>
      <title>My email title</title>
    </Head>
  );
};
```

