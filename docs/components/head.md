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

```sh npm
npm install @react-email/head -E
```

```sh yarn
yarn add @react-email/head -E
```

```sh pnpm
pnpm add @react-email/head -E
```

:::

## Getting started

Add the component to your email template. Include children tags where needed.

```jsx
import { Head } from '@react-email/head';

const Email = () => {
  return (
    <Head>
      <title>My email title</title>
    </Head>
  );
};
```

