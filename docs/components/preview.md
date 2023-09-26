---
title: 'Preview'
sidebarTitle: 'Preview'
description: 'A preview text that will be displayed in the inbox of the recipient.'
'og:image': 'https://react.email/static/covers/preview.png'
icon: 'input-text'
---

::: tip
  Email clients have this concept of “preview text” which gives insight into
  what's inside the email before you open. A good practice is to keep that text
  under 90 characters.
:::

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/preview
```

```console [npm]
npm add @jsx-email/preview
```

```console [yarn]
yarn add @jsx-email/preview
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Preview } from '@jsx-email/preview';

const Email = () => {
  return <Preview>Email preview text</Preview>;
};
```

